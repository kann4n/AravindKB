document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INITIALIZATION & CONFIG ---
    const supabaseUrl = 'https://qnmzzbyszgrzgqfhfuza.supabase.co';
    const supabaseKey = 'sb_publishable_bd-B3I97kZlJDwyjwRAP1g_7rtGfz7y'; // btw u can try to hack db if you want :GL
    
    // Initialize Supabase Client
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    const projectsContainer = document.querySelector('.projects-container');
    const navbar = document.querySelector('.navbar');

    // --- 2. MOBILE NAVIGATION ---
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');
            const isExpanded = navLinks.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');
            mobileNavToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    // --- 3. SCROLL EFFECTS ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    function observeNewElements() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => revealObserver.observe(el));
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.4)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 4. DYNAMIC DATA FETCHING ---
    async function loadProjects() {
        // Show a simple loading state if you want
        if (projectsContainer) {
            projectsContainer.innerHTML = '<p class="loading">Loading projects...</p>';
        }

        const { data: projects, error } = await supabaseClient
            .from('projects')
            .select('*')
            .eq('is_public', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = '<p>Failed to load projects.</p>';
            return;
        }
        // GL: Good Lauck
        if (projectsContainer && projects) {
            projectsContainer.innerHTML = projects.map(project => {
                // Handle tags array safely
                const tagsHTML = Array.isArray(project.tags) 
                    ? project.tags.map(tag => `<li>${tag}</li>`).join('')
                    : '';

                return `
                <div class="project reveal">
                    <img src="${project.project_image_url}" alt="${project.project_name}">
                    <div class="project-content">
                        <a href="${project.link || '#'}" target="_blank" class="project-link">
                            <h3>${project.project_name}</h3>
                        </a>
                        <p>${project.project_short_description}</p>
                        <ul class="tech-list">
                            ${tagsHTML}
                        </ul>
                    </div>
                </div>
                `;
            }).join('');

            // Important: Re-run observer so the new projects can animate in
            observeNewElements();
        }
    }

    // Start the engine
    loadProjects();
});