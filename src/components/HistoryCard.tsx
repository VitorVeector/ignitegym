import { HStack, VStack, Heading, Text } from "native-base"
import React from "react"

export const HistoryCard = () => {
    return (
        <HStack
            w="full"
            alignItems="center"
            justifyContent="space-between"
            bg="gray.600"
            rounded="md"
            p={4}
            mb={3}>
            <VStack>
                <Heading
                    fontSize="md"
                    color="white"
                >Costas</Heading>
                <Text
                    fontSize="lg"
                    color="gray.100">Puxada frontal</Text>
            </VStack>
            <Text
                fontSize="md"
                color="gray.300">08:45</Text>
        </HStack>
    )
}