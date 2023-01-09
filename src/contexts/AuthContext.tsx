import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageTokenSave } from "@storage/storageToken";
import { storageUserGet, storageUserOut, storageUserSave } from "@storage/storageUser";
import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthContextProviderProps } from "src/Interfaces/types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState<boolean>(true)

    const saveUserAndToken = async (user: UserDTO, token: string) => {
        try {
            setIsLoadingStorageUserData(true)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await storageUserSave(user)
            await storageTokenSave(token)
            setUser(user)
        } catch (err) {
            throw err
        } finally {
            setIsLoadingStorageUserData(false)
        }
    }

    const signIn = async (email, password) => {
        try {
            const { data } = await api.post("/sessions", {
                email,
                password
            })

            if (data.user && data.token) {
                saveUserAndToken(data.user, data.token)
            }
        } catch (err) {
            throw err
        }
    }

    const signOut = async () => {
        try {
            setIsLoadingStorageUserData(true)
            setUser({} as UserDTO)
            await storageUserOut()
        } catch (err) {
            throw err
        } finally {
            setIsLoadingStorageUserData(false)
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
        <AuthContext.Provider value={{ user, signIn, isLoadingStorageUserData, signOut }}>
            {children}
        </AuthContext.Provider>
    )
} 