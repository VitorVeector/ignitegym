import React from "react";

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

export function SignIn() {
    const navigation = useNavigation<AuthNavigationRoutesProps>()

    function handleNavigateCreateAccount() {
        navigation.navigate("signUp")
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
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse a conta
                    </Heading>

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"

                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button value="Acessar" />
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
