const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Tab - RENVDER NAV</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23a855f7%3Bstop-opacity%3A1%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%237e22ce%3Bstop-opacity%3A1%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2224%22%20fill%3D%22url%28%23grad%29%22%2F%3E%3Cpolyline%20points%3D%2234%2C40%2060%2C64%2034%2C88%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%2211%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Crect%20x%3D%2268%22%20y%3D%2282%22%20width%3D%2230%22%20height%3D%2211%22%20rx%3D%222%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Share Tech Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
                        display: ['Orbitron', 'ui-sans-serif', 'sans-serif'],
                    },
                    colors: {
                        glass: {
                            border: 'rgba(168, 85, 247, 0.25)',
                            darkBorder: 'rgba(168, 85, 247, 0.15)',
                        },
                        // Cyberpunk terminal neutrals: purple-black instead of blue-grey
                        slate: {
                            50: '#f6f1ff', 100: '#ece2fd', 200: '#d7c3fb', 300: '#bb96f2',
                            400: '#9c6de6', 500: '#8347d1', 600: '#6931ab', 700: '#4c1f80',
                            800: '#2a1147', 900: '#170a29', 950: '#0a0414',
                        },
                        // Primary accent: neon purple/violet replacing the old green
                        emerald: {
                            50: '#faf0ff', 100: '#f3d9ff', 200: '#e6b3ff', 300: '#d685ff',
                            400: '#c04dff', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
                            800: '#5b1798', 900: '#3b0764',
                        },
                        // Secondary accent: neon cyan for contrast against the purple field
                        blue: {
                            100: '#cffafe', 300: '#67e8f9', 400: '#22d3ee',
                            600: '#0891b2', 900: '#083344',
                        },
                        teal: {
                            600: '#d926c9',
                        },
                        gray: {
                            100: '#f3edfb', 200: '#e6d9f7', 300: '#d0bdf0', 600: '#5f3a94',
                        },
                    },
                    
                    boxShadow: {
                        'glass': '0 4px 30px rgba(168, 85, 247, 0.15)',
                        'glass-hover': '0 10px 40px rgba(168, 85, 247, 0.25)',
                    }
                }
            }
        }
    </script>
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
        /* Subtle purple scanlines + grid, dark mode only */
        html.dark body::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -5;
            pointer-events: none;
            background-image:
                repeating-linear-gradient(0deg, rgba(168,85,247,0.05) 0px, rgba(168,85,247,0.05) 1px, transparent 1px, transparent 3px),
                linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px);
            background-size: auto, 42px 42px, 42px 42px;
            opacity: 0.5;
            mix-blend-mode: screen;
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
        /* ================ End Cyberpunk Terminal Theme ================ */
    </style>
        <script>
        // --- 主題管理邏輯 ---
        (() => {
            const htmlEl = document.documentElement;
            const storageKey = 'theme_preference';

            const setTheme = (theme) => {
                if (theme === 'dark') {
                    htmlEl.classList.add('dark');
                } else if (theme === 'light') {
                    htmlEl.classList.remove('dark');
                }
                localStorage.setItem(storageKey, theme);
            };

            const applyInitialTheme = () => {
                const savedTheme = localStorage.getItem(storageKey);
                if (savedTheme) {
                    setTheme(savedTheme);
                } else {
                    // 如果沒有手動選過，就根據系統偏好來決定
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        setTheme('dark');
                    } else {
                        setTheme('light');
                    }
                }
            };

            // 立即執行，確保網頁一載入就顯示正確顏色（防止閃爍）
            applyInitialTheme();

            // 監聽系統主題的實時變動
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // 除非使用者已經手動選過主題，否則才跟隨系統切換
                if (!localStorage.getItem(storageKey)) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            });

            // 提供給 UI 按鈕使用的全域方法
            window.updateTheme = (theme) => setTheme(theme);
        })();
    </script>
</head>

<body class="min-h-screen font-sans text-slate-800 dark:text-slate-100 selection:bg-emerald-200 dark:selection:bg-emerald-900 transition-colors duration-300">
    
    <!-- Background layer -->
    <div class="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-gray-100 dark:bg-[#0a0414]">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a0414] dark:to-[#170a29]"></div>
        <div class="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-300/30 dark:bg-indigo-600/20 rounded-full blur-[150px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/30 dark:bg-purple-600/20 rounded-full blur-[120px]"></div>
    </div>

    <!-- Top fixed navigation -->
    <div class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div class="backdrop-blur-md bg-gray-100/80 dark:bg-[#0a0414]/85 border-b border-slate-200/40 dark:border-slate-700/40 shadow-sm [transform:translateZ(0)]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 gap-4">
                    
                    <!-- Logo -->
                    <a class="flex items-center gap-2 flex-shrink-0 group cursor-pointer bg-white/50 dark:bg-transparent hover:bg-white dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-transparent transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5" href="#" onclick="location.reload()">
                        <div class="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-lg text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                        <span class="font-bold text-lg tracking-wide text-slate-700 dark:text-slate-100 hidden sm:block">RENVDER NAV</span>
                    </a>

                    <!-- Search Bar -->
                    <div class="flex-1 max-w-2xl mx-auto">
                        <div class="relative flex items-center w-full h-10 rounded-xl focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:shadow-lg focus-within:-translate-y-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-lg transition-all duration-300">
                            
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
                                            APP View
                                        </span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="layout-switch-checkbox" onchange="toggleAppLayout()" class="sr-only peer">
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
    <div id="dialog-overlay" class="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="dialog-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 border border-slate-100 dark:border-slate-700 dialog-scale-hidden">
            <h3 class="text-xl font-bold mb-5 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span class="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Edit Info
            </h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Name <span class="text-red-500">*</span></label>
                    <input type="text" id="name-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Site name">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">URL <span class="text-red-500">*</span></label>
                    <input type="text" id="url-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="https://...">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Description</label>
                    <input type="text" id="tips-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="A short description...">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Icon URL</label>
                    <input type="text" id="icon-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all dark:text-white" placeholder="Leave blank to auto-fetch">
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

                <div class="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="private-checkbox" class="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500 border-gray-300 bg-gray-100">
                    <label for="private-checkbox" class="text-sm text-slate-600 dark:text-slate-300 font-medium">Set as private link (visible only when logged in)</label>
                </div>
            </div>
            <div class="flex justify-end gap-3 mt-8">
                <button id="dialog-cancel-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button id="dialog-confirm-btn" class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition-all hover:translate-y-[-1px]">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Password Dialog -->
    <div id="password-dialog-overlay" class="fixed inset-0 z-[70] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
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
    <div id="custom-alert-overlay" class="fixed inset-0 z-[110] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="custom-alert-box" class="bg-white dark:bg-[#170a29] rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 id="custom-alert-title" class="text-lg font-bold mb-2 text-slate-800 dark:text-white">Notice</h3>
            <p id="custom-alert-content" class="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed"></p>
            <div class="flex justify-end">
                <button id="custom-alert-confirm" class="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">Got it</button>
            </div>
        </div>
    </div>

    <!-- Custom Confirm -->
    <div id="custom-confirm-overlay" class="fixed inset-0 z-[80] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
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
    <div id="category-dialog" class="fixed inset-0 z-[65] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overlay-hidden">
        <div id="category-dialog-box" class="bg-white dark:bg-[#170a29] rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-700 transform transition-all duration-300 dialog-scale-hidden">
            <h3 id="category-dialog-title" class="text-lg font-bold mb-4 text-slate-800 dark:text-white">Category Name</h3>
            <input type="text" id="category-name-input" class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none mb-6 dark:text-white transition-all" placeholder="Enter category name">
            <div class="flex justify-end gap-3">
                <button id="category-cancel-btn" class="px-4 py-2 text-sm rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 font-medium">Cancel</button>
                <button id="category-confirm-btn" class="px-4 py-2 text-sm rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 shadow-md font-medium">Confirm</button>
            </div>
        </div>
    </div>

    <div id="loading-mask" class="fixed inset-0 z-30 hidden flex flex-col items-center justify-center transition-opacity">
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
    let isAppLayout = localStorage.getItem('appLayout') === 'true';

    let editCardMode = false;
    let isEditCategoryMode = false;
    
    const categories = {};
    let currentEngine;
    let initialDragState = { category: null, index: -1 };

    let latencyResults = {};
    let checkAllRunning = false;

    function siteKey(url) {
        return String(url || '')
            .replace(/^[a-z]+:\\/\\//i, '')
            .replace(/\\/+$/, '')
            .toLowerCase();
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
            tag.textContent = 'Checking...';
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
            tag.textContent = 'Offline';
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
        if (statusEl) statusEl.textContent = 'Checking...';

        const links = getAllLinks().filter((l) => l && l.url);
        const total = links.length;

        if (total === 0) {
            checkAllRunning = false;
            if (statusEl) statusEl.textContent = '0 sites';
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

    function toggleAppLayout() {
        isAppLayout = !isAppLayout;
        localStorage.setItem('appLayout', isAppLayout);
        
        const checkbox = document.getElementById('layout-switch-checkbox');
        if (checkbox) checkbox.checked = isAppLayout;

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
        site:   '<svg width="16" height="16" fill="#FFD700" stroke="#FFD700" viewBox="0 0 24 24"><path fill="#FFD700" stroke="#FFD700" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
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

    function setActiveEngine(engine) {
        if (!searchEngines.hasOwnProperty(engine) && engine !== 'site') engine = 'site';
        selectSearchEngine(engine, searchEngineLabels[engine]);
    }

    function updateSearchEngineUI(value) {
        const label = searchEngineLabels[value] || "This site";
        const icon = searchEngineIcons[value] || searchEngineIcons['site'];
        
        document.getElementById('current-engine-label').textContent = label;
        document.getElementById('current-engine-icon').innerHTML = icon;
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const loadingMask = document.getElementById('loading-mask');
        if (loadingMask) loadingMask.classList.remove('hidden');
        initializeUIComponents();
        renderSearchEngineMenu();
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
        await loadLinks();
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
            
            const savePrefCheckbox = document.getElementById('save-preference-checkbox');
            if (savePrefCheckbox && savePrefCheckbox.checked) {
                localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
            }
        });

        if(elements.layoutSwitchCheckbox) {
            elements.layoutSwitchCheckbox.checked = isAppLayout;
        }
        
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
                localStorage.setItem('theme_preference', window.isDarkTheme ? 'dark' : 'light');
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
    
    async function loadLinks() {
        if (isLoggedIn) {
            const isValid = await validateToken();
            if (!isValid) {
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
            const response = await fetchWithAuth('/api/getLinks');
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

    async function saveDataToServer(actionName, data) {
        try {
            const response = await fetchWithAuth('/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categories: data }),
            });

            if (response.status === 401) {
                logout();
                await customAlert('Your login credentials have expired, please log in again');
                throw new Error('Unauthorized');
            }

            const result = await response.json();
            if (!result.success) throw new Error('Failed to save');
            logAction(actionName + ' succeeded', {});
        } catch (error) {
            logAction(actionName + ' failed', { error: error.message });
            if (error.message !== 'Unauthorized') {
                 await customAlert(actionName + ' failed, please try again');
            }
        }
    }

    async function saveLinks() {
        if (isEditMode) {
            await saveDataToServer('Save data', categories);
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
        categories[categoryName] = { isHidden: false, links: [] };
        updateCategorySelect();
        renderCategories();
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
        await saveLinks();
    }

    async function editCategoryName(oldName) {
        if (!await validateTokenOrRedirect()) return;
        const newName = await showCategoryDialog('Please enter the new category name', oldName);
        if (!newName || newName === oldName) return;
        if (categories[newName]) {
            await customAlert('This name already exists');
            return;
        }

        const keys = Object.keys(categories);
        const newCategories = {};

        keys.forEach(key => {
            if (key === oldName) {
                const data = categories[oldName];
                data.links.forEach(item => item.category = newName);
                newCategories[newName] = data;
            } else {
                newCategories[key] = categories[key];
            }
        });

        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);

        renderCategories();
        renderCategoryButtons();
        updateCategorySelect();
        await saveLinks();
    }

    async function deleteCategory(category) {
        if (!await validateTokenOrRedirect()) return;
        if (await customConfirm(\`Delete "\${category}" category and all its links?\`)) {
            delete categories[category];
            updateCategorySelect();
            renderCategories();
            renderCategoryButtons();
            await saveLinks();
        }
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
        const lowerQuery = query.toLowerCase();
        const result = {};
        Object.keys(categories).forEach(category => {
            const categoryData = categories[category];
            const matchedLinks = (categoryData.links || []).filter(link => {
                const nameMatch = link.name && link.name.toLowerCase().includes(lowerQuery);
                const tipsMatch = link.tips && link.tips.toLowerCase().includes(lowerQuery);
                const urlMatch = link.url && link.url.toLowerCase().includes(lowerQuery);
                return nameMatch || tipsMatch || urlMatch;
            });
            if (matchedLinks.length > 0) {
                result[category] = { ...categoryData, links: matchedLinks };
            }
        });
        return result;
    }

    function renderCategorySections({ renderButtons = false, searchMode = false, filteredCategories = null } = {}) {
        const container = document.getElementById('sections-container');
        setupCardDelegation(container);
        const fragment = document.createDocumentFragment();
        const sourceCategories = searchMode && filteredCategories ? filteredCategories : categories;

        Object.entries(sourceCategories).forEach(([category, { links, isHidden }]) => {
            if (!isEditMode && !isLoggedIn && isHidden && !searchMode) return;

            const section = document.createElement('div');
            section.className = 'section section-anchor';
            section.id = sectionId(category);
            section.dataset.category = category;

            // Title area
            const titleContainer = document.createElement('div');
            titleContainer.className = 'flex items-center gap-3 mb-5 pb-2 border-b border-slate-200/60 dark:border-slate-700/60';
            
            const title = document.createElement('h2');
            title.className = 'text-lg font-bold text-slate-700 dark:text-slate-100 flex items-center gap-2';
            const badge = document.createElement('span');
            badge.className = 'w-1.5 h-5 bg-emerald-500 rounded-full inline-block shadow-sm';
            title.append(badge, ' ' + category);
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

            // Card grid
            const cardContainer = document.createElement('div');
            // Adjust the grid column count based on layout mode
            // APP mode: 4 per row on mobile, 6 on tablet, 8-10 on large screens
            const gridClasses = isAppLayout 
                ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-2 gap-y-6' 
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';
            
            cardContainer.className = \`grid \${gridClasses} card-container relative\`;
            cardContainer.id = gridId(category); // Distinguish from section.id to avoid duplicate ids on the same page

            // Build cards off-screen then mount them once, to reduce reflow
            const cardsFragment = document.createDocumentFragment();
            links.forEach(link => {
                const card = createCard(link);
                if (card) cardsFragment.appendChild(card);
            });
            cardContainer.appendChild(cardsFragment);

            section.appendChild(titleContainer);
            section.appendChild(cardContainer);
            fragment.appendChild(section);

            if (isEditMode) {
                const addCardPlaceholder = document.createElement('div');
                const sizeClasses = isAppLayout 
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
                    if (draggedCard && draggedCard.parentElement === cardContainer) {
                        cardContainer.insertBefore(draggedCard, addCardPlaceholder);
                    }
                });
                
                addCardPlaceholder.onclick = () => {
                     showAddDialog();
                     document.getElementById('category-select-value').value = category;
                     document.getElementById('category-select-text').textContent = category;
                };
                cardContainer.appendChild(addCardPlaceholder);
            }
        });

        container.replaceChildren(fragment);

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
            
            btn.textContent = cat;
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

    function scrollToCategory(catId) {
        const section = document.getElementById(sectionId(catId));
        if(section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function setupScrollSpy() {
        const sections = document.querySelectorAll('.section');
        const buttons = document.querySelectorAll('.category-button');
        
        if (!sections.length || !buttons.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -70% 0px', 
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    highlightButton(id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    function highlightButton(id) {
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
    }
    
    function loadSections() {
        document.getElementById('clear-search-button').classList.add('hidden');
        document.getElementById('search-input').value = '';
        renderCategorySections({ renderButtons: true });
    }

    const imgApi = '/api/icon?url='; 
    const iconCache = new Map();
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
        
        let cardBaseClass = isAppLayout 
            ? 'flex flex-col items-center justify-start py-1 gap-1.5 hover:z-10' 
            : 'flex flex-col p-4 bg-white/90 dark:bg-[#170a29]/60 backdrop-blur-sm bg-white/80 border border-gray-200 dark:border-slate-700/50 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 shadow-sm hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-1.5';
            
        if (link.isPrivate && !isAppLayout) {
            cardBaseClass += ' ring-1 ring-amber-400/40 bg-amber-50/80 dark:bg-amber-900/10 !border-amber-200 dark:!border-amber-700/50';
        }

        card.className = \`group relative h-full w-full rounded-2xl transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer select-none \${cardBaseClass}\`;
        
        if (isEditMode) {
            card.setAttribute('draggable', 'true');
            card.classList.add('card'); 
            card.classList.add('cursor-move');
        }
        
        card.dataset.isPrivate = link.isPrivate;
        card.setAttribute('data-url', link.url);

        const header = document.createElement('div');
        header.className = isAppLayout 
            ? 'flex flex-col items-center justify-center w-full relative' 
            : 'flex items-center gap-3 mb-2.5 w-full';
        
        // Icon placeholder container: shows a spinner before the icon finishes loading
        const iconWrap = document.createElement('div');
        const iconWrapClass = isAppLayout
            ? 'relative w-14 h-14 sm:w-16 sm:h-16'
            : 'relative w-9 h-9';
        iconWrap.className = iconWrapClass;

        // Loading spinner (centered, beneath the icon)
        const spinner = document.createElement('span');
        spinner.className = 'absolute inset-0 flex items-center justify-center pointer-events-none';
        spinner.innerHTML = '<span class="block icon-spinner rounded-full animate-spin" style="width:60%;height:60%;aspect-ratio:1/1;"></span>';

        const icon = document.createElement('img');
        icon.setAttribute('loading', 'lazy'); 
        icon.setAttribute('decoding', 'async'); 
        icon.setAttribute('width', isAppLayout ? 64 : 36); 
        icon.setAttribute('height', isAppLayout ? 64 : 36);
        
        // Icon style
        let iconClass = 'relative w-full h-full opacity-0 transition duration-300';
        if (isAppLayout) {
             // APP style: large icon, white background, large corner radius, shadow
             iconClass += ' rounded-[1.2rem] object-contain bg-slate-100 dark:bg-slate-600 p-2 shadow-md hover:shadow-lg group-hover:scale-105 group-active:scale-95 z-10';
             if (link.isPrivate) {
                 iconClass += ' ring-2 ring-amber-400';
             }
        } else {
             // List style: small icon, light background
             iconClass += ' rounded-lg object-contain bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-700 transition-transform group-hover:scale-105 pointer-events-none';
        }
        icon.className = iconClass;

        let resolvedSrc;
        if (link.icon && link.icon.startsWith('http')) {
            resolvedSrc = link.icon;
        } else if (iconCache.has(link.url)) {
            resolvedSrc = iconCache.get(link.url);
        } else {
            resolvedSrc = imgApi + encodeURIComponent(link.url);
            iconCache.set(link.url, resolvedSrc);
        }
        let iconNode = icon;
        if (iconFailed.has(resolvedSrc)) {
            iconNode = createIconFallback(icon);
        } else {
            icon.src = resolvedSrc;
            icon.onload = function() {
                // Fade in the icon and hide the spinner once loading completes
                this.classList.add('opacity-100');
                this.classList.remove('opacity-0');
                spinner.remove();
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
        const titleAlign = isAppLayout 
            ? 'text-center text-xs sm:text-sm font-medium mt-1 w-[120%] truncate px-1 text-slate-700 dark:text-slate-200 drop-shadow-sm' 
            : 'font-semibold text-sm flex-1 truncate text-slate-700 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pointer-events-none';
        
        title.className = \`card-title pointer-events-none \${titleAlign}\`;
        title.textContent = link.name;
        
        header.appendChild(iconWrap);
        header.appendChild(title);

        const statusTag = document.createElement('span');
        statusTag.className = 'card-status-tag';
        statusTag.setAttribute('data-for', link.url);
        statusTag.textContent = '';
        header.appendChild(statusTag);

        card.appendChild(header);

        if (!isAppLayout) {
            const desc = document.createElement('div');
            desc.className = 'text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[1.25rem] card-tip leading-relaxed pointer-events-none w-full';
            desc.textContent = link.tips || '';
            card.appendChild(desc);
        }

        if (link.isPrivate && !isAppLayout) {
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
            actionWrapper.className = isAppLayout 
                ? 'absolute top-[-4px] right-[-4px] z-30' 
                : 'absolute top-2 right-2 z-30';

            const menuBtn = document.createElement('button');
            const btnStyle = isAppLayout
                ? 'w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:bg-emerald-500 dark:hover:bg-emerald-600 hover:text-white'
                : 'w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 backdrop-blur-sm';
            
            menuBtn.className = \`\${btnStyle} flex items-center justify-center transition-all duration-200\`;
            menuBtn.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>';
            
            const dropdown = document.createElement('div');
            dropdown.className = 'hidden absolute right-0 top-6 w-28 bg-white dark:bg-[#170a29] rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform origin-top-right transition-all z-50 flex flex-col p-1 card-menu-dropdown';
            
            dropdown.innerHTML = \`
                <button class="menu-edit w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Edit
                </button>
                <button class="menu-delete w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors flex items-center gap-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
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
            card.onclick = () => {
                 const target = safeUrl(link.url);
                 if (target) window.open(target, '_blank', 'noopener,noreferrer');
            };
        }


        if (!isEditMode && link.tips) {
            card.classList.add('has-tooltip');
            card.setAttribute('data-tooltip', link.tips);
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
            item.textContent = cat;
            item.onclick = () => {
                document.getElementById('category-select-value').value = cat;
                document.getElementById('category-select-text').textContent = cat;
                menu.classList.add('hidden');
            };
            menu.appendChild(item);
        });
    }

    // Incremental update: rebuild only a single category's card grid
    function renderCategoryGrid(category) {
        const grid = document.getElementById(gridId(category));
        const cat = categories[category];
        if (!grid || !cat) return;

        const cardsFragment = document.createDocumentFragment();
        cat.links.forEach(link => {
            const card = createCard(link);
            if (card) cardsFragment.appendChild(card);
        });

        // Only remove existing cards, keep the "+" placeholder in edit mode
        Array.from(grid.children).forEach(child => {
            if (!child.classList.contains('add-card-placeholder')) child.remove();
        });

        const placeholder = grid.querySelector('.add-card-placeholder');
        if (placeholder) {
            grid.insertBefore(cardsFragment, placeholder);
        } else {
            grid.appendChild(cardsFragment);
        }
    }

    async function addCard() {
        if (!await validateTokenOrRedirect()) return;
        const name = document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        const category = document.getElementById('category-select-value').value;
        
        if (!name || !url || !category) {
            await customAlert('Please fill in the required info (name, URL, category)');
            return;
        }

        const newLink = {
            name, url, category,
            tips: document.getElementById('tips-input').value.trim(),
            icon: document.getElementById('icon-input').value.trim(),
            isPrivate: document.getElementById('private-checkbox').checked
        };

        hideAddDialog();

        categories[category].links.push(newLink);
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

    async function updateCard(oldLink) {
        if (!await validateTokenOrRedirect()) return;
        
        const updatedLink = {
            name: document.getElementById('name-input').value.trim(),
            url: document.getElementById('url-input').value.trim(),
            tips: document.getElementById('tips-input').value.trim(),
            icon: document.getElementById('icon-input').value.trim(),
            category: document.getElementById('category-select-value').value,
            isPrivate: document.getElementById('private-checkbox').checked
        };

        let found = false;
        let oldCategory = null;

        // Fallback: if the form category is empty (can happen when legacy link.category is missing), fall back to oldLink's original category,
        // avoiding writing into categories[undefined]
        if (!updatedLink.category) {
            for (const c in categories) {
                if (categories[c].links.some(l => l.url === oldLink.url)) { updatedLink.category = c; break; }
            }
        }
        
        for (const cat in categories) {
             const idx = categories[cat].links.findIndex(l => l.url === oldLink.url);
             
             if (idx !== -1) {
                 found = true;
                 oldCategory = cat;
                 
                 if (cat === updatedLink.category) {
                     categories[cat].links[idx] = updatedLink;
                 } 
                 else {
                     categories[cat].links.splice(idx, 1);
                     
                     if(!categories[updatedLink.category]) {
                         categories[updatedLink.category] = { isHidden:false, links:[] };
                     }
                     categories[updatedLink.category].links.push(updatedLink);
                 }
                 break; 
             }
        }
        
        if (!found) {
             if(!categories[updatedLink.category]) {
                 categories[updatedLink.category] = { isHidden:false, links:[] };
             }
             oldCategory = updatedLink.category;
             categories[updatedLink.category].links.push(updatedLink);
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
        for (const cat in categories) {
            const idx = categories[cat].links.findIndex(l => l.url === url);
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
        if(!card) return { category: null, index: -1 };
        const section = card.closest('.section');
        const index = Array.from(section.querySelectorAll('.card')).indexOf(card);
        // Prefer data-category (the original category name), falling back to section.id (sanitized slug) for compatibility
        const category = section.dataset.category || section.id;
        return { category: category, index: index };
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
            if (newState.category !== initialDragState.category || newState.index !== initialDragState.index) {
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
        let item = null;
        for (const cat in categories) {
             const idx = categories[cat].links.findIndex(l => l.url === url);
             if (idx !== -1) {
                 item = categories[cat].links.splice(idx, 1)[0];
                 break;
             }
        }
        if(item) {
            item.category = newCategory;
            categories[newCategory].links.push(item);
        }
    }

    async function saveCardOrder() {
        const newCategories = {};
        const sections = document.querySelectorAll('.section');
        sections.forEach(sec => {
            // Use data-category (the original name) as the category key, matching the categories object keys; fall back to section.id
            const catName = sec.dataset.category || sec.id;
            const oldCat = categories[catName];
            newCategories[catName] = { isHidden: oldCat ? oldCat.isHidden : false, links: [] };
            
            const cards = sec.querySelectorAll('.card');
            cards.forEach(c => {
                 const url = c.getAttribute('data-url');
                 const original = Object.values(categories).flatMap(x=>x.links).find(l=>l.url === url);
                 if(original) {
                     original.category = catName;
                     newCategories[catName].links.push(original);
                 }
            });
        });
        
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);
        await saveDataToServer('Save order', categories);
    }

    function applyTheme(isDark) {
        if (isDark) {
             document.documentElement.classList.add('dark');
        } else {
             document.documentElement.classList.remove('dark');
        }
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
    
    function showAddDialog() {
        toggleOverlay('dialog-overlay', true);
        document.getElementById('name-input').value = '';
        document.getElementById('url-input').value = '';
        document.getElementById('tips-input').value = '';
        document.getElementById('icon-input').value = '';
        document.getElementById('private-checkbox').checked = false;
        
        document.getElementById('category-select-value').value = '';
        document.getElementById('category-select-text').textContent = 'Select a category';
        
        const btn = document.getElementById('dialog-confirm-btn');
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.onclick = addCard;
        
        document.getElementById('dialog-cancel-btn').onclick = hideAddDialog;
    }
    
    function showEditDialog(link) {
        toggleOverlay('dialog-overlay', true);
        document.getElementById('name-input').value = link.name;
        document.getElementById('url-input').value = link.url;
        document.getElementById('tips-input').value = link.tips || '';
        document.getElementById('icon-input').value = link.icon || '';
        document.getElementById('private-checkbox').checked = link.isPrivate;
        
        const linkCategory = link.category || (() => {
            for (const c in categories) if (categories[c].links.some(l => l.url === link.url)) return c;
            return '';
        })();
        document.getElementById('category-select-value').value = linkCategory;
        document.getElementById('category-select-text').textContent = linkCategory || 'Select a category';
        
        const btn = document.getElementById('dialog-confirm-btn');
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.onclick = () => updateCard(link);
        
        document.getElementById('dialog-cancel-btn').onclick = hideAddDialog;
    }
    
    function hideAddDialog() {
        toggleOverlay('dialog-overlay', false);
    }

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
                 var remMsg = 'Incorrect password';
                 var remaining = typeof data.remaining === 'number' ? data.remaining : 0;
                 if (remaining > 0) remMsg = 'Incorrect password, ' + remaining + ' attempt(s) remaining';
                 await customAlert(remMsg);
             }
         } catch(e) { await customAlert('Login Error'); }
    }

    // Single-flight refresh lock —— concurrent 401s trigger only one /api/refreshToken call
    let _refreshing = null;
    async function refreshOnce() {
        if (_refreshing) return _refreshing;
        _refreshing = (async () => {
            const r = await fetch('/api/refreshToken', { method: 'POST', credentials: 'include' });
            if (!r.ok) return null;
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
            try {
                const fresh = await refreshOnce();
                if (fresh) {
                    localStorage.setItem('authToken', fresh);
                    headers.Authorization = fresh;
                    options.headers = headers;
                    res = await fetch(url, options);
                } else {
                    throw new Error('Refresh token expired');
                }
            } catch (refreshError) {
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
            document.getElementById('category-dialog-title').innerText = title;
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
            document.getElementById('custom-confirm-message').innerText = msg;
            
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
             document.getElementById('custom-alert-content').innerText = msg;
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
                    content.innerText = 'Login is locked, please try again in ' + seconds + 's before trying again';
                    seconds--;
                } else {
                    clearInterval(timer);
                    content.innerText = 'Lockout period has ended, you can try logging in again';
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
                    showTooltip(e, text);
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

    function showTooltip(e, text) {
        const tooltip = document.getElementById('custom-tooltip');
        tooltip.textContent = text;
        tooltip.classList.remove('hidden');

        const offset = 12; 
        let left = e.clientX + offset;
        let top = e.clientY + offset;
        
        const tooltipRect = tooltip.getBoundingClientRect();
        
        if (left + tooltipRect.width > window.innerWidth) {
            left = e.clientX - tooltipRect.width - offset;
        }
        if (top + tooltipRect.height > window.innerHeight) {
            top = e.clientY - tooltipRect.height - offset;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function hideTooltip() {
        const tooltip = document.getElementById('custom-tooltip');
        if (tooltip && !tooltip.classList.contains('hidden')) {
            tooltip.classList.add('hidden');
        }
    }
    

    async function backupUserData() {
        try {
            const res = await fetchWithAuth('/api/backupData', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
            });
            if(res.status === 401) {
                logout();
                await customAlert('Your login credentials have expired, please log in again');
                return false;
            }
            const d = await res.json();
            return d.success;
        } catch(e) { return false; }
    }
    
    async function reloadCardsAsAdmin() {
         await loadLinks();
    }
    
    async function validateTokenOrRedirect() {
        const valid = await validateToken();
        if(!valid) {
            logout();
            await customAlert('Your login credentials have expired, please log in again');
            return false;
        }
        return true;
    }
    
    async function validateToken() {
        const t = localStorage.getItem('authToken');
        if(!t) return false;
        try {
            const r = await fetchWithAuth('/api/validateToken');
            return r.status === 200;
        } catch(e) { return false; }
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
                return { name: raw, tips: raw };
            }

            const name = raw.slice(0, idx).trim();
            const tips = raw.slice(idx).replace(/^[\\s|:：–—-]+/, '').trim();

            return {
                name: name || raw,
                tips: tips || raw
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
                links.push({ name: clean.name, url, tips: clean.tips, icon: '', category: null, isPrivate: false });
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
                categories['Uncategorized'].links.push({ name: clean.name, url, tips: clean.tips, icon: '', category: 'Uncategorized', isPrivate: false });
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
                        if (trimmed.startsWith('<!DOCTYPE') || /<(DL|H3)\b/i.test(trimmed)) {
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
                        if (!res.ok) throw new Error("Import failed");
                        await customAlert('Data imported successfully!');
                        location.reload(); 
                    } catch (error) {
                        console.error("Failed to parse file:", error);
                        await customAlert('Invalid file format, please check the file content!');
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
let ICON_API = 'https://api.xinac.net/icon/?url=';
let PREFER_ICON_API = true;

function resolveConfig(env) {
    if (env.DEFAULT_USER) DEFAULT_USER = env.DEFAULT_USER;
    if (env.ICON_API) ICON_API = env.ICON_API;
    if (env.PREFER_ICON_API !== undefined) PREFER_ICON_API = env.PREFER_ICON_API === 'true';
}

function base64UrlEncode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncodeUint8(arr) {
    const str = String.fromCharCode(...arr);
    return base64UrlEncode(str);
}

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
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
        const [name, value] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(value);
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
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
        return { isValid: false, status: 401, response: { error: 'Expired', message: 'Token expired' } };
    }

    if (payload.type !== 'access') {
        return { isValid: false, status: 403, response: { error: 'Forbidden', message: 'Wrong token type' } };
    }

    const gen = await currentKeyGen(env);

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
    try { v = await env.CARD_ORDER.get('__keygen__', 'text'); } catch (e) { console.warn('keygen read failed', e); }
    _genCache = { value: (v || '1'), expireAt: now + 60_000 };
    return _genCache.value;
}
async function bumpKeyGen(env) {
    try {
        const gen = String(Number((await currentKeyGen(env)) || '1') + 1);
        _genCache = { value: gen, expireAt: Date.now() + 60_000 };
        await env.CARD_ORDER.put('__keygen__', gen);
        return gen;
    } catch (e) {
        console.warn('keygen bump failed', e);
        return null;
    }
}

const CACHE = caches.default;
let _revCache = { value: null, expireAt: 0 };

async function getDataRev(env) {
    const now = Date.now();
    if (_revCache.value !== null && _revCache.expireAt > now) return _revCache.value;
    let rev = '0';
    try {
        rev = (await env.CARD_ORDER.get('__rev__', 'text')) || '0';
    } catch (e) { console.warn('rev read failed:', e); }
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

function ctxSafePut(key, res) {
    try { caches.default.put(key, res).catch(e => console.warn('cache put failed', e)); }
    catch (e) { console.warn('cache put failed', e); }
}

async function sendCached(body, request, cacheKey, cacheable, extraHeaders = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...extraHeaders,
        // Response headers are always no-store: avoids CDN/browsers caching public data by the bare URL; otherwise, after logging in, requests carrying
        // an Authorization header to the same URL would hit this anonymous cache and get filtered data, polluting the authenticated state
        'Cache-Control': 'no-store',
        'Vary': 'Accept-Encoding',
    };
    const res = new Response(body, { status: 200, headers });
    if (cacheable) ctxSafePut(cacheKey, res.clone());
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
        console.error('KV read failed:', e);
    }
    const { data } = safeJsonParse(dataStr, EMPTY_DATA);
    if (data) data.categories = normalizeCategories(data.categories || {});
    return data;
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
        const response = await fetch(targetUrl, {
            headers: headers,
            redirect: 'follow',
            signal: ctrl.signal
        });
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
                endTag() { headDone = true; },
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
        pushUrl(new URL('/favicon.ico', targetUrl).toString());
        pushUrl(new URL('/favicon.svg', targetUrl).toString());
        const deadline = Date.now() + 4000;
        for (const iconUrl of urls) {
            const ms = Math.min(1500, deadline - Date.now());
            if (ms <= 0) break;
            const res = await safeFetchIcon(iconUrl, ms, true);
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
const HOST_DENY = /(^|\.)(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|metadata\.google|i-1\.internal)/i;
// Only bitmaps are accepted; HTML/SVG/XML are never allowed through. SVG is only allowed for "trusted image hosts" (see allowSvg in safeFetchIcon)
const ICON_CT_OK = /^image\/(png|jpeg|gif|webp|ico|x-icon|vnd\.microsoft\.icon|avif|bmp)/i;

async function safeFetchIcon(target, ms = 3500, allowSvg = false) {
    let u;
    try { u = new URL(target); } catch { return null; }
    if (!ICON_SCHEME_OK.has(u.protocol)) return null;
    if (HOST_DENY.test(u.hostname)) return null;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ms);
    try {
        const res = await fetch(u.toString(), {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
            redirect: 'follow',
            signal: ctrl.signal,
        });
        if (!res.ok) return null;
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (allowSvg) {
            if (!ICON_CT_OK.test(ct) && ct !== 'image/svg+xml') return null;
        } else if (!ICON_CT_OK.test(ct)) {
            return null;
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

    const cacheKey = new Request(url.toString(), request);
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
            ...extraHeaders,
        }
    });
    // For an upstream Response that already passed the safeFetchIcon allowlist (bitmap/SVG), return it according to its real type.
    const buildRespFromUpstream = (upstream, extraHeaders = {}) => {
        const rawCt = (upstream.headers.get('content-type') || '').toLowerCase();
        const ct = rawCt === 'image/svg+xml' ? 'image/svg+xml' : 'image/png';
        return buildResp(upstream.body, { 'Content-Type': ct, ...extraHeaders });
    };
    if (response) {
        response = new Response(response.body, response);
        response.headers.set('X-Icon-Cache-Status', 'HIT');
    } else {
        let upstreamResponse = null;
        if (PREFER_ICON_API) {
            const upstreamApi = `${ICON_API}${encodeURIComponent(targetUrl)}`;
            upstreamResponse = await safeFetchIcon(upstreamApi, 3500, true);
            if (!upstreamResponse) {
                upstreamResponse = await safeFetchIcon(new URL('/favicon.ico', targetUrl).toString(), 3500);
                if (!upstreamResponse) {
                    upstreamResponse = await fetchBestIcon(targetUrl);
                }
            }
        } else {
            upstreamResponse = await safeFetchIcon(new URL('/favicon.ico', targetUrl).toString(), 3500);
            if (!upstreamResponse) {
                upstreamResponse = await fetchBestIcon(targetUrl);
            }
        }
        if (upstreamResponse) {
            response = buildRespFromUpstream(upstreamResponse, {
                'Cache-Control': 'public, max-age=604800, s-maxage=604800, immutable',
                'Access-Control-Allow-Origin': '*',
                'X-Icon-Cache-Status': 'MISS',
            });
            ctx.waitUntil(cache.put(cacheKey, response.clone()));
        } else {
            const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="display:block;width:100%;height:100%"><rect width="64" height="64" fill="white"/><path fill="black" d="M62 32C62 15.432 48.568 2 32 2C15.861 2 2.703 14.746 2.031 30.72c-.008.196-.01.395-.014.592c-.005.23-.017.458-.017.688v.101C2 48.614 15.432 62 32 62s30-13.386 30-29.899l-.002-.049zM37.99 59.351c-.525-.285-1.029-.752-1.234-1.388c-.371-1.152-.084-2.046.342-3.086c.34-.833-.117-1.795.109-2.667c.441-1.697.973-3.536.809-5.359c-.102-1.119-.35-1.17-1.178-1.816c-.873-.685-.873-1.654-1.457-2.52c-.529-.787.895-3.777.498-3.959c-.445-.205-1.457.063-1.777-.362c-.344-.458-.584-.999-1.057-1.354c-.305-.229-1.654-.995-2.014-.941c-1.813.271-3.777-1.497-4.934-2.65c-.797-.791-1.129-1.678-1.713-2.593c-.494-.775-1.242-.842-1.609-1.803c-.385-1.004-.156-2.29-.273-3.346c-.127-1.135-.691-1.497-1.396-2.365c-1.508-1.863-2.063-4.643-4.924-4.643c-1.537 0-1.428 3.348-2.666 2.899c-1.4-.507-3.566 1.891-3.535 1.568c.164-1.674 1.883-2.488 2.051-2.987c.549-1.638-2.453-1.246-2.068-2.612c.188-.672 2.098-1.161 1.703-1.562c-.119-.122-1.58-1.147-1.508-1.198c.271-.19 1.449.412 1.193-.37c-.086-.26-.225-.499-.357-.74a28 28 0 0 1 1.92-1.975c1.014-.083 2.066-.02 2.447.054c2.416.476 3.256 1.699 5.672.794c1.162-.434 5.445.319 6.059 1.537c.334.666 1.578-.403 2.063-.475c.52-.078 1.695.723 2.053.232c.943-1.291-.604-1.827 1.223-.833c1.225.667 3.619-2.266 2.861 1.181c-.547 2.485-2.557 2.54-4.031 4.159c-1.451 1.594 2.871 2.028 2.982 3.468c.32 4.146 2.531-.338 1.939-1.812c-1.145-2.855 1.303-2.071 2.289-.257c.547 1.007.963.159 1.633-.192c.543-.283.688 1.25.805 1.517c.385.887 1.65 1.152 1.436 2.294c-.238 1.259-1.133.881-2.008 1.094c-.977.237.158 1.059.016 1.359c-.154.328-1.332.464-1.646.65c-.924.544-.359 1.605-1.082 2.175c-.496.392-.996.137-1.092.871c-.113.865-1.707 1.143-1.5 1.97c.057.227.516 1.923.227 2.013c-.133.043-1.184-1.475-1.471-1.627c-.568-.301-3.15-.055-3.482 1.654c-.215 1.105 1.563 2.85 2.016 1.328c.561-1.873.828 1.091.693 1.207c.268.234 1.836-.385 1.371.7c-.197.459.193 1.656.889 1.287c.291-.154 1.041.31 1.172.061a2.14 2.14 0 0 1 .742-.692c.701-.41 1.75-.025 2.518.02c.469.027 4.313 2.124 4.334 2.545c.084 1.575 2.99 1.37 3.436 1.933c1.199 1.526.83.751-.045 2.706c-.441.984-.057 2.191-1.125 2.904c-.514.342-1.141.171-1.598.655c-.412.437-.25.959-.5 1.464c-.301.601-4.346 4.236-4.613 5.115c-.133.441-1.34.825-.322 1.248c.592.174-1.311 1.973-.396 2.718c.223.181.369.334.479.471c-.457.122-.91.233-1.369.333M35.594 4.237c-.039.145.02.316.271.483c.566.375-.162 1.208-.943.671c-.779-.537-2.531.241-2.41.644c.119.403.66.563 1.496.242c.834-.322 1.178.048 1.318.43c.096.259 0 .403-.027.752c-.025.349-.996.107-1.803.162c-.809.054-1.67-.162-1.645-.619c.027-.456-.861-1.289-1.391-1.637c-.529-.348.232-1.1.934-.537c.699.564.727-.107 1.535-.321c.459-.122.275-.305.119-.479q1.29.047 2.546.209m3.517 8.869c.605.164 1.656.929 1.656 1.291c0 .363-.477.817-.688.765c-1.523-.371-2.807-1.874-3.514-2.697c-1.234-1.435-1.156-.205-3.111-.826c-.5-.16-1.293-1.711-.768-2.476s1.131-.886 1.615-.683c.484.2 1.898-.645 2.223.362c.322 1.007 1.211 2.292 2.02 2.636c.81.342-.04 1.464.567 1.628m.485 4.673c.242.483-1.455-.564-1.859-1.047c-.402-.482-1.01-1.571-.523-2.054c.484-.482 1.57 1.005 2.141 1.33c1.129.645-.001 1.289.241 1.771m-8.594-7.315c.117-.161.365.242.586.645s-.084.971-.586.885c-.502-.084-.281-1.136 0-1.53m0-4.052s.473 1.154 0 .966s-.496-.671 0-.966m.096 3.65c-.135-.321-.166-1.64.162-2.04c.484-.59 1.266.564.74 1.02c-.525.457-.768 1.343-.902 1.02m-6.077 1.415c-.879-.063-.898-.823-1.02-1.226s-.85.765-1.586 0s.172-1.771.01-2.376c-.162-.604 1.736 0 2.02 0s1.051 1.248 1.252 1.227c.203-.02 1.293.987 1.293.584c0-.402.166-1.088.93-1.168c1.172-.121.121 1.289.08 1.838c-.039.549.891 1.504 1.232 1.907c.344.403-.867.686-1.07.443c-.201-.242-.727 0-1.172.322c-.443.322-1.656-.443-2.221-.685c-.566-.241 1.131-.804.252-.866m3.141-6.354c.781.269 1.225.51 1.609 0c.371-.492.654 1.073.385 1.502c-.27.431-.781.324-.863 0c-.08-.32-1.912-1.771-1.131-1.502m1.131 4.859c-.268-.35-.295-.752 0-1.047c.297-.295.201-.644.729-.751c.26-.054.295.348.295.724s.324.859 0 1.448c-.323.589-.754-.026-1.024-.374m2.205-5.969c-.012.074-.061.118-.184.106a.6.6 0 0 1-.236-.095q.21-.008.42-.011M25.389 5.15c.619 0 .539.418 1.051.719c.512.3.242-1.552.592-.854c.35.697 1.389 1.664.889 1.851c-.43.163-2.234.859-2.396.739s-.377-.63-.809-.739c-.432-.107-.889-1.127-1.186-1.1c-.113.01-.123-.184-.049-.442a28 28 0 0 1 1.572-.455c.058.158.146.281.336.281m13.519 30.025c-.645.666-1.756-.464-2.523-.424s-1.152-.765-1.818-.684c-.668.079.182-.847 1.111-.362c.927.483 3.756.925 3.23 1.47m12.93-22.934c-.188.24-.402.408-.607.585c-.605.524-1.736.484-1.898.846s-.566 1.489-1.98 1.494s-1.01 2.131-1.131 2.738s-.443 1.325-.848.801s-.566-.323-1.816-1.853s-.77-2.375-.365-2.818c.404-.442.566-1.49 0-1.329s-.889-.202-.768-.703s.727-.867 0-1.402s-.324-2.445-.889-4.189c-.566-1.745-1.334-.51-2.586-.443s-1.455-.873-.889-1.303a27.95 27.95 0 0 1 13.777 7.576"/></svg>';
            response = new Response(fallbackSvg, {
                status: 200,
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'public, max-age=604800, s-maxage=604800, immutable',
                    'Access-Control-Allow-Origin': '*',
                    'X-Icon-Cache-Status': 'DEFAULT',
                    'Cross-Origin-Resource-Policy': 'same-origin',
                },
            });
        }
    }

    return response;
}

const MIN_BACKUP_INTERVAL_MS = 10 * 60 * 1000; 

async function handleSmartBackup(env, currentData) {
    try {
        const list = await env.CARD_ORDER.list({ prefix: `backup_${DEFAULT_USER}_` });
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
const MAX_LINKS_TOTAL = 3000;
const MAX_NAME = 120, MAX_TIPS = 500, MAX_URL = 2048;
const URL_SCHEME_OK = new Set(['http:', 'https:']);

function validateCategories(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, reason: 'CATEGORIES_TYPE' };
    const keys = Object.keys(raw);
    if (keys.length > MAX_CATEGORIES) return { ok: false, reason: 'TOO_MANY_CATEGORIES' };

    let total = 0;
    for (const name of keys) {
        if (typeof name !== 'string' || name.length === 0 || name.length > MAX_NAME) {
            return { ok: false, reason: 'BAD_CATEGORY_NAME' };
        }
        const cat = raw[name];
        const links = Array.isArray(cat) ? cat : (cat && Array.isArray(cat.links) ? cat.links : null);
        if (!links) return { ok: false, reason: 'BAD_CATEGORY_SHAPE' };

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
        }
    }
    if (total > MAX_LINKS_TOTAL) return { ok: false, reason: 'TOO_MANY_LINKS' };
    return { ok: true };
}

function sanitizeCategories(raw) {
    const out = {};
    for (const name of Object.keys(raw)) {
        const cat = Array.isArray(raw[name]) ? { isHidden: false, links: raw[name] } : raw[name];
        out[name] = {
            isHidden: !!cat.isHidden,
            links: (cat.links || []).map(l => ({
                name: String(l.name).slice(0, MAX_NAME),
                url: String(l.url).slice(0, MAX_URL),
                tips: l.tips ? String(l.tips).slice(0, MAX_TIPS) : '',
                icon: l.icon ? String(l.icon).slice(0, MAX_URL) : '',
                isPrivate: !!l.isPrivate,
                isDirect: !!l.isDirect,
                // Preserve/backfill category ownership: prefer the given value, otherwise fall back to the containing category's key, so a missing link.category doesn't become an "undefined" category
                category: l.category ? String(l.category).slice(0, MAX_NAME) : name,
            })),
        };
    }
    return out;
}

async function readJsonBody(request, maxBytes = 8 * 1024 * 1024) {
    const len = Number(request.headers.get('content-length') || 0);
    if (len > maxBytes) return { ok: false, reason: 'TOO_LARGE' };
    let text;
    try { text = await request.text(); } catch { return { ok: false, reason: 'READ_FAILED' }; }
    if (text.length > maxBytes) return { ok: false, reason: 'TOO_LARGE' };
    try { return { ok: true, data: JSON.parse(text) }; }
    catch { return { ok: false, reason: 'BAD_JSON' }; }
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
                return handleIconProxy(request, ctx);
            }

        if (url.pathname === '/' || url.pathname === '/index.html') {
            const { etag, body } = await htmlMeta();

            if (request.headers.get('If-None-Match') === etag) {
                return new Response(null, {
                    status: 304,
                    headers: {
                        'ETag': etag,
                        'Cache-Control': 'public, max-age=60, s-maxage=300, must-revalidate',
                    },
                });
            }

            // Edge cache hit -> 0 origin requests
            const cacheKey = new Request(url.origin + '/', { method: 'GET' });
            const hit = await caches.default.match(cacheKey);
            if (hit) return hit;

            const res = new Response(body, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'ETag': etag,
                    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
                    'Vary': 'Accept-Encoding',
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

                const { password } = await request.json();
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
                    return r;
                }
            }

            const data = await readLinksKv(env);

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
            return sendCached(body, request, cacheKey, cacheable, { 'X-KV-Cache': 'MISS' });
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
                const currentData = await env.CARD_ORDER.get(DEFAULT_USER);
                
                if (currentData) {
                    ctx.waitUntil(handleSmartBackup(env, currentData));
                }

                await env.CARD_ORDER.put(DEFAULT_USER, JSON.stringify({ categories: sanitizeCategories(categories) }));

                const rev = await bumpRev(env);
                
                return new Response(JSON.stringify({ success: true, rev }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            } catch (e) {
                return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            }
        }

        if (url.pathname === '/api/backupData' && request.method === 'POST') {
            const validation = await validateServerToken(request.headers.get('Authorization'), env);
            if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            
            const sourceData = await env.CARD_ORDER.get(DEFAULT_USER);
            
            if(sourceData) {
                 const now = Date.now();
                 const date = new Date(now + 8 * 3600 * 1000);
                 const dateStr = date.toISOString().replace(/[:.]/g, '-');
                 await env.CARD_ORDER.put(`backup_${DEFAULT_USER}_${dateStr}`, sourceData, {
                     metadata: { timestamp: now }
                 });
                 
                 return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
            }
            return new Response(JSON.stringify({ success: false, error: 'User data not found' }), { status: 404, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
        }
        
        if (url.pathname === '/api/exportData' && request.method === 'POST') {
             const validation = await validateServerToken(request.headers.get('Authorization'), env);
             if (!validation.isValid) return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
             
             const data = await env.CARD_ORDER.get(DEFAULT_USER);
             return new Response(data || '{}', { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
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
             
             await env.CARD_ORDER.put(DEFAULT_USER, JSON.stringify(cleanData));

             const rev = await bumpRev(env);
             return new Response(JSON.stringify({ success: true, rev }), { status: 200, headers: { ...corsHeaders(request, env), 'Content-Type': 'application/json'} });
        }

        if (url.pathname === '/api/logout' && request.method === 'POST') {
            await bumpKeyGen(env);
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
