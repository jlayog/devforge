import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDarkMode(initialDark);
        applyTheme(initialDark);
    }, []);

    // Apply theme to document and localStorage
    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Toggle theme function
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        applyTheme(newDarkMode);
    };

    // Set specific theme function
    const setDarkMode = (dark: boolean) => {
        setIsDarkMode(dark);
        applyTheme(dark);
    };

    // Listen for external theme changes (from other tabs or direct DOM manipulation)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'theme') {
                const newDark = e.newValue === 'dark';
                setIsDarkMode(newDark);
                applyTheme(newDark);
            }
        };

        // Listen for DOM mutations to detect external class changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target as Element;
                    if (target === document.documentElement) {
                        const hasDarkClass = target.classList.contains('dark');
                        if (hasDarkClass !== isDarkMode) {
                            setIsDarkMode(hasDarkClass);
                        }
                    }
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            // Only apply system theme if no saved preference exists
            if (!localStorage.getItem('theme')) {
                setDarkMode(e.matches);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            observer.disconnect();
            window.removeEventListener('storage', handleStorageChange);
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [isDarkMode]);

    const value: ThemeContextType = {
        isDarkMode,
        toggleDarkMode,
        setDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// HOC for class-based components (if needed)
export const withTheme = <P extends object>(
    Component: React.ComponentType<P & ThemeContextType>
) => {
    return (props: P) => {
        const theme = useTheme();
        return <Component {...props} {...theme} />;
    };
};