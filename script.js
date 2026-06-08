document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. TYPING TEXT EFFECT
    // ==========================================
    const typingSpan = document.querySelector('.typing-text');
    const terms = [
        "MERN Stack Applications", 
        "Robust API Services", 
        "Intelligent IoT Systems", 
        "AI-Powered Interfaces"
    ];
    let termIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTerm = terms[termIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentTerm.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingSpan.textContent = currentTerm.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // normal typing
        }

        if (!isDeleting && charIndex === currentTerm.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause at full text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            termIndex = (termIndex + 1) % terms.length;
            typingSpeed = 500; // pause before typing next
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typingSpan) setTimeout(type, 500);

    // ==========================================
    // 2. INTERACTIVE CANVAS BACKGROUND
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseSize = Math.random() * 2 + 1;
            this.size = this.baseSize;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            // Screen boundary check
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse proximity interaction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Move away slightly
                    this.x -= dx / distance * force * 1.5;
                    this.y -= dy / distance * force * 1.5;
                    this.size = this.baseSize * (1 + force * 2);
                } else {
                    if (this.size > this.baseSize) this.size -= 0.1;
                }
            }
        }
    }
    
    function initParticles() {
        particles = [];
        const quantity = Math.floor((canvas.width * canvas.height) / 11000);
        for (let i = 0; i < quantity; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw links connecting nodes
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    const alpha = (100 - dist) / 100 * 0.15;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    resizeCanvas();
    animateParticles();

    // ==========================================
    // 3. CURSOR GLOW EFFECT
    // ==========================================
    const cursorGlow = document.getElementById('cursor-glow');
    window.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }
    });

    // ==========================================
    // 4. FLOATING NAVBAR & MOBILE NAVIGATION
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveLink();
    });
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Highlight Active Link on Scroll
    const sections = document.querySelectorAll('section');
    function highlightActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // 5. INTERACTIVE SKILL CATEGORY FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Reset skill highlights when filtering
                card.classList.remove('highlighted', 'dimmed');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Clear connections highlight in timeline and projects
            clearCrossHighlights();
        });
    });

    // ==========================================
    // 6. CROSS-HIGHLIGHTING SKILL CONNECTIONS
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    let activeHighlightSkill = null;
    
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skillName = card.getAttribute('data-skill');
            
            // If already highlighted, remove highlight
            if (activeHighlightSkill === skillName) {
                clearCrossHighlights();
                activeHighlightSkill = null;
                return;
            }
            
            activeHighlightSkill = skillName;
            
            // Update skills visibility (Highlight clicked, Dim others)
            skillCards.forEach(s => {
                if (s.getAttribute('data-skill') === skillName) {
                    s.classList.add('highlighted');
                    s.classList.remove('dimmed');
                } else {
                    s.classList.remove('highlighted');
                    s.classList.add('dimmed');
                }
            });
            
            // Highlight projects matching skill
            projectCards.forEach(p => {
                const skillsList = p.getAttribute('data-skills') || '';
                if (skillsList.split(' ').includes(skillName)) {
                    p.classList.add('highlighted');
                    p.style.opacity = '1';
                } else {
                    p.classList.remove('highlighted');
                    p.style.opacity = '0.35';
                }
            });
            
            // Highlight timeline items matching skill
            timelineItems.forEach(t => {
                const skillsList = t.getAttribute('data-skills') || '';
                const cardInner = t.querySelector('.timeline-card');
                if (skillsList.split(' ').includes(skillName)) {
                    cardInner.classList.add('highlighted');
                    t.style.opacity = '1';
                } else {
                    cardInner.classList.remove('highlighted');
                    t.style.opacity = '0.35';
                }
            });
        });
    });
    
    function clearCrossHighlights() {
        skillCards.forEach(s => s.classList.remove('highlighted', 'dimmed'));
        projectCards.forEach(p => {
            p.classList.remove('highlighted');
            p.style.opacity = '1';
        });
        timelineItems.forEach(t => {
            const cardInner = t.querySelector('.timeline-card');
            cardInner.classList.remove('highlighted');
            t.style.opacity = '1';
        });
    }

    // ==========================================
    // 7. RETRO DEVELOPER TERMINAL INTERACTIVITY
    // ==========================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    
    const terminalResponses = {
        help: `Available database querying commands:
  <span class="cmd-highlight">about</span>      - Prints MD Aman Ahmad's professional brief.
  <span class="cmd-highlight">skills</span>     - Prints core technical stacks.
  <span class="cmd-highlight">projects</span>   - Shows summary of built applications.
  <span class="cmd-highlight">experience</span> - Displays internship and leadership roles.
  <span class="cmd-highlight">contact</span>    - Prints contact numbers and email address.
  <span class="cmd-highlight">clear</span>      - Wipes the console screen buffer.
  <span class="cmd-highlight">secret</span>     - Access an easter egg.`,
        
        about: `MD AMAN AHMAD:
  - Role: Solutions-driven Computer Engineering Graduate.
  - Institution: Lokmanya Tilak College of Engineering (LTCE).
  - Profile: Expertise in building scalable MERN web applications, NoSQL architectures, middleware-driven servers, and real-time Socket.io channels.
  - CGPI: 7.93 (Completed).`,
        
        skills: `TECHNICAL EXPERTISE DATABASE:
  - Languages: Java (Data Structures & Algorithms), JavaScript (ES6+).
  - Frontend: HTML5, CSS3, Tailwind CSS, React, Material UI.
  - Backend: Node.js, Express.js.
  - Databases: MongoDB (Atlas Cloud management), MySQL.
  - Tooling: Git, GitHub, Vercel, Render, Netlify, Embedded C++, ESP32.`,
        
        projects: `PROJECT REGISTRY:
  1. CHATPILOT (AI Chat Application)
     - Tech: MERN Stack, Socket.io, Google Gemini API, Authentication.
     - URL: https://chatpilot.vercel.app
  2. WEALTHUP (Stock Trading Simulation Platform)
     - Tech: MERN Stack, Material UI, Chart.js.
     - URL: https://weath-up-frontend.vercel.app
  3. SMART VISION (IoT Assistive Glasses)
     - Tech: Embedded C++, ESP32-CAM, Bluetooth, Sensors.`,
        
        experience: `PROFESSIONAL TIMELINE:
  1. HARI OM THALASSIC PVT. LTD. (Full Stack Intern)
     - Period: Jan 2026 - Present.
     - Role: Frontend Flutter interfaces, Node.js/Express.js APIs, MongoDB architecture.
  2. LOKMANYA TILAK COLLEGE OF ENGINEERING (Coding Club VP)
     - Period: Feb 2025 - Sept 2025.
     - Role: Mentoring, machine learning seminars, organizing Innovetex.
  3. IFUTURE TECHNOLOGIES PVT. LTD. (Cloud Intern)
     - Period: June 2024.
     - Role: Google Cloud Platform configuration, MongoDB Atlas aggregates, deployment pipelines.`,
        
        contact: `COMMUNICATION PORTS:
  - Email: mdamanahmad0406@gmail.com
  - Phone: +91 8693081506
  - LinkedIn: https://www.linkedin.com/in/md-aman-ahmad/
  - GitHub: https://github.com/MDAMANAHMAD
  - Location: Kalyan, Maharashtra, India`,
        
        secret: `🥚 EASTER EGG UNLOCKED:
  Initializing Matrix sequence... Just kidding! 
  Fun Fact: Aman built ChatPilot which uses the Google Gemini API to suggest replies to users.
  "The best way to predict the future is to write the code for it!"`
    };
    
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputVal = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';
                
                // Print command
                appendTerminalLine(`visitor@aman:~$ ${inputVal}`, 'terminal-prompt');
                
                if (inputVal === '') return;
                
                if (inputVal === 'clear') {
                    clearTerminal();
                    return;
                }
                
                // Evaluate command response
                if (terminalResponses[inputVal]) {
                    appendTerminalLine(terminalResponses[inputVal], 'cmd-result');
                } else {
                    appendTerminalLine(`Command not found: "${inputVal}". Type <span class="cmd-highlight">help</span> for options.`, 'cmd-result');
                }
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
        
        // Focus terminal input when clicking terminal body
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
    
    function appendTerminalLine(text, className) {
        const line = document.createElement('div');
        line.innerHTML = text;
        if (className) line.className = className;
        
        // Insert before the input line
        const inputLine = document.querySelector('.terminal-input-line');
        terminalBody.insertBefore(line, inputLine);
    }
    
    function clearTerminal() {
        const lines = terminalBody.querySelectorAll('div:not(.terminal-input-line)');
        lines.forEach(l => l.remove());
    }

    // ==========================================
    // 8. CLIPBOARD COPY UTILITY
    // ==========================================
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-clipboard');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const textToCopy = targetElement.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--accent-cyan)"></i>';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    // ==========================================
    // 9. FORM SUBMISSION EMULATION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            
            // Disable button & show sending status
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
            
            // Emulate backend processing
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                formFeedback.className = 'form-feedback success animate__animated animate__fadeIn';
                formFeedback.textContent = `Thanks, ${name}! Your message has been sent successfully.`;
                
                // Clear form inputs
                contactForm.reset();
            }, 1800);
        });
    }

    // ==========================================
    // 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('[data-reveal]');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Trigger reveal animations
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);
                
                // Trigger progress bar filling if it's the soft skills block
                if (element.classList.contains('soft-skills-card')) {
                    const bars = element.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        const widthStr = bar.style.width;
                        bar.style.width = '0'; // reset
                        setTimeout(() => {
                            bar.style.width = widthStr; // trigger transition
                        }, 100);
                    });
                }
                
                // Stop observing once animation triggers
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // trigger slightly before entering viewport
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
});
