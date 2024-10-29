import { createContext, useState } from "react";

export const AuthContext = createContext({
    isAunthenticated: false,
    setIsAuthenticated: () => {},
    user: null,
    setUser: () => {},
})

export const AuthProvider = ({ children }) => {
    const [isAunthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ isAunthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}