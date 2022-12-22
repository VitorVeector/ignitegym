import React from "react"

import { ExerciseHeader } from "@components/ExerciseHeader"

import { Center, Text, VStack, Image, HStack, Icon, ScrollView } from "native-base"
import { Button } from "@components/Button"

import Repetitions from "@assets/repetitions.svg"
import Series from "@assets/series.svg"

export const Exercise = () => {
    return (
        <VStack>
            <ExerciseHeader />
            <ScrollView>
                <VStack p={8} mb={16}>
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
                        alt="Nome do exercício"
                        mb={3}
                        resizeMode="cover"
                        rounded="lg"
                    />
                    <Center
                        bg="gray.600"
                        px={4}
                        pt={5}
                        pb={4}
                        rounded="md">
                        <HStack
                            width="full"
                            justifyContent="space-around">
                            <HStack
                                alignItems="center">
                                <Series width={24} />
                                <Text
                                    color="gray.200"
                                    fontSize="lg"
                                    ml={2}>3 séries</Text>
                            </HStack>
                            <HStack
                                alignItems="center">
                                <Repetitions width={24} />
                                <Text
                                    color="gray.200"
                                    fontSize="lg"
                                    ml={2}>12 repetições</Text>
                            </HStack>
                        </HStack>
                        <Button
                            mt={6}
                            value="Marcar como realizado" />
                    </Center>
                </VStack>
            </ScrollView>

        </VStack>
    )
}