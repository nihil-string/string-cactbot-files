// 绝妖星自用触发器。
// 时间轴沿用公开版，触发器逻辑按自用打法逐步维护。

const myDmuPhaseStarts = {
  C403: 'p1',
  C24C: 'p2',
  C3F7: 'p3',
  C2DC: 'p4',
  BB40: 'p5',
};

const myDmuRoleOrder = ['MT', 'ST', 'H1', 'H2', 'D1', 'D2', 'D3', 'D4'];
const myDmuDefaultJobOrder = [
  'WAR', 'DRK', 'GNB', 'PLD',
  'AST', 'WHM', 'SGE', 'SCH',
  'VPR', 'SAM', 'NIN', 'RPR', 'DRG', 'MNK',
  'DNC', 'BRD', 'MCH',
  'PCT', 'BLM', 'SMN', 'RDM', 'BLU',
];
const myDmuJobGroups = {
  PLD: 'tank',
  WAR: 'tank',
  DRK: 'tank',
  GNB: 'tank',
  WHM: 'healer',
  SCH: 'healer',
  AST: 'healer',
  SGE: 'healer',
  MNK: 'dps',
  DRG: 'dps',
  NIN: 'dps',
  SAM: 'dps',
  RPR: 'dps',
  VPR: 'dps',
  BRD: 'dps',
  MCH: 'dps',
  DNC: 'dps',
  BLM: 'dps',
  SMN: 'dps',
  RDM: 'dps',
  BLU: 'dps',
  PCT: 'dps',
};
const myDmuP3TargetFirstSecondOrder = ['D1', 'D2', 'D3', 'D4', 'MT', 'ST', 'H2', 'H1'];
const myDmuP3TargetThirdOrder = ['MT', 'ST', 'D1', 'D2', 'D3', 'D4', 'H2', 'H1'];
const myDmuRoleOrderText = (order) => order.join('/');

const myDmuP1Headmarkers = {
  stack: '0080',
  spread: '007F',
  fakeFire: '02A1',
  trueFire: '02A2',
  fakeIce: '02A3',
  trueIce: '02A4',
  fakeThunder: '02A5',
  trueThunder: '02A6',
};
const myDmuP1ArrowBuffs = {
  '13D7': '上',
  '13D8': '下',
  '13D9': '右',
  '13DA': '左',
  '130C': '上',
  '130D': '下',
  '130E': '右',
  '130F': '左',
};
const myDmuP1PoisonBuff = '13D6';
const myDmuP1PoisonMarkers = ['bind1', 'bind2'];
const myDmuP2ARounds = new Set([1, 2, 3, 8]);
const myDmuP2GuideRounds = new Set([2, 4, 6, 8]);
const myDmuP2TowerSchemes = {
  roleStack: 'roleStack',
  pair2222: 'pair2222',
};
const myDmuP2Pair2222IdleOddModes = {
  role: 'role',
  cone: 'cone',
};
const myDmuP2Pair2222Groups = [
  ['MT', 'H1'],
  ['ST', 'H2'],
  ['D1', 'D3'],
  ['D2', 'D4'],
];
const myDmuP2Pair2222IdleOrder = ['MT', 'ST', 'D1', 'D2', 'H1', 'H2', 'D3', 'D4'];
const myDmuP2Pair2222IdleMarkers = ['attack5', 'attack6', 'attack7', 'attack8'];
const myDmuP2Headmarkers = {
  '02CB': 'stack',
  '02CC': 'spread',
  '02CD': 'cone',
};
const myDmuP2ProgressBuff = '13DB';
const myDmuP2MechanicText = {
  stack: '分摊',
  spread: '钢铁',
  cone: '扇形',
};

const myDmuP3MahjongHeadmarkers = {
  '0150': 1,
  '0151': 2,
  '0152': 3,
  '0153': 4,
  '01B5': 5,
  '01B6': 6,
  '01B7': 7,
  '01B8': 8,
};
const myDmuP3MahjongDirectMarkers = {
  1: 'attack1',
  2: 'attack2',
  3: 'attack3',
  4: 'attack4',
  5: 'square',
  6: 'bind3',
  7: 'bind2',
  8: 'bind1',
};
const myDmuP3MahjongLeftMarkers = ['attack1', 'attack2', 'attack3', 'attack4'];
const myDmuP3MahjongRightMarkers = ['bind1', 'bind2', 'bind3', 'square'];
const myDmuP3MahjongPoints = [
  { index: 1, label: 'A', x: 100, z: 88 },
  { index: 2, label: '1', x: 108.485, z: 91.515 },
  { index: 3, label: 'B', x: 112, z: 100 },
  { index: 4, label: '2', x: 108.485, z: 108.485 },
  { index: 5, label: 'C', x: 100, z: 112 },
  { index: 6, label: '3', x: 91.515, z: 108.485 },
  { index: 7, label: 'D', x: 88, z: 100 },
  { index: 8, label: '4', x: 91.515, z: 91.515 },
];

const myDmuP3TargetBuffs = {
  BBC: 'first',
  BBD: 'second',
  BBE: 'third',
};
const myDmuP3ElementDebuffs = {
  '640': { kind: 'fire', text: '火' },
  '641': { kind: 'water', text: '水' },
  '642': { kind: 'wind', text: '背对BOSS' },
  '643': { kind: 'antiwind', text: '面向艾克斯迪斯' },
};

const myDmuP4TruthHeadmarkers = {
  '045F': { target: 'chaos', value: false },
  '0460': { target: 'chaos', value: true },
  '0461': { target: 'ex', value: false },
  '0462': { target: 'ex', value: true },
};
const myDmuP4TruthStatuses = Object.fromEntries(
  Object.entries(myDmuP4TruthHeadmarkers).map(([id, value]) => [`${id}0808`, value]),
);
const myDmuP4ElementBuffs = ['15A8', '15A9'];
const myDmuP4PetrifyBuff = '15A7';
const myDmuP4AccelerationBuff = '15AA';
const myDmuP4ChaosBuffs = ['15AB', '15AC'];
const myDmuP4PersonalActionBuffs = [
  ...myDmuP4ElementBuffs,
  myDmuP4AccelerationBuff,
  ...myDmuP4ChaosBuffs,
];
const myDmuP4TrackedBuffs = [
  ...myDmuP4ElementBuffs,
  myDmuP4PetrifyBuff,
  myDmuP4AccelerationBuff,
  ...myDmuP4ChaosBuffs,
];

const myDmuP5Mitigations = [
  { id: '01', skill: '连续究极 x4', target: 'MT血仇 D1牵制 扳手', field: '步道 策动 节制+盾 罩子' },
  { id: '02', skill: '魔击 x3', field: '幕帘' },
  { id: '03', skill: '混沌洪水 x4', field: '扩散盾 全大赦' },
  { id: '04', skill: '神圣', target: 'ST血仇', field: '大天使' },
  { id: '05', skill: '混沌核爆', field: '罩子' },
  { id: '06', skill: '魔击 x2', field: '群盾X1' },
  { id: '07', skill: '暴雷/冰封/爆炎', field: '群盾' },
  { id: '08', skill: '暴雷/冰封/爆炎', field: '群盾' },
  { id: '09', skill: '暴雷/冰封/爆炎', field: '群盾 跑快快 罩子' },
  { id: '10', skill: '连续究极 x4', target: 'MT血仇 D2牵制 昏乱', field: '步道 策动 全大赦 罩子 幕帘' },
  { id: '11', skill: '混沌涡旋', target: 'ST血仇' },
  { id: '12', skill: '神圣', field: '罩子 群盾' },
  { id: '13', skill: '魔击 x3', field: '群盾X3' },
  { id: '14', skill: '遗弃末世', target: 'MT血仇 D1牵制', field: '扩散盾 幕帘 罩子 节制+盾 大天使' },
  { id: '15', skill: '遗弃末狱', target: '扳手卡3个', field: '全大赦卡3个' },
  { id: '16', skill: '遗弃末世', field: '学者附体' },
  { id: '17', skill: '遗弃末狱', field: '铃铛 幻光' },
  { id: '18', skill: '遗弃末世', target: 'ST血仇 D2牵制 昏乱', field: '步道 策动 卡最后4个' },
];

const myDmuP5MitigationText = (entry) => {
  const parts = [`${entry.skill}减伤`];
  if (entry.target !== undefined)
    parts.push(`目标：${entry.target}`);
  if (entry.field !== undefined)
    parts.push(`场地：${entry.field}`);
  return parts.join(' / ');
};

const myDmuP5MitigationChatChannel = (data) =>
  data.triggerSetConfig?.MyDMU_P5MitigationChannel ?? 'e';

const myDmuDoTextCommand = (data, text) => {
  const fl = myDmuFl(data);
  if (fl?.doTextCommand !== undefined) {
    fl.doTextCommand(text);
    return;
  }
  callOverlayHandler({ call: 'PostNamazu', c: 'DoTextCommand', p: text });
};

const myDmuP5MitigationTimelineTriggers = myDmuP5Mitigations.map((entry) => ({
  id: `绝妖星 P5 减伤 ${entry.id}`,
  regex: new RegExp(`^绝妖星 P5 减伤 ${entry.id}$`),
  beforeSeconds: 5,
  durationSeconds: 5,
  suppressSeconds: 1,
  condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P5MitigationAlert', true),
  run: (data) => myDmuDoTextCommand(data, `/${myDmuP5MitigationChatChannel(data)} ${myDmuP5MitigationText(entry)}`),
}));

const myDmuP2TowerTimelineTriggers = [...Array(8).keys()].map((index) => {
  const round = index + 1;
  return {
    id: `绝妖星 P2 八轮塔 ${round}`,
    regex: new RegExp(`^(?:The Path of Light|光之波动) ${round}$`),
    beforeSeconds: 1.2,
    suppressSeconds: 1,
    preRun: (data) => {
      data.myDmuP2Round = round;
      myDmuApplyP2Round(data, round);
    },
    infoText: (data) => {
      if (!myDmuBooleanConfig(data, 'MyDMU_P2TowerCallout', false))
        return undefined;
      return myDmuCacheSpeech(data, `p2Tower${round}`, myDmuP2Instruction(data, round));
    },
    tts: null,
    soundVolume: 0,
    run: (data) => myDmuSpeakCached(data, `p2Tower${round}`),
  };
});
const myDmuP3MahjongFallbackTimelineTrigger = {
  id: '绝妖星 P3 麻将兜底标点',
  regex: /^(?:Ultima Blaster|究极冲击波) 1$/,
  beforeSeconds: 0,
  suppressSeconds: 30,
  run: (data) => {
    if ((data.myDmuP3Mahjong?.lines?.length ?? 0) < 2)
      data.myDmuP3Mahjong.allowDirectFallback = true;
    myDmuApplyP3MahjongMarkers(data);
  },
};

const myDmuBooleanConfig = (data, key, fallback = true) => {
  const value = data.triggerSetConfig?.[key];
  if (value === undefined)
    return fallback;
  if (typeof value === 'boolean')
    return value;
  return value === 'true' || value === '开' || value === '本地';
};

const myDmuMarkLocalOnly = (data) => myDmuBooleanConfig(data, 'MyDMU_LocalMark', false);

const myDmuMarkEnabled = (data, key) =>
  myDmuBooleanConfig(data, 'MyDMU_AutoMark', false) && myDmuBooleanConfig(data, key, false);

const myDmuForceTtsEnabled = (data) => myDmuBooleanConfig(data, 'MyDMU_ForceTTS', true);

const myDmuP1CalloutEnabled = (data) =>
  data.myDmuPhase === 'p1' && myDmuBooleanConfig(data, 'MyDMU_P1Callout', true);

const myDmuFl = (data) => data.stringFL ?? globalThis.Util?.string;

const myDmuNormalizeHeadmarkerId = (id) => id?.toString().toUpperCase().padStart(4, '0');

const myDmuNumber = (value) => {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : undefined;
};

const myDmuRetryAction = (action, count = 6, intervalMs = 500) => {
  if (action())
    return;
  if (count <= 0)
    return;
  setTimeout(() => myDmuRetryAction(action, count - 1, intervalMs), intervalMs);
};

const myDmuCacheSpeech = (data, key, text) => {
  if (text === undefined || text === null || text === '')
    return undefined;
  data.myDmuSpeech ??= {};
  data.myDmuSpeech[key] = text;
  return text;
};

const myDmuSpeakText = (data, text) => {
  if (!myDmuForceTtsEnabled(data) || text === undefined || text === null || text === '')
    return;
  if (typeof callOverlayHandler !== 'function')
    return;
  const result = callOverlayHandler({ call: 'cactbotSay', text: text });
  result?.catch?.(() => {});
};

const myDmuSpeakCached = (data, key) => {
  const text = data.myDmuSpeech?.[key];
  if (data.myDmuSpeech !== undefined)
    delete data.myDmuSpeech[key];
  myDmuSpeakText(data, text);
  return text;
};

const myDmuRolePriority = (role, order = myDmuRoleOrder) => {
  const index = order.indexOf(role);
  return index < 0 ? 99 : index;
};

const myDmuRoleGroup = (role) => role?.startsWith('D') ? 'DPS' : 'TN';

const myDmuNormalizeRp = (role) => myDmuRoleOrder.includes(role) ? role : undefined;

const myDmuParseRoleOrder = (value, fallback) => {
  const rawRoles = Array.isArray(value) ? value : typeof value === 'string'
    ? value.toUpperCase().split(/[\s,，/|>＞、;；]+/u)
    : [];
  const seen = new Set();
  const order = [];
  for (const raw of rawRoles) {
    const role = myDmuNormalizeRp(raw.trim());
    if (role === undefined || seen.has(role))
      continue;
    seen.add(role);
    order.push(role);
  }
  for (const role of fallback) {
    if (!seen.has(role)) {
      seen.add(role);
      order.push(role);
    }
  }
  for (const role of myDmuRoleOrder) {
    if (!seen.has(role))
      order.push(role);
  }
  return order;
};

const myDmuP3TargetFirstPriority = (data) =>
  myDmuParseRoleOrder(
    data.triggerSetConfig?.MyDMU_P3TargetFirstPriority ??
      data.triggerSetConfig?.MyDMU_P3TargetFirstSecondPriority,
    myDmuP3TargetFirstSecondOrder,
  );

const myDmuP3TargetSecondPriority = (data) =>
  myDmuParseRoleOrder(
    data.triggerSetConfig?.MyDMU_P3TargetSecondPriority ??
      data.triggerSetConfig?.MyDMU_P3TargetFirstSecondPriority,
    myDmuP3TargetFirstSecondOrder,
  );

const myDmuP3TargetThirdPriority = (data) =>
  myDmuParseRoleOrder(data.triggerSetConfig?.MyDMU_P3TargetThirdPriority, myDmuP3TargetThirdOrder);

const myDmuPartyNames = (data) => data.party?.partyNames_ ?? data.party?.partyNames ?? [];

const myDmuJobGroup = (job) => myDmuJobGroups[job?.toString().toUpperCase()];

const myDmuDefaultRpByName = (data, name) => {
  const partyNames = [...new Set(myDmuPartyNames(data))];
  if (!partyNames.includes(name))
    return undefined;

  const entries = partyNames.map((partyName, index) => {
    const job = data.party?.jobName?.(partyName)?.toString().toUpperCase();
    const group = myDmuJobGroup(job) ?? data.party?.nameToRole_?.[partyName];
    return {
      name: partyName,
      job: job,
      group: group,
      index: index,
      priority: myDmuDefaultJobOrder.indexOf(job),
    };
  }).filter((entry) => entry.group === 'tank' || entry.group === 'healer' || entry.group === 'dps');

  entries.sort((left, right) => {
    const leftPriority = left.priority < 0 ? 999 : left.priority;
    const rightPriority = right.priority < 0 ? 999 : right.priority;
    return leftPriority - rightPriority || left.index - right.index;
  });

  const nextIndex = { tank: 0, healer: 0, dps: 0 };
  const roles = {
    tank: ['MT', 'ST'],
    healer: ['H1', 'H2'],
    dps: ['D1', 'D2', 'D3', 'D4'],
  };
  const roleByName = {};
  for (const entry of entries) {
    const role = roles[entry.group][nextIndex[entry.group]];
    nextIndex[entry.group]++;
    if (role !== undefined)
      roleByName[entry.name] = role;
  }
  return roleByName[name];
};

const myDmuGetRpByName = (data, name) =>
  myDmuNormalizeRp(myDmuFl(data)?.getRpByName?.(data, name)) ?? myDmuDefaultRpByName(data, name);

const myDmuGetHexIdByName = (data, name) => {
  const fl = myDmuFl(data);
  return fl?.getHexIdByName?.(data, name) ?? fl?.getHexIdByRp?.(data, myDmuGetRpByName(data, name));
};

const myDmuP1IsGraven3 = (data) => data.myDmuP1Stage === 'graven3' || data.myDmuP1GravenCount >= 3;

const myDmuP1RecordFakeHeadmarker = (data, id) => {
  switch (myDmuNormalizeHeadmarkerId(id)) {
    case myDmuP1Headmarkers.fakeFire:
      data.myDmuP1Fake.fire = true;
      return true;
    case myDmuP1Headmarkers.trueFire:
      data.myDmuP1Fake.fire = false;
      return true;
    case myDmuP1Headmarkers.fakeIce:
      data.myDmuP1Fake.ice = true;
      return true;
    case myDmuP1Headmarkers.trueIce:
      data.myDmuP1Fake.ice = false;
      return true;
    case myDmuP1Headmarkers.fakeThunder:
      data.myDmuP1Fake.thunder = true;
      return true;
    case myDmuP1Headmarkers.trueThunder:
      data.myDmuP1Fake.thunder = false;
      return true;
    default:
      return false;
  }
};

const myDmuP1HeadmarkerText = (data, id) => {
  const marker = myDmuNormalizeHeadmarkerId(id);
  const isStackMarker = marker === myDmuP1Headmarkers.stack;
  const isSpreadMarker = marker === myDmuP1Headmarkers.spread;
  if (!isStackMarker && !isSpreadMarker)
    return undefined;

  const shouldStack = (!data.myDmuP1Fake.fire && isStackMarker) || (data.myDmuP1Fake.fire && isSpreadMarker);
  if (!myDmuP1IsGraven3(data))
    return shouldStack ? '分摊' : '分散';
  const action = shouldStack ? '集合' : '分散';
  return `${data.myDmuP1Fake.thunder ? '危险区' : '安全区'}+${action}`;
};

const myDmuP1RecordUniqueName = (list, name) => {
  if (name === undefined || list.includes(name))
    return;
  list.push(name);
};

const myDmuP1PoisonEntries = (data) =>
  data.myDmuP1PoisonTargets
    .map((name) => ({
      id: data.myDmuP1PoisonTargetIds?.[name] ?? myDmuGetHexIdByName(data, name),
      name: name,
      role: myDmuGetRpByName(data, name),
    }))
    .filter((entry) => entry.id !== undefined)
    .sort((left, right) => myDmuRolePriority(left.role) - myDmuRolePriority(right.role));

const myDmuApplyP1PoisonMarkers = (data, force = false) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P1PoisonMark'))
    return false;

  const desired = myDmuP1PoisonEntries(data)
    .slice(0, 2)
    .map((entry, index) => ({
      id: entry.id,
      marker: myDmuP1PoisonMarkers[index],
    }));
  if (desired.length < 2)
    return false;

  const signature = desired.map((item) => `${item.id}:${item.marker}`).join('|');
  if (!force && data.myDmuP1PoisonMarkerSignature === signature)
    return true;

  data.myDmuP1PoisonMarkerSignature = signature;
  myDmuMarkQueue(data, desired, '绝妖星 P1 5078锁链');
  return true;
};

const myDmuP1CombatantPosX = (combatants, sourceId) => {
  const id = Number.parseInt(sourceId, 16);
  if (!Number.isFinite(id))
    return undefined;
  return combatants.find((combatant) => combatant.ID === id)?.PosX;
};

const myDmuMarkActorKey = (actorId) => typeof actorId === 'string' ? actorId.toUpperCase() : `${actorId}`;

const myDmuNewMarkState = () => ({ markers: {}, actors: {} });

const myDmuEnsureMarkState = (data) => {
  data.myDmuMarkState ??= {};
  data.myDmuMarkState.markers ??= {};
  data.myDmuMarkState.actors ??= {};
  return data.myDmuMarkState;
};

const myDmuChangedMarks = (data, marks) => {
  const state = myDmuEnsureMarkState(data);
  const nextMarkers = { ...state.markers };
  const nextActors = { ...state.actors };
  const changed = [];
  for (const mark of marks) {
    const actorKey = myDmuMarkActorKey(mark.id);
    const currentMarkerActor = nextMarkers[mark.marker];
    const currentActorMarker = nextActors[actorKey];
    if (currentMarkerActor === actorKey && currentActorMarker === mark.marker)
      continue;
    changed.push(mark);
    if (currentActorMarker !== undefined && currentActorMarker !== mark.marker)
      delete nextMarkers[currentActorMarker];
    if (currentMarkerActor !== undefined && currentMarkerActor !== actorKey)
      delete nextActors[currentMarkerActor];
    nextMarkers[mark.marker] = actorKey;
    nextActors[actorKey] = mark.marker;
  }
  data.myDmuMarkState = { markers: nextMarkers, actors: nextActors };
  return changed;
};

const myDmuMarkQueue = (data, items, note) => {
  const marks = myDmuChangedMarks(data, items.filter((item) => item?.id !== undefined && item?.marker !== undefined));
  if (marks.length === 0)
    return;

  const localOnly = myDmuMarkLocalOnly(data);
  const queue = marks.map((item, index) => ({
    c: 'mark',
    p: {
      ActorID: item.id,
      MarkType: item.marker,
      LocalOnly: localOnly,
    },
    d: index === 0 ? 0 : 120,
  }));
  const fl = myDmuFl(data);
  if (fl?.doQueueActions !== undefined) {
    fl.doQueueActions(queue, note);
    return;
  }
  callOverlayHandler({
    call: 'PostNamazu',
    c: 'DoQueueActions',
    p: JSON.stringify(queue.map((item) => ({
      ...item,
      p: JSON.stringify({
        ...item.p,
        ActorID: typeof item.p.ActorID === 'string' ? Number.parseInt(item.p.ActorID, 16) : item.p.ActorID,
      }),
    }))),
  });
};

const myDmuClearMarks = (data) => {
  data.myDmuMarkState = myDmuNewMarkState();
  if (!myDmuBooleanConfig(data, 'MyDMU_AutoMark', false))
    return;
  const fl = myDmuFl(data);
  if (fl?.clearMark !== undefined) {
    fl.clearMark(myDmuMarkLocalOnly(data));
    return;
  }
  callOverlayHandler({
    call: 'PostNamazu',
    c: 'DoQueueActions',
    p: JSON.stringify([
      { c: 'DoTextCommand', p: '/mk off <1>' },
      { c: 'DoTextCommand', p: '/mk off <2>' },
      { c: 'DoTextCommand', p: '/mk off <3>' },
      { c: 'DoTextCommand', p: '/mk off <4>' },
      { c: 'DoTextCommand', p: '/mk off <5>' },
      { c: 'DoTextCommand', p: '/mk off <6>' },
      { c: 'DoTextCommand', p: '/mk off <7>' },
      { c: 'DoTextCommand', p: '/mk off <8>' },
    ]),
  });
};

const myDmuScheduleClearMarks = (data, key, delaySeconds = 0.5, condition = () => true) => {
  data.myDmuClearMarkTimers ??= {};
  if (data.myDmuClearMarkTimers[key] !== undefined)
    clearTimeout(data.myDmuClearMarkTimers[key]);
  data.myDmuClearMarkTimers[key] = setTimeout(() => {
    delete data.myDmuClearMarkTimers?.[key];
    if (condition(data))
      myDmuClearMarks(data);
  }, delaySeconds * 1000);
};

const myDmuResetP1 = (data) => {
  data.myDmuSpeech = {};
  data.myDmuMarkState = myDmuNewMarkState();
  data.myDmuP1GravenCount = 0;
  data.myDmuP1Stage = 'opening';
  data.myDmuP1Fake = { fire: false, ice: false, thunder: false };
  data.myDmuP1Tethers = [];
  data.myDmuP1PoisonTargets = [];
  data.myDmuP1PoisonTargetIds = {};
  data.myDmuP1PoisonMarkerSignature = undefined;
  data.myDmuP1WaveCannonTargets = [];
  data.myDmuP1PlaceRock = false;
  data.myDmuP1FirstTethered = false;
  data.myDmuP1Graven2TetherCount = 1;
  data.myDmuP1Graven2SourceX = undefined;
  data.myDmuP1Arrow = [];
  data.myDmuP1Graven3Tethers = [];
  data.myDmuP1Combatants = [];
};

const myDmuResetP2 = (data) => {
  if (data.myDmuP2Round8Timer !== undefined) {
    clearTimeout(data.myDmuP2Round8Timer);
    data.myDmuP2Round8Timer = undefined;
  }
  data.myDmuP2Initial = {};
  data.myDmuP2Current = {};
  data.myDmuP2GroupA = [];
  data.myDmuP2GroupB = [];
  data.myDmuP2InitialLocked = false;
  data.myDmuP2AppliedRounds = {};
  data.myDmuP2AppliedRoundSignatures = {};
  data.myDmuP2RoundSeen = {};
  data.myDmuP2Round = 0;
  data.myDmuP2AbilityRound = 0;
  data.myDmuP2Round8Timer = undefined;
  data.myDmuP2BuffCounts = {};
  data.myDmuP2FuturePastCount = 0;
};

const myDmuResetP3Mahjong = (data) => {
  data.myDmuP3Mahjong = {
    markers: {},
    lines: [],
    plan: undefined,
    marked: false,
    calloutShown: false,
    resolveCount: 0,
  };
};

const myDmuResetP3Targets = (data) => {
  data.myDmuP3Targets = {
    first: [],
    second: [],
    third: [],
    marked: false,
  };
};

const myDmuResetP4 = (data) => {
  data.myDmuP4 = {
    truth: { ex: undefined, chaos: undefined },
    truthAt: { ex: undefined, chaos: undefined },
    truthEvents: { ex: [], chaos: [] },
    buffs: {},
    buffRecords: [],
    buffChatSent: {},
    buffSerial: 0,
    elementMarked: {},
    petrifyMarked: {},
    flutteringUltimateCount: 0,
  };
};

const myDmuInitState = () => ({
  myDmuPhase: 'p1',
  myDmuSpeech: {},
  myDmuMarkState: myDmuNewMarkState(),
  myDmuP1GravenCount: 0,
  myDmuP1Stage: 'opening',
  myDmuP1Fake: { fire: false, ice: false, thunder: false },
  myDmuP1Tethers: [],
  myDmuP1PoisonTargets: [],
  myDmuP1PoisonTargetIds: {},
  myDmuP1PoisonMarkerSignature: undefined,
  myDmuP1WaveCannonTargets: [],
  myDmuP1PlaceRock: false,
  myDmuP1FirstTethered: false,
  myDmuP1Graven2TetherCount: 1,
  myDmuP1Graven2SourceX: undefined,
  myDmuP1Arrow: [],
  myDmuP1Graven3Tethers: [],
  myDmuP1Combatants: [],
  myDmuP2Initial: {},
  myDmuP2Current: {},
  myDmuP2GroupA: [],
  myDmuP2GroupB: [],
  myDmuP2InitialLocked: false,
  myDmuP2AppliedRounds: {},
  myDmuP2AppliedRoundSignatures: {},
  myDmuP2RoundSeen: {},
  myDmuP2Round: 0,
  myDmuP2AbilityRound: 0,
  myDmuP2Round8Timer: undefined,
  myDmuP2BuffCounts: {},
  myDmuP2FuturePastCount: 0,
  myDmuP3Mahjong: {
    markers: {},
    lines: [],
    plan: undefined,
    marked: false,
    calloutShown: false,
    resolveCount: 0,
  },
  myDmuP3Targets: {
    first: [],
    second: [],
    third: [],
    marked: false,
  },
  myDmuP4: {
    truth: { ex: undefined, chaos: undefined },
    truthAt: { ex: undefined, chaos: undefined },
    truthEvents: { ex: [], chaos: [] },
    buffs: {},
    buffRecords: [],
    buffChatSent: {},
    buffSerial: 0,
    elementMarked: {},
    petrifyMarked: {},
    flutteringUltimateCount: 0,
  },
});

const myDmuP2EntryFromHeadmarker = (data, matches, mechanic) => {
  const role = myDmuGetRpByName(data, matches.target);
  return {
    id: matches.targetId,
    name: matches.target,
    role: role,
    group: myDmuRoleGroup(role),
    mechanic: mechanic,
    seenAt: Date.now(),
  };
};

const myDmuP2TowerScheme = (data) =>
  data.triggerSetConfig?.MyDMU_P2TowerScheme ?? myDmuP2TowerSchemes.roleStack;

const myDmuP2Pair2222IdleOddMode = (data) =>
  data.triggerSetConfig?.MyDMU_P2Pair2222IdleOddMode ?? myDmuP2Pair2222IdleOddModes.role;

const myDmuP2RoleSort = (entries, order = myDmuRoleOrder) =>
  [...entries].sort((a, b) => myDmuRolePriority(a.role, order) - myDmuRolePriority(b.role, order));

const myDmuOddEvenSlotSort = (oddEntries, evenEntries) => {
  const slots = [];
  const oddSlots = [0, 2];
  const evenSlots = [1, 3];
  oddEntries.slice(0, 2).forEach((entry, index) => slots[oddSlots[index]] = entry);
  evenEntries.slice(0, 2).forEach((entry, index) => slots[evenSlots[index]] = entry);

  const overflow = [...oddEntries.slice(2), ...evenEntries.slice(2)];
  for (let index = 0; index < 4; index++) {
    if (slots[index] === undefined)
      slots[index] = overflow.shift();
  }
  return slots.filter((entry) => entry !== undefined);
};

const myDmuP2IdleSort = (data, entries) =>
  myDmuP2TowerScheme(data) === myDmuP2TowerSchemes.pair2222 &&
  myDmuP2Pair2222IdleOddMode(data) === myDmuP2Pair2222IdleOddModes.cone
    ? myDmuOddEvenSlotSort(
      myDmuP2RoleSort(entries.filter((entry) => entry.mechanic === 'cone'), myDmuP2Pair2222IdleOrder),
      myDmuP2RoleSort(entries.filter((entry) => entry.mechanic !== 'cone'), myDmuP2Pair2222IdleOrder),
    )
    : myDmuP2RoleSort(
      entries,
      myDmuP2TowerScheme(data) === myDmuP2TowerSchemes.pair2222 ? myDmuP2Pair2222IdleOrder : myDmuRoleOrder,
    );

const myDmuEnsureP2RoleStackGroups = (data, entries) => {
  const groupA = [];
  for (const group of ['TN', 'DPS']) {
    const groupEntries = entries
      .filter((entry) => entry.group === group)
      .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
    const selected = groupEntries.filter((entry) => entry.mechanic === 'stack').slice(0, 2);
    for (const entry of groupEntries) {
      if (selected.length >= 2)
        break;
      if (!selected.some((item) => item.id === entry.id))
        selected.push(entry);
    }
    groupA.push(...selected);
  }

  data.myDmuP2GroupA = myDmuP2RoleSort(groupA);
  data.myDmuP2GroupB = entries
    .filter((entry) => !groupA.some((item) => item.id === entry.id))
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  data.myDmuP2InitialLocked = data.myDmuP2GroupA.length === 4 && data.myDmuP2GroupB.length === 4;
  return data.myDmuP2InitialLocked;
};

const myDmuEnsureP2Pair2222Groups = (data, entries) => {
  const entriesByRole = Object.fromEntries(entries.map((entry) => [entry.role, entry]));
  const pairGroups = myDmuP2Pair2222Groups.map((roles) => roles.map((role) => entriesByRole[role]));
  if (pairGroups.some((pair) => pair.some((entry) => entry === undefined)))
    return false;

  const stackPairs = pairGroups.filter((pair) => pair.some((entry) => entry.mechanic === 'stack'));
  if (stackPairs.length !== 2)
    return false;

  const groupA = stackPairs.flat();
  const groupAIds = new Set(groupA.map((entry) => entry.id));
  data.myDmuP2GroupA = myDmuP2RoleSort(groupA);
  data.myDmuP2GroupB = myDmuP2RoleSort(entries.filter((entry) => !groupAIds.has(entry.id)));
  data.myDmuP2InitialLocked = data.myDmuP2GroupA.length === 4 && data.myDmuP2GroupB.length === 4;
  return data.myDmuP2InitialLocked;
};

const myDmuEnsureP2Groups = (data) => {
  if (data.myDmuP2InitialLocked)
    return true;

  const entries = Object.values(data.myDmuP2Initial ?? {});
  if (entries.length < 8 || entries.some((entry) => entry.role === undefined))
    return false;

  if (myDmuP2TowerScheme(data) === myDmuP2TowerSchemes.pair2222)
    return myDmuEnsureP2Pair2222Groups(data, entries);
  return myDmuEnsureP2RoleStackGroups(data, entries);
};

const myDmuP2ActiveGroup = (data, round) =>
  myDmuP2ARounds.has(round) ? data.myDmuP2GroupA : data.myDmuP2GroupB;

const myDmuP2IdleGroup = (data, round) =>
  myDmuP2IdleSort(
    data,
    (myDmuP2ARounds.has(round) ? data.myDmuP2GroupB : data.myDmuP2GroupA)
      .map((entry) => data.myDmuP2Current?.[entry.id] ?? entry),
  );

const myDmuP2RoundEntries = (data, round) => {
  if (!myDmuEnsureP2Groups(data))
    return [];
  return myDmuP2ActiveGroup(data, round).map((entry) => data.myDmuP2Current?.[entry.id] ?? entry);
};

const myDmuP2HeadmarkerCandidateRound = (data) => {
  if ((data.myDmuP2Round ?? 0) <= 0)
    return 1;
  return Math.min(data.myDmuP2Round + 1, 8);
};

const myDmuP2RecordRoundHeadmarker = (data, round, id) => {
  if (round < 1 || round > 8 || id === undefined)
    return 0;
  data.myDmuP2RoundSeen[round] ??= {};
  data.myDmuP2RoundSeen[round][id] = true;
  return Object.keys(data.myDmuP2RoundSeen[round]).length;
};

const myDmuP2RecordAbilityRound = (data) => {
  const round = Math.min((data.myDmuP2AbilityRound ?? 0) + 1, 8);
  data.myDmuP2AbilityRound = round;
  data.myDmuP2Round = round;
  return round;
};

const myDmuP2StopMarkerForStack = (entry, entries, usedMarkers) => {
  const sameGroup = entries.filter((item) => item.group === entry.group);
  const spreadCount = sameGroup.filter((item) => item.mechanic === 'spread').length;
  const coneCount = sameGroup.filter((item) => item.mechanic === 'cone').length;
  const preferred = spreadCount > coneCount ? ['stop2', 'stop1'] : ['stop1', 'stop2'];
  for (const marker of preferred) {
    if (!usedMarkers.has(marker)) {
      usedMarkers.add(marker);
      return marker;
    }
  }
  return 'stop2';
};

const myDmuP2LegacyDesiredMarkers = (entries) => {
  const desired = [];
  const stacks = entries.filter((entry) => entry.mechanic === 'stack');
  if (stacks.length > 0) {
    const usedStops = new Set();
    for (const entry of stacks.sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role))) {
      desired.push({ id: entry.id, marker: myDmuP2StopMarkerForStack(entry, entries, usedStops) });
    }
  }

  const cones = entries
    .filter((entry) => entry.mechanic === 'cone')
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  const spreads = entries
    .filter((entry) => entry.mechanic === 'spread')
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  cones.forEach((entry, index) =>
    desired.push({ id: entry.id, marker: ['bind1', 'bind2', 'bind3', 'triangle'][index] ?? 'triangle' }));
  spreads.forEach((entry, index) =>
    desired.push({ id: entry.id, marker: ['attack1', 'attack2', 'attack3', 'circle'][index] ?? 'circle' }));
  return desired;
};

const myDmuP2DesiredMarkers = (data, round) => {
  const entries = myDmuP2RoundEntries(data, round);
  if (entries.length !== 4)
    return [];

  let desired = myDmuP2LegacyDesiredMarkers(entries);
  if (round % 2 === 1) {
    desired = [];
    const cones = entries
      .filter((entry) => entry.mechanic === 'cone')
      .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
    const spreads = entries
      .filter((entry) => entry.mechanic === 'spread')
      .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
    cones.forEach((entry, index) =>
      desired.push({ id: entry.id, marker: ['triangle', 'bind1', 'bind2', 'bind3'][index] ?? 'bind3' }));
    spreads.forEach((entry, index) =>
      desired.push({ id: entry.id, marker: ['circle', 'attack1', 'attack2', 'attack3'][index] ?? 'attack3' }));
    const usedStops = new Set();
    entries
      .filter((entry) => entry.mechanic === 'stack')
      .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role))
      .forEach((entry) => desired.push({ id: entry.id, marker: myDmuP2StopMarkerForStack(entry, entries, usedStops) }));
  }

  myDmuP2IdleGroup(data, round).forEach((entry, index) =>
    desired.push({ id: entry.id, marker: myDmuP2Pair2222IdleMarkers[index] ?? 'attack8' }));
  return desired;
};

const myDmuApplyP2Round = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMark'))
    return false;
  const desired = myDmuP2DesiredMarkers(data, round);
  if (desired.length < 4)
    return false;

  const signature = desired.map((item) => `${item.id}:${item.marker}`).join('|');
  if (data.myDmuP2AppliedRoundSignatures?.[round] === signature)
    return true;

  myDmuMarkQueue(data, desired, `绝妖星 P2 八轮塔 ${round}`);
  data.myDmuP2AppliedRounds[round] = true;
  data.myDmuP2AppliedRoundSignatures[round] = signature;
  return true;
};

const myDmuScheduleP2Round8 = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P2TowerMark'))
    return;
  if (data.myDmuP2Round8Timer !== undefined)
    clearTimeout(data.myDmuP2Round8Timer);
  data.myDmuP2Round8Timer = setTimeout(() => {
    data.myDmuP2Round8Timer = undefined;
    if (data.myDmuPhase !== 'p2' || (data.myDmuP2AbilityRound ?? 0) !== 7)
      return;
    data.myDmuP2Round = 8;
    myDmuApplyP2Round(data, 8);
  }, 600);
};

const myDmuP2Instruction = (data, round) => {
  const entries = myDmuP2RoundEntries(data, round);
  if (entries.length !== 4)
    return `第${round}轮准备`;

  const myId = myDmuGetHexIdByName(data, data.me);
  const own = entries.find((entry) => entry.name === data.me || entry.id === myId);
  if (own !== undefined)
    return `第${round}轮踩塔：${myDmuP2MechanicText[own.mechanic] ?? '处理'}`;

  return myDmuP2GuideRounds.has(round) ? `第${round}轮闲人：超级跳` : `第${round}轮闲人：引导`;
};

const myDmuP2FuturePastText = (data, type) => {
  if (data.myDmuP2FuturePastCount === 4)
    return type === 'future' ? '未来：穿' : '过去：原地';
  return type === 'future' ? '未来：塔对面' : '过去：塔中间';
};

const myDmuP3ElementDebuffText = (matches) => {
  const buff = myDmuP3ElementDebuffs[matches.effectId?.toUpperCase()];
  if (buff === undefined)
    return undefined;
  if (buff.kind === 'fire' || buff.kind === 'water') {
    const prefix = (myDmuNumber(matches.duration) ?? 0) > 60 ? '长' : '短';
    return `${prefix}${buff.text}`;
  }
  return buff.text;
};

const myDmuNearestMahjongPoint = (x, z) => {
  let best;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const point of myDmuP3MahjongPoints) {
    const dist = (x - point.x) ** 2 + (z - point.z) ** 2;
    if (dist < bestDist) {
      best = point;
      bestDist = dist;
    }
  }
  if (best === undefined)
    return undefined;
  return { ...best, distance: Math.sqrt(bestDist) };
};

const myDmuOppositePointIndex = (index) => ((index + 3) % 8) + 1;

const myDmuStepBetween = (firstIndex, secondIndex) => {
  const clockwise = (secondIndex - firstIndex + 8) % 8;
  if (clockwise === 0)
    return 0;
  return clockwise <= 4 ? 1 : -1;
};

const myDmuMahjongTargetPosition = (baseIndex, standStep, mahjong) => {
  const angle = ((baseIndex - 1) * 45 + standStep * (22.5 + (mahjong - 1) * 45)) % 360;
  const rad = angle * Math.PI / 180;
  return {
    x: 100 + Math.sin(rad) * 18.8,
    z: 100 - Math.cos(rad) * 18.8,
  };
};

const myDmuBuildMahjongPlan = (lines) => {
  if ((lines?.length ?? 0) < 2)
    return undefined;

  const first = lines[0];
  const second = lines[1];
  const attackStep = myDmuStepBetween(first.point.index, second.point.index);
  const standStep = -attackStep;
  const baseIndex = myDmuOppositePointIndex(first.point.index);
  const leftSlots = [];
  const rightSlots = [];

  for (let mahjong = 1; mahjong <= 8; mahjong++) {
    const target = myDmuMahjongTargetPosition(baseIndex, standStep, mahjong);
    const slot = { mahjong: mahjong, x: target.x, z: target.z };
    if (slot.x < 100)
      leftSlots.push(slot);
    else
      rightSlots.push(slot);
  }

  const topToBottom = (a, b) => a.z === b.z ? a.x - b.x : a.z - b.z;
  leftSlots.sort(topToBottom);
  rightSlots.sort(topToBottom);

  if (leftSlots.length !== 4 || rightSlots.length !== 4)
    return { markerByMahjong: myDmuP3MahjongDirectMarkers, mode: 'direct' };

  const markerByMahjong = {};
  leftSlots.forEach((slot, index) => markerByMahjong[slot.mahjong] = myDmuP3MahjongLeftMarkers[index]);
  rightSlots.forEach((slot, index) => markerByMahjong[slot.mahjong] = myDmuP3MahjongRightMarkers[index]);
  return {
    markerByMahjong: markerByMahjong,
    mode: 'fixedA',
  };
};

const myDmuP3MahjongDirection = (lines) => {
  if ((lines?.length ?? 0) < 2)
    return undefined;

  const attackStep = myDmuStepBetween(lines[0].point.index, lines[1].point.index);
  if (attackStep === 0)
    return undefined;
  const chargePoint = myDmuP3MahjongPoints.find((point) => point.index === myDmuOppositePointIndex(lines[0].point.index));
  if (chargePoint === undefined)
    return undefined;

  return {
    chargePoint: chargePoint.label,
    crowdDirection: attackStep > 0 ? '逆' : '顺',
  };
};

const myDmuOwnP3Mahjong = (data) => {
  const markers = Object.values(data.myDmuP3Mahjong?.markers ?? {});
  const myId = myDmuGetHexIdByName(data, data.me);
  return markers.find((entry) => entry.name === data.me || entry.id === myId);
};

const myDmuP3MahjongCalloutText = (data) => {
  const state = data.myDmuP3Mahjong;
  const direction = myDmuP3MahjongDirection(state?.lines);
  const own = myDmuOwnP3Mahjong(data);
  if (direction === undefined || own === undefined)
    return undefined;
  return `麻将${own.mahjong}冲${direction.chargePoint} 人群${direction.crowdDirection}`;
};

const myDmuCacheP3MahjongCallout = (data) => {
  const state = data.myDmuP3Mahjong;
  if (state?.calloutShown)
    return undefined;
  const text = myDmuP3MahjongCalloutText(data);
  if (text === undefined)
    return undefined;
  state.calloutShown = true;
  return myDmuCacheSpeech(data, 'p3MahjongDirection', text);
};

const myDmuApplyP3MahjongMarkers = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P3MahjongMark'))
    return false;
  const state = data.myDmuP3Mahjong;
  if (state?.marked)
    return true;
  const markers = Object.values(state?.markers ?? {});
  if (markers.length < 8)
    return false;

  if (state.plan === undefined) {
    if (state.lines.length >= 2)
      state.plan = myDmuBuildMahjongPlan(state.lines);
    else if (state.allowDirectFallback)
      state.plan = { markerByMahjong: myDmuP3MahjongDirectMarkers, mode: 'direct' };
  }
  if (state.plan === undefined)
    return false;

  const desired = markers.map((entry) => ({
    id: entry.id,
    marker: state.plan.markerByMahjong[entry.mahjong],
  }));
  myDmuMarkQueue(data, desired, '绝妖星 P3 麻将');
  state.marked = true;
  return true;
};

const myDmuRecordP3MahjongLine = (data, matches) => {
  const x = myDmuNumber(matches.x);
  const z = myDmuNumber(matches.y) ?? myDmuNumber(matches.z);
  if (x === undefined || z === undefined)
    return;

  const point = myDmuNearestMahjongPoint(x, z);
  if (point === undefined)
    return;

  const state = data.myDmuP3Mahjong;
  if (state.lines.some((line) => line.point.index === point.index))
    return;

  state.lines.push({ point: point });
  if (state.lines.length === 2)
    state.plan = myDmuBuildMahjongPlan(state.lines);
};

const myDmuP4TruthFromStatus = (matches) => {
  for (const field of ['data0', 'data3']) {
    const status = matches[field]?.toString().toUpperCase();
    const truth = myDmuP4TruthStatuses[status];
    if (truth !== undefined)
      return truth;
  }
  return undefined;
};

const myDmuSortTargetEntries = (entries, order) =>
  entries.sort((a, b) => myDmuRolePriority(a.role, order) - myDmuRolePriority(b.role, order));

const myDmuP4TruthFor = (data, buffId, firstSeenAt) => {
  const source = myDmuP4TruthSource(buffId);
  if (source === undefined)
    return undefined;

  const events = data.myDmuP4.truthEvents?.[source] ?? [];
  let bestBefore;
  let bestBeforeDiff;
  let bestAfter;
  let bestAfterDiff;
  for (const event of events) {
    const at = event.at;
    if (typeof at !== 'number')
      continue;
    const diff = firstSeenAt === undefined ? 0 : Math.abs(firstSeenAt - at);
    if (firstSeenAt === undefined) {
      if (bestBefore === undefined || at > bestBefore.at) {
        bestBefore = event;
        bestBeforeDiff = diff;
      }
    } else if (at <= firstSeenAt && diff <= 15000) {
      if (bestBefore === undefined || at > bestBefore.at) {
        bestBefore = event;
        bestBeforeDiff = diff;
      }
    } else if (at > firstSeenAt && diff <= 2500) {
      if (bestAfter === undefined || diff < bestAfterDiff) {
        bestAfter = event;
        bestAfterDiff = diff;
      }
    }
  }
  if (bestBefore !== undefined)
    return { value: bestBefore.value, at: bestBefore.at, diff: bestBeforeDiff };
  if (bestAfter !== undefined)
    return { value: bestAfter.value, at: bestAfter.at, diff: bestAfterDiff };

  const value = data.myDmuP4.truth?.[source];
  const at = data.myDmuP4.truthAt?.[source];
  if (value === undefined || at === undefined)
    return undefined;
  const diff = firstSeenAt === undefined ? 0 : Math.abs(firstSeenAt - at);
  if (firstSeenAt === undefined || (at <= firstSeenAt && diff <= 15000) || (at > firstSeenAt && diff <= 2500))
    return { value: value, at: at, diff: diff };
  return undefined;
};

const myDmuP4RefreshRecordTruth = (data, rec) => {
  const truth = myDmuP4TruthFor(data, rec.buffId, rec.firstSeenAt);
  if (truth === undefined)
    return false;
  if (rec.truth !== undefined && rec.truthDiff !== undefined && truth.diff >= rec.truthDiff)
    return true;
  rec.truth = truth.value;
  rec.truthAt = truth.at;
  rec.truthDiff = truth.diff;
  return true;
};

const myDmuTryApplyP3TargetMarkers = (data) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P3TargetMark'))
    return false;
  const state = data.myDmuP3Targets;
  if (state.marked)
    return true;
  if (state.first.length !== 3 || state.second.length !== 3 || state.third.length !== 2)
    return false;

  const firstOrder = myDmuP3TargetFirstPriority(data);
  const secondOrder = myDmuP3TargetSecondPriority(data);
  const thirdOrder = myDmuP3TargetThirdPriority(data);
  const desired = [];
  myDmuSortTargetEntries(state.first, firstOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['attack1', 'attack2', 'attack3'][index] }));
  myDmuSortTargetEntries(state.second, secondOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['bind1', 'bind2', 'bind3'][index] }));
  myDmuSortTargetEntries(state.third, thirdOrder)
    .forEach((entry, index) => desired.push({ id: entry.id, marker: ['stop1', 'stop2'][index] }));

  myDmuMarkQueue(data, desired, '绝妖星 P3 一二三目标');
  state.marked = true;
  return true;
};

const myDmuP4RecordTruth = (data, target, value) => {
  const now = Date.now();
  data.myDmuP4.truthEvents[target] ??= [];
  data.myDmuP4.truthEvents[target].push({ at: now, value: value });
  while (data.myDmuP4.truthEvents[target].length > 12)
    data.myDmuP4.truthEvents[target].shift();
  data.myDmuP4.truth[target] = value;
  data.myDmuP4.truthAt[target] = now;
  for (const rec of data.myDmuP4.buffRecords ?? []) {
    if (myDmuP4TruthSource(rec.buffId) === target)
      myDmuP4RefreshRecordTruth(data, rec);
  }
};

const myDmuP4TruthSource = (buffId) => {
  if (buffId === '15AB' || buffId === '15AC')
    return 'chaos';
  if (['15A7', '15A8', '15A9', '15AA', '1C6', '566', '1558'].includes(buffId))
    return 'ex';
  return undefined;
};

const myDmuP4CacheBuff = (data, matches) => {
  const buffId = matches.effectId.toUpperCase();
  const targetId = matches.targetId;
  const role = myDmuGetRpByName(data, matches.target);
  const duration = myDmuNumber(matches.duration);
  const now = Date.now();
  data.myDmuP4.buffs[targetId] ??= {};
  data.myDmuP4.buffRecords ??= [];
  data.myDmuP4.buffSerial = (data.myDmuP4.buffSerial ?? 0) + 1;
  const rec = {
    serial: data.myDmuP4.buffSerial,
    id: targetId,
    name: matches.target,
    role: role,
    group: myDmuRoleGroup(role),
    buffId: buffId,
    firstSeenAt: now,
  };
  rec.role = role;
  rec.group = myDmuRoleGroup(role);
  rec.duration = duration;
  rec.initialDuration ??= duration;
  myDmuP4RefreshRecordTruth(data, rec);
  data.myDmuP4.buffRecords.push(rec);
  data.myDmuP4.buffs[targetId][buffId] = rec;
  return rec;
};

const myDmuP4RecordsFor = (data, buffIds) => {
  const wanted = new Set(buffIds);
  const records = (data.myDmuP4.buffRecords ?? []).filter((rec) => wanted.has(rec.buffId));
  return records.sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
};

const myDmuP4RecordForEvent = (data, targetId, buffId, duration) => {
  let candidates = (data.myDmuP4.buffRecords ?? [])
    .filter((rec) => rec.id === targetId && rec.buffId === buffId);
  if (duration !== undefined) {
    const durationCandidates = candidates.filter((rec) => {
      const recDuration = rec.initialDuration ?? rec.duration;
      return recDuration !== undefined && Math.abs(recDuration - duration) < 0.2;
    });
    if (durationCandidates.length > 0)
      candidates = durationCandidates;
  }
  candidates.sort((a, b) => (b.firstSeenAt ?? 0) - (a.firstSeenAt ?? 0));
  return candidates[0];
};

const myDmuP4ClassifyLengths = (records) => {
  const durations = records.map((rec) => rec.initialDuration ?? rec.duration).filter((duration) => duration !== undefined);
  if (durations.length === 0)
    return false;
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const threshold = maxDuration - minDuration >= 8 ? (minDuration + maxDuration) / 2 : 65;
  for (const rec of records) {
    const duration = rec.initialDuration ?? rec.duration;
    if (duration !== undefined)
      rec.length = duration < threshold ? 'short' : 'long';
  }
  return true;
};

const myDmuP4ElementSide = (rec) => {
  if (rec.truth === undefined)
    return undefined;
  if (rec.buffId === '15A8')
    return rec.truth ? 'out' : 'in';
  if (rec.buffId === '15A9')
    return rec.truth ? 'in' : 'out';
  return undefined;
};

const myDmuP4BuffChatKey = (prefix, rec) =>
  `${prefix}:${rec?.serial ?? ''}:${rec?.id ?? ''}:${rec?.buffId ?? ''}:${rec?.initialDuration ?? rec?.duration ?? ''}`;

const myDmuP4RecordExpiresAt = (rec) => {
  const firstSeenAt = rec?.firstSeenAt;
  const duration = rec?.initialDuration ?? rec?.duration;
  if (typeof firstSeenAt !== 'number' || duration === undefined)
    return undefined;
  return firstSeenAt + duration * 1000;
};

const myDmuSendP4BuffChat = (data, key, text) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  data.myDmuP4.buffChatSent ??= {};
  if (data.myDmuP4.buffChatSent[key])
    return true;
  myDmuDoTextCommand(data, `/e ${text}`);
  data.myDmuP4.buffChatSent[key] = true;
  return true;
};

const myDmuP4OwnRecordsFor = (data, buffIds) =>
  myDmuP4RecordsFor(data, buffIds).filter((rec) => rec.name === data.me);

const myDmuP4ElementActionText = (rec) => {
  const side = myDmuP4ElementSide(rec);
  if (side === 'out')
    return '分散';
  if (side === 'in')
    return '分摊';
  return undefined;
};

const myDmuP4AccelerationActionText = (rec) => {
  if (rec?.truth === true)
    return '静';
  if (rec?.truth === false)
    return '动';
  return undefined;
};

const myDmuP4ChaosActionText = (rec) => {
  if (rec?.truth === undefined)
    return undefined;
  if (rec.buffId === '15AB')
    return rec.truth ? '钢铁' : '月环';
  if (rec.buffId === '15AC')
    return rec.truth ? '月环' : '钢铁';
  return undefined;
};

const myDmuP4ActionText = (rec) => {
  if (myDmuP4ElementBuffs.includes(rec?.buffId))
    return myDmuP4ElementActionText(rec);
  if (rec?.buffId === myDmuP4AccelerationBuff)
    return myDmuP4AccelerationActionText(rec);
  if (myDmuP4ChaosBuffs.includes(rec?.buffId))
    return myDmuP4ChaosActionText(rec);
  return undefined;
};

const myDmuTrySendP4ElementChat = (data) => {
  const ownRecords = myDmuP4OwnRecordsFor(data, myDmuP4ElementBuffs);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  for (const rec of ownRecords) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4ElementActionText(rec);
    if (action === undefined) {
      ready = false;
      continue;
    }
    myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('element', rec), `P4记忆：${action}`);
  }
  return ready;
};

const myDmuTrySendP4AccelerationChat = (data) => {
  const ownRecords = myDmuP4OwnRecordsFor(data, [myDmuP4AccelerationBuff]);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  for (const rec of ownRecords) {
    myDmuP4RefreshRecordTruth(data, rec);
    const action = myDmuP4AccelerationActionText(rec);
    if (action === undefined) {
      ready = false;
      continue;
    }
    myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('accel', rec), `P4记忆：${action}`);
  }
  return ready;
};

const myDmuTrySendP4ExecuteChat = (data, rec) => {
  if (rec === undefined)
    return false;
  myDmuP4RefreshRecordTruth(data, rec);
  const action = myDmuP4ActionText(rec);
  if (action === undefined)
    return false;
  return myDmuSendP4BuffChat(data, myDmuP4BuffChatKey('exec', rec), `P4执行：${action}`);
};

const myDmuTrySendP4ChaosChat = (data) => {
  const ownRecords = myDmuP4OwnRecordsFor(data, myDmuP4ChaosBuffs);
  if (ownRecords.length === 0)
    return true;

  let ready = true;
  const fires = ownRecords.filter((rec) => rec.buffId === '15AB').sort((a, b) => (a.firstSeenAt ?? 0) - (b.firstSeenAt ?? 0));
  const waters = ownRecords.filter((rec) => rec.buffId === '15AC').sort((a, b) => (a.firstSeenAt ?? 0) - (b.firstSeenAt ?? 0));
  const pairCount = Math.max(fires.length, waters.length);
  for (let index = 0; index < pairCount; index++) {
    const pair = [fires[index], waters[index]].filter((rec) => rec !== undefined);
    if (pair.length < 2) {
      ready = false;
      continue;
    }
    const ordered = pair.sort((a, b) => {
      const aAt = myDmuP4RecordExpiresAt(a);
      const bAt = myDmuP4RecordExpiresAt(b);
      if (aAt !== undefined && bAt !== undefined)
        return aAt - bAt;
      return (a.initialDuration ?? a.duration ?? 0) - (b.initialDuration ?? b.duration ?? 0);
    });
    const actions = ordered.map((rec) => {
      myDmuP4RefreshRecordTruth(data, rec);
      return myDmuP4ChaosActionText(rec);
    });
    if (actions.some((action) => action === undefined)) {
      ready = false;
      continue;
    }

    const key = ordered.map((rec) => myDmuP4BuffChatKey('chaos', rec)).join('|');
    myDmuSendP4BuffChat(data, key, `P4记忆：先${actions[0]} 后${actions[1]}`);
  }
  return ready;
};

const myDmuTrySendP4BuffChats = (data) => {
  if (data.myDmuPhase !== 'p4' || !myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true))
    return true;
  const elementReady = myDmuTrySendP4ElementChat(data);
  const accelerationReady = myDmuTrySendP4AccelerationChat(data);
  const chaosReady = myDmuTrySendP4ChaosChat(data);
  return elementReady && accelerationReady && chaosReady;
};

const myDmuApplyP4ElementRound = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMark'))
    return false;
  if (data.myDmuP4.elementMarked[round])
    return true;

  const records = myDmuP4RecordsFor(data, myDmuP4ElementBuffs);
  myDmuP4ClassifyLengths(records);
  const targets = { TN: undefined, DPS: undefined };
  for (const rec of records) {
    if (rec.length === round && myDmuP4ElementSide(rec) === 'out' && targets[rec.group] === undefined)
      targets[rec.group] = rec;
  }
  if (targets.TN === undefined || targets.DPS === undefined)
    return false;

  myDmuMarkQueue(data, [
    { id: targets.TN.id, marker: 'attack1' },
    { id: targets.DPS.id, marker: 'attack2' },
  ], `绝妖星 P4 元素 ${round}`);
  data.myDmuP4.elementMarked[round] = true;
  return true;
};

const myDmuApplyP4PetrifyRound = (data, round) => {
  if (!myDmuMarkEnabled(data, 'MyDMU_P4BuffMark'))
    return false;
  if (round === undefined || data.myDmuP4.petrifyMarked[round])
    return false;

  const records = myDmuP4RecordsFor(data, [myDmuP4PetrifyBuff]);
  myDmuP4ClassifyLengths(records);
  const realRecords = records
    .filter((rec) => rec.length === round && rec.truth === true)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  const fakeRecords = records
    .filter((rec) => rec.length === round && rec.truth === false)
    .sort((a, b) => myDmuRolePriority(a.role) - myDmuRolePriority(b.role));
  if (realRecords.length + fakeRecords.length < 2)
    return false;

  const desired = [];
  realRecords.forEach((rec, index) => desired.push({ id: rec.id, marker: ['stop1', 'stop2'][index] ?? 'stop2' }));
  fakeRecords.forEach((rec, index) => desired.push({ id: rec.id, marker: ['bind1', 'bind2'][index] ?? 'bind2' }));
  myDmuMarkQueue(data, desired, `绝妖星 P4 石化 ${round}`);
  data.myDmuP4.petrifyMarked[round] = true;
  return true;
};

const myDmuP4RoundForTarget = (data, targetId, buffId, duration) => {
  const records = myDmuP4RecordsFor(data, [buffId]);
  myDmuP4ClassifyLengths(records);
  return myDmuP4RecordForEvent(data, targetId, buffId, duration)?.length ??
    data.myDmuP4.buffs[targetId]?.[buffId]?.length;
};

Options.Triggers.push({
  id: 'MyDancingMadUltimate',
  zoneId: 1363,
  zoneLabel: { en: '绝妖星 自用' },
  overrideTimelineFile: true,
  timelineFile: '绝妖星-自用.txt',
  config: [
    {
      id: 'MyDMU_AutoMark',
      name: { en: '自用：启用自动标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_LocalMark',
      name: { en: '自用：仅本地标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P1Callout',
      name: { en: '自用：P1 行动播报' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P1PoisonMark',
      name: { en: '自用：P1 5078锁链标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_ForceTTS',
      name: { en: '自用：强制语音播报' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P2TowerMark',
      name: { en: '自用：P2 八轮塔标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P2TowerScheme',
      name: { en: '自用：P2 八轮塔方案' },
      type: 'select',
      options: {
        en: {
          '方案一：TN/DPS 分摊优先': myDmuP2TowerSchemes.roleStack,
          '方案二：2222 固定搭档': myDmuP2TowerSchemes.pair2222,
        },
      },
      default: myDmuP2TowerSchemes.roleStack,
    },
    {
      id: 'MyDMU_P2Pair2222IdleOddMode',
      name: { en: '自用：P2 2222 固定闲人奇数规则' },
      type: 'select',
      options: {
        en: {
          '固定闲人的 TN 是奇数': myDmuP2Pair2222IdleOddModes.role,
          '固定扇形的闲人是奇数': myDmuP2Pair2222IdleOddModes.cone,
        },
      },
      default: myDmuP2Pair2222IdleOddModes.role,
    },
    {
      id: 'MyDMU_P2TowerCallout',
      name: { en: '自用：P2 八轮塔播报' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P2ActionCallout',
      name: { en: '自用：P2 行动播报' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P3MahjongMark',
      name: { en: '自用：P3 麻将标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P3TargetMark',
      name: { en: '自用：P3 一二三目标标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P3TargetFirstPriority',
      name: { en: '自用：P3 第一目标优先级' },
      type: 'string',
      default: myDmuRoleOrderText(myDmuP3TargetFirstSecondOrder),
    },
    {
      id: 'MyDMU_P3TargetSecondPriority',
      name: { en: '自用：P3 第二目标优先级' },
      type: 'string',
      default: myDmuRoleOrderText(myDmuP3TargetFirstSecondOrder),
    },
    {
      id: 'MyDMU_P3TargetThirdPriority',
      name: { en: '自用：P3 三目标优先级' },
      type: 'string',
      default: myDmuRoleOrderText(myDmuP3TargetThirdOrder),
    },
    {
      id: 'MyDMU_P3DebuffCallout',
      name: { en: '自用：P3 Debuff 播报' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P3ActionCallout',
      name: { en: '自用：P3 行动播报' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P4BuffMark',
      name: { en: '自用：P4 Buff 标点' },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MyDMU_P4BuffChat',
      name: { en: '自用：P4 Buff 默语提示' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P5MitigationAlert',
      name: { en: '自用：P5 减伤提示' },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'MyDMU_P5MitigationChannel',
      name: { en: '自用：P5 减伤聊天频道' },
      type: 'select',
      options: { en: { '默语 /e': 'e', '小队 /p': 'p' } },
      default: 'e',
    },
  ],
  initData: myDmuInitState,
  timelineTriggers: [
    ...myDmuP2TowerTimelineTriggers,
    ...myDmuP5MitigationTimelineTriggers,
    myDmuP3MahjongFallbackTimelineTrigger,
  ],
  triggers: [
    {
      id: '绝妖星 阶段追踪',
      type: 'StartsUsing',
      netRegex: { id: Object.keys(myDmuPhaseStarts), capture: true },
      run: (data, matches) => {
        data.myDmuPhase = myDmuPhaseStarts[matches.id] ?? data.myDmuPhase;
        if (data.myDmuPhase === 'p1') {
          myDmuResetP1(data);
        } else if (data.myDmuPhase === 'p2') {
          myDmuResetP2(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p3') {
          myDmuResetP3Mahjong(data);
          myDmuResetP3Targets(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p4') {
          myDmuResetP4(data);
          myDmuClearMarks(data);
        } else if (data.myDmuPhase === 'p5') {
          myDmuClearMarks(data);
        }
      },
    },
    {
      id: '绝妖星 P1 神像计数',
      type: 'StartsUsing',
      netRegex: { id: 'BCF2', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => {
        data.myDmuP1GravenCount++;
        if (data.myDmuP1GravenCount === 2)
          data.myDmuP1Stage = 'graven2';
        else if (data.myDmuP1GravenCount >= 3)
          data.myDmuP1Stage = 'graven3';
      },
    },
    {
      id: '绝妖星 P1 踩踏进入神像3',
      type: 'StartsUsing',
      netRegex: { id: 'BAB9', capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      run: (data) => data.myDmuP1Stage = 'graven3',
    },
    {
      id: '绝妖星 P1 真假头标记录',
      type: 'HeadMarker',
      netRegex: {
        id: [
          myDmuP1Headmarkers.fakeFire,
          myDmuP1Headmarkers.trueFire,
          myDmuP1Headmarkers.fakeIce,
          myDmuP1Headmarkers.trueIce,
          myDmuP1Headmarkers.fakeThunder,
          myDmuP1Headmarkers.trueThunder,
        ],
        capture: true,
      },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => myDmuP1RecordFakeHeadmarker(data, matches.id),
      delaySeconds: 5,
      run: (data) => {
        data.myDmuP1Fake.fire = false;
        data.myDmuP1Fake.ice = false;
      },
    },
    {
      id: '绝妖星 P1 第一组连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 1,
      preRun: (data, matches) => myDmuP1RecordUniqueName(data.myDmuP1Tethers, matches.target),
      delaySeconds: 0.5,
      durationSeconds: 6,
      infoText: (data) => {
        if (data.myDmuP1Tethers.length === 0)
          return;
        const onYou = data.myDmuP1Tethers.includes(data.me);
        data.myDmuP1FirstTethered = onYou;
        return myDmuCacheSpeech(data, 'p1FirstTether', onYou ? '击退' : '无');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => {
        if (myDmuSpeakCached(data, 'p1FirstTether') !== undefined)
          data.myDmuP1Tethers = [];
      },
    },
    {
      id: '绝妖星 P1 连环环陷阱收集',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => {
        myDmuP1RecordUniqueName(data.myDmuP1PoisonTargets, matches.target);
        data.myDmuP1PoisonTargetIds[matches.target] = matches.targetId;
        myDmuApplyP1PoisonMarkers(data);
      },
    },
    {
      id: '绝妖星 P1 连环环陷阱移除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p1',
      preRun: (data, matches) => {
        data.myDmuP1PoisonTargets = data.myDmuP1PoisonTargets.filter((name) => name !== matches.target);
        delete data.myDmuP1PoisonTargetIds[matches.target];
        data.myDmuP1PoisonMarkerSignature = undefined;
        if (data.myDmuP1PoisonTargets.length === 0 && myDmuMarkEnabled(data, 'MyDMU_P1PoisonMark'))
          myDmuScheduleClearMarks(data, 'p1Poison', 0.2, (data) =>
            data.myDmuP1PoisonTargets.length === 0 && myDmuMarkEnabled(data, 'MyDMU_P1PoisonMark'));
      },
    },
    {
      id: '绝妖星 P1 5078锁链标点兜底',
      type: 'StartsUsing',
      netRegex: { id: ['BAA2', 'BAA3'], capture: false },
      condition: (data) => data.myDmuPhase === 'p1',
      suppressSeconds: 1,
      run: (data) => myDmuRetryAction(() => myDmuApplyP1PoisonMarkers(data, true), 6, 250),
    },
    {
      id: '绝妖星 P1 连环环陷阱预兆',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP1PoisonBuff, capture: true },
      condition: (data) => myDmuP1CalloutEnabled(data),
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 3.5, 0),
      durationSeconds: 3.5,
      suppressSeconds: 1,
      alarmText: (data) =>
        data.myDmuP1PoisonTargets.includes(data.me) ? myDmuCacheSpeech(data, 'p1Poison', '传毒出去') : undefined,
      alertText: (data) =>
        data.myDmuP1PoisonTargets.includes(data.me) ? undefined : myDmuCacheSpeech(data, 'p1Poison', '吃毒'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Poison'),
    },
    {
      id: '绝妖星 P1 分摊分散头标',
      type: 'HeadMarker',
      netRegex: { id: [myDmuP1Headmarkers.stack, myDmuP1Headmarkers.spread], capture: true },
      condition: (data) => myDmuP1CalloutEnabled(data),
      delaySeconds: (data) => data.myDmuP1GravenCount === 1 && data.myDmuP1FirstTethered ? 1.65 : 0.5,
      durationSeconds: 6,
      suppressSeconds: 1,
      alertText: (data, matches) => myDmuCacheSpeech(data, 'p1Headmarker', myDmuP1HeadmarkerText(data, matches.id)),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Headmarker'),
    },
    {
      id: '绝妖星 P1 波动炮',
      type: 'Ability',
      netRegex: { id: 'BAA8', capture: true },
      condition: (data) => myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 1,
      preRun: (data, matches) => myDmuP1RecordUniqueName(data.myDmuP1WaveCannonTargets, matches.target),
      durationSeconds: 6,
      alertText: (data) => {
        if (data.myDmuP1WaveCannonTargets.length < 4)
          return;
        const avoid = data.myDmuP1WaveCannonTargets.includes(data.me);
        return myDmuCacheSpeech(data, 'p1WaveCannon', avoid ? '躲开' : '踩塔');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => {
        if (myDmuSpeakCached(data, 'p1WaveCannon') !== undefined)
          data.myDmuP1WaveCannonTargets = [];
      },
    },
    {
      id: '绝妖星 P1 神像2 连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 2 && matches.target === data.me,
      promise: async (data, matches) => {
        data.myDmuP1Graven2SourceX = undefined;
        data.myDmuP1PlaceRock = false;
        const sourceId = Number.parseInt(matches.sourceId, 16);
        if (!Number.isFinite(sourceId))
          return;
        const result = await callOverlayHandler({ call: 'getCombatants', ids: [sourceId] });
        data.myDmuP1Graven2SourceX = result.combatants?.[0]?.PosX;
      },
      durationSeconds: 6,
      alertText: (data) => {
        const x = data.myDmuP1Graven2SourceX;
        if (x === undefined)
          return myDmuCacheSpeech(data, 'p1Graven2Tether', '看连线');
        data.myDmuP1PlaceRock = x >= 110;
        return myDmuCacheSpeech(data, 'p1Graven2Tether', data.myDmuP1PlaceRock ? '石头' : '黑洞');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Graven2Tether'),
    },
    {
      id: '绝妖星 P1 神像2 延迟位置',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        myDmuP1CalloutEnabled(data) && data.myDmuP1GravenCount === 2 && matches.target === data.me,
      preRun: (data, matches) => {
        matches.myDmuP1Graven2TetherIndex = data.myDmuP1Graven2TetherCount;
        data.myDmuP1Graven2TetherCount++;
      },
      delaySeconds: (_data, matches) => matches.myDmuP1Graven2TetherIndex === 1 ? 6 : 8.5,
      durationSeconds: 4,
      alarmText: (data) => data.myDmuP1PlaceRock ? myDmuCacheSpeech(data, 'p1Graven2Late', '出去放石头') : undefined,
      infoText: (data) => data.myDmuP1PlaceRock ? undefined : myDmuCacheSpeech(data, 'p1Graven2Late', '中间'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Graven2Late'),
    },
    {
      id: '绝妖星 P1 神像3 箭头',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP1ArrowBuffs), capture: true },
      condition: (data, matches) => myDmuP1CalloutEnabled(data) && myDmuP1IsGraven3(data) && matches.target === data.me,
      preRun: (data, matches) => {
        const direction = myDmuP1ArrowBuffs[matches.effectId.toUpperCase()];
        if (direction === undefined)
          return;
        data.myDmuP1Arrow.push({ direction: direction, duration: myDmuNumber(matches.duration) ?? 0 });
        if (data.myDmuP1Arrow.length !== 2)
          return;
        const [first, second] = data.myDmuP1Arrow.sort((a, b) => a.duration - b.duration);
        myDmuCacheSpeech(data, 'p1Arrow', `${first.direction} + ${second.direction}`);
      },
      durationSeconds: 10,
      infoText: (data) => data.myDmuSpeech?.p1Arrow,
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Arrow'),
    },
    {
      id: '绝妖星 P1 神像3 连线收集',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data) => myDmuP1CalloutEnabled(data) && myDmuP1IsGraven3(data),
      preRun: (data, matches) => {
        if (data.myDmuP1Graven3Tethers.some((entry) => entry.target === matches.target))
          return;
        data.myDmuP1Graven3Tethers.push({ sourceId: matches.sourceId, target: matches.target });
      },
    },
    {
      id: '绝妖星 P1 神像3 连线',
      type: 'Tether',
      netRegex: { id: '002D', capture: true },
      condition: (data, matches) =>
        myDmuP1CalloutEnabled(data) && myDmuP1IsGraven3(data) && matches.target === data.me,
      delaySeconds: 3,
      durationSeconds: 7,
      promise: async (data) => {
        const result = await callOverlayHandler({ call: 'getCombatants' });
        data.myDmuP1Combatants = result.combatants ?? [];
      },
      alertText: (data) => {
        const tether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === data.me);
        const x = tether === undefined ? undefined : myDmuP1CombatantPosX(data.myDmuP1Combatants, tether.sourceId);
        if (x === undefined)
          return myDmuCacheSpeech(data, 'p1Graven3Tether', '看连线');
        return x < 100 ? myDmuCacheSpeech(data, 'p1Graven3Tether', '去外面') : undefined;
      },
      infoText: (data) => {
        const tether = data.myDmuP1Graven3Tethers.find((entry) => entry.target === data.me);
        const x = tether === undefined ? undefined : myDmuP1CombatantPosX(data.myDmuP1Combatants, tether.sourceId);
        if (x === undefined || x < 100)
          return;
        return myDmuCacheSpeech(data, 'p1Graven3Tether', '在里面');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1Graven3Tether'),
    },
    {
      id: '绝妖星 P1 制裁之光',
      type: 'StartsUsing',
      netRegex: { id: 'C622', capture: false },
      condition: (data) => myDmuP1CalloutEnabled(data),
      durationSeconds: 5,
      infoText: (data) =>
        myDmuCacheSpeech(data, 'p1LightOfJudgment', data.role === 'tank' || data.role === 'healer' ? '大AOE，后接死刑' : '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p1LightOfJudgment'),
    },
    {
      id: '绝妖星 P2 终末双腕',
      type: 'StartsUsing',
      netRegex: { id: 'C24C', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2UltimateEmbrace', '双T死刑'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2UltimateEmbrace'),
    },
    {
      id: '绝妖星 P2 遗弃末世',
      type: 'StartsUsing',
      netRegex: { id: 'BABC', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2Forsaken', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2Forsaken'),
    },
    {
      id: '绝妖星 P2 未来终结',
      type: 'StartsUsing',
      netRegex: { id: 'BAD2', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      preRun: (data) => data.myDmuP2FuturePastCount++,
      delaySeconds: 7,
      durationSeconds: (data) => data.myDmuP2FuturePastCount === 4 ? 10 : 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2FuturePast', myDmuP2FuturePastText(data, 'future')),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2FuturePast'),
    },
    {
      id: '绝妖星 P2 过去终结',
      type: 'StartsUsing',
      netRegex: { id: 'BAD3', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      preRun: (data) => data.myDmuP2FuturePastCount++,
      delaySeconds: 7,
      durationSeconds: (data) => data.myDmuP2FuturePastCount === 4 ? 10 : 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2FuturePast', myDmuP2FuturePastText(data, 'past')),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2FuturePast'),
    },
    {
      id: '绝妖星 P2 制裁之光',
      type: 'StartsUsing',
      netRegex: { id: 'BABD', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2LightOfJudgment', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2LightOfJudgment'),
    },
    {
      id: '绝妖星 P2 单翼半场',
      type: 'StartsUsing',
      netRegex: { id: ['BACD', 'BACE'], capture: true },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data, matches) => myDmuCacheSpeech(data, 'p2SingleWing', matches.id === 'BACD' ? '去右' : '去左'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2SingleWing'),
    },
    {
      id: '绝妖星 P2 双翼破坏',
      type: 'StartsUsing',
      netRegex: { id: 'C487', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(
        data,
        'p2WingsOfDestruction',
        data.role === 'tank' ? '双翅膀：近远' : '最大近战，避开坦克',
      ),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2WingsOfDestruction'),
    },
    {
      id: '绝妖星 P2 疼飕飕暴风',
      type: 'StartsUsing',
      netRegex: { id: 'C3F7', capture: false },
      condition: (data) => myDmuBooleanConfig(data, 'MyDMU_P2ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p2AeroAssault', '去脚下'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p2AeroAssault'),
    },
    {
      id: '绝妖星 P2 事计数',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP2ProgressBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      preRun: (data, matches) => {
        const count = Number(matches.count);
        const value = Number.isFinite(count) ? count : 0;
        if (matches.targetId !== undefined)
          data.myDmuP2BuffCounts[matches.targetId] = value;
        if (matches.target !== undefined)
          data.myDmuP2BuffCounts[matches.target] = value;
      },
    },
    {
      id: '绝妖星 P2 事计数清除',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP2ProgressBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p2',
      preRun: (data, matches) => {
        if (matches.targetId !== undefined)
          data.myDmuP2BuffCounts[matches.targetId] = 0;
        if (matches.target !== undefined)
          data.myDmuP2BuffCounts[matches.target] = 0;
      },
    },
    {
      id: '绝妖星 P2 八轮塔头标',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP2Headmarkers), capture: true },
      preRun: (data, matches) => {
        const mechanic = myDmuP2Headmarkers[myDmuNormalizeHeadmarkerId(matches.id)];
        if (mechanic === undefined)
          return;
        const entry = myDmuP2EntryFromHeadmarker(data, matches, mechanic);
        data.myDmuP2Initial[entry.id] ??= entry;
        data.myDmuP2Current[entry.id] = entry;
        const candidateRound = myDmuP2HeadmarkerCandidateRound(data);
        const seen = myDmuP2RecordRoundHeadmarker(data, candidateRound, entry.id);
        myDmuEnsureP2Groups(data);
        if (candidateRound === 1) {
          if (data.myDmuP2InitialLocked)
            myDmuApplyP2Round(data, 1);
          return;
        }
        if (seen >= 4)
          myDmuApplyP2Round(data, candidateRound);
      },
    },
    {
      id: '绝妖星 P2 光之波动轮次校验',
      type: 'Ability',
      netRegex: { id: 'BABE', capture: false },
      condition: (data) => data.myDmuPhase === 'p2',
      suppressSeconds: 1,
      run: (data) => {
        const round = myDmuP2RecordAbilityRound(data);
        myDmuApplyP2Round(data, round);
        if (round === 7)
          myDmuScheduleP2Round8(data);
        if (round >= 8 && myDmuMarkEnabled(data, 'MyDMU_P2TowerMark'))
          myDmuScheduleClearMarks(data, 'p2Tower', 1.2, (data) =>
            (data.myDmuP2AbilityRound ?? 0) >= 8 && myDmuMarkEnabled(data, 'MyDMU_P2TowerMark'));
      },
    },
    {
      id: '绝妖星 P3 水火Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: ['640', '641'], capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3DebuffCallout', true) &&
        matches.target === data.me,
      delaySeconds: 0.5,
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, `p3Debuff${matches.effectId}`, myDmuP3ElementDebuffText(matches)),
      tts: null,
      soundVolume: 0,
      run: (data, matches) => myDmuSpeakCached(data, `p3Debuff${matches.effectId}`),
    },
    {
      id: '绝妖星 P3 风Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: ['642', '643'], capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3DebuffCallout', true) &&
        matches.target === data.me,
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 68) - 10, 0),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data, matches) =>
        myDmuCacheSpeech(data, `p3Debuff${matches.effectId}`, myDmuP3ElementDebuffText(matches)),
      tts: null,
      soundVolume: 0,
      run: (data, matches) => myDmuSpeakCached(data, `p3Debuff${matches.effectId}`),
    },
    {
      id: '绝妖星 P3 防火墙',
      type: 'StartsUsing',
      netRegex: { id: ['C2E2', 'C2E3'], capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 5,
      suppressSeconds: 1,
      infoText: (data) => myDmuCacheSpeech(data, 'p3Firewall', '获取防火墙'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3Firewall'),
    },
    {
      id: '绝妖星 P3 深层痛楚',
      type: 'StartsUsing',
      netRegex: { id: 'BAF2', capture: false },
      condition: (data) =>
        data.myDmuPhase === 'p3' &&
        myDmuBooleanConfig(data, 'MyDMU_P3ActionCallout', true),
      durationSeconds: 5,
      infoText: (data) => myDmuCacheSpeech(data, 'p3BowelsOfAgony', '大AOE'),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3BowelsOfAgony'),
    },
    {
      id: '绝妖星 P3 麻将头标',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP3MahjongHeadmarkers), capture: true },
      durationSeconds: 8,
      preRun: (data, matches) => {
        const mahjong = myDmuP3MahjongHeadmarkers[myDmuNormalizeHeadmarkerId(matches.id)];
        if (mahjong === undefined)
          return;
        data.myDmuP3Mahjong.markers[matches.targetId] = {
          id: matches.targetId,
          name: matches.target,
          mahjong: mahjong,
        };
        myDmuApplyP3MahjongMarkers(data);
      },
      infoText: (data, matches) => matches.target === data.me ? myDmuCacheP3MahjongCallout(data) : undefined,
      tts: null,
      soundVolume: 0,
      run: (data, matches) => {
        if (matches.target === data.me)
          myDmuSpeakCached(data, 'p3MahjongDirection');
      },
    },
    {
      id: '绝妖星 P3 麻将究极冲击波方向',
      type: 'Ability',
      netRegex: { id: ['BAE3', 'BAE4'], capture: true },
      condition: (data) => data.myDmuPhase === 'p3' && data.myDmuP3Mahjong.lines.length < 2,
      preRun: (data, matches) => {
        myDmuRecordP3MahjongLine(data, matches);
        myDmuApplyP3MahjongMarkers(data);
      },
      durationSeconds: 8,
      infoText: (data) => myDmuCacheP3MahjongCallout(data),
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p3MahjongDirection'),
    },
    {
      id: '绝妖星 P3 麻将结束清除标点',
      type: 'Ability',
      netRegex: { id: 'BAE4', capture: false },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data) => {
        data.myDmuP3Mahjong.resolveCount ??= 0;
        data.myDmuP3Mahjong.resolveCount++;
        if (data.myDmuP3Mahjong.resolveCount >= 8 && data.myDmuP3Mahjong.marked)
          myDmuScheduleClearMarks(data, 'p3Mahjong', 0.5, (data) => data.myDmuP3Mahjong.resolveCount >= 8);
      },
    },
    {
      id: '绝妖星 P3 一二三目标',
      type: 'GainsEffect',
      netRegex: { effectId: Object.keys(myDmuP3TargetBuffs), capture: true },
      preRun: (data, matches) => {
        const effectId = matches.effectId.toUpperCase();
        const kind = myDmuP3TargetBuffs[effectId];
        if (kind === undefined)
          return;
        const bucket = data.myDmuP3Targets[kind];
        if (bucket.some((entry) => entry.id === matches.targetId))
          return;
        bucket.push({
          id: matches.targetId,
          name: matches.target,
          role: myDmuGetRpByName(data, matches.target),
        });
        myDmuTryApplyP3TargetMarkers(data);
      },
    },
    {
      id: '绝妖星 P3 一二三目标清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: Object.keys(myDmuP3TargetBuffs), capture: true },
      condition: (data) => data.myDmuPhase === 'p3',
      run: (data, matches) => {
        const kind = myDmuP3TargetBuffs[matches.effectId.toUpperCase()];
        if (kind === undefined)
          return;
        data.myDmuP3Targets[kind] = data.myDmuP3Targets[kind].filter((entry) => entry.id !== matches.targetId);
        const remaining = data.myDmuP3Targets.first.length + data.myDmuP3Targets.second.length +
          data.myDmuP3Targets.third.length;
        if (remaining === 0 && data.myDmuP3Targets.marked)
          myDmuScheduleClearMarks(data, 'p3Targets', 0.5, (data) =>
            data.myDmuP3Targets.first.length + data.myDmuP3Targets.second.length +
              data.myDmuP3Targets.third.length === 0 && data.myDmuP3Targets.marked);
      },
    },
    {
      id: '绝妖星 P4 真假状态列表',
      type: 'StatusEffect',
      netRegex: { data3: Object.keys(myDmuP4TruthStatuses), capture: true },
      preRun: (data, matches) => {
        const truth = myDmuP4TruthFromStatus(matches);
        if (truth === undefined)
          return;
        myDmuP4RecordTruth(data, truth.target, truth.value);
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
      },
    },
    {
      id: '绝妖星 P4 真假头标',
      type: 'HeadMarker',
      netRegex: { id: Object.keys(myDmuP4TruthHeadmarkers), capture: true },
      preRun: (data, matches) => {
        const truth = myDmuP4TruthHeadmarkers[myDmuNormalizeHeadmarkerId(matches.id)];
        if (truth === undefined)
          return;
        myDmuP4RecordTruth(data, truth.target, truth.value);
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
      },
    },
    {
      id: '绝妖星 P4 Buff 缓存与元素标点',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4TrackedBuffs, capture: true },
      preRun: (data, matches) => {
        myDmuP4CacheBuff(data, matches);
        myDmuRetryAction(() => myDmuTrySendP4BuffChats(data), 8, 500);
      },
    },
    {
      id: '绝妖星 P4 Buff 剩余5秒默语',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4PersonalActionBuffs, capture: true },
      condition: (data, matches) =>
        data.myDmuPhase === 'p4' &&
        matches.target === data.me &&
        myDmuBooleanConfig(data, 'MyDMU_P4BuffChat', true),
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 5, 0),
      run: (data, matches) => {
        const effectId = matches.effectId.toUpperCase();
        const duration = myDmuNumber(matches.duration);
        myDmuRetryAction(() => {
          const rec = myDmuP4RecordForEvent(data, matches.targetId, effectId, duration);
          return myDmuTrySendP4ExecuteChat(data, rec);
        }, 8, 300);
      },
    },
    {
      id: '绝妖星 P5 学者扩散盾',
      type: 'StartsUsing',
      netRegex: { id: 'C24A', capture: false },
      condition: (data) => data.myDmuPhase === 'p4',
      preRun: (data) => data.myDmuP4.flutteringUltimateCount++,
      delaySeconds: 9.1,
      durationSeconds: 5,
      suppressSeconds: 10,
      infoText: (data) => {
        if (
          data.myDmuP4.flutteringUltimateCount !== 2 ||
          data.job !== 'SCH' ||
          !myDmuBooleanConfig(data, 'MyDMU_P5MitigationAlert', true)
        )
          return undefined;
        return myDmuCacheSpeech(data, 'p5ScholarShield', '扩散盾');
      },
      tts: null,
      soundVolume: 0,
      run: (data) => myDmuSpeakCached(data, 'p5ScholarShield'),
    },
    {
      id: '绝妖星 P4 元素标点时机',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 5, 0),
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          matches.effectId.toUpperCase(),
          myDmuNumber(matches.duration),
        );
        myDmuRetryAction(() => myDmuApplyP4ElementRound(data, round));
      },
    },
    {
      id: '绝妖星 P4 元素结束清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4ElementBuffs, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          matches.effectId.toUpperCase(),
          myDmuNumber(matches.duration),
        ) ?? 'unknown';
        if (data.myDmuP4.elementMarked[round])
          myDmuScheduleClearMarks(data, `p4Element${round}`, 0.5, (data) => data.myDmuP4.elementMarked[round]);
      },
    },
    {
      id: '绝妖星 P4 石化标点时机',
      type: 'GainsEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      delaySeconds: (_data, matches) => Math.max((myDmuNumber(matches.duration) ?? 0) - 2.5, 0),
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          myDmuP4PetrifyBuff,
          myDmuNumber(matches.duration),
        );
        myDmuRetryAction(() => myDmuApplyP4PetrifyRound(data, round));
      },
    },
    {
      id: '绝妖星 P4 石化结束清除标点',
      type: 'LosesEffect',
      netRegex: { effectId: myDmuP4PetrifyBuff, capture: true },
      condition: (data) => data.myDmuPhase === 'p4',
      run: (data, matches) => {
        const round = myDmuP4RoundForTarget(
          data,
          matches.targetId,
          myDmuP4PetrifyBuff,
          myDmuNumber(matches.duration),
        ) ?? 'unknown';
        if (data.myDmuP4.petrifyMarked[round])
          myDmuScheduleClearMarks(data, `p4Petrify${round}`, 0.5, (data) => data.myDmuP4.petrifyMarked[round]);
      },
    },
    {
      id: '绝妖星 P2 结束清除标点',
      type: 'StartsUsing',
      netRegex: { id: 'C3F7', capture: false },
      delaySeconds: 1,
      run: (data) => myDmuClearMarks(data),
    },
  ],
  timelineReplace: [
    {
      locale: 'cn',
      replaceText: {
        'Revolting Ruin III': '恶狠狠毁荡',
        'Graven Image': '众神之像',
        'Pulse Wave': '波动冲击',
        'Mystery Magic': '玄乎乎魔法',
        'Blizzard III Blowout': '扩大大冰封',
        'Flagrant Fire III': '呼啦啦爆炎',
        'Wave Cannon': '波动炮',
        'Double-trouble Trap': '连环环陷阱',
        'Double-Trouble Trap': '连环环陷阱',
        'Explosion': '大引爆',
        'Thrumming Thunder III': '劈啪啪暴雷',
        'Light of Judgment': '制裁之光',
        'Hyperdrive': '超驱动',
        'Gravitas': '重力弹',
        'Vitrophyre': '岩石弹',
        'Intemperate Will': '扑杀的神气',
        'Gravitational Wave': '重力波',
        'Gravity III': '强重力',
        'Tele-trouncing': '唰啦啦传送',
        'Indulgent Will': '圣母的神气',
        'Idyllic Will': '睡魔的神气',
        'Indolent Will': '懒惰的神气',
        'Ave Maria': '圣母颂',
        'Ultimate Embrace': '终末双腕',
        'Forsaken': '遗弃末世',
        'The Path of Light': '光之波动',
        'Spelldriver': '咏唱危机·驱动',
        'Spellscatter': '咏唱危机·散碎',
        'Spellwave': '咏唱危机·波动',
        'Future\'s End': '未来终结',
        'Past\'s End': '过去终结',
        'All Things Ending': '消灭之脚',
        'Trine': '异三角',
        'Wings of Destruction': '破坏之翼',
        'Aero III Assault': '疼飕飕暴风',
        'Definition of Insanity': '重构',
        'the Decisive Battle': '决战',
        'Bowels of Agony': '深层痛楚',
        'Thunder III': '暴雷',
        'Stray Flames': '混沌之炎',
        'Inferno': '地狱之火炎',
        'Cyclone': '气旋',
        'Stray Spray': '混沌之水',
        'Tsunami': '大海啸',
        'Trance': '幻化',
        'Longitudinal Implosion': '经度聚爆',
        'Latitudinal Implosion': '纬度聚爆',
        'Shockwave': '震荡波',
        'Shocking Impact': '重冲击',
        'Ultima Blaster': '究极冲击波',
        'Umbra Smash': '本影爆碎',
        'Vacuum Wave': '真空波',
        'Aetherlink': '以太连接',
        'Max': '放大',
        'Earthquake': '地震',
        'Slap Happy': '响亮亮耳光',
        'Black Hole': '黑洞',
        'Nothingness': '无之波动',
        'Damning Edict': '诅咒敕令',
        'Black Spark': '暗黑火花',
        'Look upon Me and Despair': '本色出演的我',
        'Blackblood': '黑血',
        'White Hole': '白洞',
        'Blizzard III': '冰封',
        'Stomp-a-Mole': '轰隆隆跺脚',
        'Knock Down': '轰击',
        'Big Bang': '顶起',
        'Meteor': '陨石流星',
      },
    },
  ],
});
