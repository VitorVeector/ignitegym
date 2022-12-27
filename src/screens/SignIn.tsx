import React from "react";

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { ISignInFormInputData } from "src/Interfaces/types";

import { AuthNavigationRoutesProps } from "@routes/auth.routes";

const signInSchema = yup.object({
    email: yup.string().required("Informe seu e-mail.").email("Informe um e-mail válido."),
    password: yup.string().required("Informe sua senha.")
})

export function SignIn() {
    const navigation = useNavigation<AuthNavigationRoutesProps>()

    const { control, handleSubmit, formState: { errors } } = useForm<ISignInFormInputData>({
        resolver: yupResolver(signInSchema),
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
                                <Text color="red.500">{errors.password?.message}</Text>
                            </VStack>

                        )}
                        name="password" />


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
