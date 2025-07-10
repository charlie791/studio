'use client';

export default function LandingPage() {
  return (
    <html lang="en">
      <head>
        <title>Surface Guard 365 - Protect Your Countertops & Cabinets</title>
        <meta name="description" content="Professional warranty protection for your countertops and cabinets. Choose from 5-year to 10-year coverage plans with comprehensive protection." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
        /* CSS Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #F5F5F5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Navigation */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 36, 85, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 1rem 0;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 800;
            color: #002455;
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .nav-link {
            color: #002455;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }

        .nav-link:hover {
            color: #FDA001;
        }

        .nav-cta {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #002455 0%, #003875 100%);
            padding: 8rem 0 4rem;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
            transform: translateX(-100%);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .hero-content {
            position: relative;
            z-index: 1;
        }

        .hero-logo {
            margin-bottom: 2rem;
        }

        .hero-logo-text {
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.5px;
        }

        .hero-title {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.2;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            color: rgba(255, 255, 255, 0.9);
        }

        .hero-subtext {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 1rem;
        }

        /* CTA Button */
        .cta-button {
            background: linear-gradient(135deg, #002455 0%, #003875 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 36, 85, 0.3);
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }

        .cta-button:hover::before {
            transform: translateX(100%);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 50px rgba(0, 36, 85, 0.4);
        }

        .hero-cta {
            background: linear-gradient(135deg, #FDA001 0%, #cc8001 100%);
            font-size: 1.1rem;
            padding: 1.25rem 2.5rem;
        }

        /* Section Styling */
        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #002455;
            text-align: center;
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.125rem;
            color: #6b7280;
            text-align: center;
            margin-bottom: 3rem;
        }

        /* Protection Section */
        .protection-section {
            padding: 4rem 0;
            background: white;
        }

        .protection-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .protection-card {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(0, 36, 85, 0.1);
        }

        .protection-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0, 36, 85, 0.15);
        }

        .protection-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .protection-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #002455;
            margin-bottom: 1rem;
        }

        .protection-card p {
            color: #6b7280;
        }

        /* Plans Section */
        .plans-section {
            padding: 4rem 0;
            background: #F5F5F5;
        }

        .plans-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .plan-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
        }

        .plan-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0, 36, 85, 0.15);
        }

        .plan-card.featured {
            border: 2px solid #FDA001;
            transform: scale(1.05);
        }

        .plan-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #FDA001;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.8rem;
            font-weight: 700;
            z-index: 10;
        }

        .plan-header {
            background: linear-gradient(135deg, #002455 0%, #003875 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .plan-header::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
            transform: translateX(-100%);
            animation: shimmer 3s infinite;
        }

        .plan-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .plan-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .plan-summary {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1.5rem;
        }

        .plan-price {
            font-size: 2rem;
            font-weight: 800;
        }

        .price-period {
            font-size: 1rem;
            font-weight: 600;
        }

        .plan-content {
            padding: 2rem;
        }

        .plan-features {
            list-style: none;
            margin-bottom: 2rem;
        }

        .plan-features li {
            padding: 0.5rem 0;
            font-size: 0.95rem;
            color: #374151;
        }

        .plan-offer {
            background: linear-gradient(135deg, #FDA001 0%, #cc8001 100%);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 700;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }

        .plan-cta {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #002455 0%, #003875 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .plan-cta.featured {
            background: linear-gradient(135deg, #FDA001 0%, #cc8001 100%);
        }

        .plan-cta::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }

        .plan-cta:hover::before {
            transform: translateX(100%);
        }

        .plan-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 36, 85, 0.3);
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
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
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .modal-overlay.active .modal-content {
            transform: translateY(0);
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6b7280;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .modal-close:hover {
            background: #f3f4f6;
            color: #374151;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #002455;
            margin-bottom: 0.5rem;
            text-align: center;
        }

        .modal-subtitle {
            color: #6b7280;
            text-align: center;
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: #FDA001;
            box-shadow: 0 0 0 3px rgba(253, 160, 1, 0.1);
        }

        .form-submit {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #FDA001 0%, #cc8001 100%);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .form-submit::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }

        .form-submit:hover::before {
            transform: translateX(100%);
        }

        .form-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(253, 160, 1, 0.3);
        }

        /* Footer */
        .footer {
            background: #002455;
            color: white;
            padding: 3rem 0 1rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 2rem;
            align-items: center;
            margin-bottom: 2rem;
        }

        .footer-logo-text {
            font-size: 1.5rem;
            font-weight: 800;
            color: white;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
            justify-content: center;
        }

        .footer-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: #FDA001;
        }

        .footer-cta {
            text-align: right;
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            padding-top: 1rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                gap: 1rem;
            }

            .nav-link {
                display: none;
            }

            .hero-title {
                font-size: 2rem;
            }

            .hero-subtitle {
                font-size: 1rem;
            }

            .hero-logo-text {
                font-size: 1.8rem;
            }

            .logo-text {
                font-size: 1.2rem;
            }

            .section-title {
                font-size: 2rem;
            }

            .plans-grid {
                grid-template-columns: 1fr;
            }

            .plan-card.featured {
                transform: none;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .footer-cta {
                text-align: center;
            }
        }
        `
        }} />
      </head>
      <body>
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <div className="logo-text">Surface Guard 365</div>
            </div>
            <div className="nav-links">
              <a href="#plans" className="nav-link">Plans</a>
              <a href="#faq" className="nav-link">FAQ</a>
              <button className="cta-button nav-cta">Protect My Investment</button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-logo">
                <div className="hero-logo-text">Surface Guard 365</div>
              </div>
              <h1 className="hero-title">
                Protect Your<br />
                Countertops & Cabinets
              </h1>
              <p className="hero-subtitle">
                Warranty your new surfaces in seconds with comprehensive protection plans
              </p>
              <button className="cta-button hero-cta">
                PROTECT MY INVESTMENT
              </button>
              <p className="hero-subtext">
                Join thousands of homeowners who trust Surface Guard 365
              </p>
            </div>
          </div>
        </section>

        {/* What We Protect Section */}
        <section className="protection-section">
          <div className="container">
            <h2 className="section-title">What We Protect</h2>
            <div className="protection-grid">
              <div className="protection-card">
                <div className="protection-icon">🪨</div>
                <h3>Countertops</h3>
                <p>Granite, quartz, marble, laminate, and more</p>
              </div>
              <div className="protection-card">
                <div className="protection-icon">🚪</div>
                <h3>Cabinets</h3>
                <p>Wood, laminate, and painted surfaces</p>
              </div>
              <div className="protection-card">
                <div className="protection-icon">🛡️</div>
                <h3>Comprehensive Coverage</h3>
                <p>Stains, chips, cracks, heat damage, and wear</p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Plans Section */}
        <section className="plans-section" id="plans">
          <div className="container">
            <h2 className="section-title">Choose Your Protection Plan</h2>
            <p className="section-subtitle">Select the coverage level that&apos;s right for your surfaces</p>
            
            <div className="plans-grid">
              {/* Core Plan */}
              <div className="plan-card">
                <div className="plan-header">
                  <div className="plan-icon">🛡️</div>
                  <h3 className="plan-title">SurfaceGuard365 – Core</h3>
                  <p className="plan-summary">5-Year Countertop Warranty</p>
                  <div className="plan-price">
                    <span className="price-amount">$74.75</span>
                    <span className="price-period">× 4 Flex Payments</span>
                  </div>
                </div>
                <div className="plan-content">
                  <ul className="plan-features">
                    <li>✅ Solid 5-Year Countertop protection</li>
                    <li>✅ Covers common stains (coffee, wine, oil)</li>
                    <li>✅ Protection against minor chips and cracks</li>
                    <li>✅ Access to standard customer support</li>
                  </ul>
                  <button className="plan-cta">Select Core Plan</button>
                </div>
              </div>

              {/* Extended Plan */}
              <div className="plan-card">
                <div className="plan-header">
                  <div className="plan-icon">⚡</div>
                  <h3 className="plan-title">SurfaceGuard365 – Extended</h3>
                  <p className="plan-summary">10-Year Countertop Warranty + VIP Support</p>
                  <div className="plan-price">
                    <span className="price-amount">$124.75</span>
                    <span className="price-period">× 4 Flex Payments</span>
                  </div>
                </div>
                <div className="plan-content">
                  <ul className="plan-features">
                    <li>✅ Comprehensive 10-Year Countertop coverage</li>
                    <li>✅ Protection against heat marks and deep scratches</li>
                    <li>✅ Includes accidental damage from common kitchen use</li>
                    <li>✅ VIP priority customer support</li>
                    <li>✅ Annual professional surface inspection eligibility</li>
                  </ul>
                  <button className="plan-cta">Select Extended Plan</button>
                </div>
              </div>

              {/* Total Combo Plan */}
              <div className="plan-card featured">
                <div className="plan-badge">Most Popular</div>
                <div className="plan-header">
                  <div className="plan-icon">💎</div>
                  <h3 className="plan-title">SurfaceGuard365 – Total Combo</h3>
                  <p className="plan-summary">Premium 10-Year Cabinet + Countertop Protection</p>
                  <div className="plan-price">
                    <span className="price-amount">$149.75</span>
                    <span className="price-period">× 4 Flex Payments</span>
                  </div>
                </div>
                <div className="plan-content">
                  <ul className="plan-features">
                    <li>✅ Complete Cabinet warranty protection</li>
                    <li>✅ Full kitchen surface coverage — countertops, cabinets</li>
                    <li>✅ Accidental damage protection (chips, cracks, stains)</li>
                    <li>✅ Professional care kit</li>
                    <li>✅ VIP 24/7 customer support line</li>
                    <li>✅ Priority service response</li>
                    <li>✅ Transferable for life of the plan</li>
                    <li>✅ Upgrade incentives first day of coverage</li>
                  </ul>
                  <div className="plan-offer">
                    🔥 Best Value – Save 30% vs purchasing separately
                  </div>
                  <button className="plan-cta featured">Select Total Combo Plan</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <div className="modal-overlay" id="leadModal">
          <div className="modal-content">
            <button className="modal-close" id="closeModal">×</button>
            <h3 className="modal-title">Protect Your Investment</h3>
            <p className="modal-subtitle">Complete the form below and we'll show you how to protect your countertop and cabinet investment</p>
            
            <form id="leadForm">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
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
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="Enter your email address"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
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
                <label className="form-label" htmlFor="interest">I'm interested in *</label>
                <select id="interest" name="interest" className="form-input" required>
                  <option value="">Select your interest</option>
                  <option value="core">Core Plan - 5 Year Countertop Warranty</option>
                  <option value="extended">Extended Plan - 10 Year + VIP Support</option>
                  <option value="total">Total Combo - 10 Year Cabinet + Countertop</option>
                  <option value="quote">Custom Quote</option>
                </select>
              </div>
              
              <button type="submit" className="form-submit">
                Protect My Investment Now
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <div className="footer-logo-text">Surface Guard 365</div>
              </div>
              <div className="footer-links">
                <a href="#plans">Plans</a>
                <a href="#faq">FAQ</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-cta">
                <button className="cta-button">Protect My Investment Today</button>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Surface Guard 365. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <script dangerouslySetInnerHTML={{
          __html: `
            // Modal functionality
            const modal = document.getElementById('leadModal');
            const closeBtn = document.getElementById('closeModal');
            const form = document.getElementById('leadForm');
            
            // Open modal function
            function openModal() {
              modal.classList.add('active');
              document.body.style.overflow = 'hidden';
            }
            
            // Close modal function
            function closeModal() {
              modal.classList.remove('active');
              document.body.style.overflow = 'auto';
            }
            
            // Add click handlers to all CTA buttons
            document.addEventListener('DOMContentLoaded', function() {
              // Hero CTA
              const heroCTA = document.querySelector('.hero-cta');
              if (heroCTA) {
                heroCTA.addEventListener('click', openModal);
              }
              
              // Nav CTA
              const navCTA = document.querySelector('.nav-cta');
              if (navCTA) {
                navCTA.addEventListener('click', openModal);
              }
              
              // Plan CTAs
              const planCTAs = document.querySelectorAll('.plan-cta');
              planCTAs.forEach(btn => {
                btn.addEventListener('click', function() {
                  const planTitle = this.closest('.plan-card').querySelector('.plan-title').textContent;
                  openModal();
                  
                  // Pre-select the plan in dropdown
                  const select = document.getElementById('interest');
                  if (planTitle.includes('Core')) {
                    select.value = 'core';
                  } else if (planTitle.includes('Extended')) {
                    select.value = 'extended';
                  } else if (planTitle.includes('Total')) {
                    select.value = 'total';
                  }
                });
              });
              
              // Footer CTA
              const footerCTA = document.querySelector('.footer-cta .cta-button');
              if (footerCTA) {
                footerCTA.addEventListener('click', openModal);
              }
            });
            
            // Close modal events
            closeBtn.addEventListener('click', closeModal);
            
            // Close on overlay click
            modal.addEventListener('click', function(e) {
              if (e.target === modal) {
                closeModal();
              }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
              }
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              
              const formData = new FormData(this);
              const name = formData.get('fullName');
              const email = formData.get('email');
              const phone = formData.get('phone');
              const interest = formData.get('interest');
              
              // Here you would normally send to your backend
              console.log('Form submitted:', { name, email, phone, interest });
              
              // Show success message
              alert('Thank you! We\\'ll contact you shortly with investment protection options for your surfaces.');
              
              // Close modal and reset form
              closeModal();
              this.reset();
            });
            
            // Phone number formatting
            const phoneInput = document.getElementById('phone');
            phoneInput.addEventListener('input', function(e) {
              let value = e.target.value.replace(/\\D/g, '');
              if (value.length >= 6) {
                value = value.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
              } else if (value.length >= 3) {
                value = value.replace(/(\\d{3})(\\d{0,3})/, '($1) $2');
              }
              e.target.value = value;
            });
          `
        }} />
      </body>
    </html>
  );
}