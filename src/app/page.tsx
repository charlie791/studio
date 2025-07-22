'use client';

import { useEffect } from 'react';

export default function ContractorSourceLandingPage() {
  useEffect(() => {
    // Modal functionality
    const modal = document.getElementById('consultationModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('consultationForm');
    
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
    
    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', openModal);
    }
    
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
        
        // Show success message
        alert('Thank you! We\'ll be in touch soon to help make your home truly yours.');
        
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
        /* CSS Custom Properties */
        :root {
          --cs-dark-blue: #002455;
          --cs-gold: #FDA001;
          --cs-light-grey: #F5F5F5;
          --cs-white: #FFFFFF;
          --cs-text-dark: #2D3436;
          --cs-text-grey: #636E72;
          --cs-shadow: rgba(0, 0, 0, 0.1);
          --cs-shadow-hover: rgba(0, 0, 0, 0.15);
        }

        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--cs-text-dark);
          background: var(--cs-light-grey);
          overflow-x: hidden;
        }

        /* Main Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          background: var(--cs-white);
          min-height: 100vh;
          box-shadow: 0 0 40px var(--cs-shadow);
        }

        /* Content Layout */
        .content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 80vh;
        }

        /* Text Content */
        .text-content {
          padding-right: 2rem;
        }

        .main-headline {
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1.1;
          color: var(--cs-text-dark);
          margin-bottom: 3rem;
          font-family: Georgia, serif;
          text-align: center;
          width: 100%;
        }

        .main-headline strong {
          font-weight: 400;
        }

        .subtitle {
          font-size: 1.125rem;
          color: var(--cs-text-grey);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .description-text {
          font-size: 1rem;
          color: var(--cs-text-grey);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .company-highlight {
          font-weight: 600;
          color: var(--cs-text-dark);
        }

        .final-statement {
          font-size: 1.125rem;
          color: var(--cs-text-dark);
          margin: 2rem 0;
          font-weight: 500;
        }

        /* CTA Button */
        .cta-button {
          background: var(--cs-dark-blue);
          color: var(--cs-white);
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
        }

        .cta-button:hover {
          background: #001a3d;
          transform: translateX(3px);
        }

        .cta-button::after {
          content: '→';
          font-size: 1.2rem;
        }

        /* Logo */
        .logo-container {
          margin-top: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--cs-gold);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--cs-white);
          font-size: 1.125rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--cs-text-dark);
          letter-spacing: 0.5px;
        }

        /* Image Content */
        .image-content {
          position: relative;
        }

        .abstract-images {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .abstract-block {
          width: 100%;
          height: 150px;
          background-color: #E8E5E0;
          border-radius: 8px;
        }
        
        .abstract-menu-bar {
          width: 100%;
          height: 60px;
          background-color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .hamburger-icon {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .hamburger-icon span {
          width: 28px;
          height: 3px;
          background-color: #2D3436;
          border-radius: 2px;
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
          background: var(--cs-white);
          border-radius: 8px;
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
          background: var(--cs-light-grey);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--cs-text-grey);
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #e0e0e0;
          color: var(--cs-text-dark);
        }

        .modal-title {
          font-family: Georgia, serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--cs-text-dark);
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .modal-subtitle {
          color: var(--cs-text-grey);
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: var(--cs-text-dark);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: var(--cs-white);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--cs-dark-blue);
          box-shadow: 0 0 0 2px rgba(0, 36, 85, 0.1);
        }

        .form-submit {
          width: 100%;
          padding: 1rem;
          background: var(--cs-dark-blue);
          color: var(--cs-white);
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .form-submit:hover {
          background: #001a3d;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 2rem 1rem;
          }

          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .text-content {
            padding-right: 0;
            order: 2;
          }

          .image-content {
            order: 1;
          }

          .main-headline {
            font-size: 2.5rem;
          }

          .modal-content {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .main-headline {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
      
      <div className="container">
        {/* Headline at the top */}
        <h1 className="main-headline">
          Your Builder Chose<br />
          the Best. Now It's Your<br />
          <strong>Turn.</strong>
        </h1>
        
        <div className="content-wrapper">
          {/* Text Content */}
          <div className="text-content">
            
            <p className="subtitle">
              The same team trusted to install your home's core finishes 
              is here to help you complete the look—and make it truly yours.
            </p>
            
            <p className="description-text">
              Your builder partnered with Spraggins to deliver expert craftsmanship in your 
              floors, cabinets, and countertops. Now, Spraggins' homeowner facing 
              team—<span className="company-highlight">ContractorSource</span>—is here to 
              help you personalize the rest.
            </p>
            
            <p className="description-text">
              From custom closets to thoughtful finish upgrades, we make it easy 
              to elevate what's already great.
            </p>
            
            <p className="description-text">
              No stress. Just tailored service, built on trust.
            </p>
            
            <p className="final-statement">
              Because this isn't just a house anymore. It's your home.
            </p>
            
            <button className="cta-button">
              Let's Make It Yours
            </button>
            
            <div className="logo-container">
              <div className="logo">
                <div className="logo-icon">
                  <span>🏠</span>
                </div>
                <span className="logo-text">CONTRACTOR SOURCE</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="image-content">
            <div className="abstract-images">
              <div className="abstract-block"></div>
              <div className="abstract-menu-bar">
                <div className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="abstract-block"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal-overlay" id="consultationModal">
        <div className="modal-content">
          <button className="modal-close" id="closeModal">×</button>
          <h3 className="modal-title">Let's Make It Yours</h3>
          <p className="modal-subtitle">
            Tell us about your vision and we'll help you create the perfect space
          </p>
          
          <form id="consultationForm">
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                className="form-input" 
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
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
              <label className="form-label" htmlFor="interest">What are you interested in?</label>
              <select id="interest" name="interest" className="form-input" required>
                <option value="">Select your interest</option>
                <option value="custom-closets">Custom Closets</option>
                <option value="finish-upgrades">Finish Upgrades</option>
                <option value="built-ins">Built-in Storage</option>
                <option value="kitchen-upgrades">Kitchen Upgrades</option>
                <option value="general-consultation">General Consultation</option>
              </select>
            </div>
            
            <button type="submit" className="form-submit">
              Start My Consultation
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
