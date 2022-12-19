import React from "react"
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Text, Image, VStack, Heading, Icon } from "native-base"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

type ExerciceCard = TouchableOpacityProps & {

}

export const ExerciceCard = () => {
    return (
        <TouchableOpacity>
            <HStack
                bg="gray.500"
                alignItems="center"
                justifyContent="space-between"
                rounded="md"
                p={2}
                mb={3}>
                <Image
                    source={{ uri: "https://cienciadotreinamento.com.br/wp-content/uploads/2015/11/Lat-pulldown-3_2.jpg" }}
                    alt="Imagem do exercicio"
                    size={16}
                    resizeMode="center"
                    rounded="md"
                />
                <VStack>
                    <Heading
                        color="white"
                        fontSize="md">Puxada frontal</Heading>
                    <Text
                        color="gray.200"
                        fontSize="sm"
                        numberOfLines={1}>3 séries x 12 repetições</Text>
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