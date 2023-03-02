import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "@storage/storageConfig";

export const storageUserSave = async (user: UserDTO) => {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export const storageUserGet = async () => {
    const user = await AsyncStorage.getItem(USER_STORAGE);

    return user ? (JSON.parse(user) as UserDTO) : null;
}

export const storageUserOut = async () => {
    await AsyncStorage.removeItem(USER_STORAGE)
}