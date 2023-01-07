import React, { useState } from "react";

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { ISignInFormInputData } from "src/Interfaces/types";

import { useAuth } from "@hooks/useAuth"

import { Controller, useForm } from "react-hook-form";
import { AppError } from "@utils/AppError";

export function SignIn() {
    const { signIn } = useAuth()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigation = useNavigation<AuthNavigationRoutesProps>()

    const { control, handleSubmit, formState: { errors } } = useForm<ISignInFormInputData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function handleNavigateCreateAccount() {
        navigation.navigate("signUp")
    }

    const onSubmit = async ({ email, password }) => {
        try {
            setIsLoading(true)
            await signIn(email, password)
        } catch (err) {
            const isAppError = err instanceof AppError
            const title = isAppError ? err.message : "Erro interno do servidor, tente novamente mais tarde!"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
            setIsLoading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />
                <Center my={24}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center>
                    <Heading fontFamily="heading" color="gray.100" fontSize="xl" mb={6} >
                        Acesse a conta
                    </Heading>

                    <Controller
                        control={control}
                        rules={{
                            required: "Por favor, informe o e-mail",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Endereço de e-mail inválido."
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <VStack
                                w="full">
                                <Input
                                    isInvalid={!!errors.email?.message}
                                    placeholder="E-mail"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <Text
                                    color="red.500">
                                    {errors.email?.message}
                                </Text>
                            </VStack>

                        )}
                        name="email" />


                    <Controller
                        control={control}
                        rules={{
                            required: "Por favor, informe a senha."
                        }}
                        render={({ field: { onChange, value } }) => (
                            <VStack
                                w="full">
                                <Input
                                    isInvalid={!!errors.password?.message}
                                    placeholder="Senha"
                                    value={value}
                                    onChangeText={onChange}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                                <Text color="red.500">
                                    {errors.password?.message}
                                </Text>
                            </VStack>

                        )}
                        name="password" />


                    <Button value="Acessar" onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
                </Center>

                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>
                </Center>

                <Button
                    onPress={handleNavigateCreateAccount}
                    value="Criar Conta"
                    variant="outline"
                />
            </VStack >
        </ScrollView >
    );
}
