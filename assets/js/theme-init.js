// Shared early theme initialization to prevent dark-mode flash.
(function applyInitialTheme() {
    const storageKey = 'portfolio-dark-mode';

    let storedPreference = null;
    try {
        const storedRaw = localStorage.getItem(storageKey);
        storedPreference = storedRaw !== null ? JSON.parse(storedRaw) : null;
    } catch (error) {
        storedPreference = null;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedPreference !== null ? storedPreference : prefersDark;

    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
    }

    document.documentElement.style.colorScheme = 'light dark';
})();
