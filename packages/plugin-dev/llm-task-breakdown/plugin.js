const DEFAULT_CONFIG = {
  baseUrl: 'http://10.0.0.40:1234',
  chatCompletionsPath: '/v1/chat/completions',
  authHeaderName: 'Authorization',
  authScheme: 'Bearer',
  model: 'mistral-7b-code-16k-qlora',
  temperature: 0.2,
  maxSubtasks: 8,
  requestTimeoutMs: 30000,
  includeParentNotes: true,
};

let currentTask = null;

PluginAPI.registerHook(PluginAPI.Hooks.CURRENT_TASK_CHANGE, (payload) => {
  if (!payload) {
    currentTask = null;
    return;
  }
  if (payload.current && payload.current.id) {
    currentTask = payload.current;
    return;
  }
  if (payload.id && payload.title) {
    currentTask = payload;
    return;
  }
  currentTask = null;
});

PluginAPI.registerMenuEntry({
  label: 'Break down current task (LLM)',
  icon: 'auto_awesome',
  onClick: async () => {
    try {
      const task = await resolveTask();
      if (!task) {
        PluginAPI.showSnack({
          msg: 'No current task selected. Select a task first.',
          type: 'WARNING',
        });
        return;
      }

      const config = await getMergedConfig();
      validateConfig(config);

      PluginAPI.showSnack({
        msg: 'Asking LLM to break down task...',
        type: 'INFO',
      });

      const subtasks = await requestSubtasks(task, config);
      if (!subtasks.length) {
        PluginAPI.showSnack({
          msg: 'LLM returned no subtasks.',
          type: 'WARNING',
        });
        return;
      }

      const createdCount = await createSubtasks(task, subtasks, config.maxSubtasks);
      PluginAPI.showSnack({
        msg: `Created ${createdCount} subtasks.`,
        type: 'SUCCESS',
      });
    } catch (error) {
      PluginAPI.log.error('LLM task breakdown failed', error);
      PluginAPI.showSnack({
        msg: `Task breakdown failed: ${toErrorMessage(error)}`,
        type: 'ERROR',
      });
    }
  },
});

async function resolveTask() {
  if (currentTask && currentTask.id) {
    return currentTask;
  }

  const contextTasks = await PluginAPI.getCurrentContextTasks();
  if (!contextTasks || !contextTasks.length) {
    return null;
  }

  return contextTasks[0];
}

async function getMergedConfig() {
  const cfg = (await PluginAPI.getConfig()) || {};
  return {
    ...DEFAULT_CONFIG,
    ...cfg,
  };
}

function validateConfig(config) {
  if (!config.baseUrl || !config.chatCompletionsPath || !config.model || !config.apiKey) {
    throw new Error('Please configure baseUrl, chatCompletionsPath, model, and apiKey.');
  }
}

function toErrorMessage(error) {
  if (!error) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Unknown error';
}

function getAuthHeaderValue(config) {
  const scheme = (config.authScheme || '').trim();
  const key = (config.apiKey || '').trim();
  return scheme ? `${scheme} ${key}` : key;
}

function buildEndpoint(config) {
  const base = String(config.baseUrl || '').replace(/\/+$/, '');
  const path = String(config.chatCompletionsPath || '').replace(/^\/?/, '/');
  return `${base}${path}`;
}

function buildSystemPrompt(config) {
  if (config.systemPrompt && String(config.systemPrompt).trim()) {
    return String(config.systemPrompt).trim();
  }

  return [
    'You are a task planning assistant.',
    'Break down a task into concrete, actionable subtasks.',
    'Return STRICT JSON only with this shape:',
    '{"subtasks":[{"title":"string","notes":"string optional","timeEstimateMinutes":number optional}]}',
    'Do not include markdown, comments, or additional keys.',
  ].join(' ');
}

function buildUserPrompt(task, config) {
  const parts = [];
  parts.push(`Task title: ${task.title}`);
  if (config.includeParentNotes && task.notes) {
    parts.push(`Task notes:\n${task.notes}`);
  }
  parts.push(`Create up to ${config.maxSubtasks} subtasks.`);
  parts.push('Each subtask title should be concise and specific.');
  return parts.join('\n\n');
}

async function requestSubtasks(task, config) {
  const endpoint = buildEndpoint(config);
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  let timeoutHandle = null;

  if (controller) {
    timeoutHandle = setTimeout(() => {
      controller.abort();
    }, config.requestTimeoutMs);
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      [config.authHeaderName]: getAuthHeaderValue(config),
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: config.model,
        temperature: config.temperature,
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(config),
          },
          {
            role: 'user',
            content: buildUserPrompt(task, config),
          },
        ],
      }),
      signal: controller ? controller.signal : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Endpoint error ${response.status}: ${text.slice(0, 300)}`);
    }

    const data = await response.json();
    const content =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;

    const parsed = parseModelJson(content);
    if (!parsed.subtasks || !Array.isArray(parsed.subtasks)) {
      throw new Error('Invalid model output: missing subtasks array');
    }

    return parsed.subtasks
      .map(normalizeSubtask)
      .filter((subtask) => !!subtask.title)
      .slice(0, config.maxSubtasks);
  } finally {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  }
}

function parseModelJson(content) {
  if (!content || typeof content !== 'string') {
    throw new Error('Model response was empty');
  }

  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const jsonText = fenced ? fenced[1] : content;

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    throw new Error('Model response is not valid JSON');
  }
}

function normalizeSubtask(subtask) {
  const title = subtask && subtask.title ? String(subtask.title).trim() : '';
  const notes = subtask && subtask.notes ? String(subtask.notes).trim() : undefined;
  const estimateMinutesRaw = subtask && subtask.timeEstimateMinutes;
  const estimateMinutes = Number.isFinite(Number(estimateMinutesRaw))
    ? Math.max(0, Number(estimateMinutesRaw))
    : null;

  return {
    title,
    notes,
    timeEstimate: estimateMinutes != null ? Math.round(estimateMinutes * 60 * 1000) : 0,
  };
}

async function createSubtasks(parentTask, subtasks, maxSubtasks) {
  let created = 0;
  const limited = subtasks.slice(0, maxSubtasks);

  for (const subtask of limited) {
    await PluginAPI.addTask({
      title: subtask.title,
      notes: subtask.notes,
      timeEstimate: subtask.timeEstimate,
      parentId: parentTask.id,
      projectId: parentTask.projectId || null,
      tagIds: Array.isArray(parentTask.tagIds) ? parentTask.tagIds : [],
    });
    created += 1;
  }

  return created;
}
