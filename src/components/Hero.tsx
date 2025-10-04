import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Desafio: Your Home in Space: The Habitat Layout Creator
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Crie e gerencie layouts de habitats para missões Artemis e Marte! Defina termos/volumes, 
              pontos viveis, Critérios IEC/IOS, higiene, preparo de alimentos, exercícios, e teste 
              rapidamente viabilidades.
            </p>
            
            <div className="flex gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Play className="w-4 h-4 fill-current" />
                Play
              </Button>
              <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground/10">
                Ver regra de zoneamento
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/placeholder.svg" 
                alt="Layout Creator Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
