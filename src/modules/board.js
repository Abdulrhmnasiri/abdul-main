import { appState } from './state.js';
import { casesData } from '../data/cases.js';
import { applyTrackFilter } from './theme.js';
import { registry } from './registry.js';

export function renderCaseBoard() {
  const board = document.getElementById('case-board');
  if (!board) return;
  board.innerHTML = '';

  const statuses = [
    { key: 'Incoming', label: appState.lang === 'ar' ? 'حالات مستلمة' : 'Received Cases' },
    { key: 'Investigating', label: appState.lang === 'ar' ? 'قيد التحليل' : 'Under Analysis' },
    { key: 'Resolved', label: appState.lang === 'ar' ? 'تمت المعالجة' : 'Resolved' },
    { key: 'Prevented', label: appState.lang === 'ar' ? 'إجراء وقائي' : 'Preventive Action' }
  ];

  statuses.forEach(statusObj => {
    const col = document.createElement('div');
    col.className = 'case-column';

    const heading = document.createElement('h3');
    heading.textContent = statusObj.label;
    col.appendChild(heading);

    const filtered = casesData.filter(c => c.status === statusObj.key);

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'case-card';
      card.setAttribute('data-id', c.id);
      card.setAttribute('data-track', c.track || 'pulse_support');

      const titleText = appState.lang === 'ar' ? c.title : c.title_en;
      const summaryText = appState.lang === 'ar' ? c.summary : c.summary_en;

      card.innerHTML = `<h4>${titleText}</h4><p>${summaryText}</p>`;
      card.addEventListener('click', () => registry.get('showCaseModal')?.(c));

      col.appendChild(card);
    });

    board.appendChild(col);
  });

  applyTrackFilter();
}

export function searchCases() {
  return;
}