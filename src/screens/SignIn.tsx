import React from 'react';
import { VStack, Image, Center, Text, Heading, Link, ScrollView } from 'native-base';
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export const SignIn = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <VStack flex={1} bg="gray.700" pb={16}>
                <Image
                    source={BackgroundImg}
                    alt="Duas pessoas se exercitando que representam o plano de fundo da aplicação."
                    resizeMode='contain'
                    position='absolute' />
                <Center my={24}>
                    <LogoSvg />
                    <Text color='gray.100' fontSize='sm'>Treine sua mente e seu corpo</Text>
                </Center>
                <Center mx={10}>
                    <Heading color='gray.100' fontSize='xl' mb={6}>Acesse sua conta</Heading>
                    <Center
                        mb={3}>
                        <Input
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCapitalize='none' />
                        <Input
                            placeholder='Senha'
                            secureTextEntry
                        />
                    </Center>
                    <Button value='Acessar' />
                </Center>
                <Center
                    mx={10}
                    mt={24}>
                    <Text
                        color='gray.100'
                        fontSize='md'
                        mb={3}>Ainda não tem acesso?</Text>
                    <Button value='Criar conta' variant='outline' />
                </Center>
            </VStack>
        </ScrollView>
    )
}