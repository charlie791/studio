
'use client'

// Removed useEffect and useState for particleKey as it's not needed with new Tailwind config

export function AnimatedBackground() {
  // const particleSizes = ['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6'];
  // const particleOpacities = ['opacity-50', 'opacity-60', 'opacity-70', 'opacity-80'];

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#002455] via-[#003875] via-[#1e3a8a] via-[#003875] to-[#002455] animate-gradient-shift"
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-30 animate-grid-pulse"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[300px] h-[300px] top-[10%] left-[-150px] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30 animate-float-1" />
        <div className="absolute w-[200px] h-[200px] top-[60%] right-[-100px] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30 animate-float-2" />
        <div className="absolute w-[150px] h-[150px] top-[30%] right-[20%] rounded-2xl bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30 rotate-45 animate-float-3" />
        <div className="absolute w-[100px] h-[100px] bottom-[20%] left-[10%] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30 animate-float-4" />
      </div>

      {/* Dancing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => {
          const size = 3 + (i % 6); // Calculate size: 3px to 8px
          const opacity = (50 + (i % 4) * 10) / 100; // Calculate opacity: 0.5 to 0.8

          return (
            <div
              key={i}
              className={`absolute rounded-full bg-[#FDA001] animate-particle-dance-${i + 1}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                left: `${5 + (i * 4.5)}%`,
                filter: 'blur(0.5px)',
                // animationDelay is handled by the Tailwind config's animation definition
              }}
            />
          );
        })}
      </div>
    </div>
  )
}
