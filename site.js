(function () {
    'use strict';

    const FULL_PATH = 'PHOTOS FOR WEB/WEB COMPRESSED VERSIONS/';

    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const update = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    function initMobileMenu() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.querySelector('.navbar');
        if (!mobileMenuButton || !navLinks || !navbar) return;

        function setMobileMenuOpen(isOpen) {
            navLinks.classList.toggle('active', isOpen);
            navbar.classList.toggle('menu-open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            mobileMenuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            mobileMenuButton.textContent = isOpen ? '✕' : '☰';
        }

        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');

        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            setMobileMenuOpen(!navLinks.classList.contains('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.classList.contains('active')) return;
            if (!e.target.closest('.nav-content') && !e.target.closest('.nav-links')) {
                setMobileMenuOpen(false);
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMobileMenuOpen(false));
        });
    }

    function initActiveNav() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach((link) => {
            const href = link.getAttribute('href');
            const isHome = (current === '' || current === 'index.html') && href === 'index.html';
            const isMatch = href === current;
            if (isHome || isMatch) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger');
        if (!revealElements.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealElements.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('is-visible', entry.isIntersecting);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -5% 0px'
        });

        revealElements.forEach((el) => observer.observe(el));
    }

    function initStickyEnquire() {
        if (window.location.pathname.includes('contact.html')) return;
        if (!window.matchMedia('(max-width: 992px)').matches) return;

        const link = document.createElement('a');
        link.href = 'contact.html';
        link.className = 'sticky-enquire';
        link.textContent = 'Enquire';
        link.setAttribute('aria-label', 'Enquire about your wedding');
        document.body.appendChild(link);
    }

    function initPhotographyLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightbox = document.querySelector('.close-lightbox');
        if (!lightbox || !lightboxImg) return;

        const galleryImages = document.querySelectorAll('.wedding-images img, .other-occasions-images img');

        galleryImages.forEach((img) => {
            img.classList.add('gallery-image');

            if (!img.dataset.full) {
                const filename = decodeURIComponent(img.src.split('/').pop().split('?')[0]);
                img.dataset.full = FULL_PATH + filename;
            }

            img.addEventListener('click', () => {
                lightboxImg.src = img.dataset.full;
                lightboxImg.alt = img.alt || 'Full size image';
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        function close() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            lightboxImg.src = '';
        }

        if (closeLightbox) closeLightbox.onclick = close;

        lightbox.onclick = (e) => {
            if (e.target === lightbox) close();
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') close();
        });
    }

    function initHeroMobileVideo() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const heroIframe = document.querySelector('.hero .video-banner .hero-youtube-iframe');

        if (isMobile && heroIframe) {
            heroIframe.removeAttribute('src');
        }

        if (!isMobile) return;

        const heroVideo = document.querySelector('.hero-banner-video--mobile');
        if (!heroVideo) return;

        const tryPlay = () => {
            heroVideo.play().catch(() => {});
        };

        heroVideo.addEventListener('canplay', tryPlay, { once: true });
        tryPlay();
    }

    document.addEventListener('DOMContentLoaded', () => {
        initNavbarScroll();
        initMobileMenu();
        initActiveNav();
        initScrollReveal();
        initStickyEnquire();
        initPhotographyLightbox();
        initHeroMobileVideo();
    });
})();
