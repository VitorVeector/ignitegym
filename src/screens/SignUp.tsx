import React from "react";

import { AuthNavigationRoutesProps } from "@routes/auth.routes"

import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { ISignUpFormInputData } from "src/Interfaces/types";

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome.").min(3, "Mínimo de 3 caractéres."),
    email: yup.string().required("Informe o email.").email("E-mail inválido."),
    password: yup.string().required("Digite uma senha.").min(8, "Mínimo de 8 caractéres."),
    passwordConfirmation: yup.string().oneOf([yup.ref('password.'), null], "As senhas não conferem.")
})

export function SignUp() {
    const navigation = useNavigation<AuthNavigationRoutesProps>();

    function handleSignIn() {
        navigation.navigate("signIn")
    }

    const { control, handleSubmit, formState: { errors } } = useForm<ISignUpFormInputData>({
        resolver: yupResolver(signUpSchema),
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
                        render={({ field: { onChange, value } }) => (
                            <VStack w="full">
                                <Input
                                    isInvalid={!!errors.passwordConfirmation?.message}
                                    placeholder="Repita a senha"
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry
                                />
                                <Text color="red.500">{errors.passwordConfirmation?.message}</Text>
                            </VStack>

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