import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('nexus-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        let activeTheme = theme;
        if (theme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            activeTheme = systemPrefersDark ? 'dark' : 'light';
        }

        root.classList.remove('light', 'dark');
        root.classList.add(activeTheme);
        localStorage.setItem('nexus-theme', theme);

        /* ── Swap favicon based on active theme ── */
        const isDark = activeTheme === 'dark';
        // .ico
        const ico = document.querySelector('link[rel="icon"][type="image/x-icon"]');
        if (ico) ico.href = isDark ? '/favicon-light.ico' : '/favicon.ico';
        // 32×32
        const f32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
        if (f32) f32.href = isDark ? '/favicon-light-32x32.png' : '/favicon-32x32.png';
        // 16×16
        const f16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
        if (f16) f16.href = isDark ? '/favicon-light-16x16.png' : '/favicon-16x16.png';
        // Apple touch icon
        const apple = document.querySelector('link[rel="apple-touch-icon"]');
        if (apple) apple.href = isDark ? '/apple-touch-icon-light.png' : '/apple-touch-icon.png';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
