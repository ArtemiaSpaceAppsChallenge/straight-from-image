import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Play = () => {
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
            
            <div className="relative w-full bg-muted/20 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src="about:blank"
                title="Artemia Habitat Designer Game"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <p className="text-lg md:text-xl">Game Interface Loading...</p>
                  <p className="text-sm md:text-base">Replace iframe src with your game URL</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Quick Start Guide
              </h2>
              <ul className="space-y-2 text-foreground text-sm md:text-base">
                <li>• Select habitat type and crew size</li>
                <li>• Design your layout using the drag-and-drop interface</li>
                <li>• Validate zoning compliance with NASA ECLSS standards</li>
                <li>• Review resource consumption metrics</li>
                <li>• Export or save your design</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Play;
