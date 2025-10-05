import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GameContainer } from "@/components/game/GameContainer";
import { useState } from "react";

const Play = () => {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return <GameContainer />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] relative overflow-hidden">
      <Header />
      
      <main className="pt-20 md:pt-32 lg:pt-[120px] px-4 md:px-6 lg:px-12 pb-8 md:pb-12">
        <div className="w-full max-w-7xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Habitat Layout Designer
            </h1>
            
            <div className="text-center py-12">
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  🚀 Your Home in Space
                </h2>
                <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                  Design and manage space habitats for lunar, Mars, and orbital missions. 
                  Create functional layouts, manage crew needs, and ensure compliance with NASA standards.
                </p>
              </div>

              <Button 
                onClick={() => setShowGame(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                Start Designing
              </Button>
            </div>
            
            <div className="mt-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Features
              </h2>
              <ul className="space-y-2 text-foreground text-sm md:text-base">
                <li>• 🎮 Gamified experience inspired by Plague Inc and The Sims</li>
                <li>• 🏗️ Design habitats with isometric 3D view</li>
                <li>• 👨‍🚀 Manage crew members with individual needs and skills</li>
                <li>• 📊 Track resources (oxygen, water, power, food) in real-time</li>
                <li>• ✓ Validate designs against NASA ECLSS standards</li>
                <li>• 🌙 Multiple mission scenarios (Lunar, Mars, Orbital)</li>
                <li>• 🛠️ Place furniture, equipment, and decorations</li>
                <li>• 📈 Monitor crew happiness and habitat compliance scores</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Play;
