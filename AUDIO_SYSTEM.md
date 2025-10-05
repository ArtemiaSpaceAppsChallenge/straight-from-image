# Audio System Documentation

## Overview
The game includes a background audio system with volume controls and mute functionality.

## Components

### AudioContext
- Manages global audio state
- Handles background music playback
- Controls volume and mute settings
- Default volume: 50%

### AudioControls
- Play/Pause button
- Mute/Unmute toggle
- Volume slider (0-100%)
- Visual volume percentage display

## Audio File
- Location: `/public/ambient-space.mp3`
- Currently a placeholder file
- Should be replaced with actual ambient space music
- Recommended: 2-5 minute loopable track

## Usage
The audio controls are integrated into the game header and will appear when playing the game at `/play`.

## Features
- Auto-loop background music
- Graceful handling of missing audio files
- Respects browser autoplay policies
- Persistent volume settings
- Visual feedback for all controls

## Replacing the Audio File
1. Find a suitable ambient space track (royalty-free)
2. Replace the placeholder `/public/ambient-space.mp3` with the actual MP3 file
3. Ensure the file is optimized for web (compressed, appropriate bitrate)

## Browser Compatibility
- Modern browsers may block autoplay until user interaction
- The system handles this gracefully with error catching
- Users can manually start playback using the play button