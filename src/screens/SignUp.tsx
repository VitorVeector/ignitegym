import React from "react";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes"

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { Controller, useForm } from "react-hook-form"
import { ISignUpFormInputData } from "src/Interfaces/types";

export function SignUp() {
    const navigation = useNavigation<AuthNavigationRoutesProps>();

    function handleSignIn() {
        navigation.navigate("signIn")
    }

    const { control, handleSubmit, formState: { errors } } = useForm<ISignUpFormInputData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        }
    })

    const onSubmit = (data: ISignUpFormInputData) => {
        console.log(data)
        if (data.password !== data.passwordConfirmation) {
            return console.log("ERROR, As senhas não conferem!")
        }

        return console.log("Enviado")
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

                <Center my={24} mb={12}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: true,
                            pattern: {
                                value: /^.{3,}$/,
                                message: "Nome precisa ter no mínimo 3 caractéres."
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <VStack

                                w="full">
                                <Input
                                    isInvalid={!!errors.name?.message}
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                />
                                <Text
                                    color="red.500">
                                    {errors.name?.message}
                                </Text>
                            </VStack>

                        )} />


                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: true,
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
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <Text
                                    color="red.500">
                                    {errors.email?.message}
                                </Text>
                            </VStack>

                        )} />


                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                message: "Senha fraca."
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <VStack
                                w="full"
                            >
                                <Input
                                    isInvalid={!!errors.password?.message}
                                    placeholder="Senha"
                                    onChangeText={onChange}
                                    value={value}
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
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Repita a senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )} />

                    <Button mt={4} onPress={handleSubmit(onSubmit)} value="Criar e acessar" />
                </Center>

                <Button
                    onPress={handleSignIn}
                    value="Voltar para o login"
                    variant="outline"
                    mt={24}
                />
            </VStack>
        </ScrollView>
    );
}