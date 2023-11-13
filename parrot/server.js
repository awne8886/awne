const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/parrot', (req, res) => {
  res.send(getAnimatedParrotFrames());
});

function getAnimatedParrotFrames() {
  const frames = [
    // Add your ASCII art frames here (replace with actual frames)
    'parrot\frame-000.ansi',
    'parrot\frame-001.ansi',
    'parrot\frame-002.ansi',
    'parrot\frame-003.ansi',
    'parrot\frame-004.ansi',
    'parrot\frame-005.ansi',
    'parrot\frame-006.ansi',
    'parrot\frame-007.ansi',
    'parrot\frame-008.ansi',
    'parrot\frame-009.ansi',
    // ...
  ];

  return frames.join('\n\n'); // Frames separated by two newlines for better visibility
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
