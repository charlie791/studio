'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent blur-3xl animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-600/20 via-blue-600/20 to-transparent blur-3xl animate-gradient-shift-reverse" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Floating gradient orbs */}
      <div className="absolute inset-0">
        {/* Large orb */}
        <div className="absolute top-1/4 -left-48 w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-float-slow" />
        </div>
        
        {/* Medium orb */}
        <div className="absolute top-3/4 -right-32 w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 to-blue-600/25 rounded-full blur-3xl animate-float-medium" />
        </div>
        
        {/* Small orb */}
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-2xl animate-float-fast" />
        </div>
      </div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.2;
          }
        }
        
        @keyframes gradient-shift-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(-30px, 30px) scale(1.1);
            opacity: 0.2;
          }
          66% {
            transform: translate(20px, -20px) scale(0.9);
            opacity: 0.5;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.95);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -50px) scale(1.15);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-20px, -40px) scale(1.1);
          }
          75% {
            transform: translate(40px, 20px) scale(0.95);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
        
        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 20s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
