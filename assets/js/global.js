// Global JavaScript for Portfolio Site

const IS_NESTED_PROJECT_PAGE = window.location.pathname.includes('/projects/');
const BASE_PREFIX = IS_NESTED_PROJECT_PAGE ? '../../' : '';

function getStoredThemePreference(storageKey) {
    const storedRaw = localStorage.getItem(storageKey);

    if (storedRaw === null) {
        return null;
    }

    try {
        return JSON.parse(storedRaw);
    } catch (error) {
        return null;
    }
}

function withBasePath(path) {
    if (!path || /^(https?:|mailto:|tel:|#)/.test(path)) {
        return path;
    }

    const normalized = path.replace(/^\.\//, '');
    return `${BASE_PREFIX}${normalized}`;
}

// Dark mode toggle and persistence
class DarkModeManager {
    constructor() {
        this.storageKey = 'portfolio-dark-mode';
        this.init();
    }

    init() {
        // Check localStorage or system preference
        const stored = getStoredThemePreference(this.storageKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const shouldBeDark = stored !== null ? stored : prefersDark;
        
        if (shouldBeDark) {
            this.enable();
        } else {
            this.disable();
        }
    }

    toggle() {
        const htmlElement = document.documentElement;
        const isDark = htmlElement.classList.contains('dark');
        
        if (isDark) {
            this.disable();
        } else {
            this.enable();
        }
    }

    enable() {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.storageKey, 'true');
    }

    disable() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(this.storageKey, 'false');
    }
}

// Navigation active state detection
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setActiveNavItem();
    }

    setActiveNavItem() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page') || this.getPageNameFromHref(link.getAttribute('href'));
            
            // Home page is index.html
            const isHome = (currentPage === '' || currentPage === 'index.html') && page === 'index.html';
            
            // Other pages match directly
            const isCurrentPage = currentPage === page;
            
            if (isHome || isCurrentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    getPageNameFromHref(href) {
        if (!href) {
            return '';
        }

        const cleanHref = href.split('#')[0].split('?')[0];
        return cleanHref.substring(cleanHref.lastIndexOf('/') + 1);
    }

    getCurrentPage() {
        if (IS_NESTED_PROJECT_PAGE) {
            return 'projects.html';
        }

        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return page;
    }
}

// Initialize dark mode and navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
    initializeHeader();
    new NavigationManager();
    initializeFooter();
    initializePageMeta();
    updateDarkModeIcon();
    
    // Load page-specific content
    if (document.getElementById('featured-projects')) {
        loadFeaturedProjects();
        calculateYearsOfExperience();
        loadCertificationsCount();
    }
    
    if (document.getElementById('certifications-table-body')) {
        loadCertifications();
        setupCertificationFilters();
    }
    
    if (document.getElementById('projects-grid')) {
        loadAllProjects();
    }
});

function initializePageMeta() {
    const canonicalLink = document.getElementById('canonical-link');
    const ogUrl = document.getElementById('meta-og-url');
    const ogImage = document.getElementById('meta-og-image');
    const twitterImage = document.getElementById('meta-twitter-image');

    if (!canonicalLink && !ogUrl && !ogImage && !twitterImage) {
        return;
    }

    const canonicalHref = window.location.href.split('#')[0].split('?')[0];

    if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalHref);
    }

    if (ogUrl) {
        ogUrl.setAttribute('content', canonicalHref);
    }

    const normalizeAssetUrl = (metaElement) => {
        if (!metaElement) {
            return;
        }

        const current = metaElement.getAttribute('content');
        if (!current) {
            return;
        }

        try {
            const absolute = new URL(current, window.location.href).href;
            metaElement.setAttribute('content', absolute);
        } catch (error) {
            // Ignore invalid URL content and leave original value as-is.
        }
    };

    normalizeAssetUrl(ogImage);
    normalizeAssetUrl(twitterImage);
}

// Header component
function initializeHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    header.innerHTML = `
        <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <!-- Logo/Branding (could be empty or minimal) -->
            <div class="flex-shrink-0"></div>
            
            <!-- Center Navigation -->
            <div class="flex gap-8 items-center">
                <a href="${withBasePath('index.html')}" data-page="index.html" class="nav-link nav-pill">Home</a>
                <a href="${withBasePath('about.html')}" data-page="about.html" class="nav-link nav-pill">About</a>
                <a href="${withBasePath('certifications.html')}" data-page="certifications.html" class="nav-link nav-pill">Certifications</a>
                
                <!-- Projects with dropdown -->
                <div class="relative group">
                    <button type="button" class="nav-link nav-pill flex items-center gap-1" id="projects-btn" data-page="projects.html" aria-expanded="false" aria-haspopup="true" aria-controls="projects-dropdown">
                        Projects
                        <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </button>
                    
                    <!-- Dropdown Menu -->
                    <div class="dropdown-menu absolute left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50" id="projects-dropdown">
                        <div class="p-4 md:p-5">
                            <a href="${withBasePath('projects.html')}" class="block text-sm font-semibold text-gray-900 dark:text-white mb-4 pb-4 border-b border-gray-200 dark:border-gray-800 hover:text-blue-600 dark:hover:text-blue-400">Show all projects →</a>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3" id="featured-projects-grid">
                                <!-- Projects will be populated from JSON -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Dark Mode Toggle -->
            <button id="dark-mode-toggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle dark mode">
                <svg id="sun-icon" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.19l1.591 1.591M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.81l1.591-1.591M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                </svg>
                <svg id="moon-icon" class="w-5 h-5 text-gray-600 hidden" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            </button>
        </nav>
    `;
    
    // Attach dark mode toggle listener
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            const darkModeManager = new DarkModeManager();
            darkModeManager.toggle();
            updateDarkModeIcon();
        });
    }

    setupProjectsDropdown();
    
    // Mark Projects as active if on projects page
    const currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';
    if (currentPage === 'projects.html' || IS_NESTED_PROJECT_PAGE) {
        const projectsBtn = document.getElementById('projects-btn');
        if (projectsBtn) {
            projectsBtn.classList.add('active');
        }
    }
    
    // Load featured projects into dropdown
    loadFeaturedProjectsDropdown();
}

// Footer component
function initializeFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <div>
                <a href="mailto:alcarr92@gmail.com" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    📧 Contact me
                </a>
            </div>
            
            <div class="flex gap-6">
                <a href="https://github.com/ashley-carr" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/ashley-carr/" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    LinkedIn
                </a>
            </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-500">
            <p>&copy; 2026 Ashley Carr. All rights reserved.</p>
        </div>
    `;
}

function setupProjectsDropdown() {
    const projectsBtn = document.getElementById('projects-btn');
    const projectsDropdown = document.getElementById('projects-dropdown');

    if (!projectsBtn || !projectsDropdown) {
        return;
    }

    const openDropdown = () => {
        projectsDropdown.classList.add('active');
        projectsBtn.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
        projectsDropdown.classList.remove('active');
        projectsBtn.setAttribute('aria-expanded', 'false');
    };

    let closeTimeout = null;

    const clearCloseTimeout = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
    };

    const scheduleClose = () => {
        clearCloseTimeout();
        closeTimeout = setTimeout(() => {
            const isInteractiveHover =
                projectsBtn.matches(':hover') ||
                projectsDropdown.matches(':hover') ||
                projectsDropdown.contains(document.activeElement);

            if (!isInteractiveHover) {
                closeDropdown();
            }
        }, 240);
    };

    const currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';
    const isProjectsListPage = currentPage === 'projects.html';
    const isProjectDetailPage = IS_NESTED_PROJECT_PAGE;
    const projectsListUrl = withBasePath('projects.html');

    projectsBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // On project detail pages, the primary click action should return to Projects list.
        if (isProjectDetailPage || !isProjectsListPage) {
            window.location.href = projectsListUrl;
            return;
        }

        const isOpen = projectsDropdown.classList.contains('active');
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    const wrapper = projectsBtn.closest('.group');

    projectsBtn.addEventListener('mouseenter', () => {
        clearCloseTimeout();
        openDropdown();
    });
    projectsBtn.addEventListener('mouseleave', scheduleClose);

    projectsDropdown.addEventListener('mouseenter', () => {
        clearCloseTimeout();
        openDropdown();
    });
    projectsDropdown.addEventListener('mouseleave', scheduleClose);

    projectsBtn.addEventListener('focus', openDropdown);
    projectsBtn.addEventListener('blur', scheduleClose);
    projectsDropdown.addEventListener('focusin', () => {
        clearCloseTimeout();
        openDropdown();
    });
    projectsDropdown.addEventListener('focusout', scheduleClose);

    document.addEventListener('click', (event) => {
        if (!wrapper?.contains(event.target)) {
            clearCloseTimeout();
            closeDropdown();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            clearCloseTimeout();
            closeDropdown();
            projectsBtn.focus();
        }
    });
}

// Load featured projects into dropdown
async function loadFeaturedProjectsDropdown() {
    try {
        const response = await fetch(withBasePath('data/projects.json'));
        const projects = await response.json();
        
        const grid = document.getElementById('featured-projects-grid');
        if (grid) {
            const featured = projects.filter(p => p.featured).slice(0, 3);
            
            grid.innerHTML = featured.map(project => `
                <a href="${withBasePath(project.url)}" class="group">
                    <div class="surface-card rounded-lg overflow-hidden aspect-[16/10] mb-2">
                        <img src="${withBasePath(project.thumbnail)}" alt="${project.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                    </div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">${project.name}</p>
                </a>
            `).join('');
        }
    } catch (error) {
        console.log('Projects data not yet available');
    }
}

// Update dark mode icon
function updateDarkModeIcon() {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (document.documentElement.classList.contains('dark')) {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    } else {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    }
}

// Initialize dark mode icon on load
window.addEventListener('load', updateDarkModeIcon);

// Calculate years of experience
function calculateYearsOfExperience() {
    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    
    const yearsElement = document.getElementById('years-experience');
    if (yearsElement) {
        yearsElement.textContent = years;
    }
}

// Load certifications count (active certifications only)
async function loadCertificationsCount() {
    try {
        const response = await fetch(withBasePath('data/certifications.json'));
        const allCerts = await response.json();
        
        // Define certification types: Fundamentals, Associate, or Expert
        const certificationTypes = ['Fundamentals', 'Associate', 'Expert'];
        
        // Filter certifications (excluding Exams and Applied Skills)
        const certifications = allCerts.filter(c => certificationTypes.includes(c.type));
        
        // Count only active certifications
        const activeCerts = certifications.filter(c => c.status === 'Active');
        
        const countElement = document.getElementById('certifications-count');
        if (countElement) {
            countElement.textContent = activeCerts.length;
        }
    } catch (error) {
        console.log('Could not load certifications count');
    }
}

// Load featured projects
async function loadFeaturedProjects() {
    try {
        const response = await fetch(withBasePath('data/projects.json'));
        const projects = await response.json();
        
        const featured = projects.filter(p => p.featured);
        const container = document.getElementById('featured-projects');
        
        if (container) {
            container.innerHTML = featured.map(project => `
                <a href="${withBasePath(project.url)}" class="group block">
                    <div class="project-card surface-card overflow-hidden transition-all duration-300 flex flex-col h-full">
                        <!-- Project Image -->
                        <div class="relative h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 overflow-hidden flex-shrink-0">
                            <img src="${withBasePath(project.thumbnail)}" alt="${project.name}" class="w-full h-full object-cover">
                            <!-- Fallback icon -->
                            <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                            </svg>
                            
                            <!-- Slide-up overlay -->
                            <div class="project-overlay">
                                <p class="text-sm font-medium mb-4">${project.cardSummary}</p>
                                <p class="text-xs text-gray-300">Open case study →</p>
                            </div>
                        </div>
                        
                        <!-- Project Info -->
                        <div class="p-6 flex flex-col flex-1">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${project.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${project.techStack}</p>
                            <div class="mt-auto">
                                <span class="inline-block text-sm hover:underline card-cta">Explore Project →</span>
                            </div>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    } catch (error) {
        console.log('Could not load featured projects');
    }
}

// Load certifications and render
let allCertifications = [];

async function loadCertifications() {
    try {
        const response = await fetch(withBasePath('data/certifications.json'));
        allCertifications = await response.json();
        
        updateCertificationStats();
        renderCertifications('all');
    } catch (error) {
        console.log('Could not load certifications');
    }
}

function updateCertificationStats() {
    // Define certification types: Fundamentals, Associate, or Expert
    const certificationTypes = ['Fundamentals', 'Associate', 'Expert'];
    
    // Filter certifications (excluding Exams and Applied Skills)
    const certifications = allCertifications.filter(c => certificationTypes.includes(c.type));
    
    // Calculate stats
    const totalCerts = certifications.length;
    const activeCerts = certifications.filter(c => c.status === 'Active').length;
    const retiredCerts = certifications.filter(c => c.status === 'Retired').length;
    const examsPassed = allCertifications.filter(c => c.type === 'Exam').length;
    const appliedSkills = allCertifications.filter(c => c.type === 'Applied Skill').length;
    
    // Update DOM
    document.getElementById('stat-total-certs').textContent = totalCerts;
    document.getElementById('stat-active-certs').textContent = activeCerts;
    document.getElementById('stat-retired-certs').textContent = retiredCerts;
    document.getElementById('stat-exams').textContent = examsPassed;
    document.getElementById('stat-applied-skills').textContent = appliedSkills;
}

function renderCertifications(filter) {
    let filtered = allCertifications;
    const certificationTypes = ['Fundamentals', 'Associate', 'Expert'];
    
    if (filter === 'active') {
        // Active certifications only: Fundamentals, Associate, Expert with status "Active"
        filtered = allCertifications.filter(c => certificationTypes.includes(c.type) && c.status === 'Active');
    } else if (filter === 'retired') {
        // Retired certifications only: Fundamentals, Associate, Expert with status "Retired"
        filtered = allCertifications.filter(c => certificationTypes.includes(c.type) && c.status === 'Retired');
    } else if (filter === 'exams') {
        // Exams only
        filtered = allCertifications.filter(c => c.type === 'Exam');
    } else if (filter === 'applied') {
        // Applied skills only
        filtered = allCertifications.filter(c => c.type === 'Applied Skill');
    }
    
    // Desktop table
    const tableBody = document.getElementById('certifications-table-body');
    if (tableBody) {
        tableBody.innerHTML = filtered.map((cert, idx) => `
            <tr class="border-b border-gray-200 dark:border-gray-800 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}">
                <td class="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(cert.type)}">
                        ${cert.type}
                    </span>
                </td>
                <td class="py-4 px-4 text-sm text-gray-900 dark:text-white">${cert.title}</td>
                <td class="py-4 px-4 text-sm">
                    <span class="${getStatusColor(cert.status)}">${cert.status}</span>
                </td>
                <td class="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">${formatDate(cert.issuedOn)}</td>
            </tr>
        `).join('');
    }
    
    // Mobile cards
    const cardsContainer = document.getElementById('certifications-cards');
    if (cardsContainer) {
        cardsContainer.innerHTML = filtered.map(cert => `
            <div class="surface-card rounded-lg p-4">
                <div class="flex items-start justify-between mb-3">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(cert.type)}">
                        ${cert.type}
                    </span>
                    <span class="${getStatusColor(cert.status)}">${cert.status}</span>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">${cert.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Issued: ${formatDate(cert.issuedOn)}</p>
            </div>
        `).join('');
    }
}

function setupCertificationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    const setActiveFilter = (targetFilter) => {
        filterBtns.forEach(b => {
            const isActive = b.getAttribute('data-filter') === targetFilter;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    // Ensure pressed state matches whichever filter is currently active.
    filterBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedFilter = btn.getAttribute('data-filter');
            const isActive = btn.classList.contains('active');

            // Clicking an active non-All filter returns to All for quicker reset.
            const nextFilter = isActive && selectedFilter !== 'all' ? 'all' : selectedFilter;

            setActiveFilter(nextFilter);
            renderCertifications(nextFilter);
        });
    });
}

function getTypeBadgeColor(type) {
    const colors = {
        'Expert': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
        'Associate': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        'Fundamentals': 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
        'Applied Skill': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        'Exam': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        'Retired': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };
    return colors[type] || colors['Fundamentals'];
}

function getStatusColor(status) {
    const colors = {
        'Active': 'text-green-600 dark:text-green-400 font-medium',
        'Passed': 'text-green-600 dark:text-green-400 font-medium',
        'Retired': 'text-gray-600 dark:text-gray-400 font-medium line-through'
    };
    return colors[status] || 'text-gray-600 dark:text-gray-400 font-medium';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Load all projects for projects page
async function loadAllProjects() {
    try {
        const response = await fetch(withBasePath('data/projects.json'));
        const projects = await response.json();
        
        const container = document.getElementById('projects-grid');
        if (container) {
            container.innerHTML = projects.map(project => `
                <a href="${withBasePath(project.url)}" class="group block h-full">
                    <div class="project-card surface-card overflow-hidden transition-all duration-300 flex flex-col h-full">
                        <!-- Project Image -->
                        <div class="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                            <img src="${withBasePath(project.thumbnail)}" alt="${project.name}" class="w-full h-full object-cover">
                            <!-- Fallback icon -->
                            <svg class="w-20 h-20 text-gray-400 dark:text-gray-600 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                            </svg>
                            
                            <!-- Slide-up overlay -->
                            <div class="project-overlay">
                                <h3 class="text-lg font-semibold mb-2">${project.name}</h3>
                                <p class="text-sm mb-4">${project.cardSummary}</p>
                                <p class="text-xs text-gray-300">View project →</p>
                            </div>
                        </div>
                        
                        <!-- Project Info -->
                        <div class="p-6 flex flex-col flex-1">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${project.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${project.techStack}</p>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1">${project.cardSummary}</p>
                            <span class="inline-block text-sm hover:underline card-cta mt-auto">View Details →</span>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    } catch (error) {
        console.log('Could not load projects');
    }
}
