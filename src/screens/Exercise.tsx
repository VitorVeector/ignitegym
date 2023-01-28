import React, { useEffect, useState } from "react"

import { ExerciseHeader } from "@components/ExerciseHeader"

import { Center, Text, VStack, Image, HStack, Icon, ScrollView } from "native-base"
import { Button } from "@components/Button"

import Repetitions from "@assets/repetitions.svg"
import Series from "@assets/series.svg"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"
import { useNavigation, useRoute } from "@react-navigation/native"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { ExerciseDTO } from "@dtos/ExerciseDTO"

type RoutesParams = {
    exerciseId: string
}

export const Exercise = () => {
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

    const navigation = useNavigation<AppRouteNavigationRoutesProps>();

    const route = useRoute()

    const { exerciseId } = route.params as RoutesParams;

    const fetchExerciseDetails = async () => {
        try {
            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)
        } catch (err) {
            const isAppError = err instanceof AppError
            const title = isAppError ? err.message : "Não foi possível carregar os exercícios."
            throw title
        }
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])

    console.log(exercise)

    return (
        <VStack>
            <ExerciseHeader title={exercise.name} group={exercise.group}/>
            <ScrollView>
                <VStack p={8} mb={16}>
                    <Image
                        w="full"
                        h={80}
                        source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                        alt={exercise.name}
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
                                    ml={2}>{exercise.series} séries</Text>
                            </HStack>
                            <HStack
                                alignItems="center">
                                <Repetitions width={24} />
                                <Text
                                    color="gray.200"
                                    fontSize="lg"
                                    ml={2}>{exercise.repetitions} repetições</Text>
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
