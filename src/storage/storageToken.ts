import AsyncStorage from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export const storageTokenSave = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}