import profileSvg from '@assets/profile.svg'
import { HStack, Text, Heading, VStack } from 'native-base'
import React from 'react'

export const HomeHeader = () => {
    return (
        <HStack bg="gray.500" width="full" pt={16} pb={5} px={8} alignItems="center">
            <VStack>
                <Text>Olá</Text>
                <Heading>Vitor</Heading>
            </VStack>
        </HStack>
    )
}