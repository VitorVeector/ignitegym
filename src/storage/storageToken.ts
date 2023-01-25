import AsyncStorage from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export const storageTokenSave = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export const storageTokenGet = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
    return token;
}

export const storageTokenRemove = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}