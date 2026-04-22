import { appState } from './state.js';
import { i18n } from '../data/translations.js';
import { projectsData } from '../data/projects.js';

const projectsState = {
  initialized: false,
  isOpen: false,
  activeProjectId: projectsData[0]?.id || null,
  activeTab: 'overview'
};

function getLangValue(project, fieldBase) {
  const suffix = appState.lang === 'ar' ? 'ar' : 'en';
  return project?.[`${fieldBase}_${suffix}`] || '';
}

function getBadge(project) {
  return appState.lang === 'ar' ? project.badge_ar : project.badge_en;
}

function getText(key) {
  return i18n?.[appState.lang]?.[key] || '';
}

function getElements() {
  return {
    explorer: document.getElementById('projectsExplorer'),
    body: document.getElementById('projectsExplorerBody'),
    title: document.getElementById('projectsExplorerTitle'),
    intro: document.getElementById('projectsExplorerIntro'),
    trigger: document.getElementById('statsProjectsCard'),
    closeBtn: document.getElementById('projectsExplorerClose')
  };
}

function renderHeaderText() {
  const { title, intro } = getElements();
  if (title) title.textContent = getText('projects_explorer_title');
  if (intro) intro.textContent = getText('projects_explorer_intro');
}

function getProjectById(id) {
  return projectsData.find(project => project.id === id) || projectsData[0] || null;
}

function getActiveTabLabel(tab) {
  const map = {
    overview: getText('project_tab_overview'),
    impact: getText('project_tab_impact'),
    role: getText('project_tab_role'),
    technical: getText('project_tab_technical')
  };
  return map[tab] || tab;
}

function getTabContent(project, tab) {
  switch (tab) {
    case 'impact':
      return {
        title: getText('project_tab_impact'),
        body: getLangValue(project, 'impact')
      };
    case 'role':
      return {
        title: getText('project_tab_role'),
        body: getLangValue(project, 'role')
      };
    case 'technical':
      return {
        title: getText('project_tab_technical'),
        body: getLangValue(project, 'technical')
      };
    case 'overview':
    default:
      return {
        title: getText('project_tab_overview'),
        body: getLangValue(project, 'overview')
      };
  }
}

function buildProjectNav(projects) {
  return `
    <div class="projects-nav">
      ${projects.map(project => `
        <button
          type="button"
          class="projects-nav-card ${projectsState.activeProjectId === project.id ? 'is-active' : ''}"
          data-project-id="${project.id}"
        >
          <span class="projects-nav-card-title">${getLangValue(project, 'title')}</span>
          <span class="projects-nav-card-summary">${getLangValue(project, 'summary')}</span>
          <span class="projects-nav-card-badge">${getBadge(project)}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function buildProjectDetail(project) {
  const tabs = ['overview', 'impact', 'role', 'technical'];
  const activeContent = getTabContent(project, projectsState.activeTab);

  return `
    <div class="projects-detail">
      <div class="projects-detail-head">
        <div class="projects-detail-title">${getLangValue(project, 'title')}</div>
        <div class="projects-detail-summary">${getLangValue(project, 'summary')}</div>
      </div>

      <div class="projects-tabs">
        ${tabs.map(tab => `
          <button
            type="button"
            class="projects-tab ${projectsState.activeTab === tab ? 'is-active' : ''}"
            data-project-tab="${tab}"
          >
            ${getActiveTabLabel(tab)}
          </button>
        `).join('')}
      </div>

      <div class="projects-detail-panel">
        <h4>${activeContent.title}</h4>
        <p>${activeContent.body}</p>

        <div class="projects-detail-meta">
          <span class="projects-detail-chip">${getBadge(project)}</span>
          <span class="projects-detail-chip">${getLangValue(project, 'title')}</span>
        </div>
      </div>
    </div>
  `;
}

function bindProjectInteractions() {
  const { body } = getElements();
  if (!body) return;

  body.querySelectorAll('[data-project-id]').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-id');
      if (!projectId) return;
      projectsState.activeProjectId = projectId;
      projectsState.activeTab = 'overview';
      renderProjectsExplorer();
    });
  });

  body.querySelectorAll('[data-project-tab]').forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-project-tab');
      if (!tab) return;
      projectsState.activeTab = tab;
      renderProjectsExplorer();
    });
  });
}

export function renderProjectsExplorer() {
  const { body } = getElements();
  if (!body) return;

  renderHeaderText();

  const activeProject = getProjectById(projectsState.activeProjectId);
  if (!activeProject) {
    body.innerHTML = '';
    return;
  }

  body.innerHTML = `
    ${buildProjectNav(projectsData)}
    ${buildProjectDetail(activeProject)}
  `;

  bindProjectInteractions();
}

function openExplorer() {
  const { explorer, trigger } = getElements();
  if (!explorer) return;

  projectsState.isOpen = true;
  explorer.classList.remove('hidden');

  if (trigger) {
    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  renderProjectsExplorer();

  explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeExplorer() {
  const { explorer, trigger } = getElements();
  if (!explorer) return;

  projectsState.isOpen = false;
  explorer.classList.add('hidden');

  if (trigger) {
    trigger.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
}

export function refreshProjectsExplorer() {
  renderHeaderText();
  if (projectsState.isOpen) {
    renderProjectsExplorer();
  }
}

export function initProjectsExplorer() {
  if (projectsState.initialized) {
    refreshProjectsExplorer();
    return;
  }

  const { trigger, closeBtn } = getElements();
  if (!trigger) return;

  projectsState.initialized = true;

  trigger.addEventListener('click', () => {
    if (projectsState.isOpen) {
      openExplorer();
      return;
    }
    openExplorer();
  });

  closeBtn?.addEventListener('click', closeExplorer);

  refreshProjectsExplorer();
}