import React, { useState } from "react"

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import { TouchableOpacity, Alert } from "react-native"
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base"

import { UserPhoto } from "@components/UserPhoto"
import { ScreenHeader } from "@components/ScreenHeader"
import { Input } from "@components/Input"
import { Button } from "@components/Button"


const PHOTO_SIZE = 33

export const Profile = () => {

    const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false)

    const [imgUri, setImgUri] = useState('https://github.com/vitorveector.png')

    const handleUserPhotoSelect = async () => {
        setPhotoIsLoading(true)

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected.canceled) return

            const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
            if (photoInfo.size / 1024 / 1024 >= 5) {
                return Alert.alert("Selecione uma imagem menor que 5Mb!")
            }
            console.log(photoInfo)

            setImgUri(photoSelected.assets[0].uri)
        } catch (err) {
            console.log(err)
        } finally {
            setPhotoIsLoading(false)
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
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"
                            />
                        ) : (
                            <UserPhoto
                                size={PHOTO_SIZE}
                                alt="Foto de perfil"
                                source={{ uri: imgUri }} />
                        )
                    }

                    <TouchableOpacity
                        onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>
                    <Input
                        bg="gray.600"
                        placeholder='Nome'
                    />
                    <Input
                        bg="gray.600"
                        value="job_vitoraraujo@outlook.com"
                        isDisabled
                    />
                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2}>
                        Alterar senha
                    </Heading>

                    <Input
                        bg="gray.600"
                        placeholder="Senha antiga"
                        secureTextEntry
                    />

                    <Input
                        bg="gray.600"
                        placeholder="Nova senha"
                        secureTextEntry
                    />

                    <Input
                        bg="gray.600"
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />

                    <Button value="Atualizar" mt={4} />
                </VStack>
            </ScrollView>
        </VStack>
    );
}

function setImage(uri: string) {
    throw new Error("Function not implemented.")
}
