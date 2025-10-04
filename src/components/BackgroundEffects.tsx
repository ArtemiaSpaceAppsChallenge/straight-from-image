const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 182, 218, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 182, 218, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Ellipse 10 - Blue gradient top left */}
      <div
        className="absolute w-[800px] md:w-[1200px] lg:w-[1541px] h-[400px] md:w-[500px] lg:h-[669px] left-[20px] md:left-[60px] lg:left-[111px] -top-[100px] md:-top-[140px] lg:-top-[160px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(16, 64, 160, 0.4) 0%, rgba(16, 64, 160, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 11 - Purple gradient top center */}
      <div 
        className="absolute w-[700px] md:w-[1000px] lg:w-[1272px] h-[500px] md:h-[700px] lg:h-[873px] left-[200px] md:left-[500px] lg:left-[828px] -top-[100px] md:-top-[150px] lg:-top-[190px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(163, 40, 224, 0.25) 0%, rgba(163, 40, 224, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 12 - Cyan gradient top right */}
      <div 
        className="absolute w-[600px] md:w-[800px] lg:w-[922px] h-[400px] md:h-[550px] lg:h-[719px] left-[300px] md:left-[700px] lg:left-[1191px] -top-[100px] md:-top-[140px] lg:-top-[160px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(22, 156, 216, 0.25) 0%, rgba(22, 156, 216, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 13 - Cyan gradient bottom left */}
      <div 
        className="absolute w-[600px] md:w-[800px] lg:w-[962px] h-[600px] md:h-[800px] lg:h-[965px] -left-[100px] md:-left-[150px] lg:-left-[202px] top-[400px] md:top-[550px] lg:top-[727px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(22, 156, 216, 0.25) 0%, rgba(22, 156, 216, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 14 - Pink gradient bottom */}
      <div 
        className="absolute w-[400px] md:w-[500px] lg:w-[630px] h-[400px] md:h-[550px] lg:h-[708px] -left-[80px] md:-left-[120px] lg:-left-[169px] top-[500px] md:top-[700px] lg:top-[984px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(204, 140, 235, 0.25) 0%, rgba(204, 140, 235, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
