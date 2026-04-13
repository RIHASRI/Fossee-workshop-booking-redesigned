import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0D1B2A;
    --navy2:  #162234;
    --navy3:  #1E2F42;
    --teal:   #0A7E72;
    --teal-h: #086860;
    --teal-l: #E0F4F2;
    --teal-m: #B3E5E0;
    --amber:  #E8870A;
    --amber-l:#FEF3E2;
    --amber-h:#C77308;
    --coral:  #E84855;
    --coral-l:#FDE8E9;
    --sky:    #2196F3;
    --sky-l:  #E3F2FD;
    --ink:    #0D1B2A;
    --ink2:   #2A3D52;
    --slate:  #4A6275;
    --mist:   #8DA3B5;
    --fog:    #B8C9D5;
    --ghost:  #E8EFF4;
    --snow:   #F4F8FA;
    --white:  #FFFFFF;
    --border: rgba(13,27,42,0.10);
    --border2: rgba(13,27,42,0.18);

    --r-xs: 6px; --r-sm: 10px; --r-md: 14px; --r-lg: 20px; --r-xl: 28px;
    --sh-sm: 0 1px 4px rgba(13,27,42,0.08);
    --sh-md: 0 4px 16px rgba(13,27,42,0.12), 0 1px 4px rgba(13,27,42,0.06);
    --sh-lg: 0 12px 36px rgba(13,27,42,0.16), 0 4px 8px rgba(13,27,42,0.08);
    --sh-xl: 0 24px 64px rgba(13,27,42,0.20);
    --tr: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --tr-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    --body: 'DM Sans', system-ui, sans-serif;
    --display: 'DM Serif Display', Georgia, serif;
    --nav-h: 68px;
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--body); background: var(--snow); color: var(--ink); min-height: 100vh; -webkit-font-smoothing: antialiased; }

  /* ── Navbar ── */
  .wb-nav {
    position: sticky; top: 0; z-index: 200;
    height: var(--nav-h);
    background: rgba(13,27,42,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center;
    padding: 0 1.25rem;
    gap: 0.75rem;
  }
  .nav-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .nav-logobox {
    width: 38px; height: 38px; border-radius: var(--r-sm);
    background: var(--teal);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nav-wordmark {
    font-family: var(--body); font-weight: 700; font-size: 1rem; color: #fff;
    letter-spacing: -0.01em;
  }
  .nav-wordmark em { font-style: normal; color: var(--amber); }
  .nav-spacer { flex: 1; }
  .nav-links { display: flex; align-items: center; gap: 0.125rem; }
  .nav-link {
    padding: 0.45rem 0.85rem; border-radius: var(--r-sm);
    font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.65);
    background: transparent; border: none; cursor: pointer;
    transition: background var(--tr), color var(--tr); white-space: nowrap;
  }
  .nav-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .nav-link.active { background: rgba(10,126,114,0.25); color: var(--teal-m); }
  .nav-signin {
    padding: 0.5rem 1.1rem; border-radius: var(--r-sm);
    background: var(--amber); color: var(--ink); font-weight: 700; font-size: 0.875rem;
    border: none; cursor: pointer; letter-spacing: 0.01em;
    transition: background var(--tr), transform var(--tr-spring);
  }
  .nav-signin:hover { background: var(--amber-h); transform: translateY(-1px); }
  .user-pill {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 99px; padding: 4px 12px 4px 4px; cursor: pointer;
    transition: background var(--tr);
  }
  .user-pill:hover { background: rgba(255,255,255,0.14); }
  .user-ava {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--teal); color: #fff;
    font-size: 0.75rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .user-name { font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.85); }
  .hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 40px; height: 40px; background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--r-sm); cursor: pointer; padding: 10px;
    flex-shrink: 0;
  }
  .hamburger span {
    display: block; width: 100%; height: 1.5px;
    background: #fff; border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  .mobile-menu {
    display: none; position: absolute; top: var(--nav-h); left: 0; right: 0;
    background: var(--navy); border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 0.75rem 1.25rem 1.25rem; flex-direction: column; gap: 0.25rem;
    box-shadow: var(--sh-lg); z-index: 199;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu .nav-link {
    color: rgba(255,255,255,0.7); font-size: 1rem; padding: 0.75rem 1rem;
    border-radius: var(--r-md);
  }
  .mobile-menu .nav-signin { margin-top: 0.5rem; width: 100%; padding: 0.85rem; font-size: 1rem; text-align: center; border-radius: var(--r-md); }
  .mobile-menu .user-pill { background: rgba(255,255,255,0.06); padding: 0.75rem 1rem; border-radius: var(--r-md); border: 1px solid rgba(255,255,255,0.1); }
  .mobile-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 0.5rem 0; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .wb-nav { position: relative; }
  }

  /* ── Hero ── */
  .hero {
    background: linear-gradient(145deg, var(--navy) 0%, var(--navy2) 60%, #0E2335 100%);
    position: relative; overflow: hidden;
    padding: 4rem 1.25rem 3.5rem;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 80% -10%, rgba(10,126,114,0.22) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at -10% 80%, rgba(232,135,10,0.12) 0%, transparent 60%);
  }
  .hero-grid { position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .hero-inner { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(10,126,114,0.2); border: 1px solid rgba(10,126,114,0.4);
    color: var(--teal-m); font-size: 0.775rem; font-weight: 600; letter-spacing: 0.07em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 99px;
    margin-bottom: 1.5rem;
  }
  .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal-m); animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.5; transform:scale(0.8) } }
  .hero h1 {
    font-family: var(--display); font-size: clamp(2.2rem, 6vw, 3.6rem);
    line-height: 1.1; color: #fff; margin-bottom: 1.25rem; font-weight: 400;
  }
  .hero h1 .accent { color: var(--amber); font-style: italic; }
  .hero-sub {
    font-size: clamp(0.95rem, 2vw, 1.1rem); color: rgba(255,255,255,0.6);
    line-height: 1.75; margin-bottom: 2rem; max-width: 540px;
  }
  .hero-actions { display: flex; gap: 0.875rem; flex-wrap: wrap; }
  .btn-hero-primary {
    padding: 0.875rem 1.875rem; border-radius: var(--r-md);
    background: var(--amber); color: var(--ink); font-weight: 700; font-size: 1rem;
    border: none; cursor: pointer; letter-spacing: 0.01em;
    transition: background var(--tr), transform var(--tr-spring), box-shadow var(--tr);
    box-shadow: 0 4px 16px rgba(232,135,10,0.35);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-hero-primary:hover { background: var(--amber-h); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,135,10,0.4); }
  .btn-hero-primary:active { transform: translateY(0); }
  .btn-hero-outline {
    padding: 0.875rem 1.875rem; border-radius: var(--r-md);
    background: transparent; color: rgba(255,255,255,0.8);
    border: 1.5px solid rgba(255,255,255,0.22); font-weight: 600; font-size: 1rem;
    cursor: pointer;
    transition: background var(--tr), border-color var(--tr), transform var(--tr-spring);
  }
  .btn-hero-outline:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.4); transform: translateY(-1px); }

  /* ── Stats strip ── */
  .stats-wrap { padding: 0 1.25rem; max-width: 1100px; margin: 0 auto; }
  .stats-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--sh-md);
    margin-top: -1.5rem; position: relative; z-index: 2;
  }
  .stat-cell {
    padding: 1.5rem 1rem; text-align: center;
    border-right: 1px solid var(--border);
    transition: background var(--tr);
  }
  .stat-cell:last-child { border-right: none; }
  .stat-cell:hover { background: var(--snow); }
  .stat-num {
    font-family: var(--display); font-size: 2rem; font-weight: 400; color: var(--ink);
    line-height: 1;
  }
  .stat-label { font-size: 0.78rem; color: var(--slate); margin-top: 5px; font-weight: 500; }
  @media (max-width: 600px) {
    .stats-strip { grid-template-columns: 1fr 1fr; }
    .stat-cell:nth-child(2) { border-right: none; }
    .stat-cell:nth-child(3) { border-top: 1px solid var(--border); }
    .stat-cell:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
  }

  /* ── Section ── */
  .section { padding: 2.5rem 1.25rem; max-width: 1100px; margin: 0 auto; }
  .section-header { display: flex; align-items: flex-end; gap: 1rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
  .section-label {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 4px;
  }
  .section-title { font-family: var(--display); font-size: 1.75rem; font-weight: 400; color: var(--ink); }
  .section-sub { font-size: 0.9rem; color: var(--slate); margin-top: 4px; line-height: 1.5; }
  .section-header-right { margin-left: auto; }

  /* ── Filter bar ── */
  .filter-bar { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center; }
  .search-wrap { position: relative; flex: 1; min-width: 220px; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--mist); pointer-events: none; }
  .search-input {
    width: 100%; padding: 0.75rem 0.875rem 0.75rem 2.75rem;
    border: 1.5px solid var(--border2); border-radius: var(--r-md);
    font-family: var(--body); font-size: 0.9rem; color: var(--ink);
    background: var(--white); outline: none;
    transition: border-color var(--tr), box-shadow var(--tr);
    box-shadow: var(--sh-sm);
  }
  .search-input::placeholder { color: var(--mist); }
  .search-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,126,114,0.12); }
  .chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
  .chip {
    padding: 0.45rem 1rem; border-radius: 99px;
    border: 1.5px solid var(--border2); background: var(--white);
    font-size: 0.8rem; font-weight: 600; color: var(--slate);
    cursor: pointer; transition: all var(--tr); white-space: nowrap;
    box-shadow: var(--sh-sm);
  }
  .chip:hover { border-color: var(--teal); color: var(--teal); background: var(--teal-l); }
  .chip.active { border-color: var(--teal); color: var(--teal); background: var(--teal-l); }

  /* ── Workshop grid ── */
  .ws-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 1.25rem;
  }

  /* ── Workshop Card ── */
  .ws-card {
    background: var(--white); border-radius: var(--r-xl);
    border: 1px solid var(--border); overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform var(--tr), box-shadow var(--tr), border-color var(--tr);
    cursor: default;
    box-shadow: var(--sh-sm);
  }
  .ws-card:hover { transform: translateY(-4px); box-shadow: var(--sh-lg); border-color: var(--border2); }
  .ws-card-top {
    padding: 1.25rem 1.25rem 0.875rem;
    display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem;
  }
  .ws-icon {
    width: 52px; height: 52px; border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; flex-shrink: 0; position: relative; overflow: hidden;
  }
  .ws-icon::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%);
  }
  .ws-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .badge {
    font-size: 0.7rem; font-weight: 700; padding: 3px 9px;
    border-radius: 99px; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap;
  }
  .badge-open     { background: var(--teal-l); color: var(--teal); }
  .badge-full     { background: var(--coral-l); color: var(--coral); }
  .badge-upcoming { background: var(--amber-l); color: var(--amber-h); }
  .badge-free     { background: var(--sky-l); color: var(--sky); }
  .ws-body { padding: 0 1.25rem; flex: 1; }
  .ws-title {
    font-family: var(--display); font-size: 1.1rem; font-weight: 400;
    color: var(--ink); margin-bottom: 4px; line-height: 1.3;
  }
  .ws-instructor {
    font-size: 0.8rem; color: var(--slate); margin-bottom: 0.875rem;
    display: flex; align-items: center; gap: 5px;
  }
  .ws-meta { display: flex; flex-direction: column; gap: 5px; margin-bottom: 0.875rem; }
  .ws-meta-row {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.82rem; color: var(--slate);
  }
  .ws-meta-row svg { color: var(--mist); flex-shrink: 0; }
  .ws-seats { margin-bottom: 0.875rem; }
  .seats-row { font-size: 0.77rem; color: var(--slate); display: flex; justify-content: space-between; margin-bottom: 5px; }
  .seats-track { height: 4px; background: var(--ghost); border-radius: 99px; overflow: hidden; }
  .seats-fill { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); }
  .ws-foot {
    padding: 1rem 1.25rem; border-top: 1px solid var(--ghost);
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
    background: var(--snow);
  }
  .ws-price { font-family: var(--display); font-size: 1.15rem; color: var(--ink); }
  .ws-price small { font-family: var(--body); font-size: 0.75rem; font-weight: 400; color: var(--slate); margin-left: 3px; }
  .btn-book {
    padding: 0.6rem 1.375rem; border-radius: var(--r-sm);
    background: var(--teal); color: #fff; font-weight: 700; font-size: 0.875rem;
    border: none; cursor: pointer;
    transition: background var(--tr), transform var(--tr-spring), box-shadow var(--tr);
    white-space: nowrap; box-shadow: 0 2px 8px rgba(10,126,114,0.28);
  }
  .btn-book:hover:not(:disabled) { background: var(--teal-h); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(10,126,114,0.35); }
  .btn-book:active:not(:disabled) { transform: translateY(0); }
  .btn-book:disabled { background: var(--ghost); color: var(--fog); cursor: not-allowed; box-shadow: none; }

  /* ── Skeleton ── */
  @keyframes shimmer { 0% { background-position: -600px 0 } 100% { background-position: 600px 0 } }
  .skel {
    border-radius: var(--r-sm);
    background: linear-gradient(90deg, var(--ghost) 25%, #dde5eb 50%, var(--ghost) 75%);
    background-size: 1200px 100%; animation: shimmer 1.6s infinite;
  }
  .skel-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); padding: 1.25rem;
    display: flex; flex-direction: column; gap: 0.75rem; min-height: 280px;
    box-shadow: var(--sh-sm);
  }

  /* ── How it works ── */
  .steps-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }
  .step-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); padding: 1.5rem;
    display: flex; flex-direction: column; gap: 0.875rem;
    box-shadow: var(--sh-sm);
    transition: transform var(--tr), box-shadow var(--tr);
  }
  .step-card:hover { transform: translateY(-3px); box-shadow: var(--sh-md); }
  .step-num-box {
    width: 38px; height: 38px; border-radius: var(--r-sm);
    background: var(--navy); color: var(--amber);
    font-family: var(--display); font-size: 1.1rem;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .step-title { font-weight: 700; font-size: 0.95rem; color: var(--ink); }
  .step-desc { font-size: 0.84rem; color: var(--slate); line-height: 1.65; }

  /* ── Booking Modal ── */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(13,27,42,0.6);
    backdrop-filter: blur(4px);
    display: flex; align-items: flex-end; justify-content: center;
    padding: 0; z-index: 300;
    animation: fadeIn 0.18s ease;
  }
  @media (min-width: 640px) {
    .modal-backdrop { align-items: center; padding: 1.5rem; }
  }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  .modal {
    background: var(--white); border-radius: var(--r-xl) var(--r-xl) 0 0;
    width: 100%; max-width: 520px; max-height: 92vh; overflow-y: auto;
    box-shadow: var(--sh-xl);
    animation: slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  @media (min-width: 640px) {
    .modal { border-radius: var(--r-xl); max-height: 90vh; }
  }
  @keyframes slideUp { from { transform: translateY(30px); opacity:0 } to { transform: translateY(0); opacity:1 } }
  .modal-handle { width: 36px; height: 4px; background: var(--ghost); border-radius: 99px; margin: 12px auto 0; }
  @media (min-width: 640px) { .modal-handle { display: none; } }
  .modal-hdr {
    padding: 1.25rem 1.5rem 1rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    border-bottom: 1px solid var(--ghost);
    position: sticky; top: 0; background: var(--white); z-index: 1;
  }
  .modal-hdr-left { display: flex; align-items: center; gap: 10px; }
  .modal-title { font-family: var(--display); font-size: 1.25rem; color: var(--ink); }
  .modal-close {
    width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--border2);
    background: var(--snow); color: var(--slate); cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    transition: background var(--tr), color var(--tr);
  }
  .modal-close:hover { background: var(--ghost); color: var(--ink); }
  .modal-bdy { padding: 1.25rem 1.5rem 1.75rem; }
  .modal-meta {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; margin-bottom: 1.5rem;
  }
  .meta-chip {
    background: var(--snow); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: 0.75rem;
  }
  .meta-chip-label { font-size: 0.7rem; font-weight: 700; color: var(--mist); text-transform: uppercase; letter-spacing: 0.06em; }
  .meta-chip-val { font-weight: 600; font-size: 0.9rem; color: var(--ink); margin-top: 3px; }

  /* ── Forms ── */
  .form-grp { margin-bottom: 0.875rem; }
  .form-lbl { display: block; font-size: 0.82rem; font-weight: 600; color: var(--slate); margin-bottom: 5px; }
  .form-inp {
    width: 100%; padding: 0.7rem 0.875rem;
    border: 1.5px solid var(--border2); border-radius: var(--r-md);
    font-family: var(--body); font-size: 0.9rem; color: var(--ink);
    background: var(--white); outline: none;
    transition: border-color var(--tr), box-shadow var(--tr);
  }
  .form-inp::placeholder { color: var(--fog); }
  .form-inp:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(10,126,114,0.1); }
  .form-inp.err { border-color: var(--coral); box-shadow: 0 0 0 3px rgba(232,72,85,0.1); }
  .form-err { font-size: 0.77rem; color: var(--coral); margin-top: 4px; display: flex; align-items: center; gap: 4px; }
  .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  @media (max-width: 420px) { .form-row-2 { grid-template-columns: 1fr; } }
  .form-submit {
    width: 100%; padding: 0.9rem; border-radius: var(--r-md);
    background: var(--navy); color: #fff; font-weight: 700; font-size: 1rem;
    border: none; cursor: pointer; margin-top: 0.625rem; letter-spacing: 0.01em;
    transition: background var(--tr), transform var(--tr-spring);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .form-submit:hover:not(:disabled) { background: var(--navy3); transform: translateY(-1px); }
  .form-submit:disabled { opacity: 0.55; cursor: not-allowed; }
  .success-wrap { text-align: center; padding: 2.5rem 1rem; }
  .success-ring {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--teal-l); border: 3px solid var(--teal-m);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem; font-size: 2rem; color: var(--teal);
  }
  .success-head { font-family: var(--display); font-size: 1.5rem; color: var(--ink); margin-bottom: 0.5rem; }
  .success-body { font-size: 0.9rem; color: var(--slate); line-height: 1.65; max-width: 340px; margin: 0 auto; }

  /* ── Tabs ── */
  .tabs { display: flex; border-bottom: 2px solid var(--ghost); margin-bottom: 1.5rem; overflow-x: auto; gap: 0; }
  .tab-btn {
    padding: 0.75rem 1.25rem; font-weight: 600; font-size: 0.9rem; color: var(--slate);
    background: none; border: none; cursor: pointer; white-space: nowrap;
    border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: color var(--tr), border-color var(--tr);
  }
  .tab-btn:hover { color: var(--ink); }
  .tab-btn.active { color: var(--teal); border-bottom-color: var(--teal); }

  /* ── Dashboard ── */
  .dash-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
    gap: 1rem; margin-bottom: 1.75rem;
  }
  .dash-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); padding: 1.375rem;
    display: flex; flex-direction: column; gap: 0.5rem;
    box-shadow: var(--sh-sm);
    transition: transform var(--tr), box-shadow var(--tr);
  }
  .dash-card:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
  .dash-icon {
    width: 44px; height: 44px; border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem; margin-bottom: 0.25rem;
  }
  .dash-num { font-family: var(--display); font-size: 2.2rem; font-weight: 400; color: var(--ink); line-height: 1; }
  .dash-label { font-size: 0.82rem; color: var(--slate); font-weight: 500; }
  .booking-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .booking-row {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 1rem 1.25rem;
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
    box-shadow: var(--sh-sm);
    transition: box-shadow var(--tr);
  }
  .booking-row:hover { box-shadow: var(--sh-md); }
  .booking-icon {
    width: 44px; height: 44px; border-radius: var(--r-md); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1.15rem;
  }
  .booking-info { flex: 1; min-width: 0; }
  .booking-title { font-weight: 700; font-size: 0.95rem; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .booking-sub { font-size: 0.8rem; color: var(--slate); margin-top: 2px; }
  .bstatus { font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 99px; text-transform: capitalize; letter-spacing: 0.02em; white-space: nowrap; }
  .bstatus-confirmed { background: var(--teal-l); color: var(--teal); }
  .bstatus-pending    { background: var(--amber-l); color: var(--amber-h); }
  .bstatus-completed  { background: var(--ghost); color: var(--slate); }

  /* ── Login page ── */
  .login-wrap { display: flex; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem 1.25rem; }
  .login-box {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); padding: 2.25rem; width: 100%; max-width: 420px;
    box-shadow: var(--sh-lg);
  }
  .login-logo-box {
    width: 56px; height: 56px; border-radius: var(--r-lg);
    background: var(--navy); display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem;
  }
  .login-headline { font-family: var(--display); font-size: 1.6rem; text-align: center; color: var(--ink); margin-bottom: 4px; }
  .login-sub { font-size: 0.85rem; color: var(--slate); text-align: center; margin-bottom: 1.5rem; }
  .login-forgot { text-align: center; margin-top: 0.875rem; font-size: 0.82rem; }
  .link-accent { color: var(--teal); text-decoration: none; font-weight: 600; }
  .link-accent:hover { text-decoration: underline; }

  /* ── Footer ── */
  .wb-footer { background: var(--navy); color: rgba(255,255,255,0.75); padding: 3rem 1.25rem 1.75rem; margin-top: 4rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2.5rem;
    padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 1.5rem;
  }
  @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr; gap: 2rem; } }
  .footer-brand { font-family: var(--body); font-weight: 700; font-size: 1rem; color: #fff; margin-bottom: 0.6rem; }
  .footer-brand em { font-style: normal; color: var(--amber); }
  .footer-desc { font-size: 0.84rem; line-height: 1.75; max-width: 280px; color: rgba(255,255,255,0.55); }
  .footer-col-head { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.875rem; }
  .footer-link { display: block; font-size: 0.875rem; color: rgba(255,255,255,0.6); text-decoration: none; padding: 3px 0; transition: color var(--tr); }
  .footer-link:hover { color: #fff; }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
  .footer-copy { font-size: 0.79rem; color: rgba(255,255,255,0.3); }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 500;
    background: var(--ink); color: #fff; font-size: 0.875rem; font-weight: 500;
    padding: 0.875rem 1.25rem; border-radius: var(--r-lg);
    box-shadow: var(--sh-xl); max-width: 320px;
    display: flex; align-items: center; gap: 10px;
    animation: toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
    border-left: 3px solid var(--teal);
  }
  .toast-icon { width: 22px; height: 22px; border-radius: 50%; background: var(--teal); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  @keyframes toastIn { from { transform: translateY(24px) scale(0.95); opacity:0 } to { transform: translateY(0) scale(1); opacity:1 } }

  /* ── Empty state ── */
  .empty { text-align: center; padding: 4rem 1rem; }
  .empty-icon { font-size: 2.75rem; margin-bottom: 1rem; }
  .empty h3 { font-family: var(--display); font-size: 1.25rem; color: var(--ink); margin-bottom: 0.5rem; }
  .empty p { font-size: 0.9rem; color: var(--slate); }

  /* ── Profile card ── */
  .profile-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--r-xl); padding: 1.75rem;
    box-shadow: var(--sh-sm);
  }
  .profile-hdr { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; }
  .profile-ava {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--navy));
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-family: var(--display); font-size: 1.5rem; flex-shrink: 0;
  }
  .profile-name { font-weight: 700; font-size: 1.05rem; color: var(--ink); }
  .profile-role { font-size: 0.84rem; color: var(--slate); margin-top: 2px; }
  .profile-field {
    display: flex; gap: 1rem; padding: 0.875rem 0;
    border-bottom: 1px solid var(--ghost); font-size: 0.9rem; flex-wrap: wrap;
  }
  .profile-field:last-child { border-bottom: none; }
  .profile-key { color: var(--slate); font-weight: 600; min-width: 130px; flex-shrink: 0; }
  .profile-val { color: var(--ink); }

  /* ── Focus ring ── */
  *:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }

  @media (max-width: 480px) {
    .hero { padding: 3rem 1.25rem 2.5rem; }
    .section { padding: 2rem 1.25rem; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const WORKSHOPS = [
  { id:1, title:"Python for Scientific Computing", instructor:"Dr. Anil Sharma",  topic:"Python",   date:"2026-04-22", time:"10:00 AM", duration:"3 hrs", location:"IIT Bombay, Mumbai",       seats:30, booked:24, status:"open",     icon:"🐍", color:"#E0F4F2" },
  { id:2, title:"Introduction to SCILAB",           instructor:"Prof. Priya Nair",  topic:"Scilab",   date:"2026-04-28", time:"2:00 PM",  duration:"4 hrs", location:"NIT Trichy",                seats:40, booked:40, status:"full",     icon:"📊", color:"#E3F2FD" },
  { id:3, title:"OpenFOAM for CFD Beginners",       instructor:"Dr. Rajan Mehta",   topic:"OpenFOAM", date:"2026-05-05", time:"9:00 AM",  duration:"6 hrs", location:"BITS Pilani, Goa",          seats:25, booked:8,  status:"open",     icon:"🌊", color:"#E0F4F2" },
  { id:4, title:"Advanced MATLAB Workshop",         instructor:"Dr. Sunita Gupta",  topic:"MATLAB",   date:"2026-05-12", time:"11:00 AM", duration:"5 hrs", location:"Anna University, Chennai",  seats:35, booked:20, status:"open",     icon:"📐", color:"#FEF3E2" },
  { id:5, title:"QGIS & GIS Mapping",               instructor:"Prof. Kavya Reddy", topic:"QGIS",     date:"2026-05-20", time:"10:30 AM", duration:"4 hrs", location:"JNTU Hyderabad",            seats:50, booked:12, status:"upcoming", icon:"🗺️", color:"#FDE8E9" },
  { id:6, title:"R for Data Analysis",              instructor:"Dr. Mohan Das",     topic:"R",        date:"2026-06-01", time:"1:00 PM",  duration:"3 hrs", location:"IISc Bangalore",            seats:30, booked:5,  status:"upcoming", icon:"📈", color:"#F3E8FF" },
];

const CATEGORIES = ["All","Python","Scilab","OpenFOAM","MATLAB","QGIS","R"];

const MY_BOOKINGS = [
  { id:1, title:"Python for Scientific Computing", date:"22 Apr 2026", time:"10:00 AM", status:"confirmed", icon:"🐍", color:"#E0F4F2" },
  { id:2, title:"Introduction to SCILAB",           date:"15 Mar 2026", time:"2:00 PM",  status:"completed", icon:"📊", color:"#E3F2FD" },
  { id:3, title:"Advanced MATLAB Workshop",         date:"12 May 2026", time:"11:00 AM", status:"pending",   icon:"📐", color:"#FEF3E2" },
];

// ─── Icon helpers ─────────────────────────────────────────────────────────────
const I = ({ d, size=16, className="" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {d}
  </svg>
);
const CalIcon  = ({ size }) => <I size={size} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />;
const ClkIcon  = ({ size }) => <I size={size} d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>} />;
const MapIcon  = ({ size }) => <I size={size} d={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>} />;
const UsrIcon  = ({ size }) => <I size={size} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const SchIcon  = ({ size }) => <I size={size} d={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />;
const ChkIcon  = ({ size }) => <I size={size} d={<polyline points="20 6 9 17 4 12"/>} />;
const XIcon    = ({ size }) => <I size={size} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const ArrIcon  = ({ size }) => <I size={size} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <nav className="wb-nav">
        <a className="nav-brand" href="#" onClick={e => { e.preventDefault(); setPage("home"); close(); }}>
          <div className="nav-logobox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <span className="nav-wordmark">FOSSEE <em>Workshops</em></span>
        </a>
        <div className="nav-spacer" />
        <div className="nav-links">
          <button className={`nav-link${page==="home"?" active":""}`}      onClick={() => setPage("home")}>Browse</button>
          <button className={`nav-link${page==="dashboard"?" active":""}`} onClick={() => setPage("dashboard")}>My Bookings</button>
          {user
            ? <div className="user-pill" onClick={onLogout} title="Sign out" role="button" tabIndex={0}>
                <div className="user-ava">{user[0].toUpperCase()}</div>
                <span className="user-name">{user}</span>
              </div>
            : <button className="nav-signin" onClick={() => setPage("login")}>Sign In</button>
          }
        </div>
        <button className={`hamburger${open?" open":""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu${open?" open":""}`}>
        <button className="nav-link" onClick={() => { setPage("home"); close(); }}>Browse Workshops</button>
        <button className="nav-link" onClick={() => { setPage("dashboard"); close(); }}>My Bookings</button>
        <div className="mobile-divider" />
        {user
          ? <button className="nav-link" onClick={() => { onLogout(); close(); }}>Sign Out ({user})</button>
          : <button className="nav-signin" onClick={() => { setPage("login"); close(); }}>Sign In</button>
        }
      </div>
    </>
  );
}

// ─── Workshop Card ────────────────────────────────────────────────────────────
function WorkshopCard({ w, onBook }) {
  const pct = Math.round((w.booked / w.seats) * 100);
  const fmtDate = new Date(w.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
  const barColor = pct >= 95 ? "var(--coral)" : pct >= 70 ? "var(--amber)" : "var(--teal)";
  return (
    <article className="ws-card" role="article" aria-label={w.title}>
      <div className="ws-card-top">
        <div className="ws-icon" style={{ background: w.color }}>{w.icon}</div>
        <div className="ws-badges">
          {w.status==="open"     && <span className="badge badge-open">Open</span>}
          {w.status==="full"     && <span className="badge badge-full">Full</span>}
          {w.status==="upcoming" && <span className="badge badge-upcoming">Upcoming</span>}
          <span className="badge badge-free">Free</span>
        </div>
      </div>
      <div className="ws-body">
        <div className="ws-title">{w.title}</div>
        <div className="ws-instructor"><UsrIcon size={12} /> {w.instructor}</div>
        <div className="ws-meta">
          <div className="ws-meta-row"><CalIcon size={14} /> {fmtDate}</div>
          <div className="ws-meta-row"><ClkIcon size={14} /> {w.time} · {w.duration}</div>
          <div className="ws-meta-row"><MapIcon size={14} /> {w.location}</div>
        </div>
        <div className="ws-seats">
          <div className="seats-row">
            <span>{w.seats - w.booked} seats available</span>
            <span>{w.booked}/{w.seats}</span>
          </div>
          <div className="seats-track">
            <div className="seats-fill" style={{ width:`${pct}%`, background: barColor }} />
          </div>
        </div>
      </div>
      <div className="ws-foot">
        <div className="ws-price">Free<small>workshop</small></div>
        <button
          className="btn-book"
          onClick={() => onBook(w)}
          disabled={w.status==="full"}
          aria-label={`Book ${w.title}`}
        >
          {w.status==="full" ? "Full" : "Book Now"}
        </button>
      </div>
    </article>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="skel-card">
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div className="skel" style={{ width:52, height:52, borderRadius:14 }} />
        <div className="skel" style={{ width:60, height:22, borderRadius:99 }} />
      </div>
      <div className="skel" style={{ height:22, width:"80%", borderRadius:8 }} />
      <div className="skel" style={{ height:14, width:"50%", borderRadius:6 }} />
      <div className="skel" style={{ height:14, width:"70%", borderRadius:6 }} />
      <div className="skel" style={{ height:14, width:"65%", borderRadius:6 }} />
      <div style={{ marginTop:"auto" }}>
        <div className="skel" style={{ height:6, borderRadius:99 }} />
      </div>
      <div className="skel" style={{ height:42, borderRadius:10 }} />
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ workshop: w, onClose, onSuccess }) {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", college:"", dept:"", students:"1" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy]     = useState(false);
  const [done, setDone]     = useState(false);

  const set = (k, v) => { setForm(f => ({...f, [k]:v})); setErrors(e => ({...e, [k]:""})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                   e.name    = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))    e.email   = "Valid email address required";
    if (!form.phone.match(/^[6-9]\d{9}$/))                  e.phone   = "Valid 10-digit mobile number";
    if (!form.college.trim())                                e.college = "Institution name required";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setBusy(true);
    setTimeout(() => { setBusy(false); setDone(true); }, 1400);
  };

  const fmtDate = new Date(w.date).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" });

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-handle" />
        <div className="modal-hdr">
          <div className="modal-hdr-left">
            <span style={{ fontSize:22 }}>{w.icon}</span>
            <span id="modal-title" className="modal-title">{done ? "Booking Confirmed!" : "Book Workshop"}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal"><XIcon size={16} /></button>
        </div>

        <div className="modal-bdy">
          {done ? (
            <div className="success-wrap">
              <div className="success-ring"><ChkIcon size={28} /></div>
              <div className="success-head">You're registered!</div>
              <p className="success-body">A confirmation has been sent to <strong>{form.email}</strong>. See you at <em>{w.title}</em> on {fmtDate}!</p>
              <button className="form-submit" style={{ marginTop:"1.75rem" }} onClick={() => { onClose(); onSuccess(w); }}>
                Done <ArrIcon size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="modal-meta">
                {[["Date",fmtDate],["Time",w.time],["Venue",w.location],["Seats Left",`${w.seats-w.booked} / ${w.seats}`]].map(([l,v]) => (
                  <div className="meta-chip" key={l}>
                    <div className="meta-chip-label">{l}</div>
                    <div className="meta-chip-val">{v}</div>
                  </div>
                ))}
              </div>

              <div className="form-row-2">
                <div className="form-grp">
                  <label className="form-lbl">Full Name *</label>
                  <input className={`form-inp${errors.name?" err":""}`} value={form.name} placeholder="Arjun Kumar" onChange={e=>set("name",e.target.value)} />
                  {errors.name && <div className="form-err">{errors.name}</div>}
                </div>
                <div className="form-grp">
                  <label className="form-lbl">Email *</label>
                  <input className={`form-inp${errors.email?" err":""}`} type="email" value={form.email} placeholder="arjun@college.ac.in" onChange={e=>set("email",e.target.value)} />
                  {errors.email && <div className="form-err">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-grp">
                  <label className="form-lbl">Mobile Number *</label>
                  <input className={`form-inp${errors.phone?" err":""}`} value={form.phone} placeholder="9876543210" onChange={e=>set("phone",e.target.value)} maxLength={10} />
                  {errors.phone && <div className="form-err">{errors.phone}</div>}
                </div>
                <div className="form-grp">
                  <label className="form-lbl">No. of Students</label>
                  <input className="form-inp" type="number" min="1" max="50" value={form.students} onChange={e=>set("students",e.target.value)} />
                </div>
              </div>

              <div className="form-grp">
                <label className="form-lbl">Institution *</label>
                <input className={`form-inp${errors.college?" err":""}`} value={form.college} placeholder="IIT / NIT / State University…" onChange={e=>set("college",e.target.value)} />
                {errors.college && <div className="form-err">{errors.college}</div>}
              </div>

              <div className="form-grp">
                <label className="form-lbl">Department (optional)</label>
                <input className="form-inp" value={form.dept} placeholder="Computer Science, Mechanical…" onChange={e=>set("dept",e.target.value)} />
              </div>

              <button className="form-submit" onClick={submit} disabled={busy}>
                {busy ? "Confirming…" : <><span>Confirm Booking</span><ArrIcon size={16} /></>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
function HomePage({ onBook }) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

  const filtered = WORKSHOPS.filter(w => {
    const matchCat    = category === "All" || w.topic === category;
    const q           = search.toLowerCase();
    const matchSearch = !search || w.title.toLowerCase().includes(q) || w.location.toLowerCase().includes(q) || w.instructor.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-dot" />
            FOSSEE · Free &amp; Open Source for Education
          </div>
          <h1>
            Book Hands-on<br />
            <span className="accent">FOSS Workshops</span><br />
            at Your College
          </h1>
          <p className="hero-sub">
            Coordinators can request expert-led workshops in Python, Scilab, MATLAB, OpenFOAM &amp; more — completely free for students across India.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => document.getElementById("workshops-section")?.scrollIntoView({ behavior:"smooth" })}>
              Browse Workshops <ArrIcon size={16} />
            </button>
            <button className="btn-hero-outline">Propose a Date</button>
          </div>
        </div>
      </section>

      {/* Stats strip — floats up over hero */}
      <div className="stats-wrap">
        <div className="stats-strip">
          {[["500+","Workshops Held"],["12,000+","Students Trained"],["200+","Colleges"],["6","Software Tools"]].map(([n,l]) => (
            <div className="stat-cell" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops section */}
      <section className="section" id="workshops-section" style={{ paddingTop:"2.5rem" }}>
        <div className="section-header">
          <div>
            <div className="section-label">Available Now</div>
            <div className="section-title">Upcoming Workshops</div>
            <div className="section-sub">{filtered.length} workshop{filtered.length!==1?"s":""} found</div>
          </div>
        </div>

        <div className="filter-bar">
          <div className="search-wrap">
            <span className="search-icon"><SchIcon size={16} /></span>
            <input
              className="search-input"
              placeholder="Search by title, city, instructor…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search workshops"
            />
          </div>
          <div className="chips">
            {CATEGORIES.map(c => (
              <button key={c} className={`chip${category===c?" active":""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="ws-grid">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <h3>No workshops found</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <div className="ws-grid">
            {filtered.map(w => <WorkshopCard key={w.id} w={w} onBook={onBook} />)}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-label">Process</div>
            <div className="section-title">How It Works</div>
            <div className="section-sub">Four simple steps to get a FOSSEE workshop at your institution</div>
          </div>
        </div>
        <div className="steps-row">
          {[
            ["1","Browse & Choose",    "Find a workshop that matches your curriculum needs and available dates."],
            ["2","Request & Book",     "Fill in your institution details and preferred workshop date."],
            ["3","Get Confirmation",   "The instructor reviews and accepts your request within 3–5 days."],
            ["4","Host the Workshop",  "Facilitate the session at your campus — fully guided and free!"],
          ].map(([n,t,d]) => (
            <div className="step-card" key={n}>
              <div className="step-num-box">{n}</div>
              <div className="step-title">{t}</div>
              <div className="step-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Dashboard page ───────────────────────────────────────────────────────────
function DashboardPage() {
  const [tab, setTab] = useState("bookings");
  return (
    <div className="section">
      <div style={{ marginBottom:"1.75rem" }}>
        <div className="section-label">Overview</div>
        <div className="section-title">My Dashboard</div>
        <div className="section-sub">Track your workshop bookings and activity</div>
      </div>

      <div className="dash-grid">
        {[
          { icon:"📚", color:"#E0F4F2", num:3, label:"Total Bookings" },
          { icon:"✅", color:"#E3F2FD", num:1, label:"Completed" },
          { icon:"⏳", color:"#FEF3E2", num:1, label:"Upcoming" },
          { icon:"🏅", color:"#FDE8E9", num:2, label:"Certificates" },
        ].map(d => (
          <div className="dash-card" key={d.label}>
            <div className="dash-icon" style={{ background:d.color }}>{d.icon}</div>
            <div className="dash-num">{d.num}</div>
            <div className="dash-label">{d.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {[["bookings","My Bookings"],["profile","Profile"]].map(([k,l]) => (
          <button key={k} className={`tab-btn${tab===k?" active":""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "bookings" && (
        <div className="booking-list">
          {MY_BOOKINGS.map(b => (
            <div className="booking-row" key={b.id}>
              <div className="booking-icon" style={{ background:b.color }}>{b.icon}</div>
              <div className="booking-info">
                <div className="booking-title">{b.title}</div>
                <div className="booking-sub">{b.date} · {b.time}</div>
              </div>
              <span className={`bstatus bstatus-${b.status}`}>{b.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "profile" && (
        <div className="profile-card">
          <div className="profile-hdr">
            <div className="profile-ava">A</div>
            <div>
              <div className="profile-name">Arjun Kumar</div>
              <div className="profile-role">Coordinator · IIT Bombay</div>
            </div>
          </div>
          {[
            ["Full Name","Arjun Kumar"],
            ["Email","arjun.kumar@iitb.ac.in"],
            ["Mobile","9876543210"],
            ["Institution","IIT Bombay"],
            ["Department","Computer Science & Engineering"],
          ].map(([k,v]) => (
            <div className="profile-field" key={k}>
              <span className="profile-key">{k}</span>
              <span className="profile-val">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Login / Register page ────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [tab,     setTab]     = useState("login");
  const [form,    setForm]    = useState({ name:"", email:"", password:"", confirm:"" });
  const [errors,  setErrors]  = useState({});
  const [busy,    setBusy]    = useState(false);
  const set = (k, v) => { setForm(f => ({...f,[k]:v})); setErrors(e => ({...e,[k]:""})); };

  const submit = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email    = "Valid email required";
    if (form.password.length < 6)                         e.password = "Minimum 6 characters";
    if (tab === "register") {
      if (!form.name.trim())              e.name    = "Name required";
      if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    }
    if (Object.keys(e).length) { setErrors(e); return; }
    setBusy(true);
    setTimeout(() => { setBusy(false); onLogin(form.name || form.email.split("@")[0]); }, 1200);
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <div className="login-headline">FOSSEE Workshops</div>
        <div className="login-sub">{tab==="login" ? "Sign in to book workshops" : "Create your free account"}</div>

        <div className="tabs">
          <button className={`tab-btn${tab==="login"?" active":""}`}    onClick={() => setTab("login")}>Sign In</button>
          <button className={`tab-btn${tab==="register"?" active":""}`} onClick={() => setTab("register")}>Register</button>
        </div>

        {tab === "register" && (
          <div className="form-grp">
            <label className="form-lbl">Full Name *</label>
            <input className={`form-inp${errors.name?" err":""}`} value={form.name} placeholder="Your name" onChange={e=>set("name",e.target.value)} />
            {errors.name && <div className="form-err">{errors.name}</div>}
          </div>
        )}
        <div className="form-grp">
          <label className="form-lbl">Email *</label>
          <input className={`form-inp${errors.email?" err":""}`} type="email" value={form.email} placeholder="you@college.ac.in" onChange={e=>set("email",e.target.value)} />
          {errors.email && <div className="form-err">{errors.email}</div>}
        </div>
        <div className="form-grp">
          <label className="form-lbl">Password *</label>
          <input className={`form-inp${errors.password?" err":""}`} type="password" value={form.password} placeholder="••••••" onChange={e=>set("password",e.target.value)} />
          {errors.password && <div className="form-err">{errors.password}</div>}
        </div>
        {tab === "register" && (
          <div className="form-grp">
            <label className="form-lbl">Confirm Password *</label>
            <input className={`form-inp${errors.confirm?" err":""}`} type="password" value={form.confirm} placeholder="••••••" onChange={e=>set("confirm",e.target.value)} />
            {errors.confirm && <div className="form-err">{errors.confirm}</div>}
          </div>
        )}
        <button className="form-submit" onClick={submit} disabled={busy}>
          {busy ? "Please wait…" : <><span>{tab==="login" ? "Sign In" : "Create Account"}</span><ArrIcon size={16} /></>}
        </button>
        {tab === "login" && (
          <div className="login-forgot">
            <a href="#" className="link-accent">Forgot your password?</a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="wb-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">FOSSEE <em>Workshops</em></div>
            <p className="footer-desc">Free/Libre and Open Source Software for Education — promoting FOSS tools in academic institutions across India.</p>
          </div>
          <div>
            <div className="footer-col-head">Quick Links</div>
            {["Browse Workshops","Book a Workshop","Statistics","About FOSSEE"].map(l => <a key={l} className="footer-link" href="#">{l}</a>)}
          </div>
          <div>
            <div className="footer-col-head">Support</div>
            {["Contact Us","FAQ","Instructor Login","Report Issue"].map(l => <a key={l} className="footer-link" href="#">{l}</a>)}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 FOSSEE, IIT Bombay. All rights reserved.</div>
          <div className="footer-copy">
            <a className="footer-link" href="#" style={{ display:"inline" }}>Privacy</a>
            {" · "}
            <a className="footer-link" href="#" style={{ display:"inline" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,       setPage]       = useState("home");
  const [user,       setUser]       = useState(null);
  const [bookingWS,  setBookingWS]  = useState(null);
  const [toast,      setToast]      = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const handleBook = ws => {
    if (!user) { setPage("login"); return; }
    setBookingWS(ws);
  };

  const handleLogin = name => {
    setUser(name); setPage("home");
    showToast(`Welcome, ${name}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast("Signed out successfully");
  };

  const handleBookSuccess = ws => {
    setBookingWS(null);
    showToast(`Booking confirmed for "${ws.title}"!`);
  };

  return (
    <>
      <style>{css}</style>
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />

      <main>
        {page === "home"      && <HomePage onBook={handleBook} />}
        {page === "dashboard" && (user ? <DashboardPage /> : <LoginPage onLogin={handleLogin} />)}
        {page === "login"     && <LoginPage onLogin={handleLogin} />}
      </main>

      <Footer />

      {bookingWS && (
        <BookingModal
          workshop={bookingWS}
          onClose={() => setBookingWS(null)}
          onSuccess={handleBookSuccess}
        />
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          <div className="toast-icon"><ChkIcon size={12} /></div>
          {toast}
        </div>
      )}
    </>
  );
}
