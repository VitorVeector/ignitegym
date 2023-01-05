import { createContext } from "react";
import { AuthContextProps, AuthContextProviderProps } from "src/Interfaces/types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    return (
        <AuthContext.Provider value={{
            user: {
                id: "",
                name: "",
                email: "",
                avatar: ""
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
} 