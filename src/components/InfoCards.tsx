const InfoCards = () => {
  return (
    <section className="py-8 md:py-12 lg:py-0 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[22px]">
          <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-foreground leading-tight lg:leading-[39px] mb-4 md:mb-6">
              Nome do Desafio
            </h3>
            <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
              Criação de uma ferramenta visual para projetar e avaliar layouts de habitats espaciais.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-foreground leading-tight lg:leading-[39px] mb-4 md:mb-6">
              Proposta do Time
            </h3>
            <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
              Focar no perfil interno com zoneamento assistido por regras, feedback de volume/área e simulação de consumo (O₂/energia).
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-foreground leading-tight lg:leading-[39px] mb-4 md:mb-6">
              Integrantes
            </h3>
            <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
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
