const InfoCards = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Nome do Desafio</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Criação de uma ferramenta visual para projetar e avaliar layouts de habitats espaciais.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Proposta do Time</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Focar no perfil interno com zoneamento assistido por regras, feedback de volumetrias e 
              simulação de consumo (Oxigênio).
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Integrantes</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Nome 1 – Função</li>
              <li>• Nome 2 – Função</li>
              <li>• Nome 3 – Função</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
