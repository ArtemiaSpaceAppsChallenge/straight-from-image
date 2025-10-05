# Interactive Camera System Documentation

## Overview
The isometric camera view now supports full user interaction for better navigation and exploration of the habitat design.

## Mouse Controls

### **Pan Camera**
- **Action**: Click and drag with left mouse button
- **Function**: Moves the camera position around the scene
- **Use Case**: Navigate to different areas of the habitat

### **Rotate Camera**  
- **Action**: Hold Shift + Click and drag with left mouse button
- **Function**: Rotates the camera around the scene center
- **Use Case**: View the habitat from different angles

### **Zoom Camera**
- **Action**: Mouse wheel scroll
- **Function**: Zooms in/out (10% - 300% range)
- **Use Case**: Get closer detail view or broader overview

## Keyboard Shortcuts

### **Zoom Controls**
- **`+` or `=`**: Zoom in (+20%)
- **`-`**: Zoom out (-20%)

### **Rotation Controls**  
- **`←` Arrow Key**: Rotate left (-15°)
- **`→` Arrow Key**: Rotate right (+15°)
- **`R`**: Reset rotation to default (0°)

### **Camera Reset**
- **`Ctrl+R`**: Reset entire camera (position, zoom, rotation)

## Camera Controls Panel

Located below the main isometric view, provides:
- **Zoom In/Out buttons**: Quick zoom controls
- **Reset Rotation button**: Return to default angle
- **Reset Camera button**: Return to default position, zoom, and rotation
- **Live Status Display**: Shows current zoom percentage and rotation angle

## Visual Feedback

### **Cursor Changes**
- **Default**: Pointer cursor
- **Pan Mode**: Move cursor while dragging
- **Rotate Mode**: Crosshair cursor while Shift+dragging

### **Instructions Overlay**
- **Location**: Top-right corner of the isometric view
- **Content**: Real-time control instructions and current camera status
- **Display**: Current zoom percentage and rotation angle

## Technical Features

### **Smooth Interactions**
- Real-time camera updates during mouse movement
- Responsive zoom with precise increments
- Smooth rotation with visual feedback

### **Boundaries and Limits**
- **Zoom Range**: 10% to 300%
- **Rotation**: Unlimited 360° rotation
- **Pan**: Unlimited camera movement

### **State Persistence**
- Camera position, zoom, and rotation persist during gameplay
- Settings maintained when switching between game modes
- Reset options available to return to default view

## Usage Tips

1. **Start with Overview**: Use zoom out to see the entire habitat layout
2. **Detail Inspection**: Zoom in and pan to examine specific rooms and objects
3. **Different Angles**: Use rotation to view rooms from optimal angles
4. **Quick Reset**: Use Ctrl+R to quickly return to default view when lost
5. **Smooth Navigation**: Combine pan and rotate for fluid exploration

## Accessibility

- All mouse interactions have keyboard alternatives
- Visual feedback for all camera states
- Clear instructions always visible
- Intuitive controls following standard 3D navigation patterns

The interactive camera system greatly enhances the user experience by providing full control over the viewing perspective, making it easier to design, inspect, and understand the habitat layout in the NASA Space Apps Challenge game.