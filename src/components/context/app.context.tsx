import { createContext, useContext, useEffect, useState } from "react";

type ThemeContext = "light" | "dark";

const AppContext = createContext<IAContext | null>(null);

interface IAContext {
    theme: ThemeContext;
    setTheme: (theme: ThemeContext) => void;
}

export const AppContextProvider = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeContext>(() => {
        const initialTheme = localStorage.getItem("theme") || "light";
        return initialTheme as ThemeContext;
    });

    useEffect(() => {
        const mode = localStorage.getItem("theme");
        if (mode) {
            setTheme(mode as ThemeContext);
            document.documentElement.setAttribute('data-bs-theme', mode);
        }
    }, [])

    return (
        <AppContext.Provider value={{
            theme, setTheme
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export const useCurrentApp = () => {
    const currentAppContext = useContext(AppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <AppContext.Provider>"
        );
    }

    return currentAppContext;
};
