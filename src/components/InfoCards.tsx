const InfoCards = () => {
  return (
    <section className="py-0 px-6 relative z-10">
      <div className="container mx-auto max-w-[1623px]">
        <div className="grid grid-cols-3 gap-[22px]">
          <div className="bg-white/5 border border-white/15 rounded-[21px] backdrop-blur-[2px] p-8 w-[526px] h-[218px]">
            <h3 className="text-[32px] font-bold text-foreground leading-[39px] mb-6">
              Nome do Desafio
            </h3>
            <p className="text-foreground text-xl leading-6">
              Criação de uma ferramenta visual para projetar e avaliar layouts de habitats espaciais.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/15 rounded-[21px] backdrop-blur-[2px] p-8 w-[527px] h-[218px]">
            <h3 className="text-[32px] font-bold text-foreground leading-[39px] mb-6">
              Proposta do Time
            </h3>
            <p className="text-foreground text-xl leading-6">
              Focar no perfil interno com zoneamento assistido por regras, feedback de volume/área e simulação de consumo (O₂/energia).
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/15 rounded-[21px] backdrop-blur-[2px] p-8 w-[526px] h-[218px]">
            <h3 className="text-[32px] font-bold text-foreground leading-[39px] mb-6">
              Integrantes
            </h3>
            <p className="text-foreground text-xl leading-6">
              Nome 1 — Função<br />
              Nome 2 — Função<br />
              Nome 3 — Função
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
