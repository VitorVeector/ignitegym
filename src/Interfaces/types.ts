import { UserDTO } from "@dtos/UserDTO";
import { ReactNode } from "react";

export interface IInputProps {
    placeholder: string;
}

export interface ISignInFormInputData {
    email: string,
    password: string
}

export interface ISignUpFormInputData {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
}

export interface IUpdateUserData {
    name: string,
    old_password: string,
    password: string,
    passwordConfirmation: string,
}

export type AuthContextProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>,
    isLoadingStorageUserData: boolean,
    signOut: () => Promise<void>,
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>
}

export type AuthContextProviderProps = {
    children: ReactNode;
}

export type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

export type HistoryCardProps = {
    group: string;
    name: string;
    hour: string
}