const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Ellipse 10 - Blue gradient top left */}
      <div 
        className="absolute w-[1541px] h-[669px] left-[111px] -top-[160px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(16, 64, 160, 0.4) 0%, rgba(16, 64, 160, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 11 - Purple gradient top center */}
      <div 
        className="absolute w-[1272px] h-[873px] left-[828px] -top-[190px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(163, 40, 224, 0.25) 0%, rgba(163, 40, 224, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 12 - Cyan gradient top right */}
      <div 
        className="absolute w-[922px] h-[719px] left-[1191px] -top-[160px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(22, 156, 216, 0.25) 0%, rgba(22, 156, 216, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 13 - Cyan gradient bottom left */}
      <div 
        className="absolute w-[962px] h-[965px] -left-[202px] top-[727px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(22, 156, 216, 0.25) 0%, rgba(22, 156, 216, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Ellipse 14 - Pink gradient bottom */}
      <div 
        className="absolute w-[630px] h-[708px] -left-[169px] top-[984px]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(204, 140, 235, 0.25) 0%, rgba(204, 140, 235, 0) 100%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
