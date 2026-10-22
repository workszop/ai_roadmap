import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const ROOT = new URL('..', import.meta.url);
const HTML = readFileSync(new URL('index.html', ROOT), 'utf8');

function extractData() {
  const scriptStart = HTML.indexOf('<script src="https://unpkg.com/lucide');
  const inlineStart = HTML.indexOf('<script>', scriptStart) + '<script>'.length;
  const inlineEnd = HTML.indexOf('</script>', inlineStart);
  const script = HTML.slice(inlineStart, inlineEnd);
  const dataStart = script.indexOf('  // ─── Constants ───');
  const stateStart = script.indexOf('  // ─── State ───');
  assert.ok(dataStart >= 0, 'constants marker is present');
  assert.ok(stateStart > dataStart, 'state marker follows the data');
  const preState = script.slice(dataStart, stateStart);
  const context = {};
  vm.runInNewContext(`${preState}
    globalThis.__roadmapData = { T, SOURCES, CLOCK, PHASES, AUTONOMY, RULE_OF_TWO, TOOL_RULES, SAFETY, KPIS, KPI_NOTE, INDUSTRIES, PITFALLS };
  `, context);
  return context.__roadmapData;
}

test('SME roadmap has four phases and exactly five stable actions per phase', () => {
  const { PHASES } = extractData();
  assert.deepEqual(Array.from(PHASES, (phase) => phase.id), ['choice', 'test', 'work', 'keep']);
  const actions = PHASES.flatMap((phase) => phase.streams.flatMap((stream) => stream.actions));
  assert.equal(actions.length, 20);
  assert.deepEqual(Array.from(PHASES, (phase) => phase.streams.flatMap((stream) => stream.actions).length), [5, 5, 5, 5]);
  assert.equal(new Set(actions.map((action) => action.id)).size, 20);
  actions.forEach((action) => assert.match(action.id, /^sme\.(choice|test|work|keep)\.action\.\d{3}$/));
});

test('Polish action copy uses nominal labels and every data object is bilingual', () => {
  const { T, PHASES, CLOCK, AUTONOMY, RULE_OF_TWO, TOOL_RULES, SAFETY, KPIS, KPI_NOTE, INDUSTRIES, PITFALLS } = extractData();
  const nominal = /^(Wybór|Wyznaczenie|Ustalenie|Określenie|Przygotowanie|Opracowanie|Przedstawienie|Porównanie|Przegląd|Aktualizacja|Uporządkowanie|Podjęcie)\b/;
  const actions = PHASES.flatMap((phase) => phase.streams.flatMap((stream) => stream.actions));
  actions.forEach((action) => assert.match(action.pl, nominal, action.id));
  assert.deepEqual(Object.keys(T.pl).sort(), Object.keys(T.en).sort());
  const bilingualObjects = [CLOCK, PHASES, AUTONOMY, RULE_OF_TWO, TOOL_RULES, SAFETY, KPIS, KPI_NOTE, INDUSTRIES, PITFALLS];
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== 'object') return;
    if ('pl' in value || 'en' in value) {
      assert.equal(typeof value.pl, typeof value.en);
      assert.ok(value.pl && value.en);
    }
    Object.values(value).forEach(walk);
  };
  bilingualObjects.forEach(walk);
});

test('supporting Polish guidance stays nominal and safety comes before optional automation', () => {
  const { T, PHASES, RULE_OF_TWO, TOOL_RULES, SAFETY, KPI_NOTE, INDUSTRIES } = extractData();
  const imperative = /^(Wybierz|Porównaj|Zdecyduj|Sprawdź|Zacznij|Dodaj|Ustal|Przygotuj|Przekształć|Zostaw|Aktualizuj|Porządkuj|Podejmij|Testuj|Mierz|Użyj|Skonsultuj|Ogranicz|Zapisz|Nie pozwalaj)\b/;
  const guidance = [
    T.pl.lead, T.pl.lawLead, T.pl.planLead, T.pl.gateThen, T.pl.agentsLead, T.pl.measureLead, T.pl.sourcesLead,
    ...PHASES.map((phase) => phase.intro.pl),
    ...TOOL_RULES.map((rule) => rule.pl.replace(/^Opcjonalnie:\s*/, '')),
    ...SAFETY.map((card) => card.body.pl),
    ...INDUSTRIES.map((example) => example.text.pl),
    KPI_NOTE.pl,
    RULE_OF_TWO.intro.pl,
  ];
  guidance.forEach((text) => assert.doesNotMatch(text, imperative, text));
  assert.match(T.pl.agentsLead, /Podstawy dotyczą każdego zadania/);
  assert.equal(RULE_OF_TWO.src, undefined);
  const renderStart = HTML.indexOf('function renderAgents()');
  const safetyPosition = HTML.indexOf('<div class="grid-3 mt">${safetyCards}</div>', renderStart);
  const ladderPosition = HTML.indexOf('<div class="ladder">', renderStart);
  assert.ok(safetyPosition > renderStart && safetyPosition < ladderPosition, 'baseline safety cards precede optional automation ladder');
});

test('sources and storage migration are deliberately narrow', () => {
  const { SOURCES, PHASES } = extractData();
  assert.deepEqual(Array.from(SOURCES, (source) => source.id), ['aiAct', 'agents', 'owasp']);
  SOURCES.forEach((source) => assert.match(source.url, /^https:\/\//));
  assert.ok(HTML.includes("done: 'aiRoadmap.sme.done.v1'"));
  assert.ok(HTML.includes("legacyDone: 'aiRoadmap.done'"));
  assert.ok(HTML.includes('data-legacy-notice'));
  assert.ok(HTML.includes('data-legacy-download'));
  assert.ok(!HTML.includes('gAutonomy'));
  assert.ok(!HTML.includes('Regulation (EU) 2026/1744'));
  assert.ok(!HTML.includes('KRiBSI'));
  assert.ok(PHASES.flatMap((phase) => phase.streams.flatMap((stream) => stream.actions)).every((action) => action.src === undefined || action.src.every((id) => SOURCES.some((source) => source.id === id))));
});

test('original edulab style blocks stay byte-identical to the style contract', () => {
  const styles = (html) => [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((match) => match[1]);
  const styleHash = createHash('sha256').update(styles(HTML).join('')).digest('hex');
  assert.equal(styleHash, 'd37d345e893116c5a815e506522b4afc9aca84e79ee05dd23e1b60475830f367');
});
