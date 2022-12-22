import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Center, Heading, Link, ScrollView, Skeleton, Text, VStack } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import { useState } from "react"
import { Input } from "@components/Input"
import { Button } from "@components/Button"


const PHOTO_SIZE = 33

export const Profile = () => {
    const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false)

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
                                source={{ uri: "https://github.com/vitorveector.png" }} />
                        )
                    }

                    <TouchableOpacity>
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