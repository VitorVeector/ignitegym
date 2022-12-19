import React from 'react'

import GetOut from '@assets/GetOut.svg'

import { UserPhoto } from '@components/UserPhoto'

import { MaterialIcons } from '@expo/vector-icons'

import { HStack, Text, Heading, VStack, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'

export const HomeHeader = () => {
    return (
        <HStack bg="gray.500" width="full" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto size={16} source={{ uri: "https://github.com/vitorveector.png" }} alt="Foto de perfil do usuário" mr={4} />
            <HStack alignItems="center" flex={1} justifyContent="space-between">
                <VStack>
                    <Text color="gray.100" fontSize="md">Olá,</Text>
                    <Heading color="gray.100" fontSize="md">Vitor</Heading>
                </VStack>
                <TouchableOpacity>
                    <Icon
                        as={MaterialIcons}
                        name="logout"
                        color="gray.200"
                        size={7} />
                </TouchableOpacity>
            </HStack>

        </HStack>
    )
}