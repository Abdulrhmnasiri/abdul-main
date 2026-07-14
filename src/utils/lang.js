const STORAGE_KEY = 'portfolio-language-v2';

export function getSavedLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return (v === 'ar' || v === 'en') ? v : 'ar';
  } catch (_) {
    return 'ar';
  }
}

export function setSavedLang(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
}
