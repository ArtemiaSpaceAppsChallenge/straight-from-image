# 🚀 Habitat Layout Creator - Space Habitat Design Game

## Overview

**Habitat Layout Creator** is an interactive, gamified tool for designing and managing space habitats for lunar, Mars, and orbital missions. Inspired by games like *Plague Inc* and *The Sims*, this tool combines educational content about NASA space habitat requirements with engaging gameplay mechanics.

## 🎮 Features

### Game Mechanics
- **Isometric 3D View**: Visualize your habitat design from an isometric perspective
- **Real-time Simulation**: Watch as your crew members live and work in your designed habitat
- **Resource Management**: Monitor and manage oxygen, water, power, and food supplies
- **Crew Management**: Each crew member has individual needs, skills, and moods
- **Mission Scenarios**: Choose from pre-defined missions with specific objectives

### Design Features
- **12 Room Types**: Including sleep quarters, medical, research, life support, and more
- **40+ Objects**: Furniture, equipment, storage, and decorations to customize your habitat
- **NASA Compliance Validation**: Real-time feedback on design compliance with NASA ECLSS standards
- **Zoning Rules**: Automatic validation of room adjacency and incompatibility rules
- **Volume Constraints**: Manage space efficiently within launch vehicle limits

### Educational Content
- Based on actual NASA habitat design guidelines
- Teaches about space habitat requirements
- Introduces concepts like ECLSS (Environmental Control and Life Support Systems)
- Explains crew volumetric requirements and mission planning

## 🏗️ Project Structure

```
src/
├── components/
│   └── game/
│       ├── GameContainer.tsx      # Main game orchestrator
│       ├── GameHeader.tsx         # Game controls and stats
│       ├── IsometricView.tsx      # 3D isometric habitat view
│       ├── CrewPanel.tsx          # Crew member management
│       ├── ResourcesPanel.tsx     # Resource tracking
│       ├── BuildPanel.tsx         # Room and object placement
│       ├── ValidationPanel.tsx    # NASA compliance checking
│       └── MissionSelector.tsx    # Mission selection screen
├── types/
│   └── game.ts                    # TypeScript type definitions
├── lib/
│   ├── gameData.ts                # Game configuration and data
│   └── gameLogic.ts               # Game mechanics and validation
└── pages/
    └── Play.tsx                   # Game entry point
```

## 🎯 Game Flow

1. **Mission Selection**: Choose from lunar, Mars, or orbital missions
2. **Habitat Design**: Add rooms and objects to create your habitat layout
3. **Validation**: Ensure design meets NASA standards
4. **Simulation**: Start the simulation to see crew members interact
5. **Management**: Monitor resources and crew happiness
6. **Scoring**: Achieve objectives and maximize compliance score

## 🛠️ Room Types

| Room Type | Purpose | Min Area/Crew | Noise Level |
|-----------|---------|---------------|-------------|
| Sleep | Crew rest quarters | 4.5 m² | 1/5 |
| Hygiene | Bathroom facilities | 2.5 m² | 2/5 |
| Exercise | Fitness equipment | 5.0 m² | 4/5 |
| Food | Meal prep & dining | 3.0 m² | 3/5 |
| Medical | Health monitoring | 4.0 m² | 1/5 |
| Research | Scientific work | 6.0 m² | 2/5 |
| Storage | Equipment storage | 2.0 m² | 1/5 |
| Life Support | ECLSS systems | 8.0 m² | 3/5 |
| Recreation | Crew relaxation | 5.0 m² | 3/5 |
| Communication | Comm systems | 3.0 m² | 2/5 |
| Maintenance | Repair workspace | 4.0 m² | 4/5 |
| Airlock | Entry/exit | 3.0 m² | 2/5 |

## 📊 Game Mechanics

### Resource Consumption (Per Crew Per Day)
- **Oxygen**: 0.84 kg/day
- **Water**: 3.6 L/day
- **Power**: 2.5 kWh/day
- **Food**: 1.8 kg/day

### Crew Needs
Each crew member has four needs that must be managed:
- **Health**: Overall physical condition (0-100%)
- **Energy**: Rest and fatigue levels (0-100%)
- **Hunger**: Food requirement (0-100%)
- **Hygiene**: Cleanliness needs (0-100%)

### Crew Skills
- **Engineering**: Repair and maintenance capabilities
- **Medical**: Health care proficiency
- **Science**: Research effectiveness

### Mood System
Crew mood is determined by their needs:
- 😊 **Happy**: All needs > 70%
- 😐 **Neutral**: Needs 50-70%
- 😰 **Stressed**: Needs 30-50%
- 😵 **Exhausted**: Needs < 30%

## 🎓 Educational Objectives

This tool teaches users about:

1. **Space Habitat Design Principles**
   - Volumetric requirements for different functions
   - Room adjacency and separation rules
   - Noise management in confined spaces

2. **Life Support Systems**
   - Environmental Control and Life Support Systems (ECLSS)
   - Resource recycling and consumption
   - System redundancy requirements

3. **Crew Considerations**
   - Human factors in space habitation
   - Ergonomics and workflow design
   - Psychological needs for long-duration missions

4. **Mission Planning**
   - Different requirements for lunar vs. Mars missions
   - Launch vehicle constraints
   - Scalability for different crew sizes

## 🚀 Mission Scenarios

### 1. Lunar Outpost - Short Mission
- **Duration**: 30 days
- **Crew**: 4 members
- **Max Volume**: 150 m³
- **Difficulty**: Easy
- **Objective**: Basic habitat with essential facilities

### 2. Mars Transit Vehicle
- **Duration**: 180 days (6 months)
- **Crew**: 6 members
- **Max Volume**: 300 m³
- **Difficulty**: Medium
- **Objective**: Long-duration transit habitat with crew wellness focus

### 3. Mars Surface Habitat
- **Duration**: 500 days
- **Crew**: 8 members
- **Max Volume**: 500 m³
- **Difficulty**: Hard
- **Objective**: Permanent base with research and maintenance capabilities

## 🎨 Design Guidelines

### Room Adjacency Rules
- ✅ **Good Adjacencies**:
  - Sleep ↔ Hygiene
  - Food ↔ Storage
  - Research ↔ Medical

- ❌ **Avoid Adjacencies**:
  - Sleep ↔ Exercise
  - Food ↔ Hygiene
  - Sleep ↔ Maintenance

### Noise Considerations
- Separate high-noise areas (exercise, maintenance) from quiet zones (sleep, medical)
- Minimum 2 rooms distance between incompatible noise levels

### Space Efficiency
- Target 70-95% volume utilization for optimal score
- Plan for crew movement and circulation
- Consider emergency access paths

## 💻 Technical Implementation

### Technologies Used
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **HTML5 Canvas** for isometric rendering
- **React Hooks** for state management

### Key Algorithms
- **Isometric Projection**: 2D to isometric coordinate transformation
- **Validation Engine**: Real-time NASA standards compliance checking
- **Crew AI**: Simple behavior system for crew member simulation
- **Resource Calculation**: Time-based consumption modeling

## 🎯 Scoring System

Your score is calculated based on:
- **Compliance Score** (50%): Meeting NASA standards
- **Crew Happiness** (30%): Average crew mood and health
- **Resource Efficiency** (20%): Optimal resource utilization

### Compliance Scoring
- Base: 100 points
- -10 points per validation error
- +5 points for optional facilities (recreation, research, medical)
- +10 points for optimal space utilization (70-95%)

## 🏆 Tips for Success

1. **Start with essentials**: Sleep, hygiene, food, and life support
2. **Plan adjacencies**: Follow NASA guidelines for room placement
3. **Monitor crew needs**: Unhappy crew affects mission success
4. **Balance resources**: Don't over or under provision
5. **Use space efficiently**: Fill 70-95% of available volume
6. **Add amenities**: Recreation and research improve scores

## 📚 References

Based on NASA documentation:
- *Defining the Net Habitable Volume for Long Duration Exploration Missions*
- *Deep Space Habitability Design Guidelines*
- *NASA's Moon to Mars Architecture Definition Document*
- *Habitats and Surface Construction Technology Roadmap*

## 🎮 How to Play

1. Navigate to `/play` route
2. Click "Start Designing"
3. Select a mission scenario
4. Add rooms from the Build Panel
5. Place objects within rooms
6. Start simulation with Play button
7. Monitor crew and resources
8. Adjust design as needed
9. Achieve mission objectives

## 🔮 Future Enhancements

Potential additions:
- [ ] 3D WebGL rendering
- [ ] Multiplayer design competitions
- [ ] Save/load habitat designs
- [ ] Export to 3D printable formats
- [ ] VR walkthrough mode
- [ ] Advanced crew AI with social interactions
- [ ] Weather and environmental events
- [ ] Construction time simulation
- [ ] Cost management system
- [ ] Integration with actual CAD tools

## 📄 License

This educational tool is developed for the NASA Space Apps Challenge 2025.

## 🤝 Credits

Developed by Team Artemia for NASA Space Apps Challenge 2025
- Challenge: "Your Home in Space: The Habitat Layout Creator"
- Category: Design, Space Exploration, Habitats

---

**Ready to design your home in space? Start your mission now!** 🚀🌙🔴
