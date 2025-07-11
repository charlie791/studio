'use client';

import { useEffect } from 'react';

export default function HeartwarmerLandingPage() {
  useEffect(() => {

    // Modal functionality
    const modal = document.getElementById('careModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('careForm');
    
    // Open modal function
    function openModal() {
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
    
    // Close modal function
    function closeModal() {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
    
    // Hero CTA
    const heroCTA = document.querySelector('.warm-cta');
    if (heroCTA) {
      heroCTA.addEventListener('click', openModal);
    }
    
    // Plan CTAs
    const planCTAs = document.querySelectorAll('.plan-cta');
    planCTAs.forEach(btn => {
      btn.addEventListener('click', function(this: Element) {
        const planTitle = this.closest('.plan-card')?.querySelector('.plan-title')?.textContent;
        openModal();
        
        // Pre-select the plan in dropdown
        const select = document.getElementById('interest') as HTMLSelectElement;
        if (select && planTitle) {
          if (planTitle.includes('Essential')) {
            select.value = 'essential';
          } else if (planTitle.includes('Complete')) {
            select.value = 'complete';
          } else if (planTitle.includes('Total')) {
            select.value = 'total';
          }
        }
      });
    });
    
    // Close modal events
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeModal();
      }
    });
    
    // Form submission
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this as HTMLFormElement);
        const name = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const interest = formData.get('interest');
        
        // Here you would normally send to your backend
        console.log('Form submitted:', { name, email, phone, interest });
        
        // Show warm success message
        alert('Thank you so much! 💕 We can\'t wait to help you protect your beautiful home. We\'ll be in touch very soon with care and love.');
        
        // Close modal and reset form
        closeModal();
        (this as HTMLFormElement).reset();
      });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        if (value.length >= 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
          value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        target.value = value;
      });
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        /* CSS Custom Properties for Warm Theme */
        :root {
          --warm-coral: #FF6B6B;
          --warm-peach: #FFE5CC;
          --warm-gold: #FFD93D;
          --warm-sage: #6BCB77;
          --warm-sky: #4ECDC4;
          --warm-lavender: #95A5F5;
          --warm-cream: #FFF8F0;
          --warm-gray: #8B8B8B;
          --warm-dark: #2D3436;
          --warm-white: #FFFFFF;
          --shadow-warm: rgba(255, 107, 107, 0.15);
          --shadow-soft: rgba(0, 0, 0, 0.08);
          
          /* Darker versions for hero gradient */
          --warm-coral-dark: #C53030;
          --warm-peach-dark: #DD6B20;
          --warm-gold-dark: #B7791F;
          --warm-sky-dark: #2C7A7B;
          --warm-purple-dark: #553C9A;
        }

        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--warm-dark);
          background: linear-gradient(135deg, var(--warm-cream) 0%, var(--warm-peach) 100%);
          overflow-x: hidden;
        }

        /* Champagne Bubbles Animation */
        .champagne-bubbles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
          overflow: hidden;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0.3) 100%);
          backdrop-filter: blur(1px);
          box-shadow: 
            inset 0 1px 3px rgba(255, 255, 255, 0.5),
            0 2px 8px rgba(255, 255, 255, 0.15);
          animation: bubbleFloat 8s infinite ease-in-out;
        }

        /* Different bubble sizes */
        .bubble.small { width: 8px; height: 8px; }
        .bubble.medium { width: 12px; height: 12px; }
        .bubble.large { width: 16px; height: 16px; }
        .bubble.tiny { width: 4px; height: 4px; }

        /* Bubble positioning and timing */
        .bubble:nth-child(1) { left: 5%; animation-delay: 0s; animation-duration: 7s; }
        .bubble:nth-child(2) { left: 15%; animation-delay: 1.5s; animation-duration: 9s; }
        .bubble:nth-child(3) { left: 25%; animation-delay: 3s; animation-duration: 6s; }
        .bubble:nth-child(4) { left: 35%; animation-delay: 0.5s; animation-duration: 8s; }
        .bubble:nth-child(5) { left: 45%; animation-delay: 2s; animation-duration: 7.5s; }
        .bubble:nth-child(6) { left: 55%; animation-delay: 4s; animation-duration: 6.5s; }
        .bubble:nth-child(7) { left: 65%; animation-delay: 1s; animation-duration: 8.5s; }
        .bubble:nth-child(8) { left: 75%; animation-delay: 3.5s; animation-duration: 7s; }
        .bubble:nth-child(9) { left: 85%; animation-delay: 2.5s; animation-duration: 9s; }
        .bubble:nth-child(10) { left: 95%; animation-delay: 4.5s; animation-duration: 6s; }
        .bubble:nth-child(11) { left: 10%; animation-delay: 5s; animation-duration: 8s; }
        .bubble:nth-child(12) { left: 30%; animation-delay: 6s; animation-duration: 7s; }
        .bubble:nth-child(13) { left: 50%; animation-delay: 0.8s; animation-duration: 8.5s; }
        .bubble:nth-child(14) { left: 70%; animation-delay: 2.8s; animation-duration: 6.5s; }
        .bubble:nth-child(15) { left: 90%; animation-delay: 1.8s; animation-duration: 7.5s; }

        @keyframes bubbleFloat {
          0% { 
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          5% { 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(75vh) translateX(10px);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(50vh) translateX(-5px);
            opacity: 0.9;
          }
          75% { 
            transform: translateY(25vh) translateX(8px);
            opacity: 0.7;
          }
          95% { 
            transform: translateY(10vh) translateX(-3px);
            opacity: 0.4;
          }
          100% { 
            transform: translateY(-10vh) translateX(0px);
            opacity: 0;
          }
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, 
            #C53030 0%, 
            #DD6B20 25%, 
            #B7791F 50%, 
            #2C7A7B 75%,
            #553C9A 100%);
          padding: 4rem 2rem;
          text-align: center;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        


        .hero-content {
          max-width: 800px;
          position: relative;
          z-index: 10;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .celebration-emoji {
          font-size: 4rem;
          display: block;
          margin-bottom: 1rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .hero-title {
          font-family: var(--font-playfair), serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4);
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 2rem;
          line-height: 1.4;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);
          color: #FFFFFF;
        }

        .hero-message {
          font-size: 1.1rem;
          margin-bottom: 3rem;
          font-weight: 400;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);
          color: #FFFFFF;
        }

        /* Warm CTA Button */
        .warm-cta {
          background: linear-gradient(135deg, var(--warm-white) 0%, var(--warm-cream) 100%);
          color: var(--warm-dark);
          border: none;
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px var(--shadow-warm);
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .warm-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }

        .warm-cta:hover::before {
          left: 100%;
        }

        .warm-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px var(--shadow-warm);
        }

        .warm-cta .heart-icon {
          color: var(--warm-coral);
          font-size: 1.2rem;
        }

        /* Trust Section */
        .trust-section {
          padding: 4rem 2rem;
          background: var(--warm-white);
          text-align: center;
          position: relative;
        }

        .trust-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .trust-title {
          font-family: var(--font-playfair), serif;
          font-size: 2.5rem;
          color: var(--warm-dark);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .trust-subtitle {
          font-size: 1.2rem;
          color: var(--warm-gray);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .trust-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .trust-stat {
          padding: 2rem;
          background: linear-gradient(135deg, var(--warm-cream) 0%, var(--warm-peach) 100%);
          border-radius: 20px;
          box-shadow: 0 4px 20px var(--shadow-soft);
          transition: transform 0.3s ease;
        }

        .trust-stat:hover {
          transform: translateY(-5px);
        }

        .trust-stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--warm-coral);
          display: block;
          margin-bottom: 0.5rem;
        }

        .trust-stat-label {
          font-size: 1rem;
          color: var(--warm-dark);
          font-weight: 500;
        }

        /* Plans Section */
        .plans-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, var(--warm-cream) 0%, var(--warm-peach) 100%);
          position: relative;
        }

        .plans-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .plans-title {
          font-family: var(--font-playfair), serif;
          font-size: 2.8rem;
          color: var(--warm-dark);
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .plans-subtitle {
          font-size: 1.3rem;
          color: var(--warm-gray);
          text-align: center;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .plan-card {
          background: var(--warm-white);
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 10px 40px var(--shadow-soft);
          transition: all 0.3s ease;
          position: relative;
          border: 2px solid transparent;
        }

        .plan-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px var(--shadow-warm);
          border-color: var(--warm-coral);
        }

        .plan-card.featured {
          border-color: var(--warm-gold);
          transform: scale(1.05);
        }

        .plan-card.featured::before {
          content: '✨ Most Popular';
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, var(--warm-gold) 0%, var(--warm-coral) 100%);
          color: var(--warm-white);
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 10;
        }

        .plan-header {
          background: linear-gradient(135deg, var(--warm-coral) 0%, var(--warm-sky) 100%);
          color: var(--warm-white);
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
        }

        .plan-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .plan-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .plan-summary {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .plan-price {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .plan-period {
          font-size: 1rem;
          opacity: 0.8;
        }

        .plan-content {
          padding: 2.5rem 2rem;
        }

        .plan-features {
          list-style: none;
          margin-bottom: 2rem;
        }

        .plan-features li {
          padding: 0.75rem 0;
          font-size: 1rem;
          color: var(--warm-dark);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .plan-features li::before {
          content: '💚';
          font-size: 1.2rem;
        }

        .plan-love-note {
          background: linear-gradient(135deg, var(--warm-peach) 0%, var(--warm-cream) 100%);
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          font-style: italic;
          color: var(--warm-dark);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .plan-cta {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, var(--warm-coral) 0%, var(--warm-sky) 100%);
          color: var(--warm-white);
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .plan-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px var(--shadow-warm);
        }

        .plan-cta.featured {
          background: linear-gradient(135deg, var(--warm-gold) 0%, var(--warm-coral) 100%);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: var(--warm-white);
          border-radius: 25px;
          padding: 2.5rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          transform: translateY(20px);
          transition: transform 0.3s ease;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
        }

        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--warm-cream);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--warm-gray);
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: var(--warm-peach);
          color: var(--warm-dark);
        }

        .modal-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--warm-dark);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .modal-subtitle {
          color: var(--warm-gray);
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: var(--warm-dark);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--warm-cream);
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: var(--warm-white);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--warm-coral);
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }

        .form-submit {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, var(--warm-coral) 0%, var(--warm-sky) 100%);
          color: var(--warm-white);
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px var(--shadow-warm);
        }

        /* Footer */
        .footer {
          background: var(--warm-dark);
          color: var(--warm-white);
          padding: 3rem 2rem 1rem;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-message {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .footer-heart {
          color: var(--warm-coral);
          font-size: 1.5rem;
          margin: 0 0.5rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-links a {
          color: var(--warm-white);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .plans-grid {
            grid-template-columns: 1fr;
          }

          .plan-card.featured {
            transform: none;
          }

          .trust-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      

      {/* Hero Section */}
      <section className="hero">
        {/* Champagne Bubbles */}
        <div className="champagne-bubbles">
          <div className="bubble small"></div>
          <div className="bubble medium"></div>
          <div className="bubble tiny"></div>
          <div className="bubble large"></div>
          <div className="bubble small"></div>
          <div className="bubble medium"></div>
          <div className="bubble tiny"></div>
          <div className="bubble small"></div>
          <div className="bubble large"></div>
          <div className="bubble medium"></div>
          <div className="bubble tiny"></div>
          <div className="bubble small"></div>
          <div className="bubble medium"></div>
          <div className="bubble tiny"></div>
          <div className="bubble small"></div>
        </div>
        
        <div className="hero-content">
          <span className="celebration-emoji">🎉</span>
          <h1 className="hero-title">
            You Did It!<br />
            Your Dream Home is Real
          </h1>
          <p className="hero-subtitle">
            We know how much this moment means to you
          </p>
          <p className="hero-message">
            Creating a beautiful home is one of life's greatest achievements. You've poured your heart into every detail, chosen every finish with care, and now you have something truly special. We're here to help you keep it that way — not because we have to, but because we want to celebrate this journey with you.
          </p>
          <button className="warm-cta">
            <span className="heart-icon">💝</span>
            Let's protect your beautiful investment
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <h2 className="trust-title">You're in Great Company</h2>
          <p className="trust-subtitle">
            Thousands of homeowners have trusted us to protect their most precious spaces
          </p>
          
          <div className="trust-stats">
            <div className="trust-stat">
              <span className="trust-stat-number">25,000+</span>
              <span className="trust-stat-label">Happy Homeowners</span>
            </div>
            <div className="trust-stat">
              <span className="trust-stat-number">40+</span>
              <span className="trust-stat-label">Years of Care</span>
            </div>
            <div className="trust-stat">
              <span className="trust-stat-number">98%</span>
              <span className="trust-stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans-section">
        <div className="plans-content">
          <h2 className="plans-title">How We Can Help</h2>
          <p className="plans-subtitle">
            Choose the level of care that feels right for your beautiful new space
          </p>
          
          <div className="plans-grid">
            {/* Essential Care Plan */}
            <div className="plan-card">
              <div className="plan-header">
                <div className="plan-icon">🛡️</div>
                <h3 className="plan-title">Essential Care</h3>
                <p className="plan-summary">5 Years of Gentle Protection</p>
                <div className="plan-price">$74.75</div>
                <div className="plan-period">4 comfortable payments</div>
              </div>
              <div className="plan-content">
                <ul className="plan-features">
                  <li>Protection against everyday kitchen mishaps</li>
                  <li>Coverage for common stains and minor chips</li>
                  <li>Caring customer support when you need us</li>
                  <li>Peace of mind for 5 full years</li>
                </ul>
                <div className="plan-love-note">
                  Perfect for those who want basic protection without the worry
                </div>
                <button className="plan-cta">This feels right for us</button>
              </div>
            </div>

            {/* Complete Care Plan */}
            <div className="plan-card">
              <div className="plan-header">
                <div className="plan-icon">⭐</div>
                <h3 className="plan-title">Complete Care</h3>
                <p className="plan-summary">10 Years of Comprehensive Love</p>
                <div className="plan-price">$124.75</div>
                <div className="plan-period">4 comfortable payments</div>
              </div>
              <div className="plan-content">
                <ul className="plan-features">
                  <li>Everything in Essential Care, plus more</li>
                  <li>Protection against heat marks and deeper scratches</li>
                  <li>Priority support when you need help</li>
                  <li>Annual check-ins to keep things beautiful</li>
                </ul>
                <div className="plan-love-note">
                  For those who want to truly cherish their investment
                </div>
                <button className="plan-cta">This sounds perfect</button>
              </div>
            </div>

            {/* Total Love Plan */}
            <div className="plan-card featured">
              <div className="plan-header">
                <div className="plan-icon">💎</div>
                <h3 className="plan-title">Total Love</h3>
                <p className="plan-summary">10 Years of Complete Home Care</p>
                <div className="plan-price">$149.75</div>
                <div className="plan-period">4 comfortable payments</div>
              </div>
              <div className="plan-content">
                <ul className="plan-features">
                  <li>Everything your kitchen needs, covered</li>
                  <li>Both countertops AND cabinets protected</li>
                  <li>24/7 support whenever you need us</li>
                  <li>Professional care kit included</li>
                  <li>Transferable if you move homes</li>
                </ul>
                <div className="plan-love-note">
                  The complete package for those who want everything protected with love
                </div>
                <button className="plan-cta featured">Yes, let's do this together</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className="modal-overlay" id="careModal">
        <div className="modal-content">
          <button className="modal-close" id="closeModal">×</button>
          <h3 className="modal-title">Let's Start This Journey Together</h3>
          <p className="modal-subtitle">
            Tell us a bit about yourself and we'll show you exactly how we can help protect your beautiful home
          </p>
          
          <form id="careForm">
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Your Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                className="form-input" 
                placeholder="What should we call you?"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-input" 
                placeholder="So we can reach out with care"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="form-input" 
                placeholder="(555) 123-4567"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="interest">What feels right for you?</label>
              <select id="interest" name="interest" className="form-input" required>
                <option value="">Choose what speaks to you</option>
                <option value="essential">Essential Care - 5 Year Protection</option>
                <option value="complete">Complete Care - 10 Year Comprehensive</option>
                <option value="total">Total Love - Everything Protected</option>
                <option value="chat">I'd love to chat about options</option>
              </select>
            </div>
            
            <button type="submit" className="form-submit">
              Let's protect your investment together 💕
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-message">
            Made with <span className="footer-heart">💕</span> for homeowners who care
          </p>
          <div className="footer-links">
            <a href="#plans">Our Care Plans</a>
            <a href="#contact">Get in Touch</a>
            <a href="#about">Our Story</a>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Surface Guard 365. Protecting homes, nurturing dreams.</p>
          </div>
        </div>
      </footer>
    </>
  );
}