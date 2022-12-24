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
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                            />
                        )} />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )} />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )} />

                    <Controller
                        control={control}
                        name="passwordConfirmation"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Repita a senha"
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                        )} />

                    <Button value="Criar e acessar" />
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