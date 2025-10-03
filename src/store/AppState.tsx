import React, { createContext, useContext, useState } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./persist";
import { PersistGate } from "redux-persist/integration/react";

type AppContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppState({ children } : { children: React.ReactNode }) {
    const [language, setLanguage] = useState(() => {
		const storage = localStorage.getItem("Language");
	    return storage ? storage : "English";
	});

    const updateLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("Language", lang);
    };

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppContext.Provider
                    value={{
                        language: language,
                        setLanguage: updateLanguage
                    }}
                >
                    { children }
                </AppContext.Provider>
            </PersistGate>
        </Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("App context is not provided.");
    }
    return context;
};
