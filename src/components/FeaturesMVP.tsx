const FeaturesMVP = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Features MVP</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-muted-foreground font-medium">1.</span>
                <p className="text-muted-foreground">Seleção de tipo e habitat e tamanho da tripulação</p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-muted-foreground font-medium">3.</span>
                <p className="text-muted-foreground">Áreas de exercício (evitar degradação muscular)</p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-muted-foreground font-medium">5.</span>
                <p className="text-muted-foreground">Habitação Tripulante e quase atmosférica + O₂</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-muted-foreground font-medium">2.</span>
                <p className="text-muted-foreground">Foco no layout interno com zoneamento</p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-muted-foreground font-medium">4.</span>
                <p className="text-muted-foreground">Áreas de alimentação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesMVP;
