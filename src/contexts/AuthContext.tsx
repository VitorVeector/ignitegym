import { createContext, useState } from "react";
import { AuthContextProps, AuthContextProviderProps } from "src/Interfaces/types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        avatar: ""
    })

    function signIn(email, password) {
        setUser({
            id: "",
            name: "",
            email,
            avatar: ""
        })
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
} 