import React from "react"

import { ExerciseHeader } from "@components/ExerciseHeader"

import { Center, Text, VStack, Image } from "native-base"

export const Exercise = () => {
    return (
        <VStack>
            <ExerciseHeader />
            <VStack p={8}>
                <Image
                    w="full"
                    h={80}
                    source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
                    alt="Nome do exercício"
                    mb={3}
                    resizeMode="cover"
                    rounded="lg"
                />
            </VStack>
        </VStack>
    )
}