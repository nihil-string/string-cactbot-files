(globalThis.StringRunLibrary ??= (() => {
  const isDebugPage = /(raidemulator|config)\.html/.test(location.href);
  const markTypes = [
    'attack1',
    'attack2',
    'attack3',
    'attack4',
    'attack5',
    'attack6',
    'attack7',
    'attack8',
    'bind1',
    'bind2',
    'bind3',
    'stop1',
    'stop2',
    'square',
    'circle',
    'cross',
    'triangle',
  ];
  const tankJobs = [1, 3, 19, 21, 32, 37];
  const healerJobs = [6, 24, 28, 33, 40];
  const dpsJobs = [2, 4, 5, 7, 20, 22, 23, 25, 26, 27, 29, 30, 31, 34, 35, 36, 38, 39, 41, 42];
  const defaultJobSort = [
    21, // WAR
    32, // DRK
    37, // GNB
    19, // PLD
    33, // AST
    24, // WHM
    40, // SGE
    28, // SCH
    41, // VPR
    34, // SAM
    30, // NIN
    39, // RPR
    22, // DRG
    20, // MNK
    38, // DNC
    23, // BRD
    31, // MCH
    42, // PCT
    25, // BLM
    27, // SMN
    35, // RDM
    36, // BLU
  ];

  let stringParty = [];
  let externalPartyRp;
  let partyUpdateTimer;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const waitFor = async (condition, intervalMs = 200) => {
    while (!condition())
      await sleep(intervalMs);
    return condition();
  };

  const waitForData = async (data, attrName, timeoutMs = 7000) => {
    let timer;
    try {
      return await Promise.race([
        waitFor(() => data[attrName]),
        new Promise((_resolve, reject) => {
          timer = setTimeout(() => reject(new Error(`String运行库等待 ${attrName} 超时`)), timeoutMs);
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };

  const getPartyDetails = (data) => {
    if (Array.isArray(data?.party?.details))
      return data.party.details;
    return [];
  };

  const createRoleArray = (prefix, count) =>
    [...Array(count).keys()].map((index) => `${prefix}${index + 1}`);

  const defaultSort = () => {
    const tankRoles = ['MT', 'ST', ...createRoleArray('T', 14)];
    const healerRoles = createRoleArray('H', 16);
    const dpsRoles = createRoleArray('D', 16);
    let tankIndex = 0;
    let healerIndex = 0;
    let dpsIndex = 0;

    stringParty.sort((a, b) => {
      const left = defaultJobSort.indexOf(Number(a.job));
      const right = defaultJobSort.indexOf(Number(b.job));
      return (left < 0 ? 999 : left) - (right < 0 ? 999 : right);
    });

    for (const member of stringParty) {
      const job = Number(member.job);
      if (tankJobs.includes(job))
        member.stringRP = tankRoles[tankIndex++] ?? 'unknown';
      else if (healerJobs.includes(job))
        member.stringRP = healerRoles[healerIndex++] ?? 'unknown';
      else if (dpsJobs.includes(job))
        member.stringRP = dpsRoles[dpsIndex++] ?? 'unknown';
      else
        member.stringRP = 'unknown';
    }
  };

  const updatePartyRp = () => {
    if (isDebugPage || externalPartyRp === undefined) {
      defaultSort();
      return;
    }

    for (const member of stringParty) {
      member.stringRP = externalPartyRp.find((record) => record.id === member.id)?.rp ?? 'unknown';
    }
  };

  const createParty = (party) => {
    stringParty = (party ?? []).filter((member) => member.inParty);
    updatePartyRp();
  };

  const ensureParty = (data) => {
    if (stringParty.length === 0)
      createParty(getPartyDetails(data));
  };

  const getRpByName = (data, name) => {
    ensureParty(data);
    return stringParty.find((member) => member.name === name)?.stringRP;
  };

  const getNameByRp = (data, rp) => {
    ensureParty(data);
    return stringParty.find((member) => member.stringRP === rp)?.name;
  };

  const getNameByHexId = (data, hexId) => data?.party?.idToName_?.[hexId?.toString().toUpperCase()];

  const getHexIdByName = (data, name) => {
    const partyDetail = getPartyDetails(data).find((member) => member.name === name);
    if (partyDetail?.id !== undefined)
      return partyDetail.id;
    const index = data?.party?.partyNames_?.indexOf(name) ?? -1;
    return index >= 0 ? data.party.partyIds_[index] : undefined;
  };

  const getHexIdByRp = (data, rp) => getHexIdByName(data, getNameByRp(data, rp));

  const getDecIdByRp = (data, rp) => {
    const id = getHexIdByRp(data, rp);
    return id === undefined ? undefined : Number.parseInt(id, 16);
  };

  const getRpByHexId = (data, hexId) => getRpByName(data, getNameByHexId(data, hexId));

  const getRpById = (data, id) => getRpByHexId(data, Number(id).toString(16));

  const isLegalMarkType = (markType) => markTypes.includes(markType);

  const getLegalityMarkType = (markType, markNum, fallback) => {
    if (!isLegalMarkType(fallback))
      throw new Error(`备用标记非法: ${fallback}`);
    const result = `${markType}${markNum}`;
    return isLegalMarkType(result) ? result : fallback;
  };

  const normalizeActorId = (actorId) => {
    if (typeof actorId === 'string')
      return Number.parseInt(actorId, 16);
    return actorId;
  };

  const mark = (actorId, markType, localOnly = false) => {
    if (markType === 'none' || actorId === undefined)
      return;
    if (!isLegalMarkType(markType))
      throw new Error(`非法标点类型: ${markType}`);

    const actorIdNumber = normalizeActorId(actorId);
    if (!Number.isFinite(actorIdNumber))
      throw new Error(`非法 ActorID: ${actorId}`);

    if (isDebugPage) {
      console.debug('String运行库 mark', actorIdNumber, markType, localOnly);
      return;
    }
    callOverlayHandler({
      call: 'PostNamazu',
      c: 'mark',
      p: JSON.stringify({
        ActorID: actorIdNumber,
        MarkType: markType,
        LocalOnly: localOnly,
      }),
    });
  };

  const doTextCommand = (text) => {
    if (isDebugPage) {
      console.debug('String运行库 command', text);
      return;
    }
    callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: text });
  };

  const normalizeQueue = (queue) => queue.map((item) => {
    const normalized = { ...item };
    if (normalized.c === 'mark') {
      if (typeof normalized.p === 'string')
        normalized.p = JSON.parse(normalized.p);
      normalized.p.ActorID = normalizeActorId(normalized.p.ActorID);
      if (!Number.isFinite(normalized.p.ActorID))
        throw new Error(`非法 ActorID: ${normalized.p.ActorID}`);
      if (!isLegalMarkType(normalized.p.MarkType))
        throw new Error(`非法标点类型: ${normalized.p.MarkType}`);
    }
    if (typeof normalized.p === 'object')
      normalized.p = JSON.stringify(normalized.p);
    return normalized;
  });

  const doQueueActions = (queue, note = 'String运行库队列') => {
    const normalizedQueue = normalizeQueue(queue);
    if (isDebugPage) {
      console.debug('String运行库 queue', note, JSON.stringify(normalizedQueue, null, 1));
      return;
    }
    callOverlayHandler({
      call: 'PostNamazu',
      c: 'DoQueueActions',
      p: JSON.stringify(normalizedQueue),
    });
  };

  const getClearMarkQueue = (localOnly = false, delayMs = 0) => {
    if (localOnly) {
      return markTypes.map((markType, index) => ({
        c: 'mark',
        p: {
          ActorID: 0xe000000,
          MarkType: markType,
          LocalOnly: true,
        },
        d: index === 0 ? delayMs : 0,
      }));
    }
    return [...Array(8).keys()].map((index) => ({
      c: 'DoTextCommand',
      p: `/mk off <${index + 1}>`,
      d: index === 0 ? delayMs : 0,
    }));
  };

  const clearMark = (localOnly = false) => doQueueActions(getClearMarkQueue(localOnly), `clearMark localOnly:${localOnly}`);

  const doWaymarks = (waymark) => {
    if (isDebugPage) {
      console.debug('String运行库 waymark', waymark);
      return;
    }
    callOverlayHandler({
      call: 'PostNamazu',
      c: 'place',
      p: JSON.stringify(waymark),
    });
  };

  const placeSave = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'save' });
  const placeLoad = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'load' });
  const placeClear = () => callOverlayHandler({ call: 'PostNamazu', c: 'place', p: 'clear' });

  const maxPictoActPayloadLength = 65536;
  const pictoActKeyPattern = /^[A-Za-z][A-Za-z0-9_]*$/u;

  const serializePictoActValue = (value, key) => {
    if (Array.isArray(value)) {
      if (value.length === 0)
        throw new Error(`PictoACT ${key} 数组不能为空`);
      return value.map((item) => serializePictoActValue(item, key)).join(', ');
    }
    if (typeof value === 'number') {
      if (!Number.isFinite(value))
        throw new Error(`PictoACT ${key} 数值非法: ${value}`);
      return value.toString();
    }
    if (typeof value === 'boolean')
      return value ? 'true' : 'false';
    if (typeof value !== 'string')
      throw new Error(`PictoACT ${key} 只接受字符串、数字、布尔值或数组`);
    if (/\r|\n/u.test(value) || value.includes('---'))
      throw new Error(`PictoACT ${key} 不允许换行或命令分隔符`);
    if (value.trim() === '')
      throw new Error(`PictoACT ${key} 不能为空`);
    return value;
  };

  const serializePictoActCommand = (command) => {
    if (command === null || typeof command !== 'object' || Array.isArray(command))
      throw new Error('PictoACT 命令必须是对象');
    const entries = Object.entries(command);
    if (entries.length === 0)
      throw new Error('PictoACT 命令不能为空对象');
    return entries.map(([key, value]) => {
      if (!pictoActKeyPattern.test(key))
        throw new Error(`PictoACT 参数名非法: ${key}`);
      return `${key}: ${serializePictoActValue(value, key)}`;
    }).join('\n');
  };

  const normalizePictoActPayload = (input) => {
    let payload;
    if (typeof input === 'string') {
      payload = input.trim();
      if (payload === '')
        throw new Error('PictoACT payload 不能为空');
    } else {
      const commands = Array.isArray(input) ? input : [input];
      if (commands.length === 0)
        throw new Error('PictoACT 命令数组不能为空');
      payload = commands.map(serializePictoActCommand).join('\n---\n');
    }
    if (payload.length > maxPictoActPayloadLength)
      throw new Error('PictoACT payload 超过 65536 字符限制');
    return payload;
  };

  const pictoAct = async (input) => {
    const payload = normalizePictoActPayload(input);
    if (isDebugPage) {
      console.debug('String运行库 PictoACT', payload);
      return { ok: true, debug: true, payload };
    }
    const result = await callOverlayHandler({
      call: 'stringVfx',
      action: 'invoke',
      payload: payload,
    });
    if (result?.ok !== true)
      throw new Error(result?.error ?? 'String VFX 桥接未返回成功状态');
    return result;
  };

  const getVfxStatus = async () => {
    if (isDebugPage)
      return { ok: true, available: false, debug: true, reason: '调试页不调用 ACT VFX 桥接' };
    return await callOverlayHandler({ call: 'stringVfx', action: 'status' });
  };

  const sendBroadcast = (text) => {
    callOverlayHandler({
      call: 'broadcast',
      source: 'stringUserJS',
      msg: { text: text },
    });
  };

  const handleBroadcastMessage = (msg) => {
    if (msg.source !== 'stringRuntimeJS' && msg.source !== 'soumaRuntimeJS')
      return;
    if (!Array.isArray(msg.msg?.party) || msg.msg.party.length === 0)
      return;
    externalPartyRp = msg.msg.party;
    if (externalPartyRp !== undefined)
      updatePartyRp();
  };

  if (!/config\.html/.test(location.href)) {
    sendBroadcast('requestData');
    addOverlayListener('PartyChanged', (event) => {
      clearTimeout(partyUpdateTimer);
      if (externalPartyRp === undefined) {
        partyUpdateTimer = setTimeout(() => createParty(event.party), 500);
        return;
      }
      createParty(event.party);
    });
    addOverlayListener('BroadcastMessage', handleBroadcastMessage);
  }

  return {
    getRpByName,
    getRpByHexId,
    getRpById,
    getNameByRp,
    getNameByHexId,
    getHexIdByRp,
    getHexIdByName,
    getDecIdByRp,
    sleep,
    waitFor,
    waitForData,
    mark,
    doTextCommand,
    clearMark,
    doWaymarks,
    doQueueActions,
    placeSave,
    placeLoad,
    placeClear,
    pictoAct,
    getVfxStatus,
    normalizePictoActPayload,
    getClearMarkQueue,
    getLegalityMarkType,
  };
})());

globalThis.Util ??= {};
Util.string = globalThis.StringRunLibrary;

Options.Triggers.push({
  id: 'StringRunLibrary',
  zoneId: ZoneId.MatchAll,
  initData: () => ({ stringFL: globalThis.StringRunLibrary }),
});
