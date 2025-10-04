import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-[247px] pb-20 px-6 relative z-10">
      <div className="container mx-auto max-w-[1623px]">
        <div className="grid lg:grid-cols-[850px_1fr] gap-[74px] items-start">
          <div className="space-y-8">
            <h1 className="text-[40px] font-bold text-foreground leading-[49px] pt-16">
              Desafio: Your Home in Space: The Habitat Layout Creator
            </h1>
            
            <p className="text-foreground text-xl leading-6">
              Crie e avalie layouts de habitats para missões Artemis e Marte: defina forma/volume, zoneie áreas críticas (ECLSS, higiene, preparo de alimentos, exercício), e teste rapidamente opções.
            </p>
            
            <div className="flex gap-[22px]">
              <Button 
                className="w-[236px] h-[63px] bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90 rounded-3xl text-2xl font-bold"
              >
                <Play className="w-4 h-4 fill-current mr-2" />
                Play
              </Button>
              <Button 
                variant="outline" 
                className="w-[436px] h-[63px] bg-[#171B24] border-[#393D46] hover:bg-[#171B24]/80 rounded-3xl text-2xl font-bold"
              >
                Ver regra de zoneamento
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="bg-white/5 border border-white/15 rounded-[21px] overflow-hidden backdrop-blur-[2px] w-[699px] h-[470px] flex items-center justify-center"
            >
              <div className="w-[647px] h-[409px] border border-white/15 rounded-[9px] bg-muted/20 flex items-center justify-center text-muted-foreground">
                Layout Creator Interface
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
