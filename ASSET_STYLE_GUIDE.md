# 🎨 Isometric Asset Style Guide

## Design Philosophy

All game assets follow a consistent **isometric pixel art style** to maintain visual cohesion throughout the habitat design experience.

---

## Isometric Projection Specifications

### Camera Angle
- **Projection**: Dimetric (2:1 ratio)
- **Viewing Angle**: 30° from horizontal
- **Rotation**: 45° around vertical axis
- **Scale**: 30 pixels per meter

### Grid System
```
1m = 30 pixels
Standard Room: 3m × 3m × 3m = 90px × 90px × 90px
```

---

## Room Visual Design

### Color Palette by Room Type

```css
Sleep Quarters:      #6B7280 (Gray)
Hygiene:            #3B82F6 (Blue)
Exercise:           #EF4444 (Red)
Food Prep:          #F59E0B (Orange)
Medical:            #10B981 (Green)
Research Lab:       #8B5CF6 (Purple)
Storage:            #78716C (Brown)
Life Support:       #06B6D4 (Cyan)
Recreation:         #EC4899 (Pink)
Communication:      #14B8A6 (Teal)
Maintenance:        #F97316 (Deep Orange)
Airlock:            #6366F1 (Indigo)
```

### Visual Structure

```
┌─────────────────┐
│   Room Label    │  ← Name text (white)
├─────────────────┤
│                 │
│   Floor Tile    │  ← Room-type color + 99 opacity
│                 │
└─────────────────┘
     │  │  │       ← Walls (color + 66 opacity)
```

---

## Object Design Guidelines

### Size Categories

#### Small (0.5m - 1m)
- Personal items
- Small equipment
- Decorations
- Examples: Locker, Plant pot, Supply bag

#### Medium (1m - 2m)
- Furniture
- Standard equipment
- Storage units
- Examples: Bed, Desk, Cabinet

#### Large (2m+)
- Major equipment
- Multi-function stations
- Large storage
- Examples: Life support system, Research bench

### Visual Style

```
Object Rendering Layers:
1. Base shadow (dark, semi-transparent)
2. Main body (object color)
3. Details (lighter shades)
4. Highlights (white, 20-40% opacity)
5. Outline (optional, 1-2px dark border)
```

---

## Crew Member Design

### Avatar Specifications

```
Size: 20px × 40px (0.67m × 1.33m scaled)
Head: 12px circle
Body: 8px wide × 20px tall
```

### Mood Indicators

```css
😊 Happy:      #10B981 (Green)
😐 Neutral:    #F59E0B (Yellow)
😰 Stressed:   #F97316 (Orange)
😵 Exhausted:  #EF4444 (Red)
```

### Status Indicators

Visual badges above crew:
- 💤 Sleeping (moon icon)
- 🍽️ Eating (fork/knife icon)
- 🏋️ Exercising (dumbbell icon)
- 💼 Working (briefcase icon)
- 🎮 Relaxing (game controller icon)

---

## Icon System

### Emoji-Based Icons

We use emoji for quick visual recognition:

#### Room Types
```
🛏️ Sleep        🚿 Hygiene      🏋️ Exercise
🍽️ Food         🏥 Medical      🔬 Research
📦 Storage      ⚗️ Life Support 🎮 Recreation
📡 Comms        🔧 Maintenance  🚪 Airlock
```

#### Objects
```
🛏️ Bed          🗄️ Locker       🚿 Shower
🚽 Toilet       🏃 Treadmill    🍳 Galley
💊 Med Cabinet  🔬 Lab Bench    🌱 Plant Growth
💻 Computer     📦 Cargo Rack   🎒 Supply Bag
⚗️ O2 Generator 💧 Water System 🌬️ Air Filter
📺 Display      🎮 Game Table   📚 Reading Area
📡 Comm Array   🔧 Tools        🛠️ Workbench
👨‍🚀 Spacesuit    🪴 Plant        🖼️ Photo Frame
🪟 Window
```

#### UI Icons (Lucide React)
```
Play, Pause, RotateCcw, Settings, Info
Heart, Zap, UtensilsCrossed, Droplets
Wind, Apple, Users, Calendar, Target, Rocket
```

---

## Canvas Rendering Details

### Drawing Order (Back to Front)

1. **Grid** (alpha: 0.1)
2. **Room Floors** (base color + 99)
3. **Room Walls** (base color + 66)
4. **Room Borders** (white, 1.5-3px)
5. **Objects** (layered by Z-index)
6. **Crew Members** (top layer)
7. **Labels & Text** (white, 12px font)
8. **Validation Indicators** (red/yellow/green dots)

### Lighting & Shadows

```javascript
// Pseudo-code for lighting
floor.fillStyle = baseColor + '99'; // 60% opacity
leftWall.fillStyle = baseColor + '66'; // 40% opacity (darker)
rightWall.fillStyle = baseColor + '4D'; // 30% opacity (darkest)
```

### Anti-aliasing
- Canvas: `context.imageSmoothingEnabled = true`
- Lines: `context.lineWidth = 1.5` (not 1 or 2)
- Circles: Use high segment count

---

## UI Component Styling

### Panels & Cards

```css
Background: rgba(255, 255, 255, 0.05)
Border: rgba(255, 255, 255, 0.10)
Backdrop: blur(2px)
Padding: 1rem
Border Radius: 0.5rem
```

### Progress Bars

```css
Height: 8px (default) or 6px (compact)
Background: rgba(255, 255, 255, 0.1)
Fill: gradient based on percentage
  > 70%: Green (#10B981)
  > 40%: Yellow (#F59E0B)
  ≤ 40%: Red (#EF4444)
Border Radius: 9999px (fully rounded)
```

### Badges

```css
Size: text-xs (0.75rem)
Padding: 0.25rem 0.5rem
Border: 1px solid rgba(255, 255, 255, 0.2)
Border Radius: 0.25rem
Variants:
  - Default: Primary color
  - Outline: Transparent bg, colored border
  - Destructive: Red
  - Secondary: Gray
```

---

## Animation Guidelines

### Smooth Transitions

```css
All transitions: 200-300ms ease-in-out
Hover effects: 150ms
Panel slides: 300ms
```

### Crew Movement

```javascript
// Linear interpolation for smooth movement
position.x += (target.x - position.x) * 0.1;
position.y += (target.y - position.y) * 0.1;
```

### Resource Depletion

```javascript
// Gradual decrease with visual feedback
resources.oxygen -= consumptionRate * deltaTime;
updateProgressBar(resources.oxygen / maxResources.oxygen);
```

---

## Accessibility Considerations

### Color Blindness
- Don't rely solely on color
- Use icons + text labels
- High contrast ratios (4.5:1 minimum)

### Text Readability
```css
Minimum font size: 12px
Body text: 14px
Headings: 16-24px
Colors: White/light on dark background
Shadow: text-shadow for contrast when needed
```

### Interactive Elements
- Minimum touch target: 44px × 44px
- Clear hover states
- Keyboard navigation support
- Screen reader friendly labels

---

## Asset Creation Workflow

### For Future Asset Development

1. **Sketch** - Draw concept in isometric grid
2. **Color** - Apply room-type color palette
3. **Details** - Add shading and highlights
4. **Export** - Save as PNG or SVG
5. **Optimize** - Compress for web
6. **Test** - Verify in-game at various zoom levels

### Recommended Tools
- **Vector**: Figma, Adobe Illustrator, Inkscape
- **Pixel Art**: Aseprite, Piskel, Pixaki
- **3D to Iso**: Blender (orthographic camera)

---

## Example: Creating a New Object

### Step-by-Step: Medical Scanner

1. **Define Dimensions**
   ```typescript
   dimensions: { width: 1.5, height: 2, depth: 1 }
   ```

2. **Choose Icon**
   ```typescript
   icon: '🏥' // or '📟' or '🔬'
   ```

3. **Assign Color**
   ```css
   Base: #10B981 (Medical green)
   Highlight: #34D399
   Shadow: #059669
   ```

4. **Canvas Rendering**
   ```javascript
   // Draw in isometric space
   const base = toIsometric(x, y, z);
   ctx.fillStyle = '#10B981AA';
   // Draw base, sides, details
   ```

5. **Add to gameData.ts**
   ```typescript
   {
     id: 'medical-scanner',
     name: 'Medical Scanner',
     category: 'equipment',
     dimensions: { width: 1.5, height: 2, depth: 1 },
     roomTypes: ['medical'],
     icon: '🏥'
   }
   ```

---

## Consistency Checklist

Before adding new assets, verify:

- [ ] Follows isometric projection (30° angle)
- [ ] Uses room-appropriate color palette
- [ ] Has clear, recognizable icon
- [ ] Scales properly (30px per meter)
- [ ] Matches existing art style
- [ ] Includes proper shading/highlights
- [ ] Works at different zoom levels
- [ ] Has hover/select states
- [ ] Accessible and readable
- [ ] Optimized file size

---

## Performance Tips

### Canvas Optimization

```javascript
// Only redraw when needed
useEffect(() => {
  draw();
}, [rooms, crew, selectedRoom]); // Dependencies

// Use requestAnimationFrame for smooth animation
const animate = () => {
  draw();
  requestAnimationFrame(animate);
};

// Clear only dirty regions (advanced)
ctx.clearRect(dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

### Asset Loading

```javascript
// Preload images if using sprites
const preloadImages = async () => {
  const images = {};
  for (const object of HABITAT_OBJECTS) {
    if (object.sprite) {
      images[object.id] = await loadImage(object.sprite);
    }
  }
  return images;
};
```

---

## Conclusion

This style guide ensures **visual consistency** throughout the Habitat Layout Creator. All assets—from rooms to objects to UI elements—follow these principles to create a **cohesive, professional game experience**.

**Key Principles:**
- 🎨 Consistent isometric projection
- 🌈 Semantic color coding
- 📐 Grid-based measurements
- ♿ Accessibility first
- ⚡ Performance optimized

---

**Ready to create beautiful space habitats!** 🚀✨
