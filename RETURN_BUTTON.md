# Return to Home Button Documentation

## Overview
A convenient navigation button that allows users to return to the main page from the game interface, with built-in protection against accidental data loss.

## Features

### **🏠 Easy Navigation**
- Located at the top-left of the game interface
- Always visible and accessible
- Clear "Return to Home" label with arrow icon
- Consistent styling with the rest of the UI

### **🛡️ Data Loss Prevention**
The button includes smart confirmation logic:
- **No rooms placed**: Returns immediately (no confirmation needed)
- **With rooms placed**: Shows confirmation dialog before leaving
- **Prevents accidental loss**: Protects user's work

### **Confirmation Dialog**
When user has an active habitat design:
```
"Are you sure you want to return to home? 
Your current habitat design will be lost."
```
- **OK**: Returns to home page, loses current design
- **Cancel**: Stays in game, preserves work

## Visual Design

### **Button Appearance**
- **Style**: Ghost button (transparent background)
- **Color**: White text
- **Hover**: Cyan (#00D9FF) text with subtle white background
- **Icon**: Left-pointing arrow (←)
- **Position**: Top-left corner, before game header

### **Button States**
| State | Text Color | Background | Icon |
|-------|-----------|------------|------|
| Normal | White | Transparent | ← |
| Hover | Cyan (#00D9FF) | White/10% | ← |
| Click | Cyan | White/20% | ← |

## Implementation

### **Location**
```typescript
// In GameContainer.tsx
<div className="flex justify-start">
  <Button
    onClick={handleReturnHome}
    variant="ghost"
    className="text-white hover:text-cyan-400 hover:bg-white/10"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Return to Home
  </Button>
</div>
```

### **Logic**
```typescript
const handleReturnHome = () => {
  if (gameState.habitat && gameState.habitat.rooms.length > 0) {
    // Has rooms - show confirmation
    const confirmed = window.confirm(
      'Are you sure you want to return to home? Your current habitat design will be lost.'
    );
    if (confirmed) {
      navigate('/');
    }
  } else {
    // No rooms - navigate immediately
    navigate('/');
  }
};
```

### **Dependencies**
- `react-router-dom`: For navigation with `useNavigate()`
- `lucide-react`: For ArrowLeft icon
- `@/components/ui/button`: Button component

## User Experience

### **Usage Flow**

1. **User clicks "Return to Home"**
   - System checks if habitat has rooms

2. **If no rooms placed:**
   - Navigates immediately to home page
   - No confirmation needed

3. **If rooms exist:**
   - Shows confirmation dialog
   - User can confirm or cancel
   - Only navigates if confirmed

### **Best Practices for Users**
- Save important designs by taking screenshots
- Use browser back button as alternative
- Confirm intention before leaving
- Note that designs are not persisted (future enhancement)

## Accessibility

### **Keyboard Navigation**
- Tab to focus the button
- Enter or Space to activate
- Confirmation dialog is keyboard accessible

### **Visual Clarity**
- Clear icon indicates navigation direction
- Descriptive text label
- High contrast hover state
- Consistent placement

### **Screen Readers**
Button is properly labeled for screen reader users:
- "Return to Home button"
- Confirmation dialog text is read aloud

## Integration Points

### **Game State Check**
Button checks these conditions:
- `gameState.habitat !== null` - Habitat exists
- `gameState.habitat.rooms.length > 0` - Rooms have been added

### **Navigation**
Uses React Router's `useNavigate()` hook:
- Target route: `/` (home page)
- Clean navigation without page reload
- Maintains app state for other components

## Future Enhancements

### **Potential Improvements**
1. **Save Progress**: Option to save before leaving
2. **Auto-save**: Periodic automatic saving
3. **Export Design**: Download habitat as JSON
4. **Recent Designs**: List of recent designs on home page
5. **Quick Save**: Keyboard shortcut (Ctrl+S)
6. **Better Dialog**: Custom modal instead of browser confirm
7. **Undo Return**: Temporary restore option

### **Save System Design**
Future save system could include:
```typescript
interface SavedDesign {
  id: string;
  name: string;
  timestamp: Date;
  habitatData: HabitatDesign;
  thumbnail?: string;
}
```

## Comparison with Other Pages

### **Play Page (Intro)**
- Has "Back to Home" button
- No confirmation needed (no work in progress)
- Same styling and icon

### **Game Interface**
- Has "Return to Home" button
- Includes confirmation when needed
- Protects user work

### **Consistency**
Both buttons provide:
- Same visual style
- Same icon (ArrowLeft)
- Same hover effects
- Clear navigation intent

## Error Handling

### **Graceful Failures**
- If navigation fails, user remains in game
- Confirmation dialog failures default to staying
- No crashes or broken states

### **Edge Cases Handled**
- Empty habitat (no confirmation)
- Habitat with only rooms (confirms)
- Habitat with rooms and objects (confirms)
- Mission selector active (navigates immediately)

## Testing Checklist

✅ Button appears in game interface
✅ Button styled correctly
✅ Hover state works
✅ Click with no rooms → navigates immediately
✅ Click with rooms → shows confirmation
✅ Confirm dialog → navigates to home
✅ Cancel dialog → stays in game
✅ Icon displays correctly
✅ Text is readable
✅ Keyboard accessible

## Summary

The Return to Home button provides:
- **Easy navigation**: Quick way back to main page
- **Data protection**: Confirms before losing work
- **Clear feedback**: User knows what will happen
- **Consistent design**: Matches app styling
- **Accessible**: Works for all users

This feature greatly improves navigation and prevents accidental loss of user work while maintaining a clean, intuitive interface!