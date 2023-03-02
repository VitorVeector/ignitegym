import React from "react"
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Text, Image, VStack, Heading, Icon } from "native-base"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { api } from "@services/api"

type ExerciseCard = TouchableOpacityProps & {
    exerciseInfo: ExerciseDTO
}

export const ExerciseCard = ({ exerciseInfo, ...rest }: ExerciseCard) => {
    return (
        <TouchableOpacity {...rest}>
            <HStack
                bg="gray.500"
                alignItems="center"
                justifyContent="space-between"
                rounded="md"
                p={2}
                mb={3}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exerciseInfo.thumb}` }}
                    alt="Imagem do exercicio"
                    size={16}
                    resizeMode="cover"
                    rounded="md"
                />
                <VStack>
                    <Heading
                        fontFamily="heading"
                        color="white"
                        fontSize="md"
                        maxW={160}
                    >{exerciseInfo.name}</Heading>
                    <Text
                        color="gray.200"
                        fontSize="sm"
                        numberOfLines={1}>{exerciseInfo.series} séries x {exerciseInfo.repetitions} repetições</Text>
                </VStack>
                <Icon
                    as={MaterialIcons}
                    name="chevron-right"
                    color="gray.300"
                    size={9} />
            </HStack>
        </TouchableOpacity>
    )
}