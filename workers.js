const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="color-scheme" content="light dark">
    <meta name="theme-color" content="#f3edfb">
    <title>RENVDER NAV</title>
    <link id="favicon-link" rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23a855f7%3Bstop-opacity%3A1%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%237e22ce%3Bstop-opacity%3A1%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22url%28%23grad%29%22%2F%3E%3Cpolyline%20points%3D%2234%2C40%2060%2C64%2034%2C88%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%2211%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Crect%20x%3D%2268%22%20y%3D%2282%22%20width%3D%2230%22%20height%3D%2211%22%20rx%3D%222%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E">
    <script>
    (function () {
        try {
            var c = JSON.parse(localStorage.getItem('logo_cache') || 'null');
            if (c && c.f) {
                var l = document.getElementById('favicon-link');
                if (l) l.href = c.f;
            }
        } catch (e) {}
    })();
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <noscript><link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet"></noscript>
    <style>
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.6); }

        .loading-spinner-track { border: 4px solid #e9d5ff; }
        .dark .loading-spinner-track { border-color: #2a1b42; }
        .loading-spinner-arc { border: 4px solid transparent; border-top-color: #a855f7; }
        .dark .loading-spinner-arc { border-top-color: #c084fc; }
        .icon-spinner { border: 2px solid #ddd6fe; border-top-color: #a855f7; }
        .dark .icon-spinner { border-color: #3b2354; border-top-color: #c084fc; }

        @media (max-width: 640px) {
            ::-webkit-scrollbar { display: none; }
            * { scrollbar-width: none; /* Firefox */ }
        }

        .card.dragging {
            opacity: 0.8;
            transform: scale(1.05);
            border: 2px dashed #a855f7;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            z-index: 50;
            position: relative;
        }

        /* Phones must not zoom (v33): double-taps on non-link spots (gaps,
           titles, margins) triggered the browser default zoom, and the user
           reported the page jumping to a zoomed state mid-tap. meta caps the
           viewport and this blocks pinch/double-tap gestures on iOS 13–16,
           where Apple ignores user-scalable. Vertical scroll stays. */
        html, body { touch-action: pan-y; }

        .edit-mode .card {
            /* touch-action: none; */
            touch-action: pan-y;
        }

        body.edit-mode .card,
        body.edit-mode .card:hover {
            transform: none !important;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
        }

        html.dark body.edit-mode .card,
        html.dark body.edit-mode .card:hover {
            box-shadow: none !important;
            border-color: rgba(51, 65, 85, 0.5) !important;
        }

        .add-card-placeholder {
            pointer-events: auto !important;
            z-index: 10;
        }

        .card-clone-dragging {
            pointer-events: none !important; /* Key: let touch pass through the clone */
            z-index: 9999 !important;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .dropdown-enter {
            animation: dropdown-in 0.2s ease-out forwards;
        }
        @keyframes dropdown-in {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .overlay-hidden {
            opacity: 0;
            pointer-events: none;
        }
        .overlay-visible {
            opacity: 1;
            pointer-events: auto;
        }
        .dialog-scale-hidden {
            transform: scale(0.95);
            opacity: 0;
        }
        .dialog-scale-visible {
            transform: scale(1);
            opacity: 1;
        }

        .section-anchor {
            scroll-margin-top: 160px;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-transition: background-color 99999s ease-out;
            -webkit-transition-delay: 99999s;
            -webkit-text-fill-color: #3b2354 !important;
        }

        html.dark input:-webkit-autofill,
        html.dark input:-webkit-autofill:hover,
        html.dark input:-webkit-autofill:focus,
        html.dark input:-webkit-autofill:active {
            -webkit-text-fill-color: #DDD6FE !important;
            box-shadow: 0 0 0px 1000px #170a29 inset !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        #custom-tooltip {
            z-index: 100;
            transition: opacity 0.1s ease-in-out;
        }

        .card-status-tag {
            display: none;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            font-weight: 500;
            line-height: 1.4;
            padding: 2px 8px;
            border-radius: 9999px;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.28s ease;
        }
        .card-status-tag.visible {
            display: inline-flex;
            opacity: 1;
        }
        .card-status-tag.checking {
            background: rgba(234, 179, 8, 0.15);
            color: #b45309;
        }
        html.dark .card-status-tag.checking {
            color: #fbbf24;
        }
        .card-status-tag.online {
            background: rgba(34, 197, 94, 0.15);
            color: #16a34a;
        }
        html.dark .card-status-tag.online {
            color: #4ade80;
            text-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
        }
        /* Slightly slow latency (300–1000ms): orange */
        .card-status-tag.slow {
            background: rgba(249, 115, 22, 0.15);
            color: #ea580c;
        }
        html.dark .card-status-tag.slow {
            color: #fb923c;
        }
        .card-status-tag.offline {
            background: rgba(239, 68, 68, 0.15);
            color: #dc2626;
        }
        html.dark .card-status-tag.offline {
            color: #f87171;
        }

        /* ================= Cyberpunk Terminal Theme ================= */
        html.dark body {
            background-color: #0a0414;
        }
        body {
            letter-spacing: 0.01em;
        }
        /* Subtle purple scanlines + grid, dark mode only.
           iOS/iPad WebKit fix: the pattern is painted as the BODY background
           (background-attachment: local), so it rides with the content as a
           normal GPU-composited layer. The old fixed full-screen ::before with
           mix-blend-mode: screen forced WebKit to repaint in tiled strips, and
           the 42px grid phase visibly jumped in and out of alignment while
           scrolling / smooth-scrolling to anchors. Alphas are halved because
           the old overlay carried opacity 0.5. */
        html.dark body {
            background-image:
                repeating-linear-gradient(0deg, rgba(168,85,247,0.025) 0px, rgba(168,85,247,0.025) 1px, transparent 1px, transparent 3px),
                linear-gradient(rgba(168,85,247,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.035) 1px, transparent 1px);
            background-size: auto, 42px 42px, 42px 42px;
            background-attachment: local, local, local;
        }

        /* iOS-friendly glow blobs: pre-rendered radial gradients replace the
           blur-[150px]/blur-[120px] filters, which were heavy main-thread
           repaint sources on iPad. */
        .bg-blob-a { background: radial-gradient(closest-side, rgba(110,231,183,0.28), rgba(110,231,183,0) 78%); }
        .bg-blob-b { background: radial-gradient(closest-side, rgba(147,197,253,0.28), rgba(147,197,253,0) 78%); }
        html.dark .bg-blob-a { background: radial-gradient(closest-side, rgba(99,102,241,0.16), rgba(99,102,241,0) 78%); }
        html.dark .bg-blob-b { background: radial-gradient(closest-side, rgba(147,51,234,0.16), rgba(147,51,234,0) 78%); }

        /* Ultrawide ("fish-screen") full-fill: scale the WHOLE UI by percentage.
           zoom scales cards, text, icons, spacing and the top bar together, so
           filling the screen never means "wide canvas, tiny widgets". Media
           queries evaluate in the zoomed layout viewport, so the stages
           cascade self-consistently (each zoom shrinks the layout width and
           only the next stage that still matches applies). The max-w-7xl caps
           (nav inner + main) are widened via higher-specificity selectors;
           mobile layouts are untouched (min-width 1700 never matches). */
        @media (min-width: 1700px) {
            html { zoom: 1.25; }
            #topnav-inner, main.max-w-7xl { max-width: min(92vw, 1600px); }
        }
        @media (min-width: 2200px) {
            html { zoom: 1.35; }
            #topnav-inner, main.max-w-7xl { max-width: min(92vw, 2300px); }
            /* Card view tops out at xl:grid-cols-5 in the precompiled Tailwind CSS;
               extend to 6 columns on ultrawide (also enlarges APP-view cells,
               consistent with the overall scale-up). */
            .card-container { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
        }
        @media (min-width: 2700px) {
            html { zoom: 1.45; }
            #topnav-inner, main.max-w-7xl { max-width: min(92vw, 2500px); }
        }

        /* Touch devices (pointer: coarse): tapping the search bar pops an ugly
           emerald focus ring around the whole shell. Kill the ring on touch —
           the shadow + lift animation remain as focus feedback. Desktop
           keyboard users keep the ring (accessibility). The ID selector beats
           the precompiled Tailwind .focus-within\:ring-2 class. */
        @media (pointer: coarse) {
            #search-shell:focus-within {
                --tw-ring-shadow: 0 0 #0000;
                --tw-ring-offset-shadow: 0 0 #0000;
            }
        }

        /* iOS WebKit (Safari / in-app browsers): text inputs get a native
           purple focus box from the user agent (iOS 15+) which Tailwind's
           outline-none cannot suppress. Dropping -webkit-appearance removes
           the UA decoration; the focus ring then follows our own CSS. The
           @supports query scopes this to WebKit only — desktop unaffected. */
        @supports (-webkit-touch-callout: none) {
            #search-input {
                -webkit-appearance: none;
            }
            #search-input:focus {
                outline: none;
            }
        }

        /* Classes added after the tw-compiled snapshot: plain-CSS equivalents
           so they actually apply (Tailwind prebuild cannot grow at runtime). */
        .leading-snug { line-height: 1.375; }
        .break-words { overflow-wrap: break-word; }
        .shrink-0 { flex-shrink: 0; }
        .items-start { align-items: flex-start; }
        /* Card color tints (v24): the star feature was dropped; card colors
           are subtle 135deg gradients + matching border tints, chosen from
           the editor swatches. Pure CSS so no Tailwind rebuild is needed. */
        .color-swatch {
            width: 28px;
            height: 28px;
            border-radius: 9999px;
            border: 2px solid rgba(148,163,184,.35);
            cursor: pointer;
            padding: 0;
            transition: box-shadow .2s, border-color .2s;
        }
        .color-swatch.sel {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99,102,241,.35);
        }
        html.dark .color-swatch { border-color: rgba(100,116,139,.45); }
        html.dark .color-swatch.sel {
            border-color: #818cf8;
            box-shadow: 0 0 0 3px rgba(129,140,248,.4);
        }
        #color-picker { flex-wrap: wrap; }
        /* Logo customization (v25): preset gallery tiles + selected ring. */
        .logo-preset {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid rgba(148,163,184,.35);
            color: white;
            transition: box-shadow .2s, transform .2s;
        }
        .logo-preset.sel {
            box-shadow: 0 0 0 3px rgba(139,92,246,.5);
            border-color: #8b5cf6;
        }
        html.dark .logo-preset { border-color: rgba(100,116,139,.45); }
        html.dark .logo-preset.sel { border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.45); }
        .card-c-violet { background-image: linear-gradient(135deg, rgba(124,58,237,.13), rgba(124,58,237,.04) 45%, rgba(124,58,237,0) 78%); }
        .card-c-violet:hover { border-color: rgba(124,58,237,.35); }
        .card-c-emerald { background-image: linear-gradient(135deg, rgba(16,185,129,.12), rgba(16,185,129,.04) 45%, rgba(16,185,129,0) 78%); }
        .card-c-emerald:hover { border-color: rgba(16,185,129,.35); }
        .card-c-sky { background-image: linear-gradient(135deg, rgba(2,132,199,.12), rgba(2,132,199,.04) 45%, rgba(2,132,199,0) 78%); }
        .card-c-sky:hover { border-color: rgba(2,132,199,.35); }
        .card-c-amber { background-image: linear-gradient(135deg, rgba(245,158,11,.13), rgba(245,158,11,.04) 45%, rgba(245,158,11,0) 78%); }
        .card-c-amber:hover { border-color: rgba(245,158,11,.35); }
        .card-c-rose { background-image: linear-gradient(135deg, rgba(225,29,72,.10), rgba(225,29,72,.035) 45%, rgba(225,29,72,0) 78%); }
        .card-c-rose:hover { border-color: rgba(225,29,72,.33); }
        .card-c-slate { background-image: linear-gradient(135deg, rgba(100,116,139,.14), rgba(100,116,139,.05) 45%, rgba(100,116,139,0) 78%); }
        .card-c-slate:hover { border-color: rgba(100,116,139,.35); }
        .card-c-cyan { background-image: linear-gradient(135deg, rgba(8,145,178,.12), rgba(8,145,178,.04) 45%, rgba(8,145,178,0) 78%); }
        .card-c-cyan:hover { border-color: rgba(8,145,178,.35); }
        .card-c-indigo { background-image: linear-gradient(135deg, rgba(79,70,229,.12), rgba(79,70,229,.04) 45%, rgba(79,70,229,0) 78%); }
        .card-c-indigo:hover { border-color: rgba(79,70,229,.35); }
        .card-c-fuchsia { background-image: linear-gradient(135deg, rgba(192,38,211,.11), rgba(192,38,211,.035) 45%, rgba(192,38,211,0) 78%); }
        .card-c-fuchsia:hover { border-color: rgba(192,38,211,.35); }
        .card-c-orange { background-image: linear-gradient(135deg, rgba(234,88,12,.12), rgba(234,88,12,.04) 45%, rgba(234,88,12,0) 78%); }
        .card-c-orange:hover { border-color: rgba(234,88,12,.35); }
        html.dark .card-c-violet { background-image: linear-gradient(135deg, rgba(167,139,250,.16), rgba(167,139,250,.05) 45%, rgba(167,139,250,0) 78%); }
        html.dark .card-c-violet:hover { border-color: rgba(167,139,250,.45); }
        html.dark .card-c-emerald { background-image: linear-gradient(135deg, rgba(52,211,153,.14), rgba(52,211,153,.045) 45%, rgba(52,211,153,0) 78%); }
        html.dark .card-c-emerald:hover { border-color: rgba(52,211,153,.45); }
        html.dark .card-c-sky { background-image: linear-gradient(135deg, rgba(56,189,248,.15), rgba(56,189,248,.045) 45%, rgba(56,189,248,0) 78%); }
        html.dark .card-c-sky:hover { border-color: rgba(56,189,248,.45); }
        html.dark .card-c-amber { background-image: linear-gradient(135deg, rgba(251,191,36,.13), rgba(251,191,36,.04) 45%, rgba(251,191,36,0) 78%); }
        html.dark .card-c-amber:hover { border-color: rgba(251,191,36,.45); }
        html.dark .card-c-rose { background-image: linear-gradient(135deg, rgba(253,164,175,.13), rgba(253,164,175,.04) 45%, rgba(253,164,175,0) 78%); }
        html.dark .card-c-rose:hover { border-color: rgba(253,164,175,.42); }
        html.dark .card-c-slate { background-image: linear-gradient(135deg, rgba(148,163,184,.15), rgba(148,163,184,.05) 45%, rgba(148,163,184,0) 78%); }
        html.dark .card-c-slate:hover { border-color: rgba(148,163,184,.45); }
        html.dark .card-c-cyan { background-image: linear-gradient(135deg, rgba(34,211,238,.14), rgba(34,211,238,.045) 45%, rgba(34,211,238,0) 78%); }
        html.dark .card-c-cyan:hover { border-color: rgba(34,211,238,.45); }
        html.dark .card-c-indigo { background-image: linear-gradient(135deg, rgba(129,140,248,.15), rgba(129,140,248,.045) 45%, rgba(129,140,248,0) 78%); }
        html.dark .card-c-indigo:hover { border-color: rgba(129,140,248,.45); }
        html.dark .card-c-fuchsia { background-image: linear-gradient(135deg, rgba(232,121,249,.13), rgba(232,121,249,.04) 45%, rgba(232,121,249,0) 78%); }
        html.dark .card-c-fuchsia:hover { border-color: rgba(232,121,249,.45); }
        html.dark .card-c-orange { background-image: linear-gradient(135deg, rgba(251,146,60,.13), rgba(251,146,60,.04) 45%, rgba(251,146,60,0) 78%); }
        html.dark .card-c-orange:hover { border-color: rgba(251,146,60,.45); }
        .card-sub { color: #64748b; }
        html.dark .card-sub { color: #94a3b8; }
        .card-c-violet .card-sub { color: #7c3aed; }
        html.dark .card-c-violet .card-sub { color: #a78bfa; }
        .card-c-emerald .card-sub { color: #047857; }
        html.dark .card-c-emerald .card-sub { color: #34d399; }
        .card-c-sky .card-sub { color: #0369a1; }
        html.dark .card-c-sky .card-sub { color: #38bdf8; }
        .card-c-amber .card-sub { color: #b45309; }
        html.dark .card-c-amber .card-sub { color: #fbbf24; }
        .card-c-rose .card-sub { color: #be123c; }
        html.dark .card-c-rose .card-sub { color: #fb7185; }
        .card-c-slate .card-sub { color: #475569; }
        html.dark .card-c-slate .card-sub { color: #cbd5e1; }
        .card-c-cyan .card-sub { color: #0e7490; }
        html.dark .card-c-cyan .card-sub { color: #22d3ee; }
        .card-c-indigo .card-sub { color: #4338ca; }
        html.dark .card-c-indigo .card-sub { color: #818cf8; }
        .card-c-fuchsia .card-sub { color: #a210cc; }
        html.dark .card-c-fuchsia .card-sub { color: #e879f9; }
        .card-c-orange .card-sub { color: #c2410c; }
        html.dark .card-c-orange .card-sub { color: #fb923c; }
        .icon-bg { background: linear-gradient(135deg,#8b5cf6,#7c3aed); }
        html.dark .icon-bg { background: #0f172a; }
        .icon-bg-app { background: linear-gradient(135deg,#f5f3ff,#e6dff9); border: 1px solid rgba(124,58,237,.32); }
        html.dark .icon-bg-app { background: linear-gradient(135deg,#3b2b5e,#241540); border: 1px solid rgba(168,85,247,.38); }
        .app-grid { display:grid; gap:12px; grid-template-columns:repeat(4,64px); justify-content:center; }
        @media (min-width:640px) { .app-grid { grid-template-columns:repeat(5,64px); } }
        @media (min-width:768px) { .app-grid { grid-template-columns:repeat(6,64px); } }
        @media (min-width:1024px) { .app-grid { grid-template-columns:repeat(8,64px); } }
        @media (min-width:1280px) { .app-grid { grid-template-columns:repeat(10,64px); } }
        /* Phase 2: language capsule (EN | label) in the top nav. */
        .lang-capsule {
            display: flex; align-items: center;
            border: 1px solid rgba(148,163,184,.45); border-radius: 9999px;
            background: rgba(255,255,255,.65); backdrop-filter: blur(4px);
            overflow: hidden; flex-shrink: 0;
        }
        .lang-seg {
            /* Glyph centers sit ~1.5px above the segment centers in baseline
               flow (measured in screenshots); asymmetric padding shifts text
               down half the delta so EN and 漢 both sit dead center. */
            padding: .39rem .6rem .3rem; font-size: .8rem; font-weight: 600;
            color: rgba(100,116,139,.85); background: transparent;
            border: none; cursor: pointer; transition: background .2s, color .2s;
            line-height: 1.1;
        }
        .lang-seg:hover { color: #6d28d9; }
        .lang-seg.active { background: linear-gradient(135deg,#8b5cf6,#7c3aed); color: #fff; }
        html.dark .lang-capsule { background: rgba(23,10,41,.55); border-color: rgba(148,163,184,.28); }
        html.dark .lang-seg { color: rgba(203,213,225,.75); }
        html.dark .lang-seg:hover { color: #c4b5fd; }
        html.dark .lang-seg.active { color: #fff; }
        /* Phase 2: keep the top nav static when the language flips. Text length
           differences (This site / 本站, Settings / 設定, EN / label) are absorbed
           by fixed widths with centered text, so nothing shifts when toggling. */
        #current-engine-label { text-align: center; }
        #lang-capsule .lang-seg { width: 52px; text-align: center; box-sizing: border-box; }
        #settings-lang-capsule .lang-seg { width: 52px; text-align: center; box-sizing: border-box; }
        @media (min-width: 768px) {
            #current-engine-label { width: 80px; }
            #menu-toggle { display: inline-block; width: 70px; text-align: center; }
            /* Desktop switches language with the top bar capsule; the settings
               row is mobile-only, so hide the whole row on desktop — mirror of
               the mobile block hiding #lang-capsule. */
            #settings-lang-row { display: none; }
        }
        /* Mobile-only top bar compaction: the fixed desktop widths above only
           apply at >=768px, so phones get auto-sized segments and tighter
           spacing — the settings avatar no longer gets clipped at the right.
           Desktop layout is untouched by this block. */
        @media (max-width: 767px) {
            #topnav-inner { padding-left: 12px; padding-right: 12px; }
            #topnav-inner .h-16 { gap: 10px; }
            #lang-capsule .lang-seg { width: auto; padding: .39rem .5rem .3rem; }
            #lang-capsule { display: none; }
            #search-engine-btn { padding-left: 8px; padding-right: 6px; }
            #search-button { padding-left: 8px; padding-right: 8px; }
            #search-shell > div.w-px { margin-left: 3px; margin-right: 3px; }
            #search-input { padding-left: 4px; padding-right: 4px; font-size: 16px; }
            #profile-menu-toggle { padding: 6px 10px; }
            #topnav-inner a div.w-8 { width: 28px; height: 28px; }
            #topnav-inner a { padding: 6px 8px; }
            /* iOS Safari force-zooms the whole page when a focused text box
               is under 16px, and the zoom persists after the box blurs — the
               login, logo and edit dialog fields all triggered it on phones.
               Every text box on mobile is therefore 16px. */
            input, textarea, select { font-size: 16px; }
            /* Mobile detail popup as a bottom sheet (Option B): the sheet is
               docked at the bottom and grows upward with its content, so the
               full detail text shows instead of scrolling inside a fixed box.
               The header button is hidden; the full-width button at the
               bottom of the sheet is the thumb target instead. */
            #detail-overlay { align-items: flex-end; padding: 0; }
            #detail-box { max-width: 100%; border-radius: 1rem 1rem 0 0; padding: 1rem 1rem 1.25rem; max-height: 86vh; overflow-y: auto; padding-bottom: calc(1.25rem + env(safe-area-inset-bottom)); }
            #detail-box .icon-bg { width: 56px; height: 56px; }
            #detail-box #detail-open-btn { display: none; }
            #detail-title { font-size: 17px; }
            #detail-sub { font-size: 15px; }
            #detail-text { font-size: 14px; max-height: none; overflow-y: visible; margin-bottom: 0; }
            /* Two IDs on purpose: the base rule below hides this div on
               desktop, and it sits AFTER this media block in the file — with
               equal specificity the later rule would win and the button would
               stay hidden on phones too. */
            #detail-box #detail-actions-mobile { display: block; margin-top: 16px; }
            #detail-open-btn-mobile { width: 100%; height: 48px; font-size: 15px; }
        }
        /* Phase 1: detail popup border themed to match the site: light = soft
           slate, dark = purple glow. */
        .detail-box {
            box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
            border: 1px solid rgba(148,163,184,.25);
        }
        html.dark .detail-box {
            box-shadow: 0 0 26px rgba(147,51,234,.22), 0 25px 50px -12px rgba(0,0,0,.6);
            border-color: rgba(168,85,247,.35);
        }
        /* The Open Link button is tinted with the card's color by JS. Inline
           background beats the Tailwind hover class, so hover feedback is a
           brightness lift that works for every color and for the plain green. */
        #detail-open-btn { align-self: center; flex-shrink: 0; padding: 10px 16px; }
        /* Zero text bottom margin (v33): the box's own 24px padding is the
           only bottom gap, so top and bottom padding stay symmetric. */
        #detail-text { margin-bottom: 0; }
        #detail-open-btn:hover { filter: brightness(1.12); }
        /* Mobile-only bottom button (Option B): hidden on desktop, where the
           header button is used. Shown by the mobile media query below. */
        #detail-actions-mobile { display: none; }
        #detail-open-btn-mobile:hover { filter: brightness(1.12); }

        /* Phase 1: the edit dialog has more fields now, so its height is
           capped to the viewport and the form area scrolls — header and
           Confirm/Cancel stay visible. JS sets the exact cap in zoomed CSS px
           (see fitDialogHeight); this CSS rule is the no-JS baseline. */
        #dialog-box {
            max-height: 92vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #dialog-box .space-y-4 {
            overflow-y: auto;
            min-height: 0;
        }
        html.dark ::selection {
            background: rgba(168, 85, 247, 0.4);
            color: #f6f1ff;
        }
        html.dark .card {
            box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.12), 0 8px 24px -8px rgba(168, 85, 247, 0.15);
        }
        html.dark .card:hover {
            box-shadow: 0 0 0 1px rgba(192, 77, 255, 0.45), 0 0 22px 0 rgba(168, 85, 247, 0.35), 0 12px 28px -10px rgba(0,0,0,0.5);
        }
        html.dark input:focus, html.dark button:focus-visible {
            box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5), 0 0 12px rgba(168, 85, 247, 0.4);
        }
        /* The search box is the one field that must NOT pop the big purple box.
           The glow above is intended for the form fields (dialog, login), where
           it reads as a tasteful focus ring. The search input spans the whole
           bar (flex-1), so that same glow looks like an ugly "outer frame" while
           typing. Excluding #search-input (the ID selector beats the generic
           rule) drops the box; the shell gets a gentle border+glow as the only
           focus feedback — subtle, no box. */
        html.dark #search-input:focus {
            box-shadow: none;
            outline: none;
        }
        html.dark #search-shell:focus-within {
            border-color: rgba(168, 85, 247, 0.4);
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.12);
        }
        html.dark #dialog-box, html.dark #password-dialog-box, html.dark #custom-alert-box,
        html.dark #custom-confirm-box, html.dark #category-dialog-box,
        html.dark #profile-dropdown, html.dark .card-menu-dropdown, html.dark #search-engine-menu,
        html.dark #category-select-menu {
            box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.35), 0 0 30px rgba(168, 85, 247, 0.2), 0 25px 50px -12px rgba(0,0,0,0.7);
        }
        .font-display, #back-to-top-btn svg {
            font-family: 'Orbitron', 'Share Tech Mono', monospace;
        }
        /* Blinking terminal caret after the brand label, dark mode only */
        html.dark a[onclick="location.reload()"] span::after {
            content: '_';
            margin-left: 2px;
            color: #c084fc;
            animation: nav-caret-blink 1.1s steps(1) infinite;
        }
        @keyframes nav-caret-blink { 50% { opacity: 0; } }
        html.dark #search-input::placeholder { color: #8347d1; }
        /* The show-all pill has a fixed slot: "All" (3 narrow latin chars) and
           "全部" (2 full-width CJK chars) render at different widths, so the
           pill breathes when the language toggles. One fixed width + centered
           text keeps the row layout identical in both languages. Only the
           All pill is pinned; tag pills stay content-sized. */
        .filter-pills button[data-filter="All"] {
            width: 52px;
            box-sizing: border-box;
            text-align: center;
            flex-shrink: 0;
        }
        /* ================ End Cyberpunk Terminal Theme ================ */
        /* JS-generated Tailwind arbitrary classes are not in the precompiled bundle: hand-written equivalents */
        .card-anim { transition: transform .3s cubic-bezier(.25,.8,.25,1), box-shadow .3s cubic-bezier(.25,.8,.25,1), border-color .3s cubic-bezier(.25,.8,.25,1); }
        .card-desc { font-size: 11px; }
        @media (max-width:767px) {
            /* mobile portrait cards have less horizontal room: shrink card text */
            .card-container .card-title { font-size: 12px; }
            .card-container .card-sub { font-size: 10px; }
            .card-container .card-desc { font-size: 10px; }
        }
        .mask-gradient { -webkit-mask-image: linear-gradient(to right, #000 90%, transparent); mask-image: linear-gradient(to right, #000 90%, transparent); }
    </style>
    <style id="group-panel-style">
        /* v19: panel-to-panel gap 56px -> 48px (Frost: slightly too large); first panel stays 16px. */
        /* v20: panel-to-panel gap 48px -> 32px, equal to the pills -> first-panel gap (Frost's option 1). First panel stays 16px. */
        .group-panel{border:1px solid rgba(124,93,250,.25);border-radius:16px;padding:16px;background:transparent;margin:32px 0 0;min-width:0;}
        .group-panel-first{margin-top:16px;}
        .dark .group-panel{border-color:rgba(167,139,250,.30);}
        /* v13: the border must break evenly around the title text.
           Left of the text there are already 28px (8px padding + 12px
           invisible indent spacer + 8px flex gap), so the right padding
           is 28px too. The text itself does not move. */
        .group-panel > legend.group-header{margin:0;padding:0 28px 0 8px;}
        .list-view .group-panel{padding-top:18px;}
    </style>
        <script>
        // --- 主題管理邏輯 ---
        // 規則：只有「Remember Settings」開啟且有明確儲存值時才採用儲存值；否則一律跟隨系統 (prefers-color-scheme)。
        // 自動偵測到的系統主題「不會」寫入 localStorage，因此系統切換（含手機日夜自動切換）能即時生效。
        (() => {
            const html = document.documentElement;
            const KEY = 'theme_preference';
            const mq = window.matchMedia('(prefers-color-scheme: dark)');

            const stored = () => {
                try {
                    if (localStorage.getItem('savePreferences') !== 'true') return null;
                    const v = localStorage.getItem(KEY);
                    return (v === 'dark' || v === 'light') ? v : null;
                } catch (e) { return null; }
            };

            const paint = (dark) => {
                html.classList.toggle('dark', dark);
                html.style.colorScheme = dark ? 'dark' : 'light';
                const meta = document.querySelector('meta[name="theme-color"]');
                if (meta) meta.setAttribute('content', dark ? '#0a0414' : '#f3edfb');
                const cb = document.getElementById('theme-switch-checkbox');
                if (cb) cb.checked = dark;
            };

            const sync = () => paint((stored() || (mq.matches ? 'dark' : 'light')) === 'dark');

            sync(); // 立即執行，避免載入時閃爍
            if (mq.addEventListener) mq.addEventListener('change', sync);
            else if (mq.addListener) mq.addListener(sync);
            // 手機從背景切回前景時，若使用者沒有手動切換過，重新對齊系統主題
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && !window.__themeManual) sync();
            });

            window.__paintTheme = paint;
            window.updateTheme = (theme) => paint(theme === 'dark');
        })();
    </script>
    <style id="tw-compiled">*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e6d9f7}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Share Tech Mono,ui-monospace,SFMono-Regular,monospace;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-8{bottom:2rem}.bottom-\\[-10\\%\\]{bottom:-10%}.left-0{left:0}.left-\\[-10\\%\\]{left:-10%}.right-0{right:0}.right-2{right:.5rem}.right-8{right:2rem}.right-\\[-10\\%\\]{right:-10%}.right-\\[-4px\\]{right:-4px}.top-0{top:0}.top-2{top:.5rem}.top-6{top:1.5rem}.top-\\[-10\\%\\]{top:-10%}.top-\\[-4px\\]{top:-4px}.top-full{top:100%}.-z-10{z-index:-10}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-50{z-index:50}.z-\\[110\\]{z-index:110}.z-\\[60\\]{z-index:60}.z-\\[65\\]{z-index:65}.z-\\[70\\]{z-index:70}.z-\\[80\\]{z-index:80}.mx-0\\.5{margin-left:.125rem;margin-right:.125rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-2{margin-bottom:.5rem}.mb-2\\.5{margin-bottom:.625rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-auto{margin-left:auto}.mr-1{margin-right:.25rem}.mt-1{margin-top:.25rem}.mt-12{margin-top:3rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.mt-8{margin-top:2rem}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.\\!grid{display:grid!important}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-16{height:4rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-9{height:2.25rem}.h-\\[500px\\]{height:500px}.h-\\[800px\\]{height:800px}.h-full{height:100%}.h-px{height:1px}.max-h-48{max-height:12rem}.min-h-\\[1\\.25rem\\]{min-height:1.25rem}.min-h-\\[100px\\]{min-height:100px}.min-h-screen{min-height:100vh}.w-1{width:.25rem}.w-1\\.5{width:.375rem}.w-10{width:2.5rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-28{width:7rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-4{width:1rem}.w-40{width:10rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-60{width:15rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-9{width:2.25rem}.w-\\[120\\%\\]{width:120%}.w-\\[500px\\]{width:500px}.w-\\[800px\\]{width:800px}.w-auto{width:auto}.w-full{width:100%}.w-px{width:1px}.max-w-2xl{max-width:42rem}.max-w-7xl{max-width:80rem}.max-w-md{max-width:28rem}.max-w-sm{max-width:24rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.origin-top-right{transform-origin:top right}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.translate-x-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x:50%}.rotate-45{--tw-rotate:45deg}.rotate-45,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-move{cursor:move}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-x-2{-moz-column-gap:.5rem;column-gap:.5rem}.gap-y-6{row-gap:1.5rem}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.25rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem*var(--tw-space-y-reverse))}.space-y-10>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2.5rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2.5rem*var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem*var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.scroll-smooth{scroll-behavior:smooth}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-\\[1\\.2rem\\]{border-radius:1.2rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-xl{border-radius:.75rem}.rounded-l-xl{border-top-left-radius:.75rem;border-bottom-left-radius:.75rem}.rounded-r-xl{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}.rounded-tr-2xl{border-top-right-radius:1rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-l{border-left-width:1px}.border-t{border-top-width:1px}.border-dashed{border-style:dashed}.border-none{border-style:none}.\\!border-amber-200{--tw-border-opacity:1!important;border-color:rgb(253 230 138/var(--tw-border-opacity,1))!important}.border-emerald-400{--tw-border-opacity:1;border-color:rgb(192 77 255/var(--tw-border-opacity,1))}.border-gray-200{--tw-border-opacity:1;border-color:rgb(230 217 247/var(--tw-border-opacity,1))}.border-gray-300{--tw-border-opacity:1;border-color:rgb(208 189 240/var(--tw-border-opacity,1))}.border-slate-100{--tw-border-opacity:1;border-color:rgb(236 226 253/var(--tw-border-opacity,1))}.border-slate-200{--tw-border-opacity:1;border-color:rgb(215 195 251/var(--tw-border-opacity,1))}.border-slate-200\\/40{border-color:rgba(215,195,251,.4)}.border-slate-200\\/50{border-color:rgba(215,195,251,.5)}.border-slate-200\\/60{border-color:rgba(215,195,251,.6)}.border-slate-300{--tw-border-opacity:1;border-color:rgb(187 150 242/var(--tw-border-opacity,1))}.border-slate-300\\/50{border-color:rgba(187,150,242,.5)}.border-slate-400{--tw-border-opacity:1;border-color:rgb(156 109 230/var(--tw-border-opacity,1))}.border-transparent{border-color:transparent}.bg-amber-400{--tw-bg-opacity:1;background-color:rgb(251 191 36/var(--tw-bg-opacity,1))}.bg-amber-50\\/80{background-color:rgba(255,251,235,.8)}.bg-blue-300\\/30{background-color:rgba(103,232,249,.3)}.bg-emerald-100{--tw-bg-opacity:1;background-color:rgb(243 217 255/var(--tw-bg-opacity,1))}.bg-emerald-300\\/30{background-color:rgba(214,133,255,.3)}.bg-emerald-500{--tw-bg-opacity:1;background-color:rgb(168 85 247/var(--tw-bg-opacity,1))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 237 251/var(--tw-bg-opacity,1))}.bg-gray-100\\/80{background-color:rgba(243,237,251,.8)}.bg-slate-100{--tw-bg-opacity:1;background-color:rgb(236 226 253/var(--tw-bg-opacity,1))}.bg-slate-200{--tw-bg-opacity:1;background-color:rgb(215 195 251/var(--tw-bg-opacity,1))}.bg-slate-300{--tw-bg-opacity:1;background-color:rgb(187 150 242/var(--tw-bg-opacity,1))}.bg-slate-300\\/50{background-color:rgba(187,150,242,.5)}.bg-slate-50{--tw-bg-opacity:1;background-color:rgb(246 241 255/var(--tw-bg-opacity,1))}.bg-slate-900\\/50{background-color:rgba(23,10,41,.5)}.bg-slate-900\\/60{background-color:rgba(23,10,41,.6)}.bg-slate-900\\/70{background-color:rgba(23,10,41,.7)}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.bg-white\\/50{background-color:hsla(0,0%,100%,.5)}.bg-white\\/80{background-color:hsla(0,0%,100%,.8)}.bg-white\\/90{background-color:hsla(0,0%,100%,.9)}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.bg-gradient-to-tr{background-image:linear-gradient(to top right,var(--tw-gradient-stops))}.from-emerald-500{--tw-gradient-from:#a855f7 var(--tw-gradient-from-position);--tw-gradient-to:rgba(168,85,247,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.from-gray-100{--tw-gradient-from:#f3edfb var(--tw-gradient-from-position);--tw-gradient-to:rgba(243,237,251,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.from-slate-100{--tw-gradient-from:#ece2fd var(--tw-gradient-from-position);--tw-gradient-to:rgba(236,226,253,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-gray-200{--tw-gradient-to:#e6d9f7 var(--tw-gradient-to-position)}.to-slate-200{--tw-gradient-to:#d7c3fb var(--tw-gradient-to-position)}.to-teal-600{--tw-gradient-to:#d926c9 var(--tw-gradient-to-position)}.object-contain{-o-object-fit:contain;object-fit:contain}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-2{padding:.5rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pb-2{padding-bottom:.5rem}.pb-20{padding-bottom:5rem}.pl-3{padding-left:.75rem}.pr-2{padding-right:.5rem}.pt-1{padding-top:.25rem}.pt-2{padding-top:.5rem}.pt-36{padding-top:9rem}.text-left{text-align:left}.text-center{text-align:center}.font-sans{font-family:Share Tech Mono,ui-monospace,SFMono-Regular,monospace}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-relaxed{line-height:1.625}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.tracking-widest{letter-spacing:.1em}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity,1))}.text-emerald-500{--tw-text-opacity:1;color:rgb(168 85 247/var(--tw-text-opacity,1))}.text-emerald-600{--tw-text-opacity:1;color:rgb(147 51 234/var(--tw-text-opacity,1))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity,1))}.text-slate-400{--tw-text-opacity:1;color:rgb(156 109 230/var(--tw-text-opacity,1))}.text-slate-500{--tw-text-opacity:1;color:rgb(131 71 209/var(--tw-text-opacity,1))}.text-slate-600{--tw-text-opacity:1;color:rgb(105 49 171/var(--tw-text-opacity,1))}.text-slate-700{--tw-text-opacity:1;color:rgb(76 31 128/var(--tw-text-opacity,1))}.text-slate-800{--tw-text-opacity:1;color:rgb(42 17 71/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.placeholder-slate-400::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 109 230/var(--tw-placeholder-opacity,1))}.placeholder-slate-400::placeholder{--tw-placeholder-opacity:1;color:rgb(156 109 230/var(--tw-placeholder-opacity,1))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-60{opacity:.6}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-2xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px rgba(0,0,0,.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color)}.shadow-glass{--tw-shadow:0 4px 30px rgba(168,85,247,.15);--tw-shadow-colored:0 4px 30px var(--tw-shadow-color)}.shadow-glass,.shadow-inner{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 rgba(0,0,0,.05);--tw-shadow-colored:inset 0 2px 4px 0 var(--tw-shadow-color)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-lg,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.shadow-sm,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.shadow-emerald-500\\/20{--tw-shadow-color:rgba(168,85,247,.2);--tw-shadow:var(--tw-shadow-colored)}.shadow-emerald-500\\/25{--tw-shadow-color:rgba(168,85,247,.25);--tw-shadow:var(--tw-shadow-colored)}.shadow-emerald-500\\/30{--tw-shadow-color:rgba(168,85,247,.3);--tw-shadow:var(--tw-shadow-colored)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-1{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring-1,.ring-2{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-2{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.ring-amber-400{--tw-ring-opacity:1;--tw-ring-color:rgb(251 191 36/var(--tw-ring-opacity,1))}.ring-amber-400\\/40{--tw-ring-color:rgba(251,191,36,.4)}.ring-black\\/5{--tw-ring-color:rgba(0,0,0,.05)}.blur-\\[120px\\]{--tw-blur:blur(120px)}.blur-\\[120px\\],.blur-\\[150px\\]{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.blur-\\[150px\\]{--tw-blur:blur(150px)}.drop-shadow-sm{--tw-drop-shadow:drop-shadow(0 1px 1px rgba(0,0,0,.05))}.drop-shadow-sm,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-md{--tw-backdrop-blur:blur(12px)}.backdrop-blur-md,.backdrop-blur-sm{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-sm{--tw-backdrop-blur:blur(4px)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[transform\\2c box-shadow\\2c border-color\\]{transition-property:transform,box-shadow,border-color;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-150,.transition-transform{transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-300{transition-duration:.3s}.ease-\\[cubic-bezier\\(0\\.25\\2c 0\\.8\\2c 0\\.25\\2c 1\\)\\]{transition-timing-function:cubic-bezier(.25,.8,.25,1)}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.\\[transform\\:translateZ\\(0\\)\\]{transform:translateZ(0)}.selection\\:bg-emerald-200 ::-moz-selection{--tw-bg-opacity:1;background-color:rgb(230 179 255/var(--tw-bg-opacity,1))}.selection\\:bg-emerald-200 ::selection{--tw-bg-opacity:1;background-color:rgb(230 179 255/var(--tw-bg-opacity,1))}.selection\\:bg-emerald-200::-moz-selection{--tw-bg-opacity:1;background-color:rgb(230 179 255/var(--tw-bg-opacity,1))}.selection\\:bg-emerald-200::selection{--tw-bg-opacity:1;background-color:rgb(230 179 255/var(--tw-bg-opacity,1))}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:left-\\[2px\\]:after{content:var(--tw-content);left:2px}.after\\:top-\\[2px\\]:after{content:var(--tw-content);top:2px}.after\\:h-4:after{content:var(--tw-content);height:1rem}.after\\:w-4:after{content:var(--tw-content);width:1rem}.after\\:rounded-full:after{content:var(--tw-content);border-radius:9999px}.after\\:border:after{content:var(--tw-content);border-width:1px}.after\\:border-gray-300:after{content:var(--tw-content);--tw-border-opacity:1;border-color:rgb(208 189 240/var(--tw-border-opacity,1))}.after\\:bg-white:after{content:var(--tw-content);--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.after\\:transition-all:after{content:var(--tw-content);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.after\\:content-\\[\\'\\'\\]:after{--tw-content:"";content:var(--tw-content)}.focus-within\\:-translate-y-0\\.5:focus-within{--tw-translate-y:-0.125rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.focus-within\\:shadow-lg:focus-within{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.focus-within\\:ring-2:focus-within{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-within\\:ring-emerald-500\\/50:focus-within{--tw-ring-color:rgba(168,85,247,.5)}.hover\\:z-10:hover{z-index:10}.hover\\:-translate-y-0\\.5:hover{--tw-translate-y:-0.125rem}.hover\\:-translate-y-0\\.5:hover,.hover\\:-translate-y-1:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:-translate-y-1:hover{--tw-translate-y:-0.25rem}.hover\\:-translate-y-1\\.5:hover{--tw-translate-y:-0.375rem}.hover\\:-translate-y-1\\.5:hover,.hover\\:translate-y-\\[-1px\\]:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:translate-y-\\[-1px\\]:hover{--tw-translate-y:-1px}.hover\\:scale-105:hover{--tw-scale-x:1.05;--tw-scale-y:1.05}.hover\\:scale-105:hover,.hover\\:scale-110:hover{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1}.hover\\:border-emerald-300:hover{--tw-border-opacity:1;border-color:rgb(214 133 255/var(--tw-border-opacity,1))}.hover\\:border-emerald-500:hover{--tw-border-opacity:1;border-color:rgb(168 85 247/var(--tw-border-opacity,1))}.hover\\:border-emerald-500\\/50:hover{border-color:rgba(168,85,247,.5)}.hover\\:border-slate-200:hover{--tw-border-opacity:1;border-color:rgb(215 195 251/var(--tw-border-opacity,1))}.hover\\:bg-amber-100:hover{--tw-bg-opacity:1;background-color:rgb(254 243 199/var(--tw-bg-opacity,1))}.hover\\:bg-amber-50:hover{--tw-bg-opacity:1;background-color:rgb(255 251 235/var(--tw-bg-opacity,1))}.hover\\:bg-blue-100:hover{--tw-bg-opacity:1;background-color:rgb(207 250 254/var(--tw-bg-opacity,1))}.hover\\:bg-emerald-100:hover{--tw-bg-opacity:1;background-color:rgb(243 217 255/var(--tw-bg-opacity,1))}.hover\\:bg-emerald-50:hover{--tw-bg-opacity:1;background-color:rgb(250 240 255/var(--tw-bg-opacity,1))}.hover\\:bg-emerald-50\\/50:hover{background-color:rgba(250,240,255,.5)}.hover\\:bg-emerald-500:hover{--tw-bg-opacity:1;background-color:rgb(168 85 247/var(--tw-bg-opacity,1))}.hover\\:bg-emerald-600:hover{--tw-bg-opacity:1;background-color:rgb(147 51 234/var(--tw-bg-opacity,1))}.hover\\:bg-green-50:hover{--tw-bg-opacity:1;background-color:rgb(240 253 244/var(--tw-bg-opacity,1))}.hover\\:bg-red-100:hover{--tw-bg-opacity:1;background-color:rgb(254 226 226/var(--tw-bg-opacity,1))}.hover\\:bg-red-50:hover{--tw-bg-opacity:1;background-color:rgb(254 242 242/var(--tw-bg-opacity,1))}.hover\\:bg-slate-100:hover{--tw-bg-opacity:1;background-color:rgb(236 226 253/var(--tw-bg-opacity,1))}.hover\\:bg-slate-100\\/80:hover{background-color:rgba(236,226,253,.8)}.hover\\:bg-slate-200:hover{--tw-bg-opacity:1;background-color:rgb(215 195 251/var(--tw-bg-opacity,1))}.hover\\:bg-slate-50:hover{--tw-bg-opacity:1;background-color:rgb(246 241 255/var(--tw-bg-opacity,1))}.hover\\:bg-white:hover{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.hover\\:text-amber-600:hover{--tw-text-opacity:1;color:rgb(217 119 6/var(--tw-text-opacity,1))}.hover\\:text-blue-600:hover{--tw-text-opacity:1;color:rgb(8 145 178/var(--tw-text-opacity,1))}.hover\\:text-emerald-500:hover{--tw-text-opacity:1;color:rgb(168 85 247/var(--tw-text-opacity,1))}.hover\\:text-emerald-600:hover{--tw-text-opacity:1;color:rgb(147 51 234/var(--tw-text-opacity,1))}.hover\\:text-green-600:hover{--tw-text-opacity:1;color:rgb(22 163 74/var(--tw-text-opacity,1))}.hover\\:text-red-500:hover{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity,1))}.hover\\:text-red-600:hover{--tw-text-opacity:1;color:rgb(220 38 38/var(--tw-text-opacity,1))}.hover\\:text-slate-600:hover{--tw-text-opacity:1;color:rgb(105 49 171/var(--tw-text-opacity,1))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.hover\\:shadow-\\[0_8px_20px_-6px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.1\\)\\]:hover{--tw-shadow:0 8px 20px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 8px 20px -6px var(--tw-shadow-color)}.hover\\:shadow-\\[0_8px_20px_-6px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.1\\)\\]:hover,.hover\\:shadow-lg:hover{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.hover\\:shadow-md:hover,.hover\\:shadow-sm:hover{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:shadow-sm:hover{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.hover\\:shadow-emerald-500\\/10:hover{--tw-shadow-color:rgba(168,85,247,.1);--tw-shadow:var(--tw-shadow-colored)}.focus\\:border-emerald-500:focus{--tw-border-opacity:1;border-color:rgb(168 85 247/var(--tw-border-opacity,1))}.focus\\:border-transparent:focus{border-color:transparent}.focus\\:ring-0:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-0:focus,.focus\\:ring-2:focus{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-emerald-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(168 85 247/var(--tw-ring-opacity,1))}.focus\\:ring-emerald-500\\/50:focus{--tw-ring-color:rgba(168,85,247,.5)}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95}.active\\:scale-95:active,.group:hover .group-hover\\:rotate-3{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:rotate-3{--tw-rotate:3deg}.group:hover .group-hover\\:scale-105{--tw-scale-x:1.05;--tw-scale-y:1.05}.group:hover .group-hover\\:scale-105,.group:hover .group-hover\\:scale-110{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:scale-110{--tw-scale-x:1.1;--tw-scale-y:1.1}.group:hover .group-hover\\:bg-emerald-100{--tw-bg-opacity:1;background-color:rgb(243 217 255/var(--tw-bg-opacity,1))}.group:hover .group-hover\\:text-emerald-500{--tw-text-opacity:1;color:rgb(168 85 247/var(--tw-text-opacity,1))}.group:hover .group-hover\\:text-emerald-600{--tw-text-opacity:1;color:rgb(147 51 234/var(--tw-text-opacity,1))}.group:hover .group-hover\\:text-slate-600{--tw-text-opacity:1;color:rgb(105 49 171/var(--tw-text-opacity,1))}.group:active .group-active\\:scale-95{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\\:border-slate-500{--tw-border-opacity:1;border-color:rgb(131 71 209/var(--tw-border-opacity,1))}.peer:checked~.peer-checked\\:bg-emerald-500{--tw-bg-opacity:1;background-color:rgb(168 85 247/var(--tw-bg-opacity,1))}.peer:checked~.peer-checked\\:bg-slate-500{--tw-bg-opacity:1;background-color:rgb(131 71 209/var(--tw-bg-opacity,1))}.peer:checked~.peer-checked\\:after\\:translate-x-full:after{content:var(--tw-content);--tw-translate-x:100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\\:after\\:border-white:after{content:var(--tw-content);--tw-border-opacity:1;border-color:rgb(255 255 255/var(--tw-border-opacity,1))}.peer:focus~.peer-focus\\:outline-none{outline:2px solid transparent;outline-offset:2px}.dark\\:\\!border-amber-700\\/50:is(.dark *){border-color:rgba(180,83,9,.5)!important}.dark\\:border-gray-600:is(.dark *){--tw-border-opacity:1;border-color:rgb(95 58 148/var(--tw-border-opacity,1))}.dark\\:border-slate-500:is(.dark *){--tw-border-opacity:1;border-color:rgb(131 71 209/var(--tw-border-opacity,1))}.dark\\:border-slate-600:is(.dark *){--tw-border-opacity:1;border-color:rgb(105 49 171/var(--tw-border-opacity,1))}.dark\\:border-slate-700:is(.dark *){--tw-border-opacity:1;border-color:rgb(76 31 128/var(--tw-border-opacity,1))}.dark\\:border-slate-700\\/40:is(.dark *){border-color:rgba(76,31,128,.4)}.dark\\:border-slate-700\\/50:is(.dark *){border-color:rgba(76,31,128,.5)}.dark\\:border-slate-700\\/60:is(.dark *){border-color:rgba(76,31,128,.6)}.dark\\:border-transparent:is(.dark *){border-color:transparent}.dark\\:bg-\\[\\#0a0414\\]:is(.dark *){--tw-bg-opacity:1;background-color:rgb(10 4 20/var(--tw-bg-opacity,1))}.dark\\:bg-\\[\\#0a0414\\]\\/85:is(.dark *){background-color:rgba(10,4,20,.85)}.dark\\:bg-\\[\\#170a29\\]:is(.dark *){--tw-bg-opacity:1;background-color:rgb(23 10 41/var(--tw-bg-opacity,1))}.dark\\:bg-\\[\\#170a29\\]\\/60:is(.dark *){background-color:rgba(23,10,41,.6)}.dark\\:bg-amber-900\\/10:is(.dark *){background-color:rgba(120,53,15,.1)}.dark\\:bg-emerald-600:is(.dark *){--tw-bg-opacity:1;background-color:rgb(147 51 234/var(--tw-bg-opacity,1))}.dark\\:bg-emerald-900\\/30:is(.dark *){background-color:rgba(59,7,100,.3)}.dark\\:bg-indigo-600\\/20:is(.dark *){background-color:rgba(79,70,229,.2)}.dark\\:bg-purple-600\\/20:is(.dark *){background-color:rgba(147,51,234,.2)}.dark\\:bg-slate-600:is(.dark *){--tw-bg-opacity:1;background-color:rgb(105 49 171/var(--tw-bg-opacity,1))}.dark\\:bg-slate-700:is(.dark *){--tw-bg-opacity:1;background-color:rgb(76 31 128/var(--tw-bg-opacity,1))}.dark\\:bg-slate-700\\/50:is(.dark *){background-color:rgba(76,31,128,.5)}.dark\\:bg-slate-800:is(.dark *){--tw-bg-opacity:1;background-color:rgb(42 17 71/var(--tw-bg-opacity,1))}.dark\\:bg-slate-800\\/50:is(.dark *){background-color:rgba(42,17,71,.5)}.dark\\:bg-slate-800\\/90:is(.dark *){background-color:rgba(42,17,71,.9)}.dark\\:bg-slate-900:is(.dark *){--tw-bg-opacity:1;background-color:rgb(23 10 41/var(--tw-bg-opacity,1))}.dark\\:bg-transparent:is(.dark *){background-color:transparent}.dark\\:from-\\[\\#0a0414\\]:is(.dark *){--tw-gradient-from:#0a0414 var(--tw-gradient-from-position);--tw-gradient-to:rgba(10,4,20,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.dark\\:from-slate-700:is(.dark *){--tw-gradient-from:#4c1f80 var(--tw-gradient-from-position);--tw-gradient-to:rgba(76,31,128,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.dark\\:to-\\[\\#170a29\\]:is(.dark *){--tw-gradient-to:#170a29 var(--tw-gradient-to-position)}.dark\\:to-slate-600:is(.dark *){--tw-gradient-to:#6931ab var(--tw-gradient-to-position)}.dark\\:text-emerald-400:is(.dark *){--tw-text-opacity:1;color:rgb(192 77 255/var(--tw-text-opacity,1))}.dark\\:text-slate-100:is(.dark *){--tw-text-opacity:1;color:rgb(236 226 253/var(--tw-text-opacity,1))}.dark\\:text-slate-200:is(.dark *){--tw-text-opacity:1;color:rgb(215 195 251/var(--tw-text-opacity,1))}.dark\\:text-slate-300:is(.dark *){--tw-text-opacity:1;color:rgb(187 150 242/var(--tw-text-opacity,1))}.dark\\:text-slate-400:is(.dark *){--tw-text-opacity:1;color:rgb(156 109 230/var(--tw-text-opacity,1))}.dark\\:text-slate-500:is(.dark *){--tw-text-opacity:1;color:rgb(131 71 209/var(--tw-text-opacity,1))}.dark\\:text-white:is(.dark *){--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.dark\\:shadow-none:is(.dark *){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.dark\\:ring-white\\/10:is(.dark *){--tw-ring-color:hsla(0,0%,100%,.1)}.dark\\:selection\\:bg-emerald-900 :is(.dark *)::-moz-selection{--tw-bg-opacity:1;background-color:rgb(59 7 100/var(--tw-bg-opacity,1))}.dark\\:selection\\:bg-emerald-900 :is(.dark *)::selection{--tw-bg-opacity:1;background-color:rgb(59 7 100/var(--tw-bg-opacity,1))}.dark\\:selection\\:bg-emerald-900:is(.dark *)::-moz-selection{--tw-bg-opacity:1;background-color:rgb(59 7 100/var(--tw-bg-opacity,1))}.dark\\:selection\\:bg-emerald-900:is(.dark *)::selection{--tw-bg-opacity:1;background-color:rgb(59 7 100/var(--tw-bg-opacity,1))}.dark\\:hover\\:border-emerald-400\\/50:hover:is(.dark *){border-color:rgba(192,77,255,.5)}.dark\\:hover\\:border-emerald-500:hover:is(.dark *){--tw-border-opacity:1;border-color:rgb(168 85 247/var(--tw-border-opacity,1))}.dark\\:hover\\:border-emerald-500\\/50:hover:is(.dark *){border-color:rgba(168,85,247,.5)}.dark\\:hover\\:border-slate-700:hover:is(.dark *){--tw-border-opacity:1;border-color:rgb(76 31 128/var(--tw-border-opacity,1))}.dark\\:hover\\:bg-amber-900\\/30:hover:is(.dark *){background-color:rgba(120,53,15,.3)}.dark\\:hover\\:bg-blue-900\\/30:hover:is(.dark *){background-color:rgba(8,51,68,.3)}.dark\\:hover\\:bg-emerald-600:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(147 51 234/var(--tw-bg-opacity,1))}.dark\\:hover\\:bg-emerald-900\\/10:hover:is(.dark *){background-color:rgba(59,7,100,.1)}.dark\\:hover\\:bg-emerald-900\\/30:hover:is(.dark *){background-color:rgba(59,7,100,.3)}.dark\\:hover\\:bg-red-900\\/20:hover:is(.dark *){background-color:rgba(127,29,29,.2)}.dark\\:hover\\:bg-red-900\\/30:hover:is(.dark *){background-color:rgba(127,29,29,.3)}.dark\\:hover\\:bg-slate-600:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(105 49 171/var(--tw-bg-opacity,1))}.dark\\:hover\\:bg-slate-700:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(76 31 128/var(--tw-bg-opacity,1))}.dark\\:hover\\:bg-slate-700\\/30:hover:is(.dark *){background-color:rgba(76,31,128,.3)}.dark\\:hover\\:bg-slate-700\\/50:hover:is(.dark *){background-color:rgba(76,31,128,.5)}.dark\\:hover\\:bg-slate-800:hover:is(.dark *){--tw-bg-opacity:1;background-color:rgb(42 17 71/var(--tw-bg-opacity,1))}.dark\\:hover\\:bg-slate-800\\/50:hover:is(.dark *){background-color:rgba(42,17,71,.5)}.dark\\:hover\\:text-amber-400:hover:is(.dark *){--tw-text-opacity:1;color:rgb(251 191 36/var(--tw-text-opacity,1))}.dark\\:hover\\:text-blue-400:hover:is(.dark *){--tw-text-opacity:1;color:rgb(34 211 238/var(--tw-text-opacity,1))}.dark\\:hover\\:text-emerald-400:hover:is(.dark *){--tw-text-opacity:1;color:rgb(192 77 255/var(--tw-text-opacity,1))}.dark\\:hover\\:text-emerald-500:hover:is(.dark *){--tw-text-opacity:1;color:rgb(168 85 247/var(--tw-text-opacity,1))}.dark\\:hover\\:text-red-400:hover:is(.dark *){--tw-text-opacity:1;color:rgb(248 113 113/var(--tw-text-opacity,1))}.dark\\:hover\\:text-slate-200:hover:is(.dark *){--tw-text-opacity:1;color:rgb(215 195 251/var(--tw-text-opacity,1))}.dark\\:hover\\:shadow-\\[0_8px_20px_-6px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.4\\)\\]:hover:is(.dark *){--tw-shadow:0 8px 20px -6px rgba(0,0,0,.4);--tw-shadow-colored:0 8px 20px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.group:hover .dark\\:group-hover\\:bg-emerald-900\\/30:is(.dark *){background-color:rgba(59,7,100,.3)}.group:hover .dark\\:group-hover\\:text-emerald-400:is(.dark *){--tw-text-opacity:1;color:rgb(192 77 255/var(--tw-text-opacity,1))}.group:hover .dark\\:group-hover\\:text-slate-300:is(.dark *){--tw-text-opacity:1;color:rgb(187 150 242/var(--tw-text-opacity,1))}@media (min-width:640px){.sm\\:block{display:block}.sm\\:h-16{height:4rem}.sm\\:w-16{width:4rem}.sm\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\:block{display:block}.md\\:inline{display:inline}.md\\:min-w-\\[5\\.5rem\\]{min-width:5.5rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}}@media (min-width:1024px){.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:grid-cols-8{grid-template-columns:repeat(8,minmax(0,1fr))}.lg\\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width:1280px){.xl\\:grid-cols-10{grid-template-columns:repeat(10,minmax(0,1fr))}.xl\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}</style>
<style id="light-lavender">
/* RENVDER NAV Scheme C: lavender light theme (TweakCN color effect), light mode only. Dark mode untouched. */
html:not(.dark) { background-color: #e7e6f3; }
html:not(.dark) body { color: #343a50; }
html:not(.dark) .bg-gray-100 { background-color: #e7e6f3; }
html:not(.dark) .bg-gray-100\\/80 { background-color: rgba(220,220,236,.92); }
html:not(.dark) .bg-slate-50 { background-color: #f1f0f7; }
html:not(.dark) .bg-slate-100 { background-color: #dcdcec; }
html:not(.dark) .bg-slate-200 { background-color: #c9c7e2; }
html:not(.dark) .bg-slate-300 { background-color: #c1bfe0; }
html:not(.dark) .bg-slate-300\\/50 { background-color: rgba(193,191,224,.55); }
html:not(.dark) .bg-emerald-100 { background-color: #d2cfec; }
html:not(.dark) .bg-emerald-500 { background-color: #6a63b3; }
html:not(.dark) .hover\\:bg-emerald-50:hover, html:not(.dark) .hover\\:bg-emerald-50\\/50:hover { background-color: rgba(106,99,179,.10); }
html:not(.dark) .hover\\:bg-emerald-100:hover { background-color: #d2cfec; }
html:not(.dark) .group:hover .group-hover\\:bg-emerald-100 { background-color: #d2cfec; }
html:not(.dark) .hover\\:bg-emerald-600:hover { background-color: #554e96; }
html:not(.dark) .hover\\:bg-slate-50:hover { background-color: #eaebf4; }
html:not(.dark) .hover\\:bg-slate-100:hover { background-color: #dcdcec; }
html:not(.dark) .hover\\:bg-slate-200:hover { background-color: #c9c7e2; }
html:not(.dark) .peer:checked ~ .peer-checked\\:bg-emerald-500 { background-color: #6a63b3; }
html:not(.dark) .peer:checked ~ .peer-checked\\:bg-slate-500 { background-color: #6a63b3; }
html:not(.dark) .peer:checked ~ .peer-checked\\:border-slate-500 { border-color: #6a63b3; }
html:not(.dark) .border-slate-200 { border-color: #bab8d5; }
html:not(.dark) .border-slate-200\\/40 { border-color: rgba(186,184,213,.4); }
html:not(.dark) .border-slate-200\\/50 { border-color: rgba(186,184,213,.5); }
html:not(.dark) .border-slate-200\\/60 { border-color: rgba(186,184,213,.6); }
html:not(.dark) .border-slate-300 { border-color: #b3b0d0; }
html:not(.dark) .border-slate-300\\/50 { border-color: rgba(179,176,208,.5); }
html:not(.dark) .border-slate-400 { border-color: #9d9ac2; }
html:not(.dark) .border-gray-300 { border-color: #bab8d5; }
html:not(.dark) .border-slate-100 { border-color: #d4d2ea; }
html:not(.dark) .hover\\:border-emerald-500:hover { border-color: #867fc9; }
html:not(.dark) .hover\\:border-emerald-500\\/50:hover { border-color: rgba(106,99,179,.5); }
html:not(.dark) .focus\\:border-emerald-500:focus { border-color: #6a63b3; }
html:not(.dark) .text-slate-800 { color: #343a50; }
html:not(.dark) .text-slate-700 { color: #3c405c; }
html:not(.dark) .text-slate-600 { color: #464a66; }
html:not(.dark) .text-slate-500 { color: #565a75; }
html:not(.dark) .text-slate-400 { color: #6b6f8c; }
html:not(.dark) .text-emerald-500 { color: #6a63b3; }
html:not(.dark) .text-emerald-600 { color: #554e96; }
html:not(.dark) .hover\\:text-emerald-500:hover { color: #6a63b3; }
html:not(.dark) .hover\\:text-emerald-600:hover { color: #554e96; }
html:not(.dark) .group:hover .group-hover\\:text-emerald-500 { color: #6a63b3; }
html:not(.dark) .group:hover .group-hover\\:text-emerald-600 { color: #6a63b3; }
html:not(.dark) .group:hover .group-hover\\:text-slate-600 { color: #464a66; }
html:not(.dark) .placeholder-slate-400::placeholder { color: #8a8da2; }
html:not(.dark) .selection\\:bg-emerald-200::selection { background-color: #c6c3eb; }
html:not(.dark) .focus\\:ring-emerald-500:focus { --tw-ring-color: rgba(106,99,179,.35); }
html:not(.dark) .focus\\:ring-emerald-500\\/50:focus { --tw-ring-color: rgba(106,99,179,.35); }
html:not(.dark) .focus-within\\:ring-emerald-500\\/50:focus-within { --tw-ring-color: rgba(106,99,179,.35); }
html:not(.dark) .ring-black\\/5 { --tw-ring-color: rgba(106,99,179,.12); }
html:not(.dark) .shadow-emerald-500\\/20, html:not(.dark) .shadow-emerald-500\\/25, html:not(.dark) .shadow-emerald-500\\/30 { --tw-shadow-color: rgba(52,58,80,.10); }
html:not(.dark) .hover\\:shadow-emerald-500\\/10:hover { --tw-shadow-color: rgba(52,58,80,.08); }
html:not(.dark) .bg-blob-a { background: none; }
html:not(.dark) .bg-blob-b { background: none; }
html:not(.dark) .from-gray-100 { --tw-gradient-from: #e7e6f3; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(231,230,243,0)); }
html:not(.dark) .to-gray-200 { --tw-gradient-to: #e2e1eb; }
html:not(.dark) ::-webkit-scrollbar-thumb { background: rgba(106,99,179,.28); }
html:not(.dark) ::-webkit-scrollbar-thumb:hover { background: rgba(106,99,179,.45); }
/* Ref round 2 (items 1,2,3,5): card fill pure white; flat icon plate; language
   capsule pink base + flat purple active + white inactive; swatch row pink base
   + flat purple selection; text hierarchy foreground/muted. Dark mode untouched. */
html:not(.dark) .bg-white\\/90, html:not(.dark) .bg-white\\/80 { background-color:#ffffff; }
html:not(.dark) .bg-slate-50 { background-color:#f7f7fb; }
html:not(.dark) .text-slate-500 { color:#5d617f; }
html:not(.dark) .icon-bg { background:#e5e4f1; border-color:transparent; }
html:not(.dark) .icon-bg-app { background:#dfddef; border-color:#bab8d5; }
html:not(.dark) .lang-capsule { background:#f583c0; border-color:#bab8d5; }
html:not(.dark) .lang-seg { background:#ffffff; color:#5d617f; }
html:not(.dark) .lang-seg:hover { color:#6a63b3; }
html:not(.dark) .lang-seg.active { background:#6a63b3; color:#ffffff; }
html:not(.dark) #color-picker { background:#f583c0; }
html:not(.dark) .filter-pills button:not(.bg-emerald-500):hover { background-color:#f583c0; color:#343a50; border-color:#f583c0; }
html.dark .filter-pills button:not(.bg-emerald-500):hover { background-color:#2e2840; color:#ff96c9; border-color:#2e2840; }
html:not(.dark) .color-swatch.sel { border-color:#6a63b3; box-shadow:0 0 0 3px rgba(106,99,179,.4); }
html:not(.dark) .logo-preset.sel { border-color:#6a63b3; box-shadow:0 0 0 3px rgba(106,99,179,.4); }
/* Item 4 (ten colors, light): card fill stays pure white (no tint), the card
   color only paints the hover border (small area), and the subtitle uses the
   colour's high-grade grey (hue kept, chroma halved, lightness stays mid-high). */
html:not(.dark) .card-c-violet { background-image: none; background-color: rgba(172,156,240,.10); }
html:not(.dark) .card-c-emerald { background-image: none; background-color: rgba(128,175,226,.10); }
html:not(.dark) .card-c-sky { background-image: none; background-color: rgba(149,167,234,.10); }
html:not(.dark) .card-c-amber { background-image: none; background-color: rgba(165,162,231,.10); }
html:not(.dark) .card-c-rose { background-image: none; background-color: rgba(181,156,227,.10); }
html:not(.dark) .card-c-slate { background-image: none; background-color: rgba(144,173,215,.08); }
html:not(.dark) .card-c-cyan { background-image: none; background-color: rgba(141,170,231,.10); }
html:not(.dark) .card-c-indigo { background-image: none; background-color: rgba(157,163,239,.10); }
html:not(.dark) .card-c-fuchsia { background-image: none; background-color: rgba(177,156,232,.10); }
html:not(.dark) .card-c-orange { background-image: none; background-color: rgba(120,177,224,.10); }
html:not(.dark) .list-view .card-c-violet { background-image: none; background-color: rgba(172,156,240,.10); }
html:not(.dark) .list-view .card-c-emerald { background-image: none; background-color: rgba(128,175,226,.10); }
html:not(.dark) .list-view .card-c-sky { background-image: none; background-color: rgba(149,167,234,.10); }
html:not(.dark) .list-view .card-c-amber { background-image: none; background-color: rgba(165,162,231,.10); }
html:not(.dark) .list-view .card-c-rose { background-image: none; background-color: rgba(181,156,227,.10); }
html:not(.dark) .list-view .card-c-slate { background-image: none; background-color: rgba(144,173,215,.08); }
html:not(.dark) .list-view .card-c-cyan { background-image: none; background-color: rgba(141,170,231,.10); }
html:not(.dark) .list-view .card-c-indigo { background-image: none; background-color: rgba(157,163,239,.10); }
html:not(.dark) .list-view .card-c-fuchsia { background-image: none; background-color: rgba(177,156,232,.10); }
html:not(.dark) .list-view .card-c-orange { background-image: none; background-color: rgba(120,177,224,.10); }
html:not(.dark) .card-c-violet:hover { border-color:#7c3aed; }
html:not(.dark) .card-c-emerald:hover { border-color:#10b981; }
html:not(.dark) .card-c-sky:hover { border-color:#0284c7; }
html:not(.dark) .card-c-amber:hover { border-color:#f59e0b; }
html:not(.dark) .card-c-rose:hover { border-color:#e11d48; }
html:not(.dark) .card-c-slate:hover { border-color:#64748b; }
html:not(.dark) .card-c-cyan:hover { border-color:#0891b2; }
html:not(.dark) .card-c-indigo:hover { border-color:#4f46e5; }
html:not(.dark) .card-c-fuchsia:hover { border-color:#c026d3; }
html:not(.dark) .card-c-orange:hover { border-color:#ea580c; }
html:not(.dark) .card-sub { color:#5d617f; }
html:not(.dark) .card-c-violet .card-sub { color:#7c6fb0; }
html:not(.dark) .card-c-emerald .card-sub { color:#597da5; }
html:not(.dark) .card-c-sky .card-sub { color:#6977ab; }
html:not(.dark) .card-c-amber .card-sub { color:#7673a9; }
html:not(.dark) .card-c-rose .card-sub { color:#826ea6; }
html:not(.dark) .card-c-slate .card-sub { color:#6b82a3; }
html:not(.dark) .card-c-cyan .card-sub { color:#647aa9; }
html:not(.dark) .card-c-indigo .card-sub { color:#7074af; }
html:not(.dark) .card-c-fuchsia .card-sub { color:#7f6faa; }
html:not(.dark) .card-c-orange .card-sub { color:#537fa3; }
</style>
<style id="list-view">
.list-view .list-grid { grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 12px; min-width: 0; }
.list-view .card { min-width: 0; max-width: 100%; }
/* Horizontal inset lives on the card itself, so icon/title/subtitle and the detail text share one left edge (and one right edge) */
.list-view .card-anim { padding-left: 20px; padding-right: 20px; }
.list-view .card-desc { overflow-wrap: anywhere; }
/* Mobile list rows are one full-width column; the grid text shrink (<=767px:
   12/10/10) was tuned for narrow grid cards and reads too small here.
   Restored sizes follow mobile reading norms: 15px title, 12px subtitle,
   13px description (13px is the accepted readable floor for secondary text). */
@media (max-width:767px) {
    .list-view .card-container .card-title { font-size: 15px; }
    .list-view .card-container .card-sub { font-size: 12px; }
    /* Mobile list rows hide the detail text: tapping a row opens the popup,
       where the full detail shows. */
    .list-view .card-container .card-desc { display: none; }
}
.list-view .card { background-color: transparent; border-color: transparent; box-shadow: none; }
html.dark .list-view .card { background-image: none; }
.list-view .card:hover { transform: none; background-color: rgba(106,99,179,.07); border-color: rgba(106,99,179,.30); box-shadow: none; }
html.dark .list-view .card:hover { background-color: rgba(135,123,210,.10); border-color: rgba(168,85,247,.35); }
@media (max-width: 640px) {
    .list-view .card { border-bottom: 1px solid rgba(106,99,179,.18); border-radius: 0; }
    html.dark .list-view .card { border-bottom-color: rgba(135,123,210,.16); }
    .list-view .list-grid { grid-template-columns: minmax(0, 1fr); }
    .list-view .card-anim { padding-left: 22px; padding-right: 22px; }
}
</style>
</head>

<body class="min-h-screen font-sans text-slate-800 dark:text-slate-100 selection:bg-emerald-200 dark:selection:bg-emerald-900 transition-colors duration-300">

    <!-- Background layer -->
    <div class="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-gray-100 dark:bg-[#0a0414]">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a0414] dark:to-[#170a29]"></div>
        <div class="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blob-a"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blob-b"></div>
    </div>

    <!-- Top fixed navigation -->
    <div class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div class="backdrop-blur-md bg-gray-100/80 dark:bg-[#0a0414]/85 border-b border-slate-200/40 dark:border-slate-700/40 shadow-sm [transform:translateZ(0)]">
            <div id="topnav-inner" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 gap-4">

                    <!-- Logo -->
                    <a class="flex items-center gap-2 flex-shrink-0 group cursor-pointer dark:bg-transparent px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-white/60 hover:-translate-y-0.5" href="#" onclick="location.reload()">
                        <div id="logo-visual" class="w-8 h-8 flex items-center justify-center rounded-lg text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" style="background: linear-gradient(135deg,#a855f7,#7e22ce)"></div>
                        <span id="site-name" class="font-bold text-lg tracking-wide text-slate-700 dark:text-slate-100 hidden sm:block">RENVDER NAV</span>
                    </a>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-auto">
                        <div id="search-shell" class="relative flex items-center w-full h-10 rounded-xl focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:shadow-lg focus-within:-translate-y-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-lg transition-all duration-300">

                            <!-- Custom Search Engine Dropdown -->
                            <div class="relative h-full" id="search-engine-wrapper">
                                <button id="search-engine-btn" class="h-full pl-3 pr-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-l-xl transition-colors outline-none w-auto md:min-w-[5.5rem]">
                                    <!-- Show this site's icon by default -->
                                    <span id="current-engine-icon" class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </span>
                                    <span id="current-engine-label" class="font-medium truncate hidden md:block">This site</span>
                                    <svg class="w-3 h-3 opacity-60 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                <!-- Dropdown Menu -->
                                <div id="search-engine-menu" class="hidden absolute top-full left-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 dropdown-enter">
                                    <div class="py-1" id="search-engine-list">
                                        <div class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Search Engine</div>
                                        <!-- JS auto-inserted buttons -->
                                    </div>
                                </div>
                            </div>

                            <div class="h-4 w-px bg-slate-200 dark:bg-slate-600 mx-1"></div>

                            <input type="text" id="search-input" class="flex-1 bg-transparent border-none text-slate-700 dark:text-slate-200 text-sm focus:ring-0 placeholder-slate-400 h-full w-full outline-none px-2" placeholder="Search">

                            <button id="clear-search-button" class="hidden p-1.5 mr-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                            </button>

                            <button id="search-button" class="h-full px-4 rounded-r-xl text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700/50 transition-colors border-l border-transparent dark:border-slate-700/50 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Profile / Settings -->
                    <div class="relative flex items-center gap-2">
                        <!-- Language capsule: EN | <user label> -->
                        <div id="lang-capsule" class="lang-capsule">
                            <button type="button" class="lang-seg active" data-lang="en">EN</button>
                            <button type="button" class="lang-seg" data-lang="zh" id="lang-seg-2">漢</button>
                        </div>
                        <div id="profile-dropdown-wrapper" class="relative">
                            <button id="profile-menu-toggle" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all text-sm font-medium border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm">
                                <div class="w-7 h-7 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shadow-inner">
                                     <svg class="w-4 h-4 text-slate-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <span id="menu-toggle" class="hidden md:inline">Settings</span>
                            </button>

                            <!-- Dropdown Menu -->
                            <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-60 bg-white dark:bg-[#170a29] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform origin-top-right transition-all z-50 dropdown-enter">
                                <div class="p-2 space-y-1">
                                    <!-- Language row: on phones the top bar capsule is hidden (top bar gives its room to the search
                                         bar), so switching lives here; on desktop the top bar capsule is the switch and the whole
                                         row is hidden by the min-width:768px media block above. -->
                                    <div id="settings-lang-row" class="px-3 py-2.5 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 rounded-lg">
                                        <span class="flex items-center gap-3">
                                            <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                            Language
                                        </span>
                                        <div id="settings-lang-capsule" class="lang-capsule">
                                            <button type="button" class="lang-seg active" data-lang="en">EN</button>
                                            <button type="button" class="lang-seg" data-lang="zh" id="lang-seg-2b">漢</button>
                                        </div>
                                    </div>
                                    <!-- Edit Mode -->
                                    <button id="edit-mode-btn" onclick="toggleEditMode()" class="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-600 transition-colors flex items-center gap-3 font-medium">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        Edit Mode
                                    </button>

                                    <!-- One-Click Check -->
                                    <div id="check-all-menu" class="hidden border-t border-slate-100 dark:border-slate-700/50 my-1 pt-1">
                                        <button id="check-all-btn" onclick="checkAllSites()" class="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-600 transition-colors flex items-center justify-between gap-3 font-medium">
                                            <span class="flex items-center gap-3">
                                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                One-Click Check
                                            </span>
                                            <span id="check-all-status" class="text-xs font-normal text-slate-400 dark:text-slate-500"></span>
                                        </button>
                                    </div>

                                    <!-- Import/Export (login only) -->
                                    <div id="data-tools-menu" class="hidden border-t border-slate-100 dark:border-slate-700/50 my-1 pt-1">
                                         <button onclick="exportData()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700/50 hover:text-amber-600 transition-colors flex items-center gap-3">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Export Config
                                        </button>
                                        <button onclick="importData()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-slate-700/50 hover:text-green-600 transition-colors flex items-center gap-3">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"></path></svg>
                                            Import Config
                                        </button>
                                        <button onclick="openLogoDialog()" class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-600 transition-colors flex items-center gap-3">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-9 7L5 3z"></path><path d="M10 12L19 3"></path></svg>
                                            Logo
                                        </button>
                                        <!-- File input (hidden) -->
                                        <input type="file" id="import-file-input" accept=".json,.html,.htm" class="hidden">
                                    </div>

                                    <div class="h-px bg-slate-100 dark:bg-slate-700/50 mx-1 my-1"></div>

                                    <!-- [New] APP Layout Toggle -->
                                    <div class="px-3 py-2.5 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg group">
                                        <span class="flex items-center gap-3">
                                            <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                            Minimal View
                                        </span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="layout-switch-checkbox" onchange="toggleListLayout()" class="sr-only peer">
                                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>

                                    <div class="px-3 py-2.5 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg group">
                                        <span class="flex items-center gap-3">
                                            <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                            Dark Mode
                                        </span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="theme-switch-checkbox" class="sr-only peer">
                                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                    <div class="px-3 py-2.5 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg group">
                                        <span class="flex items-center gap-3">
                                            <svg class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                            Remember Settings
                                        </span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="save-preference-checkbox" class="sr-only peer">
                                            <div class="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                    <div id="langs-setting-row" class="px-3 py-2 flex items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-200">
                                        <label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" id="lang-en-check" style="accent-color:#10b981"><span>EN</span></label><label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" id="lang-zh-check" style="accent-color:#10b981"><span>漢</span></label>
                                        <span class="flex items-center gap-3">
                                            <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"></path><path d="M9 20h6"></path><path d="M12 4v16"></path></svg>
                                            Language
                                        </span>
                                    </div>
                                    <div class="h-px bg-slate-100 dark:bg-slate-700/50 mx-1 my-1"></div>
                                    <button id="login-Btn" onclick="toggleLogin()" class="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors flex items-center gap-3 font-medium">
                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                                        Login / Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Category Bar -->
                <div id="category-buttons-container" class="py-2 flex gap-2 overflow-x-auto no-scrollbar mask-gradient items-center">
                    <!-- JS generated buttons -->
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content Area -->
    <main class="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <!-- Add Category button (edit mode only) -->
        <div id="add-category-container" class="hidden mt-12 mb-8">
            <button onclick="addCategory()" class="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 group">
                <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 flex items-center justify-center transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <span class="font-medium text-lg">New Category</span>
            </button>
        </div>

        <!-- Content Render Container -->
        <div id="sections-container" class="space-y-10"></div>

        <!-- Back-to-top button, placed separately -->
        <div class="fixed bottom-8 right-8 z-50">
            <button id="back-to-top-btn" onclick="scrollToTop()" class="hidden w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-slate-50 dark:hover:bg-slate-700 has-tooltip group" data-tooltip="Back to top">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            </button>
        </div>

    </main>

    <!-- Modal: Add/Edit Link -->
    <div id="dialog-overlay" class="hidden fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="dialog-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 border border-slate-100 dark:border-slate-700 dialog-scale-hidden">
            <h3 class="text-xl font-bold mb-5 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span class="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Edit Info
            </h3>
            <div class="space-y-4 custom-scrollbar">
                <div id="name-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Name <span class="text-red-500">*</span></label>
                    <input type="text" id="name-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Site name">
                </div>
                <div id="sub-en-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Subtitle (EN)</label>
                    <input type="text" id="sub-en-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — shown as the card's second line">
                </div>
                <div id="name-zh-field">
                    <label id="name-zh-label" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Subtitle (漢)</label>
                    <input type="text" id="name-zh-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="可選 — 繁體副標題">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">URL <span class="text-red-500">*</span></label>
                    <input type="text" id="url-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="https://...">
                </div>
                <div id="detail-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Description (EN)</label>
                    <textarea id="detail-input" rows="3" style="resize:none" class="w-full px-4 py-2.5 rounded-xl leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Full description shown in the card and popup..."></textarea>
                </div>
                <div id="detail-zh-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Description (漢)</label>
                    <textarea id="detail-zh-input" rows="3" style="resize:none" class="w-full px-4 py-2.5 rounded-xl leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — Chinese description"></textarea>
                </div>
                <div id="btn-label-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Button Label (EN)</label>
                    <input type="text" id="btn-label-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Open Link">
                </div>
                <div id="btn-label-zh-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Button Label (漢)</label>
                    <input type="text" id="btn-label-zh-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Open Link">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Icon URL</label>
                    <input type="text" id="icon-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Leave blank to auto-fetch">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Icon URL (Dark Mode)</label>
                    <input type="text" id="icon-dark-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Leave blank to use the same icon">
                </div>
                <div id="group-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Group</label>
                    <input type="text" id="group-input" list="group-datalist" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — leave blank for no group">
                    <datalist id="group-datalist"></datalist>
                </div>
                <div id="group-zh-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Group (漢)</label>
                    <input type="text" id="group-zh-input" list="group-zh-datalist" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — Chinese name">
                    <datalist id="group-zh-datalist"></datalist>
                </div>
                <div id="tag-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Tag</label>
                    <input type="text" id="tag-input" list="tag-datalist" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — leave blank for no tag">
                    <datalist id="tag-datalist"></datalist>
                </div>
                <div id="tag-zh-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Tag (漢)</label>
                    <input type="text" id="tag-zh-input" list="tag-zh-datalist" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — Chinese name">
                    <datalist id="tag-zh-datalist"></datalist>
                </div>

                <!-- Custom Category Dropdown -->
                <div class="relative z-20" id="category-select-wrapper">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                    <input type="hidden" id="category-select-value">
                    <button id="category-select-btn" class="w-full px-4 py-2.5 text-left rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-slate-700 dark:text-white flex items-center justify-between">
                        <span id="category-select-text">Select a category</span>
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <!-- Dropdown List -->
                    <div id="category-select-menu" class="hidden absolute top-full left-0 mt-2 w-full max-h-48 overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 custom-scrollbar">
                        <!-- Items populated by JS -->
                    </div>
                </div>

                <div id="category-zh-field">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Category (漢)</label>
                    <input type="text" id="category-zh-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Optional — Chinese name">
                </div>

                <div class="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="private-checkbox" class="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 border-gray-300 bg-gray-100">
                    <label for="private-checkbox" class="text-sm text-slate-600 dark:text-slate-300 font-medium">Set as private link (visible only when logged in)</label>
                </div>
                <div class="pt-2">
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Card Color</label>
                    <div id="color-picker" class="flex items-center gap-2">
                        <button type="button" class="color-swatch" data-color="" title="Plain — no tint" style="background:linear-gradient(135deg,#e2e8f0,#f8fafc)"></button>
                        <button type="button" class="color-swatch" data-color="violet" title="Violet" style="background:linear-gradient(135deg,#a78bfa,#7c3aed)"></button>
                        <button type="button" class="color-swatch" data-color="emerald" title="Emerald" style="background:linear-gradient(135deg,#34d399,#059669)"></button>
                        <button type="button" class="color-swatch" data-color="sky" title="Sky" style="background:linear-gradient(135deg,#38bdf8,#0284c7)"></button>
                        <button type="button" class="color-swatch" data-color="amber" title="Amber" style="background:linear-gradient(135deg,#fbbf24,#d97706)"></button>
                        <button type="button" class="color-swatch" data-color="rose" title="Rose" style="background:linear-gradient(135deg,#fb7185,#be123c)"></button>
                        <button type="button" class="color-swatch" data-color="slate" title="Slate" style="background:linear-gradient(135deg,#94a3b8,#475569)"></button>
                        <button type="button" class="color-swatch" data-color="cyan" title="Cyan" style="background:linear-gradient(135deg,#22d3ee,#0891b2)"></button>
                        <button type="button" class="color-swatch" data-color="indigo" title="Indigo" style="background:linear-gradient(135deg,#818cf8,#4f46e5)"></button>
                        <button type="button" class="color-swatch" data-color="fuchsia" title="Fuchsia" style="background:linear-gradient(135deg,#e879f9,#c026d3)"></button>
                        <button type="button" class="color-swatch" data-color="orange" title="Orange" style="background:linear-gradient(135deg,#fb923c,#ea580c)"></button>
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-3 mt-8">
                <button id="dialog-cancel-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button id="dialog-confirm-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all hover:translate-y-[-1px]">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Card Detail Popup (Phase 1): click a card → detail + custom jump button.
         .detail-box gets the themed border/glow from the custom style block. -->
    <div id="detail-overlay" class="hidden fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="detail-box" class="detail-box bg-white dark:bg-[#170a29] rounded-2xl w-full max-w-md p-6 transform transition-all duration-300 dialog-scale-hidden">
            <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 shrink-0 rounded-xl icon-bg shadow-md overflow-hidden relative" style="padding:9px">
                    <img id="detail-icon" class="w-full h-full object-contain" alt="">
                    <span id="detail-icon-spin" style="position:absolute;inset:8px;display:none;align-items:center;justify-content:center;"><span class="block icon-spinner rounded-full animate-spin" style="width:60%;height:60%;aspect-ratio:1/1;"></span></span>
                </div>
                <div class="min-w-0 flex-1">
                    <h3 id="detail-title" class="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug break-words"></h3>
                    <div id="detail-sub" class="text-sm text-slate-500 dark:text-slate-400 mt-1 break-words hidden"></div>
                </div>
                <button id="detail-open-btn" class="rounded-xl text-sm font-medium text-white bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-all">Open Link</button>
            </div>
            <div id="detail-text" class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap break-words mb-6 max-h-48 overflow-y-auto custom-scrollbar"></div>
            <!-- Mobile only (Option B): full-width Open Link button at the
                 bottom of the sheet. Hidden on desktop, where the header
                 button is used instead. Both buttons get the same label,
                 tint and click handler from showDetailPopup. -->
            <div id="detail-actions-mobile"><button id="detail-open-btn-mobile" class="rounded-xl text-sm font-medium text-white bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-all">Open Link</button></div>
        </div>
    </div>

    <!-- Logo customization (v25): preset gallery + color, or an image URL.
         When URL is non-empty it wins; preset+color used otherwise. Login only. -->
    <div id="logo-overlay" class="hidden fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="logo-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 class="text-lg font-bold mb-3 text-slate-800 dark:text-white">Logo</h3>
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Site Name</div>
            <input type="text" id="logo-name-input" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-sm outline-none dark:text-slate-200 mb-3" placeholder="RENVDER NAV">
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Logo Style</div>
            <div id="logo-presets" class="flex flex-wrap gap-3 mb-4"></div>
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Color</div>
            <div id="logo-colors" class="flex flex-wrap gap-2 mb-4"></div>
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Image URL</div>
            <input type="text" id="logo-url-input" class="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-sm outline-none dark:text-slate-200 mb-3" placeholder="https://...">
            <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Shape</div>
            <div class="flex gap-2 mb-4">
                <button id="logo-shape-square" class="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-600">Square</button>
                <button id="logo-shape-circle" class="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-600">Circle</button>
            </div>
            <div class="flex items-center gap-3 mb-2">
                <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Preview</div>
                <div id="logo-preview" class="w-8 h-8 flex items-center justify-center rounded-lg text-white"></div>
                <div id="logo-name-preview" class="font-bold text-lg tracking-wide text-slate-700 dark:text-slate-100"></div>
            </div>
            <div class="flex justify-end gap-3 mt-4">
                <button id="logo-cancel-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button id="logo-save-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all hover:translate-y-[-1px]">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Password Dialog -->
    <div id="password-dialog-overlay" class="hidden fixed inset-0 z-[70] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="password-dialog-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-slate-100 dark:border-slate-700 text-center transform transition-all duration-300 dialog-scale-hidden">
            <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-white">Authentication</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Please enter the admin password to continue</p>
            <input type="password" id="password-input" placeholder="Access password" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none mb-6 dark:text-white text-center tracking-widest text-lg transition-all">
            <div class="flex gap-3">
                <button id="password-cancel-btn" class="flex-1 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 font-medium transition-colors">Cancel</button>
                <button id="password-confirm-btn" class="flex-1 py-2.5 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 font-medium transition-colors">Confirm Login</button>
            </div>
        </div>
    </div>

    <!-- Custom Alert -->
    <div id="custom-alert-overlay" class="hidden fixed inset-0 z-[110] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="custom-alert-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 id="custom-alert-title" class="text-lg font-bold mb-2 text-slate-800 dark:text-white">Notice</h3>
            <p id="custom-alert-content" class="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed"></p>
            <div class="flex justify-end">
                <button id="custom-alert-confirm" class="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">Got it</button>
            </div>
        </div>
    </div>

    <!-- Custom Confirm -->
    <div id="custom-confirm-overlay" class="hidden fixed inset-0 z-[80] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="custom-confirm-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 class="text-lg font-bold mb-3 text-slate-800 dark:text-white">Confirm Action</h3>
            <p id="custom-confirm-message" class="text-slate-600 dark:text-slate-300 mb-6 text-sm"></p>
            <div class="flex justify-end gap-3">
                <button id="custom-confirm-cancel" class="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-slate-700 transition-colors font-medium">Cancel</button>
                <button id="custom-confirm-ok" class="px-4 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 transition-colors font-medium">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Category Input Dialog -->
    <div id="category-dialog" class="hidden fixed inset-0 z-[65] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="category-dialog-box" class="bg-white dark:bg-[#170a29] rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 id="category-dialog-title" class="text-lg font-bold mb-4 text-slate-800 dark:text-white">Category Name</h3>
            <input type="text" id="category-name-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none mb-6 dark:text-white transition-all" placeholder="Enter category name">
            <div class="flex justify-end gap-3">
                <button id="category-cancel-btn" class="px-4 py-2 text-sm rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 font-medium">Cancel</button>
                <button id="category-confirm-btn" class="px-4 py-2 text-sm rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 shadow-md font-medium">Confirm</button>
            </div>
        </div>
    </div>

    <div id="loading-mask" class="fixed inset-0 z-30 flex flex-col items-center justify-center transition-opacity">
        <div class="relative w-16 h-16">
            <div class="absolute inset-0 w-full h-full rounded-full loading-spinner-track"></div>
            <div class="absolute inset-0 w-full h-full rounded-full loading-spinner-arc animate-spin"></div>
        </div>
        <p class="mt-4 text-emerald-600 dark:text-emerald-400 font-medium animate-pulse tracking-wide">Loading...</p>
    </div>

    <!-- Tooltip Container -->
    <div id="custom-tooltip" class="fixed hidden pointer-events-none max-w-xs whitespace-pre-wrap border leading-relaxed tracking-wide backdrop-blur-sm rounded-xl shadow-glass px-4 py-2 text-sm transition-opacity duration-150
        bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200/50 dark:border-slate-700/50">
    </div>

    <script>
    let isEditMode = false;
    let isLoggedIn = false;
    // No stored choice yet: phones (<=767px, the same breakpoint as the
    // bottom-sheet CSS) default to list view; a stored choice always wins.
    const storedLayout = localStorage.getItem('listLayout');
    let isListLayout = storedLayout === null
        ? window.matchMedia('(max-width: 767px)').matches
        : storedLayout === 'true';
    localStorage.removeItem('appLayout'); // v27: old key from the APP-view toggle, no longer read

    let editCardMode = false;
    let isEditCategoryMode = false;

    const categories = {};
    let currentEngine;
    let initialDragState = { category: null, index: -1, group: '' };

    let latencyResults = {};
    let checkAllRunning = false;

    function siteKey(url) {
        return String(url || '')
            .replace(/^[a-z]+:\\/\\//i, '')
            .replace(/\\/+$/, '')
            .toLowerCase();
    }

    // ---- Simplified/Traditional unified search ----
    // Data: OpenCC TSCharacters (Apache-2.0, github.com/BYVoid/OpenCC).
    // Single-character Traditional->Simplified one-to-one map. Search normalizes
    // both the query and the site data to the Simplified side, so a Simplified
    // query finds Traditional content and vice versa. Multi-character words are
    // covered automatically because every character converts individually.
    const T2S_T = "㑯㑳㑶㓨㗲㘚㜄㜏㜢㠏㠣㥮㩜㩳㩵㺏䁪䁻䃮䊷䋙䋚䋹䋻䍦䎱䓣䙡䜀䝼䡵䥇䥑䥕䥱䦛䦟䧢䮄䯀䰾䱷䱽䲁䲘䴉丟並乾亂亙亞佇佈佔併來侖侶侷俁係俔俠俥俬倀倆倈倉個們倖倫倲偉偑側偵偽傌傑傖傘備傢傭傯傳傴債傷傾僂僅僉僑僕僞僤僥僨僱價儀儁儂億儈儉儎儐儔儕儘償優儲儷儸儺儻儼兇兌兒兗內兩冊冑冪凈凍凜凱別刪剄則剋剎剗剛剝剮剴創剷劃劄劇劉劊劌劍劏劑劚勁動務勛勝勞勢勣勩勱勳勵勸勻匭匯匱區協卹卻卽厙厠厤厭厲厴參叄叢吒吳吶呂咼員唄唸問啓啞啟啢喎喚喪喫喬單喲嗆嗇嗊嗎嗚嗩嗰嗶嘆嘍嘓嘔嘖嘗嘜嘩嘮嘯嘰嘵嘸嘽噁噓噚噝噠噥噦噯噲噴噸噹嚀嚇嚌嚐嚕嚙嚥嚦嚧嚨嚮嚲嚳嚴嚶囀囁囂囅囈囉囌囑囪圇國圍園圓圖團垻埡埨埰執堅堊堖堝堯報場塊塋塏塒塗塚塢塤塵塸塹塿墊墜墠墮墰墳墶墻墾壇壋壎壓壗壘壙壚壜壞壟壠壢壩壪壯壺壼壽夠夢夥夾奐奧奩奪奬奮奼妝姍姦娙娛婁婦婭媧媯媰媼媽嫋嫗嫵嫺嫻嫿嬀嬃嬈嬋嬌嬙嬡嬤嬪嬰嬸孃孋孌孫學孻孿宮寀寢實寧審寫寬寵寶將專尋對導尷屆屍屓屜屢層屨屬岡峯峴島峽崍崑崗崙崢崬嵐嵗嵽嵾嶁嶄嶇嶔嶗嶠嶢嶧嶨嶮嶸嶺嶼嶽巋巒巔巖巘巰巹帥師帳帶幀幃幓幗幘幟幣幫幬幷幹幾庫廁廂廄廈廎廕廚廝廞廟廠廡廢廣廩廬廳弒弔弳張強彄彆彈彌彎彔彙彠彥彫彲彿後徑從徠復徵徹恆恥悅悞悵悶悽惡惱惲惻愛愜愨愴愷愾慄態慍慘慚慟慣慤慪慫慮慳慶慺慼慾憂憊憐憑憒憖憚憤憫憮憲憶懇應懌懍懞懟懣懤懨懲懶懷懸懺懼懾戀戇戔戧戩戰戱戲戶扞拋拚挩挱挾捨捫捱捲掃掄掆掗掙掛採揀揚換揮揯損搖搗搧搵搶摑摜摟摯摳摶摺摻撈撏撐撓撝撟撣撥撫撲撳撻撾撿擁擄擇擊擋擓擔據擠擡擣擬擯擰擱擲擴擷擺擻擼擽擾攄攆攏攔攖攙攛攜攝攢攣攤攪攬敎敓敗敘敵數斂斃斆斕斬斷於旂旣昇時晉晛晝暈暉暐暘暢暫曄曆曇曉曏曖曠曥曨曬書會朥朧朮東枴柵柺査桱桿梔梘梜條梟梲棄棊棖棗棟棡棧棲棶椏椲楊楓楨業極榘榦榪榮榲榿構槍槓槤槧槨槮槳槶槼樁樂樅樑樓標樞樢樣樧樫樳樸樹樺樿橈橋機橢橫橯檁檉檔檜檟檢檣檮檯檳檸檻櫃櫍櫓櫚櫛櫝櫞櫟櫥櫧櫨櫪櫫櫬櫱櫳櫸櫻欄欅權欏欒欓欖欞欽歎歐歟歡歲歷歸歿殘殞殤殨殫殭殮殯殰殲殺殻殼毀毆毿氂氈氌氣氫氬氳氾汎汙決沒沖況泝洩洶浹浿涇涗涼淒淚淥淨淩淪淵淶淺渙減渢渦測渾湊湋湞湧湯溈準溝溫溮溳溼滄滅滌滎滙滬滯滲滷滸滻滾滿漁漊漍漚漢漣漬漲漵漸漿潁潑潔潕潙潚潛潤潯潰潷潿澀澆澇澐澗澠澤澦澩澫澮澱澾濁濃濄濆濕濘濚濛濜濟濤濧濫濰濱濺濼濾瀂瀅瀆瀇瀉瀋瀏瀕瀘瀝瀟瀠瀦瀧瀨瀰瀲瀾灃灄灑灒灕灘灙灝灡灣灤灧灩災為烏烴無煉煒煙煢煥煩煬煱熅熒熗熰熱熲熾燀燁燈燉燒燖燙燜營燦燬燭燴燶燻燼燾爍爐爛爭爲爺爾牀牆牘牴牽犖犛犢犧狀狹狽猙猶猻獁獃獄獅獎獨獪獫獮獰獱獲獵獷獸獺獻獼玀現琱琺琿瑋瑒瑣瑤瑩瑪瑲璉璊璕璗璡璣璦璫璯環璵璸璽璿瓅瓊瓏瓔瓚瓛甌甕產産畝畢畫異畵當疇疊痙痠痾瘂瘋瘍瘓瘞瘡瘧瘮瘲瘺瘻療癆癇癉癒癘癟癡癢癤癥癧癩癬癭癮癰癱癲發皁皚皰皸皺盃盜盞盡監盤盧盪眞眥眾睍睏睜睞瞘瞜瞞瞶瞼矇矓矚矯硃硜硤硨硯碕碩碭碸確碼碽磑磚磠磣磧磯磽磾礄礎礐礙礦礪礫礬礱祕祿禍禎禕禡禦禪禮禰禱禿秈稅稈稏稜稟種稱穀穇穌積穎穠穡穢穩穫穭窩窪窮窯窵窶窺竄竅竇竈竊竪競筆筍筧筴箇箋箏箚節範築篋篔篠篢篤篩篳篸簀簍簑簞簡簣簫簹簽簾籃籅籌籔籙籛籜籟籠籤籩籪籬籮籲粵糉糝糞糧糰糲糴糶糹糾紀紂紃約紅紆紇紈紉紋納紐紓純紕紖紗紘紙級紛紜紝紞紡紬紮細紱紲紳紵紹紺紼紿絀終絃組絅絆絎結絕絛絝絞絡絢給絨絪絰統絲絳絶絹絺綁綃綄綆綈綉綌綎綏綐綑經綖綜綝綞綠綡綢綣綧綪綫綬維綯綰綱網綳綴綵綸綹綺綻綽綾綿緄緇緊緋緑緒緓緔緗緘緙線緝緞締緡緣緦編緩緬緯緱緲練緶緹緻緼縈縉縊縋縐縑縕縗縛縝縞縟縣縧縫縭縮縯縱縲縳縴縵縶縷縹總績繃繅繆繒織繕繚繞繡繢繩繪繫繭繮繯繰繳繶繸繹繻繼繽繾繿纁纆纇纈纊續纍纏纓纔纕纖纘纜缽罃罈罌罎罰罵罷羅羆羈羋羣羥羨義羶習翫翬翹翽耬耮聖聞聯聰聲聳聵聶職聹聽聾肅脅脈脛脣脩脫脹腎腖腡腦腫腳腸膃膕膚膞膠膢膩膽膾膿臉臍臏臘臚臟臠臢臥臨臺與興舉舊舖舘艙艤艦艫艱艷芻苧茲荊莊莖莢莧華菴菸萇萊萬萴萵葉葒葤葦葯葷蒍蒐蒓蒔蒕蒞蒼蓀蓆蓋蓮蓯蓴蓽蔄蔔蔘蔞蔣蔥蔦蔭蔯蔿蕁蕆蕎蕒蕓蕕蕘蕢蕩蕪蕭蕷薀薈薊薌薑薔薘薟薦薩薴薵薹薺藍藎藝藥藪藭藴藶藹藺蘀蘄蘆蘇蘊蘋蘚蘞蘟蘢蘭蘺蘿虆虉處虛虜號虧虯蛺蛻蜆蝀蝕蝟蝦蝨蝸螄螞螢螮螻螿蟄蟈蟎蟣蟬蟯蟲蟳蟶蟻蠁蠅蠆蠍蠐蠑蠔蠟蠣蠨蠱蠶蠻衆衊術衕衚衛衝袞袷裊裏補裝裡製複褌褘褲褳褸褻襀襇襉襏襖襝襠襤襪襬襯襲襴覈見覎規覓視覘覡覥覦親覬覯覲覷覺覽覿觀觴觶觸訁訂訃計訊訌討訏訐訒訓訕訖託記訛訝訟訢訣訥訩訪設許訴訶診註証詀詁詆詎詐詒詔評詖詗詘詛詝詞詠詡詢詣試詩詪詫詬詭詮詰話該詳詵詷詼詿誄誅誆誇誌認誑誒誕誘誚語誠誡誣誤誥誦誨說説誰課誶誹誼誾調諂諄談諉請諍諏諑諒諓論諗諛諜諝諞諟諡諢諤諦諧諫諭諮諱諲諳諴諶諷諸諺諼諾謀謁謂謄謅謊謎謏謐謔謖謗謙謚講謝謠謡謨謫謬謭謳謹謾譁證譎譏譓譖識譙譚譜譞譟譫譭譯議譴護譸譽譾讀讅變讋讌讎讒讓讕讖讚讜讞谿豈豎豐豔豬豶貍貓貙貝貞貟負財貢貧貨販貪貫責貯貰貲貳貴貶買貸貺費貼貽貿賀賁賂賃賄賅資賈賊賑賒賓賕賙賚賜賞賠賡賢賣賤賦賧質賫賬賭賰賴賵賺賻購賽賾贄贅贇贈贊贋贍贏贐贓贔贖贗贛贜赬趕趙趨趲跡踐踰踴蹌蹕蹟蹠蹣蹤蹺躂躉躊躋躍躎躑躒躓躕躚躡躥躦躪軀車軋軌軍軏軑軒軔軛軝軟軤軫軲軸軹軺軻軼軾較輄輅輇輈載輊輋輒輓輔輕輗輛輜輝輞輟輥輦輩輪輬輮輯輳輶輸輻輼輾輿轀轂轄轅轆轉轍轎轔轟轡轢轤辦辭辮辯農迴逕這連週進遊運過達違遙遜遞遠遡適遲遶遷選遺遼邁還邇邊邏邐郟郵鄆鄉鄒鄔鄖鄧鄩鄭鄰鄲鄳鄴鄶鄺酇酈醃醖醜醞醟醣醫醬醱醲釀釁釃釅釋釐釒釓釔釕釗釘釙針釣釤釦釧釩釴釵釷釹釺釾釿鈀鈁鈃鈄鈅鈇鈈鈉鈍鈎鈐鈑鈒鈔鈕鈞鈡鈣鈥鈦鈧鈮鈰鈳鈴鈷鈸鈹鈺鈽鈾鈿鉀鉅鉆鉈鉉鉊鉋鉍鉑鉕鉗鉚鉛鉝鉞鉢鉤鉥鉦鉧鉬鉭鉮鉳鉶鉷鉸鉺鉻鉿銀銃銅銈銍銑銓銖銘銚銛銜銠銣銥銦銨銩銪銫銬銱銳銶銷銹銻銼鋁鋃鋅鋇鋌鋏鋐鋒鋗鋙鋝鋟鋣鋤鋥鋦鋨鋩鋪鋭鋮鋯鋰鋱鋶鋸鋹鋼錀錁錄錆錇錈錏錐錒錕錘錙錚錛錞錟錠錡錢錤錦錨錩錫錮錯録錳錶錸錼鍀鍁鍃鍅鍆鍇鍈鍊鍋鍍鍔鍘鍚鍛鍠鍤鍥鍩鍬鍭鍰鍵鍶鍺鍼鍾鎂鎄鎇鎊鎌鎓鎔鎖鎘鎚鎛鎝鎡鎢鎣鎦鎧鎩鎪鎬鎭鎮鎰鎲鎳鎵鎶鎸鎿鏃鏇鏈鏌鏍鏏鏐鏑鏗鏘鏜鏝鏞鏟鏡鏢鏤鏨鏰鏵鏷鏹鏺鏻鏽鐃鐄鐇鐋鐍鐏鐐鐒鐓鐔鐘鐙鐝鐠鐥鐦鐧鐨鐩鐫鐮鐯鐲鐳鐵鐶鐸鐺鐽鐿鑄鑊鑌鑑鑒鑔鑕鑞鑠鑣鑥鑪鑭鑰鑱鑲鑷鑹鑼鑽鑾鑿钁钂長門閂閃閆閈閉開閌閎閏閑閒間閔閘閡閣閤閥閨閩閫閬閭閱閲閶閹閻閼閽閾閿闃闆闇闈闉闊闋闌闍闐闑闒闓闔闕闖關闞闠闡闢闤闥陘陝陞陣陰陳陸陽隉隊階隑隕際隤隨險隮隯隱隴隸隻雋雖雙雛雜雞離難雲電霑霢霧霽靂靄靆靈靉靚靜靝靦靨鞏鞝鞦鞽韁韃韆韉韋韌韍韓韙韜韝韞韻響頁頂頃項順頇須頊頌頍頎頏預頑頒頓頔頗領頜頠頡頤頦頫頭頮頰頲頴頵頷頸頹頻頽顆題額顎顏顒顓顔顗願顙顛類顢顥顧顫顬顯顰顱顳顴風颭颮颯颱颳颶颸颺颻颼飀飄飆飈飛飠飢飣飥飩飪飫飭飯飱飲飴飼飽飾飿餃餄餅餈餉養餌餎餏餑餒餓餕餖餗餘餚餛餜餞餡館餬餱餳餵餶餷餸餺餼餾餿饁饃饅饈饉饊饋饌饑饒饗饘饜饞饢馬馭馮馱馳馴馹馼駁駃駉駐駑駒駓駔駕駘駙駛駝駟駡駢駪駭駰駱駸駼駿騁騂騄騅騊騌騍騎騏騑騖騙騞騠騤騧騫騭騮騰騱騵騶騷騸騾驀驁驂驃驄驅驊驌驍驎驏驕驗驚驛驟驢驤驥驦驪驫骯髏髒體髕髖髮鬆鬍鬚鬢鬥鬧鬨鬩鬮鬱鬹魎魘魚魛魟魢魨魯魴魷魺鮀鮁鮃鮆鮈鮊鮋鮍鮎鮐鮑鮒鮓鮚鮜鮝鮞鮟鮠鮡鮣鮦鮪鮫鮭鮮鮳鮶鮸鮺鯀鯁鯇鯉鯊鯒鯔鯕鯖鯗鯛鯝鯡鯢鯤鯧鯨鯪鯫鯰鯴鯷鯻鯽鯿鰁鰂鰃鰆鰈鰉鰊鰌鰍鰏鰐鰒鰓鰛鰜鰟鰠鰣鰤鰥鰧鰨鰩鰭鰮鰱鰲鰳鰵鰶鰷鰹鰺鰻鰼鰾鱀鱂鱅鱇鱈鱉鱒鱔鱖鱗鱘鱚鱝鱟鱠鱣鱤鱧鱨鱭鱯鱲鱷鱸鱺鳥鳧鳩鳬鳲鳳鳴鳶鳾鴆鴇鴉鴒鴕鴛鴝鴞鴟鴣鴦鴨鴯鴰鴴鴷鴻鴿鵁鵂鵃鵏鵐鵑鵒鵓鵜鵝鵟鵠鵡鵪鵬鵮鵯鵰鵲鵷鵾鶄鶇鶉鶊鶓鶖鶘鶚鶠鶡鶥鶩鶪鶬鶯鶱鶲鶴鶹鶺鶻鶼鶿鷀鷁鷂鷄鷉鷊鷓鷖鷗鷙鷚鷟鷥鷦鷫鷭鷯鷲鷳鷴鷸鷹鷺鷽鸂鸇鸊鸌鸏鸑鸕鸘鸚鸛鸝鸞鹵鹹鹺鹼鹽麗麥麩麪麫麬麯麳麴麵麼麽黃黌點黨黲黴黶黷黽黿鼂鼉鼕鼴齊齋齎齏齒齔齕齗齘齙齜齟齠齡齣齦齧齪齬齮齯齲齶齷齼龍龎龐龑龔龕龜鿁鿓𠁞𠗣𡃕𡅏𡑍𡑭𡓾𡔖𡞵𡠹𡢃𡮉𡮣𡳳𡻕𡾱𢣚𢶫𢹿𣈶𣙎𣞻𣠩𣠲𣯶𣾷𤁣𤅶𤓩𤪺𤫩𤳸𥊝𥌃𥕥𥖅𥗽𥢢𥸠𥼽𦘧𦣎𦪙𧜗𧜵𧝞𧟀𧩙𧵳𧶧𨊰𨊸𨋢𨤻𨦫𨧀𨧜𨨏𨭆𨭎𨯅𩞯𩠴𩣑𩶘𰻞";
    const T2S_S = "㑔㑇㐹刾𠵾㘎㚯㛣𡞱㟆𫵷㤘㨫㧐擜𤠋𥇢䀥鿎䌶䌺䌻䌿䌾䍠䎬𬜯䙌䜧䞍𫟦䦂鿏𬭯䥾䦶䦷𨸟𫠊䯅鲃䲣䲝鳚鳤鹮丢并干乱亘亚伫布占并来仑侣局俣系伣侠伡私伥俩俫仓个们幸伦㑈伟㐽侧侦伪㐷杰伧伞备家佣偬传伛债伤倾偻仅佥侨仆伪𫢸侥偾雇价仪俊侬亿侩俭傤傧俦侪尽偿优储俪㑩傩傥俨凶兑儿兖内两册胄幂净冻凛凯别删刭则克刹刬刚剥剐剀创铲划札剧刘刽刿剑㓥剂㔉劲动务勋胜劳势𪟝勚劢勋励劝匀匦汇匮区协恤却即厍厕历厌厉厣参叁丛咤吴呐吕呙员呗念问启哑启唡㖞唤丧吃乔单哟呛啬唝吗呜唢𠮶哔叹喽啯呕啧尝唛哗唠啸叽哓呒啴恶嘘㖊咝哒哝哕嗳哙喷吨当咛吓哜尝噜啮咽呖𠰷咙向亸喾严嘤啭嗫嚣冁呓啰苏嘱囱囵国围园圆图团坝垭𫭢采执坚垩垴埚尧报场块茔垲埘涂冢坞埙尘𫭟堑𪣻垫坠𫮃堕坛坟垯墙垦坛垱埙压𡋤垒圹垆坛坏垄垅坜坝塆壮壶壸寿够梦伙夹奂奥奁夺奖奋姹妆姗奸𫰛娱娄妇娅娲妫㛀媪妈袅妪妩娴娴婳妫媭娆婵娇嫱嫒嬷嫔婴婶娘㛤娈孙学𡥧孪宫采寝实宁审写宽宠宝将专寻对导尴届尸屃屉屡层屦属冈峰岘岛峡崃昆岗仑峥岽岚岁𫶇㟥嵝崭岖嵚崂峤峣峄峃崄嵘岭屿岳岿峦巅岩𪩘巯卺帅师帐带帧帏㡎帼帻帜币帮帱并干几库厕厢厩厦庼荫厨厮𫷷庙厂庑废广廪庐厅弑吊弪张强𫸩别弹弥弯录汇彟彦雕彨佛后径从徕复征彻恒耻悦悮怅闷凄恶恼恽恻爱惬悫怆恺忾栗态愠惨惭恸惯悫怄怂虑悭庆㥪戚欲忧惫怜凭愦慭惮愤悯怃宪忆恳应怿懔蒙怼懑㤽恹惩懒怀悬忏惧慑恋戆戋戗戬战戯戏户捍抛拼捝挲挟舍扪挨卷扫抡㧏挜挣挂采拣扬换挥搄损摇捣扇揾抢掴掼搂挚抠抟折掺捞挦撑挠㧑挢掸拨抚扑揿挞挝捡拥掳择击挡㧟担据挤抬捣拟摈拧搁掷扩撷摆擞撸㧰扰摅撵拢拦撄搀撺携摄攒挛摊搅揽教敚败叙敌数敛毙敩斓斩断于旗既升时晋𬀪昼晕晖𬀩旸畅暂晔历昙晓向暧旷𣆐昽晒书会𦛨胧术东拐栅拐查𣐕杆栀枧𬂩条枭棁弃棋枨枣栋㭎栈栖梾桠㭏杨枫桢业极矩干杩荣榅桤构枪杠梿椠椁椮桨椢椝桩乐枞梁楼标枢㭤样榝㭴桪朴树桦椫桡桥机椭横𣓿檩柽档桧槚检樯梼台槟柠槛柜𬃊橹榈栉椟橼栎橱槠栌枥橥榇蘖栊榉樱栏榉权椤栾𣗋榄棂钦叹欧欤欢岁历归殁残殒殇㱮殚僵殓殡㱩歼杀壳壳毁殴毵牦毡氇气氢氩氲泛泛污决没冲况溯泄汹浃𬇙泾涚凉凄泪渌净凌沦渊涞浅涣减沨涡测浑凑𣲗浈涌汤沩准沟温浉涢湿沧灭涤荥汇沪滞渗卤浒浐滚满渔溇𬇹沤汉涟渍涨溆渐浆颍泼洁𣲘沩㴋潜润浔溃滗涠涩浇涝沄涧渑泽滪泶𬇕浍淀㳠浊浓㳡𣸣湿泞溁蒙浕济涛㳔滥潍滨溅泺滤澛滢渎㲿泻沈浏濒泸沥潇潆潴泷濑弥潋澜沣滠洒𪷽漓滩𣺼灏㳕湾滦滟滟灾为乌烃无炼炜烟茕焕烦炀㶽煴荧炝𬉼热颎炽𬊤烨灯炖烧𬊈烫焖营灿毁烛烩㶶熏烬焘烁炉烂争为爷尔床墙牍抵牵荦牦犊牺状狭狈狰犹狲犸呆狱狮奖独狯猃狝狞㺍获猎犷兽獭献猕猡现雕珐珲玮玚琐瑶莹玛玱琏𫞩𬍤𬍡琎玑瑷珰㻅环玙瑸玺璇𬍛琼珑璎瓒𤩽瓯瓮产产亩毕画异画当畴叠痉酸疴痖疯疡痪瘗疮疟瘆疭瘘瘘疗痨痫瘅愈疠瘪痴痒疖症疬癞癣瘿瘾痈瘫癫发皂皑疱皲皱杯盗盏尽监盘卢荡真眦众𪾢困睁睐眍䁖瞒瞆睑蒙眬瞩矫朱硁硖砗砚埼硕砀砜确码䂵硙砖硵碜碛矶硗䃅硚础𬒈碍矿砺砾矾砻秘禄祸祯祎祃御禅礼祢祷秃籼税秆䅉棱禀种称谷䅟稣积颖秾穑秽稳获穞窝洼穷窑窎窭窥窜窍窦灶窃竖竞笔笋笕䇲个笺筝札节范筑箧筼筿𬕂笃筛筚𥮾箦篓蓑箪简篑箫筜签帘篮𥫣筹䉤箓篯箨籁笼签笾簖篱箩吁粤粽糁粪粮团粝籴粜纟纠纪纣𬘓约红纡纥纨纫纹纳纽纾纯纰纼纱纮纸级纷纭纴𬘘纺䌷扎细绂绁绅纻绍绀绋绐绌终弦组䌹绊绗结绝绦绔绞络绚给绒𬘡绖统丝绛绝绢𫄨绑绡𬘫绠绨绣绤𬘩绥䌼捆经𫄧综𬘭缍绿𫟅绸绻𬘯𬘬线绶维绹绾纲网绷缀彩纶绺绮绽绰绫绵绲缁紧绯绿绪绬绱缃缄缂线缉缎缔缗缘缌编缓缅纬缑缈练缏缇致缊萦缙缢缒绉缣缊缞缚缜缟缛县绦缝缡缩𬙂纵缧䌸纤缦絷缕缥总绩绷缫缪缯织缮缭绕绣缋绳绘系茧缰缳缲缴𫄷䍁绎𦈡继缤缱䍀𫄸𬙊颣缬纩续累缠缨才𬙋纤缵缆钵䓨坛罂坛罚骂罢罗罴羁芈群羟羡义膻习玩翚翘翙耧耢圣闻联聪声耸聩聂职聍听聋肃胁脉胫唇修脱胀肾胨脶脑肿脚肠腽腘肤䏝胶𦝼腻胆脍脓脸脐膑腊胪脏脔臜卧临台与兴举旧铺馆舱舣舰舻艰艳刍苎兹荆庄茎荚苋华庵烟苌莱万荝莴叶荭荮苇药荤𫇭搜莼莳蒀莅苍荪席盖莲苁莼荜𬜬卜参蒌蒋葱茑荫𫈟𫇭荨蒇荞荬芸莸荛蒉荡芜萧蓣蕰荟蓟芗姜蔷荙莶荐萨苧䓓苔荠蓝荩艺药薮䓖蕴苈蔼蔺萚蕲芦苏蕴苹藓蔹𦻕茏兰蓠萝蔂𬟁处虚虏号亏虬蛱蜕蚬𬟽蚀猬虾虱蜗蛳蚂萤䗖蝼螀蛰蝈螨虮蝉蛲虫𫊻蛏蚁蚃蝇虿蝎蛴蝾蚝蜡蛎蟏蛊蚕蛮众蔑术同胡卫冲衮夹袅里补装里制复裈袆裤裢褛亵𫌀裥裥袯袄裣裆褴袜摆衬袭襕核见觃规觅视觇觋觍觎亲觊觏觐觑觉览觌观觞觯触讠订讣计讯讧讨𬣙讦讱训讪讫托记讹讶讼䜣诀讷讻访设许诉诃诊注证𧮪诂诋讵诈诒诏评诐诇诎诅𬣞词咏诩询诣试诗𬣳诧诟诡诠诘话该详诜𫍣诙诖诔诛诓夸志认诳诶诞诱诮语诚诫诬误诰诵诲说说谁课谇诽谊訚调谄谆谈诿请诤诹诼谅𬣡论谂谀谍谞谝𬤊谥诨谔谛谐谏谕咨讳𬤇谙𫍯谌讽诸谚谖诺谋谒谓誊诌谎谜𫍲谧谑谡谤谦谥讲谢谣谣谟谪谬谫讴谨谩哗证谲讥𬤝谮识谯谭谱𫍽噪谵毁译议谴护诪誉谫读谉变詟䜩雠谗让谰谶赞谠谳溪岂竖丰艳猪豮狸猫䝙贝贞贠负财贡贫货贩贪贯责贮贳赀贰贵贬买贷贶费贴贻贸贺贲赂赁贿赅资贾贼赈赊宾赇赒赉赐赏赔赓贤卖贱赋赕质赍账赌䞐赖赗赚赙购赛赜贽赘赟赠赞赝赡赢赆赃赑赎赝赣赃赪赶赵趋趱迹践逾踊跄跸迹跖蹒踪跷跶趸踌跻跃䟢踯跞踬蹰跹蹑蹿躜躏躯车轧轨军𫐄轪轩轫轭𬨂软轷轸轱轴轵轺轲轶轼较𨐈辂辁辀载轾𪨶辄挽辅轻𫐐辆辎辉辋辍辊辇辈轮辌𫐓辑辏𬨎输辐辒辗舆辒毂辖辕辘转辙轿辚轰辔轹轳办辞辫辩农回径这连周进游运过达违遥逊递远溯适迟绕迁选遗辽迈还迩边逻逦郏邮郓乡邹邬郧邓𬩽郑邻郸𫑡邺郐邝酂郦腌酝丑酝蒏糖医酱酦𬪩酿衅酾酽释厘钅钆钇钌钊钉钋针钓钐扣钏钒𬬩钗钍钕钎䥺𬬱钯钫钘钭钥𫓧钚钠钝钩钤钣钑钞钮钧钟钙钬钛钪铌铈钶铃钴钹铍钰钸铀钿钾巨钻铊铉𬬿铇铋铂钷钳铆铅𫟷钺钵钩𬬸钲𬭁钼钽𬬹锫铏𫟹铰铒铬铪银铳铜𫓯铚铣铨铢铭铫铦衔铑铷铱铟铵铥铕铯铐铞锐𨱇销锈锑锉铝锒锌钡铤铗𬭎锋𫓶铻锊锓铘锄锃锔锇铓铺锐铖锆锂铽锍锯𬬮钢𬬭锞录锖锫锩铔锥锕锟锤锱铮锛𬭚锬锭锜钱𫓹锦锚锠锡锢错录锰表铼镎锝锨锪钫钔锴锳炼锅镀锷铡钖锻锽锸锲锘锹𬭤锾键锶锗针钟镁锿镅镑镰𬭩镕锁镉锤镈𨱏镃钨蓥镏铠铩锼镐镇镇镒镋镍镓鿔镌镎镞旋链镆镙𬭬镠镝铿锵镗镘镛铲镜镖镂錾镚铧镤镪䥽𬭸锈铙𨱑𫔍铴𫔎𨱔镣铹镦镡钟镫镢镨䦅锎锏镄𬭼镌镰䦃镯镭铁镮铎铛𫟼镱铸镬镔鉴鉴镲锧镴铄镳镥𬬻镧钥镵镶镊镩锣钻銮凿镢镋长门闩闪闫闬闭开闶闳闰闲闲间闵闸阂阁合阀闺闽阃阆闾阅阅阊阉阎阏阍阈阌阒板暗闱𬮱阔阕阑阇阗𫔶阘闿阖阙闯关阚阓阐辟阛闼陉陕升阵阴陈陆阳陧队阶𬮿陨际𬯎随险𬯀陦隐陇隶只隽虽双雏杂鸡离难云电沾霡雾霁雳霭叇灵叆靓静靔腼靥巩绱秋鞒缰鞑千鞯韦韧韨韩韪韬鞲韫韵响页顶顷项顺顸须顼颂𫠆颀颃预顽颁顿𬱖颇领颌𬱟颉颐颏𫖯头颒颊颋颕𫖳颔颈颓频颓颗题额颚颜颙颛颜𫖮愿颡颠类颟颢顾颤颥显颦颅颞颧风飐飑飒台刮飓飔飏飖飕飗飘飙飚飞饣饥饤饦饨饪饫饬饭飧饮饴饲饱饰饳饺饸饼糍饷养饵饹饻饽馁饿馂饾𫗧余肴馄馃饯馅馆糊糇饧喂馉馇𩠌馎饩馏馊馌馍馒馐馑馓馈馔饥饶飨𫗴餍馋馕马驭冯驮驰驯驲𫘜驳𫘝𬳶驻驽驹𬳵驵驾骀驸驶驼驷骂骈𬳽骇骃骆骎𬳿骏骋骍𫘧骓𫘦骔骒骑骐𬴂骛骗𬴃𫘨骙䯄骞骘骝腾𫘬𫘪驺骚骟骡蓦骜骖骠骢驱骅骕骁𬴊骣骄验惊驿骤驴骧骥骦骊骉肮髅脏体髌髋发松胡须鬓斗闹哄阋阄郁鬶魉魇鱼鱽𫚉鱾鲀鲁鲂鱿鲄𬶍鲅鲆𫚖𬶋鲌鲉鲏鲇鲐鲍鲋鲊鲒鲘鲞鲕𩽾𬶏𬶐䲟鲖鲔鲛鲑鲜鲓鲪𩾃鲝鲧鲠鲩鲤鲨鲬鲻鲯鲭鲞鲷鲴鲱鲵鲲鲳鲸鲮鲰鲶鲺鳀𬶟鲫鳊鳈鲗鳂䲠鲽鳇𬶠䲡鳅鲾鳄鳆鳃鳁鳒鳑鳋鲥𫚕鳏䲢鳎鳐鳍鳁鲢鳌鳓鳘𬶭鲦鲣鲹鳗鳛鳔𬶨鳉鳙𩾌鳕鳖鳟鳝鳜鳞鲟𬶮鲼鲎鲙鳣鳡鳢鲿鲚鳠𫚭鳄鲈鲡鸟凫鸠凫鸤凤鸣鸢䴓鸩鸨鸦鸰鸵鸳鸲鸮鸱鸪鸯鸭鸸鸹鸻䴕鸿鸽䴔鸺鸼𬷕鹀鹃鹆鹁鹈鹅𫛭鹄鹉鹌鹏鹐鹎雕鹊鹓鹍䴖鸫鹑鹒鹋鹙鹕鹗𬸘鹖鹛鹜䴗鸧莺𬸣鹟鹤鹠鹡鹘鹣鹚鹚鹢鹞鸡䴘鹝鹧鹥鸥鸷鹨𬸦鸶鹪鹔𬸪鹩鹫鹇鹇鹬鹰鹭鸴㶉鹯䴙鹱鹲𬸚鸬鹴鹦鹳鹂鸾卤咸鹾碱盐丽麦麸面面𤿲曲𪎌曲面么么黄黉点党黪霉黡黩黾鼋鼌鼍冬鼹齐斋赍齑齿龀龁龂𬹼龅龇龃龆龄出龈啮龊龉𬺈𫠜龋腭龌𬺓龙厐庞䶮龚龛龟䜤鿒𠀾㓆𠴛𠲥𫭼𡋗𡋀𡍣㛟㛿㛠𡭜𡭬𡳃岁㟜𢘝𢫞𢬦暅㭣𣘓𣞎𣑶毶㳢𣺽𣷷𤊰㻘㻏𤳄𥅿𥅘𥐰𥐯𬒗䅪𥮋𥹥𡳒𦟗䑽䘞䙊䘛𧝧䜥䞌䞎䢀䢁䢂𨤰䦀𬭊䦁𬭛𬭶𬭳䥿䭪𩠠䯃䲞𰻝";
    // Spread into code points, NOT string indices: indexing a string by position
    // splits surrogate pairs. CJK Ext-B keys (e.g. 𠋦) occupy 2 UTF-16 units,
    // so index-based pairing misaligns the key stream against the value stream
    // after the first Ext-B entry, corrupting most of the Traditional->Simplified map.
    const T2S_KEYS = [...T2S_T];
    const T2S_VALS = [...T2S_S];
    const T2S_MAP = new Map();
    for (let i = 0; i < T2S_KEYS.length; i++) T2S_MAP.set(T2S_KEYS[i], T2S_VALS[i]);

    function toSimplified(str) {
        if (!str) return '';
        let out = '';
        for (const ch of str) out += T2S_MAP.get(ch) || ch;
        return out;
    }
    function findCardsByUrl(rawUrl) {
        const out = [];
        document.querySelectorAll('[data-url]').forEach((c) => {
            if (c.getAttribute('data-url') === rawUrl) out.push(c);
        });
        return out;
    }

    function renderStatus(card, state) {
        const tag = card.querySelector('.card-status-tag');
        if (!tag) return;
        tag.classList.remove('checking', 'online', 'slow', 'offline');
        if (state === 'checking') {
            tag.classList.add('checking', 'visible');
            tag.textContent = T('Checking...');
            tag.title = '';
        } else if (state && state.online) {
            const latency = Number(state.latency) || 0;
            const isLocal = state.source === 'local';
            if (!isLocal && latency > 1000) {
                tag.classList.add('offline', 'visible');
            } else if (latency > 300) {
                tag.classList.add('slow', 'visible');
            } else {
                tag.classList.add('online', 'visible');
            }
            tag.textContent = latency + 'ms';
            tag.title = state.status != null ? ('HTTP ' + state.status + ', ' + latency + 'ms') : ('Online ' + latency + 'ms');
        } else {
            tag.classList.add('offline', 'visible');
            tag.textContent = T('Offline');
            tag.title = state && state.status != null ? ('HTTP ' + state.status) : 'Offline or timeout';
        }
    }

    async function localProbe(url) {
        const start = Date.now();
        const TIMEOUT = 3000;
        return new Promise((resolve) => {
            let settled = false;
            let overallTimer = null;
            let img = null;
            const controller = new AbortController();

            const finish = (result) => {
                if (settled) return;
                settled = true;
                if (overallTimer) { clearTimeout(overallTimer); overallTimer = null; }
                try { controller.abort(); } catch (_) {}
                if (img) {
                    img.onload = null;
                    img.onerror = null;
                    img.src = '';
                    img = null;
                }
                resolve(Object.assign({ latency: Date.now() - start }, result));
            };

            overallTimer = setTimeout(
                () => finish({ online: false, status: 'error', source: 'local' }),
                TIMEOUT + 200
            );

            fetch(url, {
                mode: 'no-cors',
                redirect: 'follow',
                cache: 'no-store',
                signal: controller.signal
            }).then(() => finish({ online: true, status: 200, source: 'local' }))
              .catch(() => {});

            try {
                img = new Image();
                img.onload = () => finish({ online: true, status: 200, source: 'local' });
                img.onerror = () => {};
                const cleanUrl = new URL(url).origin;
                // 優化點：優先嘗試抓取高清的 apple-touch-icon.png
                // 如果網站沒提供，瀏覽器會自動處理，且這樣能大幅提升手機端的清晰度
                img.src = cleanUrl + '/apple-touch-icon.png?_t=' + Date.now();
            } catch (e) {
                img = null;
            }
        });
    }

    // One-click check: a queue with max concurrency 5, checks every site
    async function checkAllSites() {
        if (!isLoggedIn) { alert('Please log in first to use the check feature'); return; }
        if (checkAllRunning) return;
        if (!await customConfirm('Check liveness and latency for all sites?')) return;
        checkAllRunning = true;

        const statusEl = document.getElementById('check-all-status');
        if (statusEl) statusEl.textContent = T('Checking...');

        const links = getAllLinks().filter((l) => l && l.url);
        const total = links.length;

        if (total === 0) {
            checkAllRunning = false;
            if (statusEl) statusEl.textContent = T('0 sites');
            return;
        }

        const allCards = document.querySelectorAll('[data-url]');
        allCards.forEach((c) => renderStatus(c, 'checking'));

        links.forEach((l) => { latencyResults[siteKey(l.url)] = 'checking'; });

        const queue = links.slice();
        let doneCount = 0;

        let lastProgressUpdate = 0;
        function updateProgress() {
            if (!statusEl) return;
            const now = Date.now();
            // Throttle the progress text to refresh at most once per 100ms, or force a refresh when everything is done
            if (now - lastProgressUpdate > 100 || doneCount === total) {
                statusEl.textContent = doneCount + '/' + total;
                lastProgressUpdate = now;
            }
        }

        async function worker() {
            while (queue.length > 0) {
                const link = queue.shift();
                if (!link) continue;
                const key = siteKey(link.url);
                const cards = findCardsByUrl(link.url);
                const result = await localProbe(link.url);
                latencyResults[key] = result;
                if (cards.length > 0) {
                    cards.forEach((c) => renderStatus(c, result));
                }
                doneCount++;
                updateProgress();
            }
        }

        const tasks = [];
        const concurrency = Math.min(5, queue.length);
        for (let i = 0; i < concurrency; i++) {
            tasks.push(worker());
        }

        await Promise.all(tasks);

        checkAllRunning = false;
        if (statusEl) statusEl.textContent = '';
    }

    function toggleListLayout() {
        isListLayout = !isListLayout;
        localStorage.setItem('listLayout', isListLayout);
        document.documentElement.classList.toggle('list-view', isListLayout);

        const checkbox = document.getElementById('layout-switch-checkbox');
        if (checkbox) checkbox.checked = isListLayout;

        loadSections();
    }

    function logAction(action, details) {
        console.log(\`\${new Date().toISOString()}: \${action} - \`, details);
    }

    // Search Engine
    const searchEngines = {
        duckduckgo: "https://duckduckgo.com/?q=",
        bing: "https://www.bing.com/search?q=",
        google: "https://www.google.com/search?q=",
        site: ""
    };

    // Search engine display name mapping
    const searchEngineLabels = {
        duckduckgo: "DuckDuckGo",
        bing: "Bing",
        google: "Google",
        site: "This site"
    };

    // Search engine icon mapping (SVG paths)
    const searchEngineIcons = {
        site:   '<svg width="16" height="16" fill="#FFD700" stroke="#FFD700" viewBox="0 0 24 24"><path fill="#FFD700" stroke="#FFD700" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
        duckduckgo: '<svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#DE5833"/><ellipse cx="10.5" cy="14.3" rx="5.2" ry="4.1" fill="#fff"/><circle cx="15" cy="9" r="3.3" fill="#fff"/><path d="M17.9 8.4l3.1-1.1-1.5 2.9z" fill="#F4A93B"/><circle cx="16" cy="8.1" r="0.75" fill="#14181c"/></svg>',
        bing:   '<svg width="16" height="16" viewBox="0 0 32 32"><path fill="#008373" d="m4.807 0l6.391 2.25v22.495l9.005-5.193l-4.411-2.073l-2.786-6.932l14.188 4.984v7.245L11.204 32l-6.396-3.563z"/></svg>',
        google: '<svg width="16" height="16" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>'
    };

    const engineList = ['site', 'duckduckgo', 'bing', 'google'];

    function renderSearchEngineMenu() {
        const container = document.getElementById('search-engine-list');
        const title = container.querySelector('div');
        container.innerHTML = '';
        container.appendChild(title);

        engineList.forEach(key => {
            const label = searchEngineLabels[key];
            const icon = searchEngineIcons[key];

            const btn = document.createElement('button');
            btn.className = "w-full text-left px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-3";
            btn.onclick = () => selectSearchEngine(key, label);

            btn.innerHTML = \`<span class="flex-shrink-0 w-4 h-4 flex items-center justify-center">\${icon}</span><span class="whitespace-nowrap">\${label}</span>\`;

            container.appendChild(btn);
        });
    }

    function updateSearchEngineUI(value) {
        const label = searchEngineLabels[value] || T("This site");
        const icon = searchEngineIcons[value] || searchEngineIcons['site'];

        document.getElementById('current-engine-label').textContent = label;
        document.getElementById('current-engine-icon').innerHTML = icon;
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const loadingMask = document.getElementById('loading-mask');
        if (loadingMask) loadingMask.classList.remove('hidden');
        initializeUIComponents();
        renderSearchEngineMenu();
        // Paint the cached logo first so the built-in star never flashes on
        // reload; loadLogoSetting() then corrects it from the server.
        try {
            const cachedLogo = JSON.parse(localStorage.getItem('logo_cache') || 'null');
            if (cachedLogo && cachedLogo.s) {
                logoState = cachedLogo.s;
                renderLogo();
            }
        } catch (e) {}
        buildLogoDialog();
        loadLogoSetting();
        await checkLoginStatusAndLoad();
        if (loadingMask) loadingMask.classList.add('hidden');
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible' && isLoggedIn) {
                await validateToken();
            }
        });
    });

    async function checkLoginStatusAndLoad() {
        const isValid = await validateToken();
        if (isValid) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
            isEditMode = false;
        }
        await loadLinks(true); // token was just validated above
    }

    function initializeUIComponents() {
        const elements = {
            themeSwitchCheckbox: document.getElementById('theme-switch-checkbox'),
            layoutSwitchCheckbox: document.getElementById('layout-switch-checkbox'),
            savePrefCheckbox: document.getElementById('save-preference-checkbox'),
            searchButton: document.getElementById('search-button'),
            searchInput: document.getElementById('search-input'),
            clearSearchButton: document.getElementById('clear-search-button'),
            menuToggleBtn: document.getElementById('profile-menu-toggle'),
            dropdown: document.getElementById('profile-dropdown'),
            dropdownWrapper: document.getElementById('profile-dropdown-wrapper'),
            backToTopBtn: document.getElementById('back-to-top-btn')
        };

        elements.themeSwitchCheckbox.checked = document.documentElement.classList.contains('dark');
        elements.themeSwitchCheckbox.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            window.isDarkTheme = isDark;
            applyTheme(isDark);
            // Custom icon URLs are per-mode: rebuild the cards so every icon
            // re-points to the slot that matches the new mode.
            renderCategories();

            const savePrefCheckbox = document.getElementById('save-preference-checkbox');
            if (savePrefCheckbox && savePrefCheckbox.checked) {
                localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
            }
        });

        if(elements.layoutSwitchCheckbox) {
            elements.layoutSwitchCheckbox.checked = isListLayout;
        }
        document.documentElement.classList.toggle('list-view', isListLayout);

        const savedPref = localStorage.getItem('savePreferences') === 'true';
        elements.savePrefCheckbox.checked = savedPref;

        currentEngine = (savedPref && localStorage.getItem('searchEngine')) || 'site';
        updateSearchEngineUI(currentEngine);

        const searchWrapper = document.getElementById('search-engine-wrapper');
        const searchBtn = document.getElementById('search-engine-btn');
        const searchMenu = document.getElementById('search-engine-menu');

        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchMenu.classList.toggle('hidden');
        });

        const catWrapper = document.getElementById('category-select-wrapper');
        const catBtn = document.getElementById('category-select-btn');
        const catMenu = document.getElementById('category-select-menu');

        catBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            catMenu.classList.toggle('hidden');
        });

        const toggleDropdown = () => {
            elements.dropdown.classList.toggle('hidden');
        };

        elements.menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        document.addEventListener('click', (e) => {
            if (!elements.dropdownWrapper.contains(e.target)) {
                 elements.dropdown.classList.add('hidden');
            }
            if (!searchWrapper.contains(e.target)) {
                searchMenu.classList.add('hidden');
            }
            if (!catWrapper.contains(e.target)) {
                catMenu.classList.add('hidden');
            }
        });

        elements.dropdown.addEventListener('click', (e) => { e.stopPropagation(); });

        elements.savePrefCheckbox.addEventListener('change', () => {
            const enabled = elements.savePrefCheckbox.checked;
            localStorage.setItem('savePreferences', enabled);
            if (!enabled) {
                localStorage.removeItem('searchEngine');
                localStorage.removeItem('theme_preference');
            } else {
                localStorage.setItem('searchEngine', currentEngine);
                localStorage.setItem('theme_preference', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            }
        });

        elements.searchButton.addEventListener('click', async () => {
            const query = elements.searchInput.value.trim();
            if (query) {
                if (currentEngine === 'site') {
                    await searchLinks(query);
                } else {
                    window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
                }
            }
        });

        if (elements.clearSearchButton) {
            elements.clearSearchButton.addEventListener('click', () => {
                elements.searchInput.value = '';
                loadSections();
            });
        }

        if (elements.searchInput) {
            elements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') elements.searchButton.click();
            });
            // Debounce live search: avoid a full re-render on every keystroke
            let searchDebounceTimer = null;
            elements.searchInput.addEventListener('input', (e) => {
                if (e.target.value) {
                    elements.clearSearchButton.classList.remove('hidden');
                } else {
                    elements.clearSearchButton.classList.add('hidden');
                }
                clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    const q = e.target.value.trim();
                    if (!q) {
                        // Restore the full listing when the keyword is cleared (without clearing the input)
                        renderCategorySections({ renderButtons: true });
                        return;
                    }
                    if (currentEngine === 'site') {
                        elements.clearSearchButton.classList.remove('hidden');
                        const filtered = getFilteredCategoriesByKeyword(q);
                        // Render live search results directly, avoiding an alert popup on every empty result which would interrupt continuous typing
                        renderCategorySections({ renderButtons: true, searchMode: true, filteredCategories: filtered });
                    }
                }, 220);
            });
        }

        window.addEventListener('scroll', () => {
            elements.backToTopBtn.classList.toggle('hidden', window.scrollY <= 300);
        }, { passive: true });

        setupScrollSpy();

        setupTooltipDelegation();
    }

    function selectSearchEngine(value, label) {
        currentEngine = value;
        updateSearchEngineUI(value);

        const savePrefCheckbox = document.getElementById('save-preference-checkbox');
        if (savePrefCheckbox && savePrefCheckbox.checked) {
            localStorage.setItem('searchEngine', value);
        }
        document.getElementById('search-engine-menu').classList.add('hidden');
    }


    function getAllLinks() {
        return Object.values(categories).map(category => category.links || []).flat();
    }

    async function loadLinks(skipValidate = false) {
        if (isLoggedIn && !skipValidate) {
            const isValid = await validateToken();
            if (isValid === false) {
                logout();
                return;
            }
        }
        const headers = { 'Content-Type': 'application/json' };
        if (isLoggedIn) {
            const token = localStorage.getItem('authToken');
            if (token) headers['Authorization'] = token;
        }

        try {
            const response = await fetchWithAuth('/api/getLinks', { cache: 'no-store' });
            if (!response.ok) throw new Error("HTTP error! status: " + response.status);

            const data = await response.json();
            if (data.categories) {
                Object.keys(categories).forEach(key => delete categories[key]);
                Object.assign(categories, data.categories);
            }

            loadSections();
            updateCategorySelect();
            updateUIState();
        } catch (error) {
            console.error('Error loading links:', error);
            await customAlert('Error loading links, please refresh the page and try again');
        }
    }

    async function saveDataToServer(actionName, data, force = false) {
        try {
            const response = await fetchWithAuth('/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categories: data, force: force || undefined }),
            });

            if (response.status === 401) {
                logout();
                await customAlert('Your login credentials have expired, please log in again');
                throw new Error('Unauthorized');
            }

            const result = await response.json().catch(() => ({}));
            if (!result.success) throw new Error(result.error ? 'Failed to save: ' + result.error : 'Failed to save');
            logAction(actionName + ' succeeded', {});
        } catch (error) {
            logAction(actionName + ' failed', { error: error.message });
            if (error.message !== 'Unauthorized') {
                 await customAlert(error.message && error.message.indexOf('Failed to save') === 0 ? error.message : T('Operation failed, please try again') + ' (' + actionName + ')');
            }
        }
    }

    async function saveLinks(force = false) {
        if (isEditMode) {
            await saveDataToServer('Save data', categories, force);
        }
    }

    async function addCategory() {
        if (!await validateTokenOrRedirect()) return;
        const categoryName = await showCategoryDialog('Please enter a new category name');
        if (!categoryName) return;
        if (categories[categoryName]) {
            await customAlert('This category already exists');
            return;
        }
        categories[categoryName] = { isHidden: false, groups: [], links: [] };
        updateCategorySelect();
        renderCategories();
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
        await saveLinks();
    }

    // Create an empty group inside a category: the name goes into the
    // category's groups list, so the group renders (with its header and a
    // "+" tile) before any link exists in it, and survives save + reload.
    async function addGroup(category) {
        if (!await validateTokenOrRedirect()) return;
        const cat = categories[category];
        if (!cat) return;
        const name = await showCategoryDialog('Please enter a new group name');
        if (name === null || name === undefined) return;
        if (!name) { await customAlert('Group name cannot be empty'); return; }
        if (name.length > 120) { await customAlert('Group name is too long (max 120 characters)'); return; }
        if (groupNamesOf(category).includes(name)) {
            await customAlert('A group with this name already exists in this category');
            return;
        }
        if (!Array.isArray(cat.groups)) cat.groups = [];
        cat.groups.push(name);
        renderCategoryGrid(category);
        await saveLinks();
    }

    // Rename a category, bilingual-aware (v27, mirroring renameGroup). The raw
    // key is the shared identity; the Chinese display comes from the " | "
    // format halves, falling back to the links' categoryZh slot. Prefill is
    // the name as displayed in the current view. Bilingual + zh view writes
    // the links' categoryZh slot (raw key kept); bilingual + EN view renames
    // the key and keeps the Chinese half of the " | " format; zh-only renames
    // key and categoryZh together; en-only renames the key.
    async function editCategoryName(oldName) {
        if (!await validateTokenOrRedirect()) return;
        const m = langMode();
        const shown = pickBilingual(oldName, 'c');
        const newName = await showCategoryDialog('Please enter the new category name', shown);
        if (!newName) return;
        if (newName.length > 120) { await customAlert('Category name is too long (max 120 characters)'); return; }
        const cat = categories[oldName];
        if (!cat) return;
        const catLinks = cat.links || [];
        // The typed text belongs to the active view. In bilingual zh view it
        // is the Chinese half: rewrite the " | " key's zh half, composing
        // "zh | key" for plain keys. In bilingual EN view it is the English
        // half (zh half kept). zh-only renames key + categoryZh together;
        // en-only renames the key. The links' categoryZh slot is (re)written
        // whenever a zh name was typed, so plain categories display the new
        // name in zh view.
        let target = newName;
        if (m === 'both') {
            if (LANG === 'zh') {
                const enHalf = oldName.includes(' | ') ? oldName.split(' | ').slice(1).join(' | ').trim() : oldName;
                target = newName + ' | ' + enHalf;
            } else {
                const zhHalf = oldName.includes(' | ') ? oldName.split(' | ')[0].trim() : zhNameOf('c', oldName);
                target = zhHalf ? zhHalf + ' | ' + newName : newName;
            }
        }
        if (target === oldName) return;
        if (categories[target]) { await customAlert('This name already exists'); return; }
        const newCategories = {};
        Object.keys(categories).forEach(key => {
            if (key === oldName) {
                const data = categories[oldName];
                data.links.forEach(item => item.category = target);
                newCategories[target] = data;
            } else {
                newCategories[key] = categories[key];
            }
        });
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);
        if (LANG === 'zh' && m !== 'en') catLinks.forEach(l => { l.categoryZh = newName.slice(0, 60); });
        renderCategories();
        renderCategoryButtons();
        updateCategorySelect();
        await saveLinks();
    }

    async function deleteCategory(category) {
        if (!await validateTokenOrRedirect()) return;
        if (await customConfirm(T('Delete "') + category + T('" category and all its links?'))) {
            delete categories[category];
            updateCategorySelect();
            renderCategories();
            renderCategoryButtons();
            // Clearing the last category wipes all data: the server refuses an
            // empty overwrite unless explicitly forced, so confirm again and
            // send force. On cancel, reload the server copy to restore the UI.
            if (Object.keys(categories).length === 0) {
                if (!(await customConfirm('This is the last category. Deleting it clears ALL data. Continue?'))) {
                    await loadLinks(true);
                    return;
                }
                await saveLinks(true);
            } else {
                await saveLinks();
            }
        }
    }

    // Rename a group, bilingual-aware (v27). The raw key is the shared identity;
    // the Chinese display name lives in the links' groupZh slot. Bilingual + EN
    // view renames the raw key only (Chinese slot untouched); bilingual + 漢 view
    // renames the Chinese slot only (raw key untouched); zh-only renames both
    // (there the raw key IS the name); en-only renames the raw key. Prefill is
    // the name as currently displayed, so the dialog shows what the user sees.
    async function renameGroup(category, oldName) {
        if (!await validateTokenOrRedirect()) return;
        const m = langMode();
        const shown = (m === 'en') ? oldName : pickBilingual(oldName, 'g');
        const newName = await showCategoryDialog('Rename group', shown);
        if (newName === null || newName === undefined) return;
        if (!newName) { await customAlert('Group name cannot be empty'); return; }
        if (newName.length > 120) { await customAlert('Group name is too long (max 120 characters)'); return; }
        const cat = categories[category];
        if (!cat) return;
        const groupLinks = (cat.links || []).filter(l => (l.group || '') === oldName);
        if (m === 'both' && LANG === 'zh' && groupLinks.length) {
            if (newName === shown) return;
            if (groupNamesOf(category).some(g => pickBilingual(g, 'g') === newName)) {
                await customAlert('A group with this name already exists in this category');
                return;
            }
            groupLinks.forEach(l => { l.groupZh = newName.slice(0, 60); });
            renderCategoryGrid(category);
            await saveLinks();
            return;
        }
        if (newName === oldName) return;
        if (groupNamesOf(category).includes(newName)) {
            await customAlert('A group with this name already exists in this category');
            return;
        }
        if (Array.isArray(cat.groups)) {
            const i = cat.groups.indexOf(oldName);
            if (i !== -1) cat.groups[i] = newName;
        }
        (cat.links || []).forEach(l => { if ((l.group || '') === oldName) l.group = newName; });
        if (m === 'zh') groupLinks.forEach(l => { l.groupZh = newName.slice(0, 60); });
        renderCategoryGrid(category);
        await saveLinks();
    }

    // Delete a group: the name leaves the category's groups list and its
    // links become ungrouped, they are NOT deleted.
    async function deleteGroup(category, groupName) {
        if (!await validateTokenOrRedirect()) return;
        if (!await customConfirm(T('Delete group "') + groupName + T('"? Its links will become ungrouped, not deleted.'))) return;
        const cat = categories[category];
        if (!cat) return;
        if (Array.isArray(cat.groups)) {
            const i = cat.groups.indexOf(groupName);
            if (i !== -1) cat.groups.splice(i, 1);
        }
        (cat.links || []).forEach(l => { if ((l.group || '') === groupName) { l.group = ''; l.groupZh = ''; } });
        renderCategoryGrid(category);
        await saveLinks();
    }

    async function moveCategory(categoryName, direction) {
        if (!await validateTokenOrRedirect()) return;
        const keys = Object.keys(categories);
        const index = keys.indexOf(categoryName);
        if (index < 0) return;
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= keys.length) return;

        const newCategories = {};
        const reordered = [...keys];
        [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
        reordered.forEach(key => newCategories[key] = categories[key]);

        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);

        renderCategories();
        renderCategoryButtons();
        await saveLinks();
    }

    async function toggleCategoryHidden(category, isHidden) {
        if (!await validateTokenOrRedirect()) return;
        categories[category].isHidden = isHidden;
        await saveLinks();
    }

    async function pinCategory(categoryName) {
        if (!await validateTokenOrRedirect()) return;
        const keys = Object.keys(categories);
        const index = keys.indexOf(categoryName);
        if (index < 0) return;

        const newCategories = {};
        const reordered = [...keys];
        reordered.splice(index, 1);
        reordered.unshift(categoryName);
        reordered.forEach(key => newCategories[key] = categories[key]);

        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);

        renderCategories();
        renderCategoryButtons();
        await saveLinks();
    }

    function getFilteredCategoriesByKeyword(query) {
        // Normalize both sides to the Simplified side before comparing, so a
        // Simplified query finds Traditional content and a Traditional query
        // finds Simplified content (toSimplified() is defined above).
        const lowerQuery = toSimplified(query).toLowerCase();
        const result = {};
        Object.keys(categories).forEach(category => {
            const categoryData = categories[category];
            const normCat = toSimplified(category).toLowerCase();
            // Category name containment counts as a match for every link in it,
            // e.g. searching "压缩" finds all links under a "压缩工具" category.
            const catZh = toSimplified(catZhOf(category)).toLowerCase();
            const catMatch = langMode() === 'zh'
                ? (catZh && (lowerQuery.includes(catZh) || catZh.includes(lowerQuery)))
                : langMode() === 'en'
                ? (lowerQuery.includes(normCat) || normCat.includes(lowerQuery))
                : (lowerQuery.includes(normCat) || normCat.includes(lowerQuery) || (catZh && (lowerQuery.includes(catZh) || catZh.includes(lowerQuery))));
            const matchedLinks = (categoryData.links || []).filter(link => {
                const m = langMode();
                // single-language mode matches only that language's slots, so
                // hidden-language content cannot surface invisible cards.
                const fields = [];
                if (m === 'zh') fields.push(link.nameZh, link.name, link.detailZh, link.groupZh, link.tagZh);
                else if (m === 'en') fields.push(link.name, link.subEn, link.detail, link.tips, link.group, link.tag);
                else fields.push(link.name, link.subEn, link.nameZh, link.detail, link.detailZh, link.tips, link.group, link.groupZh, link.tag, link.tagZh);
                const hay = toSimplified(fields.filter(f => typeof f === 'string').join('\\n')).toLowerCase();
                return catMatch || hay.includes(lowerQuery) || (link.url && link.url.toLowerCase().includes(lowerQuery));
            });
            if (matchedLinks.length > 0) {
                result[category] = { ...categoryData, links: matchedLinks };
            }
        });
        return result;
    }

    // Ordered group names for a category: the stored groups list first, then
    // any group found on links that is not in the list (first-appearance
    // order). Empty groups live only in the stored list, so this is what
    // keeps them visible after a save + reload.
    function groupNamesOf(category) {
        const cat = categories[category];
        if (!cat) return [];
        const out = [];
        (Array.isArray(cat.groups) ? cat.groups : []).forEach(g => {
            const s = (typeof g === 'string') ? g.trim() : '';
            if (s && !out.includes(s)) out.push(s);
        });
        (cat.links || []).forEach(l => {
            const s = (typeof l.group === 'string') ? l.group.trim() : '';
            if (s && !out.includes(s)) out.push(s);
        });
        return out;
    }

    // Split a category's links into ungrouped links first, then one group per
    // name in the category's groups list (in list order), then any link-only
    // group in first-appearance order. Empty groups in the list still get a
    // partition (with no links) so their header renders. Links without a group
    // (data saved before groups existed) land in the ungrouped partition.
    function partitionLinksByGroup(links, groups) {
        const map = new Map();
        (links || []).forEach(link => {
            const raw = (typeof link.group === 'string') ? link.group.trim() : '';
            const key = raw || '';
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(link);
        });
        if (!map.has('')) map.set('', []);
        const ordered = [];
        (groups || []).forEach(g => {
            const s = (typeof g === 'string') ? g.trim() : '';
            if (s && !ordered.includes(s)) ordered.push(s);
        });
        map.forEach((_, k) => { if (k && !ordered.includes(k)) ordered.push(k); });
        // Ungrouped first, then groups. An empty ungrouped partition is
        // dropped unless the category is entirely empty (an empty category
        // still needs one grid for the "+" placeholder).
        let keys = [''].concat(ordered);
        if (keys.length > 1) keys = keys.filter(k => k !== '' || map.get(k).length > 0);
        return keys.map(k => ({ group: k, links: map.get(k) || [] }));
    }

    // The "+" tile at the end of a grid (edit mode only): clicking it opens
    // the add dialog with the category and that grid's group pre-filled.
    // Dragging a card over it moves the card into this grid — this is the
    // only drop target of an empty grid, which has no cards to drag over.
    function createAddCardPlaceholder(category, group) {
        const addCardPlaceholder = document.createElement('div');
        const sizeClasses = isListLayout
            ? 'w-16 h-16 rounded-[1.2rem] mx-auto'
            : 'min-h-[100px] p-4 rounded-2xl w-full';

        addCardPlaceholder.className = \`add-card-placeholder group flex flex-col h-full w-full \${sizeClasses} rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all cursor-pointer flex items-center justify-center\`;
        addCardPlaceholder.innerHTML = \`
            <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 flex items-center justify-center transition-colors pointer-events-none">
                <svg class="w-6 h-6 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
        \`;

        addCardPlaceholder.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (draggedCard) {
                addCardPlaceholder.parentElement.insertBefore(draggedCard, addCardPlaceholder);
            }
        });

        addCardPlaceholder.onclick = () => {
             showAddDialog();
             document.getElementById('category-select-value').value = category;
             document.getElementById('category-select-text').textContent = pickBilingual(category, 'c');
             document.getElementById('group-input').value = langMode() === 'zh' ? '' : group;
             document.getElementById('group-zh-input').value = langMode() === 'zh' ? group : zhNameOf('g', group);
              document.getElementById('category-zh-input').value = catZhOf(category);
              updateGroupDatalist(category);
             updateTagDatalist(category);
        };
        return addCardPlaceholder;
    }

    // Build one card grid per partition (ungrouped first, then each group),
    // each group grid preceded by a small sub-header. Search mode passes a
    // single ungrouped partition, so it renders flat exactly as before.
    // Filter tags by function for the built-in links. The stored tag on a
    // link wins ('' = explicitly untagged); this map is only the fallback
    // for links that have never had a tag stored. Two assumptions to
    // confirm: 'Muse' is counted as 聊天, 'Codex' as 編程.
    const LINK_FUNCTION_TAGS = {
        'Neat Download': '下載', 'PotPlayer': '影音', 'TeamViewer': '遠程',
        'Winhance': '系統', 'WinfrGUI': '恢復', 'Geek Uninstaller': '系統',
        'FastCopy': '傳輸', 'HandBrake': '影音', 'AB Download': '下載',
        'Brave': '瀏覽器', 'LibreWolf': '瀏覽器', 'v2rayN': '代理',
        'Clash Verge': '代理', 'qBittorrent EE': '下載', 'ONLYOFFICE': '辦公',
        'LocalSend': '傳輸', '7-Zip': '工具', 'RIME': '工具', 'Readest': '辦公',
        'Deskflow': '工具', 'EarTrumpet': '系統', 'Winutil': '系統',
        'Rufus': '系統', 'Windhawk': '系統', 'Kdenlive': '影音',
        'Shutter Encoder': '影音', 'ImageMagick': '工具', 'ArtCraft': '工具',
        'Muse': '聊天', 'Perplexity': '搜索', 'Gemini': '聊天', 'Claude': '聊天',
        'ChatGPT': '聊天', 'Suno': '音樂',
        'ComfyUI': '生圖', 'Strata': '聊天', 'Hermes': '模型', 'Codex': '編程',
        'Ollama': '模型',
    };
    function linkFunctionTag(link) {
        if (link.tag != null) return link.tag;
        return LINK_FUNCTION_TAGS[link.name] || '';
    }

    // One filter row per section (not per group): the pills list the
    // section's distinct tags, and a click filters every group in the
    // section at once. Groups with no matching card have their panel
    // hidden (the title is the panel's legend, so it hides with it)
    // while a filter is active (view mode only); the "+" tile in edit
    // mode is never filtered.
    const catActiveFilter = {};
    function buildSectionFilterPills(category, section) {
        const cat = categories[category];
        if (!cat || !Array.isArray(cat.links)) return null;
        const tags = [...new Set(cat.links.map(linkFunctionTag).filter(Boolean))];
        // v17: a single tag is still a useful filter (All vs that tag),
        // so only suppress the row when there are no tags at all. The
        // old "< 2" rule hid the row entirely whenever a section had
        // exactly one tag, so a stored tag had no visible UI.
        if (tags.length < 1) return null;
        const pills = document.createElement('div');
        pills.className = 'filter-pills flex gap-2 mb-4';
        pills.style.flexWrap = 'wrap';
        // v18: the show-all pill reads "All" (Frost's request).
        const allTags = ['All', ...tags];
        // Language toggles rebuild sections; restore this section's last
        // filter so switching language never resets the pill row.
        const saved = catActiveFilter[category];
        let activeFilter = (saved && tags.includes(saved)) ? saved : 'All';
        const pillBase = 'px-3 py-1 text-xs font-medium rounded-full border transition-all active:scale-95 cursor-pointer';
        const pillOn = 'bg-emerald-500 text-white shadow-sm';
        const pillOff = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-emerald-300';
        const paintPills = () => {
            pills.querySelectorAll('[data-filter]').forEach(p => {
                p.className = pillBase + ' ' + (activeFilter === p.dataset.filter ? pillOn : pillOff);
            });
        };
        const applyFilter = () => {
            section.querySelectorAll('[data-filter-tag]').forEach(card => {
                card.classList.toggle('hidden', activeFilter !== 'All' && card.dataset.filterTag !== activeFilter);
            });
            if (!isEditMode) {
                section.querySelectorAll('.card-container').forEach(grid => {
                    const hasVisible = [...grid.querySelectorAll('[data-filter-tag]')].some(c => !c.classList.contains('hidden'));
                    // The title is the panel's <legend>, so hiding
                    // the fieldset hides the title with it.
                    const panel = [...section.querySelectorAll('.group-panel')].find(p => p.dataset.group === grid.dataset.group);
                    if (panel) panel.classList.toggle('hidden', activeFilter !== 'All' && !hasVisible);
                });
            }
        };
        allTags.forEach(tag => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.textContent = (tag === 'All') ? T('All') : pickBilingual(tag, 't');
            pill.dataset.filter = tag;
            pill.onclick = () => {
                activeFilter = (activeFilter === tag) ? 'All' : tag;
                catActiveFilter[category] = activeFilter;
                paintPills();
                applyFilter();
            };
            pills.appendChild(pill);
        });
        paintPills();
        pills._apply = applyFilter;
        return pills;
    }

    function buildGroupBlocks(category, partitions) {
        const fragment = document.createDocumentFragment();
        // Adjust the grid column count based on layout mode
        // APP mode: 4 per row on mobile, 6 on tablet, 8-10 on large screens
        const gridClasses = isListLayout
            ? 'list-grid'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';

        let firstPanel = true;
        partitions.forEach(({ group, links: glinks }, idx) => {
            // v12: the panel is a <fieldset> and the title its <legend>,
            // so the title straddles the panel's top border (mockup).
            const panel = group ? document.createElement('fieldset') : null;
            if (panel) {
                panel.className = 'group-panel' + (firstPanel ? ' group-panel-first' : '');
                panel.dataset.group = group;
                panel.dataset.category = category;
                firstPanel = false;
            }
            if (group) {
                const header = document.createElement('legend');
                header.className = 'group-header flex items-center gap-2';
                header.dataset.group = group;
                header.dataset.category = category;

                // No visible marker: an invisible spacer of the same size
                // as the old diamond, so the group name keeps its exact
                // position (it now reads as an indent).
                const spacer = document.createElement('span');
                spacer.className = 'w-3 h-3 inline-block';
                header.appendChild(spacer);

                const nameEl = document.createElement('span');
                nameEl.className = 'text-sm font-semibold text-slate-500 dark:text-slate-400';
                nameEl.textContent = pickBilingual(group, 'g');
                header.appendChild(nameEl);

                if (isEditMode) {
                    const btnBase = 'w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 active:scale-95';
                    const btnWrap = document.createElement('div');
                    btnWrap.className = 'flex items-center gap-0.5 ml-1';
                    btnWrap.style.gap = '2px'; btnWrap.style.marginLeft = '4px';
                    btnWrap.innerHTML = \`
                        <button class="\${btnBase} text-slate-400 hover:text-blue-600 hover:bg-blue-100 dark:text-slate-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 has-tooltip" data-tooltip="Rename group" data-action="rename-group" data-category="\${escAttr(category)}" data-group="\${escAttr(group)}">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button class="\${btnBase} text-slate-400 hover:text-red-600 hover:bg-red-100 dark:text-slate-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 has-tooltip" data-tooltip="Delete group" data-action="delete-group" data-category="\${escAttr(category)}" data-group="\${escAttr(group)}">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    \`;
                    header.appendChild(btnWrap);
                }

                panel.appendChild(header);
            }

            const grid = document.createElement('div');
            grid.className = \`grid \${gridClasses} card-container relative\`;
            grid.id = group ? gridId(category) + '-' + slugId(group) : gridId(category);
            grid.dataset.group = group;
            grid.dataset.category = category;

            // Build cards off-screen then mount them once, to reduce reflow
            const cardsFragment = document.createDocumentFragment();
            glinks.forEach(link => {
                const card = createCard(link);
                if (card) {
                    // Always stamped ('' when untagged) so untagged cards
                    // hide under a specific filter instead of staying visible.
                    card.dataset.filterTag = linkFunctionTag(link);
                    cardsFragment.appendChild(card);
                }
            });
            grid.appendChild(cardsFragment);
            // In edit mode every grid gets its own "+" tile, so a link can be
            // added straight into any group — including an empty one, whose
            // grid has no cards and no other way to add into it.
            if (isEditMode) grid.appendChild(createAddCardPlaceholder(category, group));
            if (panel) {
                panel.appendChild(grid);
                fragment.appendChild(panel);
            } else {
                fragment.appendChild(grid);
            }
        });

        return fragment;
    }

    function renderCategorySections({ renderButtons = false, searchMode = false, filteredCategories = null } = {}) {
        const container = document.getElementById('sections-container');
        setupCardDelegation(container);
        const fragment = document.createDocumentFragment();
        const sourceCategories = searchMode && filteredCategories ? filteredCategories : categories;

        Object.entries(sourceCategories).forEach(([category, { links, isHidden, groups }]) => {
            if (!isEditMode && !isLoggedIn && isHidden && !searchMode) return;

            const section = document.createElement('div');
            section.className = 'section section-anchor';
            section.id = sectionId(category);
            section.dataset.category = category;

            // Title area
            const titleContainer = document.createElement('div');
            titleContainer.className = 'flex items-center gap-3 mb-5 pb-2 border-b border-slate-200/60 dark:border-slate-700/60';

            const title = document.createElement('h2');
            title.className = 'section-title text-lg font-bold text-slate-700 dark:text-slate-100 flex items-center gap-2';
            const badge = document.createElement('span');
            badge.className = 'w-1.5 h-5 bg-emerald-500 rounded-full inline-block shadow-sm';
            title.append(badge, ' ' + pickBilingual(category, 'c'));
            titleContainer.appendChild(title);

            // Title bar actions in edit mode
            if (isEditMode) {
                const controls = document.createElement('div');
                controls.className = 'flex items-center gap-1 ml-auto bg-slate-300/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-sm';
                const btnBase = "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 active:scale-95";

                controls.innerHTML = \`
                    <!-- Edit name -->
                    <button class="\${btnBase} text-slate-500 hover:text-blue-600 hover:bg-blue-100 dark:text-slate-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 has-tooltip" data-tooltip="Rename" data-action="edit" data-category="\${escAttr(category)}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>

                    <div class="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-0.5"></div>

                    <!-- Sort group -->
                    <button class="\${btnBase} text-slate-500 hover:text-emerald-600 hover:bg-emerald-100 dark:text-slate-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 has-tooltip" data-tooltip="Move up" data-action="move" data-dir="-1" data-category="\${escAttr(category)}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                    </button>
                    <button class="\${btnBase} text-slate-500 hover:text-emerald-600 hover:bg-emerald-100 dark:text-slate-400 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 has-tooltip" data-tooltip="Move down" data-action="move" data-dir="1" data-category="\${escAttr(category)}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <button class="\${btnBase} text-slate-500 hover:text-amber-600 hover:bg-amber-100 dark:text-slate-400 dark:hover:bg-amber-900/30 dark:hover:text-amber-400 has-tooltip" data-tooltip="Pin to top" data-action="pin" data-category="\${escAttr(category)}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3h14M18 13l-6-6l-6 6M12 7v14"></path></svg>
                    </button>

                    <div class="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-0.5"></div>

                    <!-- Hide toggle -->
                    <div class="flex items-center justify-center w-8 h-8 has-tooltip cursor-pointer" data-tooltip="\${isHidden ? 'Show category' : 'Hide category'}">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <!-- The line below adds DOM attribute update logic -->
                            <input type="checkbox" data-action="toggleHidden" data-category="\${escAttr(category)}" \${isHidden ? 'checked' : ''}
                                class="sr-only peer">
                            <div class="w-3.5 h-3.5 rounded-full border-2 border-slate-400 peer-focus:outline-none peer dark:border-slate-500 peer-checked:bg-slate-500 peer-checked:border-slate-500 transition-colors"></div>
                        </label>
                    </div>

                    <div class="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-0.5"></div>

                    <!-- Delete -->
                    <button class="\${btnBase} text-slate-400 hover:text-red-600 hover:bg-red-100 dark:text-slate-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 has-tooltip" data-tooltip="DeleteCategory" data-action="delete" data-category="\${escAttr(category)}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                \`;
                titleContainer.appendChild(controls);
            }

            // Card grids: one per group (ungrouped first, then groups in
            // list order, then link-only groups). Search mode stays flat,
            // exactly as before.
            const partitions = searchMode ? [{ group: '', links }] : partitionLinksByGroup(links, groups);
            section.appendChild(titleContainer);
            if (!searchMode) {
                const pills = buildSectionFilterPills(category, section);
                if (pills) section.appendChild(pills);
            }
            section.appendChild(buildGroupBlocks(category, partitions));
            fragment.appendChild(section);

            // Edit mode: a visible "+ New Group" button at the end of the
            // section, so an empty group can be created before any link
            // exists in it. (Not in search mode.) The "+" tiles inside the
            // grids are now built by buildGroupBlocks.
            if (isEditMode && !searchMode) {
                const newGroupBtn = document.createElement('button');
                newGroupBtn.className = 'new-group-button w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 group';
                newGroupBtn.style.marginTop = '1.5rem';
                newGroupBtn.innerHTML = \`
                    <span class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 flex items-center justify-center transition-colors pointer-events-none">
                        <svg class="w-5 h-5 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    </span>
                    <span class="font-medium text-lg">New Group</span>
                \`;
                newGroupBtn.onclick = () => addGroup(category);
                section.appendChild(newGroupBtn);
            }
        });

        container.replaceChildren(fragment);
        document.querySelectorAll('#sections-container .filter-pills').forEach(p => { if (p._apply) p._apply(); });

        if (renderButtons) renderCategoryButtons();

        setupScrollSpy();
    }

    function renderCategories() {
        renderCategorySections({ renderButtons: false });
    }

    async function searchLinks(query) {
        const clearBtn = document.getElementById('clear-search-button');
        const filteredData = getFilteredCategoriesByKeyword(query);
        const hasMatchingLinks = Object.values(filteredData).some(c => c.links.length > 0);

        if (!hasMatchingLinks) {
            await customAlert('No matching sites found.');
            return;
        }
        clearBtn.classList.remove('hidden');
        renderCategorySections({ renderButtons: true, searchMode: true, filteredCategories: filteredData });
    }

    function renderCategoryButtons() {
        const container = document.getElementById('category-buttons-container');
        container.innerHTML = '';
        const visibleCategories = Object.keys(categories).filter(c =>
            (categories[c].links || []).some(l => !l.isPrivate || isLoggedIn) &&
            (!categories[c].isHidden || isEditMode || isLoggedIn)
        );

        if (visibleCategories.length === 0) return;

        visibleCategories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-button whitespace-nowrap px-4 py-1.5 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-600 transition-all active:scale-95 shadow-sm scroll-snap-align-start';
            btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-emerald-50', 'hover:text-emerald-600', 'dark:hover:bg-slate-700', 'hover:border-emerald-300', 'dark:hover:border-emerald-500/50');

            btn.textContent = pickBilingual(cat, 'c');
            btn.dataset.target = cat;
            btn.onclick = () => {
                scrollToCategory(cat);
            };
            container.appendChild(btn);
        });

        if (!isTouchDevice()) {
            setupDragScroll(container);
        }
    }

    function isTouchDevice() {
        return window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);
    }

    // When the category button container overflows, support mouse-drag horizontal scrolling
    function setupDragScroll(container) {
        if (!container || container._dragScroll) return;
        container._dragScroll = true;

        let isDown = false;
        let moved = false;
        let captured = false;
        let startX = 0;
        let startScroll = 0;
        let lastX = 0;
        let lastT = 0;
        let vx = 0;
        let inertiaId = null;

        function stopInertia() {
            if (inertiaId !== null) {
                cancelAnimationFrame(inertiaId);
                inertiaId = null;
            }
            vx = 0;
        }

        function inertiaLoop() {
            container.scrollLeft += vx * 16;
            vx *= 0.95;
            if (Math.abs(vx) < 0.08) {
                stopInertia();
                return;
            }
            inertiaId = requestAnimationFrame(inertiaLoop);
        }

        container.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return;
            stopInertia();
            isDown = true;
            moved = false;
            captured = false;
            startX = e.clientX;
            startScroll = container.scrollLeft;
            lastX = e.clientX;
            lastT = performance.now();
            container.style.userSelect = 'none';
            container.style.scrollSnapType = 'none';
            e.preventDefault();
        });

        container.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            const dx = e.clientX - startX;
            const now = performance.now();
            if (Math.abs(dx) > 4) {
                if (!captured) {
                    captured = true;
                    try { container.setPointerCapture(e.pointerId); } catch (_) {}
                }
                moved = true;
                container.scrollLeft = startScroll - dx;
                const dt = (now - lastT) || 16;
                const inst = -(e.clientX - lastX) / dt;
                vx = vx * 0.8 + inst * 0.2;
                lastX = e.clientX;
                lastT = now;
            }
        });

        const endDrag = (e) => {
            if (!isDown) return;
            isDown = false;
            container.style.userSelect = '';
            container.style.scrollSnapType = '';
            if (captured) { try { container.releasePointerCapture(e.pointerId); } catch (_) {} }
            // When drag exceeds the threshold, prevent this click from mistakenly triggering the category button
            if (moved) {
                container.addEventListener('click', (ce) => {
                    ce.stopPropagation();
                    ce.preventDefault();
                }, { capture: true, once: true });
                // Inertia scrolling
                if (Math.abs(vx) > 0.25) {
                    inertiaId = requestAnimationFrame(inertiaLoop);
                }
            }
        };
        container.addEventListener('pointerup', endDrag);
        container.addEventListener('pointercancel', endDrag);
    }

    // Clicking a tab highlights it at once, instead of waiting for the
    // scroll spy. The spy is locked briefly while the smooth scroll
    // runs, so it cannot flip the highlight back mid-scroll.
    let spyLockedUntil = 0;

    function scrollToCategory(catId) {
        const section = document.getElementById(sectionId(catId));
        if(section) {
            highlightButton(section.id);
            spyLockedUntil = Date.now() + 900;
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Scroll spy, driven by scroll position instead of IntersectionObserver.
    // The old observer watched a narrow band near the top of the viewport,
    // which the last section can never reach: there is not enough content
    // below it to scroll its top into the band, so the highlight stayed
    // stuck on the first tab even after scrolling to the last section.
    // This version picks the last section whose top has crossed the
    // sticky-header offset (160px, same as .section-anchor scroll-margin),
    // and forces the last section when the page is at the bottom.
    let scrollSpyHandler = null;
    let spyRaf = null;
    let spyActiveId = null;

    function setupScrollSpy() {
        if (scrollSpyHandler) window.removeEventListener('scroll', scrollSpyHandler);
        scrollSpyHandler = () => {
            if (spyRaf) return;
            spyRaf = requestAnimationFrame(() => {
                spyRaf = null;
                updateSpyHighlight();
            });
        };
        window.addEventListener('scroll', scrollSpyHandler, { passive: true });
        updateSpyHighlight();
    }

    function updateSpyHighlight() {
        if (Date.now() < spyLockedUntil) return;
        const sections = [...document.querySelectorAll('.section')];
        if (!sections.length) return;
        const scrollable = document.documentElement.scrollHeight > window.innerHeight + 2;
        const atBottom = scrollable &&
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        let active = sections[0];
        if (atBottom) {
            active = sections[sections.length - 1];
        } else {
            for (const s of sections) {
                if (s.getBoundingClientRect().top <= 160) active = s;
                else break;
            }
        }
        if (active.id !== spyActiveId) {
            spyActiveId = active.id;
            highlightButton(active.id);
        }
    }

    // The user's own last selection (pill click or settled scroll position),
    // remembered across language switches. Re-rendering changes section
    // heights (CJK text is shorter/taller than latin), so the page clamps the
    // scroll and the position-based spy would re-pick a different section.
    // The lock absorbs those re-render scroll events; highlightButton below
    // updates this at every highlight point (click, scroll, language switch).
    let lastActiveCat = null;
    function highlightButton(id) {
        lastActiveCat = id;
        const buttons = document.querySelectorAll('.category-button');
        buttons.forEach(btn => {
            if (sectionId(btn.dataset.target) === id) {
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-emerald-50', 'hover:text-emerald-600', 'dark:hover:bg-slate-700');
                btn.classList.add('bg-emerald-500', 'text-white', 'shadow-md', 'dark:bg-emerald-600');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.classList.remove('bg-emerald-500', 'text-white', 'shadow-md', 'dark:bg-emerald-600');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-emerald-50', 'hover:text-emerald-600', 'dark:hover:bg-slate-700');
            }
        });
    }

    // --- Overlay transition helper functions ---
    function toggleOverlay(id, show) {
        const overlay = document.getElementById(id);
        const box = overlay.querySelector('div[id$="-box"]');

        if (show) {
            overlay.classList.remove('hidden');
            void overlay.offsetWidth;
            overlay.classList.remove('overlay-hidden');
            overlay.classList.add('overlay-visible');

            if(box) {
                box.classList.remove('dialog-scale-hidden');
                box.classList.add('dialog-scale-visible');
            }
        } else {
            overlay.classList.remove('overlay-visible');
            overlay.classList.add('overlay-hidden');

            if(box) {
                box.classList.remove('dialog-scale-visible');
                box.classList.add('dialog-scale-hidden');
            }

            setTimeout(() => {
                if(overlay.classList.contains('overlay-hidden')) {
                    overlay.classList.add('hidden');
                }
            }, 300);
        }
    }

    function updateUIState() {
        const editModeBtn = document.getElementById('edit-mode-btn');
        const loginBtn = document.getElementById('login-Btn');
        const addCategoryContainer = document.getElementById('add-category-container');
        const dataToolsMenu = document.getElementById('data-tools-menu');
        const checkAllMenu = document.getElementById('check-all-menu');

        // Raw English base, NOT T(): the lang walker (applyLang) translates
        // this from the English base and caches English in langOriginals.
        // Writing T()'s result in zh mode cached Chinese as the "original",
        // so switching back to EN left the button stuck in Chinese.
        // Split label: logged out shows Login (登入), logged in shows Logout (登出).
        loginBtn.innerHTML = isLoggedIn ?
            '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Logout' :
            '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Login';

        if(isLoggedIn) {
            loginBtn.classList.replace('text-red-500', 'text-slate-700');
            if(dataToolsMenu) dataToolsMenu.classList.remove('hidden');
            if(checkAllMenu) checkAllMenu.classList.remove('hidden');
        } else {
            if(dataToolsMenu) dataToolsMenu.classList.add('hidden');
            if(checkAllMenu) checkAllMenu.classList.add('hidden');
        }

        // Language checkboxes are admin-only: the row is not shown at all when logged out.
        const langsRow = document.getElementById('langs-setting-row');
        if (langsRow) langsRow.classList.toggle('hidden', !isLoggedIn);
        updateLangSwitchUi();
        if (isLoggedIn) loadSiteLangs(); // the admin sees the live site state right after login

        if (isEditMode) {
            editModeBtn.innerHTML = '<span class="text-red-500 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Exit Edit</span>';
            document.body.classList.add('edit-mode');
            if(addCategoryContainer) addCategoryContainer.classList.remove('hidden');
        } else {
            editModeBtn.innerHTML = isLoggedIn ?
                '<span class="flex items-center gap-3"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>Enter Edit Mode</span>' :
                '<span class="flex items-center gap-3 text-slate-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>Edit Mode (login required)</span>';
            document.body.classList.remove('edit-mode');
            if(addCategoryContainer) addCategoryContainer.classList.add('hidden');
        }

        // The login button label was just re-rendered from the raw English
        // base; run the lang walker so zh shows 登入／登出 right away and the
        // English base stays cached for a clean EN restore.
        if (LANG === 'zh') applyLang();
    }

    function loadSections() {
        document.getElementById('clear-search-button').classList.add('hidden');
        document.getElementById('search-input').value = '';
        renderCategorySections({ renderButtons: true });
    }

    const imgApi = '/api/icon?v=9&url=';
    const iconCache = new Map();
    // The exact icon URL the browser loaded for a link (srcset picks one by
    // screen density; all sizes return the same bytes). The popup reuses it,
    // so opening a popup reads the browser cache instead of fetching again.
    const iconPickedUrl = new Map();
    const iconFailed = new Set();

    function createIconFallback(refEl) {
        const box = document.createElement('div');
        box.className = refEl.className
            .replace('opacity-0', 'opacity-100')
            .replace('object-contain', '') + ' text-black dark:text-slate-300';
        box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="display:block;width:100%;height:100%"><path fill="currentColor" d="M62 32C62 15.432 48.568 2 32 2C15.861 2 2.703 14.746 2.031 30.72c-.008.196-.01.395-.014.592c-.005.23-.017.458-.017.688v.101C2 48.614 15.432 62 32 62s30-13.386 30-29.899l-.002-.049zM37.99 59.351c-.525-.285-1.029-.752-1.234-1.388c-.371-1.152-.084-2.046.342-3.086c.34-.833-.117-1.795.109-2.667c.441-1.697.973-3.536.809-5.359c-.102-1.119-.35-1.17-1.178-1.816c-.873-.685-.873-1.654-1.457-2.52c-.529-.787.895-3.777.498-3.959c-.445-.205-1.457.063-1.777-.362c-.344-.458-.584-.999-1.057-1.354c-.305-.229-1.654-.995-2.014-.941c-1.813.271-3.777-1.497-4.934-2.65c-.797-.791-1.129-1.678-1.713-2.593c-.494-.775-1.242-.842-1.609-1.803c-.385-1.004-.156-2.29-.273-3.346c-.127-1.135-.691-1.497-1.396-2.365c-1.508-1.863-2.063-4.643-4.924-4.643c-1.537 0-1.428 3.348-2.666 2.899c-1.4-.507-3.566 1.891-3.535 1.568c.164-1.674 1.883-2.488 2.051-2.987c.549-1.638-2.453-1.246-2.068-2.612c.188-.672 2.098-1.161 1.703-1.562c-.119-.122-1.58-1.147-1.508-1.198c.271-.19 1.449.412 1.193-.37c-.086-.26-.225-.499-.357-.74a28 28 0 0 1 1.92-1.975c1.014-.083 2.066-.02 2.447.054c2.416.476 3.256 1.699 5.672.794c1.162-.434 5.445.319 6.059 1.537c.334.666 1.578-.403 2.063-.475c.52-.078 1.695.723 2.053.232c.943-1.291-.604-1.827 1.223-.833c1.225.667 3.619-2.266 2.861 1.181c-.547 2.485-2.557 2.54-4.031 4.159c-1.451 1.594 2.871 2.028 2.982 3.468c.32 4.146 2.531-.338 1.939-1.812c-1.145-2.855 1.303-2.071 2.289-.257c.547 1.007.963.159 1.633-.192c.543-.283.688 1.25.805 1.517c.385.887 1.65 1.152 1.436 2.294c-.238 1.259-1.133.881-2.008 1.094c-.977.237.158 1.059.016 1.359c-.154.328-1.332.464-1.646.65c-.924.544-.359 1.605-1.082 2.175c-.496.392-.996.137-1.092.871c-.113.865-1.707 1.143-1.5 1.97c.057.227.516 1.923.227 2.013c-.133.043-1.184-1.475-1.471-1.627c-.568-.301-3.15-.055-3.482 1.654c-.215 1.105 1.563 2.85 2.016 1.328c.561-1.873.828 1.091.693 1.207c.268.234 1.836-.385 1.371.7c-.197.459.193 1.656.889 1.287c.291-.154 1.041.31 1.172.061a2.14 2.14 0 0 1 .742-.692c.701-.41 1.75-.025 2.518.02c.469.027 4.313 2.124 4.334 2.545c.084 1.575 2.99 1.37 3.436 1.933c1.199 1.526.83.751-.045 2.706c-.441.984-.057 2.191-1.125 2.904c-.514.342-1.141.171-1.598.655c-.412.437-.25.959-.5 1.464c-.301.601-4.346 4.236-4.613 5.115c-.133.441-1.34.825-.322 1.248c.592.174-1.311 1.973-.396 2.718c.223.181.369.334.479.471c-.457.122-.91.233-1.369.333M35.594 4.237c-.039.145.02.316.271.483c.566.375-.162 1.208-.943.671c-.779-.537-2.531.241-2.41.644c.119.403.66.563 1.496.242c.834-.322 1.178.048 1.318.43c.096.259 0 .403-.027.752c-.025.349-.996.107-1.803.162c-.809.054-1.67-.162-1.645-.619c.027-.456-.861-1.289-1.391-1.637c-.529-.348.232-1.1.934-.537c.699.564.727-.107 1.535-.321c.459-.122.275-.305.119-.479q1.29.047 2.546.209m3.517 8.869c.605.164 1.656.929 1.656 1.291c0 .363-.477.817-.688.765c-1.523-.371-2.807-1.874-3.514-2.697c-1.234-1.435-1.156-.205-3.111-.826c-.5-.16-1.293-1.711-.768-2.476s1.131-.886 1.615-.683c.484.2 1.898-.645 2.223.362c.322 1.007 1.211 2.292 2.02 2.636c.81.342-.04 1.464.567 1.628m.485 4.673c.242.483-1.455-.564-1.859-1.047c-.402-.482-1.01-1.571-.523-2.054c.484-.482 1.57 1.005 2.141 1.33c1.129.645-.001 1.289.241 1.771m-8.594-7.315c.117-.161.365.242.586.645s-.084.971-.586.885c-.502-.084-.281-1.136 0-1.53m0-4.052s.473 1.154 0 .966s-.496-.671 0-.966m.096 3.65c-.135-.321-.166-1.64.162-2.04c.484-.59 1.266.564.74 1.02c-.525.457-.768 1.343-.902 1.02m-6.077 1.415c-.879-.063-.898-.823-1.02-1.226s-.85.765-1.586 0s.172-1.771.01-2.376c-.162-.604 1.736 0 2.02 0s1.051 1.248 1.252 1.227c.203-.02 1.293.987 1.293.584c0-.402.166-1.088.93-1.168c1.172-.121.121 1.289.08 1.838c-.039.549.891 1.504 1.232 1.907c.344.403-.867.686-1.07.443c-.201-.242-.727 0-1.172.322c-.443.322-1.656-.443-2.221-.685c-.566-.241 1.131-.804.252-.866m3.141-6.354c.781.269 1.225.51 1.609 0c.371-.492.654 1.073.385 1.502c-.27.431-.781.324-.863 0c-.08-.32-1.912-1.771-1.131-1.502m1.131 4.859c-.268-.35-.295-.752 0-1.047c.297-.295.201-.644.729-.751c.26-.054.295.348.295.724s.324.859 0 1.448c-.323.589-.754-.026-1.024-.374m2.205-5.969c-.012.074-.061.118-.184.106a.6.6 0 0 1-.236-.095q.21-.008.42-.011M25.389 5.15c.619 0 .539.418 1.051.719c.512.3.242-1.552.592-.854c.35.697 1.389 1.664.889 1.851c-.43.163-2.234.859-2.396.739s-.377-.63-.809-.739c-.432-.107-.889-1.127-1.186-1.1c-.113.01-.123-.184-.049-.442a28 28 0 0 1 1.572-.455c.058.158.146.281.336.281m13.519 30.025c-.645.666-1.756-.464-2.523-.424s-1.152-.765-1.818-.684c-.668.079.182-.847 1.111-.362c.927.483 3.756.925 3.23 1.47m12.93-22.934c-.188.24-.402.408-.607.585c-.605.524-1.736.484-1.898.846s-.566 1.489-1.98 1.494s-1.01 2.131-1.131 2.738s-.443 1.325-.848.801s-.566-.323-1.816-1.853s-.77-2.375-.365-2.818c.404-.442.566-1.49 0-1.329s-.889-.202-.768-.703s.727-.867 0-1.402s-.324-2.445-.889-4.189c-.566-1.745-1.334-.51-2.586-.443s-1.455-.873-.889-1.303a27.95 27.95 0 0 1 13.777 7.576"/></svg>';
        return box;
    }

    // HTML attribute escaping: prevents quotes in user data from breaking template attributes (used together with data-* delegation)
    function escAttr(v) {
        return String(v).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    // Convert a user category name into a valid, stable DOM id, avoiding embedding arbitrary user data into an id
    function slugId(v) {
        const s = String(v).trim().replace(/[^A-Za-z0-9\u4e00-\u9fa5_-]+/g, '-').replace(/^-+|-+$/g, '');
        return (s || 'cat') + '-' + Math.abs([...String(v)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0));
    }
    // Reused by scrollToCategory / renderCategoryGrid, kept consistent with the slugId used at render time
    function gridId(category) { return 'grid-' + slugId(category); }
    function sectionId(category) { return 'sec-' + slugId(category); }

    // Only allow http/https; everything else returns null (blocks javascript:/data: etc.)
    function safeUrl(raw) {
        try {
            const u = new URL(String(raw), location.href);
            if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
            return u.toString();
        } catch (e) { return null; }
    }

    function createCard(link) {
        if (!isEditMode && link.isPrivate && !isLoggedIn) return null;

        const card = document.createElement('div');

        let cardBaseClass = isListLayout
            ? 'flex flex-col gap-1.5 px-3 py-2.5 hover:z-10'
            : 'flex flex-col p-4 bg-white/90 dark:bg-[#170a29]/60 backdrop-blur-sm bg-white/80 border border-gray-200 dark:border-slate-700/50 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 shadow-sm hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-1.5';

        if (link.isPrivate && !isListLayout) {
            cardBaseClass += ' ring-1 ring-amber-400/40 bg-amber-50/80 dark:bg-amber-900/10 !border-amber-200 dark:!border-amber-700/50';
        }

        card.className = \`group relative h-full w-full rounded-2xl card-anim transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer select-none \${cardBaseClass}\`;

        // Card color tints apply in both layouts: the card-c-* classes keep
        // the subtitle colored, while the list-view rules suppress the card's
        // background gradient and border, so list rows show tint on text only.
        if (link.color && COLOR_KEYS.includes(link.color)) {
            card.classList.add('card-c-' + link.color);
        }

        if (isEditMode) {
            card.setAttribute('draggable', 'true');
            card.classList.add('card');
            card.classList.add('cursor-move');
        }

        card.dataset.isPrivate = link.isPrivate;
        card.setAttribute('data-url', link.url);
        card.setAttribute('data-name', link.name);

        const header = document.createElement('div');
        header.className = isListLayout
            ? 'flex items-center gap-3 w-full'
            : 'flex items-center gap-3 mb-2.5 w-full';

        // Icon placeholder container: shows a spinner before the icon finishes loading
        const iconWrap = document.createElement('div');
        const iconWrapClass = isListLayout
            ? 'relative w-10 h-10 shrink-0'
            : 'relative w-9 h-9';
        iconWrap.className = iconWrapClass;

        // Loading spinner (centered, beneath the icon)
        const spinner = document.createElement('span');
        spinner.className = 'absolute inset-0 flex items-center justify-center pointer-events-none';
        spinner.innerHTML = '<span class="block icon-spinner rounded-full animate-spin" style="width:60%;height:60%;aspect-ratio:1/1;"></span>';

        const icon = document.createElement('img');
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('decoding', 'async');
        icon.setAttribute('width', isListLayout ? 40 : 36);
        icon.setAttribute('height', isListLayout ? 40 : 36);

        // Icon style
        let iconClass = 'relative w-full h-full opacity-0 transition duration-300';
        if (isListLayout) {
             // Row mode: bare icon, no plate, no border, no shadow; the icon
             // is a click target that opens the link.
             iconClass += ' rounded-lg object-contain cursor-pointer';
             if (link.isPrivate) {
                 iconClass += ' ring-2 ring-amber-400';
             }
        } else {
             // Card style: small icon, light background
             iconClass += ' rounded-lg object-contain icon-bg border border-slate-200 dark:border-slate-700 transition-transform group-hover:scale-105 pointer-events-none';
        }
        icon.className = iconClass;
        // Corner clearance: inner padding must exceed radius/√2 so tight-margin
        // icons keep all four edges visible inside the rounded tile. App tile
        // radius 19.2px needs >13.6, list tile radius 8px needs >5.66.
        icon.style.padding = isListLayout ? '2px' : '6px';

        // Request the icon at the size it's actually displayed (36px list / 64px APP), then let the
        // browser pick 1x/2x/3x via srcset so Retina/4K/5K screens stay sharp without oversized downloads
        // on ordinary screens. A custom icon URL saved on the link is routed through the proxy too
        // (direct=1: fetch that URL directly as an image, skip favicon discovery), so it gets the
        // same resizing instead of loading the original file straight from wherever it's hosted.
        const baseW = isListLayout ? 48 : 36;
        // Two custom icon slots: icon = normal mode, iconDark = dark mode.
        // The dark slot only takes effect in dark mode; with one slot filled,
        // the same image serves both modes as before.
        const effIcon = (document.documentElement.classList.contains('dark') && link.iconDark) ? link.iconDark : (link.icon || '');
        const cacheKey = link.url + '|' + effIcon + '|' + baseW;
        let resolvedSrc, resolvedSrcset, base;
        if (iconCache.has(cacheKey)) {
            ({ src: resolvedSrc, srcset: resolvedSrcset } = iconCache.get(cacheKey));
        } else {
            const isCustom = effIcon.startsWith('http');
            const sourceUrl = isCustom ? effIcon : link.url;
            base = imgApi + encodeURIComponent(sourceUrl) + (isCustom ? '&direct=1' : '') + '&w=';
            resolvedSrc = base + baseW;
            resolvedSrcset = \`\${base}\${baseW} 1x, \${base}\${baseW * 2} 2x, \${base}\${baseW * 3} 3x\`;
            if (iconCache.size > 1000) iconCache.clear();
            iconCache.set(cacheKey, { src: resolvedSrc, srcset: resolvedSrcset });
        }
        let iconNode = icon;
        if (iconFailed.has(resolvedSrc)) {
            iconNode = createIconFallback(icon);
        } else {
            icon.src = resolvedSrc;
            icon.srcset = resolvedSrcset;
            icon.onload = function() {
                // Fade in the icon and hide the spinner once loading completes
                this.classList.add('opacity-100');
                this.classList.remove('opacity-0');
                spinner.remove();
                // Remember the exact URL the browser picked for this link so
                // the popup reuses it: same URL = straight from the browser
                // cache, zero extra fetch when a popup opens.
                const pickedKey = link.url + '|' + effIcon;
                if (iconPickedUrl.size > 2000) iconPickedUrl.clear();
                iconPickedUrl.set(pickedKey, this.currentSrc || resolvedSrc);
            };
            icon.onerror = function() {
                iconFailed.add(resolvedSrc);
                this.onerror = null; // Prevent an infinite loop if it errors again after being replaced
                this.replaceWith(createIconFallback(this));
                spinner.remove();
            };
        }
        if (iconNode === icon) iconWrap.appendChild(spinner);
        iconWrap.appendChild(iconNode);

        const title = document.createElement('div');
        const titleAlign = isListLayout
            ? 'font-semibold text-sm truncate text-slate-700 dark:text-slate-100 transition-colors cursor-pointer'
            : 'font-semibold text-sm truncate text-slate-700 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pointer-events-none';

        title.className = \`card-title pointer-events-none \${titleAlign}\`;
        title.textContent = link.name;

        const sub = cardSubtitle(link);
        const desc = cardDesc(link);

        const textCol = document.createElement('div');
        textCol.className = 'flex-1 flex flex-col';
        textCol.style.minWidth = '0';
        textCol.appendChild(title);

        if (sub) {
            const subEl = document.createElement('div');
            subEl.className = 'text-xs font-medium truncate card-sub mt-1 pointer-events-none relative z-10';
            subEl.textContent = sub;
            textCol.appendChild(subEl);
        }

        header.appendChild(iconWrap);
        header.appendChild(textCol);

        const statusTag = document.createElement('span');
        statusTag.className = 'card-status-tag';
        statusTag.setAttribute('data-for', link.url);
        statusTag.textContent = '';
        header.appendChild(statusTag);

        card.appendChild(header);

        // Card layout (v26): title + subtitle share one column beside the icon
        // (subtitle is tinted with the card's color, see .card-sub CSS), and
        // the detail description shows as the full-width gray line below,
        // 11px (below the 12px subtitle), clamped to 2 lines with ellipsis.
        if (desc) {
            const descEl = document.createElement('div');
            descEl.className = isListLayout
                ? 'card-desc text-slate-500 dark:text-slate-400 leading-relaxed w-full relative z-10 mt-1'
                : 'card-desc text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed w-full relative z-10 mt-1';
            descEl.textContent = desc;
            card.appendChild(descEl);
        }

        if (link.isPrivate && !isListLayout) {
            const badge = document.createElement('div');
            badge.className = 'absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-2xl';
            badge.innerHTML = '<div class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-8 h-8 bg-amber-400"></div>';
            card.appendChild(badge);
        }

        const prevResult = latencyResults[siteKey(link.url)];
        if (prevResult === 'checking') {
            renderStatus(card, 'checking');
        } else if (prevResult) {
            renderStatus(card, prevResult);
        }

        if (isEditMode) {
            const actionWrapper = document.createElement('div');
            actionWrapper.className = 'absolute top-2 right-2 z-30';

            const menuBtn = document.createElement('button');
            const btnStyle = 'w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 backdrop-blur-sm';

            menuBtn.className = \`\${btnStyle} flex items-center justify-center transition-all duration-200\`;
            menuBtn.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>';

            const dropdown = document.createElement('div');
            dropdown.className = 'hidden absolute right-0 top-6 w-28 bg-white dark:bg-[#170a29] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform origin-top-right transition-all z-50 flex flex-col p-1 card-menu-dropdown';

            dropdown.innerHTML = \`
                <button class="menu-edit w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    \${T('Edit')}
                </button>
                <button class="menu-delete w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    \${T('Delete')}
                </button>
            \`;

            menuBtn.onclick = (e) => {
                e.stopPropagation();
                document.querySelectorAll('.card-menu-dropdown').forEach(el => {
                    if (el !== dropdown) el.classList.add('hidden');
                });
                dropdown.classList.toggle('hidden');
            };

            dropdown.querySelector('.menu-edit').onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.add('hidden');
                showEditDialog(link);
            };

            dropdown.querySelector('.menu-delete').onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.add('hidden');
                removeCard(card);
            };

            actionWrapper.appendChild(menuBtn);
            actionWrapper.appendChild(dropdown);
            card.appendChild(actionWrapper);
        }

        if (!isEditMode) {
            const openDirect = () => {
                const target = safeUrl(link.url);
                if (target) window.open(target, '_blank', 'noopener,noreferrer');
            };
            // Row mode (v4): no buttons at all. Clicking the icon, the title
            // or anywhere on the row opens the link in a new window; Ctrl/Cmd
            // and middle-click do the same. On desktop the detail text shows
            // in full on the row; on a phone the row hides it and a tap opens
            // the detail popup first, like grid view.
            card.onclick = (e) => {
                if (e.ctrlKey || e.metaKey) { openDirect(); return; }
                // List view opens the link directly on desktop, but on a phone
                // (<=767px, the same breakpoint as the bottom-sheet CSS) a tap
                // opens the detail popup first, like grid view.
                if (isListLayout && !window.matchMedia('(max-width: 767px)').matches) { openDirect(); return; }
                showDetailPopup(link);
            };
            card.addEventListener('auxclick', (e) => {
                if (e.button === 1) openDirect();
            });
        }

        return card;
    }

    // Card-level event delegation: drag/touch listeners are bound once on the container, decoupling listener count from card count
    function setupCardDelegation(container) {
        if (!container || container._cardDelegation) return;
        container._cardDelegation = true;

        container.addEventListener('dragstart', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;
            dragStart.call(card, e);
        });
        container.addEventListener('dragover', (e) => {
            if (!isEditMode || !e.target.closest('.card-container')) return;
            dragOver(e);
        });
        container.addEventListener('dragend', (e) => {
            const card = e.target.closest('.card');
            if (card) card.classList.remove('dragging');
        });
        container.addEventListener('drop', drop);
        container.addEventListener('touchstart', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;
            touchStart(e);
        }, { passive: false });

        // Globally close the card menu
        if (!window.hasAddedCardMenuListener) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.card-menu-dropdown') && !e.target.closest('button')) {
                    document.querySelectorAll('.card-menu-dropdown').forEach(el => el.classList.add('hidden'));
                }
            });
            window.hasAddedCardMenuListener = true;
        }

        // Category header action buttons: event delegation, avoiding the injection risk of inline onClick in template strings
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;
            const category = btn.dataset.category;
            if (action === 'move') {
                moveCategory(category, Number(btn.dataset.dir) || 0);
            } else if (action === 'edit') {
                editCategoryName(category);
            } else if (action === 'pin') {
                pinCategory(category);
            } else if (action === 'delete') {
                deleteCategory(category);
            } else if (action === 'rename-group') {
                renameGroup(category, btn.dataset.group || '');
            } else if (action === 'delete-group') {
                deleteGroup(category, btn.dataset.group || '');
            }
        });
        container.addEventListener('change', (e) => {
            const input = e.target.closest('[data-action="toggleHidden"]');
            if (!input) return;
            const tipBox = input.closest('.has-tooltip');
            if (tipBox) tipBox.setAttribute('data-tooltip', input.checked ? 'Show category' : 'Hide category');
            toggleCategoryHidden(input.dataset.category, input.checked);
        });
    }

    function updateCategorySelect() {
        const menu = document.getElementById('category-select-menu');
        menu.innerHTML = '';
        Object.keys(categories).forEach(cat => {
            const item = document.createElement('div');
            item.className = 'px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 cursor-pointer transition-colors';
            item.textContent = pickBilingual(cat, 'c');
            item.onclick = () => {
                document.getElementById('category-select-value').value = cat;
                document.getElementById('category-select-text').textContent = pickBilingual(cat, 'c');
                document.getElementById('category-zh-input').value = catZhOf(cat);
                updateGroupDatalist(cat);
                updateTagDatalist(cat);
                menu.classList.add('hidden');
            };
            menu.appendChild(item);
        });
    }

    // Refresh the Group field's suggestions from the selected category's existing groups
    function updateGroupDatalist(category) {
        const dl = document.getElementById('group-datalist');
        if (!dl) return;
        dl.innerHTML = '';
        // Include empty groups from the stored list, not just groups that
        // already have links, so an empty group is offered as a choice.
        groupNamesOf(category).forEach(g => {
            const opt = document.createElement('option');
            opt.value = g;
            dl.appendChild(opt);
        });
        // Chinese suggestions: the groupZh values links in this category declare.
        const dlZh = document.getElementById('group-zh-datalist');
        if (dlZh) {
            dlZh.innerHTML = '';
            const cat = categories[category];
            if (cat && Array.isArray(cat.links)) {
                [...new Set(cat.links.map(l => l.groupZh).filter(Boolean))].forEach(g => {
                    const opt = document.createElement('option');
                    opt.value = g;
                    dlZh.appendChild(opt);
                });
            }
        }
    }

    // Refresh the Tag field's suggestions from the selected category's existing tags
    function updateTagDatalist(category) {
        const dl = document.getElementById('tag-datalist');
        if (!dl) return;
        dl.innerHTML = '';
        const cat = categories[category];
        if (!cat || !Array.isArray(cat.links)) return;
        [...new Set(cat.links.map(linkFunctionTag).filter(Boolean))].forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            dl.appendChild(opt);
        });
        // Chinese suggestions: the tagZh values links in this category declare.
        const dlZh = document.getElementById('tag-zh-datalist');
        if (dlZh) {
            dlZh.innerHTML = '';
            [...new Set(cat.links.map(l => l.tagZh).filter(Boolean))].forEach(t => {
                const opt = document.createElement('option');
                opt.value = t;
                dlZh.appendChild(opt);
            });
        }
    }

    // Incremental update: rebuild a single category's grids (one per group).
    // Placeholders are rebuilt per grid by buildGroupBlocks, so there is
    // nothing to preserve; the "+ New Group" button stays where it is.
    function renderCategoryGrid(category) {
        const section = document.getElementById(sectionId(category));
        const cat = categories[category];
        if (!section || !cat) return;

        // Remove existing grids, group headers and the filter row, then rebuild them
        section.querySelectorAll('.card-container, .group-header, .filter-pills, .group-panel').forEach(el => el.remove());
        const blocks = buildGroupBlocks(category, partitionLinksByGroup(cat.links, groupNamesOf(category)));
        const newGroupBtn = section.querySelector('.new-group-button');
        if (newGroupBtn) section.insertBefore(blocks, newGroupBtn);
        else section.appendChild(blocks);
        // Rebuild the section's filter row (its tag set may have changed).
        const pills = buildSectionFilterPills(category, section);
        if (pills) {
            const firstBlock = section.querySelector(':scope > .group-panel, :scope > .card-container');
            if (firstBlock) section.insertBefore(pills, firstBlock);
            else if (newGroupBtn) section.insertBefore(pills, newGroupBtn);
            else section.appendChild(pills);
            if (pills._apply) pills._apply();
        }
    }

    async function addCard() {
        if (!await validateTokenOrRedirect()) return;
        const name = langMode() === 'zh' ? document.getElementById('name-zh-input').value.trim() : document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        const category = document.getElementById('category-select-value').value;

        if (!name || !url || !category) {
            await customAlert('Please fill in the required info (name, URL, category)');
            return;
        }

        const newLink = {
            name, url, category,
            tips: '',
            subEn: document.getElementById('sub-en-input').value.trim().slice(0, 120),
            nameZh: document.getElementById('name-zh-input').value.trim().slice(0, 120),
            detail: document.getElementById('detail-input').value.trim().slice(0, 400),
            detailZh: document.getElementById('detail-zh-input').value.trim().slice(0, 400),
            btnLabel: document.getElementById('btn-label-input').value.trim().slice(0, 30),
            btnLabelZh: document.getElementById('btn-label-zh-input').value.trim().slice(0, 30),
            groupZh: document.getElementById('group-zh-input').value.trim().slice(0, 60),
            tagZh: document.getElementById('tag-zh-input').value.trim().slice(0, 60),
            categoryZh: document.getElementById('category-zh-input').value.trim().slice(0, 60),
            color: selColor,
            star: false,
            icon: document.getElementById('icon-input').value.trim(),
            iconDark: document.getElementById('icon-dark-input').value.trim(),
            group: langMode() === 'zh' ? document.getElementById('group-zh-input').value.trim().slice(0, 120) : document.getElementById('group-input').value.trim().slice(0, 120),
            tag: langMode() === 'zh' ? document.getElementById('tag-zh-input').value.trim().slice(0, 30) : document.getElementById('tag-input').value.trim().slice(0, 30),
            isPrivate: document.getElementById('private-checkbox').checked,
            isDirect: false
        };

        hideAddDialog();

        categories[category].links.push(newLink);
        // Keep the stored groups list in step: a group typed here for the
        // first time becomes a real group (and stays one even if this link
        // is later deleted).
        if (newLink.group) {
            const cat = categories[category];
            if (!Array.isArray(cat.groups)) cat.groups = [];
            if (!cat.groups.includes(newLink.group)) cat.groups.push(newLink.group);
        }
        try {
            await saveLinks();
        } catch (e) {
            await customAlert('Add failed: ' + e);
        }
        // Incremental update: rebuild only that category's grid (if the card should be visible)
        if (isEditMode || !newLink.isPrivate || isLoggedIn) {
            renderCategoryGrid(category);
            renderCategoryButtons();
        }
    }

    // Match a link by URL + name (fall back to URL only): the same URL can
    // appear in several categories, and URL-only matching edits the wrong one.
    function findLinkIndex(links, url, name) {
        let idx = links.findIndex(l => l.url === url && l.name === name);
        if (idx === -1) idx = links.findIndex(l => l.url === url);
        return idx;
    }

    async function updateCard(oldLink) {
        if (!await validateTokenOrRedirect()) return;

        const updatedLink = {
            name: langMode() === 'zh' ? (document.getElementById('name-zh-input').value.trim() || oldLink.name) : document.getElementById('name-input').value.trim(),
            url: document.getElementById('url-input').value.trim(),
            tips: oldLink.tips,
            subEn: document.getElementById('sub-en-input').value.trim().slice(0, 120),
            nameZh: document.getElementById('name-zh-input').value.trim().slice(0, 120),
            detail: document.getElementById('detail-input').value.trim().slice(0, 400),
            detailZh: document.getElementById('detail-zh-input').value.trim().slice(0, 400),
            btnLabel: document.getElementById('btn-label-input').value.trim().slice(0, 30),
            btnLabelZh: document.getElementById('btn-label-zh-input').value.trim().slice(0, 30),
            groupZh: document.getElementById('group-zh-input').value.trim().slice(0, 60),
            tagZh: document.getElementById('tag-zh-input').value.trim().slice(0, 60),
            categoryZh: document.getElementById('category-zh-input').value.trim().slice(0, 60),
            star: oldLink.star,
            color: selColor,
            isDirect: !!oldLink.isDirect,
            icon: document.getElementById('icon-input').value.trim(),
            iconDark: document.getElementById('icon-dark-input').value.trim(),
            group: langMode() === 'zh' ? (document.getElementById('group-zh-input').value.trim().slice(0, 120) || oldLink.group) : document.getElementById('group-input').value.trim().slice(0, 120),
            tag: langMode() === 'zh' ? (document.getElementById('tag-zh-input').value.trim().slice(0, 30) || oldLink.tag) : document.getElementById('tag-input').value.trim().slice(0, 30),
            category: document.getElementById('category-select-value').value,
            isPrivate: document.getElementById('private-checkbox').checked
        };

        let found = false;
        let oldCategory = null;

        // The name is required by the server (BAD_NAME rejects the whole save,
        // breaking every later save): in EN/both view it has no fallback, so
        // refuse an empty title here.
        if (!updatedLink.name) {
            await customAlert('Please fill in the required info (name, URL)');
            return;
        }

        // Fallback: if the form category is empty (can happen when legacy link.category is missing), fall back to oldLink's original category,
        // avoiding writing into categories[undefined]
        if (!updatedLink.category) {
            for (const c in categories) {
                if (findLinkIndex(categories[c].links, oldLink.url, oldLink.name) !== -1) { updatedLink.category = c; break; }
            }
        }

        for (const cat in categories) {
             const idx = findLinkIndex(categories[cat].links, oldLink.url, oldLink.name);

             if (idx !== -1) {
                 found = true;
                 oldCategory = cat;

                 if (cat === updatedLink.category) {
                     categories[cat].links[idx] = updatedLink;
                 }
                 else {
                     categories[cat].links.splice(idx, 1);

                     if(!categories[updatedLink.category]) {
                         categories[updatedLink.category] = { isHidden:false, groups: [], links:[] };
                     }
                     categories[updatedLink.category].links.push(updatedLink);
                 }
                 break;
             }
        }

        if (!found) {
             if(!categories[updatedLink.category]) {
                 categories[updatedLink.category] = { isHidden:false, groups: [], links:[] };
             }
             oldCategory = updatedLink.category;
             categories[updatedLink.category].links.push(updatedLink);
        }

        // Keep the stored groups list in step if the edit introduced a new group.
        if (updatedLink.group) {
            const target = categories[updatedLink.category];
            if (target) {
                if (!Array.isArray(target.groups)) target.groups = [];
                if (!target.groups.includes(updatedLink.group)) target.groups.push(updatedLink.group);
            }
        }

        hideAddDialog();
        await saveLinks();
        renderCategoryGrid(oldCategory);
        if (updatedLink.category !== oldCategory) renderCategoryGrid(updatedLink.category);
        renderCategoryButtons();
    }

    async function removeCard(card) {
        if (!await validateTokenOrRedirect()) return;
        const url = card.getAttribute('data-url');
        // Match by the stamped neutral name, not the displayed title: in zh
        // view the title is nameZh, so title text can never match l.name.
        const name = card.getAttribute('data-name') || '';
        for (const cat in categories) {
            const idx = findLinkIndex(categories[cat].links, url, name);
            if (idx !== -1) {
                categories[cat].links.splice(idx, 1);
                break;
            }
        }
        card.remove();
        await saveLinks();
    }

    // --- Drag helper functions ---
    function getCardState(card) {
        if(!card) return { category: null, index: -1, group: '' };
        const section = card.closest('.section');
        const index = Array.from(section.querySelectorAll('.card')).indexOf(card);
        // Prefer data-category (the original category name), falling back to section.id (sanitized slug) for compatibility
        const category = section.dataset.category || section.id;
        // The group comes from the grid the card sits in (ungrouped grids carry '')
        const grid = card.closest('.card-container');
        const group = grid ? (grid.dataset.group || '') : '';
        return { category: category, index: index, group: group };
    }

    // --- Drag (desktop) ---
    let draggedCard = null;
    function dragStart(e) {
        if (!isEditMode) { e.preventDefault(); return; }
        draggedCard = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = "move";
        initialDragState = getCardState(this);
    }
    function dragOver(e) {
        if (!isEditMode) return;
        e.preventDefault();
        const target = e.target.closest('.card');
        if (draggedCard && target && target !== draggedCard) {
            const container = target.parentElement;
            const rect = target.getBoundingClientRect();
            if (e.clientX < rect.left + rect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }
    async function drop(e) {
        if (!isEditMode) return;
        e.preventDefault();
        if (draggedCard) {
            const newState = getCardState(draggedCard);
            if (newState.category !== initialDragState.category || newState.index !== initialDragState.index || newState.group !== initialDragState.group) {
                updateCardCategory(draggedCard, newState.category);
                await saveCardOrder();
            }
            draggedCard = null;
        }
    }

    // Mobile drag
    let mobileDragTimer = null;
    let isMobileDragging = false;
    let mobilePlaceholder = null;
    let mobileClone = null;
    let mobileTouchOffset = { x: 0, y: 0 };
    let rafId = null;
    let lastTouchX = 0;
    let lastTouchY = 0;
    let lastSwapTime = 0;
    let activeContainer = null;
    let cloneWidth = 0;
    let cloneHeight = 0;

    function touchStart(e) {
        if (!isEditMode) return;
        if (e.touches.length > 1) return;

        const card = e.target.closest('.card');
        if (!card) return;

        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;

        if (mobileDragTimer) clearTimeout(mobileDragTimer);

        mobileDragTimer = setTimeout(() => {
            isMobileDragging = true;
            mobilePlaceholder = card;
            activeContainer = mobilePlaceholder.parentElement;

            initialDragState = getCardState(mobilePlaceholder);

            const rect = mobilePlaceholder.getBoundingClientRect();
            cloneWidth = rect.width;
            cloneHeight = rect.height;

            mobileTouchOffset.x = startX - rect.left;
            mobileTouchOffset.y = startY - rect.top;

            lastTouchX = startX;
            lastTouchY = startY;

            mobileClone = mobilePlaceholder.cloneNode(true);

            Object.assign(mobileClone.style, {
                position: 'fixed',
                left: rect.left + 'px',
                top: rect.top + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px',
                zIndex: '9999',
                opacity: '0.95',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.05)',
                transition: 'none'
            });
            mobileClone.classList.add('card-clone-dragging');
            mobileClone.classList.remove('group', 'hover:-translate-y-1', 'transition-all', 'duration-300');
            document.body.appendChild(mobileClone);

            // Placeholder style
            mobilePlaceholder.style.opacity = '0.3';
            mobilePlaceholder.classList.add('border-dashed', 'border-2', 'border-emerald-400');

            if (navigator.vibrate) navigator.vibrate(50);

            updatePosition();
        }, 500);

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchEnd);

        function updatePosition() {
            if (!isMobileDragging || !mobileClone) return;

            const x = lastTouchX - mobileTouchOffset.x;
            const y = lastTouchY - mobileTouchOffset.y;

            mobileClone.style.left = x + 'px';
            mobileClone.style.top = y + 'px';

            rafId = requestAnimationFrame(updatePosition);
        }

        function handleTouchMove(moveEvent) {
            const moveTouch = moveEvent.touches[0];

            if (!isMobileDragging) {
                const diffX = moveTouch.clientX - startX;
                const diffY = moveTouch.clientY - startY;
                const distance = Math.sqrt(diffX * diffX + diffY * diffY);

                if (distance > 10) {
                    clearTimeout(mobileDragTimer);
                    mobileDragTimer = null;
                }

                return;
            }

            if (isMobileDragging) {
                moveEvent.preventDefault();

                lastTouchX = moveTouch.clientX;
                lastTouchY = moveTouch.clientY;

                const now = Date.now();
                if (now - lastSwapTime > 30) {
                    detectSort(moveTouch.clientX, moveTouch.clientY);
                }
            }
        }

        function detectSort(fingerX, fingerY) {
            let elementBelow = document.elementFromPoint(fingerX, fingerY);
            if (!elementBelow) return;

            let targetCard = elementBelow.closest('.card') || elementBelow.closest('.add-card-placeholder');
            let targetContainer = targetCard ? targetCard.parentElement : elementBelow.closest('.card-container');

            if (!targetContainer) return;

            if (activeContainer !== targetContainer) {
                activeContainer = targetContainer;
                const placeholderBtn = activeContainer.querySelector('.add-card-placeholder');
                if (placeholderBtn) {
                    activeContainer.insertBefore(mobilePlaceholder, placeholderBtn);
                } else {
                    activeContainer.appendChild(mobilePlaceholder);
                }
                lastSwapTime = Date.now();
                return;
            }

            const containerRect = activeContainer.getBoundingClientRect();

            const cloneViewportCenterX = lastTouchX - mobileTouchOffset.x + (cloneWidth / 2);
            const cloneViewportCenterY = lastTouchY - mobileTouchOffset.y + (cloneHeight / 2);

            const cloneRelX = cloneViewportCenterX - containerRect.left + activeContainer.scrollLeft;
            const cloneRelY = cloneViewportCenterY - containerRect.top + activeContainer.scrollTop;

            const siblings = Array.from(activeContainer.children).filter(c =>
                (c.classList.contains('card') || c.classList.contains('add-card-placeholder')) && c !== mobilePlaceholder
            );

            if (siblings.length === 0) return;

            let closestElement = null;
            let minDistance = Infinity;

            for (const child of siblings) {
                const childCenterX = child.offsetLeft + child.offsetWidth / 2;
                const childCenterY = child.offsetTop + child.offsetHeight / 2;

                const dist = Math.hypot(cloneRelX - childCenterX, cloneRelY - childCenterY);

                if (dist < minDistance) {
                    minDistance = dist;
                    closestElement = child;
                }
            }

            if (closestElement) {
                const positionsBefore = new Map();
                const allChildren = Array.from(activeContainer.children).filter(el =>
                    el.classList.contains('card') || el.classList.contains('add-card-placeholder')
                );
                allChildren.forEach(el => positionsBefore.set(el, el.getBoundingClientRect()));

                const placeholderIndex = allChildren.indexOf(mobilePlaceholder);
                const targetIndex = allChildren.indexOf(closestElement);

                if (targetIndex > placeholderIndex) {
                    activeContainer.insertBefore(mobilePlaceholder, closestElement.nextSibling);
                } else {
                    activeContainer.insertBefore(mobilePlaceholder, closestElement);
                }

                animateFlip(activeContainer, positionsBefore);

                lastSwapTime = Date.now();
                if(navigator.vibrate) navigator.vibrate(10);
            }
        }

        function animateFlip(container, positionsBefore) {
            const siblings = Array.from(container.children);
            siblings.forEach(el => {
                if (el === mobilePlaceholder) return;

                const rectAfter = el.getBoundingClientRect();
                const rectBefore = positionsBefore.get(el);

                if (rectBefore && (rectBefore.left !== rectAfter.left || rectBefore.top !== rectAfter.top)) {
                    const dx = rectBefore.left - rectAfter.left;
                    const dy = rectBefore.top - rectAfter.top;

                    el.style.transition = 'none';
                    el.style.transform = \`translate(\${dx}px, \${dy}px)\`;
                    el.offsetHeight;
                    el.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)';
                    el.style.transform = '';

                    setTimeout(() => {
                        if (el.style.transform === '') {
                            el.style.transition = '';
                        }
                    }, 200);
                }
            });
        }

        function handleTouchEnd() {
            if (mobileDragTimer) {
                clearTimeout(mobileDragTimer);
                mobileDragTimer = null;
            }
            if (rafId) cancelAnimationFrame(rafId);

            if (isMobileDragging) {
                // Exit animation
                if (mobileClone && mobilePlaceholder) {
                    const rect = mobilePlaceholder.getBoundingClientRect();
                    mobileClone.style.transition = 'all 0.2s ease-out';
                    mobileClone.style.left = rect.left + 'px';
                    mobileClone.style.top = rect.top + 'px';
                    mobileClone.style.opacity = '0';

                    setTimeout(() => {
                        if (mobileClone) mobileClone.remove();
                        if (mobilePlaceholder) {
                             mobilePlaceholder.style.opacity = '';
                             mobilePlaceholder.classList.remove('border-dashed', 'border-2', 'border-emerald-400');
                        }

                        // Save order
                        saveCardOrder();

                        mobilePlaceholder = null;
                        mobileClone = null;
                    }, 200);
                } else {
                    if (mobileClone) mobileClone.remove();
                    if (mobilePlaceholder) mobilePlaceholder.style.opacity = '';
                }

                document.body.style.overflow = '';
            }

            isMobileDragging = false;
            cleanupListeners();
        }

        function cleanupListeners() {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchEnd);
        }
    }

    function updateCardCategory(card, newCategory) {
        const url = card.getAttribute('data-url');
        const name = card.getAttribute('data-name') || '';
        let item = null;
        for (const cat in categories) {
             const idx = findLinkIndex(categories[cat].links, url, name);
             if (idx !== -1) {
                 item = categories[cat].links.splice(idx, 1)[0];
                 break;
             }
        }
        if(item) {
            item.category = newCategory;
            categories[newCategory].links.push(item);
            // Keep the target's stored groups list in step, so a group
            // carried over by a drag keeps its header after save + reload.
            if (item.group) {
                const target = categories[newCategory];
                if (!Array.isArray(target.groups)) target.groups = [];
                if (!target.groups.includes(item.group)) target.groups.push(item.group);
            }
        }
    }

    async function saveCardOrder() {
        // Guard: if the page rendered no sections but we hold data in memory,
        // a broken render must not wipe the server copy.
        const sections = document.querySelectorAll('.section');
        if (sections.length === 0 && Object.keys(categories).length > 0) {
            console.warn('saveCardOrder aborted: no sections rendered');
            return;
        }
        const newCategories = {};
        // Pool of not-yet-placed links: consuming each match once keeps
        // duplicate URLs mapping to distinct link objects instead of collapsing.
        const pool = Object.values(categories).flatMap(x => x.links);
        sections.forEach(sec => {
            // Use data-category (the original name) as the category key, matching the categories object keys; fall back to section.id
            const catName = sec.dataset.category || sec.id;
            const oldCat = categories[catName];
            // Preserve the stored groups list: dropping it here would erase
            // every empty group on the next drag-save.
            newCategories[catName] = { isHidden: oldCat ? oldCat.isHidden : false, groups: (oldCat && Array.isArray(oldCat.groups)) ? oldCat.groups.slice() : [], links: [] };

            const cards = sec.querySelectorAll('.card');
            cards.forEach(c => {
                 const url = c.getAttribute('data-url');
                 const name = c.getAttribute('data-name') || '';
                 let idx = pool.findIndex(l => l.url === url && l.name === name);
                 if (idx === -1) idx = pool.findIndex(l => l.url === url);
                 if (idx !== -1) {
                     const original = pool.splice(idx, 1)[0];
                     original.category = catName;
                     // The group follows the grid the card sits in (also
                     // backfills group '' for links saved before groups existed)
                     const grid = c.closest('.card-container');
                     original.group = grid ? (grid.dataset.group || '') : '';
                     // A group carried in by a drag must also join the stored
                     // list, or its header would vanish after save + reload.
                     if (original.group && !newCategories[catName].groups.includes(original.group)) {
                         newCategories[catName].groups.push(original.group);
                     }
                     newCategories[catName].links.push(original);
                 }
            });
        });

        // Links whose cards are not rendered right now (a search filter is
        // active) must be re-appended to their own category, otherwise the
        // rebuild below would persist the filtered subset and delete the rest.
        pool.forEach(l => {
            const c = l.category;
            if (!newCategories[c]) {
                const oc = categories[c] || {};
                newCategories[c] = { isHidden: oc.isHidden || false, groups: (Array.isArray(oc.groups) ? oc.groups.slice() : []), links: [] };
            }
            newCategories[c].links.push(l);
        });

        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);
        await saveDataToServer('Save order', categories);
    }

    function applyTheme(isDark) {
        window.__themeManual = true;
        if (window.__paintTheme) window.__paintTheme(!!isDark);
        else document.documentElement.classList.toggle('dark', !!isDark);
        updateThemeSwitchUI();
    }

    function updateThemeSwitchUI() {
        const isDark = document.documentElement.classList.contains('dark');
        const checkbox = document.getElementById('theme-switch-checkbox');
        if(checkbox) checkbox.checked = isDark;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Auth and mode
    async function toggleEditMode() {
        document.getElementById('profile-dropdown').classList.add('hidden');
        if (!isLoggedIn) {
            toggleLogin();
            return;
        }

        if (!isEditMode) {
             isEditMode = true;
             updateUIState();

             renderCategories();

             // Notify the user
             // logAction('Enter Edit Mode', {});
        } else {
             // Exit Edit Mode
             isEditMode = false;
             updateUIState();
             renderCategories();
        }
    }

    async function toggleLogin() {
        if (!isLoggedIn) {
             document.getElementById('password-input').value = '';
             toggleOverlay('password-dialog-overlay', true);
             document.getElementById('password-input').focus();
        } else {
             if (await customConfirm('Log out?')) {
                 logout();
             }
        }
    }

    // innerWidth/innerHeight are unzoomed viewport px; the dialog lives in
    // zoomed CSS px, so the usable height is innerHeight / zoom. Cap the
    // dialog at 88% of that so the form scrolls inside on any screen.
    function fitDialogHeight() {
        const z = getZoom();
        document.getElementById('dialog-box').style.maxHeight = Math.round(window.innerHeight / z * 0.88) + 'px';
    }

    function showAddDialog() {
        toggleOverlay('dialog-overlay', true);
        fitDialogHeight();
        document.getElementById('name-input').value = '';
        document.getElementById('url-input').value = '';
        document.getElementById('sub-en-input').value = '';
        document.getElementById('name-zh-input').value = '';
        document.getElementById('detail-input').value = '';
        document.getElementById('detail-zh-input').value = '';
        document.getElementById('btn-label-input').value = '';
        document.getElementById('btn-label-zh-input').value = '';
        selColor = '';
        markColorSel();
        document.getElementById('icon-input').value = '';
        document.getElementById('icon-dark-input').value = '';
        document.getElementById('private-checkbox').checked = false;
        document.getElementById('group-input').value = '';
        document.getElementById('tag-input').value = '';
        document.getElementById('group-zh-input').value = '';
        document.getElementById('tag-zh-input').value = '';
        document.getElementById('category-zh-input').value = '';
        updateGroupDatalist('');
        updateTagDatalist('');

        document.getElementById('category-select-value').value = '';
        document.getElementById('category-select-text').textContent = T('Select a category');

        const btn = document.getElementById('dialog-confirm-btn');
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.onclick = addCard;

        document.getElementById('dialog-cancel-btn').onclick = hideAddDialog;
    }

    function showEditDialog(link) {
        toggleOverlay('dialog-overlay', true);
        fitDialogHeight();
        document.getElementById('name-input').value = link.name;
        document.getElementById('url-input').value = link.url;
        document.getElementById('sub-en-input').value = link.subEn || '';
        document.getElementById('name-zh-input').value = langMode() === 'zh' ? link.name : (link.nameZh || '');
        document.getElementById('detail-input').value = link.detail || '';
        document.getElementById('detail-zh-input').value = link.detailZh || '';
        document.getElementById('btn-label-input').value = link.btnLabel || '';
        document.getElementById('btn-label-zh-input').value = link.btnLabelZh || '';
        document.getElementById('group-zh-input').value = link.groupZh || '';
        document.getElementById('tag-zh-input').value = link.tagZh || '';
        document.getElementById('category-zh-input').value = link.categoryZh || '';
        selColor = COLOR_KEYS.includes(link.color) ? link.color : '';
        markColorSel();
        document.getElementById('icon-input').value = link.icon || '';
        document.getElementById('icon-dark-input').value = link.iconDark || '';
        document.getElementById('private-checkbox').checked = link.isPrivate;

        const linkCategory = link.category || (() => {
            for (const c in categories) if (categories[c].links.some(l => l.url === link.url)) return c;
            return '';
        })();
        document.getElementById('category-select-value').value = linkCategory;
        if (!link.categoryZh) document.getElementById('category-zh-input').value = catZhOf(linkCategory);
        document.getElementById('category-select-text').textContent = linkCategory ? pickBilingual(linkCategory, 'c') : T('Select a category');
        document.getElementById('group-input').value = link.group || '';
        // Prefill the stored tag, not the fallback function-tag map: saving
        // the dialog materializes whatever is in this box, so a prefilled map
        // value would become a real stored tag on cards that never had one.
        document.getElementById('tag-input').value = (link.tag === undefined ? '' : link.tag);
        updateGroupDatalist(linkCategory);
        updateTagDatalist(linkCategory);

        const btn = document.getElementById('dialog-confirm-btn');
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.onclick = () => updateCard(link);

        document.getElementById('dialog-cancel-btn').onclick = hideAddDialog;
    }

    function hideAddDialog() {
        toggleOverlay('dialog-overlay', false);
    }

    // Phase 1: card detail popup. Click a card (mouse or touch) → detail text,
    // custom jump button. Esc closes, Enter opens the link, clicking the dim
    // background closes, Ctrl/Cmd+click and middle-click open the link directly.
    let currentDetailLink = null;

    // UI language (Phase 2): 'en' is the default; 'zh' is the second language
    // whose tab shows the user-defined label (default 漢, editable in Settings).
    // Preference persists only with Remember Settings; missing/invalid falls back to en.
    const LANG_KEY = 'langPref';
    // Language coverage (v27): which languages the site contains. Device-local
    // (localStorage only), default zh-only. Both checked = bilingual UI with the
    // switch visible; one language alone hides the desktop capsule, dims the
    // mobile settings row to a dark inoperable state, and shows only that
    // language's editor fields. 漢 is fixed text — the custom label feature is
    // removed. The last checked language can never be unchecked.
    const LANGS_KEY = 'langs';
    let LANGS = (() => {
        try {
            const v = JSON.parse(localStorage.getItem(LANGS_KEY) || 'null');
            if (v && typeof v.en === 'boolean' && typeof v.zh === 'boolean' && (v.en || v.zh)) return v;
        } catch (e) {}
        return { en: false, zh: true };
    })();
    function langMode() { return LANGS.en && LANGS.zh ? 'both' : (LANGS.zh ? 'zh' : 'en'); }
    function forcedLang() { const m = langMode(); return m === 'both' ? null : m; }
    let LANG = forcedLang() || ((localStorage.getItem('savePreferences') === 'true' && localStorage.getItem(LANG_KEY) === 'zh') ? 'zh' : 'en');

    // UI vocabulary table (exact English string -> zh). Covers static chrome,
    // JS-built menus/statuses, placeholders and data-tooltip values.
    const VOCAB = {
        'Settings': '設定',
        'Edit Mode': '編輯模式',
        'Enter Edit Mode': '進入編輯模式',
        'Exit Edit': '退出編輯',
        'Edit Mode (login required)': '編輯模式（需登入）',
        'One-Click Check': '一鍵檢查',
        'Export Config': '匯出配置',
        'Import Config': '匯入配置',
        'APP View': 'APP 視圖',
        'Minimal View': '簡約視圖',
        'Dark Mode': '深色模式',
        'Remember Settings': '記憶設置',
        'Login': '登入',
        'Logout': '登出',
        'Login / Logout': '登入／登出',
        'New Category': '新增分類',
        'Back to top': '回到頂部',
        'Search': '搜尋',
        'This site': '本站',
        'Search Engine': '搜尋引擎',
        'Edit': '編輯',
        'Delete': '刪除',
        'Checking...': '檢查中…',
        'Offline': '離線',
        '0 sites': '0 個網站',
        'Select a category': '選擇分類',
        'Please enter a new category name': '請輸入新分類名稱',
        'Please enter a new group name': '請輸入新分組名稱',
        'Please enter the new category name': '請輸入新的分類名稱',
        'Rename group': '重新命名分組',
        'Confirm Login': '確認登入',
        'Cancel': '取消',
        'Confirm': '確認',
        'Open Link': '打開連結',
        'Card Color': '卡片顏色',
        'Logo': '標誌',
        'Site Name': '站名',
        'Language': '語言',
        'Logo Style': '樣式',
        'Color': '配色',
        'Image URL': '圖片網址',
        'Shape': '形狀',
        'Square': '方形',
        'Circle': '圓形',
        'Preview': '預覽',
        'Logo saved': '標誌已保存',
        'Save failed': '保存失敗',
        'All': '全部',
        'Edit Info': '編輯資訊',
        'Name': '名稱',
        'Subtitle (EN)': '副標題 (英)',
        'Subtitle (漢)': '副標題 (漢)',
        'URL': '網址',
        'Description (EN)': '詳細說明 (英)',
        'Description (漢)': '詳細說明 (漢)',
        'Optional — Chinese description': '可選 — 詳細說明（漢）',
        'Button Label (EN)': '按鈕標籤 (英)',
        'Button Label (漢)': '按鈕標籤 (漢)',
        'Icon URL': '圖標網址',
        'Icon URL (Dark Mode)': '圖標網址 (深色模式)',
        'Group': '分組',
        'Tag': '標籤',
        'Category': '分類',
        'Set as private link (visible only when logged in)': '設為私人連結（僅登入後可見）',
        'Close': '關閉',
        'Authentication': '身分驗證',
        'Please enter the admin password to continue': '請輸入管理密碼以繼續',
        'Access password': '訪問密碼',
        'Site name': '網站名稱',
        'Optional — shown as the card\\'s second line': '可選 — 顯示於卡片第二行',
        'Leave blank to auto-fetch': '留空以自動抓取',
        'Leave blank to use the same icon': '留空＝兩模式同一圖',
        'Optional — leave blank for no group': '可選 — 留空為無分組',
        'Optional — leave blank for no tag': '可選 — 留空為無標籤',
        'Optional — Chinese name': '可選 — 中文名',
        'Group (漢)': '分組 (漢)',
        'Tag (漢)': '標籤 (漢)',
        'Category (漢)': '分類 (漢)',
        'Full description shown in the card and popup...': '完整說明將於卡片與彈窗顯示…',
        'Plain — no tint': '素色 — 不染色',
        'Violet': '紫紅',
        'Emerald': '翠綠',
        'Sky': '天青',
        'Amber': '琥珀',
        'Rose': '玫紅',
        'Slate': '灰藍',
        'Cyan': '青綠',
        'Indigo': '靛藍',
        'Fuchsia': '品紅',
        'Orange': '橘',
        'Check liveness and latency for all sites?': '檢測全站網站的存活與延遲？',
        'Error loading links, please refresh the page and try again': '載入連結出錯，請重新整理頁面再試一次',
        'Your login credentials have expired, please log in again': '登入憑證已過期，請重新登入',
        'Your session has expired, please log in again': '登入階段已過期，請重新登入',
        'Operation failed, please try again': '操作失敗，請再試一次',
        'Network unavailable, please try again later': '網路無法使用，請稍後再試',
        'This category already exists': '此分類已存在',
        'This name already exists': '此名稱已存在',
        'Group name cannot be empty': '分組名稱不能為空',
        'Group name is too long (max 120 characters)': '分組名稱太長（最多 120 字元）',
        'Category name is too long (max 120 characters)': '分類名稱太長（最多 120 字元）',
        'A group with this name already exists in this category': '此分類已有同名分組',
        'Delete "': '確定要刪除分類 "',
        '" category and all its links?': '"，連同其全部連結？',
        'This is the last category. Deleting it clears ALL data. Continue?': '這是最後一個分類，刪除它會清空全部資料。繼續？',
        'Delete group "': '確定要刪除分組 "',
        '"? Its links will become ungrouped, not deleted.': '"？其連結不會刪除，只是還原為未分組。',
        'No matching sites found.': '找不到符合的網站。',
        'Please fill in the required info (name, URL, category)': '請填寫必要資料（名稱、網址、分類）',
        'Please fill in the required info (name, URL)': '請填寫必要資料（名稱、網址）',
        'Add failed: ': '新增失敗：',
        'Log out?': '登出？',
        'Login successful': '登入成功',
        'Login Error': '登入錯誤',
        'Incorrect password': '密碼錯誤',
        'Incorrect password, ': '密碼錯誤，還剩 ',
        ' attempt(s) remaining': ' 次可試',
        'Login is locked, please try again in ': '登入已鎖定，請在 ',
        's before trying again': ' 秒後再試',
        'Lockout period has ended, you can try logging in again': '鎖定時間已結束，可以再試登入',
        'Export data?': '匯出資料？',
        'Export failed': '匯出失敗',
        'Import data?This will overwrite existing data!': '匯入資料？這會覆蓋現有的全部資料！',
        'Data imported successfully!': '資料匯入成功！',
        'Invalid file format, please check the file content!': '檔案格式不對，請檢查檔案內容！',
        'Data import failed, please try again!': '資料匯入失敗，請再試一次！',
    };
    function T(s) { return (LANG === 'zh' && VOCAB[s]) ? VOCAB[s] : s; }
    // Bilingual display names for shared names (category / group / tag).
    // Two sources: the user's "中文 | English" format (zh = left half, en =
    // right half), and the per-card (漢) fields — for a raw name, the first
    // card in data order that filled that field supplies the Chinese name.
    function zhNameOf(kind, raw) {
        for (const c in categories) {
            const links = categories[c].links || [];
            for (let i = 0; i < links.length; i++) {
                const l = links[i];
                if (kind === 'c' && c === raw && l.categoryZh) return l.categoryZh;
                if (kind === 'g' && l.group === raw && l.groupZh) return l.groupZh;
                if (kind === 't' && l.tag === raw && l.tagZh) return l.tagZh;
            }
        }
        return '';
    }
    function pickBilingual(s, kind) {
        const parts = String(s).split(' | ');
        if (parts.length >= 2) return LANG === 'zh' ? parts[0] : parts.slice(1).join(' | ');
        if (LANG !== 'zh') return s;
        return zhNameOf(kind, s) || s;
    }
    // (漢)-box prefill for a category name: the " | " format left half, else
    // the scan of cards' categoryZh. The dropdown selection, the "+" tile and
    // the edit dialog all prefill through this, so the 漢 box never lags
    // behind the selected category (save writes it to the card's own slot).
    function catZhOf(cat) {
        if (!cat) return '';
        const parts = String(cat).split(' | ');
        if (parts.length >= 2) return parts[0].trim();
        return zhNameOf('c', cat);
    }
    // lang2Label removed: the custom second-language label feature is dropped (v27),
// the 漢 tab is fixed text.

    // Originals cache keyed by text node / element, so switching back to en
    // restores exactly what was rendered. Nodes are collected lazily on each pass.
    const langOriginals = new Map();
    function applyLang() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const p = node.parentNode;
                if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || p.nodeName === 'TEXTAREA') return NodeFilter.FILTER_SKIP;
                if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
                // Render-time T() already localizes these; letting the walker
                // cache them would poison the en restore with zh text.
                if (p.closest('.filter-pills') || p.closest('#category-buttons-container') || p.closest('#category-select-text') || p.closest('#site-name') || p.closest('.section-title') || p.closest('.group-header') || p.closest('#category-select-menu') || p.closest('#name-zh-label')) return NodeFilter.FILTER_SKIP;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (!langOriginals.has(node)) langOriginals.set(node, node.textContent);
            const orig = langOriginals.get(node).trim();
            node.textContent = (LANG === 'zh' && VOCAB[orig]) ? VOCAB[orig] : langOriginals.get(node);
        }
        document.querySelectorAll('[placeholder]').forEach(el => {
            if (!langOriginals.has(el)) langOriginals.set(el, el.getAttribute('placeholder'));
            const orig = langOriginals.get(el).trim();
            el.setAttribute('placeholder', (LANG === 'zh' && VOCAB[orig]) ? VOCAB[orig] : langOriginals.get(el));
        });
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            if (!langOriginals.has(el)) langOriginals.set(el, el.getAttribute('data-tooltip'));
            const orig = langOriginals.get(el).trim();
            el.setAttribute('data-tooltip', (LANG === 'zh' && VOCAB[orig]) ? VOCAB[orig] : langOriginals.get(el));
        });
        document.querySelectorAll('[title]').forEach(el => {
            if (!langOriginals.has(el)) langOriginals.set(el, el.getAttribute('title'));
            const orig = langOriginals.get(el).trim();
            el.setAttribute('title', (LANG === 'zh' && VOCAB[orig]) ? VOCAB[orig] : langOriginals.get(el));
        });
    }
    function updateLangCapsule() {
        document.querySelectorAll('.lang-capsule .lang-seg').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === LANG);
        });
    }
    function setLang(lang) {
        if (lang !== 'en' && lang !== 'zh') return;
        if (forcedLang()) return; // single-language mode: the switch is not operable
        LANG = lang;
        if (localStorage.getItem('savePreferences') === 'true') localStorage.setItem(LANG_KEY, lang);
        refreshLangRender();
    }
    function refreshLangRender() {
        updateLangCapsule();
        renderSearchEngineMenu();
        renderCategoryButtons();
        // The category dropdown text is JS-localized (walk skips it), so it
        // needs this explicit refresh; the menu list is rebuilt the same way.
        const csel = document.getElementById('category-select-value').value;
        document.getElementById('category-select-text').textContent = csel ? pickBilingual(csel, 'c') : T('Select a category');
        updateCategorySelect();
        const q = document.getElementById('search-input').value.trim();
        // Lock the spy BEFORE re-rendering: renderCategorySections ends by
        // re-arming setupScrollSpy, whose immediate first pass runs the
        // position check on the freshly resized page (CJK content makes the
        // page shorter/taller, so the scroll clamps and the position-based
        // pick lands on a different section). Without this lock, that pass
        // overwrites lastActiveCat, and the forced restore below highlights
        // the overwrite — that was the en/zh ping-pong.
        if (lastActiveCat) spyLockedUntil = Date.now() + 600;
        if (q) { searchLinks(q); } else { renderCategorySections({ renderButtons: true }); }
        if (lastActiveCat) {
            spyLockedUntil = Date.now() + 900;
            highlightButton(lastActiveCat);
            // Anchor the user's section at the viewport top so the page's
            // new scroll position and the remembered selection agree exactly.
            // Then late scroll events (smooth-scroll animation, clamping after
            // the page height changes) find the spy re-picking the SAME
            // section, so the highlight can never drift.
            const selSec = document.getElementById(lastActiveCat);
            if (selSec) selSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        applyLang();
        applyFieldVisibility();
        const overlay = document.getElementById('detail-overlay');
        if (currentDetailLink && overlay && !overlay.classList.contains('hidden')) showDetailPopup(currentDetailLink);
    }
    document.querySelectorAll('.lang-capsule .lang-seg').forEach(b => {
        b.onclick = () => setLang(b.dataset.lang);
    });
    const langEnCheck = document.getElementById('lang-en-check');
    const langZhCheck = document.getElementById('lang-zh-check');
    // single-language mode hides the other language's editor fields; in zh-only
    // mode the (漢) field doubles as the card title input, so its label swaps.
    const FIELD_LANG = { 'name-field': 'en', 'sub-en-field': 'en', 'detail-field': 'en', 'btn-label-field': 'en', 'group-field': 'en', 'tag-field': 'en',
        'name-zh-field': 'zh', 'detail-zh-field': 'zh', 'btn-label-zh-field': 'zh', 'group-zh-field': 'zh', 'tag-zh-field': 'zh', 'category-zh-field': 'zh' };
    function applyFieldVisibility() {
        const m = langMode();
        Object.keys(FIELD_LANG).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('hidden', !LANGS[FIELD_LANG[id]]);
        });
        const zhLabel = document.getElementById('name-zh-label');
        if (zhLabel) zhLabel.textContent = m === 'zh' ? '標題 (漢)' : (LANG === 'zh' ? '副標題 (漢)' : 'Subtitle (漢)');
    }
    function syncLangChecks() {
        if (langEnCheck) langEnCheck.checked = LANGS.en;
        if (langZhCheck) langZhCheck.checked = LANGS.zh;
    }
    function updateLangSwitchUi() {
        const single = langMode() !== 'both';
        const cap = document.getElementById('lang-capsule');
        if (cap) cap.classList.toggle('hidden', single);
        const row = document.getElementById('settings-lang-row');
        if (row) {
            if (!single) {
                row.style.display = ''; row.style.opacity = '1'; row.style.pointerEvents = 'auto';
            } else if (isLoggedIn) {
                row.style.display = ''; row.style.opacity = '0.4'; row.style.pointerEvents = 'none';
            } else {
                row.style.display = 'none';
            }
        }
    }
    function onLangCheck() {
        if (!isLoggedIn) { syncLangChecks(); return; } // checkboxes are admin-only
        const next = { en: langEnCheck.checked, zh: langZhCheck.checked };
        if (!next.en && !next.zh) { syncLangChecks(); return; } // the last checked language stays on
        LANGS = next;
        localStorage.setItem(LANGS_KEY, JSON.stringify(LANGS));
        LANG = forcedLang() || LANG;
        refreshLangRender();
        updateLangSwitchUi();
        // Persist as the site-wide setting: every visitor on any device sees
        // this state. The write is admin-authenticated; failures keep the
        // checkboxes in the just-applied state for this session.
        const t = localStorage.getItem('authToken');
        fetch('/api/langs', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': t }, body: JSON.stringify({ langs: LANGS }) }).catch(() => {});
    }
    if (langEnCheck) langEnCheck.onchange = onLangCheck;
    if (langZhCheck) langZhCheck.onchange = onLangCheck;
    syncLangChecks();
    updateLangCapsule();
    updateLangSwitchUi();
    applyFieldVisibility();
    // Site-wide language setting lives on the server. localStorage is just the
    // first-paint cache: every visitor loads the admin's state and the page
    // corrects itself the moment the answer arrives, on any device/browser.
    function applySiteLangs(v) {
        if (!v || typeof v.en !== 'boolean' || typeof v.zh !== 'boolean' || (!v.en && !v.zh)) return;
        if (v.en === LANGS.en && v.zh === LANGS.zh) return;
        LANGS = { en: v.en, zh: v.zh };
        localStorage.setItem(LANGS_KEY, JSON.stringify(LANGS));
        if (forcedLang()) LANG = forcedLang();
        syncLangChecks();
        refreshLangRender();
        updateLangSwitchUi();
    }
    function loadSiteLangs() {
        fetch('/api/langs').then(r => r.json()).then(v => applySiteLangs(v)).catch(() => {});
    }
    loadSiteLangs();
    if (LANG === 'zh') applyLang(); // cards render after this block, so LANG is already set

    // Card colors (v24): subtle gradient tints picked from editor swatches.
    // '' = plain (site default). Star feature removed; legacy star key kept.
    const COLOR_KEYS = ['violet', 'emerald', 'sky', 'amber', 'rose', 'slate', 'cyan', 'indigo', 'fuchsia', 'orange'];
    // Solid swatch colors for the open-link button (popup and list rows share
    // this table); uncolored cards fall back to the CSS emerald.
    const COLOR_BUTTON = { violet: '#7c3aed', emerald: '#059669', sky: '#0284c7', amber: '#d97706', rose: '#be123c', slate: '#475569', cyan: '#0891b2', indigo: '#4f46e5', fuchsia: '#c026d3', orange: '#ea580c' };
    let selColor = '';
    function markColorSel() {
        document.querySelectorAll('#color-picker .color-swatch').forEach(b => b.classList.toggle('sel', b.dataset.color === selColor));
    }
    document.querySelectorAll('#color-picker .color-swatch').forEach(b => {
        b.onclick = () => { selColor = b.dataset.color; markColorSel(); };
    });

    function cardSubtitle(link) {
        const m = langMode();
        if (m === 'zh') return link.nameZh || ''; // zh-only: the zh subtitle stays in the subtitle slot
        if (m === 'en') return link.subEn || '';
        return LANG === 'zh' ? (link.nameZh || '') : (link.subEn || '');
    }
    function cardDesc(link) {
        // Card line = the detail description in the current language. Single-language
        // mode shows blank when that language's content is missing; bilingual mode
        // keeps the other language as fallback. Legacy tips stays popup-only.
        const m = langMode();
        if (m === 'zh') return link.detailZh || '';
        if (m === 'en') return link.detail || '';
        return LANG === 'zh' ? (link.detailZh || '') : (link.detail || '');
    }

    // The popup has two Open Link buttons — header (desktop) and full-width
    // bottom (mobile) — and CSS shows exactly one. Both always carry the
    // same label and tint; pass null for the half you don't want to change.
    function setDetailOpenButtons(label, bg) {
        for (const id of ['detail-open-btn', 'detail-open-btn-mobile']) {
            const b = document.getElementById(id);
            if (!b) continue;
            if (label !== null) b.textContent = label;
            if (bg !== null) b.style.background = bg;
        }
    }

    function showDetailPopup(link) {
        currentDetailLink = link;
        const titleEl = document.getElementById('detail-title');
        const subEl = document.getElementById('detail-sub');
        const textEl = document.getElementById('detail-text');
        const img = document.getElementById('detail-icon');

        titleEl.textContent = link.name;
        const sub = cardSubtitle(link);
        subEl.textContent = sub;
        subEl.classList.toggle('hidden', !sub);

        // Same language rule as the card line: zh picks the zh detail first,
        // en picks English; legacy tips stays the last-resort fallback.
        const detail = cardDesc(link);
        textEl.textContent = detail;
        textEl.classList.toggle('hidden', !detail);

        // Same icon proxy route as the cards, at popup display size.
        // Clear the previous card's bitmap the moment the popup opens: a
        // browser keeps an <img>'s old picture on screen while a new src
        // loads (~1s through the proxy), which read as a stale cache. Hide
        // the old image, show the spinner, reveal the new one on load.
        const effIcon = (document.documentElement.classList.contains('dark') && link.iconDark) ? link.iconDark : (link.icon || '');
        const isCustom = effIcon.startsWith('http');
        const spin = document.getElementById('detail-icon-spin');
        img.style.display = 'none';
        if (spin) spin.style.display = 'flex';
        img.onload = () => { img.style.display = ''; if (spin) spin.style.display = 'none'; };
        img.src = iconPickedUrl.get(link.url + '|' + effIcon) || (imgApi + encodeURIComponent(isCustom ? effIcon : link.url) + (isCustom ? '&direct=1' : '') + '&w=64');
        // Re-opening the same card: the image is already in cache, show at once.
        if (img.complete && img.naturalWidth > 0) { img.style.display = ''; if (spin) spin.style.display = 'none'; }
        img.onerror = () => { img.style.display = 'none'; if (spin) spin.style.display = 'none'; };

        // Tint the Open Link buttons with the card's color. Solid swatch colors
        // keep white text; an uncolored card resets to the CSS green.
        setDetailOpenButtons(null, COLOR_BUTTON[link.color] || '');

        // Bilingual label, fixed (v33): the old rule keyed on langMode() and
        // 'both' fell to the EN side, so a custom Chinese label never showed
        // in zh mode — the labels read as reversed. Pick by the UI language:
        // zh shows the zh label first, en shows English. Base text is written
        // as the English original so applyLang restores it when zh is off.
        const openLabel = LANG === 'zh' ? (link.btnLabelZh || link.btnLabel) : link.btnLabel;
        setDetailOpenButtons(openLabel || 'Open Link', null);
        if (LANG === 'zh') applyLang();

        toggleOverlay('detail-overlay', true);
    }

    /* Logo customization (v25): top bar icon + favicon follow one KV setting.
       Gallery presets are tinted gradient tiles with a white glyph; an image
       URL wins when non-empty (two modes, mutually exclusive). The engine
       logos inside the search box are untouched. */
    const LOGO_PRESETS = {
        star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>',
        terminal: '<polyline points="4 17 10 12 4 7"></polyline><line x1="12" y1="22" x2="20" y2="22"></line>',
        bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
        globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
        bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
        navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>'
    };
    const LOGO_COLORS = ['violet', 'purple', 'emerald', 'sky', 'amber', 'rose', 'slate'];
    const LOGO_GRADIENTS = {
        violet: ['#a78bfa', '#7c3aed'],
        purple: ['#a855f7', '#7e22ce'],
        emerald: ['#34d399', '#059669'],
        sky: ['#38bdf8', '#0284c7'],
        amber: ['#fbbf24', '#d97706'],
        rose: ['#fb7185', '#be123c'],
        slate: ['#94a3b8', '#475569']
    };
    let logoState = { preset: 'star', color: 'purple', url: '', shape: 'square', name: '' };

    function logoSvgMarkup(inner, size, strokeW) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + strokeW + '" stroke-linecap="round" stroke-linejoin="round" width="' + size + '" height="' + size + '">' + inner + '</svg>';
    }

    function logoSrcForUrl() {
        return imgApi + encodeURIComponent(logoState.url) + '&direct=1&w=64';
    }

    function faviconForPreset() {
        const g = LOGO_GRADIENTS[logoState.color] || LOGO_GRADIENTS.purple;
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'
            + '<defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">'
            + '<stop offset="0%" stop-color="' + g[0] + '"/><stop offset="100%" stop-color="' + g[1] + '"/>'
            + '</linearGradient></defs>'
            + '<rect width="128" height="128" rx="24" fill="url(#grad)"/>'
            + '<g transform="translate(16 16) scale(4)" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
            + (LOGO_PRESETS[logoState.preset] || LOGO_PRESETS.star) + '</g></svg>';
        return 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    // Shared painter for the top bar box and the dialog preview box.
    function paintLogoBox(box) {
        const g = LOGO_GRADIENTS[logoState.color] || LOGO_GRADIENTS.purple;
        box.style.borderRadius = logoState.shape === 'circle' ? '9999px' : '8px';
        if (logoState.url) {
            box.style.background = 'transparent';
            box.className = 'w-8 h-8 flex items-center justify-center overflow-hidden text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300';
            box.innerHTML = '<img src="' + logoSrcForUrl() + '" alt="logo" class="w-full h-full object-cover" style="object-fit:cover" onerror="logoRenderFail()">';
        } else {
            box.style.background = 'linear-gradient(135deg, ' + g[0] + ', ' + g[1] + ')';
            box.className = 'w-8 h-8 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300';
            box.innerHTML = logoSvgMarkup(LOGO_PRESETS[logoState.preset] || LOGO_PRESETS.star, 20, 2.2);
        }
    }

    function renderLogo() {
        paintLogoBox(document.getElementById('logo-visual'));
        const fav = document.getElementById('favicon-link');
        if (fav) fav.href = logoState.url ? logoSrcForUrl() : faviconForPreset();
        try { localStorage.setItem('logo_cache', JSON.stringify({ s: logoState, f: fav ? fav.href : '' })); } catch (e) {}
        const nameEl = document.getElementById('site-name');
        if (nameEl) nameEl.textContent = logoState.name || 'RENVDER NAV';
        document.title = logoState.name || 'RENVDER NAV';
        const preview = document.getElementById('logo-preview');
        if (preview) {
            preview.className = 'w-8 h-8 flex items-center justify-center text-white overflow-hidden';
            preview.style.borderRadius = logoState.shape === 'circle' ? '9999px' : '8px';
            preview.style.background = logoState.url ? 'transparent' : 'linear-gradient(135deg, ' + (LOGO_GRADIENTS[logoState.color] || LOGO_GRADIENTS.purple)[0] + ', ' + (LOGO_GRADIENTS[logoState.color] || LOGO_GRADIENTS.purple)[1] + ')';
            preview.innerHTML = logoState.url
                ? '<img src="' + logoSrcForUrl() + '" alt="" class="w-full h-full object-cover" style="object-fit:cover" onerror="this.style.display=\\\'none\\\'">'
                : logoSvgMarkup(LOGO_PRESETS[logoState.preset] || LOGO_PRESETS.star, 20, 2.2);
        }
        const namePrev = document.getElementById('logo-name-preview');
        if (namePrev) namePrev.textContent = logoState.name || 'RENVDER NAV';
    }

    // Image URL failed to load: fall back to the gallery so nothing goes blank.
    function logoRenderFail() {
        logoState.url = '';
        const input = document.getElementById('logo-url-input');
        if (input) input.value = '';
        renderLogo();
    }

    function refreshLogoDialog() {
        document.querySelectorAll('#logo-presets button').forEach(b => {
            const g = LOGO_GRADIENTS[logoState.color] || LOGO_GRADIENTS.purple;
            b.style.background = 'linear-gradient(135deg, ' + g[0] + ', ' + g[1] + ')';
            b.style.borderRadius = logoState.shape === 'circle' ? '9999px' : '12px';
            b.innerHTML = logoSvgMarkup(LOGO_PRESETS[b.dataset.preset], 20, 2.2);
            b.classList.toggle('sel', !logoState.url && b.dataset.preset === logoState.preset);
        });
        document.querySelectorAll('#logo-colors button').forEach(b => {
            const g = LOGO_GRADIENTS[b.dataset.color];
            b.style.background = 'linear-gradient(135deg, ' + g[0] + ', ' + g[1] + ')';
            b.classList.toggle('sel', !logoState.url && b.dataset.color === logoState.color);
        });
        const sq = document.getElementById('logo-shape-square');
        const ci = document.getElementById('logo-shape-circle');
        sq.classList.toggle('bg-emerald-500', logoState.shape === 'square');
        sq.classList.toggle('text-white', logoState.shape === 'square');
        sq.classList.toggle('text-slate-600', logoState.shape !== 'square');
        sq.classList.toggle('dark:text-slate-300', logoState.shape !== 'square');
        ci.classList.toggle('bg-emerald-500', logoState.shape === 'circle');
        ci.classList.toggle('text-white', logoState.shape === 'circle');
        ci.classList.toggle('text-slate-600', logoState.shape !== 'circle');
        ci.classList.toggle('dark:text-slate-300', logoState.shape !== 'circle');
        renderLogo();
    }

    function openLogoDialog() {
        if (!isLoggedIn) return;
        const input = document.getElementById('logo-url-input');
        input.value = logoState.url;
        document.getElementById('logo-name-input').value = logoState.name;
        refreshLogoDialog();
        toggleOverlay('logo-overlay', true);
    }

    async function saveLogo() {
        try {
            const body = { logo: { preset: logoState.preset, color: logoState.color, url: logoState.url, shape: logoState.shape, name: logoState.name.trim() } };
            const res = await fetchWithAuth('/api/logo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            const out = await res.json();
            if (!res.ok || !out.success) { customAlert(T('Save failed')); return; }
            renderLogo();
            toggleOverlay('logo-overlay', false);
            customAlert(T('Logo saved'));
        } catch (e) {
            customAlert(T('Save failed'));
        }
    }

    function buildLogoDialog() {
        const presetBox = document.getElementById('logo-presets');
        Object.keys(LOGO_PRESETS).forEach(key => {
            const b = document.createElement('button');
            b.className = 'logo-preset';
            b.dataset.preset = key;
            b.onclick = () => {
                // Picking a preset clears the URL: the two modes cannot coexist.
                logoState.preset = key;
                logoState.url = '';
                const input = document.getElementById('logo-url-input');
                if (input) input.value = '';
                refreshLogoDialog();
            };
            presetBox.appendChild(b);
        });
        const colorBox = document.getElementById('logo-colors');
        LOGO_COLORS.forEach(key => {
            const b = document.createElement('button');
            b.className = 'color-swatch';
            b.dataset.color = key;
            b.onclick = () => { logoState.color = key; refreshLogoDialog(); };
            colorBox.appendChild(b);
        });
        document.getElementById('logo-url-input').addEventListener('input', (e) => {
            logoState.url = e.target.value.trim();
            refreshLogoDialog();
        });
        document.getElementById('logo-name-input').addEventListener('input', (e) => {
            logoState.name = e.target.value;
            refreshLogoDialog();
        });
        document.getElementById('logo-shape-square').onclick = () => { logoState.shape = 'square'; refreshLogoDialog(); };
        document.getElementById('logo-shape-circle').onclick = () => { logoState.shape = 'circle'; refreshLogoDialog(); };
        document.getElementById('logo-save-btn').onclick = saveLogo;
        document.getElementById('logo-cancel-btn').onclick = () => toggleOverlay('logo-overlay', false);
        document.getElementById('logo-overlay').addEventListener('mousedown', (e) => {
            if (e.target === document.getElementById('logo-overlay')) toggleOverlay('logo-overlay', false);
        });
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('logo-overlay').classList.contains('hidden')) return;
            if (e.key === 'Escape') toggleOverlay('logo-overlay', false);
        });
    }

    function loadLogoSetting() {
        fetch('/api/logo').then(r => r.json()).then(logo => {
            if (logo && typeof logo === 'object') {
                logoState = {
                    preset: LOGO_PRESETS[logo.preset] ? logo.preset : 'star',
                    color: LOGO_GRADIENTS[logo.color] ? logo.color : 'purple',
                    url: typeof logo.url === 'string' ? logo.url : '',
                    shape: logo.shape === 'circle' ? 'circle' : 'square',
                    name: typeof logo.name === 'string' ? logo.name.trim() : ''
                };
            }
            renderLogo();
        }).catch(() => renderLogo());
    }

    function closeDetailPopup() {
        toggleOverlay('detail-overlay', false);
    }

    function openDetailLink() {
        if (!currentDetailLink) return;
        const target = safeUrl(currentDetailLink.url);
        if (target) window.open(target, '_blank', 'noopener,noreferrer');
    }

    /* No Close button (v33): the dimmed overlay and Escape already close.
       The Open Link button lives in the header row on desktop, and as a
       full-width button at the bottom of the sheet on mobile. */
    document.getElementById('detail-open-btn').onclick = openDetailLink;
    document.getElementById('detail-open-btn-mobile').onclick = openDetailLink;
    document.getElementById('detail-overlay').addEventListener('mousedown', (e) => {
        if (e.target === document.getElementById('detail-overlay')) closeDetailPopup();
    });
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('detail-overlay').classList.contains('hidden')) return;
        if (e.key === 'Escape') closeDetailPopup();
        else if (e.key === 'Enter') openDetailLink();
    });

    document.getElementById('password-confirm-btn').onclick = async () => {
         const pwd = document.getElementById('password-input').value;
         if(!pwd) return;
         try {
             const res = await fetch('/api/login', {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify({password: pwd})
             });
             const data = await res.json();
             if(data.valid) {
                 localStorage.setItem('authToken', data.token);
                 isLoggedIn = true;
                 document.getElementById('password-input').value = '';
                 toggleOverlay('password-dialog-overlay', false);
                 await loadLinks();
                 await customAlert('Login successful');
             } else if (res.status === 429 && data.locked) {
                 await customAlertRateLimit(data.retryAfter || 900);
             } else {
                 var remMsg = T('Incorrect password');
                 var remaining = typeof data.remaining === 'number' ? data.remaining : 0;
                 if (remaining > 0) remMsg = T('Incorrect password, ') + remaining + T(' attempt(s) remaining');
                 await customAlert(remMsg);
             }
         } catch(e) { await customAlert('Login Error'); }
    }

    // Single-flight refresh lock —— concurrent 401s trigger only one /api/refreshToken call
    let _refreshing = null;
    async function refreshOnce() {
        if (_refreshing) return _refreshing;
        _refreshing = (async () => {
            // Three outcomes: a new token; null = the server explicitly rejected
            // the refresh token (truly expired / revoked); a throw = network error
            // or 5xx (the session may still be fine, so callers must not log out).
            const r = await fetch('/api/refreshToken', { method: 'POST', credentials: 'include' });
            if (r.status === 401 || r.status === 400) return null;
            if (!r.ok) throw new Error('REFRESH_UNAVAILABLE');
            const data = await r.json();
            return data && data.accessToken ? data.accessToken : null;
        })();
        try { return await _refreshing; }
        finally { _refreshing = null; }
    }

    async function fetchWithAuth(url, options = {}) {
        const token = localStorage.getItem('authToken');
        const headers = { ...(options.headers || {}) };
        // Don't append "Authorization: null" when there's no token
        if (token) headers.Authorization = token;
        options.headers = headers;

        let res = await fetch(url, options);

        if (res.status === 401 && token) {
            // A refresh or retry that fails on the network / 5xx simply throws to
            // the caller (the token is kept; the session is probably still valid).
            const fresh = await refreshOnce();
            if (fresh) {
                localStorage.setItem('authToken', fresh);
                headers.Authorization = fresh;
                options.headers = headers;
                res = await fetch(url, options);
            } else {
                // Server explicitly rejected the refresh token: really expired.
                localStorage.removeItem('authToken');
                isLoggedIn = false;
                updateUIState();
                renderCategories();
                document.getElementById('password-input').value = '';
                await customAlert('Your session has expired, please log in again');
                throw new Error('Unauthorized');
            }
        }

        return res;
    };

    document.getElementById('password-cancel-btn').onclick = () => {
         toggleOverlay('password-dialog-overlay', false);
    };

    function showCategoryDialog(title, defaultVal = '') {
        return new Promise(resolve => {
            toggleOverlay('category-dialog', true);
            document.getElementById('category-dialog-title').innerText = T(title);
            const input = document.getElementById('category-name-input');
            input.value = defaultVal;
            input.focus();

            const close = (val) => {
                toggleOverlay('category-dialog', false);
                document.getElementById('category-confirm-btn').onclick = null;
                document.getElementById('category-cancel-btn').onclick = null;
                resolve(val);
            };

            document.getElementById('category-confirm-btn').onclick = () => close(input.value.trim());
            document.getElementById('category-cancel-btn').onclick = () => close(null);
        });
    }

    function customConfirm(msg) {
        return new Promise(resolve => {
            toggleOverlay('custom-confirm-overlay', true);
            document.getElementById('custom-confirm-message').innerText = T(msg);

            const close = (val) => {
                toggleOverlay('custom-confirm-overlay', false);
                document.getElementById('custom-confirm-ok').onclick = null;
                document.getElementById('custom-confirm-cancel').onclick = null;
                resolve(val);
            };
            document.getElementById('custom-confirm-ok').onclick = () => close(true);
            document.getElementById('custom-confirm-cancel').onclick = () => close(false);
        });
    }

    function customAlert(msg) {
        return new Promise(resolve => {
             toggleOverlay('custom-alert-overlay', true);
             document.getElementById('custom-alert-content').innerText = T(msg);
             document.getElementById('custom-alert-confirm').onclick = () => {
                 toggleOverlay('custom-alert-overlay', false);
                 resolve();
             }
        });
    }

    function customAlertRateLimit(seconds) {
        return new Promise(resolve => {
            const content = document.getElementById('custom-alert-content');
            toggleOverlay('custom-alert-overlay', true);
            const timer = setInterval(() => {
                if (seconds > 0) {
                    content.innerText = T('Login is locked, please try again in ') + seconds + T('s before trying again');
                    seconds--;
                } else {
                    clearInterval(timer);
                    content.innerText = T('Lockout period has ended, you can try logging in again');
                }
            }, 1000);
            document.getElementById('custom-alert-confirm').onclick = () => {
                clearInterval(timer);
                toggleOverlay('custom-alert-overlay', false);
                resolve();
            }
        });
    }

    function setupTooltipDelegation() {
        const tooltip = document.getElementById('custom-tooltip');
        let activeTarget = null;

        document.body.addEventListener('mousemove', (e) => {
            const target = e.target.closest('.has-tooltip');

            if (target) {
                const text = target.getAttribute('data-tooltip');
                if (text) {
                    activeTarget = target;
                    showTooltip(e, text, target);
                } else {
                    hideTooltip();
                }
            } else {
                if (activeTarget) {
                    hideTooltip();
                    activeTarget = null;
                }
            }
        });

        window.addEventListener('scroll', hideTooltip, { passive: true });
    }

    let zoomProbe = null;
    function getZoom() {
        // Under html { zoom: N }, getBoundingClientRect() reports zoomed visual
        // px while clientX / innerWidth report unzoomed px. A 100px fixed probe
        // measures the effective zoom factor, so every coordinate can be
        // converted to zoomed CSS px (the space the tooltip is positioned in).
        if (!zoomProbe) {
            zoomProbe = document.createElement('div');
            zoomProbe.style.cssText = 'position:fixed;top:0;left:0;width:100px;height:0;pointer-events:none;z-index:-1';
            document.body.appendChild(zoomProbe);
        }
        const z = zoomProbe.getBoundingClientRect().width / 100;
        return z > 1 ? z : 1;
    }

    function showTooltip(e, text, target) {
        const tooltip = document.getElementById('custom-tooltip');
        tooltip.textContent = text;
        tooltip.classList.remove('hidden');

        const z = getZoom();
        // 14 CSS px is too close under zoom: the pointer hotspot sits on the
        // tooltip's top lines. 30 CSS px (≈40 visual px at zoom 1.35) keeps
        // the pointer clear of the text.
        const offset = 30;
        const margin = 8;
        // Pointer coords are unzoomed visual px; the tooltip lives in zoomed
        // CSS px space, so divide by the zoom factor.
        const cssX = e.clientX / z;
        const cssY = e.clientY / z;

        const tooltipRect = tooltip.getBoundingClientRect();
        const cssW = tooltipRect.width / z;
        const cssH = tooltipRect.height / z;
        const viewW = window.innerWidth / z;
        const viewH = window.innerHeight / z;

        // Default: directly below the pointer, horizontally centered on it.
        let left = cssX - cssW / 2;
        let top = cssY + offset;

        // Near the right edge: whole box below-left of the pointer;
        // near the left edge: below-right of the pointer.
        if (left + cssW > viewW - margin) left = cssX - cssW - offset;
        if (left < margin) left = cssX + offset;
        // Near the bottom edge: flip above the pointer.
        if (top + cssH > viewH - margin) top = cssY - cssH - offset;
        if (top < margin) top = margin;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function hideTooltip() {
        const tooltip = document.getElementById('custom-tooltip');
        if (tooltip && !tooltip.classList.contains('hidden')) {
            tooltip.classList.add('hidden');
        }
    }


    async function validateTokenOrRedirect() {
        const valid = await validateToken();
        if (valid === null) {
            // Could not reach the server: do NOT log out (logout revokes every session)
            await customAlert('Network unavailable, please try again later');
            return false;
        }
        if(!valid) {
            logout();
            await customAlert('Your login credentials have expired, please log in again');
            return false;
        }
        return true;
    }

    // true = valid; false = the server says invalid / expired; null = could not
    // tell (network error or 5xx). Callers must not log out on null.
    async function validateToken() {
        const t = localStorage.getItem('authToken');
        if(!t) return false;
        try {
            const r = await fetchWithAuth('/api/validateToken');
            if (r.status === 200) return true;
            if (r.status === 401 || r.status === 403) return false;
            return null;
        } catch(e) { return (e && e.message === 'Unauthorized') ? false : null; }
    }

    function logout() {
        // Logging out also notifies the server to revoke the generation and clears the HttpOnly refresh cookie
        const t = localStorage.getItem('authToken');
        const clean = () => { localStorage.removeItem('authToken'); isLoggedIn = false; isEditMode = false; location.reload(); };
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: t ? { 'Authorization': t } : {}
        }).finally(clean);
    }

    async function exportData() {
        if(!await validateTokenOrRedirect()) return;
        if(!await customConfirm("Export data?")) return;

        try {
            const res = await fetchWithAuth("/api/exportData", {
                method: "POST"
            });

            if (res.status === 401) {
                logout();
                await customAlert('Your login credentials have expired, please log in again');
                return;
            }

            if (!res.ok) throw new Error("Export failed");
            const data = await res.json();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "nav_export_" + new Date().toISOString().split("T")[0] + ".json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch(e) {
            if(e.message !== 'Unauthorized') await customAlert("Export failed");
        }
    }

    // Parse Netscape bookmark HTML exported by Chrome / Edge
    function parseBookmarks(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const categories = {};

        // Clean bookmark titles: split on separators (|, colon : or ：, or -/–/— with optional surrounding spaces)
        function cleanTitle(title) {
            const raw = (title || '').trim();

            if (!raw) {
                return { name: '', tips: '' };
            }

            // 1. Check whether it starts with http:// or https:// (the whole thing is a URL)
            if (/^https?:\\/\\//i.test(raw)) {
                try {
                    const urlObj = new URL(raw);
                    const name = (urlObj.hostname + urlObj.pathname).replace(/\\/$/, '');
                    return { name: name || raw, tips: raw };
                } catch (e) {
                    return { name: raw, tips: raw };
                }
            }

            // 2. Split a normal text title
            const sep = /[|:：]|\\s+[-–—]\\s+/;

            const idx = raw.search(sep);
            if (idx === -1) {
                return { name: raw.slice(0, 120), tips: raw.slice(0, 500) };
            }

            const name = raw.slice(0, idx).trim();
            const tips = raw.slice(idx).replace(/^[\\s|:：–—-]+/, '').trim();

            return {
                // Clamp to the server caps (MAX_NAME 120): one overlong
                // bookmark title must not reject the entire import.
                name: (name || raw).slice(0, 120),
                tips: (tips || raw).slice(0, 500)
            };
        }

        function getLinks(dl) {
            const links = [];
            const dts = Array.from(dl.children).filter(e => e && e.tagName === 'DT');
            for (const dt of dts) {
                const a = dt.querySelector(':scope > a');
                if (!a) continue;
                const url = (a.getAttribute('href') || '').trim();
                if (!url) continue;
                if (/^(javascript:|vbscript:|data:|chrome:|edge:|about:|magnet:)/i.test(url)) continue;
                const clean = cleanTitle(a.textContent);
                links.push({ name: clean.name, url, tips: clean.tips, icon: '', category: null, group: '', isPrivate: false });
            }
            return links;
        }

        // Recursively process a folder: subfolders become separate categories; direct links in the current folder go into the current category
        function processFolder(dl, catName) {
            const folderDts = Array.from(dl.children).filter(e => e && e.tagName === 'DT' && e.querySelector(':scope > dl'));
            for (const dt of folderDts) {
                const h3 = dt.querySelector(':scope > h3');
                const childDl = dt.querySelector(':scope > dl');
                const subName = h3 ? h3.textContent.trim() : 'Uncategorized';
                processFolder(childDl, subName);
            }
            const links = getLinks(dl);
            if (catName && links.length) {
                if (!categories[catName]) categories[catName] = { isHidden: false, links: [] };
                links.forEach(l => { l.category = catName; categories[catName].links.push(l); });
            }
        }

        const rootDl = doc.querySelector('dl');
        if (!rootDl) return null;

        const rootDts = Array.from(rootDl.children).filter(e => e && e.tagName === 'DT');
        for (const dt of rootDts) {
            const childDl = dt.querySelector(':scope > dl');
            const h3 = dt.querySelector(':scope > h3');
            if (childDl && h3) {
                processFolder(childDl, h3.textContent.trim());
            } else {
                const a = dt.querySelector(':scope > a');
                if (!a) continue;
                const url = (a.getAttribute('href') || '').trim();
                if (!url || /^(javascript:|vbscript:|data:|chrome:|edge:|about:|magnet:)/i.test(url)) continue;
                const clean = cleanTitle(a.textContent);
                if (!categories['Uncategorized']) categories['Uncategorized'] = { isHidden: false, links: [] };
                categories['Uncategorized'].links.push({ name: clean.name, url, tips: clean.tips, icon: '', category: 'Uncategorized', group: '', isPrivate: false });
            }
        }

        return Object.keys(categories).length ? { categories } : null;
    }

    async function importData() {
        if(!await validateTokenOrRedirect()) return;
        if(!await customConfirm("Import data?This will overwrite existing data!")) return;

        const fileInput = document.getElementById('import-file-input');
        fileInput.value = '';

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const content = event.target.result;
                        const trimmed = content.trimStart();
                        let data;
                        if (trimmed.startsWith('<!DOCTYPE') || /<(DL|H3)\\b/i.test(trimmed)) {
                            // Chrome / Edge bookmark HTML
                            data = parseBookmarks(content);
                            if (!data) throw new Error("No valid bookmarks found");
                        } else {
                            // JSON config exported by this project
                            data = JSON.parse(content);
                            if (typeof data !== 'object' || data === null) throw new Error("Invalid JSON");
                        }
                        const res = await fetchWithAuth("/api/importData", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        });
                        if (res.status === 401) {
                            logout();
                            await customAlert('Your login credentials have expired, please log in again');
                            return;
                        }
                        if (!res.ok) {
                            let detail = '';
                            try { const j = await res.json(); detail = j.detail || j.error || ''; } catch {}
                            throw new Error(detail ? 'Import failed: ' + detail : 'Import failed');
                        }
                        await customAlert('Data imported successfully!');
                        location.reload();
                    } catch (error) {
                        console.error("Failed to parse file:", error);
                        await customAlert(error && error.message ? error.message : 'Invalid file format, please check the file content!');
                    }
                };
                reader.readAsText(file);
            } catch (error) {
                console.error("Import failed:", error);
                await customAlert('Data import failed, please try again!');
            }
        };
        fileInput.click();
    }

    </script>
</body>
</html>
`;

// Default config values
let DEFAULT_USER = 'testUser';
let ICON_API = 'https://xinac.net/icon/?url=';
let PREFER_ICON_API = true;

let _configResolved = false;
function resolveConfig(env) {
    // Env is constant per deployment; resolving once avoids mutating shared
    // module state on every request in a reused isolate.
    if (_configResolved) return;
    _configResolved = true;
    if (env.DEFAULT_USER) DEFAULT_USER = env.DEFAULT_USER;
    if (env.ICON_API) ICON_API = env.ICON_API;
    if (env.PREFER_ICON_API !== undefined) PREFER_ICON_API = env.PREFER_ICON_API === 'true';
}

// Byte-based base64url: btoa() throws on non-ASCII input, and spreading a
// large array into fromCharCode() can overflow the stack, so encode in chunks.
function base64UrlEncodeBytes(bytes) {
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncode(str) {
    return base64UrlEncodeBytes(new TextEncoder().encode(str));
}

function base64UrlEncodeUint8(arr) {
    return base64UrlEncodeBytes(arr instanceof Uint8Array ? arr : new Uint8Array(arr));
}

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

async function createJWT(payload, secret) {
    const encoder = new TextEncoder();
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
    const toSign = encoder.encode(`${headerEncoded}.${payloadEncoded}`);

    const key = await crypto.subtle.importKey(
        'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, toSign);
    const signatureEncoded = base64UrlEncodeUint8(new Uint8Array(signature));

    return `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;
}

async function validateJWT(token, secret) {
    try {
        const encoder = new TextEncoder();
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [headerEncoded, payloadEncoded, signature] = parts;
        const data = encoder.encode(`${headerEncoded}.${payloadEncoded}`);

        const key = await crypto.subtle.importKey(
            'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        );

        const expectedSigBuffer = await crypto.subtle.sign('HMAC', key, data);
        const expectedSig = base64UrlEncodeUint8(new Uint8Array(expectedSigBuffer));

        if (!(await timingSafeStringEqual(signature, expectedSig))) return null;

        const payloadStr = base64UrlDecode(payloadEncoded);
        return JSON.parse(payloadStr);
    } catch (e) {
        return null;
    }
}

let _tseKey = null;
async function timingSafeStringEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    if (!_tseKey) {
        _tseKey = await crypto.subtle.importKey(
            'raw', new TextEncoder().encode('cfile-tse-fixed-key-v1'),
            { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        );
    }
    const [ha, hb] = await Promise.all([
        crypto.subtle.sign('HMAC', _tseKey, new TextEncoder().encode(a)),
        crypto.subtle.sign('HMAC', _tseKey, new TextEncoder().encode(b)),
    ]);
    const ua = new Uint8Array(ha);
    const ub = new Uint8Array(hb);
    if (ua.length !== ub.length) return false;
    let diff = 0;
    for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i];
    return diff === 0;
}

function parseCookie(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach(cookie => {
        // Split on the FIRST '=' only: values (e.g. base64) may contain '='.
        const eq = cookie.indexOf('=');
        if (eq === -1) return;
        const name = cookie.slice(0, eq).trim();
        const value = cookie.slice(eq + 1).trim();
        if (!name) return;
        try { cookies[name] = decodeURIComponent(value); }
        catch { cookies[name] = value; }
    });
    return cookies;
}

async function validateServerToken(authHeader, env) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { isValid: false, status: 401, response: { error: 'Unauthorized', message: 'Not logged in' } };
    }
    const token = authHeader.slice(7);

    const payload = await validateJWT(token, env.JWT_SECRET);

    if (!payload) {
        return { isValid: false, status: 401, response: { error: 'Invalid', message: 'Invalid token' } };
    }

    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
        return { isValid: false, status: 401, response: { error: 'Expired', message: 'Token expired' } };
    }

    if (payload.type !== 'access') {
        return { isValid: false, status: 403, response: { error: 'Forbidden', message: 'Wrong token type' } };
    }

    const gen = await currentKeyGen(env);

    if (!gen) {
        return { isValid: false, status: 503, response: { error: 'Service Unavailable', message: 'KV unavailable, try again later' } };
    }

    if (!payload.kid || payload.kid !== gen) {
        return { isValid: false, status: 401, response: { error: 'Revoked', message: 'Session invalid, please log in again' } };
    }

    return { isValid: true, payload };
}

let _genCache = { value: null, expireAt: 0 };
async function currentKeyGen(env) {
    const now = Date.now();
    if (_genCache.value !== null && _genCache.expireAt > now) return _genCache.value;
    let v = null;
    try { v = await env.CARD_ORDER.get('__keygen__', 'text'); }
    catch (e) {
        // Fail closed on KV read failure: fabricating '1' and caching it for
        // 60s made login mint tokens with a fake kid, and bumpKeyGen would
        // increment FROM that fake value, losing the real generation.
        console.warn('keygen read failed', e);
        return null;
    }
    _genCache = { value: (v || '1'), expireAt: now + 60_000 };
    return _genCache.value;
}
async function bumpKeyGen(env) {
    try {
        const cur = await currentKeyGen(env);
        if (!cur) return null;
        const gen = String(Number(cur) + 1);
        _genCache = { value: gen, expireAt: Date.now() + 60_000 };
        await env.CARD_ORDER.put('__keygen__', gen);
        return gen;
    } catch (e) {
        console.warn('keygen bump failed', e);
        return null;
    }
}

// Node-based verification harnesses (verify.mjs, test suites) have no caches
// global; under Workers globalThis.caches exists and the real default cache is
// used. The stub keeps module load side-effect-free under Node.
const CACHE = globalThis.caches ? globalThis.caches.default
    : { open: async () => ({ match: async () => null }), match: async () => undefined, put: async () => {} };
let _revCache = { value: null, expireAt: 0 };

async function getDataRev(env) {
    const now = Date.now();
    if (_revCache.value !== null && _revCache.expireAt > now) return _revCache.value;
    let rev = '0';
    try {
        rev = (await env.CARD_ORDER.get('__rev__', 'text')) || '0';
    } catch (e) {
        // Do NOT cache a fabricated rev: caching it would let every request
        // in the next 60s share the fake key and serve the same stale body.
        console.warn('rev read failed:', e);
        return rev;
    }
    _revCache = { value: rev, expireAt: now + 60_000 };
    return rev;
}

async function bumpRev(env) {
    const rev = String(Date.now());
    _revCache = { value: rev, expireAt: Date.now() + 60_000 };
    try { await env.CARD_ORDER.put('__rev__', rev); return rev; }
    catch (e) { console.warn('rev bump failed', e); return rev; }
}

function cacheKeyFor(url, rev, scope) {
    const k = new URL(url);
    k.searchParams.set('__v', rev);        // Version invalidation dimension
    k.searchParams.set('__s', scope);      // Auth dimension
    return new Request(k.toString(), { method: 'GET' });
}

function ctxSafePut(key, res, ctx) {
    try {
        const p = CACHE.put(key, res).catch(e => console.warn('cache put failed', e));
        if (ctx && ctx.waitUntil) ctx.waitUntil(p); // un-awaited puts can be cancelled once the response is sent
    } catch (e) { console.warn('cache put failed', e); }
}

async function sendCached(body, request, cacheKey, cacheable, extraHeaders = {}, ctx = null) {
    const headers = {
        'Content-Type': 'application/json',
        ...extraHeaders,
        // Response headers are always no-store: avoids CDN/browsers caching public data by the bare URL; otherwise, after logging in, requests carrying
        // an Authorization header to the same URL would hit this anonymous cache and get filtered data, polluting the authenticated state
        'Cache-Control': 'no-store',
        'Vary': 'Accept-Encoding' + (extraHeaders.Vary ? ', ' + extraHeaders.Vary : ''),
    };
    const res = new Response(body, { status: 200, headers });
    if (cacheable) {
        // Store a cacheable copy in the edge cache. The client response is
        // no-store on purpose (login pollution), but storing THAT means the
        // cache never keeps anything: store headers must allow caching.
        // CORS headers are per-request: never store them in the shared copy.
        const storeExtra = {};
        for (const k of Object.keys(extraHeaders)) {
            if (!/^(access-control-|vary$)/i.test(k)) storeExtra[k] = extraHeaders[k];
        }
        const storeHeaders = {
            'Content-Type': 'application/json',
            ...storeExtra,
            'Cache-Control': 'public, max-age=60, s-maxage=60',
            'Vary': 'Accept-Encoding',
        };
        ctxSafePut(cacheKey, new Response(body, { status: 200, headers: storeHeaders }), ctx);
    }
    return res;
}

let _htmlMeta = null;
async function htmlMeta() {
    if (_htmlMeta) return _htmlMeta;
    const buf = await new Response(HTML_CONTENT).arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const etag = '"' + base64UrlEncodeUint8(new Uint8Array(digest)).slice(0, 32) + '"';
    _htmlMeta = { etag, body: HTML_CONTENT };
    return _htmlMeta;
}

function normalizeCategories(categories) {
    for (const key in categories) {
        if (Array.isArray(categories[key])) {
            categories[key] = { isHidden: false, links: categories[key] };
        }
    }
    return categories;
}

async function readLinksKv(env) {
    let dataStr = null;
    try {
        dataStr = await env.CARD_ORDER.get(DEFAULT_USER);
    } catch (e) {
        // Fail loudly: a KV outage or a deleted namespace must surface as a
        // 500, never as an empty nav page that a later save could overwrite.
        console.error('KV read failed:', e);
        return { ok: false, error: 'KV_READ_FAILED' };
    }
    const parsed = safeJsonParse(dataStr, null);
    if (!parsed.data) {
        // Stored JSON is unparseable: serving EMPTY_DATA here would show an
        // empty page, mark the site writable, and let the empty-overwrite
        // guard be satisfied with 0 > 0 — the repair path needs data to back
        // up. Surface it as a KV failure instead (500, not cacheable).
        console.error('Stored data JSON parse failed');
        return { ok: false, error: 'KV_READ_FAILED' };
    }
    const data = parsed.data;
    data.categories = normalizeCategories(data.categories || {});
    return { ok: true, data };
}

// Total link count across all categories (array- and object-form safe).
function countLinks(categories) {
    let n = 0;
    for (const name of Object.keys(categories || {})) {
        const cat = categories[name];
        const links = Array.isArray(cat) ? cat : (cat && cat.links);
        if (Array.isArray(links)) n += links.length;
    }
    return n;
}

function filterPublic(categories) {
    const out = {};
    for (const name in categories) {
        const cat = categories[name];
        if (cat && cat.isHidden) continue;
        const publicLinks = (cat && Array.isArray(cat.links) ? cat.links : []).filter(l => !l.isPrivate);
        if (publicLinks.length > 0) out[name] = { ...(cat || {}), links: publicLinks };
    }
    return out;
}

function corsHeaders(request, env) {
    const list = env && env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',').filter(Boolean) : [];
    const origin = request ? request.headers.get('Origin') : null;
    if (!origin || !list.includes(origin)) return {};
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Vary': 'Origin',
    };
}

const FETCH_ICON_MAX_HTML = 1 * 1024 * 1024;
async function fetchBestIcon(targetUrl) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    };

    let u;
    try { u = new URL(targetUrl); } catch { console.warn('icon local: bad url'); return null; }
    if (!ICON_SCHEME_OK.has(u.protocol) || HOST_DENY.test(u.hostname)) {
        console.warn('icon local: blocked', u.hostname);
        return null;
    }

    const scoreCandidate = (c) =>
        (c.apple ? 2 : 0) +
        (c.size >= 180 ? 3 : c.size >= 96 ? 2 : c.size > 0 ? 1 : 0) +
        (/^image\/(png|jpeg|svg\+xml)$/.test(c.type) ? 1 : 0);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    try {
        // Manual redirects: re-check every hop against the denylist, same
        // SSRF rule as safeFetchIcon.
        const fetchOpts = {
            headers: headers,
            redirect: 'manual',
            signal: ctrl.signal
        };
        let response = await fetch(targetUrl, fetchOpts);
        let hops = 0;
        while (response.status >= 300 && response.status < 400 && hops < 5) {
            const loc = response.headers.get('location');
            if (!loc) return null;
            let next;
            try { next = new URL(loc, targetUrl); } catch { return null; }
            if (!ICON_SCHEME_OK.has(next.protocol) || HOST_DENY.test(next.hostname)) return null;
            targetUrl = next.toString();
            hops++;
            response = await fetch(targetUrl, fetchOpts);
        }
        if (!response.ok) return null;

        const candidates = [];
        const seen = new Set();
        let headDone = false;
        const rewriter = new HTMLRewriter()
            .on('link', {
                element(e) {
                    const words = (e.getAttribute('rel') || '').toLowerCase().split(/\s+/);
                    const apple = words.includes('apple-touch-icon');
                    if (!apple && !words.includes('icon')) return;
                    const h = e.getAttribute('href');
                    if (!h) return;
                    let abs;
                    try { abs = new URL(h, targetUrl).toString(); } catch { return; }
                    if (seen.has(abs)) return;
                    seen.add(abs);
                    let size = 0;
                    for (const m of (e.getAttribute('sizes') || '').matchAll(/(\d+)x(\d+)/g)) {
                        size = Math.max(size, Number(m[1]), Number(m[2]));
                    }
                    candidates.push({ url: abs, apple, size, type: (e.getAttribute('type') || '').toLowerCase() });
                },
            })
            .on('head', {
                element(e) { e.onEndTag(() => { headDone = true; }); },
            });

        const reader = rewriter.transform(response).body.getReader();
        let total = 0;
        try {
            for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                total += value ? value.byteLength : 0;
                if (headDone || total > FETCH_ICON_MAX_HTML) break;
            }
        } catch {
        } finally {
            try { await reader.cancel(); } catch { }
            clearTimeout(timer);
        }

        candidates.sort((a, b) => scoreCandidate(b) - scoreCandidate(a));
        const urls = [];
        const pushUrl = (x) => { if (!urls.includes(x)) urls.push(x); };
        candidates.slice(0, 3).forEach((c) => pushUrl(c.url));
        pushUrl(new URL('/apple-touch-icon.png', targetUrl).toString());
        pushUrl(new URL('/favicon.svg', targetUrl).toString());
        pushUrl(new URL('/favicon.ico', targetUrl).toString());
        const deadline = Date.now() + 4000;
        for (const u of urls) {
            const ms = Math.min(1500, deadline - Date.now());
            if (ms <= 0) break;
            const res = await safeFetchIcon(u, ms, true);
            if (res) return res;
        }
        return null;
    } catch (e) {
        // console.warn('icon local failed', e && e.message);
        return null;
    } finally {
        clearTimeout(timer);
    }
}

const ICON_SCHEME_OK = new Set(['http:', 'https:']);
// Exact-match host check (the old regex also hit public hosts such as
// 10.com or localhostfoo.com and missed 100.64/10, fc00::/7, fe80::/10).
const HOST_DENY = {
    test(host) {
        const h = String(host || '').toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
        if (!h) return true;
        if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
        const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
        if (m) {
            const a = +m[1], b = +m[2];
            return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) ||
                (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
                (a === 100 && b >= 64 && b <= 127) || a >= 224;
        }
        if (h.includes(':')) {
            return h === '::' || h === '::1' || h.startsWith('fc') || h.startsWith('fd') ||
                h.startsWith('fe8') || h.startsWith('fe9') || h.startsWith('fea') || h.startsWith('feb') ||
                h.startsWith('::ffff:');
        }
        return false;
    }
};
// Only bitmaps are accepted; HTML/SVG/XML are never allowed through. SVG is only allowed for "trusted image hosts" (see allowSvg in safeFetchIcon)
const ICON_CT_OK = /^image\/(png|jpeg|gif|webp|ico|x-icon|vnd\.microsoft\.icon|avif|bmp)/i;

// Icon centering: favicon PNGs ship with asymmetric transparent margins, so the
// glyph looks off-center inside the white tile. Decode the PNG, find the visible
// glyph bounding box, re-pad it into a square canvas centered on the glyph.
// Padding guarantees 4px transparent margin per side, so full-bleed glyphs get a
// white ring inside the tile and never look edge-clipped.
// Only 8-bit non-interlaced PNG is decoded; everything else passes through untouched.
const CRC_TABLE = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        t[n] = c;
    }
    return t;
})();
async function streamBytes(stream) {
    const reader = stream.getReader();
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    let total = 0;
    for (const c of chunks) total += c.length;
    const out = new Uint8Array(total);
    let pos = 0;
    for (const c of chunks) { out.set(c, pos); pos += c.length; }
    return out;
}

function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
    const out = new Uint8Array(12 + data.length);
    const dv = new DataView(out.buffer);
    dv.setUint32(0, data.length);
    for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    out.set(data, 8);
    dv.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
    return out;
}
async function pngEncode(w, h, rgba) {
    const rows = new Uint8Array(h * (1 + w * 4));
    for (let y = 0; y < h; y++) {
        const rowStart = y * (1 + w * 4);
        rows[rowStart] = 0; // filter 0
        rows.set(rgba.subarray(y * w * 4, (y + 1) * w * 4), rowStart + 1);
    }
    const compressed = await streamBytes(new Response(new Blob([rows])).body
        .pipeThrough(new CompressionStream('deflate')));
    const ihdr = new Uint8Array(13);
    const dv = new DataView(ihdr.buffer);
    dv.setUint32(0, w);
    dv.setUint32(4, h);
    ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
    const parts = [
        new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        pngChunk('IHDR', ihdr),
        pngChunk('IDAT', compressed),
        pngChunk('IEND', new Uint8Array(0)),
    ];
    let total = 0;
    for (const p of parts) total += p.length;
    const out = new Uint8Array(total);
    let pos = 0;
    for (const p of parts) { out.set(p, pos); pos += p.length; }
    return out;
}
// No pixel peeling: peeling white backgrounds off pixels is what produced
// jagged, cut-out edges. Pixels are never modified.
// White plates are handled by rejection instead: centerIconPNG runs a center
// census, and any icon whose center is a white plate (snapshot tiles, opaque
// apple-touch squares, palette favicons with no tRNS) is refused, so the next
// transparent source gets a chance. Original bytes are served untouched, so
// transparent sources keep their alpha exactly as the site shipped them.
// Snapshot tiles (Google s2, DuckDuckGo) are full-canvas white rect SVGs.
// stripWhiteSvg drops the white rect so the glyph floats on the tile
// background instead of showing a white plate. Gradient-filled rects (colored
// tiles, our own logo) are left alone. Returns null when nothing is left.
function stripWhiteSvg(text) {
    if (text.length > 12000) return null;
    const stripped = text.replace(/<rect[^>]*fill\s*=\s*["'](?:white|#ffffff|#fff|#f8f8f8)["'][^>]*\/?>\s*/gi, '')
        .replace(/<rect[^>]*style\s*=\s*["'][^"']*\bfill\s*:\s*(?:white|#ffffff|#fff|#f8f8f8)[^"']*["'][^>]*\/?>\s*/gi, '');
    if (stripped.includes('<path') || stripped.includes('<circle') || stripped.includes('<polyline') || stripped.includes('<polygon')) return stripped;
    return null;
}


async function centerIconPNG(bytes) {
    try {
        const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
        if (!bytes || bytes.length < 24) return { out: null, opaque: false };
        for (let i = 0; i < 8; i++) if (bytes[i] !== sig[i]) return { out: null, opaque: false };
        const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        let w = 0, h = 0, bitDepth = 0, colorType = 0, interlace = 0;
        let plte = null, trns = null;
        const idatParts = [];
        let pos = 8;
        while (pos + 12 <= bytes.length) {
            const len = dv.getUint32(pos);
            const type = String.fromCharCode(bytes[pos + 4], bytes[pos + 5], bytes[pos + 6], bytes[pos + 7]);
            const dataStart = pos + 8;
            if (len < 0 || dataStart + len > bytes.length) return { out: null, opaque: false };
            if (type === 'IHDR') {
                w = dv.getUint32(dataStart);
                h = dv.getUint32(dataStart + 4);
                bitDepth = bytes[dataStart + 8];
                colorType = bytes[dataStart + 9];
                interlace = bytes[dataStart + 12];
            } else if (type === 'PLTE') { plte = bytes.subarray(dataStart, dataStart + len); }
            else if (type === 'tRNS') { trns = bytes.subarray(dataStart, dataStart + len); }
            else if (type === 'IDAT') { idatParts.push(bytes.subarray(dataStart, dataStart + len)); }
            else if (type === 'IEND') break;
            pos += 12 + len;
        }
        if (bitDepth !== 8 || interlace !== 0) return { out: null, opaque: false };
        const chIn = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : colorType === 3 ? 1 : 0;
        if (!chIn) return { out: null, opaque: false };
        // Small canvases pass through untouched: cropping + re-padding a small
        // source would shrink the canvas below its own resolution, and the tile
        // upscale from a shrunken canvas blurs the icon. Census is for big
        // canvases, where white plates actually show up.
        if (w < 48 || h < 48 || w * h > 512 * 512) return { out: null, opaque: false };
        if (colorType === 3 && !trns) return { out: null, opaque: true }; // palette with no tRNS: fully opaque white plate -> refuse
        const raw = await streamBytes(new Response(new Blob(idatParts.map(p => p.slice()))).body
            .pipeThrough(new DecompressionStream('deflate')));
        const stride = w * chIn;
        if (raw.length < h * (stride + 1)) return { out: null, opaque: false };
        const rowsData = new Uint8Array(h * stride);
        const bpp = chIn;
        for (let y = 0; y < h; y++) {
            const f = raw[y * (stride + 1)];
            const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
            const cur = rowsData.subarray(y * stride, (y + 1) * stride);
            const prev = y > 0 ? rowsData.subarray((y - 1) * stride, y * stride) : null;
            for (let x = 0; x < stride; x++) {
                let v = line[x];
                if (f === 1) { if (x >= bpp) v = (v + cur[x - bpp]) & 0xff; }
                else if (f === 2) { if (prev) v = (v + prev[x]) & 0xff; }
                else if (f === 3) {
                    const a = x >= bpp ? cur[x - bpp] : 0;
                    const b = prev ? prev[x] : 0;
                    v = (v + ((a + b) >> 1)) & 0xff;
                } else if (f === 4) {
                    const a = x >= bpp ? cur[x - bpp] : 0;
                    const b = prev ? prev[x] : 0;
                    const c = (x >= bpp && prev) ? prev[x - bpp] : 0;
                    const p = a + b - c;
                    const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
                    const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
                    v = (v + pr) & 0xff;
                }
                cur[x] = v;
            }
        }
        const rgba = new Uint8Array(w * h * 4);
        for (let i = 0; i < w * h; i++) {
            const o = i * chIn, d = i * 4;
            if (colorType === 6) {
                rgba[d] = rowsData[o]; rgba[d + 1] = rowsData[o + 1];
                rgba[d + 2] = rowsData[o + 2]; rgba[d + 3] = rowsData[o + 3];
            } else if (colorType === 2) {
                rgba[d] = rowsData[o]; rgba[d + 1] = rowsData[o + 1]; rgba[d + 2] = rowsData[o + 2];
                rgba[d + 3] = (trns && trns.length >= 6 && rowsData[o] === trns[1] && rowsData[o + 1] === trns[3] && rowsData[o + 2] === trns[5]) ? 0 : 255;
            } else if (colorType === 4) {
                const g = rowsData[o];
                rgba[d] = g; rgba[d + 1] = g; rgba[d + 2] = g;
                rgba[d + 3] = (trns && trns.length > i) ? trns[i] : 255;
            } else { // palette
                const idx = rowsData[o];
                const p = idx * 3;
                rgba[d] = (plte && plte.length > p + 2) ? plte[p] : 0;
                rgba[d + 1] = (plte && plte.length > p + 2) ? plte[p + 1] : 0;
                rgba[d + 2] = (plte && plte.length > p + 2) ? plte[p + 2] : 0;
                rgba[d + 3] = (trns && trns.length > idx) ? trns[idx] : 255;
            }
        }
        // Only transparent-background icons are accepted: a canvas with zero
        // transparent pixels ships its own background disc (colored tile), which
        // would cover the flat purple plate. Refuse it, the next transparent
        // source gets a chance. Pixels are only inspected, never transformed.
        let anyTransparent = false;
        for (let i = 3; i < rgba.length; i += 4) { if (rgba[i] < 250) { anyTransparent = true; break; } }
        if (!anyTransparent) return { out: null, opaque: true };
        let minX = w, minY = h, maxX = -1, maxY = -1;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (rgba[(y * w + x) * 4 + 3] > 10) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        // White plate census: snapshot tiles, opaque apple-touch squares and
        // white-background PNG logos have a solid white center. A genuinely
        // transparent icon has transparent pixels mixed into its center, so a
        // center majority of white-opaque pixels means "white plate": refuse
        // it, so safeFetchIcon moves on to the next transparent source.
        const ccx = Math.floor(w * 0.15), cce = Math.ceil(w * 0.85);
        const ccy = Math.floor(h * 0.15), ccey = Math.ceil(h * 0.85);
        let whiteOpaque = 0, centerTot = 0;
        for (let y = ccy; y < ccey; y++) {
            for (let x = ccx; x < cce; x++) {
                const d = (y * w + x) * 4;
                centerTot++;
                if (rgba[d + 3] > 10 && rgba[d] >= 240 && rgba[d + 1] >= 240 && rgba[d + 2] >= 240) whiteOpaque++;
            }
        }
        if (centerTot > 0 && whiteOpaque / centerTot >= 0.55) return { out: null, opaque: true };
        if (maxX < 0) return { out: null, opaque: true }; // fully transparent: nothing to show
        // Glyph tint: read the glyph's own colors (pixels are inspected, never
        // transformed) and derive a tile background from them. Dark glyphs get a
        // light tint of the same hue; light/white silhouettes get a dark tile so
        // they stay visible. Hue = saturation-weighted circular mean, so a
        // multicolor glyph resolves to its dominant hue. Achromatic glyphs fall
        // back to the site's lavender hue. Output is a plain hex, served to the
        // client as a header; the tile renders it as its CSS background color.
        let gr = 0, gg = 0, gb = 0, gn = 0, satSum = 0, vx = 0, vy = 0, wsum = 0;
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const d = (y * w + x) * 4;
                if (rgba[d + 3] > 128) {
                    const pr = rgba[d], pg = rgba[d + 1], pb = rgba[d + 2];
                    gr += pr; gg += pg; gb += pb; gn++;
                    const mx = Math.max(pr, pg, pb), mn = Math.min(pr, pg, pb);
                    const sat = mx > 0 ? (mx - mn) / mx : 0;
                    satSum += sat;
                    if (mx - mn > 24) {
                        let hue = 0;
                        if (mx === pr) hue = ((pg - pb) / (mx - mn) + 6) % 6;
                        else if (mx === pg) hue = (pb - pr) / (mx - mn) + 2;
                        else hue = (pr - pg) / (mx - mn) + 4;
                        hue = (hue * 60) % 360;
                        const wgt = sat * (mx / 255);
                        vx += Math.cos(hue * Math.PI / 180) * wgt;
                        vy += Math.sin(hue * Math.PI / 180) * wgt;
                        wsum += wgt;
                    }
                }
            }
        }
        let tint = null;
        if (gn > 0) {
            const glyphL = (0.2126 * gr + 0.7152 * gg + 0.0722 * gb) / (gn * 255);
            const satAvg = satSum / gn;
            const hue = wsum > 0.001 ? ((Math.atan2(vy, vx) * 180 / Math.PI) + 360) % 360 : 280;
            const dark = glyphL >= 0.60; // light glyph -> dark tile; dark glyph -> light tint
            const tl = dark ? 0.30 : 0.87;
            const ts = Math.min(0.30, Math.max(dark ? 0.12 : 0.08, satAvg * 0.35));
            const q = tl < 0.5 ? tl * (1 + ts) : tl + ts - tl * ts;
            const p = 2 * tl - q;
            const hslf = (t) => {
                t = (((t % 360) + 360) % 360) / 360;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const hch = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
            tint = '#' + hch(hslf(hue + 120)) + hch(hslf(hue)) + hch(hslf(hue - 120));
        }
        const bw = maxX - minX + 1, bh = maxY - minY + 1;
        const ml = minX, mr = w - 1 - maxX, mt = minY, mb = h - 1 - maxY;
        // Margins of at least 4px on all four sides: already centered with breathing room, pass through.
        if (ml >= 4 && mr >= 4 && mt >= 4 && mb >= 4) return { out: null, opaque: false, tint };
        // Otherwise re-pad: glyph gets a guaranteed 4px transparent margin per side,
        // so a full-bleed circle (margins ~0, looks edge-clipped in the white tile) shrinks
        // slightly and shows a clean white ring around it.
        let side = Math.max(bw, bh) + 8;
        if (side > 216) side = 216;
        const ox = Math.floor((side - bw) / 2), oy = Math.floor((side - bh) / 2);
        const canvas = new Uint8Array(side * side * 4);
        for (let y = 0; y < bh; y++) {
            const srcStart = ((minY + y) * w + minX) * 4;
            canvas.set(rgba.subarray(srcStart, srcStart + bw * 4), (oy + y) * side * 4 + ox * 4);
        }
        return { out: await pngEncode(side, side, canvas), opaque: false, tint };
    } catch { return { out: null, opaque: false }; }
}

async function safeFetchIcon(target, ms = 3500, allowSvg = false, strict = true) {
    let u;
    try { u = new URL(target); } catch { return null; }
    if (!ICON_SCHEME_OK.has(u.protocol)) return null;
    if (HOST_DENY.test(u.hostname)) return null;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
        const fetchOpts = {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
            redirect: 'manual',
            signal: ctrl.signal,
        };
        // No Cloudflare Image Resizing: icons are fetched and served as original
        // bytes, pixels never transformed. Image Resizing only executes on the
        // deployed zone (wrangler dev ignores it), which is why the deployed page
        // rendered differently from the local preview: SVG got rasterized at 64px
        // (thin strokes turned jagged), 16/32px favicons got upscaled and
        // re-encoded, and the forced-PNG step made every format go through the
        // conversion line. Original bytes in preview and in production alike.
        let res = await fetch(u.toString(), fetchOpts);
        // Manual redirects: re-check every hop against the denylist. With
        // redirect:'follow' an allowed public site can bounce the fetch to an
        // internal/private host that the first check never sees (SSRF).
        let hops = 0;
        while (res.status >= 300 && res.status < 400 && hops < 5) {
            const loc = res.headers.get('location');
            if (!loc) return null;
            let next;
            try { next = new URL(loc, u); } catch { return null; }
            if (!ICON_SCHEME_OK.has(next.protocol)) return null;
            if (HOST_DENY.test(next.hostname)) return null;
            u = next;
            hops++;
            res = await fetch(u.toString(), fetchOpts);
        }
        if (!res.ok) return null;
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (allowSvg) {
            if (!ICON_CT_OK.test(ct) && ct !== 'image/svg+xml') return null;
        } else if (!ICON_CT_OK.test(ct)) {
            return null;
        }
        if (/^image\/png/.test(ct)) {
            try {
                const bytes = new Uint8Array(await res.arrayBuffer());
                // centerIconPNG decodes for inspection only: a white plate is
                // refused (the next transparent source gets a chance), a glyph
                // with tight margins is re-padded. Pixels are never peeled.
                const r = await centerIconPNG(bytes);
                if (r.opaque && strict) return null;
                const pngHeaders = { 'Content-Type': 'image/png' };
                if (r.tint) pngHeaders['X-Icon-Tint'] = r.tint;
                return new Response(r.out || bytes, { status: 200, headers: pngHeaders });
            } catch { return null; }
        }
        // JPEG and BMP have no alpha channel at all: they are white plates by
        // definition. Refuse them so the next transparent source gets a chance.
        if (strict && /^image\/(jpeg|bmp)/.test(ct)) return null;
        if (ct === 'image/svg+xml') {
            // Snapshot tiles (Google s2, DuckDuckGo) are full-canvas white rect SVGs.
            // Drop the white rect so the glyph floats on the tile background instead
            // of showing a white plate. Gradient-filled rects (colored tiles, our own
            // logo) are left alone.
            try {
                const text = await res.text();
                // The body is consumed here: always return a fresh Response.
                // Falling through to `return res` threw "body disturbed" for
                // SVGs that stripWhiteSvg declines (large / no path shapes).
                const stripped = stripWhiteSvg(text) || text;
                return new Response(stripped, { status: 200, headers: { 'Content-Type': 'image/svg+xml' } });
            } catch { return null; }
        }
        return res;
    } catch (e) {
        // console.warn('icon fetch failed', e && e.name);
        return null;
    } finally {
        clearTimeout(timer);
    }
}

async function handleIconProxy(request, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) return new Response('Missing URL', { status: 400 });

    // Requested display size (CSS pixels). The client sends 1x/2x/3x via srcset so
    // Retina/4K/5K screens get a sharp icon without oversized icons on ordinary screens.
    // Clamped to a sane range so a crafted request can't force very large/expensive transforms.
    // "direct=1": the caller already knows targetUrl points straight at an image
    // (a custom icon URL saved on the link), so skip the site-icon-discovery steps.
    const isDirect = url.searchParams.get('direct') === '1';
    // No resizing at all: the client's w/srcset values stay in the URL as part
    // of the cache key, and the browser tile scales the original icon with CSS.
    // Version stamp: bump when the fetch pipeline changes so stale cache entries
    // (e.g. icons captured by the old resize pipeline) stop being served.
    const cacheUrl = new URL(url.toString());
    // `w` never changes the bytes: drop it so 1x/2x/3x share one cache entry
    cacheUrl.searchParams.delete('w');
    cacheUrl.searchParams.set('_v', '9');
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    const buildResp = (body, extraHeaders = {}) => new Response(body, {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'X-Content-Type-Options': 'nosniff',
            'Content-Security-Policy': "default-src 'none'; sandbox",
            'Content-Disposition': 'inline; filename="icon"',
            'Referrer-Policy': 'no-referrer',
            'Cross-Origin-Resource-Policy': 'same-origin',
            'Vary': 'Accept',
            ...extraHeaders,
        }
    });
    // For an upstream Response that already passed the safeFetchIcon allowlist (bitmap/SVG), return it with its real content type.
    const buildRespFromUpstream = (upstream, extraHeaders = {}) => {
        const rawCt = (upstream.headers.get('content-type') || '').toLowerCase();
        const okCt = /^image\/(png|jpeg|gif|webp|avif|bmp|svg\+xml|x-icon|vnd\.microsoft\.icon)/;
        const ct = okCt.test(rawCt) ? rawCt.split(';')[0].trim() : 'image/png';
        const tintVal = upstream.headers.get('X-Icon-Tint') || '';
        const tintHeader = /^#[0-9a-f]{6}$/.test(tintVal) ? { 'X-Icon-Tint': tintVal } : {};
        return buildResp(upstream.body, { 'Content-Type': ct, ...extraHeaders, ...tintHeader });
    };
    if (response) {
        response = new Response(response.body, response);
        response.headers.set('X-Icon-Cache-Status', 'HIT');
    } else {
        let upstreamResponse = null;
        if (isDirect) {
            upstreamResponse = await safeFetchIcon(targetUrl, 3500, true, false);
        } else {
            // Site's own designed icon first: HTML link discovery (apple-touch-icon
            // etc.) is high-resolution and the site's brand icon. Then the
            // third-party icon API (site-brand SVG cache), then the public
            // snapshots (DuckDuckGo ip3 200px, Google s2 up to site size), and
            // LAST the site's own favicon.ico — the 16px .ico is the blurriest
            // source, served only when nothing larger exists. Every source goes
            // through the transparency gate in safeFetchIcon: white plates
            // (opaque apple-touch squares, white-background logos, palette
            // favicons, JPEG snapshots) are refused and the next transparent
            // source is tried. Nothing with a white plate is served.
            upstreamResponse = await fetchBestIcon(targetUrl);
            if (!upstreamResponse && PREFER_ICON_API) {
                const upstreamApi = `${ICON_API}${encodeURIComponent(targetUrl)}`;
                upstreamResponse = await safeFetchIcon(upstreamApi, 3500, true);
            }
            if (!upstreamResponse) {
                let host = '';
                try { host = new URL(targetUrl).hostname; } catch { host = ''; }
                if (host) {
                    upstreamResponse = await safeFetchIcon('https://icons.duckduckgo.com/ip3/' + host + '.ico', 3500, true);
                    if (!upstreamResponse) {
                        upstreamResponse = await safeFetchIcon('https://www.google.com/s2/favicons?domain=' + host + '&sz=256', 3500, true);
                    }
                }
            }
            if (!upstreamResponse) {
                upstreamResponse = await safeFetchIcon(new URL('/favicon.ico', targetUrl).toString(), 3500, false);
            }
        }
        if (upstreamResponse) {
            response = buildRespFromUpstream(upstreamResponse, {
                'Cache-Control': 'public, max-age=604800, s-maxage=604800, immutable',
                'Access-Control-Allow-Origin': '*',
                'X-Icon-Cache-Status': 'MISS',
            });
            ctx.waitUntil(cache.put(cacheKey, response.clone()).catch(e => console.warn('icon cache put failed', e)));
        } else {
            const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="display:block;width:100%;height:100%"><path fill="black" d="M62 32C62 15.432 48.568 2 32 2C15.861 2 2.703 14.746 2.031 30.72c-.008.196-.01.395-.014.592c-.005.23-.017.458-.017.688v.101C2 48.614 15.432 62 32 62s30-13.386 30-29.899l-.002-.049zM37.99 59.351c-.525-.285-1.029-.752-1.234-1.388c-.371-1.152-.084-2.046.342-3.086c.34-.833-.117-1.795.109-2.667c.441-1.697.973-3.536.809-5.359c-.102-1.119-.35-1.17-1.178-1.816c-.873-.685-.873-1.654-1.457-2.52c-.529-.787.895-3.777.498-3.959c-.445-.205-1.457.063-1.777-.362c-.344-.458-.584-.999-1.057-1.354c-.305-.229-1.654-.995-2.014-.941c-1.813.271-3.777-1.497-4.934-2.65c-.797-.791-1.129-1.678-1.713-2.593c-.494-.775-1.242-.842-1.609-1.803c-.385-1.004-.156-2.29-.273-3.346c-.127-1.135-.691-1.497-1.396-2.365c-1.508-1.863-2.063-4.643-4.924-4.643c-1.537 0-1.428 3.348-2.666 2.899c-1.4-.507-3.566 1.891-3.535 1.568c.164-1.674 1.883-2.488 2.051-2.987c.549-1.638-2.453-1.246-2.068-2.612c.188-.672 2.098-1.161 1.703-1.562c-.119-.122-1.58-1.147-1.508-1.198c.271-.19 1.449.412 1.193-.37c-.086-.26-.225-.499-.357-.74a28 28 0 0 1 1.92-1.975c1.014-.083 2.066-.02 2.447.054c2.416.476 3.256 1.699 5.672.794c1.162-.434 5.445.319 6.059 1.537c.334.666 1.578-.403 2.063-.475c.52-.078 1.695.723 2.053.232c.943-1.291-.604-1.827 1.223-.833c1.225.667 3.619-2.266 2.861 1.181c-.547 2.485-2.557 2.54-4.031 4.159c-1.451 1.594 2.871 2.028 2.982 3.468c.32 4.146 2.531-.338 1.939-1.812c-1.145-2.855 1.303-2.071 2.289-.257c.547 1.007.963.159 1.633-.192c.543-.283.688 1.25.805 1.517c.385.887 1.65 1.152 1.436 2.294c-.238 1.259-1.133.881-2.008 1.094c-.977.237.158 1.059.016 1.359c-.154.328-1.332.464-1.646.65c-.924.544-.359 1.605-1.082 2.175c-.496.392-.996.137-1.092.871c-.113.865-1.707 1.143-1.5 1.97c.057.227.516 1.923.227 2.013c-.133.043-1.184-1.475-1.471-1.627c-.568-.301-3.15-.055-3.482 1.654c-.215 1.105 1.563 2.85 2.016 1.328c.561-1.873.828 1.091.693 1.207c.268.234 1.836-.385 1.371.7c-.197.459.193 1.656.889 1.287c.291-.154 1.041.31 1.172.061a2.14 2.14 0 0 1 .742-.692c.701-.41 1.75-.025 2.518.02c.469.027 4.313 2.124 4.334 2.545c.084 1.575 2.99 1.37 3.436 1.933c1.199 1.526.83.751-.045 2.706c-.441.984-.057 2.191-1.125 2.904c-.514.342-1.141.171-1.598.655c-.412.437-.25.959-.5 1.464c-.301.601-4.346 4.236-4.613 5.115c-.133.441-1.34.825-.322 1.248c.592.174-1.311 1.973-.396 2.718c.223.181.369.334.479.471c-.457.122-.91.233-1.369.333M35.594 4.237c-.039.145.02.316.271.483c.566.375-.162 1.208-.943.671c-.779-.537-2.531.241-2.41.644c.119.403.66.563 1.496.242c.834-.322 1.178.048 1.318.43c.096.259 0 .403-.027.752c-.025.349-.996.107-1.803.162c-.809.054-1.67-.162-1.645-.619c.027-.456-.861-1.289-1.391-1.637c-.529-.348.232-1.1.934-.537c.699.564.727-.107 1.535-.321c.459-.122.275-.305.119-.479q1.29.047 2.546.209m3.517 8.869c.605.164 1.656.929 1.656 1.291c0 .363-.477.817-.688.765c-1.523-.371-2.807-1.874-3.514-2.697c-1.234-1.435-1.156-.205-3.111-.826c-.5-.16-1.293-1.711-.768-2.476s1.131-.886 1.615-.683c.484.2 1.898-.645 2.223.362c.322 1.007 1.211 2.292 2.02 2.636c.81.342-.04 1.464.567 1.628m.485 4.673c.242.483-1.455-.564-1.859-1.047c-.402-.482-1.01-1.571-.523-2.054c.484-.482 1.57 1.005 2.141 1.33c1.129.645-.001 1.289.241 1.771m-8.594-7.315c.117-.161.365.242.586.645s-.084.971-.586.885c-.502-.084-.281-1.136 0-1.53m0-4.052s.473 1.154 0 .966s-.496-.671 0-.966m.096 3.65c-.135-.321-.166-1.64.162-2.04c.484-.59 1.266.564.74 1.02c-.525.457-.768 1.343-.902 1.02m-6.077 1.415c-.879-.063-.898-.823-1.02-1.226s-.85.765-1.586 0s.172-1.771.01-2.376c-.162-.604 1.736 0 2.02 0s1.051 1.248 1.252 1.227c.203-.02 1.293.987 1.293.584c0-.402.166-1.088.93-1.168c1.172-.121.121 1.289.08 1.838c-.039.549.891 1.504 1.232 1.907c.344.403-.867.686-1.07.443c-.201-.242-.727 0-1.172.322c-.443.322-1.656-.443-2.221-.685c-.566-.241 1.131-.804.252-.866m3.141-6.354c.781.269 1.225.51 1.609 0c.371-.492.654 1.073.385 1.502c-.27.431-.781.324-.863 0c-.08-.32-1.912-1.771-1.131-1.502m1.131 4.859c-.268-.35-.295-.752 0-1.047c.297-.295.201-.644.729-.751c.26-.054.295.348.295.724s.324.859 0 1.448c-.323.589-.754-.026-1.024-.374m2.205-5.969c-.012.074-.061.118-.184.106a.6.6 0 0 1-.236-.095q.21-.008.42-.011M25.389 5.15c.619 0 .539.418 1.051.719c.512.3.242-1.552.592-.854c.35.697 1.389 1.664.889 1.851c-.43.163-2.234.859-2.396.739s-.377-.63-.809-.739c-.432-.107-.889-1.127-1.186-1.1c-.113.01-.123-.184-.049-.442a28 28 0 0 1 1.572-.455c.058.158.146.281.336.281m13.519 30.025c-.645.666-1.756-.464-2.523-.424s-1.152-.765-1.818-.684c-.668.079.182-.847 1.111-.362c.927.483 3.756.925 3.23 1.47m12.93-22.934c-.188.24-.402.408-.607.585c-.605.524-1.736.484-1.898.846s-.566 1.489-1.98 1.494s-1.01 2.131-1.131 2.738s-.443 1.325-.848.801s-.566-.323-1.816-1.853s-.77-2.375-.365-2.818c.404-.442.566-1.49 0-1.329s-.889-.202-.768-.703s.727-.867 0-1.402s-.324-2.445-.889-4.189c-.566-1.745-1.334-.51-2.586-.443s-1.455-.873-.889-1.303a27.95 27.95 0 0 1 13.777 7.576"/></svg>';
            response = new Response(fallbackSvg, {
                status: 200,
                headers: {
                    'Content-Type': 'image/svg+xml',
                    // Cache the globe for 1 hour only: a site that gets a real
                    // favicon later (or a transient upstream outage) recovers
                    // within an hour instead of serving 7-day stale globes.
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                    'Access-Control-Allow-Origin': '*',
                    'X-Icon-Cache-Status': 'DEFAULT',
                    'Cross-Origin-Resource-Policy': 'same-origin',
                },
            });
            ctx.waitUntil(cache.put(cacheKey, response.clone()).catch(e => console.warn('icon fallback cache put failed', e)));
        }
    }

    return response;
}

const MIN_BACKUP_INTERVAL_MS = 10 * 60 * 1000;

// Write one timestamped backup into a SECOND KV namespace
// (env.CARD_ORDER_BACKUP). Bind it in wrangler.toml / the dashboard to enable:
// the in-namespace rolling backups cannot survive a deleted namespace, but a
// copy in a separate namespace can. Keeps the newest 10.
async function writeOffsiteBackup(env, payload) {
    const ns = env.CARD_ORDER_BACKUP;
    if (!ns) return; // optional binding; no-op when unbound
    try {
        const now = Date.now();
        // v21: throttle the offsite backup to the same 10-minute cadence
        // as the smart backup (MIN_BACKUP_INTERVAL_MS). This is NOT a
        // timer: this function only runs when a save/import happens, and
        // it writes only if 10+ minutes have passed since the last
        // offsite backup. No save = no write at all.
        const list = await ns.list({ prefix: `backup_${DEFAULT_USER}_`, includeMetadata: true });
        const keys = list.keys.sort((a, b) => a.name.localeCompare(b.name));
        if (keys.length > 0) {
            const lastMeta = keys[keys.length - 1].metadata;
            if (lastMeta && lastMeta.timestamp && (now - lastMeta.timestamp) < MIN_BACKUP_INTERVAL_MS) {
                return; // too soon since the last offsite backup, skip this one
            }
        }
        const dateStr = new Date(now + 8 * 3600 * 1000).toISOString().replace(/[:.]/g, '-');
        await ns.put(`backup_${DEFAULT_USER}_${dateStr}`, payload, { metadata: { timestamp: now } });
        // Prune to the newest 10. The list above was taken before this
        // put, so there are now keys.length + 1 backups; delete the
        // oldest (keys.length + 1 - 10) when that is positive.
        if (keys.length >= 10) {
            for (const k of keys.slice(0, keys.length - 10 + 1)) await ns.delete(k.name);
        }
    } catch (e) {
        console.error('Offsite backup failed:', e);
    }
}

// Unconditional in-namespace backup of the current data (no 10-minute
// throttle): used before destructive overwrites such as importData.
async function backupNow(env, currentData) {
    try {
        const now = Date.now();
        const dateStr = new Date(now + 8 * 3600 * 1000).toISOString().replace(/[:.]/g, '-');
        // Unique suffix: two imports in the same second used to write the
        // same key, silently losing one snapshot.
        const key = `backup_${DEFAULT_USER}_${dateStr}_${(now % 100000).toString().padStart(5, '0')}_${Math.random().toString(36).slice(2, 6)}`;
        await env.CARD_ORDER.put(key, currentData, { metadata: { timestamp: now } });
        // Prune to the newest 10: the smart-backup prune only runs on
        // throttled saves, so pre-overwrite snapshots must prune themselves.
        const list = await env.CARD_ORDER.list({ prefix: `backup_${DEFAULT_USER}_` });
        const names = list.keys.map(k => k.name).sort((a, b) => a.localeCompare(b));
        if (names.length > 10) {
            for (const k of names.slice(0, names.length - 10)) await env.CARD_ORDER.delete(k);
        }
    } catch (e) {
        console.error('Pre-overwrite backup failed:', e);
    }
}

async function handleSmartBackup(env, currentData) {
    try {
        const list = await env.CARD_ORDER.list({ prefix: `backup_${DEFAULT_USER}_`, includeMetadata: true });
        let keys = list.keys;

        keys.sort((a, b) => a.name.localeCompare(b.name));

        let shouldBackup = true;

        if (keys.length > 0) {
            const lastBackupMeta = keys[keys.length - 1].metadata;
            if (lastBackupMeta && lastBackupMeta.timestamp) {
                 const timeDiff = Date.now() - lastBackupMeta.timestamp;
                 if (timeDiff < MIN_BACKUP_INTERVAL_MS) {
                     shouldBackup = false;
                 }
            }
        }

        if (shouldBackup) {
            const now = Date.now();
            const date = new Date(now + 8 * 3600 * 1000);
            const dateStr = date.toISOString().replace(/[:.]/g, '-');
            const backupKey = `backup_${DEFAULT_USER}_${dateStr}`;

            await env.CARD_ORDER.put(backupKey, currentData, {
                metadata: { timestamp: now }
            });

            if (keys.length >= 10) {
                const deleteCount = keys.length + 1 - 10;
                if(deleteCount > 0) {
                    const toDelete = keys.slice(0, deleteCount);
                    for (const key of toDelete) {
                        await env.CARD_ORDER.delete(key.name);
                    }
                }
            }
        }
    } catch (e) {
        console.error("Smart backup failed:", e);
    }
}

function assertEnv(env) {
    const messages = [];
    if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) {
        messages.push('JWT_SECRET is not configured or not strong enough (needs ≥ 32 characters)');
    }
    if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 8) {
        messages.push('ADMIN_PASSWORD is not configured or too short');
    }
    if (messages.length > 0) {
        const e = new Error(`FATAL: Missing or invalid configuration: ${messages.join('; ')}`);
        e.code = 'CONFIG_ERROR';
        e.messages = messages;
        throw e;
    }
}

const EMPTY_DATA = { categories: {} };

function safeJsonParse(text, fallback) {
    if (typeof text !== 'string' || text === '') return { ok: false, data: fallback };
    try {
        const v = JSON.parse(text);
        if (!v || typeof v !== 'object' || Array.isArray(v)) return { ok: false, data: fallback };
        return { ok: true, data: v };
    } catch (e) {
        return { ok: false, data: fallback };
    }
}

const MAX_CATEGORIES = 100;
const MAX_GROUPS = 100;
const MAX_LINKS_TOTAL = 3000;
const MAX_NAME = 120, MAX_TIPS = 500, MAX_URL = 2048, MAX_TAG = 30;
const MAX_SUB = 120, MAX_DETAIL = 400, MAX_BTN = 30, MAX_ZH = 60;
const CARD_COLORS = ['violet', 'emerald', 'sky', 'amber', 'rose', 'slate', 'cyan', 'indigo', 'fuchsia', 'orange'];
const URL_SCHEME_OK = new Set(['http:', 'https:']);

function validateCategories(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, reason: 'CATEGORIES_TYPE' };
    const keys = Object.keys(raw);
    if (keys.length > MAX_CATEGORIES) return { ok: false, reason: 'TOO_MANY_CATEGORIES' };

    let total = 0;
    for (const name of keys) {
        if (typeof name !== 'string' || name.length === 0 || name.length > MAX_NAME || name === '__proto__') {
            return { ok: false, reason: 'BAD_CATEGORY_NAME' };
        }
        const cat = raw[name];
        const links = Array.isArray(cat) ? cat : (cat && Array.isArray(cat.links) ? cat.links : null);
        if (!links) return { ok: false, reason: 'BAD_CATEGORY_SHAPE' };

        // groups: the explicit list of sub-branches in this category
        // (may be absent in data saved before groups existed)
        const groups = Array.isArray(cat) ? undefined : cat.groups;
        if (groups != null) {
            if (!Array.isArray(groups)) return { ok: false, reason: 'BAD_GROUPS' };
            if (groups.length > MAX_GROUPS) return { ok: false, reason: 'TOO_MANY_GROUPS' };
            const seenGroups = new Set();
            for (const g of groups) {
                if (typeof g !== 'string' || g.length === 0 || g.length > MAX_NAME) return { ok: false, reason: 'BAD_GROUP_NAME' };
                if (seenGroups.has(g)) return { ok: false, reason: 'DUP_GROUP' };
                seenGroups.add(g);
            }
        }

        total += links.length;
        for (const l of links) {
            if (!l || typeof l !== 'object') return { ok: false, reason: 'BAD_LINK' };
            if (typeof l.name !== 'string' || l.name.length === 0 || l.name.length > MAX_NAME) return { ok: false, reason: 'BAD_NAME' };
            if (typeof l.url !== 'string' || l.url.length === 0 || l.url.length > MAX_URL) return { ok: false, reason: 'BAD_URL' };

            let u;
            try { u = new URL(l.url); } catch { return { ok: false, reason: 'BAD_URL_FORMAT' }; }
            if (!URL_SCHEME_OK.has(u.protocol)) return { ok: false, reason: 'URL_SCHEME' };

            if (l.tips != null && typeof l.tips !== 'string') return { ok: false, reason: 'BAD_TIPS' };
            if (l.icon != null && typeof l.icon !== 'string') return { ok: false, reason: 'BAD_ICON' };
            for (const flag of ['isPrivate', 'isDirect']) {
                if (l[flag] != null && typeof l[flag] !== 'boolean') return { ok: false, reason: 'BAD_FLAG' };
            }
            if (l.group != null && (typeof l.group !== 'string' || l.group.length > MAX_NAME)) return { ok: false, reason: 'BAD_GROUP' };
            if (l.tag != null && (typeof l.tag !== 'string' || l.tag.length > MAX_TAG)) return { ok: false, reason: 'BAD_TAG' };
        }
    }
    if (total > MAX_LINKS_TOTAL) return { ok: false, reason: 'TOO_MANY_LINKS' };
    return { ok: true };
}

function sanitizeCategories(raw) {
    const out = {};
    for (const name of Object.keys(raw)) {
        const cat = Array.isArray(raw[name]) ? { isHidden: false, links: raw[name] } : raw[name];
        // Groups: keep the stored list (deduped, trimmed to MAX_NAME), backfill
        // [] for data saved before groups existed, then append any group found
        // on links that is not already listed, so a group with links is never lost.
        const groups = [];
        (Array.isArray(cat.groups) ? cat.groups : []).forEach(g => {
            const s = String(g).slice(0, MAX_NAME);
            if (s && !groups.includes(s)) groups.push(s);
        });
        (cat.links || []).forEach(l => {
            const g = l.group ? String(l.group).slice(0, MAX_NAME) : '';
            if (g && !groups.includes(g)) groups.push(g);
        });
        out[name] = {
            isHidden: !!cat.isHidden,
            groups,
            links: (cat.links || []).map(l => ({
                name: String(l.name).slice(0, MAX_NAME),
                url: String(l.url).slice(0, MAX_URL),
                tips: l.tips ? String(l.tips).slice(0, MAX_TIPS) : '',
                icon: l.icon ? String(l.icon).slice(0, MAX_URL) : '',
                iconDark: l.iconDark ? String(l.iconDark).slice(0, MAX_URL) : '',
                isPrivate: !!l.isPrivate,
                isDirect: !!l.isDirect,
                // Preserve/backfill category ownership: prefer the given value, otherwise fall back to the containing category's key, so a missing link.category doesn't become an "undefined" category
                category: l.category ? String(l.category).slice(0, MAX_NAME) : name,
                // Preserve/backfill group ('' = ungrouped): links saved before groups existed get ''
                group: l.group ? String(l.group).slice(0, MAX_NAME) : '',
                // Tag: stored only when the client sent one ('' = explicitly
                // untagged). Omitted for links that never had a tag, so the
                // frontend fallback map still applies to them.
                ...(l.tag !== undefined ? { tag: String(l.tag).slice(0, MAX_TAG) } : {}),
                // Bilingual slots + look (v26/v27): keep every field the editor
                // writes. Dropping them here silently destroys user content on
                // every save (subtitles, Chinese texts, button labels, colors).
                subEn: l.subEn ? String(l.subEn).slice(0, MAX_SUB) : '',
                nameZh: l.nameZh ? String(l.nameZh).slice(0, MAX_SUB) : '',
                detail: l.detail ? String(l.detail).slice(0, MAX_DETAIL) : '',
                detailZh: l.detailZh ? String(l.detailZh).slice(0, MAX_DETAIL) : '',
                btnLabel: l.btnLabel ? String(l.btnLabel).slice(0, MAX_BTN) : '',
                btnLabelZh: l.btnLabelZh ? String(l.btnLabelZh).slice(0, MAX_BTN) : '',
                groupZh: l.groupZh ? String(l.groupZh).slice(0, MAX_ZH) : '',
                tagZh: l.tagZh ? String(l.tagZh).slice(0, MAX_ZH) : '',
                categoryZh: l.categoryZh ? String(l.categoryZh).slice(0, MAX_ZH) : '',
                color: CARD_COLORS.includes(l.color) ? l.color : '',
                star: !!l.star,
            })),
        };
    }
    return out;
}

/* Logo customization (Phase 4): the site logo (top bar + favicon) is one KV key
   `${DEFAULT_USER}_logo`, independent of the categories data, so import/export
   can carry it without touching the schema. Two modes, mutually exclusive:
   a preset glyph tinted with a palette color, or an image URL. */
const LOGO_PRESETS = ['star', 'terminal', 'bolt', 'globe', 'bookmark', 'navigation'];
const LOGO_COLORS = ['violet', 'purple', 'emerald', 'sky', 'amber', 'rose', 'slate'];
const LOGO_SHAPES = ['square', 'circle'];

function sanitizeLogo(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const out = {};
    out.preset = LOGO_PRESETS.includes(raw.preset) ? raw.preset : 'star';
    out.color = LOGO_COLORS.includes(raw.color) ? raw.color : 'purple';
    out.shape = LOGO_SHAPES.includes(raw.shape) ? raw.shape : 'square';
    if (raw.name !== undefined) {
        if (typeof raw.name !== 'string') return null;
        const n = raw.name.trim();
        if (n.length > 40) return null;
        out.name = n;
    } else {
        out.name = '';
    }
    if (typeof raw.url === 'string') {
        const u = raw.url.trim();
        if (u.length > 300 || (u.length > 0 && !/^https?:\/\//.test(u))) return null;
        out.url = u;
    } else if (raw.url !== undefined) {
        return null;
    } else {
        out.url = '';
    }
    return out;
}

async function readJsonBody(request, maxBytes = 8 * 1024 * 1024) {
    const len = Number(request.headers.get('content-length') || 0);
    if (len > maxBytes) return { ok: false, reason: 'TOO_LARGE' };
    let text;
    try { text = await request.text(); } catch { return { ok: false, reason: 'READ_FAILED' }; }
    if (text.length > maxBytes) return { ok: false, reason: 'TOO_LARGE' };
    let data;
    try { data = JSON.parse(text); }
    catch { return { ok: false, reason: 'BAD_JSON' }; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false, reason: 'BAD_JSON' };
    return { ok: true, data };
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        try {
            assertEnv(env);
        } catch (e) {
            console.error('CONFIG_ERROR:', e.message);
            return new Response(JSON.stringify({
                error: 'Server is not configured',
                messages: (e.code === 'CONFIG_ERROR' && Array.isArray(e.messages)) ? e.messages : []
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders(request, env),
                }
            });
        }

        resolveConfig(env);

        try {
            if (request.method === 'OPTIONS') {
                return new Response(null, { headers: {
                    ...corsHeaders(request, env),
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Max-Age': '86400',
                } });
            }

            if (url.pathname === '/api/icon') {
                if (request.method !== 'GET' && request.method !== 'HEAD') {
                    // Reject non-GET: HEAD is cacheable, POST/PUT bodies must
                    // never leak into the edge cache key.
                    return new Response(JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }), { status: 405, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }
                return await handleIconProxy(request, ctx);
            }

        if (url.pathname === '/' || url.pathname === '/index.html') {
            const { etag, body } = await htmlMeta();

            if (request.headers.get('If-None-Match') === etag) {
                return new Response(null, {
                    status: 304,
                    headers: {
                        'ETag': etag,
                        'Cache-Control': 'public, max-age=60, s-maxage=300, must-revalidate',
                        'X-Content-Type-Options': 'nosniff',
                        'Referrer-Policy': 'no-referrer',
                        'Content-Security-Policy': "frame-ancestors 'none'",
                    },
                });
            }

            // Edge cache hit -> 0 origin requests
            // Key carries the content hash: after a redeploy the new HTML is served
            // at once instead of the previous version until s-maxage expires.
            const cacheKey = new Request(url.origin + '/?__h=' + encodeURIComponent(etag), { method: 'GET' });
            const hit = await caches.default.match(cacheKey);
            if (hit) return hit;

            const res = new Response(body, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'ETag': etag,
                    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
                    'Vary': 'Accept-Encoding',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'no-referrer',
                    'Content-Security-Policy': "frame-ancestors 'none'",
                },
            });
            ctx.waitUntil(caches.default.put(cacheKey, res.clone()).catch(e => console.warn('html cache put failed', e)));
            return res;
        }

        if (url.pathname === '/api/login' && request.method === 'POST') {
            const RATE_LIMIT_PREFIX = '__limit__';
            const MAX_ATTEMPTS = 5;
            const LOCK_MS = 900 * 1000;
            try {
                const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
                const rateLimitKey = `${RATE_LIMIT_PREFIX}login_${clientIP}`;
                const kv = await env.CARD_ORDER.getWithMetadata(rateLimitKey, { type: 'text' });
                const attempts = parseInt(kv.value) || 0;
                const expiredAt = (kv.metadata && kv.metadata.expiredAt) || 0;

                if (attempts >= MAX_ATTEMPTS) {
                    const waitSec = Math.max(1, Math.ceil((expiredAt - Date.now()) / 1000));
                    return new Response(JSON.stringify({ valid: false, locked: true, remaining: 0, retryAfter: waitSec }), { status: 429, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }

                // readJsonBody enforces the size cap; a bare request.json()
                // lets a huge body hit the JSON parser unbounded, and the
                // text.length check is UTF-16 chars, not bytes.
                const body = await readJsonBody(request, 16 * 1024);
                if (!body.ok) return new Response(JSON.stringify({ error: body.reason }), { status: body.reason === 'TOO_LARGE' ? 413 : 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                const { password } = body.data;
                const passwordOk = typeof password === 'string' && (await timingSafeStringEqual(password, env.ADMIN_PASSWORD));
                if (!passwordOk) {
                    const newAttempts = attempts + 1;
                    const newExpiredAt = Date.now() + LOCK_MS;
                    await env.CARD_ORDER.put(rateLimitKey, String(newAttempts), { expirationTtl: 900, metadata: { expiredAt: newExpiredAt } });
                    const remaining = Math.max(0, MAX_ATTEMPTS - newAttempts);
                    if (newAttempts >= MAX_ATTEMPTS) {
                        return new Response(JSON.stringify({ valid: false, locked: true, remaining: 0, retryAfter: Math.max(1, Math.ceil((newExpiredAt - Date.now()) / 1000)) }), { status: 429, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                    }
                    return new Response(JSON.stringify({ valid: false, remaining }), { status: 403, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }
                await env.CARD_ORDER.delete(rateLimitKey);

                const currentTime = Math.floor(Date.now() / 1000);
                const kid = await currentKeyGen(env);
                if (!kid) return new Response(JSON.stringify({ valid: false, error: 'KV unavailable, try again later' }), { status: 503, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });

                const accessTokenPayload = {
                    iat: currentTime,
                    exp: currentTime + 7200,
                    role: 'admin',
                    type: 'access',
                    kid
                };
                const accessToken = await createJWT(accessTokenPayload, env.JWT_SECRET);

                const refreshTokenPayload = {
                    iat: currentTime,
                    exp: currentTime + 2592000,
                    role: 'admin',
                    type: 'refresh',
                    kid
                };
                const refreshToken = await createJWT(refreshTokenPayload, env.JWT_SECRET);

                const response = new Response(JSON.stringify({
                    valid: true,
                    token: `Bearer ${accessToken}`
                }), {
                    status: 200,
                    headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' }
                });

                response.headers.append('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/api/refreshToken; Max-Age=2592000`);

                return response;
            } catch (e) {
                return new Response(JSON.stringify({ valid: false, error: 'Auth failed' }), { status: 403, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
            }
        }

        if (url.pathname === '/api/refreshToken' && request.method === 'POST') {
            try {
                const cookies = parseCookie(request.headers.get('Cookie'));
                const refreshToken = cookies.refreshToken;

                if (!refreshToken) {
                    return new Response(JSON.stringify({ error: 'Refresh token missing' }), { status: 401, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }

                const payload = await validateJWT(refreshToken, env.JWT_SECRET);
                const currentTime = Math.floor(Date.now() / 1000);

                if (!payload || payload.exp < currentTime) {
                    return new Response(JSON.stringify({ error: 'Refresh token expired' }), { status: 401, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }

                if (payload.type !== 'refresh') {
                    return new Response(JSON.stringify({ error: 'Invalid token type' }), { status: 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }

                const kid = await currentKeyGen(env);
                if (!kid) return new Response(JSON.stringify({ error: 'KV unavailable, try again later' }), { status: 503, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                if (!payload.kid || payload.kid !== kid) {
                    return new Response(JSON.stringify({ error: 'Refresh token revoked' }), { status: 401, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
                }

                const newAccessTokenPayload = {
                    iat: currentTime,
                    exp: currentTime + 7200,
                    role: 'admin',
                    type: 'access',
                    kid
                };
                const newAccessToken = await createJWT(newAccessTokenPayload, env.JWT_SECRET);

                const newRefreshTokenPayload = {
                    iat: currentTime,
                    exp: currentTime + 2592000,
                    role: 'admin',
                    type: 'refresh',
                    kid
                };
                const newRefreshToken = await createJWT(newRefreshTokenPayload, env.JWT_SECRET);

                const response = new Response(JSON.stringify({
                    accessToken: `Bearer ${newAccessToken}`
                }), {
                    status: 200,
                    headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' }
                });

                response.headers.append('Set-Cookie', `refreshToken=${newRefreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/api/refreshToken; Max-Age=2592000`);

                return response;
            } catch (e) {
                return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
            }
        }

        if (url.pathname === '/api/validateToken') {
            const validation = await validateServerToken(request.headers.get('Authorization'), env);
            return new Response(JSON.stringify(validation.isValid ? { valid: true } : validation.response), {
                status: validation.status || 200,
                headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' }
            });
        }

        if (url.pathname === '/api/getLinks') {
            const authHeader = request.headers.get('Authorization');

            let scope = 'anon';
            if (authHeader) {
                const v = await validateServerToken(authHeader, env);
                if (v.isValid) scope = 'authed';
            }

            const rev = scope === 'anon' ? await getDataRev(env) : '0';
            const cacheKey = cacheKeyFor(url, rev, scope);

            // (2) Edge cache hit -> 0 KV reads
            if (scope === 'anon') {
                const hit = await CACHE.match(cacheKey);
                if (hit) {
                    const r = new Response(hit.body, hit);
                    r.headers.set('X-KV-Cache', 'HIT');
                    // The stored copy is public/max-age=60; the client must still get
                    // no-store (a browser-cached anon body would shadow the post-login
                    // authed response) and this request's own CORS headers.
                    r.headers.set('Cache-Control', 'no-store');
                    r.headers.delete('Access-Control-Allow-Origin');
                    r.headers.delete('Access-Control-Allow-Credentials');
                    const cors = corsHeaders(request, env);
                    for (const k of Object.keys(cors)) r.headers.set(k, cors[k]);
                    r.headers.set('Vary', 'Accept-Encoding' + (cors.Vary ? ', ' + cors.Vary : ''));
                    return r;
                }
            }

            const read = await readLinksKv(env);
            if (!read.ok) {
                return new Response(JSON.stringify({ error: 'KV_READ_FAILED' }), { status: 500, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
            }
            const data = read.data;

            if (data && data.categories) {
                for (const name of Object.keys(data.categories)) {
                    for (const l of data.categories[name].links || []) {
                        if (l.category === undefined || l.category === null) l.category = name;
                    }
                }
            }
            let body, cacheable;

            if (scope === 'authed') {
                body = JSON.stringify(data);
                cacheable = false;
            } else {
                body = JSON.stringify({ categories: filterPublic(data.categories) });
                cacheable = true;
            }
            return sendCached(body, request, cacheKey, cacheable, { 'X-KV-Cache': 'MISS', ...corsHeaders(request, env) }, ctx);
        }

        if (url.pathname === '/api/saveData' && request.method === 'POST') {
            const validation = await validateServerToken(request.headers.get('Authorization'), env);
            if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            const body = await readJsonBody(request);
            if (!body.ok) return new Response(JSON.stringify({ error: body.reason }), { status: body.reason === 'TOO_LARGE' ? 413 : 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            const categories = body.data.categories;

            const check = validateCategories(categories);
            if (!check.ok) return new Response(JSON.stringify({ error: 'INVALID_DATA', detail: check.reason }), { status: 422, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            try {
                const oldRev = await getDataRev(env);
                const currentData = await env.CARD_ORDER.get(DEFAULT_USER);

                // Guard: never let an empty write wipe real data (e.g. after a
                // failed or empty load). Pass { force: true } to clear deliberately.
                const parsed = safeJsonParse(currentData, null);
                // An unparseable stored blob must NOT count as empty: that
                // would let an empty incoming payload overwrite it unforced.
                // Null means nothing was ever stored (fresh namespace) -> 0.
                const existingCount = currentData == null ? 0 : (parsed.data ? countLinks(parsed.data.categories) : -1);
                if (countLinks(categories) === 0 && existingCount !== 0 && !body.data.force) {
                    return new Response(JSON.stringify({ error: 'REFUSE_EMPTY_OVERWRITE', detail: 'incoming data is empty but stored data has ' + existingCount + ' links' }), { status: 409, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
                }

                if (currentData) {
                    ctx.waitUntil(handleSmartBackup(env, currentData));
                }

                const payload = JSON.stringify({ categories: sanitizeCategories(categories) });
                await env.CARD_ORDER.put(DEFAULT_USER, payload);
                // Offsite copy (second KV namespace, when bound).
                ctx.waitUntil(writeOffsiteBackup(env, payload));

                const rev = await bumpRev(env);
                // Drop the previous anonymous cache entry so a failed rev bump
                // cannot leave visitors on stale data.
                ctx.waitUntil(CACHE.delete(cacheKeyFor(new URL('/api/getLinks', request.url), oldRev, 'anon')).catch(e => console.warn('anon cache delete failed', e)));

                return new Response(JSON.stringify({ success: true, rev }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            } catch (e) {
                return new Response(JSON.stringify({ error: 'SAVE_FAILED' }), { status: 500, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            }
        }

        if (url.pathname === '/api/logo' && request.method === 'GET') {
            const logoStr = await env.CARD_ORDER.get(DEFAULT_USER + '_logo');
            return new Response(logoStr || 'null', { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
        }

        if (url.pathname === '/api/logo' && request.method === 'POST') {
            const validation = await validateServerToken(request.headers.get('Authorization'), env);
            if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            const bodyObj = await readJsonBody(request);
            if (!bodyObj.ok) return new Response(JSON.stringify({ error: bodyObj.reason }), { status: bodyObj.reason === 'TOO_LARGE' ? 413 : 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            const cleanLogo = sanitizeLogo(bodyObj.data.logo);
            if (!cleanLogo) return new Response(JSON.stringify({ error: 'INVALID_LOGO' }), { status: 422, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            await env.CARD_ORDER.put(DEFAULT_USER + '_logo', JSON.stringify(cleanLogo));
            return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
        }

        // Site-wide language mode: one KV entry written by the admin, read by
        // every visitor (anonymous included) at page start. localStorage is
        // only a first-paint cache; the server value is the truth.
        if (url.pathname === '/api/langs' && request.method === 'GET') {
            const langsStr = await env.CARD_ORDER.get(DEFAULT_USER + '_langs');
            return new Response(langsStr || 'null', { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
        }

        if (url.pathname === '/api/langs' && request.method === 'POST') {
            const validation = await validateServerToken(request.headers.get('Authorization'), env);
            if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            const bodyObj = await readJsonBody(request);
            if (!bodyObj.ok) return new Response(JSON.stringify({ error: bodyObj.reason }), { status: bodyObj.reason === 'TOO_LARGE' ? 413 : 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

            const v = bodyObj.data.langs;
            if (!v || typeof v.en !== 'boolean' || typeof v.zh !== 'boolean' || (!v.en && !v.zh)) return new Response(JSON.stringify({ error: 'INVALID_LANGS' }), { status: 422, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
            await env.CARD_ORDER.put(DEFAULT_USER + '_langs', JSON.stringify({ en: v.en, zh: v.zh }));
            return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' } });
        }

        if (url.pathname === '/api/exportData' && request.method === 'POST') {
             const validation = await validateServerToken(request.headers.get('Authorization'), env);
             if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

             const data = await env.CARD_ORDER.get(DEFAULT_USER);
             const logoStr = await env.CARD_ORDER.get(DEFAULT_USER + '_logo');
             const exportOut = safeJsonParse(data, {}).data || {};
             const logoVal = safeJsonParse(logoStr, null).data;
             if (logoVal) exportOut.logo = logoVal;
             return new Response(JSON.stringify(exportOut), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
        }

        if (url.pathname === '/api/importData' && request.method === 'POST') {
             const validation = await validateServerToken(request.headers.get('Authorization'), env);
             if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

             const bodyObj = await readJsonBody(request);
             if (!bodyObj.ok) return new Response(JSON.stringify({ error: bodyObj.reason }), { status: bodyObj.reason === 'TOO_LARGE' ? 413 : 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

             const categories = bodyObj.data.categories || {};

             const check = validateCategories(categories);
             if (!check.ok) return new Response(JSON.stringify({ error: 'INVALID_DATA', detail: check.reason }), { status: 422, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });

             const cleanData = {
                 categories: sanitizeCategories(categories)
             };

             // Import overwrites everything: back up the current data first
             // (unconditional backup + offsite copy), and refuse an empty
             // import over non-empty stored data unless forced.
             const oldRev = await getDataRev(env);
             const currentData = await env.CARD_ORDER.get(DEFAULT_USER);
             if (currentData) {
                 await backupNow(env, currentData);
                 ctx.waitUntil(writeOffsiteBackup(env, currentData));
             }
             const parsed = safeJsonParse(currentData, null);
             // Same rule as the save path: an unparseable stored blob is
             // never a safe empty target for an empty import.
             // Null means nothing was ever stored (fresh namespace) -> 0.
             const existingCount = currentData == null ? 0 : (parsed.data ? countLinks(parsed.data.categories) : -1);
             if (countLinks(categories) === 0 && existingCount !== 0 && !bodyObj.data.force) {
                 return new Response(JSON.stringify({ error: 'REFUSE_EMPTY_OVERWRITE', detail: 'imported data is empty but stored data has ' + existingCount + ' links' }), { status: 409, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
             }

             await env.CARD_ORDER.put(DEFAULT_USER, JSON.stringify(cleanData));

              // An imported file may carry the logo setting; write it when valid.
              const importedLogo = sanitizeLogo(bodyObj.data.logo);
              if (importedLogo) await env.CARD_ORDER.put(DEFAULT_USER + '_logo', JSON.stringify(importedLogo));

             const rev = await bumpRev(env);
             ctx.waitUntil(CACHE.delete(cacheKeyFor(new URL('/api/getLinks', request.url), oldRev, 'anon')).catch(e => console.warn('anon cache delete failed', e)));
             return new Response(JSON.stringify({ success: true, rev }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
        }

        if (url.pathname === '/api/logout' && request.method === 'POST') {
            // Only revoke all sessions when the caller holds a validly-signed access token of the current generation
            // (an expired one is fine: it still proves the caller was logged in). Anonymous callers can no longer force a global logout.
            const _p = await validateJWT((request.headers.get('Authorization') || '').replace(/^Bearer /, ''), env.JWT_SECRET);
            if (_p && _p.type === 'access' && _p.kid === (await currentKeyGen(env))) {
                await bumpKeyGen(env);
            }
            const response = new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json' }
            });
            response.headers.append('Set-Cookie', 'refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/api/refreshToken; Max-Age=0');
            return response;
        }

        return new Response('Not Found', { status: 404, headers: corsHeaders(request, env) });
        } catch (e) {
            console.error('UNHANDLED', e, url.pathname, request.method);
            return new Response(JSON.stringify({ error: 'INTERNAL' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    }
};

// Verification harnesses import HTML_CONTENT and the icon functions from
// workers_copy.mjs (this file plus the export line appended by build_copy.ps1);
// the Workers runtime allows only a default export.