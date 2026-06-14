// Global JavaScript for Portfolio Site

// Dark mode toggle and persistence
class DarkModeManager {
    constructor() {
        this.storageKey = 'portfolio-dark-mode';
        this.init();
    }

    init() {
        // Check localStorage or system preference
        const stored = localStorage.getItem(this.storageKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = stored ? JSON.parse(stored) : prefersDark;
        
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
            const href = link.getAttribute('href');
            
            // Home page is index.html
            const isHome = (currentPage === '' || currentPage === 'index.html') && href === 'index.html';
            
            // Other pages match directly
            const isCurrentPage = currentPage === href;
            
            if (isHome || isCurrentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return page;
    }
}

// Initialize dark mode and navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
    new NavigationManager();
    initializeHeader();
    initializeFooter();
    
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

// Header component
function initializeHeader() {
    const header = document.getElementById('header');
    
    header.innerHTML = `
        <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <!-- Logo/Branding (could be empty or minimal) -->
            <div class="flex-shrink-0"></div>
            
            <!-- Center Navigation -->
            <div class="flex gap-8 items-center">
                <a href="index.html" class="nav-link nav-pill">Home</a>
                <a href="about.html" class="nav-link nav-pill">About</a>
                <a href="certifications.html" class="nav-link nav-pill">Certifications</a>
                
                <!-- Projects with dropdown -->
                <div class="relative group">
                    <button class="nav-link nav-pill flex items-center gap-1" id="projects-btn">
                        Projects
                        <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </button>
                    
                    <!-- Dropdown Menu -->
                    <div class="dropdown-menu absolute top-full left-1/2 transform -translate-x-1/2 w-full min-w-max hidden opacity-0 transform translate-y-2 transition-all duration-300 group-hover:block group-hover:opacity-100 group-hover:translate-y-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50" id="projects-dropdown">
                        <div class="p-6">
                            <a href="projects.html" class="block text-sm font-semibold text-gray-900 dark:text-white mb-4 pb-4 border-b border-gray-200 dark:border-gray-800 hover:text-blue-600 dark:hover:text-blue-400">Show all projects →</a>
                            
                            <div class="grid grid-cols-3 gap-4" id="featured-projects-grid">
                                <!-- Projects will be populated from JSON -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Dark Mode Toggle -->
            <button id="dark-mode-toggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle dark mode">
                <svg id="sun-icon" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-2.12 2.12a1 1 0 001.414 1.414l.707-.707.707.707a1 1 0 001.414-1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707.707.707a1 1 0 11-1.414 1.414l-2.12-2.121a1 1 0 010-1.414l2.12-2.12a1 1 0 011.414 0zM17 11a1 1 0 100-2h-2a1 1 0 100 2h2zm-7 4a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM5.05 6.464a1 1 0 010-1.414l2.12-2.12a1 1 0 011.414 0l2.12 2.12a1 1 0 01-1.414 1.414l-.707-.707-.707.707a1 1 0 11-1.414-1.414zm1.414 8.486l-.707.707-.707-.707a1 1 0 00-1.414 1.414l2.12 2.121a1 1 0 001.414 0l2.12-2.12a1 1 0 00-1.414-1.415l-.707.707z" clip-rule="evenodd"></path>
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
    
    // Mark Projects as active if on projects page
    const currentPage = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';
    if (currentPage === 'projects.html' || currentPage.includes('projects/')) {
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
    
    footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <div>
                <a href="mailto:ashley@example.com" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    📧 Email
                </a>
            </div>
            
            <div class="flex gap-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    LinkedIn
                </a>
            </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-500">
            <p>&copy; 2026 Ashley Carr. All rights reserved.</p>
        </div>
    `;
}

// Load featured projects into dropdown
async function loadFeaturedProjectsDropdown() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const grid = document.getElementById('featured-projects-grid');
        if (grid) {
            const featured = projects.filter(p => p.featured).slice(0, 3);
            
            grid.innerHTML = featured.map(project => `
                <a href="${project.url}" class="group">
                    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square mb-2">
                        <img src="${project.thumbnail}" alt="${project.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
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

// Load certifications count (active only)
async function loadCertificationsCount() {
    try {
        const response = await fetch('data/certifications.json');
        const certs = await response.json();
        
        const activeCerts = certs.filter(c => c.status === 'Active' || c.status === 'Passed');
        
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
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const featured = projects.filter(p => p.featured);
        const container = document.getElementById('featured-projects');
        
        if (container) {
            container.innerHTML = featured.map(project => `
                <a href="${project.url}" class="group block">
                    <div class="project-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <!-- Project Image -->
                        <div class="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                            <img src="${project.thumbnail}" alt="${project.name}" class="w-full h-full object-cover">
                            <!-- Fallback icon -->
                            <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                            </svg>
                            
                            <!-- Slide-up overlay -->
                            <div class="project-overlay">
                                <p class="text-sm font-medium mb-4">${project.summary}</p>
                                <p class="text-xs text-gray-300">Click to view project →</p>
                            </div>
                        </div>
                        
                        <!-- Project Info -->
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${project.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${project.techStack}</p>
                            <button class="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View Project →</button>
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
        const response = await fetch('data/certifications.json');
        allCertifications = await response.json();
        
        updateCertificationStats();
        renderCertifications('all');
    } catch (error) {
        console.log('Could not load certifications');
    }
}

function updateCertificationStats() {
    const total = allCertifications.length;
    const active = allCertifications.filter(c => c.status === 'Active' || c.status === 'Passed').length;
    const retired = allCertifications.filter(c => c.status === 'Retired').length;
    const applied = allCertifications.filter(c => c.type === 'Applied Skill').length;
    
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-active').textContent = active;
    document.getElementById('stat-retired').textContent = retired;
    document.getElementById('stat-applied').textContent = applied;
}

function renderCertifications(filter) {
    let filtered = allCertifications;
    
    if (filter === 'active') {
        filtered = allCertifications.filter(c => c.status === 'Active' || c.status === 'Passed');
    } else if (filter === 'retired') {
        filtered = allCertifications.filter(c => c.status === 'Retired');
    } else if (filter === 'applied') {
        filtered = allCertifications.filter(c => c.type === 'Applied Skill');
    }
    
    // Desktop table
    const tableBody = document.getElementById('certifications-table-body');
    if (tableBody) {
        tableBody.innerHTML = filtered.map((cert, idx) => `
            <tr class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}">
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
            <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
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
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-gray-900', 'dark:bg-white', 'text-white', 'dark:text-gray-900');
                b.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            });
            btn.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-900', 'dark:text-white');
            btn.classList.add('bg-gray-900', 'dark:bg-white', 'text-white', 'dark:text-gray-900');
            
            renderCertifications(btn.getAttribute('data-filter'));
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
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const container = document.getElementById('projects-grid');
        if (container) {
            container.innerHTML = projects.map(project => `
                <a href="${project.url}" class="group block">
                    <div class="project-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <!-- Project Image -->
                        <div class="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                            <img src="${project.thumbnail}" alt="${project.name}" class="w-full h-full object-cover">
                            <!-- Fallback icon -->
                            <svg class="w-20 h-20 text-gray-400 dark:text-gray-600 absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                            </svg>
                            
                            <!-- Slide-up overlay -->
                            <div class="project-overlay">
                                <h3 class="text-lg font-semibold mb-2">${project.name}</h3>
                                <p class="text-sm mb-4">${project.summary}</p>
                                <p class="text-xs text-gray-300">View project →</p>
                            </div>
                        </div>
                        
                        <!-- Project Info -->
                        <div class="p-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${project.name}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${project.techStack}</p>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">${project.summary}</p>
                            <button class="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View Details →</button>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    } catch (error) {
        console.log('Could not load projects');
    }
}
