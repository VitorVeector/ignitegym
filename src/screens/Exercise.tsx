import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Center, Text, VStack, Image, HStack, Icon, ScrollView, useToast, Box } from "native-base"

import Repetitions from "@assets/repetitions.svg"
import { ExerciseHeader } from "@components/ExerciseHeader"
import { Button } from "@components/Button"
import Series from "@assets/series.svg"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"
import { useNavigation, useRoute } from "@react-navigation/native"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { Loading } from "@components/Loading"
import { useAuth } from "@hooks/useAuth";

type RoutesParams = {
    exerciseId: string
}

export const Exercise = () => {
    const { user } = useAuth() 
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

    const toast = useToast()

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)


    const navigation = useNavigation<AppRouteNavigationRoutesProps>();

    const route = useRoute()

    const { exerciseId } = route.params as RoutesParams;

    const fetchExerciseDetails = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)
        } catch (err) {
            const isAppError = err instanceof AppError
            const title = isAppError ? err.message : "Não foi possível carregar os exercícios."

            toast.show({
                title,
                placement: 'bottom',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    const handleSetExerciseAsDone = async () => {
        try {
            setIsLoadingBtn(true)
            await api.post('/history', {exercise_id : exerciseId})

            toast.show({
                title: 'Exercise registered on your history.',
                placement: 'top',
                bg: 'green.700',
                mx: 4,
            })

            navigation.navigate('history')

        } catch (err) {
            const isAppError = err instanceof AppError
            const title = isAppError ? err.message : 'Unable to load exercise details.'

            toast.show({
                title,
                placement: 'top',
                bg: 'red.500',
                mx: 4,
            })
        } finally {
            setIsLoadingBtn(false)
        }
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])

    return (
        <VStack>
            <ExerciseHeader title={exercise.name} group={exercise.group} />

            {isLoading ? <Loading /> :
                <ScrollView>
                    <VStack p={8} mb={16}>
                        <Box borderRadius="md" 
                            w="full"
                            h={80} 
                            mb={3}
                            overflow="hidden">
                                <Image
                                    w="full"
                                    h="full"
                                    source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                                    alt={exercise.name}
                                    resizeMode="cover"
                                />
                        </Box>
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
                                value="Marcar como realizado" 
                                isLoading={isLoadingBtn}
                                onPress={handleSetExerciseAsDone}/>
                        </Center>
                    </VStack>
                </ScrollView>
            }

        </VStack>
    )
}
