// Game state
let gameState = {
    score: 0,
    currentQuestion: 0,
    isPlaying: false,
    handX: 0,
    handY: 0,
    handDetected: false
};

// Question sets database (Dutch)
const questionSets = {
    math: [
        {
            question: "Wat is 1 + 1?",
            answers: ["1", "2", "3", "4"],
            correct: 1
        },
        {
            question: "Wat is 2 + 3?",
            answers: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "Wat is 5 - 2?",
            answers: ["2", "3", "4", "1"],
            correct: 1
        },
        {
            question: "Wat is 3 + 4?",
            answers: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Wat is 10 - 5?",
            answers: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            question: "Wat is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Wat is 7 - 3?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Wat is 1 + 4?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Wat is 6 - 1?",
            answers: ["4", "5", "6", "3"],
            correct: 1
        },
        {
            question: "Wat is 3 + 3?",
            answers: ["5", "6", "7", "8"],
            correct: 1
        }
    ],
    letters: [
        {
            question: "Welke letter maakt het 'A' geluid?",
            answers: ["B", "A", "C", "D"],
            correct: 1
        },
        {
            question: "Welke letter maakt het 'B' geluid?",
            answers: ["A", "B", "C", "D"],
            correct: 1
        },
        {
            question: "Welke letter maakt het 'M' geluid?",
            answers: ["N", "M", "W", "P"],
            correct: 1
        },
        {
            question: "Welke letter maakt het 'S' geluid?",
            answers: ["Z", "S", "C", "X"],
            correct: 1
        },
        {
            question: "Welke letter maakt het 'T' geluid?",
            answers: ["D", "T", "P", "B"],
            correct: 1
        },
        {
            question: "Welke letter maakt het 'K' geluid?",
            answers: ["C", "K", "Q", "X"],
            correct: 1
        }
    ],
    general: [
        {
            question: "Wat is 5 + 7?",
            answers: ["10", "12", "14", "15"],
            correct: 1
        },
        {
            question: "Hoofdstad van Frankrijk?",
            answers: ["Londen", "Berlijn", "Parijs", "Rome"],
            correct: 2
        },
        {
            question: "Hoeveel dagen in een week?",
            answers: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Welke kleur is de lucht?",
            answers: ["Groen", "Blauw", "Rood", "Geel"],
            correct: 1
        },
        {
            question: "Wat is 10 - 3?",
            answers: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Grootste oceaan?",
            answers: ["Atlantisch", "Stille", "Indisch", "Arctisch"],
            correct: 1
        },
        {
            question: "Welk dier zegt 'miauw'?",
            answers: ["Hond", "Kat", "Koe", "Varken"],
            correct: 1
        },
        {
            question: "Hoeveel poten heeft een spin?",
            answers: ["4", "6", "8", "10"],
            correct: 2
        },
        {
            question: "Welke vorm heeft een voetbal?",
            answers: ["Vierkant", "Driehoek", "Rond", "Ovaal"],
            correct: 2
        },
        {
            question: "Wat is de kleur van een banaan?",
            answers: ["Rood", "Blauw", "Geel", "Groen"],
            correct: 2
        },
        {
            question: "Hoeveel seizoenen zijn er in een jaar?",
            answers: ["2", "4", "6", "8"],
            correct: 1
        },
        {
            question: "Welk dier is het grootste?",
            answers: ["Olifant", "Giraffe", "Walvis", "Leeuw"],
            correct: 2
        },
        {
            question: "Wat gebruik je om te schrijven?",
            answers: ["Boek", "Pen", "Gum", "Liniaal"],
            correct: 1
        },
        {
            question: "Hoeveel maanden heeft een jaar?",
            answers: ["6", "10", "12", "14"],
            correct: 2
        },
        {
            question: "Welke planeet wonen wij op?",
            answers: ["Mars", "Aarde", "Jupiter", "Venus"],
            correct: 1
        }
    ]
};

// Default question set
let currentQuestionSet = 'general';

// Balloon colors
const balloonColors = ['#ff407a', '#4da6ff', '#ffd740', '#9c27b0', '#4caf50'];

// Fireworks colors
const fireworkColors = ['#ff407a', '#4da6ff', '#ffd740', '#9c27b0', '#4caf50', '#ffffff', '#ffeb3b'];

// Sound effects - using Web Audio API for better sound generation
function createApplauseSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
    
    // Add some harmonic overtones for richer sound
    const oscillator2 = audioCtx.createOscillator();
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(1600, audioCtx.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(2400, audioCtx.currentTime + 0.1);
    oscillator2.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
    
    const gainNode2 = audioCtx.createGain();
    gainNode2.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode2.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.3);
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioCtx.destination);
    
    oscillator2.start();
    oscillator2.stop(audioCtx.currentTime + 0.3);
}

function createFartSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.4);
    oscillator.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.6);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
    filter.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.6);
    
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.7);
    
    // Add some noise for more realistic fart sound
    const bufferSize = audioCtx.sampleRate * 0.7;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
    
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(200, audioCtx.currentTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.4);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    
    noiseSource.start();
    noiseSource.stop(audioCtx.currentTime + 0.7);
}

// Elements
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const loading = document.getElementById('loading');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const questionBox = document.getElementById('questionBox');
const scoreDisplay = document.getElementById('score');
const balloonsContainer = document.getElementById('balloonsContainer');
const handCursor = document.getElementById('handCursor');
const videoPreview = document.getElementById('videoPreview');

// Create stars background
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Create fireworks container
const fireworksContainer = document.createElement('div');
fireworksContainer.style.position = 'fixed';
fireworksContainer.style.top = '0';
fireworksContainer.style.left = '0';
fireworksContainer.style.width = '100%';
fireworksContainer.style.height = '100%';
fireworksContainer.style.pointerEvents = 'none';
fireworksContainer.style.zIndex = '100';
document.body.appendChild(fireworksContainer);

// Function to create fireworks
function createFireworks(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.background = 'white';
    firework.style.boxShadow = '0 0 15px 8px white';
    firework.style.animation = 'fireworkGlow 0.5s ease-out';
    fireworksContainer.appendChild(firework);
    
    // Create main particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 60 + Math.random() * 80;
        const xDir = Math.cos(angle) * velocity;
        const yDir = Math.sin(angle) * velocity;
        
        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 8px 3px ${color}`;
        particle.style.setProperty('--x', xDir + 'px');
        particle.style.setProperty('--y', yDir + 'px');
        particle.style.animation = `fireworkExplode 1.2s ease-out forwards`;
        
        fireworksContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
    
    // Create sparks for extra effect
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement('div');
        spark.className = 'firework-spark';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 120;
        const xDir = Math.cos(angle) * velocity;
        const yDir = Math.sin(angle) * velocity;
        
        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.background = color;
        spark.style.setProperty('--sx', xDir + 'px');
        spark.style.setProperty('--sy', yDir + 'px');
        spark.style.animation = `fireworkSpark 1s ease-out forwards`;
        
        fireworksContainer.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 1000);
    }
    
    // Remove firework after animation
    setTimeout(() => {
        firework.remove();
    }, 600);
}

// Function to play sound
function playSound(type) {
    try {
        // Check if Web Audio API is available
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log('Web Audio API not supported in this browser');
            return;
        }
        
        if (type === 'applause') {
            createApplauseSound();
        } else if (type === 'fart') {
            createFartSound();
        }
    } catch (error) {
        console.log('Sound playback error:', error);
    }
}

// MediaPipe Hands setup
let hands;
let camera;

async function initializeHandTracking() {
    loading.style.display = 'block';
    loading.innerHTML = 'Requesting camera access<span class="spinner"></span>';
    
    try {
        // First check if we can access camera at all
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        }); 
        
        // Stop the test stream
        stream.getTracks().forEach(track => track.stop());
        
        loading.innerHTML = 'Loading hand tracking<span class="spinner"></span>';
        
        hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });
        
        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        
        hands.onResults(onHandResults);
        
        // Setup camera - use the videoPreview element
        camera = new Camera(videoPreview, {
            onFrame: async () => {
                await hands.send({image: videoPreview});
            },
            width: 1280,
            height: 720
        });
        
        await camera.start();
        
        // Show the video preview
        videoPreview.style.display = 'block';
        
        loading.style.display = 'none';
        // Game is already started in startGameWithSet(), just need to load the first question
        loadQuestion();
    } catch (error) {
        console.error('Error initializing hand tracking:', error);
        loading.style.display = 'none';
        
        // Show detailed error message
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = 'margin-top: 20px; padding: 20px; background: rgba(244, 67, 54, 0.2); border-radius: 10px; max-width: 500px;';
        errorMsg.innerHTML = `
            <p style="margin-bottom: 15px; font-size: 18px;">📷 Camera access denied or unavailable</p>
            <p style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">
                <strong>For iOS/Safari:</strong> Go to Settings → Safari → Camera and allow access
            </p>
            <button class="start-btn" onclick="location.reload()" style="font-size: 18px; padding: 15px 40px;">
                Try Again
            </button>
        `;
        startScreen.appendChild(errorMsg);
        startBtn.disabled = false;
    }
}

// Touch/mouse mode fallback (removed - always use gestures)

function onHandResults(results) {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Get index finger tip (landmark 8)
        const indexTip = landmarks[8];
        
        // Convert to screen coordinates
        gameState.handX = (1 - indexTip.x) * window.innerWidth; // Mirror for front camera
        gameState.handY = indexTip.y * window.innerHeight;
        gameState.handDetected = true;
        
        // Update cursor position
        handCursor.style.display = 'block';
        handCursor.style.left = gameState.handX + 'px';
        handCursor.style.top = gameState.handY + 'px';
        
        // Check for balloon collisions
        checkBalloonCollisions();
    } else {
        gameState.handDetected = false;
        handCursor.style.display = 'none';
    }
    
    ctx.restore();
}

function startGame(useGestures = false) {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    gameState.isPlaying = true;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    gameState.useGestures = useGestures;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // If not using gestures, enable mouse/touch tracking
    if (!useGestures) {
        canvas.style.opacity = '0'; // Hide camera canvas
        
        // Track mouse/touch position
        const trackPointer = (e) => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            
            gameState.handX = x;
            gameState.handY = y;
            gameState.handDetected = true;
            
            handCursor.style.display = 'block';
            handCursor.style.left = x + 'px';
            handCursor.style.top = y + 'px';
            
            checkBalloonCollisions();
        };
        
        document.addEventListener('mousemove', trackPointer);
        document.addEventListener('touchmove', trackPointer, { passive: true });
        document.addEventListener('touchstart', trackPointer, { passive: true });
    }
    
    loadQuestion();
}

function loadQuestion() {
    if (gameState.currentQuestion >= questionSets[currentQuestionSet].length) {
        endGame();
        return;
    }
    
    const q = questionSets[currentQuestionSet][gameState.currentQuestion];
    questionBox.textContent = q.question;
    
    // Clear old balloons
    balloonsContainer.innerHTML = '';
    
    // Create balloons with answers
    q.answers.forEach((answer, index) => {
        createBalloon(answer, index, index === q.correct);
    });
}

function createBalloon(text, index, isCorrect) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.dataset.correct = isCorrect;
    
    // Random position
    const x = 15 + (index * 20) + Math.random() * 10;
    const y = 30 + Math.random() * 40;
    balloon.style.left = x + '%';
    balloon.style.top = y + '%';
    
    // Random color
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    // Random animation delay
    balloon.style.animationDelay = Math.random() * 2 + 's';
    
    balloon.innerHTML = `
        <div class="balloon-body" style="background: ${color};">
            <div class="balloon-text">${text}</div>
        </div>
        <div class="balloon-string"></div>
    `;
    
    // Click handler for touch/mouse
    balloon.addEventListener('click', () => popBalloon(balloon, isCorrect));
    
    balloonsContainer.appendChild(balloon);
}

function checkBalloonCollisions() {
    if (!gameState.handDetected) return;
    
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        const rect = balloon.getBoundingClientRect();
        
        if (gameState.handX >= rect.left && 
            gameState.handX <= rect.right && 
            gameState.handY >= rect.top && 
            gameState.handY <= rect.bottom) {
            
            const isCorrect = balloon.dataset.correct === 'true';
            popBalloon(balloon, isCorrect);
        }
    });
}

function popBalloon(balloon, isCorrect) {
    if (balloon.classList.contains('popping')) return;
    
    balloon.classList.add('popping');
    
    // Get balloon position for fireworks
    const rect = balloon.getBoundingClientRect();
    const balloonX = rect.left + rect.width / 2;
    const balloonY = rect.top + rect.height / 2;
    
    if (isCorrect) {
        gameState.score += 10;
        scoreDisplay.textContent = gameState.score;
        
        // Create fireworks from balloon position
        createFireworks(balloonX, balloonY);
        
        // Play applause sound
        playSound('applause');
        
        setTimeout(() => {
            gameState.currentQuestion++;
            loadQuestion();
        }, 500);
    } else {
        // Wrong answer - shake effect
        balloon.style.animation = 'none';
        setTimeout(() => {
            balloon.style.animation = '';
        }, 10);
        
        // Play fart sound
        playSound('fart');
    }
    
    setTimeout(() => {
        balloon.remove();
    }, 300);
}

function endGame() {
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.innerHTML = `
        <h2>🎉 Game Complete! 🎉</h2>
        <p>Final Score: ${gameState.score}</p>
        <button class="start-btn" onclick="location.reload()">Play Again</button>
    `;
    document.body.appendChild(gameOver);
}

// Function to start game with specific question set
window.startGameWithSet = function(setName) {
    currentQuestionSet = setName;
    
    // Hide the start screen
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = 'none';
    }
    
    // Show the game container
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        gameContainer.style.display = 'block';
    }
    
    // Set canvas size
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Start the game directly with gesture mode
    gameState.isPlaying = true;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    gameState.useGestures = true;
    
    // Initialize camera and hand tracking
    initializeHandTracking();
}

// Start button
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    initializeHandTracking();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (gameState.isPlaying) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});