import React, { ReactNode } from "react"

import { TouchableOpacity } from "react-native"
import { HStack, VStack, Heading, Icon, Text } from "native-base"
import { MaterialIcons } from '@expo/vector-icons'

import Body from '@assets/body.svg'
import { useNavigation } from "@react-navigation/native"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"

type ExerciseHeaderProps = {
    title: string;
    group: string
}

export const ExerciseHeader = ({title, group}: ExerciseHeaderProps) => {
    const navigation = useNavigation<AppRouteNavigationRoutesProps>()

    function handleNavigateHome() {
        navigation.goBack()
    }

    return (
        <HStack bg="gray.500" width="full" pt={16} pb={6} alignItems="center" >
            <VStack
                width="full"
                px={10}>
                <TouchableOpacity
                    onPress={handleNavigateHome}>
                    <Icon
                        as={MaterialIcons}
                        name="arrow-back"
                        color="green.500"
                        size={6}
                        mb={3} />
                </TouchableOpacity>
                <HStack
                    alignItems="center"
                    justifyContent="space-between">
                    <Heading fontFamily="heading"
                        flexShrink={1}
                        color="gray.100"
                        maxW="70%"
                        fontSize="xl">{title}</Heading>
                    <HStack
                        alignItems="center">
                        <Body />
                        <Text
                            ml={1.5}
                            color="gray.200">{group}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </HStack>

    )
}