document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    const projectsContainer = document.querySelector('.projects-container');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');

            // Toggle aria-expanded
            const isExpanded = navLinks.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Navbar Scroll Effect (Glassmorphism intensity)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.4)';
            navbar.style.boxShadow = 'none';
        }
    });
    // map projects for better organization
    const projects = [
        {
            name: "Workout Buddy",
            description: "Web app for tracking workouts with Nero AI. Built with Next.js.",
            image: "images/workout.png",
            link: "https://workout-buddy.vercel.app"
        },
        {
            name: "InstaVibe",
            description: "A sleek social media app built with Next.js and Shadcn UI.",
            image: "images/insta.png",
            link: "https://insta-vibe-kappa.vercel.app"
        },
        {
            name: "Self-Learning Car",
            description: "A simulation built purely with HTML, CSS and vanilla JavaScript.",
            image: "images/car.png",
            link: "https://kann4n.github.io/self-driveing-car/"
        },
        // TODO: add more in the future
    ]
    if (projectsContainer) {
        projectsContainer.innerHTML = projects.map(projects => {
            return `
        <div class="project">
            <img src="${projects.image}" alt="${projects.name} project screenshot">
            <div class="project-content">
                <a href="${projects.link}" class="project-link">
                    <h3>${projects.name}</h3>
                </a>
                <p>${projects.description}</p>
                <ul class="tech-list">
                    <li>Next.js</li>
                    <li>Tailwind</li>
                    <li>TypeScript</li>
                </ul>
            </div>
        </div>
        `
        }).join('');
    }
});
