// YouTube Iframe API Setup
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'tqneHIW3b6w',
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'tqneHIW3b6w'
        }
    });
}

// Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.addEventListener('DOMContentLoaded', () => {
    // Initial Animations for Splash Screen
    gsap.to('.animate-up', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    const openBtn = document.getElementById('open-invitation');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    openBtn.addEventListener('click', () => {
        // Play YouTube Music
        if (player && player.playVideo) {
            player.playVideo();
        }

        // Transition Splash Screen
        gsap.to(introScreen, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                introScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // Animate Main Content Reveal
                gsap.from('.hero-content > *', {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    onComplete: () => {
                        // Start Auto Scroll after hero animation
                        startAutoScroll();
                    }
                });
            }
        });
    });

    let isAutoScrolling = false;
    function startAutoScroll() {
        const scrollSpeed = 0.6; // Pixels per frame
        
        function scroll() {
            if (isAutoScrolling) {
                window.scrollBy(0, scrollSpeed);
                requestAnimationFrame(scroll);
            }
        }
        
        isAutoScrolling = true;
        scroll();
        
        // Stop auto-scroll on user interaction
        const stopScroll = () => {
            isAutoScrolling = false;
            // Remove listeners once stopped
            ['mousedown', 'wheel', 'touchstart', 'keydown'].forEach(evt => {
                window.removeEventListener(evt, stopScroll);
            });
        };

        ['mousedown', 'wheel', 'touchstart', 'keydown'].forEach(evt => {
            window.addEventListener(evt, stopScroll, { passive: true });
        });
    }

    // Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.event-card', {
        scrollTrigger: {
            trigger: '#events',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

    gsap.from('#story p', {
        scrollTrigger: {
            trigger: '#story',
            start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power2.out'
    });

    gsap.from('#families .profile-card', {
        scrollTrigger: {
            trigger: '#families',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });
    gsap.from('#location .map-wrapper', {
        scrollTrigger: {
            trigger: '#location',
            start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'back.out(1.7)'
    });

    // Falling Petals Logic
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 25;

    function createPetal() {
        if (!petalsContainer) return;
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const size = Math.random() * 15 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = `-50px`;
        
        petalsContainer.appendChild(petal);
        
        gsap.to(petal, {
            y: '105vh',
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 720,
            duration: Math.random() * 8 + 7,
            ease: 'none',
            onComplete: () => {
                petal.remove();
                createPetal();
            }
        });
    }

    // Delayed start for smoother intro
    setTimeout(() => {
        for (let i = 0; i < petalCount; i++) {
            setTimeout(createPetal, Math.random() * 8000);
        }
    }, 2000);
});
