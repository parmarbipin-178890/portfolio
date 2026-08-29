// ============================================
// DYNAMIC PORTFOLIO — Bipin Parmar
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    var header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. TYPEWRITER EFFECT
    // ==========================================
    var typewriterEl = document.querySelector('.typewriter');
    if (typewriterEl) {
        var words = ['Visual Storyteller', 'Creative Director', 'Digital Creator', 'Video Editor'];
        var wordIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var currentText = '';

        function typeEffect() {
            var fullText = words[wordIndex];

            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            typewriterEl.textContent = currentText;

            if (!isDeleting && charIndex === fullText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 400);
                return;
            }

            var speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // ==========================================
    // 4. CONTACT FORM HANDLING
    // ==========================================
    var contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
            var email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
            var subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
            var message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

            if (!name || !email || !subject || !message) {
                showFormFeedback('Please fill in all fields.', 'error');
                return;
            }

            if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
                showFormFeedback('Please enter a valid email address.', 'error');
                return;
            }

            showFormFeedback('Thank you, ' + name + '! Your message has been sent.', 'success');
            contactForm.reset();

            setTimeout(function() {
                var feedback = document.querySelector('.form-feedback');
                if (feedback) feedback.remove();
            }, 6000);
        });
    }

    function showFormFeedback(message, type) {
        var existing = document.querySelector('.form-feedback');
        if (existing) existing.remove();

        var feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        var bgColor = type === 'success' ? '#e6f7e6' : '#ffe6e6';
        var textColor = type === 'success' ? '#1a6b1a' : '#b33c3c';
        var borderColor = type === 'success' ? '#b3d9b3' : '#f5c2c2';

        feedback.style.cssText = 'margin-top: 1.2rem; padding: 1rem 1.5rem; border-radius: 16px; font-weight: 500; background: ' + bgColor + '; color: ' + textColor + '; border: 1px solid ' + borderColor + ';';
        feedback.textContent = message;

        contactForm.appendChild(feedback);
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ==========================================
    // 5. DYNAMIC YEAR IN FOOTER
    // ==========================================
    var yearElements = document.querySelectorAll('.copyright, footer .copyright');
    var currentYear = new Date().getFullYear();

    yearElements.forEach(function(el) {
        el.textContent = el.textContent.replace('2026', currentYear);
    });

    // ==========================================
    // 6. SCROLL REVEAL ANIMATIONS
    // ==========================================
    var allSections = document.querySelectorAll('section');
    for (var i = 0; i < allSections.length; i++) {
        if (allSections[i].classList.contains('cta')) {
            // Skip CTA
        } else {
            allSections[i].classList.add('reveal');
        }
    }

    var cards = document.querySelectorAll('.service-card, .about-card, .contact-details, .contact-form, .skill');
    for (var j = 0; j < cards.length; j++) {
        cards[j].classList.add('reveal');
    }

    var revealObserver = new IntersectionObserver(function(entries) {
        for (var k = 0; k < entries.length; k++) {
            if (entries[k].isIntersecting) {
                entries[k].target.classList.add('visible');
            }
        }
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    var revealElements = document.querySelectorAll('.reveal');
    for (var l = 0; l < revealElements.length; l++) {
        revealObserver.observe(revealElements[l]);
    }

    // ==========================================
    // 7. SERVICE CARD NUMBERING
    // ==========================================
    var serviceCards = document.querySelectorAll('.service-card');
    for (var m = 0; m < serviceCards.length; m++) {
        var numSpan = serviceCards[m].querySelector('.num');
        if (!numSpan) {
            var h2 = serviceCards[m].querySelector('h2');
            if (h2) {
                var num = document.createElement('span');
                num.className = 'num';
                var numText = (m + 1);
                if (numText < 10) {
                    num.textContent = '0' + numText;
                } else {
                    num.textContent = numText;
                }
                h2.prepend(num);
            }
        }
    }

    // ==========================================
    // 8. CONSOLE GREETING
    // ==========================================
    console.log(' Portfolio loaded successfully!');
    console.log(' Built with  using vanilla JavaScript + CSS.');
});