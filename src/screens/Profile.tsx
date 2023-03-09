import React, { useState } from "react"
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base"
import { TouchableOpacity, Alert } from "react-native"

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { api } from "@services/api"

import { UserPhoto } from "@components/UserPhoto"
import { ScreenHeader } from "@components/ScreenHeader"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useAuth } from "@hooks/useAuth"

import { Controller, useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IUpdateUserData } from "src/Interfaces/types"
import { AppError } from "@utils/AppError"

const PHOTO_SIZE = 33

const userUpdateDataSchema = yup.object({
    name: yup.string().required("Informe o nome.").min(3, "Mínimo de 3 caractéres."),
    password: yup.string().required("Digite uma senha.").min(8, "Mínimo de 8 caractéres."),
    passwordConfirmation: yup.string().oneOf([yup.ref('password.'), null], "As senhas não conferem.")
})


export const Profile = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const { user, updateUserProfile } = useAuth()

    const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false)

    const [imgUri, setImgUri] = useState('https://videotanfolyam.hu/images/blog/lead200/windows_10_bejelentkezes.png')

    const toast = useToast()

    const { control, handleSubmit, formState: { errors } } = useForm<IUpdateUserData>({
        resolver: yupResolver(userUpdateDataSchema),
        defaultValues: {
            name: '',
            old_password: '',
            password: '',
            passwordConfirmation: '',
        }
    })

    const handleUserPhotoSelect = async () => {
        try {
            setPhotoIsLoading(true)
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected.canceled) return

            const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

            if (photoInfo.size / 1024 / 1024 >= 5) {
                return toast.show({
                    title: "A imagem não pode ultrapassar 5MB!",
                    placement: "top",
                    bgColor: "red.500"
                })
            }

            const fileExtension = photoInfo.uri.split(".").pop()

            const photoFile = {
                name: `${user.name}.${fileExtension}`.toLowerCase(),
                uri: photoInfo.uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`
            } as any

            const userPhotoUploadForm = new FormData()
            userPhotoUploadForm.append('avatar', photoFile)

            const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const userUpdated = user
            userUpdated.avatar = avatarUpdatedResponse.data.avatar
            updateUserProfile(userUpdated)

            setImgUri(photoSelected.assets[0].uri)
        } catch (err) {
            throw err
        } finally {
            setPhotoIsLoading(false)
        }
    }

    async function handleProfileUpdate(data: IUpdateUserData) {
        try {
          setIsUpdating(true);
    
          const userUpdated = user;
          userUpdated.name = data.name;
    
          await api.put('/users', data);
    
          await updateUserProfile(userUpdated);
    
          toast.show({
            title: 'Perfil atualizado com sucesso!',
            placement: 'top',
            bgColor: 'green.500'
          });
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
    
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
          })
        } finally {
          setIsUpdating(false);
        }
      }

    return (
        <VStack flex={1}>
            <ScreenHeader title='Perfil' />
            <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
                <Center mt={6} px={10}>
                    {
                        photoIsLoading ? (
                            <Skeleton
                                isLoaded={!photoIsLoading}
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                            />
                        ) : (
                            <UserPhoto source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserPhotoImg} size={PHOTO_SIZE} alt="Foto do usuário" />
                        )
                    }

                    <TouchableOpacity
                        onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <VStack
                                w="full">
                                <Input
                                    isInvalid={!!errors.name?.message}
                                    bg="gray.600"
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Nome'
                                />
                                <Text
                                    color="red.500">
                                    {errors.name?.message}
                                </Text>
                            </VStack>
                        )} />

                    <Input
                        bg="gray.600"
                        value="job_vitoraraujo@outlook.com"
                        isDisabled
                    />
                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
                        Alterar senha
                    </Heading>

                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field: { onChange } }) => (
                            <VStack
                                w="full">
                                <Input
                                    bg="gray.600"
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                                <Text
                                    color="red.500">
                                    {errors.password?.message}
                                </Text>
                            </VStack>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <VStack
                                w="full">
                                <Input
                                    isInvalid={!!errors.password?.message}
                                    bg="gray.600"
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Nova senha"
                                    secureTextEntry
                                />
                                <Text
                                    color="red.500">
                                    {errors.password?.message}
                                </Text>
                            </VStack>
                        )} />

                    <Controller
                        control={control}
                        name="passwordConfirmation"
                        render={({ field: { onChange } }) => (
                            <VStack
                                w="full">
                                <Input
                                    bg="gray.600"
                                    placeholder="Confirme a nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.passwordConfirmation?.message}
                                />
                                <Text
                                    color="red.500">
                                    {errors.passwordConfirmation?.message}
                                </Text>
                            </VStack>
                        )}
                    />
                    <Button value="Atualizar" mt={4} onPress={handleSubmit(handleProfileUpdate)}/>
                </VStack>
            </ScrollView>
        </VStack>
    );
}
