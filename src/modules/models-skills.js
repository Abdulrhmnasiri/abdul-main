import { appState } from './state.js';
import { i18n } from '../data/translations.js';

let bound = false;
const SKILL_HINT_SEEN_KEY = 'aa_cv_skill_hint_seen';

function getDetailsMap() {
  return i18n?.[appState.lang]?.cv_skill_details || {};
}

function getHintText() {
  return i18n?.[appState.lang]?.cv_skill_hint || '';
}

function renderDetails(detailsEl, { animate = false } = {}) {
  if (!detailsEl) return;
  const activeKey = detailsEl.dataset.activeSkill;
  const map = getDetailsMap();
  detailsEl.textContent = map[activeKey] || '—';

  if (animate) {
    detailsEl.classList.remove('is-updated');
    void detailsEl.offsetWidth;
    detailsEl.classList.add('is-updated');
  }
}

function renderHint() {
  const hintEl = document.getElementById('cvSkillHint');
  if (!hintEl) return;

  hintEl.textContent = getHintText();

  const hasSeenHint = sessionStorage.getItem(SKILL_HINT_SEEN_KEY) === '1';
  if (!hasSeenHint) {
    hintEl.classList.add('is-soft-attention');
    sessionStorage.setItem(SKILL_HINT_SEEN_KEY, '1');

    window.setTimeout(() => {
      hintEl.classList.remove('is-soft-attention');
    }, 1500);
  }
}

export function initCvSkills() {
  const listEl = document.getElementById('cvSkillsList');
  const detailsEl = document.getElementById('cvSkillDetails');
  const chips = Array.from(document.querySelectorAll('#cvSkillsList .cv-skill-chip'));

  if (!listEl || !detailsEl || chips.length === 0) return;

  renderHint();

  if (bound) {
    if (!detailsEl.dataset.activeSkill) {
      const firstKey = chips[0]?.dataset?.skill || '';
      detailsEl.dataset.activeSkill = firstKey;
    }
    renderDetails(detailsEl);
    return;
  }
  bound = true;

  const activate = (chip, { animate = true } = {}) => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    detailsEl.dataset.activeSkill = chip.dataset.skill || '';
    renderDetails(detailsEl, { animate });
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => activate(chip, { animate: true }));
  });

  const initial = chips.find(c => c.classList.contains('is-active')) || chips[0];
  activate(initial, { animate: false });
}

export function refreshCvSkillDetails() {
  renderHint();
  const detailsEl = document.getElementById('cvSkillDetails');
  renderDetails(detailsEl, { animate: false });
}