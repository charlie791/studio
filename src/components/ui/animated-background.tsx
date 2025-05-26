'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      y: Math.random() * 100, // Random y position (0-100%)
      size: Math.random() * 20 + 10, // Size between 10-30px
      opacity: Math.random() * 0.6 + 0.2, // Opacity between 0.2-0.8
      duration: Math.random() * 20 + 15, // Duration between 15-35 seconds
      delay: Math.random() * 10, // Delay between 0-10 seconds
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#002455] via-[#003875] via-[#1e3a8a] via-[#003875] to-[#002455]"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridPulse 8s ease-in-out infinite',
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute w-[300px] h-[300px] top-[10%] left-[-150px] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30"
          style={{
            animation: 'float1 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[200px] h-[200px] top-[60%] right-[-100px] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30"
          style={{
            animation: 'float2 25s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[150px] h-[150px] top-[30%] right-[20%] rounded-2xl bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30 rotate-45"
          style={{
            animation: 'float3 18s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[100px] h-[100px] bottom-[20%] left-[10%] rounded-full bg-gradient-to-br from-[#FDA001] to-[#FDA001]/30"
          style={{
            animation: 'float4 22s ease-in-out infinite',
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#FDA001]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: 'blur(0.5px)',
              animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 35px) rotate(-120deg); }
          66% { transform: translate(15px, -25px) rotate(-240deg); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          50% { transform: translate(20px, -20px) rotate(225deg); }
        }

        @keyframes float4 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, -15px); }
        }

        @keyframes floatParticle {
          0%, 100% { 
            transform: translate(0, 0); 
            opacity: 0.2;
          }
          25% { 
            transform: translate(10px, -20px); 
            opacity: 0.8;
          }
          50% { 
            transform: translate(-5px, -40px); 
            opacity: 0.4;
          }
          75% { 
            transform: translate(15px, -30px); 
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
