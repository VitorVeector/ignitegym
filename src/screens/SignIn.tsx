import React from "react";

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { ISignInFormInputData } from "src/Interfaces/types";

import { Controller, useForm } from "react-hook-form";

export function SignIn() {
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

    const toast = useToast()

    const onSubmit = data => console.log(data)

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
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse a conta
                    </Heading>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Endereço de e-mail inválido."
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                        name="email" />
                    <Text
                        color="white">
                        {errors.email?.message}
                    </Text>

                    <Controller
                        control={control}
                        rules={{
                            required: "Por favor, informe a senha."
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        )}
                        name="password" />
                    <Text color="white">
                        {errors.password?.message}
                    </Text>

                    <Button value="Acessar" onPress={handleSubmit(onSubmit)} />
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
