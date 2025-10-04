const FeaturesMVP = () => {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="container mx-auto max-w-[1623px]">
        <div className="bg-white/5 border border-white/15 rounded-[21px] backdrop-blur-[2px] p-8 w-full h-[218px]">
          <h2 className="text-2xl font-bold text-foreground leading-[29px] mb-6">
            Features MVP
          </h2>
          
          <div className="grid grid-cols-2 gap-x-[200px] gap-y-3">
            <div className="flex gap-2">
              <span className="text-foreground text-xl">1.</span>
              <p className="text-foreground text-xl leading-6">
                Seleção de tipos de habitat e tamanho da tripulação
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="text-foreground text-xl">2.</span>
              <p className="text-foreground text-xl leading-6">
                Foco no layout interno com zoneamento
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="text-foreground text-xl">3.</span>
              <p className="text-foreground text-xl leading-6">
                Áreas de exercício (evitar degradação muscular)
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="text-foreground text-xl">4.</span>
              <p className="text-foreground text-xl leading-6">
                Áreas de alimentação
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="text-foreground text-xl">5.</span>
              <p className="text-foreground text-xl leading-6">
                Relação Tripulante × gasto energético × O₂
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesMVP;
