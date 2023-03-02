import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageTokenSave, storageTokenGet, storageTokenRemove } from "@storage/storageToken";
import { storageUserGet, storageUserOut, storageUserSave } from "@storage/storageUser";
import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthContextProviderProps } from "src/Interfaces/types";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState<boolean>(true)

    const updateUserAndToken = async (user: UserDTO, token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(user)
    }

    const storageUserAndTokenSave = async (user: UserDTO, token: string) => {
        try {
            setIsLoadingStorageUserData(true)
            await storageUserSave(user)
            await storageTokenSave(token)

        } catch (err) {
            throw err
        }  finally {
            setIsLoadingStorageUserData(false)
          }
    }

    const signIn = async (email, password) => {
        try {
            setIsLoadingStorageUserData(true)

            const { data } = await api.post("/sessions", {
                email,
                password
            })

            if (data.user && data.token) {
                await storageUserAndTokenSave(data.user, data.token)
                updateUserAndToken(data.user, data.token)

            }
        } catch (err) {
            throw err
        } finally {
            setIsLoadingStorageUserData(false)
        }
    }

    const signOut = async () => {
        try {
            setIsLoadingStorageUserData(true)
            setUser({} as UserDTO)
            await storageTokenRemove()
            await storageUserOut()
        } catch (err) {
            throw err
        } finally {
            setIsLoadingStorageUserData(false)
        }
    }

    async function updateUserProfile(userUpdated: UserDTO) {
        // try {
        //   setUser(userUpdated);
        //   await storageUserSave(userUpdated);
        // } catch (error) {
        //   throw error;
        // }
      }

    const loadUserData = async () => {
        try {
            setIsLoadingStorageUserData(true)
            const userLogged = await storageUserGet()
            const token = await storageTokenGet()
            if (userLogged && token) {
                updateUserAndToken(userLogged, token)
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
        <AuthContext.Provider value={{ user, signIn, isLoadingStorageUserData, signOut, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    )
} 