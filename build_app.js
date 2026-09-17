const fs = require('fs');

const htmlContent = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SAHAKARYA - Cooperative Gig Services Platform</title>
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
<!-- Canvas Confetti -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

<style>
:root {
  --primary: #047857; /* Sahakarya Emerald Green */
  --primary-light: #10b981;
  --primary-dark: #064e3b;
  --primary-subtle: #ecfdf5;
  --primary-border: #a7f3d0;
  
  --accent: #f97316; /* Warm Saffron / Amber */
  --accent-light: #fb923c;
  --accent-subtle: #fff7ed;
  --accent-border: #fed7aa;
  
  --secondary: #2563eb; /* Professional Blue */
  --secondary-subtle: #eff6ff;
  --secondary-border: #bfdbfe;

  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-alt: #f1f5f9;
  
  --ink: #0f172a;
  --ink-light: #334155;
  --mut: #64748b;
  --line: #e2e8f0;
  
  --red: #ef4444;
  --red-subtle: #fef2f2;
  --green: #10b981;
  
  --sh-sm: 0 1px 3px 0 rgb(0 0 0 / 0.07);
  --sh-md: 0 4px 10px -1px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.06);
  --sh-lg: 0 12px 24px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.06);
  --radius: 16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background: var(--bg);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, .brand-title {
  font-family: 'Outfit', sans-serif;
  letter-spacing: -0.02em;
}
button, input, select, textarea { font-family: inherit; }
button { cursor: pointer; }

/* ---- Custom Scrollbar ---- */
::-webkit-scrollbar { width: 7px; height: 7px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* ---- Reusable UI Components ---- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 12px;
  padding: 10px 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(4, 120, 87, 0.25);
  text-decoration: none;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(4, 120, 87, 0.35);
  filter: brightness(1.05);
}
.btn:active { transform: translateY(0); }
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
  filter: grayscale(0.6);
}
.btn.alt {
  background: var(--surface);
  color: var(--primary);
  border: 1px solid var(--primary-border);
  box-shadow: var(--sh-sm);
}
.btn.alt:hover {
  background: var(--primary-subtle);
  border-color: var(--primary);
}
.btn.accent {
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: white;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}
.btn.accent:hover {
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}
.btn.blue {
  background: linear-gradient(135deg, #1d4ed8, var(--secondary));
  color: white;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}
.btn.blue:hover {
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
}
.btn.red {
  background: linear-gradient(135deg, #dc2626, var(--red));
  color: white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}
.btn.sm { padding: 7px 13px; font-size: 12px; border-radius: 9px; }

/* Global Back Button */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid var(--line);
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 13px;
  color: var(--ink);
  transition: all 0.2s ease;
  box-shadow: var(--sh-sm);
  margin-bottom: 18px;
  cursor: pointer;
}
.back-btn:hover {
  background: var(--surface-alt);
  border-color: var(--primary-border);
  color: var(--primary);
  transform: translateX(-3px);
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--sh-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover { box-shadow: var(--sh-md); }
.card.lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}

.grid { display: grid; gap: 18px; }
.g2 { grid-template-columns: repeat(2, 1fr); }
.g3 { grid-template-columns: repeat(3, 1fr); }
.g4 { grid-template-columns: repeat(4, 1fr); }
.g5 { grid-template-columns: repeat(5, 1fr); }

.row { display: flex; align-items: center; gap: 10px; }
.between { display: flex; justify-content: space-between; align-items: center; gap: 15px; }
.center-box { min-height: 100vh; display: grid; place-items: center; padding: 25px; }
.mut { color: var(--mut); }

.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 99px;
  background: var(--primary-subtle);
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  border: 1px solid var(--primary-border);
}
.pill.accent { background: var(--accent-subtle); color: #c2410c; border-color: var(--accent-border); }
.pill.blue { background: var(--secondary-subtle); color: var(--secondary); border-color: var(--secondary-border); }
.pill.red { background: var(--red-subtle); color: var(--red); border-color: #fecaca; }
.pill.gray { background: var(--surface-alt); color: var(--mut); border-color: var(--line); }

/* ---- Branding & Logo ---- */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.5px;
  text-decoration: none;
}
.brand-logo-img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.25);
  border: 2px solid white;
  transition: transform 0.3s ease;
  background: white;
}
.brand:hover .brand-logo-img {
  transform: rotate(6deg) scale(1.06);
}
.logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
}

/* ---- Role Cards ---- */
.role-card-customer {
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  border-bottom: 4px solid var(--primary);
  background: linear-gradient(180deg, #ffffff 85%, #f0fdf4 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.role-card-customer:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 30px rgba(16, 185, 129, 0.22);
  border-color: var(--primary-light);
}

.role-card-worker {
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  border-bottom: 4px solid var(--accent);
  background: linear-gradient(180deg, #ffffff 85%, #fff7ed 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.role-card-worker:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 30px rgba(249, 115, 22, 0.22);
  border-color: var(--accent-light);
}

.role-card-admin {
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  border-bottom: 4px solid var(--secondary);
  background: linear-gradient(180deg, #ffffff 85%, #eff6ff 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.role-card-admin:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.22);
  border-color: #3b82f6;
}

/* ---- Customer Slide-out Navigation Drawer ---- */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.drawer-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}
.drawer-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  background: linear-gradient(185deg, #064e3b 0%, #022c22 100%);
  color: white;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  box-shadow: 8px 0 30px rgba(0,0,0,0.3);
}
.drawer-panel.open {
  transform: translateX(0);
}
.drawer-close-btn {
  background: rgba(255,255,255,0.12);
  border: 0;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.2s;
}
.drawer-close-btn:hover {
  background: rgba(255,255,255,0.25);
  transform: rotate(90deg);
}
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 24px;
}
.drawer-nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #d1fae5;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  background: transparent;
  border: 0;
  width: 100%;
  text-align: left;
}
.drawer-nav-item:hover {
  background: rgba(255,255,255,0.12);
  color: white;
  transform: translateX(4px);
}
.drawer-nav-item.active {
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.08));
  color: white;
  border-left: 4px solid var(--accent);
}

/* ---- Layout Shell ---- */
.shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}
.sidebar {
  background: linear-gradient(185deg, #064e3b 0%, #022c22 100%);
  color: #d1fae5;
  padding: 22px 16px;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #065f46;
  box-shadow: 4px 0 20px rgba(0,0,0,0.08);
  z-index: 20;
}
.sidebar .brand { color: white; margin-bottom: 22px; padding: 0 8px; }
.nav { display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }
.nav button {
  width: 100%;
  border: 0;
  background: transparent;
  color: #a7f3d0;
  text-align: left;
  padding: 11px 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
}
.nav button:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  transform: translateX(4px);
}
.nav button.active {
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.32), rgba(16, 185, 129, 0.08));
  color: white;
  border-left: 4px solid var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.main {
  padding: 24px 32px 60px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}
.search-bar {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 16px;
  width: 100%;
  max-width: 480px;
  gap: 10px;
  box-shadow: var(--sh-sm);
  transition: border 0.2s;
}
.search-bar:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
.search-bar input {
  border: 0;
  outline: 0;
  width: 100%;
  font-size: 14px;
  background: transparent;
}

/* Hamburger Icon Button */
.menu-btn {
  background: white;
  border: 1px solid var(--line);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 20px;
  color: var(--ink);
  box-shadow: var(--sh-sm);
  transition: all 0.2s;
  cursor: pointer;
}
.menu-btn:hover {
  background: var(--surface-alt);
  border-color: var(--primary-border);
  color: var(--primary);
}

/* Floating Instant 15-Min Quick Action Button */
.instant-floating-btn {
  position: fixed;
  bottom: 30px;
  right: 28px;
  background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
  color: white;
  border: 0;
  border-radius: 99px;
  padding: 14px 22px;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(234, 88, 12, 0.4);
  z-index: 90;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: floatSlow 6s ease-in-out infinite;
}
.instant-floating-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 14px 30px rgba(234, 88, 12, 0.5);
}

/* ---- Customer Reviews Carousel ---- */
.reviews-carousel-wrap {
  position: relative;
  background: white;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--sh-md);
  margin-bottom: 36px;
  overflow: hidden;
}
.review-card-active {
  animation: fadeIn 0.4s ease both;
}

/* ---- Sub-Service Card with Trade Photo ---- */
.sub-service-card {
  border-radius: 18px;
  background: white;
  border: 1px solid var(--line);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}
.sub-service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}
.sub-service-card .card-thumb {
  height: 140px;
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
}
.sub-service-card .card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.sub-service-card:hover .card-thumb img { transform: scale(1.08); }
.sub-service-card .price-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: var(--primary-dark);
  font-weight: 800;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 99px;
  box-shadow: var(--sh-sm);
}

/* ---- Category Card: Left Info & Right Image ---- */
.cat-card-h {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 18px;
  background: white;
  border: 1px solid var(--line);
  padding: 16px 18px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}
.cat-card-h:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}
.cat-card-h .info-left {
  flex: 1;
  padding-right: 14px;
}
.cat-card-h .cat-num-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 800;
  color: var(--primary-dark);
  background: var(--primary-subtle);
  border: 1px solid var(--primary-border);
  padding: 3px 9px;
  border-radius: 8px;
  margin-bottom: 6px;
}
.cat-card-h .img-right {
  width: 100px;
  height: 90px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--line);
}
.cat-card-h .img-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.cat-card-h:hover .img-right img { transform: scale(1.1); }

/* ---- Worker Profile Avatar with Trade Background ---- */
.worker-card {
  border-radius: 18px;
  background: white;
  border: 1px solid var(--line);
  padding: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.worker-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}
.worker-avatar-wrap {
  width: 74px;
  height: 74px;
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  position: relative;
}
.worker-avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ---- Tabs Bar ---- */
.tabs-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 10px;
  overflow-x: auto;
}
.tab-btn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 0;
  background: transparent;
  font-weight: 700;
  font-size: 13px;
  color: var(--mut);
  transition: all 0.2s ease;
}
.tab-btn:hover { color: var(--ink); background: var(--surface-alt); }
.tab-btn.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 2px 8px rgba(4, 120, 87, 0.3);
}

/* ---- Stepper for Signup ---- */
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--mut);
}
.step-item.active { color: var(--primary); }
.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
}
.step-item.active .step-circle {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* ---- Modal Backdrop & Dialog ---- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  animation: fadeIn 0.3s ease both;
}
.modal-dialog {
  background: white;
  border-radius: 24px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: zoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
  border: 1px solid var(--line);
}
.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: white;
  z-index: 5;
}
.modal-body { padding: 24px; }
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  background: var(--surface-alt);
}

/* ---- Availability Toggle Switch ---- */
.online-toggle-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
  border-radius: 16px;
  background: white;
  border: 1px solid var(--line);
  box-shadow: var(--sh-sm);
}
.toggle-switch {
  position: relative;
  width: 62px;
  height: 34px;
  display: inline-block;
  cursor: pointer;
}
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider {
  position: absolute;
  inset: 0;
  border-radius: 99px;
  background: #cbd5e1;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle-slider::before {
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  left: 4px;
  top: 4px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle-switch input:checked + .toggle-slider {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}
.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(28px);
}

/* ---- Simulated Live Map ---- */
.map-container {
  height: 380px;
  border-radius: 20px;
  background: #e2e8f0;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--line);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.06);
}
.map-bg {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(#94a3b8 1px, transparent 1px),
    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
  background-size: 24px 24px, 48px 48px, 48px 48px;
  background-color: #f1f5f9;
  position: relative;
}
.map-road {
  position: absolute;
  border: 3px dashed #10b981;
  border-radius: 40px;
  pointer-events: none;
  opacity: 0.7;
}
.map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 5;
}
.map-pin:hover { transform: translate(-50%, -50%) scale(1.15); z-index: 10; }
.map-pin .pin-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid white;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.35), var(--sh-md);
  animation: mapPulse 2s infinite;
}
.map-pin.accent .pin-dot {
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.35), var(--sh-md);
}
.map-pin .pin-label {
  background: white;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  margin-top: 5px;
  box-shadow: var(--sh-md);
  border: 1px solid var(--line);
  white-space: nowrap;
}

/* ---- Tables ---- */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}
.custom-table th {
  background: var(--surface-alt);
  padding: 12px 16px;
  font-weight: 700;
  color: var(--mut);
  border-bottom: 1px solid var(--line);
}
.custom-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
}
.custom-table tr:hover td { background: #faf5ff; }

/* ---- Form Inputs ---- */
.form-group { margin-bottom: 16px; }
.form-label { font-size: 13px; font-weight: 700; margin-bottom: 6px; display: block; }
.form-input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 11px;
  border: 1px solid var(--line);
  background: white;
  outline: 0;
  font-size: 14px;
  transition: border 0.2s;
}
.form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); }
.form-input.locked {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
}

/* ---- Keyframe Animations ---- */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes floatSlow { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.02); } }
@keyframes mapPulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 14px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
@keyframes emergencyBeacon {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.anim-fade { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both; }
.anim-slide { animation: slideUp 0.45s cubic-bezier(0.4, 0, 0.2, 1) both; }
.anim-zoom { animation: zoomIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both; }

.stagger > *:nth-child(1) { animation: slideUp 0.35s 0.03s cubic-bezier(0.4, 0, 0.2, 1) both; }
.stagger > *:nth-child(2) { animation: slideUp 0.35s 0.06s cubic-bezier(0.4, 0, 0.2, 1) both; }
.stagger > *:nth-child(3) { animation: slideUp 0.35s 0.09s cubic-bezier(0.4, 0, 0.2, 1) both; }
.stagger > *:nth-child(4) { animation: slideUp 0.35s 0.12s cubic-bezier(0.4, 0, 0.2, 1) both; }

/* ---- Toast Notification ---- */
.toast-msg {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #0f172a;
  color: white;
  padding: 14px 22px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--sh-lg);
  z-index: 10000;
  border-left: 4px solid var(--primary);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* ---- Landing Page Styles ---- */
.landing-page {
  background: 
    radial-gradient(circle at 12% 15%, rgba(16, 185, 129, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 88% 30%, rgba(249, 115, 22, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 50% 85%, rgba(37, 99, 235, 0.05) 0%, transparent 45%),
    #f8fafc;
  min-height: 100vh;
  color: var(--ink);
  overflow-x: hidden;
}
.landing-nav {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.landing-nav .nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}
.landing-nav .nav-link {
  color: var(--ink-light);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s;
  cursor: pointer;
}
.landing-nav .nav-link:hover { color: var(--primary); }

.landing-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  text-align: center;
}
.hero-tagline-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-subtle);
  color: var(--primary-dark);
  border: 1px solid var(--primary-border);
  padding: 6px 18px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 20px;
  box-shadow: var(--sh-sm);
}

.collage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.collage-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  box-shadow: var(--sh-md);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}
.collage-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}
.collage-img-box {
  height: 160px;
  overflow: hidden;
  position: relative;
  background: #e2e8f0;
}
.collage-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.collage-card:hover .collage-img-box img { transform: scale(1.08); }
.collage-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.75);
  color: white;
  backdrop-filter: blur(6px);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 8px;
}
.collage-card-body {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.landing-section {
  max-width: 1240px;
  margin: 0 auto 64px;
  padding: 0 24px;
}
.landing-section-header {
  text-align: center;
  margin-bottom: 36px;
}
.landing-section-header h2 {
  font-size: clamp(26px, 3.5vw, 34px);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.landing-section-header p {
  color: var(--mut);
  font-size: 15px;
}

.services-compact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.service-compact-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--sh-sm);
}
.service-compact-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-md);
  border-color: var(--primary-border);
  background: var(--primary-subtle);
}
.service-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--surface-alt);
  display: grid;
  place-items: center;
  font-size: 24px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.service-compact-card:hover .service-icon-circle {
  transform: scale(1.1) rotate(5deg);
  background: white;
}

.coop-feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.coop-feature-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--sh-sm);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.coop-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--sh-lg);
  border-color: var(--primary-border);
}

.emergency-banner-card {
  background: linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fef2f2 100%);
  border: 2px solid #fed7aa;
  border-radius: 24px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: var(--sh-md);
}
.emergency-beacon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
  animation: emergencyBeacon 2s infinite;
  display: inline-block;
  margin-right: 8px;
}

.landing-footer {
  background: linear-gradient(185deg, #064e3b 0%, #022c22 100%);
  color: #d1fae5;
  padding: 52px 24px 32px;
  margin-top: 60px;
  border-top: 1px solid #065f46;
}

/* Quick Service Drawer for Instant 15-Min */
.instant-drawer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 440px;
  max-width: 100vw;
  max-height: 85vh;
  background: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.25);
  z-index: 1000;
  padding: 24px;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.instant-drawer.open {
  transform: translateY(0);
}

/* Language Selection Modal Grid */
.lang-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}
.lang-btn {
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: white;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  cursor: pointer;
}
.lang-btn:hover {
  border-color: var(--primary);
  background: var(--primary-subtle);
  transform: translateY(-2px);
}
.lang-btn.active {
  border-color: var(--primary);
  background: var(--primary-subtle);
  font-weight: 700;
}

/* ---- Responsive Adjustments ---- */
@media (max-width: 1100px) {
  .collage-grid { grid-template-columns: repeat(2, 1fr); }
  .services-compact-grid { grid-template-columns: repeat(2, 1fr); }
  .coop-feature-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 960px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .main { padding: 18px 18px 80px; }
  .g4, .g5 { grid-template-columns: repeat(2, 1fr); }
  .g3 { grid-template-columns: 1fr; }
  .emergency-banner-card { flex-direction: column; text-align: center; }
}
@media (max-width: 640px) {
  .g2, .g4, .g5 { grid-template-columns: 1fr; }
  .collage-grid { grid-template-columns: 1fr; }
  .services-compact-grid { grid-template-columns: 1fr; }
  .coop-feature-grid { grid-template-columns: 1fr; }
  .landing-nav .nav-links { display: none; }
  .topbar { flex-direction: column; align-items: stretch; }
  .modal-dialog { border-radius: 0; max-height: 100vh; height: 100vh; }
}
</style>
</head>
<body>

<div id="root"></div>
<div id="modal-root"></div>

<!-- Slide-out Customer Navigation Drawer -->
<div id="drawer-backdrop" class="drawer-backdrop" onclick="toggleCustomerDrawer(false)"></div>
<div id="drawer-panel" class="drawer-panel">
  <div>
    <div class="between" style="padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.15)">
      <div class="brand">
        <img src="logo.jpg" alt="Sahakarya" class="brand-logo-img" onerror="this.style.display='none'">
        <div>
          <div class="brand-title" style="font-size:20px;color:white">SAHAKARYA</div>
          <div style="font-size:11px;color:#a7f3d0">Customer Portal</div>
        </div>
      </div>
      <button class="drawer-close-btn" onclick="toggleCustomerDrawer(false)" aria-label="Close menu">✕</button>
    </div>

    <div class="drawer-nav" id="drawer-nav-items">
      <!-- Injected dynamically based on language -->
    </div>
  </div>

  <div style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.15)">
    <button class="drawer-nav-item" style="color:#fecaca" onclick="toggleCustomerDrawer(false);logout()">
      <span style="font-size:18px">🚪</span>
      <span data-i18n="logout">Logout</span>
    </button>
  </div>
</div>

<!-- Instant 15-Min Quick Service Drawer -->
<div id="instant-drawer" class="instant-drawer">
  <div class="between" style="margin-bottom:16px">
    <div class="row">
      <span style="font-size:24px">⚡</span>
      <div>
        <h3 style="font-size:18px;font-weight:800" data-i18n="instant_title">Get help within 15 minutes</h3>
        <div style="font-size:12px;color:var(--mut)">Rapid priority booking with zero wait time</div>
      </div>
    </div>
    <button class="btn alt sm" style="padding:4px 10px" onclick="toggleInstantDrawer(false)">✕</button>
  </div>
  
  <div class="grid g2" style="gap:12px;margin-bottom:20px" id="instant-services-list">
    <!-- Rendered via JS -->
  </div>
</div>

<script>
// =========================================================================
// 1. ASSETS & SEMANTIC TRADE REPOSITORY
// =========================================================================
const LOGO_SRC = 'logo.jpg';

const IMAGES = {
  categories: {
    repair: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
    transport: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80',
    agri: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
    care: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
    institutional: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    tech: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=400&q=80'
  },
  subServices: {
    electrical: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    plumbing: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    carpentry: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    masonry: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    welding: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80',
    tiling: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80',
    appliance: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    ac_repair: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80',
    water_pump: 'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&w=600&q=80',
    house_clean: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    deep_clean: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
    office_clean: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    gardening: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    pest_control: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?auto=format&fit=crop&w=600&q=80',
    driver: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    goods_transport: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
    loading: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
    road_assist: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    farm_labour: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    ploughing: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
    livestock: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    elderly_care: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    health_support: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    childcare: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    solar_tech: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=600&q=80',
    computer_repair: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80',
    cctv_tech: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
  },
  workerProfiles: {
    plumber: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80',
    electrician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
    cleaner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
    carpenter: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    painter: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
    ac_tech: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=400&q=80',
    welder: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80',
    tractor_op: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80',
    caregiver: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
    solar_tech: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=400&q=80'
  }
};

// =========================================================================
// 2. 14 LANGUAGES & LOCALIZATION DICTIONARY
// =========================================================================
const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'raj', name: 'Rajasthani', native: 'राजस्थानी' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' }
];

const TRANSLATIONS = {
  en: {
    app_name: 'SAHAKARYA',
    tagline: 'Connecting Skills, Empowering Communities',
    namaste: 'Namaste 🙏',
    choose_lang: 'Choose your language',
    get_started: 'Get Started — Select Role →',
    explore_services: 'Explore Services ↓',
    select_role: 'Select your role to access Sahakarya',
    customer: 'Customer',
    worker: 'Worker',
    admin: 'Admin',
    customer_desc: 'Book verified household and community services.',
    worker_desc: 'Offer your skills, accept jobs and manage availability.',
    admin_desc: 'Manage workers, bookings, verification and cooperative.',
    back: 'Back',
    home: 'Home',
    services: 'All Services',
    my_bookings: 'My Bookings',
    history: 'History',
    settings: 'Settings',
    contact_us: 'Contact Us',
    logout: 'Logout',
    profile: 'My Profile',
    edit_profile: 'Edit Profile',
    save_changes: 'Save Changes',
    search_placeholder: 'Search services (e.g. plumbing, wiring, cleaning)...',
    services_title: 'Services for Every Need',
    emergency_title: 'Need Help Urgently?',
    emergency_desc: 'Get connected with nearby verified workers for urgent household needs.',
    emergency_btn: 'Emergency Services →',
    instant_btn: 'Instant 15 min',
    instant_title: 'Get help within 15 minutes',
    consultation_fee: 'Booking Consultation',
    cant_find_problem: "Can't find your problem?",
    describe_problem: 'Describe your problem in detail (e.g., tap leaking, switch spark)...',
    submit: 'Submit Problem & Find Workers',
    book_now: 'Book Now',
    booking_summary: 'Booking Summary',
    booking_fee: 'Booking Contribution',
    pay_now: 'Proceed to Payment',
    payment_success: 'Payment Successful!',
    receipt: 'Booking Receipt',
    live_tracking: 'Live GPS Tracking',
    worker_online: 'You are Online',
    worker_offline: 'You are Offline',
    weekly_earnings: 'Weekly Earnings',
    request_payout: 'Request Payout',
    ai_insights: 'AI Demand Insights',
    forecast_14d: '14-Day Demand Forecast Trend',
    lang_changed: 'Language updated successfully!'
  },
  te: {
    app_name: 'సహకార్య',
    tagline: 'నైపుణ్యాలను అనుసంధానిస్తూ, సమాజాన్ని శక్తివంతం చేస్తూ',
    namaste: 'నమస్కారం 🙏',
    choose_lang: 'మీ భాషను ఎంచుకోండి',
    get_started: 'ప్రారంభించండి — పాత్రను ఎంచుకోండి →',
    explore_services: 'సేవలను చూడండి ↓',
    select_role: 'సహకార్య వేదికను ఉపయోగించడానికి మీ పాత్రను ఎంచుకోండి',
    customer: 'వినియోగదారుడు',
    worker: 'కార్మికుడు',
    admin: 'నిర్వాహకుడు',
    customer_desc: 'ధృవీకరించబడిన గృహ మరియు సమాజ సేవలను బుక్ చేసుకోండి.',
    worker_desc: 'మీ నైపుణ్యాలను అందించి, పనులను స్వీకరించి సంపాదించండి.',
    admin_desc: 'కార్మికులు, బుకింగ్‌లు మరియు సహకార వ్యవస్థను నిర్వహించండి.',
    back: 'వెనుకకు',
    home: 'హోమ్',
    services: 'అన్ని సేవలు',
    my_bookings: 'నా బుకింగ్‌లు',
    history: 'చరిత్ర',
    settings: 'సెట్టింగ్‌లు',
    contact_us: 'మమ్మల్ని సంప్రదించండి',
    logout: 'లాగౌట్',
    profile: 'నా ప్రొఫైల్',
    edit_profile: 'ప్రొఫైల్ సవరించండి',
    save_changes: 'మార్పులను భద్రపరచండి',
    search_placeholder: 'సేవలను శోధించండి (ఉదా: ప్లంబింగ్, వైరింగ్, క్లీనింగ్)...',
    services_title: 'ప్రతి అవసరానికి నమ్మకమైన సేవలు',
    emergency_title: 'అత్యవసర సహాయం కావాలా?',
    emergency_desc: 'తక్షణ గృహ సమస్యల కోసం సమీపంలోని నిపుణులైన కార్మికులను పొందండి.',
    emergency_btn: 'అత్యవసర సేవలు →',
    instant_btn: 'తక్షణ 15 నిమిషాలు',
    instant_title: '15 నిమిషాల్లో వేగవంతమైన సహాయం',
    consultation_fee: 'బుకింగ్ విరాళం',
    cant_find_problem: 'మీ సమస్య జాబితాలో లేదా?',
    describe_problem: 'మీ సమస్యను వివరంగా రాయండి (ఉదా: నీరు కారుతోంది)...',
    submit: 'సమస్యను సమర్పించి కార్మికులను పొందండి',
    book_now: 'ఇప్పుడే బుక్ చేయండి',
    booking_summary: 'బుకింగ్ వివరాలు',
    booking_fee: 'సహకార సహకారం',
    pay_now: 'చెల్లింపునకు వెళ్లండి',
    payment_success: 'చెల్లింపు విజయవంతమైంది!',
    receipt: 'బుకింగ్ రసీదు',
    live_tracking: 'ప్రత్యక్ష GPS ట్రాకింగ్',
    worker_online: 'మీరు ఆన్‌లైన్‌లో ఉన్నారు',
    worker_offline: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు',
    weekly_earnings: 'వారపు ఆదాయం',
    request_payout: 'డబ్బు విత్‌డ్రా చేసుకోండి',
    ai_insights: 'AI సేవా అంచనాలు',
    forecast_14d: '14 రోజుల డిమాండ్ ట్రెండ్',
    lang_changed: 'భాష మార్చబడింది!'
  },
  hi: {
    app_name: 'सहकार्य',
    tagline: 'कौशल को जोड़ना, समुदायों को सशक्त बनाना',
    namaste: 'नमस्ते 🙏',
    choose_lang: 'अपनी भाषा चुनें',
    get_started: 'शुरू करें — भूमिका चुनें →',
    explore_services: 'सेवाएं देखें ↓',
    select_role: 'सहकार्य मंच का उपयोग करने के लिए अपनी भूमिका चुनें',
    customer: 'ग्राहक',
    worker: 'कारीगर / कार्यकर्ता',
    admin: 'प्रशासक',
    customer_desc: 'सत्यापित घरेलू एवं सामुदायिक सेवाएं बुक करें।',
    worker_desc: 'अपने हुनर से काम पाएं और सम्मानजनक कमाई करें।',
    admin_desc: 'कार्यकर्ताओं, बुकिंग और सहकारी मंच का प्रबंधन करें।',
    back: 'पीछे',
    home: 'होम',
    services: 'सभी सेवाएं',
    my_bookings: 'मेरी बुकिंग्स',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    contact_us: 'संपर्क करें',
    logout: 'लॉगआउट',
    profile: 'मेरी प्रोफाइल',
    edit_profile: 'प्रोफाइल संपादित करें',
    save_changes: 'सुरक्षित करें',
    search_placeholder: 'सेवाएं खोजें (उदा: प्लंबिंग, बिजली, सफाई)...',
    services_title: 'हर ज़रूरत के लिए विश्वसनीय सेवाएं',
    emergency_title: 'तत्काल सहायता चाहिए?',
    emergency_desc: 'आपातकालीन घरेलू मरम्मत के लिए निकटतम कारीगर पाएं।',
    emergency_btn: 'आपातकालीन सेवाएं →',
    instant_btn: 'त्वरित 15 मिनट',
    instant_title: '15 मिनट में तुरंत सहायता',
    consultation_fee: 'परामर्श शुल्क',
    cant_find_problem: 'अपनी समस्या नहीं मिल रही?',
    describe_problem: 'अपनी समस्या का विवरण लिखें (उदा: पाइप लीक, स्विच खराब)...',
    submit: 'समस्या भेजें और कारीगर खोजें',
    book_now: 'अभी बुक करें',
    booking_summary: 'बुकिंग सारांश',
    booking_fee: 'सहकारी योगदान',
    pay_now: 'भुगतान करें',
    payment_success: 'भुगतान सफल रहा!',
    receipt: 'बुकिंग रसीद',
    live_tracking: 'लाइव जीपीएस ट्रैकिंग',
    worker_online: 'आप ऑनलाइन हैं',
    worker_offline: 'आप ऑफलाइन हैं',
    weekly_earnings: 'साप्ताहिक कमाई',
    request_payout: 'भुगतान अनुरोध',
    ai_insights: 'एआई मांग विश्लेषण',
    forecast_14d: '14 दिवसीय मांग पूर्वानुमान',
    lang_changed: 'भाषा सफलतापूर्वक बदल दी गई!'
  },
  ta: {
    app_name: 'சககார்யா',
    tagline: 'திறன்களை இணைத்து சமூகங்களை மேம்படுத்துதல்',
    namaste: 'வணக்கம் 🙏',
    choose_lang: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    get_started: 'தொடங்குங்கள் — பங்கைத் தேர்வுசெய்க →',
    explore_services: 'சேவைகளை பார்க்க ↓',
    select_role: 'உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்',
    customer: 'வாடிக்கையாளர்',
    worker: 'பணியாளர்',
    admin: 'நிர்வாகி',
    customer_desc: 'சரிபார்க்கப்பட்ட சேவைகளை பதிவு செய்யுங்கள்.',
    worker_desc: 'உங்கள் திறன்களுக்கான வேலைகளைப் பெறுங்கள்.',
    admin_desc: 'பணியாளர்கள் மற்றும் முன்பதிவுகளை நிர்வகிக்கவும்.',
    back: 'பின்னால்',
    home: 'முகப்பு',
    services: 'அனைத்து சேவைகள்',
    my_bookings: 'எனது முன்பதிவுகள்',
    history: 'வரலாறு',
    settings: 'அமைப்புகள்',
    contact_us: 'தொடர்புகொள்ள',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    edit_profile: 'திருத்து',
    save_changes: 'சேமிக்கவும்',
    search_placeholder: 'சேவைகளைத் தேடுங்கள்...',
    services_title: 'அனைத்து தேவைகளுக்கும் சேவைகள்',
    emergency_title: 'அவசர உதவி தேவையா?',
    emergency_desc: 'உடனடி வீட்டுத் தேவைகளுக்கு பணியாளர்களை அணுகுங்கள்.',
    emergency_btn: 'அவசர சேவைகள் →',
    instant_btn: 'உடனடி 15 நிமிடம்',
    instant_title: '15 நிமிடங்களில் உதவி பெறுங்கள்',
    consultation_fee: 'முன்பதிவு கட்டணம்',
    cant_find_problem: 'சிக்கல் கிடைக்கவில்லையா?',
    describe_problem: 'உங்கள் பிரச்சனையை விவரிக்கவும்...',
    submit: 'சமர்ப்பிக்கவும்',
    book_now: 'இப்போது பதிவு செய்க',
    booking_summary: 'முன்பதிவு சுருக்கம்',
    booking_fee: 'கூட்டுறவு பங்களிப்பு',
    pay_now: 'பணம் செலுத்தவும்',
    payment_success: 'வெற்றிகரமாக செலுத்தப்பட்டது!',
    receipt: 'ரசீது',
    live_tracking: 'நேரலை ஜிபிஎஸ்',
    worker_online: 'நீங்கள் ஆன்லைனில் உள்ளீர்கள்',
    worker_offline: 'நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்',
    weekly_earnings: 'வார வருவாய்',
    request_payout: 'பணம் பெறுக',
    ai_insights: 'AI தேவை கணிப்புகள்',
    forecast_14d: '14 நாள் தேவை வரைபடம்',
    lang_changed: 'மொழி மாற்றப்பட்டது!'
  },
  kn: {
    app_name: 'ಸಹಕಾರ್ಯ',
    tagline: 'ಕೌಶಲ್ಯಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ, ಸಮುದಾಯಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು',
    namaste: 'ನಮಸ್ಕಾರ 🙏',
    choose_lang: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    get_started: 'ಪ್ರಾರಂಭಿಸಿ — ಪಾತ್ರ ಆಯ್ಕೆಮಾಡಿ →',
    explore_services: 'ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ ↓',
    select_role: 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    customer: 'ಗ್ರಾಹಕ',
    worker: 'ಕುಶಲಕರ್ಮಿ',
    admin: 'ನಿರ್ವಾಹಕ',
    customer_desc: 'ಪರಿಶೀಲಿಸಿದ ಸೇವೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ.',
    worker_desc: 'ನಿಮ್ಮ ಕೌಶಲ್ಯಗಳಿಗೆ ತಕ್ಕ ಕೆಲಸ ಪಡೆಯಿರಿ.',
    admin_desc: 'ಸಹಕಾರಿ ವೇದಿಕೆಯನ್ನು ನಿರ್ವಹಿಸಿ.',
    back: 'ಹಿಂದೆ',
    home: 'ಮುಖಪುಟ',
    services: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
    my_bookings: 'ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು',
    history: 'ಇತಿಹಾಸ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    contact_us: 'ಸಂಪರ್ಕಿಸಿ',
    logout: 'ಲಾಗ್‌ಔಟ್',
    profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    edit_profile: 'ಪ್ರೊಫೈಲ್ ತಿದ್ದಿ',
    save_changes: 'ಉಳಿಸಿ',
    search_placeholder: 'ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...',
    services_title: 'ಪ್ರತಿಯೊಂದು ಅಗತ್ಯಕ್ಕೂ ಸೇವೆಗಳು',
    emergency_title: 'ತುರ್ತು ಸಹಾಯ ಬೇಕೆ?',
    emergency_desc: 'ತಕ್ಷಣದ ಪರಿಹಾರಕ್ಕಾಗಿ ಹತ್ತಿರದ ಕೆಲಸಗಾರರನ್ನು ಪಡೆಯಿರಿ.',
    emergency_btn: 'ತುರ್ತು ಸೇವೆಗಳು →',
    instant_btn: 'ತ್ವರಿತ 15 ನಿಮಿಷ',
    instant_title: '15 ನಿಮಿಷಗಳಲ್ಲಿ ಸಹಾಯ',
    consultation_fee: 'ಸಮಾಲೋಚನಾ ಶುಲ್ಕ',
    cant_find_problem: 'ಸಮಸ್ಯೆ ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲವೇ?',
    describe_problem: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...',
    submit: 'ಸಲ್ಲಿಸಿ',
    book_now: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
    booking_summary: 'ಬುಕಿಂಗ್ ವಿವರ',
    booking_fee: 'ಸಹಕಾರಿ ಶುಲ್ಕ',
    pay_now: 'ಪಾವತಿ ಮಾಡಿ',
    payment_success: 'ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ!',
    receipt: 'ರಸೀದಿ',
    live_tracking: 'ಲೈವ್ ಜಿಪಿಎಸ್',
    worker_online: 'ನೀವು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ',
    worker_offline: 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ',
    weekly_earnings: 'ವಾರದ ಗಳಿಕೆ',
    request_payout: 'ವಿತ್‌ಡ್ರಾ ಮಾಡಿ',
    ai_insights: 'AI ಬೇಡಿಕೆ ಒಳನೋಟಗಳು',
    forecast_14d: '14 ದಿನಗಳ ಮುನ್ಸೂಚನೆ',
    lang_changed: 'ಭಾಷೆ ಬದಲಾಗಿದೆ!'
  },
  ml: {
    app_name: 'സഹകാര്യ',
    tagline: 'കഴിവുകളെ ബന്ധിപ്പിക്കുന്നു, സമൂഹങ്ങളെ ശാക്തീകരിക്കുന്നു',
    namaste: 'നമസ്കാരം 🙏',
    choose_lang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    get_started: 'ആരംഭിക്കുക — റോൾ തിരഞ്ഞെടുക്കുക →',
    explore_services: 'സേവനങ്ങൾ കാണുക ↓',
    select_role: 'നിങ്ങളുടെ റോൾ തിരഞ്ഞെടുക്കുക',
    customer: 'ഉപഭോക്താവ്',
    worker: 'തൊഴിലാളി',
    admin: 'അഡ്മിൻ',
    customer_desc: 'പരിശോധിച്ചുറപ്പിച്ച സേവനങ്ങൾ ബുക്ക് ചെയ്യുക.',
    worker_desc: 'നൈപുണ്യങ്ങൾ പങ്കുവെച്ചു മാന്യമായി വരുമാനം നേടുക.',
    admin_desc: 'സഹകരണ വേദി നിയന്ത്രിക്കുക.',
    back: 'തിരികെ',
    home: 'ഹോം',
    services: 'എല്ലാ സേവനങ്ങളും',
    my_bookings: 'എന്റെ ബുക്കിംഗുകൾ',
    history: 'ചരിത്രം',
    settings: 'ക്രമീകരണങ്ങൾ',
    contact_us: 'ബന്ധപ്പെടുക',
    logout: 'ലോഗ് ഔട്ട്',
    profile: 'പ്രൊഫൈൽ',
    edit_profile: 'എഡിറ്റ് ചെയ്യുക',
    save_changes: 'സേവ് ചെയ്യുക',
    search_placeholder: 'സേവനങ്ങൾ തിരയുക...',
    services_title: 'എല്ലാ ആവശ്യങ്ങൾക്കുമുള്ള സേവനങ്ങൾ',
    emergency_title: 'അടിയന്തര സഹായം വേണോ?',
    emergency_desc: 'ഉടൻ തന്നെ അടുത്തുള്ള തൊഴിലാളികളെ കണ്ടെത്തുക.',
    emergency_btn: 'അടിയന്തര സേവനങ്ങൾ →',
    instant_btn: 'തൽക്ഷണം 15 മിനിറ്റ്',
    instant_title: '15 മിനിറ്റിനുള്ളിൽ സഹായം',
    consultation_fee: 'ബുക്കിംഗ് ഫീസ്',
    cant_find_problem: 'പ്രശ്നം കാണുന്നില്ലേ?',
    describe_problem: 'നിങ്ങളുടെ പ്രശ്നം വിവരിക്കുക...',
    submit: 'സമർപ്പിക്കുക',
    book_now: 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക',
    booking_summary: 'ബുക്കിംഗ് സംഗ്രഹം',
    booking_fee: 'സഹകരണ വിഹിതം',
    pay_now: 'പണമടയ്ക്കുക',
    payment_success: 'പണമടയ്ക്കൽ വിജയം!',
    receipt: 'രസീത്',
    live_tracking: 'തത്സമയ ട്രാക്കിംഗ്',
    worker_online: 'നിങ്ങൾ ഓൺലൈനിലാണ്',
    worker_offline: 'നിങ്ങൾ ഓഫ്ലൈനിലാണ്',
    weekly_earnings: 'പ്രതിവാര വരുമാനം',
    request_payout: 'പിൻവലിക്കുക',
    ai_insights: 'AI ഡിമാൻഡ് വിശകലനം',
    forecast_14d: '14 ദിവസത്തെ പ്രവചനം',
    lang_changed: 'ഭാഷ അപ്ഡേറ്റ് ചെയ്തു!'
  },
  mr: {
    app_name: 'सहकार्य',
    tagline: 'कौशल्यांची सांगड, समुदायांचे सक्षमीकरण',
    namaste: 'नमस्ते 🙏',
    choose_lang: 'आपली भाषा निवडा',
    get_started: 'सुरू करा — भूमिका निवडा →',
    explore_services: 'सेवा पहा ↓',
    select_role: 'सहकार्य वापरण्यासाठी भूमिका निवडा',
    customer: 'ग्राहक',
    worker: 'कारागीर / कामगार',
    admin: 'प्रशासक',
    customer_desc: 'सत्यापित घरगुती सेवा बुक करा.',
    worker_desc: 'आपले कौशल्य दाखवून काम मिळवा.',
    admin_desc: 'कामगार आणि सहकाराचे व्यवस्थापन करा.',
    back: 'मागे',
    home: 'होम',
    services: 'सर्व सेवा',
    my_bookings: 'माझे बुकिंग्स',
    history: 'इतिहास',
    settings: 'सेटिंग्ज',
    contact_us: 'संपर्क',
    logout: 'लॉगआउट',
    profile: 'माझे प्रोफाईल',
    edit_profile: 'संपादित करा',
    save_changes: 'जतन करा',
    search_placeholder: 'सेवा शोधा...',
    services_title: 'प्रत्येक गरजेसाठी विश्वासार्ह सेवा',
    emergency_title: 'तातडीची मदत हवी आहे?',
    emergency_desc: 'तातडीच्या दुरुस्तीसाठी जवळचे कामगार मिळवा.',
    emergency_btn: 'आपत्कालीन सेवा →',
    instant_btn: 'झटपट १५ मिनिटे',
    instant_title: '१५ मिनिटांत त्वरित मदत',
    consultation_fee: 'बुकिंग शुल्क',
    cant_find_problem: 'समस्या सापडत नाही?',
    describe_problem: 'आपली समस्या स्पष्ट करा...',
    submit: 'सादर करा',
    book_now: 'आता बुक करा',
    booking_summary: 'बुकिंग सारांश',
    booking_fee: 'सहकारी योगदान',
    pay_now: 'पैसे भरा',
    payment_success: 'पेमेंट यशस्वी!',
    receipt: 'पावती',
    live_tracking: 'लाईव्ह जीपीएस ट्रॅकिंग',
    worker_online: 'तुम्ही ऑनलाईन आहात',
    worker_offline: 'तुम्ही ऑफलाईन आहात',
    weekly_earnings: 'साप्ताहिक कमाई',
    request_payout: 'पैसे काढा',
    ai_insights: 'एआय मागणी अंदाज',
    forecast_14d: '१४ दिवसांचा अंदाज',
    lang_changed: 'भाषा बदलली!'
  },
  bn: {
    app_name: 'সহকার্য',
    tagline: 'দক্ষতার মিলন, সমাজের ক্ষমতায়ন',
    namaste: 'নমস্কার 🙏',
    choose_lang: 'আপনার ভাষা বেছে নিন',
    get_started: 'শুরু করুন — ভূমিকা বেছে নিন →',
    explore_services: 'পরিষেবাগুলি দেখুন ↓',
    select_role: 'আপনার ভূমিকা বেছে নিন',
    customer: 'গ্রাহক',
    worker: 'কর্মী',
    admin: 'প্রশাসক',
    customer_desc: 'যাচাইকৃত পরিষেবা বুক করুন।',
    worker_desc: 'কাজের মাধ্যমে ন্যায্য আয় করুন।',
    admin_desc: 'সমবায় প্ল্যাটফর্ম পরিচালনা করুন।',
    back: 'পেছনে',
    home: 'হোম',
    services: 'সব পরিষেবা',
    my_bookings: 'আমার বুকিং',
    history: 'ইতিহাস',
    settings: 'সেটিংস',
    contact_us: 'যোগাযোগ',
    logout: 'লগআউট',
    profile: 'আমার প্রোফাইল',
    edit_profile: 'সম্পাদনা করুন',
    save_changes: 'সংরক্ষণ করুন',
    search_placeholder: 'পরিষেবা অনুসন্ধান করুন...',
    services_title: 'প্রতিটি প্রয়োজনে নির্ভরযোগ্য পরিষেবা',
    emergency_title: 'জরুরি সাহায্য প্রয়োজন?',
    emergency_desc: 'নিকটতম কর্মীদের সাথে যোগাযোগ করুন।',
    emergency_btn: 'জরুরি পরিষেবা →',
    instant_btn: 'তাত্ক্ষণিক ১৫ মিনিট',
    instant_title: '১৫ মিনিটে দ্রুত সাহায্য',
    consultation_fee: 'পরামর্শ ফি',
    cant_find_problem: 'সমস্যা খুঁজে পাচ্ছেন না?',
    describe_problem: 'আপনার সমস্যা লিখুন...',
    submit: 'জমা দিন',
    book_now: 'এখনই বুক করুন',
    booking_summary: 'বুকিং বিবরণ',
    booking_fee: 'সমবায় অবদান',
    pay_now: 'পেমেন্ট করুন',
    payment_success: 'পেমেন্ট সফল!',
    receipt: 'রসিদ',
    live_tracking: 'লাইভ ট্র্যাকিং',
    worker_online: 'আপনি অনলাইনে আছেন',
    worker_offline: 'আপনি অফলাইনে আছেন',
    weekly_earnings: 'সাপ্তাহিক আয়',
    request_payout: 'উত্তোলন করুন',
    ai_insights: 'এআই বিশ্লেষণ',
    forecast_14d: '১৪ দিনের পূর্বাভাস',
    lang_changed: 'ভাষা পরিবর্তিত হয়েছে!'
  },
  gu: {
    app_name: 'સહકાર્ય',
    tagline: 'કૌશલ્યનું જોડાણ, સમુદાયોનું સશક્તિકરણ',
    namaste: 'નમસ્તે 🙏',
    choose_lang: 'તમારી ભાષા પસંદ કરો',
    get_started: 'શરૂ કરો — ભૂમિકા પસંદ કરો →',
    explore_services: 'સેવાઓ જુઓ ↓',
    select_role: 'તમારી ભૂમિકા પસંદ કરો',
    customer: 'ગ્રાહક',
    worker: 'કારીગર',
    admin: 'સંચાલક',
    customer_desc: 'પ્રમાણિત સેવાઓ બુક કરો.',
    worker_desc: 'કામ મેળવો અને વાજબી કમાણી કરો.',
    admin_desc: 'સહકારી મંચનું સંચાલન કરો.',
    back: 'પાછા',
    home: 'હોમ',
    services: 'તમામ સેવાઓ',
    my_bookings: 'મારી બુકિંગ',
    history: 'ઇતિહાસ',
    settings: 'સેટિંગ્સ',
    contact_us: 'સંપર્ક કરો',
    logout: 'લૉગઆઉટ',
    profile: 'મારી પ્રોફાઇલ',
    edit_profile: 'ફેરફાર કરો',
    save_changes: 'સાચવો',
    search_placeholder: 'સેવાઓ શોધો...',
    services_title: 'દરેક જરૂરિયાત માટે સેવાઓ',
    emergency_title: 'તાત્કાલિક મદદની જરૂર છે?',
    emergency_desc: 'નજીકના કારીગરોનો સંપર્ક કરો.',
    emergency_btn: 'ઇમરજન્સી સેવાઓ →',
    instant_btn: 'ત્વરિત ૧૫ મિનિટ',
    instant_title: '૧૫ મિનિટમાં ઝડપી મદદ',
    consultation_fee: 'બુકિંગ ફી',
    cant_find_problem: 'સમસ્યા નથી મળતી?',
    describe_problem: 'તમારી સમસ્યા વર્ણવો...',
    submit: 'સબમિટ કરો',
    book_now: 'હમણાં બુક કરો',
    booking_summary: 'બુકિંગ વિગત',
    booking_fee: 'સહકારી યોગદાન',
    pay_now: 'ચૂકવણી કરો',
    payment_success: 'ચુકવણી સફળ!',
    receipt: 'રસીદ',
    live_tracking: 'લાઈવ ટ્રેકિંગ',
    worker_online: 'તમે ઓનલાઇન છો',
    worker_offline: 'તમે ઓફલાઇન છો',
    weekly_earnings: 'સાપ્તાહિક કમાણી',
    request_payout: 'નાણાં ઉપાડો',
    ai_insights: 'AI માંગ વિશ્લેષણ',
    forecast_14d: '૧૪ દિવસની આગાહી',
    lang_changed: 'ભાષા બદલાઈ ગઈ!'
  },
  pa: {
    app_name: 'ਸਹਿਕਾਰਯ',
    tagline: 'ਹੁਨਰ ਨੂੰ ਜੋੜਨਾ, ਸਮਾਜ ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਣਾ',
    namaste: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ 🙏',
    choose_lang: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    get_started: 'ਸ਼ੁਰੂ ਕਰੋ — ਰੋਲ ਚੁਣੋ →',
    explore_services: 'ਸੇਵਾਵਾਂ ਦੇਖੋ ↓',
    select_role: 'ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ',
    customer: 'ਗਾਹਕ',
    worker: 'ਕਾਰੀਗਰ',
    admin: 'ਪ੍ਰਬੰਧਕ',
    customer_desc: 'ਭਰੋਸੇਯੋਗ ਘਰੇਲੂ ਸੇਵਾਵਾਂ ਬੁੱਕ ਕਰੋ।',
    worker_desc: 'ਕੰਮ ਲੱਭੋ ਅਤੇ ਇਮਾਨਦਾਰ ਕਮਾਈ ਕਰੋ।',
    admin_desc: 'ਸਹਿਕਾਰੀ ਸਿਸਟਮ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।',
    back: 'ਪਿੱਛੇ',
    home: 'ਹੋਮ',
    services: 'ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ',
    my_bookings: 'ਮੇਰੀਆਂ ਬੁਕਿੰਗਾਂ',
    history: 'ਇਤਿਹਾਸ',
    settings: 'ਸੈਟਿੰਗਾਂ',
    contact_us: 'ਸੰਪਰਕ ਕਰੋ',
    logout: 'ਲਾਗਆਉਟ',
    profile: 'ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ',
    edit_profile: 'ਸੋਧੋ',
    save_changes: 'ਸੰਭਾਲੋ',
    search_placeholder: 'ਸੇਵਾਵਾਂ ਖੋਜੋ...',
    services_title: 'ਹਰ ਲੋੜ ਲਈ ਸੇਵਾਵਾਂ',
    emergency_title: 'ਐਮਰਜੈਂਸੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?',
    emergency_desc: 'ਨੇੜਲੇ ਕਾਰੀਗਰ ਨਾਲ ਤੁਰੰਤ ਜੁੜੋ।',
    emergency_btn: 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ →',
    instant_btn: 'ਤੁਰੰਤ 15 ਮਿੰਟ',
    instant_title: '15 ਮਿੰਟਾਂ ਵਿੱਚ ਤੇਜ਼ ਮਦਦ',
    consultation_fee: 'ਸਲਾਹ ਫੀਸ',
    cant_find_problem: 'ਸਮੱਸਿਆ ਨਹੀਂ ਮਿਲ ਰਹੀ?',
    describe_problem: 'ਆਪਣੀ ਸਮੱਸਿਆ ਲਿਖੋ...',
    submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
    book_now: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
    booking_summary: 'ਬੁਕਿੰਗ ਵੇਰਵਾ',
    booking_fee: 'ਸਹਿਕਾਰੀ ਯੋਗਦਾਨ',
    pay_now: 'ਭੁਗਤਾਨ ਕਰੋ',
    payment_success: 'ਭੁਗਤਾਨ ਸਫਲ!',
    receipt: 'ਰਸੀਦ',
    live_tracking: 'ਲਾਈਵ ਟਰੈਕਿੰਗ',
    worker_online: 'ਤੁਸੀਂ ਆਨਲਾਈਨ ਹੋ',
    worker_offline: 'ਤੁਸੀਂ ਆਫਲਾਈਨ ਹੋ',
    weekly_earnings: 'ਹਫ਼ਤਾਵਾਰ ਕਮਾਈ',
    request_payout: 'ਪੈਸੇ ਕਢਵਾਓ',
    ai_insights: 'AI ਮੰਗ ਅਨੁਮਾਨ',
    forecast_14d: '14 ਦਿਨਾਂ ਦਾ ਰੁਝਾਨ',
    lang_changed: 'ਭਾਸ਼ਾ ਬਦਲੀ ਗਈ!'
  },
  or: {
    app_name: 'ସହକାର୍ଯ୍ୟ',
    tagline: 'ଦକ୍ଷତା ସଂଯୋଗ, ସମୁଦାୟ ସଶକ୍తీକରଣ',
    namaste: 'ନମସ୍କାର 🙏',
    choose_lang: 'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ',
    get_started: 'ଆରମ୍ଭ କରନ୍ତୁ — ଭୂମିକା ବାଛନ୍ତୁ →',
    explore_services: 'ସେବା ଦେଖନ୍ତୁ ↓',
    select_role: 'ଭୂମିକା ବାଛନ୍ତୁ',
    customer: 'ଗ୍ରାହକ',
    worker: 'କାରିଗର',
    admin: 'ପ୍ରଶାସକ',
    customer_desc: 'ଯାଞ୍ଚ ହୋଇଥିବା ସେବା ବୁକ୍ କରନ୍ତୁ।',
    worker_desc: 'କାମ ପାଇ ଉଚିତ ରୋଜଗାର କରନ୍ତୁ।',
    admin_desc: 'ସମବାୟ ମଞ୍ଚ ପରିଚାଳନା କରନ୍ତୁ।',
    back: 'ପଛକୁ',
    home: 'ହୋମ୍',
    services: 'ସମସ୍ତ ସେବା',
    my_bookings: 'ମୋର ବୁକିଂ',
    history: 'ଇତିହାସ',
    settings: 'ସେଟିଙ୍ଗ୍ସ',
    contact_us: 'ଯୋଗାଯୋଗ',
    logout: 'ଲଗ୍ ଆଉଟ୍',
    profile: 'ମୋ ପ୍ରୋଫାଇଲ୍',
    edit_profile: 'ସମ୍ପାଦନ କରନ୍ତୁ',
    save_changes: 'ସାଇତନ୍ତୁ',
    search_placeholder: 'ସେବା ଖୋଜନ୍ତୁ...',
    services_title: 'ପ୍ରତ୍ୟେକ ଆବଶ୍ୟକତା ପାଇଁ ସେବା',
    emergency_title: 'ଜରୁରୀ ସାହାଯ୍ୟ ଦରକାର?',
    emergency_desc: 'ନିକଟସ୍ଥ କର୍ମଚାରୀଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    emergency_btn: 'ଜରୁରୀକାଳୀନ ସେବା →',
    instant_btn: 'ତୁରନ୍ତ ୧୫ ମିନିଟ୍',
    instant_title: '୧୫ ମିନିଟ୍ ମଧ୍ୟରେ ସାହାଯ୍ୟ',
    consultation_fee: 'ବୁକିଂ ଫି',
    cant_find_problem: 'ସମସ୍ୟା ମିଳୁନାହିଁ?',
    describe_problem: 'ଆପଣଙ୍କ ସମସ୍ୟା ଲେଖନ୍ତୁ...',
    submit: 'ଦାଖଲ କରନ୍ତୁ',
    book_now: 'ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ',
    booking_summary: 'ବୁକିଂ ସାରାଂଶ',
    booking_fee: 'ସମବାୟ ଅବଦାନ',
    pay_now: 'ପୈଠ କରନ୍ତୁ',
    payment_success: 'ପୈଠ ସଫଳ!',
    receipt: 'ରସିଦ',
    live_tracking: 'ଲାଇଭ୍ ଟ୍ରାକିଂ',
    worker_online: 'ଆପଣ ଅନଲାଇନ୍ ଅଛନ୍ତି',
    worker_offline: 'ଆପଣ ଅଫଲାଇନ୍ ଅଛନ୍ତି',
    weekly_earnings: 'ସାପ୍ତାହିକ ଆୟ',
    request_payout: 'ଟଙ୍କା ଉଠାନ୍ତୁ',
    ai_insights: 'AI ଚାହିଦା ବିଶ୍ଳେଷଣ',
    forecast_14d: '୧୪ ଦିନର ପୂର୍ବାନୁମାନ',
    lang_changed: 'ଭାଷା ପରିବର୍ତ୍ତନ ହୋଇଛି!'
  },
  raj: {
    app_name: 'सहकार्य',
    tagline: 'हुनर री पहचान, अपणायत रो साथ',
    namaste: 'खम्मा घणी 🙏',
    choose_lang: 'आपणी भाषा चुणो',
    get_started: 'सरू करो — भूमिका चुणो →',
    explore_services: 'सेवावां देखो ↓',
    select_role: 'आपणी भूमिका चुणो',
    customer: 'ग्राहक',
    worker: 'कारीगर',
    admin: 'प्रशासक',
    customer_desc: 'घरेलू काम खातर कारीगर बुलाओ।',
    worker_desc: 'हुनर सूं काम पाओ अर कमाई करो।',
    admin_desc: 'सहकारी व्यवस्था संभालो।',
    back: 'पाछा',
    home: 'मुख्य',
    services: 'सगळी सेवावां',
    my_bookings: 'म्हारी बुकिंग',
    history: 'इतिहास',
    settings: 'सेटिंग',
    contact_us: 'संपर्क',
    logout: 'लॉगआउट',
    profile: 'म्हारी प्रोफाइल',
    edit_profile: 'बदलो',
    save_changes: 'साचो',
    search_placeholder: 'सेवावां खोजो...',
    services_title: 'सगळी जरूरत खातर सेवावां',
    emergency_title: 'तुरंत मदद चाहीजे?',
    emergency_desc: 'आपातकाल खातर कारीगर बुलाओ।',
    emergency_btn: 'आपातकालीन सेवा →',
    instant_btn: 'झटपट १५ मिनट',
    instant_title: '१५ मिनट में मदद',
    consultation_fee: 'परामर्श फीस',
    cant_find_problem: 'समस्या नी मिल री?',
    describe_problem: 'समस्या रो ब्योरो लिखो...',
    submit: 'भेजो',
    book_now: 'अबै बुक करो',
    booking_summary: 'बुकिंग ब्योरो',
    booking_fee: 'सहकारी हिस्सा',
    pay_now: 'भुगतान करो',
    payment_success: 'भुगतान पूरो हुयो!',
    receipt: 'रसीद',
    live_tracking: 'लाइव ट्रैकिंग',
    worker_online: 'आप ऑनलाइन हो',
    worker_offline: 'आप ऑफलाइन हो',
    weekly_earnings: 'हफ्ते री कमाई',
    request_payout: 'पिया निकालो',
    ai_insights: 'एआई अनुमान',
    forecast_14d: '१४ दिनां रो अनुमान',
    lang_changed: 'भाषा बदलगी!'
  },
  as: {
    app_name: 'সহকাৰ্য',
    tagline: 'দক্ষতাৰ সংযোগ, সমাজৰ সৱলীকৰণ',
    namaste: 'নমস্কাৰ 🙏',
    choose_lang: 'আপোনাৰ ভাষা বাছক',
    get_started: 'আৰম্ভ কৰক — ভূমিকা বাছক →',
    explore_services: 'সেৱাসমূহ চাওক ↓',
    select_role: 'আপোনাৰ ভূমিকা বাছক',
    customer: 'গ্ৰাহক',
    worker: 'কৰ্মী',
    admin: 'প্ৰশাসক',
    customer_desc: 'পৰীক্ষিত সেৱা বুক কৰক।',
    worker_desc: 'কামেৰে উচিত উপাৰ্জন কৰক।',
    admin_desc: 'সমবায় মঞ্চ পৰিচালনা কৰক।',
    back: 'উভতি যাওক',
    home: 'গৃহ',
    services: 'সকলো সেৱা',
    my_bookings: 'মোৰ বুকিং',
    history: 'ইতিহাস',
    settings: 'ছেটিংছ',
    contact_us: 'যোগাযোগ',
    logout: 'লগআউট',
    profile: 'মোৰ প্ৰফাইল',
    edit_profile: 'সম্পাদনা',
    save_changes: 'সংৰক্ষণ কৰক',
    search_placeholder: 'সেৱা অনুসন্ধান কৰক...',
    services_title: 'সকলো প্ৰয়োজনৰ বাবে সেৱা',
    emergency_title: 'জৰুৰী সহায়ৰ প্ৰয়োজন নেকি?',
    emergency_desc: 'নিকটতম কৰ্মীৰ সৈতে যোগাযোগ কৰক।',
    emergency_btn: 'জৰুৰী সেৱা →',
    instant_btn: 'তৎক্ষণাত ১৫ মিনিট',
    instant_title: '১৫ মিনিটত দ্ৰুত সহায়',
    consultation_fee: 'পৰামৰ্শ মাচুল',
    cant_find_problem: 'সমস্যা বিচাৰি পোৱা নাই?',
    describe_problem: 'আপোনাৰ সমস্যা বৰ্ণনা কৰক...',
    submit: 'দাখিল কৰক',
    book_now: 'এতিয়াই বুক কৰক',
    booking_summary: 'বুকিং বিৱৰণ',
    booking_fee: 'সমবায় অৱদান',
    pay_now: 'পৰিশোধ কৰক',
    payment_success: 'পৰিশোধ সফল হ’ল!',
    receipt: 'ৰচিদ',
    live_tracking: 'লাইভ ট্ৰেকিং',
    worker_online: 'আপুনি অনলাইনত আছে',
    worker_offline: 'আপুনি অফলাইনত আছে',
    weekly_earnings: 'সাপ্তাহিক উপাৰ্জন',
    request_payout: 'উত্তোলন কৰক',
    ai_insights: 'AI চাহিদা বিশ্লেষণ',
    forecast_14d: '১৪ দিনৰ পূৰ্বানুমান',
    lang_changed: 'ভাষা সলনি কৰা হ’ল!'
  },
  ur: {
    app_name: 'سہکاریہ',
    tagline: 'ہنر کا اشتراک، معاشرے کی بااختیاری',
    namaste: 'آداب 🙏',
    choose_lang: 'اپنی زبان منتخب کریں',
    get_started: 'شروع کریں — کردار منتخب کریں →',
    explore_services: 'خدمات دیکھیں ↓',
    select_role: 'اپنا کردار منتخب کریں',
    customer: 'کسٹمر',
    worker: 'کاریگر',
    admin: 'ایڈمن',
    customer_desc: 'تصدیق شدہ خدمات بک کریں۔',
    worker_desc: 'اپنے ہنر سے باعزت کمائی کریں۔',
    admin_desc: 'باہمی پلیٹ فارم کا انتظام کریں۔',
    back: 'واپس',
    home: 'ہوم',
    services: 'تمام خدمات',
    my_bookings: 'میری بکنگز',
    history: 'تاریخچہ',
    settings: 'ترتیبات',
    contact_us: 'رابطہ کریں',
    logout: 'لاگ آؤٹ',
    profile: 'میری پروفائل',
    edit_profile: 'ترمیم کریں',
    save_changes: 'محفوظ کریں',
    search_placeholder: 'خدمات تلاش کریں...',
    services_title: 'ہر ضرورت کے لیے قابل اعتماد خدمات',
    emergency_title: 'فوری مدد کی ضرورت ہے؟',
    emergency_desc: 'ہنگامی ضروریات کے لیے فوری کاریگر حاصل کریں۔',
    emergency_btn: 'ہنگامی خدمات →',
    instant_btn: 'فوری 15 منٹ',
    instant_title: '15 منٹ میں فوری مدد',
    consultation_fee: 'مشاورت فیس',
    cant_find_problem: 'مسئلہ فہرست میں نہیں ہے؟',
    describe_problem: 'اپنا مسئلہ تفصیل سے بیان کریں...',
    submit: 'جمع کرائیں',
    book_now: 'ابھی بک کریں',
    booking_summary: 'بکنگ کا خلاصہ',
    booking_fee: 'تعاون کی فیس',
    pay_now: 'ادائیگی کریں',
    payment_success: 'ادائیگی کامیاب رہی!',
    receipt: 'رسید',
    live_tracking: 'لائیو ٹریکنگ',
    worker_online: 'آپ آن لائن ہیں',
    worker_offline: 'آپ آف لائن ہیں',
    weekly_earnings: 'ہفتہ وار آمدنی',
    request_payout: 'رقم نکالیں',
    ai_insights: 'اے آئی ڈیمانڈ تجزیہ',
    forecast_14d: '14 روزہ تخمینہ',
    lang_changed: 'زبان تبدیل ہوگئی!'
  }
};

let currentLang = localStorage.getItem('sahakarya_lang') || 'en';

function t(key) {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  return (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
}

function setLanguage(code) {
  currentLang = code;
  localStorage.setItem('sahakarya_lang', code);
  closeModal();
  updateDrawerTexts();
  renderApp();
  showToast(t('lang_changed'));
}

function openLanguageModal() {
  const currentObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  openModal('🌐 ' + (t('choose_lang') || 'Choose your language'), \`
    <div style="margin-bottom:12px;font-size:13px;color:var(--mut)">
      Selected: <b style="color:var(--primary)">\${currentObj.native} (\${currentObj.name})</b>
    </div>
    <div class="lang-grid">
      \${LANGUAGES.map(l => \`
        <button class="lang-btn \${l.code === currentLang ? 'active' : ''}" onclick="setLanguage('\${l.code}')">
          <div>
            <div style="font-weight:700;font-size:15px;color:var(--ink)">\${l.native}</div>
            <div style="font-size:12px;color:var(--mut)">\${l.name}</div>
          </div>
          \${l.code === currentLang ? '<span style="color:var(--primary);font-weight:800">✓</span>' : ''}
        </button>
      \`).join('')}
    </div>
  \`);
}

// =========================================================================
// 3. 7 SERVICE CATEGORIES & SUB-SERVICES
// =========================================================================
const ALL_CATEGORIES = [
  {
    id: 'repair', num: 1, name: 'Home Repair & Maintenance',
    desc: 'Electrical, plumbing, carpentry, painting, masonry, welding & pumps',
    icon: '🔧', img: IMAGES.categories.repair,
    services: [
      { name: 'Electrical Work', price: '₹399 – ₹899', icon: '⚡', img: IMAGES.subServices.electrical, skill: 'Electrician' },
      { name: 'Plumbing & Pipe Repair', price: '₹499 – ₹999', icon: '🚰', img: IMAGES.subServices.plumbing, skill: 'Plumber' },
      { name: 'Carpentry & Woodwork', price: '₹499 – ₹1,199', icon: '🪚', img: IMAGES.subServices.carpentry, skill: 'Carpenter & Furniture' },
      { name: 'Wall Painting & Touchup', price: '₹799 – ₹2,499', icon: '🎨', img: IMAGES.subServices.painting, skill: 'Painter & Decorator' },
      { name: 'Masonry & Plastering', price: '₹699 – ₹1,899', icon: '🧱', img: IMAGES.subServices.masonry, skill: 'Mason' },
      { name: 'Metal Welding & Grill', price: '₹599 – ₹1,499', icon: '👨‍🏭', img: IMAGES.subServices.welding, skill: 'Welder & Fabricator' },
      { name: 'Tile & Flooring Repair', price: '₹699 – ₹1,599', icon: '📐', img: IMAGES.subServices.tiling, skill: 'Mason' },
      { name: 'Appliance Repair', price: '₹449 – ₹1,299', icon: '🔌', img: IMAGES.subServices.appliance, skill: 'Electrician' },
      { name: 'AC & Refrigerator Repair', price: '₹599 – ₹1,899', icon: '❄️', img: IMAGES.subServices.ac_repair, skill: 'AC & Refrigerator Technician' },
      { name: 'Water-Pump & Motor Repair', price: '₹699 – ₹1,699', icon: '💧', img: IMAGES.subServices.water_pump, skill: 'Plumber' }
    ]
  },
  {
    id: 'cleaning', num: 2, name: 'Cleaning & Household Services',
    desc: 'Deep cleaning, kitchen sanitation, bathroom scrub, gardening & pest control',
    icon: '🧹', img: IMAGES.categories.cleaning,
    services: [
      { name: 'House Deep Cleaning', price: '₹999 – ₹2,499', icon: '✨', img: IMAGES.subServices.deep_clean, skill: 'Housekeeping Specialist' },
      { name: 'Office & Institution Cleaning', price: '₹1,299 – ₹3,999', icon: '🏢', img: IMAGES.subServices.office_clean, skill: 'Housekeeping Specialist' },
      { name: 'Kitchen & Chimney Cleaning', price: '₹599 – ₹1,299', icon: '🍳', img: IMAGES.subServices.house_clean, skill: 'Housekeeping Specialist' },
      { name: 'Bathroom Scrubbing & Wash', price: '₹499 – ₹899', icon: '🚿', img: IMAGES.subServices.house_clean, skill: 'Housekeeping Specialist' },
      { name: 'Gardening & Lawn Care', price: '₹399 – ₹999', icon: '🌱', img: IMAGES.subServices.gardening, skill: 'Gardener' },
      { name: 'Pest-Control Treatment', price: '₹799 – ₹1,999', icon: '🛡️', img: IMAGES.subServices.pest_control, skill: 'Pest Control Expert' }
    ]
  },
  {
    id: 'transport', num: 3, name: 'Transport & Delivery',
    desc: 'Driver services, local goods movement, farm harvest logistics & breakdown assistance',
    icon: '🚚', img: IMAGES.categories.transport,
    services: [
      { name: 'Professional Driver on Demand', price: '₹499 – ₹1,299', icon: '🚗', img: IMAGES.subServices.driver, skill: 'Driver' },
      { name: 'Local Goods Transportation', price: '₹799 – ₹2,499', icon: '📦', img: IMAGES.subServices.goods_transport, skill: 'Driver' },
      { name: 'Agricultural Produce Transport', price: '₹999 – ₹3,499', icon: '🌾', img: IMAGES.subServices.goods_transport, skill: 'Driver' },
      { name: 'Safe Loading & Unloading', price: '₹399 – ₹899', icon: '📦', img: IMAGES.subServices.loading, skill: 'Loading Worker' },
      { name: 'Roadside Vehicle Assistance', price: '₹499 – ₹1,199', icon: '🛠️', img: IMAGES.subServices.road_assist, skill: 'Mechanic' }
    ]
  },
  {
    id: 'agri', num: 4, name: 'Agriculture & Rural Services',
    desc: 'Farm labour, tractor ploughing, harvesting, pump operation & livestock assistance',
    icon: '🌾', img: IMAGES.categories.agri,
    services: [
      { name: 'Farm Labour Support', price: '₹400 / day', icon: '👨‍🌾', img: IMAGES.subServices.farm_labour, skill: 'Farm Labourer' },
      { name: 'Tractor Ploughing & Field Prep', price: '₹899 / hour', icon: '🚜', img: IMAGES.subServices.ploughing, skill: 'Tractor & Agri Operator' },
      { name: 'Irrigation & Pump Operation', price: '₹499 – ₹999', icon: '💧', img: IMAGES.subServices.water_pump, skill: 'Plumber' },
      { name: 'Livestock Care & Dairy Help', price: '₹499 – ₹1,199', icon: '🐄', img: IMAGES.subServices.livestock, skill: 'Livestock Attendant' }
    ]
  },
  {
    id: 'care', num: 5, name: 'Care & Community Services',
    desc: 'Elderly assistance, patient caregivers, childcare support & community health aides',
    icon: '🤝', img: IMAGES.categories.care,
    services: [
      { name: 'Elderly Assistance & Companion', price: '₹599 – ₹1,499', icon: '👵', img: IMAGES.subServices.elderly_care, skill: 'Elderly Caregiver' },
      { name: 'Community Health Support', price: '₹499 – ₹999', icon: '🩺', img: IMAGES.subServices.health_support, skill: 'Health Attendant' },
      { name: 'Childcare & Attendant Help', price: '₹599 – ₹1,299', icon: '👶', img: IMAGES.subServices.childcare, skill: 'Childcare Aide' }
    ]
  },
  {
    id: 'institutional', num: 6, name: 'Institutional Services',
    desc: 'Campus electrical, plumbing maintenance, cleaning crews & temporary teams',
    icon: '🏢', img: IMAGES.categories.institutional,
    services: [
      { name: 'Campus Electrical Maintenance', price: '₹1,499 / day', icon: '⚡', img: IMAGES.subServices.electrical, skill: 'Electrician' },
      { name: 'Campus Plumbing Maintenance', price: '₹1,299 / day', icon: '🚰', img: IMAGES.subServices.plumbing, skill: 'Plumber' },
      { name: 'Institutional Cleaning Staff', price: '₹999 / day', icon: '🧹', img: IMAGES.subServices.office_clean, skill: 'Housekeeping Specialist' }
    ]
  },
  {
    id: 'tech', num: 7, name: 'Skilled Technical Services',
    desc: 'Solar panel technicians, CCTV & network setup, computer repair & refrigeration',
    icon: '💻', img: IMAGES.categories.tech,
    services: [
      { name: 'Solar Panel Installation & Clean', price: '₹899 – ₹2,499', icon: '☀️', img: IMAGES.subServices.solar_tech, skill: 'Solar & CCTV Specialist' },
      { name: 'CCTV & Wi-Fi Network Setup', price: '₹699 – ₹1,799', icon: '📹', img: IMAGES.subServices.cctv_tech, skill: 'Solar & CCTV Specialist' },
      { name: 'Computer & Laptop Hardware Fix', price: '₹499 – ₹1,499', icon: '💻', img: IMAGES.subServices.computer_repair, skill: 'Hardware Tech' }
    ]
  }
];

// Quick 15-Minute Services
const INSTANT_15_SERVICES = [
  { name: "Women's Salon — Facial & Clean", price: '₹50 fee + service', icon: '💆‍♀️' },
  { name: "Women's Hair Cut & Styling", price: '₹50 fee + service', icon: '💇‍♀️' },
  { name: 'Pedicure & Manicure Rapid', price: '₹50 fee + service', icon: '💅' },
  { name: "Men's Haircut & Grooming", price: '₹50 fee + service', icon: '💈' },
  { name: 'Instant 30-Min Home Cleanup', price: '₹50 fee + ₹299', icon: '🧹' },
  { name: 'Instant Cooking Help', price: '₹50 fee + ₹349', icon: '🍳' },
  { name: 'Pest Spray Rapid Dispatch', price: '₹50 fee + ₹499', icon: '🐜' },
  { name: 'Gas Stove & Burner Fix', price: '₹50 fee + ₹299', icon: '🔥' },
  { name: 'Minor Pipe Leak Clamp', price: '₹50 fee + ₹399', icon: '🚰' },
  { name: 'Rapid Fuse & MCB Fix', price: '₹50 fee + ₹299', icon: '⚡' },
  { name: 'Quick Garden Trimming', price: '₹50 fee + ₹299', icon: '🌱' },
  { name: 'Small Appliance Quick Fix', price: '₹50 fee + ₹349', icon: '🔌' }
];

// Customer Reviews Carousel Data
const CUSTOMER_REVIEWS = [
  {
    name: 'Sita Devi',
    service: 'Plumbing & Pipe Repair',
    rating: 5,
    text: 'Ravi Kumar arrived in 18 minutes, fixed our broken overhead tank valve with zero mess. Transparent ₹499 pricing with cooperative escrow made me feel totally secure!',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    workerName: 'Ravi Kumar (Plumber)',
    location: 'Danavaipeta, Rajahmundry'
  },
  {
    name: 'Venkatesh Rao',
    service: 'Electrical & MCB Safety',
    rating: 5,
    text: 'Suresh Babu handled our main fuse board sparking issue with great professionalism. Certified Grade-A artisan and very courteous.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    workerName: 'Suresh Babu (Electrician)',
    location: 'Kotipalli Bus Stand, Rajahmundry'
  },
  {
    name: 'Ananya Sharma',
    service: 'Deep House Cleaning',
    rating: 5,
    text: 'The 3-member cooperative cleaning team transformed our 3BHK before Diwali. Spotless kitchen and shining tiles. Excellent service!',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    workerName: 'Lakshmi Devi (Housekeeping)',
    location: 'Kakinada Main Road'
  },
  {
    name: 'Appa Rao Farmer',
    service: 'Tractor Ploughing & Agri Help',
    rating: 5,
    text: 'Booked agricultural tractor assistance for 4 acres of wet paddy field. Punctual arrival and fair hourly cooperative rates saved our harvest schedule.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    workerName: 'Appa Rao (Tractor Operator)',
    location: 'East Godavari Rural'
  },
  {
    name: 'Dr. Radhika Mohan',
    service: 'Elderly Companion Care',
    rating: 5,
    text: 'Radha Kumari has been taking wonderful care of my 82-year-old mother. Extremely gentle, verified, and always on time.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    workerName: 'Radha Kumari (Caregiver)',
    location: 'Danavaipeta'
  }
];
let currentReviewIdx = 0;

// =========================================================================
// 4. SYNCHRONIZED GLOBAL DATABASE
// =========================================================================
let workersData = [
  { id: 1, workerId: 'WRK-1024', name: 'Ravi Kumar', skill: 'Plumber', exp: 6, rating: 4.85, reviews: 142, distance: '1.4 km', rate: '₹499', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.plumber, location: 'Danavaipeta, Rajahmundry', phone: '+91 98481 12345', email: 'ravi.plumber@sahakarya.org', welfareCovered: true, tradeScore: '96/100', maskedAadhaar: '**** **** 4892', completedJobs: 184, about: 'Specialist in sanitary fittings, high-pressure pipeline repair, and water pump motors.' },
  { id: 2, workerId: 'WRK-1025', name: 'Suresh Babu', skill: 'Electrician', exp: 8, rating: 4.90, reviews: 198, distance: '2.1 km', rate: '₹399', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.electrician, location: 'Kotipalli Bus Stand, Rajahmundry', phone: '+91 98482 23456', email: 'suresh.electric@sahakarya.org', welfareCovered: true, tradeScore: '98/100', maskedAadhaar: '**** **** 7812', completedJobs: 230, about: 'Licensed Grade-A wireman. Expert in 3-phase wiring, inverter setup, and MCB protection.' },
  { id: 3, workerId: 'WRK-1026', name: 'Lakshmi Devi', skill: 'Housekeeping Specialist', exp: 5, rating: 4.80, reviews: 89, distance: '2.8 km', rate: '₹349', status: 'Verified', isOnline: false, photo: IMAGES.workerProfiles.cleaner, location: 'Kakinada Main Road', phone: '+91 98483 34567', email: 'lakshmi.clean@sahakarya.org', welfareCovered: true, tradeScore: '92/100', maskedAadhaar: '**** **** 3109', completedJobs: 95, about: 'Deep sanitation, organic floor scrub, and hospital-grade kitchen cleaning expert.' },
  { id: 4, workerId: 'WRK-1027', name: 'Mahesh Rao', skill: 'Carpenter & Furniture', exp: 9, rating: 4.75, reviews: 115, distance: '3.2 km', rate: '₹499', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.carpenter, location: 'Peddapuram Market Area', phone: '+91 98484 45678', email: 'mahesh.carpenter@sahakarya.org', welfareCovered: true, tradeScore: '94/100', maskedAadhaar: '**** **** 6734', completedJobs: 140, about: 'Teak woodwork, modular kitchen cabinets, and lock latch replacement master.' },
  { id: 5, workerId: 'WRK-1028', name: 'Anil Varma', skill: 'Painter & Decorator', exp: 7, rating: 4.82, reviews: 94, distance: '2.5 km', rate: '₹599', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.painter, location: 'Samalkota Junction', phone: '+91 98485 56789', email: 'anil.paint@sahakarya.org', welfareCovered: true, tradeScore: '95/100', maskedAadhaar: '**** **** 9012', completedJobs: 112, about: 'Waterproofing, exterior weather coats, and modern interior stencil finishes.' },
  { id: 6, workerId: 'WRK-1029', name: 'Kiran Naidu', skill: 'AC & Refrigerator Technician', exp: 6, rating: 4.88, reviews: 162, distance: '1.9 km', rate: '₹599', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.ac_tech, location: 'Rajahmundry Central', phone: '+91 98486 67890', email: 'kiran.ac@sahakarya.org', welfareCovered: true, tradeScore: '97/100', maskedAadhaar: '**** **** 2489', completedJobs: 175, about: 'Inverter AC gas charging, PCB diagnosis, and deep coil cleaning.' },
  { id: 7, workerId: 'WRK-PENDING', name: 'Imran Shaik', skill: 'Welder & Fabricator', exp: 8, rating: 4.70, reviews: 78, distance: '4.1 km', rate: '₹599', status: 'Pending', isOnline: false, photo: IMAGES.workerProfiles.welder, location: 'Industrial Estate, Rajahmundry', phone: '+91 98487 78901', email: 'imran.welder@sahakarya.org', welfareCovered: false, tradeScore: '94/100', maskedAadhaar: '**** **** 4892', completedJobs: 65, about: 'Arc & Argon welding, safety gate grills, and heavy fabrication.' },
  { id: 8, workerId: 'WRK-1031', name: 'Appa Rao', skill: 'Tractor & Agri Operator', exp: 11, rating: 4.92, reviews: 210, distance: '5.4 km', rate: '₹899', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.tractor_op, location: 'East Godavari Rural', phone: '+91 98488 89012', email: 'apparao.agri@sahakarya.org', welfareCovered: true, tradeScore: '99/100', maskedAadhaar: '**** **** 5521', completedJobs: 320, about: '4WD tractor operations, field rotavator, and irrigation pump maintenance.' },
  { id: 9, workerId: 'WRK-1032', name: 'Radha Kumari', skill: 'Elderly Caregiver', exp: 6, rating: 4.95, reviews: 130, distance: '2.0 km', rate: '₹599', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.caregiver, location: 'Danavaipeta', phone: '+91 98489 90123', email: 'radha.care@sahakarya.org', welfareCovered: true, tradeScore: '98/100', maskedAadhaar: '**** **** 1198', completedJobs: 145, about: 'Certified geriatric care aide, vital signs monitoring, and mobility assistance.' },
  { id: 10, workerId: 'WRK-1033', name: 'Venkatesh', skill: 'Solar & CCTV Specialist', exp: 5, rating: 4.80, reviews: 85, distance: '3.6 km', rate: '₹699', status: 'Verified', isOnline: true, photo: IMAGES.workerProfiles.solar_tech, location: 'Kakinada Smart City', phone: '+91 98480 01234', email: 'venkat.tech@sahakarya.org', welfareCovered: true, tradeScore: '96/100', maskedAadhaar: '**** **** 8823', completedJobs: 98, about: 'Rooftop solar PV alignment, micro-inverter setup, and IP camera networking.' }
];

let bookingsData = [
  { id: 'SHK-8921', service: 'Plumbing & Pipe Repair', worker: 'Ravi Kumar', workerSkill: 'Plumber', workerPhoto: IMAGES.workerProfiles.plumber, date: 'Today, 10:30 AM', address: 'Plot 42, Danavaipeta, Rajahmundry', amount: 599, status: 'On the Way', otp: '4821', paymentStatus: 'Paid', rating: null },
  { id: 'SHK-8910', service: 'AC & Refrigerator Repair', worker: 'Kiran Naidu', workerSkill: 'AC Technician', workerPhoto: IMAGES.workerProfiles.ac_tech, date: 'Yesterday', address: 'Subba Rao Colony, Kakinada', amount: 899, status: 'Completed', otp: '7102', paymentStatus: 'Paid', rating: 5 },
  { id: 'SHK-8890', service: 'Electrical & MCB Fix', worker: 'Suresh Babu', workerSkill: 'Electrician', workerPhoto: IMAGES.workerProfiles.electrician, date: '08 Sep 2026', address: 'Danavaipeta, Rajahmundry', amount: 399, status: 'Completed', otp: '1904', paymentStatus: 'Paid', rating: 5 }
];

let customerNotifications = [
  { id: 1, title: 'Artisan Dispatched', desc: 'Ravi Kumar is on the way for Plumbing Repair (ETA 12 mins).', time: '10 mins ago', unread: true },
  { id: 2, title: 'Booking Confirmed', desc: 'Your booking SHK-8921 has been confirmed with ₹60 contribution paid.', time: '20 mins ago', unread: false },
  { id: 3, title: 'Cooperative Announcement', desc: 'Monsoon Home Repair Support Initiative is now live across Rajahmundry.', time: 'Yesterday', unread: false }
];

let workerNotifications = [
  { id: 1, title: 'New Job Assigned', desc: 'New Plumbing Repair booked in Danavaipeta by Sita Devi.', time: '15 mins ago', unread: true },
  { id: 2, title: 'Payment Deposited', desc: '₹499 credited for Job #JOB-298.', time: '1 hour ago', unread: false },
  { id: 3, title: 'Training Reminder', desc: 'Digital Payments webinar starts today at 6:00 PM.', time: '3 hours ago', unread: false }
];

// Navigation State & History Stack
let currentRole = '';
let currentPage = 'dashboard';
let currentAuthScreen = ''; 
let currentCategory = null;
let currentSubService = null;
let currentServiceItem = null;
let selectedWorker = null;
let customerSignupStep = 1;
let settingsSubTab = 'main';

// User Profile with persistence
let currentUser = JSON.parse(localStorage.getItem('sahakarya_user')) || {
  name: 'Sita Devi',
  age: 34,
  gender: 'Female',
  phone: '+91 98480 12345',
  address: 'Plot 42, Danavaipeta, Rajahmundry, East Godavari - 533101',
  maskedAadhaar: '**** **** 4892',
  photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  city: 'Rajahmundry'
};

const navStack = [];

const R = document.getElementById('root');
const MODAL_ROOT = document.getElementById('modal-root');

function showToast(msg, icon = '✓') {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();
  const tDiv = document.createElement('div');
  tDiv.className = 'toast-msg';
  tDiv.innerHTML = \`<span style="font-size:18px">\${icon}</span> <span>\${msg}</span>\`;
  document.body.appendChild(tDiv);
  setTimeout(() => tDiv.remove(), 2800);
}

function openModal(title, bodyHtml, footerHtml = '') {
  MODAL_ROOT.innerHTML = \`
    <div class="modal-backdrop" onclick="if(event.target===this) closeModal()">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 style="font-size:18px;font-weight:800;color:var(--ink)">\${title}</h3>
          <button class="btn alt sm" style="padding:4px 10px;font-size:16px" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">\${bodyHtml}</div>
        \${footerHtml ? \`<div class="modal-footer">\${footerHtml}</div>\` : ''}
      </div>
    </div>
  \`;
}

function closeModal() {
  MODAL_ROOT.innerHTML = '';
}

// Global Back Button Handler
function handleGoBack() {
  if (navStack.length > 0) {
    const prevState = navStack.pop();
    currentRole = prevState.role || currentRole;
    currentPage = prevState.page || 'dashboard';
    currentAuthScreen = prevState.authScreen || '';
    currentCategory = prevState.category || null;
    currentSubService = prevState.subService || null;
    currentServiceItem = prevState.serviceItem || null;
    selectedWorker = prevState.worker || null;
    settingsSubTab = prevState.settingsSubTab || 'main';
    renderApp(false);
  } else {
    if (currentRole === 'customer' && (currentCategory || currentPage !== 'dashboard')) {
      currentCategory = null;
      currentSubService = null;
      currentServiceItem = null;
      selectedWorker = null;
      currentPage = 'dashboard';
      renderApp(false);
    } else if (currentRole) {
      renderRoleSelect();
    } else {
      renderSplash();
    }
  }
}

function pushState() {
  navStack.push({
    role: currentRole,
    page: currentPage,
    authScreen: currentAuthScreen,
    category: currentCategory,
    subService: currentSubService,
    serviceItem: currentServiceItem,
    worker: selectedWorker,
    settingsSubTab: settingsSubTab
  });
}

function navigate(role, page, options = {}) {
  pushState();
  currentRole = role;
  currentPage = page;
  currentAuthScreen = '';
  if (options.category !== undefined) currentCategory = options.category;
  if (options.subService !== undefined) currentSubService = options.subService;
  if (options.serviceItem !== undefined) currentServiceItem = options.serviceItem;
  if (options.worker !== undefined) selectedWorker = options.worker;
  if (options.settingsSubTab !== undefined) settingsSubTab = options.settingsSubTab;
  window.location.hash = \`#\${role}/\${page}\`;
  renderApp(false);
}

function openAuth(screen) {
  pushState();
  currentAuthScreen = screen;
  customerSignupStep = 1;
  renderApp(false);
}

function logout() {
  currentRole = '';
  currentPage = 'dashboard';
  currentAuthScreen = '';
  currentCategory = null;
  currentSubService = null;
  currentServiceItem = null;
  selectedWorker = null;
  navStack.length = 0;
  window.location.hash = '';
  renderRoleSelect();
}

function toggleCustomerDrawer(open) {
  const backdrop = document.getElementById('drawer-backdrop');
  const panel = document.getElementById('drawer-panel');
  if (open) {
    updateDrawerTexts();
    backdrop?.classList.add('open');
    panel?.classList.add('open');
  } else {
    backdrop?.classList.remove('open');
    panel?.classList.remove('open');
  }
}

function toggleInstantDrawer(open) {
  const drawer = document.getElementById('instant-drawer');
  if (open) {
    renderInstantServicesList();
    drawer?.classList.add('open');
  } else {
    drawer?.classList.remove('open');
  }
}

function updateDrawerTexts() {
  const navContainer = document.getElementById('drawer-nav-items');
  if (!navContainer) return;
  navContainer.innerHTML = \`
    <button class="drawer-nav-item \${currentPage==='dashboard'?'active':''}" onclick="toggleCustomerDrawer(false);navigate('customer','dashboard')">
      <span style="font-size:18px">🏠</span>
      <span>\${t('home')}</span>
    </button>
    <button class="drawer-nav-item \${currentPage==='history'?'active':''}" onclick="toggleCustomerDrawer(false);navigate('customer','history')">
      <span style="font-size:18px">📜</span>
      <span>\${t('history')}</span>
    </button>
    <button class="drawer-nav-item \${currentPage==='bookings'?'active':''}" onclick="toggleCustomerDrawer(false);navigate('customer','bookings')">
      <span style="font-size:18px">📋</span>
      <span>\${t('my_bookings')}</span>
    </button>
    <button class="drawer-nav-item \${currentPage==='settings'?'active':''}" onclick="toggleCustomerDrawer(false);navigate('customer','settings')">
      <span style="font-size:18px">⚙️</span>
      <span>\${t('settings')}</span>
    </button>
    <button class="drawer-nav-item \${currentPage==='contact'?'active':''}" onclick="toggleCustomerDrawer(false);navigate('customer','contact')">
      <span style="font-size:18px">📞</span>
      <span>\${t('contact_us')}</span>
    </button>
  \`;
}

function renderInstantServicesList() {
  const container = document.getElementById('instant-services-list');
  if (!container) return;
  container.innerHTML = INSTANT_15_SERVICES.map(s => \`
    <div class="card" style="padding:12px;cursor:pointer;border-color:var(--line);display:flex;flex-direction:column;justify-content:space-between" onclick="triggerInstantBooking('\${s.name}')">
      <div class="row" style="margin-bottom:8px">
        <span style="font-size:22px">\${s.icon}</span>
        <div style="font-size:13px;font-weight:700;line-height:1.3">\${s.name}</div>
      </div>
      <div class="between" style="font-size:11px;color:var(--primary);font-weight:700">
        <span>\${s.price}</span>
        <span class="pill accent sm" style="font-size:10px">15 min</span>
      </div>
    </div>
  \`).join('');
}

function triggerInstantBooking(serviceName) {
  toggleInstantDrawer(false);
  openPaymentModal(serviceName, 50, 'Auto-Assigned Verified Worker', true);
}
`;

fs.writeFileSync('c:\\Users\\HP\\OneDrive\\Desktop\\sahakarya\\build_app.js', htmlContent, 'utf8');
console.log('build_app.js base written.');
