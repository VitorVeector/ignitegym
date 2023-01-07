import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthContextProviderProps } from "src/Interfaces/types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState<boolean>(true)

    const signIn = async (email, password) => {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password
            })
            setUser(data.user)
            storageUserSave(data.user)
        } catch (err) {
            throw err
        }
    }

    const loadUserData = async () => {
        try {
            const userLogged = await storageUserGet()
            if (userLogged) {
                setUser(userLogged)
            }
        } catch (err) {
            throw err
        } finally {
            setIsLoadingStorageUserData(false)
        }

    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, isLoadingStorageUserData }}>
            {children}
        </AuthContext.Provider>
    )
} 