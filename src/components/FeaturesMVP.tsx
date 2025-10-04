const FeaturesMVP = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight lg:leading-[29px] mb-6">
            Core Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-y-3 lg:gap-x-[200px]">
            <div className="flex gap-2 md:gap-3">
              <span className="text-foreground text-base md:text-lg lg:text-xl font-medium">1.</span>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                Habitat type selection and crew capacity modeling
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <span className="text-foreground text-base md:text-lg lg:text-xl font-medium">2.</span>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                Intelligent zoning with ECLSS compliance validation
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <span className="text-foreground text-base md:text-lg lg:text-xl font-medium">3.</span>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                Exercise area allocation for muscular degradation mitigation
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <span className="text-foreground text-base md:text-lg lg:text-xl font-medium">4.</span>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                Food preparation and consumption zone optimization
              </p>
            </div>
            
            <div className="flex gap-2 md:gap-3">
              <span className="text-foreground text-base md:text-lg lg:text-xl font-medium">5.</span>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
                Real-time crew-to-resource consumption analytics (O₂, kW, m³)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesMVP;
