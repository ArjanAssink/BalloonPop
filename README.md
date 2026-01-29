# Balloon Pop Quiz Game

A fun interactive quiz game where you pop balloons with the correct answers using hand gestures or touch!

## Project Structure

```
/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   └── script.js           # All JavaScript code
├── archive/                # Old HTML files (backup)
└── README.md               # This file
```

## Features

- **Hand Gesture Control**: Use your index finger to point at and pop balloons
- **Touch/Mouse Support**: Fallback for devices without camera access
- **Multiple Choice Quiz**: Answer questions by popping the correct balloon
- **Animated UI**: Beautiful floating balloons, stars background, and smooth animations
- **Responsive Design**: Works on mobile and desktop devices
- **Fireworks Effects**: Spectacular fireworks when you get the right answer!
- **Sound Effects**: Applause for correct answers, fart sounds for wrong answers
- **Visual Feedback**: Colorful particle explosions and sound feedback

## How to Play

1. Open `index.html` in a modern browser
2. Choose "Start with Gestures" to use hand tracking (requires camera access)
3. Or choose "Play with Touch" to use mouse/touch controls
4. Pop the balloon with the correct answer to each question
5. Try to get the highest score!

## Technical Details

- **Hand Tracking**: Uses MediaPipe Hands library
- **CSS**: Modern CSS with variables, animations, and responsive design
- **JavaScript**: ES6+ with async/await for camera access
- **Browser Support**: Works best in Chrome, Edge, Firefox, and Safari (with camera permissions)
- **Sound Effects**: Uses Web Audio API for dynamic sound generation
- **Fireworks**: CSS-based particle system with physics simulation
- **Performance**: Optimized animations with hardware acceleration

## Development

The code has been cleaned up and organized:
- CSS extracted to `css/styles.css`
- JavaScript extracted to `js/script.js`
- HTML simplified to `index.html`
- Old files moved to `archive/` folder

## License

This is a fun educational game project. Feel free to modify and use for learning purposes!