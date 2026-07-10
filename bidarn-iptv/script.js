document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Navigation Active Link State On Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    });

    // Smooth scrolling for anchor links without adding # to URL hash
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight || 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. WhatsApp Floating Widget Logic
    const widgetBubble = document.getElementById('widget-bubble');
    const widgetChatBox = document.getElementById('widget-chat-box');
    const chatBoxClose = document.getElementById('chat-box-close');

    if (widgetBubble && widgetChatBox && chatBoxClose) {
        widgetBubble.addEventListener('click', () => {
            widgetChatBox.classList.toggle('active');
        });

        chatBoxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            widgetChatBox.classList.remove('active');
        });

        // Close widget box if clicked outside
        document.addEventListener('click', (e) => {
            if (!widgetBubble.contains(e.target) && !widgetChatBox.contains(e.target)) {
                widgetChatBox.classList.remove('active');
            }
        });
    }

    // 4. Testimonials Carousel
    const slides = document.querySelectorAll('.chat-slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 7000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        startSlideShow();
    }

    // 5. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Policy Modal Injections & Logic
    const modal = document.getElementById('policy-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const policies = {
        privacy: `
            <h2>Politique de Confidentialité</h2>
            <p><strong>Date d'effet : 8 juillet 2026</strong></p>
            <p>Chez Bidarn (accessible depuis bidarn.fun), l'une de nos priorités absolues est la confidentialité de nos visiteurs. Ce document de Politique de Confidentialité décrit les types d'informations collectées et enregistrées par Bidarn et la manière dont nous les utilisons.</p>
            
            <h3>Informations que nous collectons</h3>
            <p>Si vous nous contactez directement sur WhatsApp ou par e-mail, nous pouvons recevoir des informations supplémentaires vous concernant, telles que votre nom, votre numéro de téléphone, votre adresse e-mail, le contenu de votre message et/ou les pièces jointes que vous nous envoyez, ainsi que toute autre information que vous choisissez de nous fournir.</p>
            
            <h3>Comment nous utilisons vos informations</h3>
            <p>Nous utilisons les informations collectées de différentes manières, notamment pour :</p>
            <ul>
                <li>Fournir, exploiter et maintenir notre site web et nos services d'abonnement Bidarn.</li>
                <li>Améliorer, personnaliser et développer notre site web.</li>
                <li>Comprendre et analyser comment vous utilisez notre site web.</li>
                <li>Développer de nouveaux produits, services, fonctionnalités et caractéristiques.</li>
                <li>Communiquer avec vous, directement ou via WhatsApp, notamment pour le support client, pour vous fournir des mises à jour et d'autres informations relatives au service, et à des fins marketing.</li>
                <li>Vous envoyer des e-mails ou des guides de chat pour configurer vos appareils.</li>
                <li>Détecter et prévenir la fraude.</li>
            </ul>

            <h3>Cookies et balises web</h3>
            <p>Comme tout autre site web, Bidarn utilise des 'cookies'. Ces cookies sont utilisés pour stocker des informations, y compris les préférences des visiteurs et les pages du site web auxquelles le visiteur a accédé ou qu'il a visitées. Ces informations sont utilisées pour optimiser l'expérience des utilisateurs en personnalisant le contenu de nos pages web en fonction du type de navigateur des visiteurs et/ou d'autres informations.</p>
        `,
        refund: `
            <h2>Politique de Remboursement</h2>
            <p><strong>Date d'effet : 8 juillet 2026</strong></p>
            <p>Nous voulons nous assurer que vous êtes 100% satisfait de votre achat sur Bidarn. Si vous avez des questions techniques ou commerciales, n'hésitez pas à nous contacter. Cependant, si vous estimez que le service acheté ne correspond pas le mieux à vos besoins et que vous avez tenté de résoudre les problèmes avec notre équipe d'assistance, nous voulons y remédier.</p>
            
            <h3>Garantie de remboursement de 7 jours</h3>
            <p>Nous offrons un remboursement complet dans les 7 jours suivant l'achat sous les conditions suivantes :</p>
            <ul>
                <li>Nos serveurs ont rencontré des interruptions techniques critiques ou des problèmes que nous n'avons pas pu résoudre dans un délai de 48 heures.</li>
                <li>Vous avez acheté un abonnement par erreur et vous n'avez PAS utilisé/activé les identifiants.</li>
                <li>Nous ne sommes pas en mesure d'activer votre ligne dans les 24 heures suivant la confirmation de votre paiement.</li>
            </ul>

            <h3>Circonstances non remboursables</h3>
            <p>Aucun remboursement ne sera effectué dans les cas suivants :</p>
            <ul>
                <li>Votre connexion Internet est lente ou instable, provoquant du buffering. Une vitesse stable minimale de 15 à 30 Mbps est requise.</li>
                <li>Vous avez changé d'avis après avoir activé et utilisé le service pendant plusieurs jours.</li>
                <li>Vous avez violé nos Conditions d'Utilisation en partageant vos identifiants de connexion sur plus d'un appareil simultanément (provoquant un blocage automatique).</li>
                <li>Problèmes liés à l'installation d'applications tierces ou à des erreurs de configuration matérielle locale indépendantes de notre contrôle.</li>
            </ul>

            <h3>Comment demander un remboursement</h3>
            <p>Pour demander un remboursement, veuillez ouvrir un chat avec nous sur WhatsApp ou nous envoyer un e-mail. Fournissez les détails de votre commande et l'identifiant de votre ligne d'abonnement Bidarn. Nous traiterons les remboursements éligibles sous 3 à 5 jours ouvrés.</p>
        `,
        terms: `
            <h2>Conditions d'Utilisation</h2>
            <p><strong>Date d'effet : 8 juillet 2026</strong></p>
            <p>Bienvenue sur Bidarn ! Ces Conditions d'Utilisation définissent les règles et réglementations relatives à l'utilisation du site web de Bidarn, situé à l'adresse bidarn.fun.</p>
            
            <h3>1. Politique d'utilisation acceptable</h3>
            <p>En achetant notre abonnement Bidarn, vous acceptez que vous achetez un accès à des ressources numériques pour un usage personnel uniquement. Le partage de votre lien M3U, de vos identifiants Xtream ou des détails de votre compte avec d'autres personnes est strictement interdit.</p>
            
            <h3>2. Limites de connexion</h3>
            <p>Chaque formule d'abonnement comprend exactement une (1) connexion active simultanée à tout moment, sauf si vous avez spécifiquement payé pour des connexions supplémentaires. Si notre système détecte plusieurs adresses IP diffusant à partir de la même ligne en même temps, le compte sera automatiquement bloqué par notre pare-feu anti-fraude, sans aucun remboursement possible.</p>

            <h3>3. Disponibilité du contenu</h3>
            <p>Nous ne possédons, n'hébergeons ni ne diffusons les flux vidéo. Nous fournissons uniquement un accès aux liens de lecture des serveurs. Le contenu, les chaînes et les sélections de VOD peuvent changer, être ajoutés ou supprimés à tout moment sans préavis en fonction des mises à jour des serveurs et de la stabilité des chaînes.</p>

            <h3>4. Prérequis techniques</h3>
            <p>Vous devez disposer d'un appareil compatible et d'une connexion Internet haut débit stable pour diffuser les contenus. Bidarn n'est pas responsable du buffering ou de la latence causés par le bridage de votre fournisseur d'accès, une bande passante insuffisante ou la congestion de votre réseau local.</p>
        `
    };

    window.showPolicy = (type) => {
        if (policies[type] && modal && modalBody) {
            modalBody.innerHTML = policies[type];
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }
    };

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

});
