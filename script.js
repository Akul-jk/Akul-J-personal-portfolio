/* Toggle Icon Navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* Scroll Sections Active Link & Sticky Header */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Scroll Progress Logic */
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    let container = document.getElementById("scroll-progress");
    if (container) container.style.width = scrolled + "%";

    /* Sticky Header */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove Toggle Icon and Navbar when click navbar link (scroll) */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    distance: '60px', /* Slightly less distance for more subtle entry */
    duration: 2500, /* Slower, more elegant */
    delay: 400
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .project-box, .gallery-item, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['CSE Student', 'Cyber Forensics Enthusiast', 'AI/ML Learner', 'Photographer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1000,
    loop: true
});

/* Project Filtering */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* Contact Form Toast Logic */
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const closeIcon = document.querySelector('.close');
const progress = document.querySelector('.progress');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submit

        // Show Toast
        toast.classList.add('active');
        progress.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000); // 5s timer

        // Clear form
        form.reset();
    });
}

if (closeIcon) {
    closeIcon.addEventListener('click', () => {
        toast.classList.remove('active');
    });
}
