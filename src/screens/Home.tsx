import React, { useState, useEffect, useCallback } from "react"

import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base"

import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { ExerciseCard } from "@components/ExerciseCard"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { Loading } from "@components/Loading"


export const Home = () => {

    const navigation = useNavigation<AppRouteNavigationRoutesProps>()

    const [group, setGroup] = useState([])

    const [groupSelected, setGroupSelected] = useState('antebraço');

    const [exercices, setExercices] = useState<ExerciseDTO[]>([])

    const [isLoading, setIsLoading] = useState(false)

    const handleOpenExerciceDetails = (exerciseId: string) => {
        navigation.navigate("exercise", { exerciseId })
    }

    const toast = useToast()

    const fetchGroups = async () => {
        try {
            setIsLoading(true)
            const groups = await api.get("/groups")
            setGroup(groups.data)
        } catch (error) {
            const appError = error instanceof AppError
            const title = appError ? error.message : "Erro interno do servidor, tente novamente mais tarde"
            toast.show({ title, placement: "top", color: "red.500" })
        } finally {
            setIsLoading(false)
        }
    }

    const fetchExercisesByGroup = async () => {
        try {
            const response = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercices(response.data)
        } catch (err) {
            const isAppError = err instanceof AppError
            const title = isAppError ? err.message : "Não foi possível carregar os exercícios."
            throw title
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup()
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={group}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8, maxH: 10 }}
                my={10}
                maxH={10}
                minH={10}
                renderItem={({ item, index }) => {
                    if (index === group.length - 1) {
                        return (
                            <Group
                                groupName={item}
                                isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                                onPress={() => setGroupSelected(item)} />
                        )
                    } else {
                        return (
                            <Group
                                mr={3}
                                groupName={item}
                                isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                                onPress={() => setGroupSelected(item)} />)
                    }
                }} />

            {isLoading ? <Loading /> :

                <VStack
                    mx={8}>
                    <HStack
                        justifyContent="space-between"
                        mb={3}>
                        <Heading fontFamily="heading"
                            color="gray.200"
                            fontSize="md"
                        >Exercícios</Heading>
                        <Text color="gray.200" fontSize="sm">{exercices.length}</Text>
                    </HStack>

                    <FlatList
                        data={exercices}
                        keyExtractor={item => item.id}
                        _contentContainerStyle={{ pb: 16 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ExerciseCard exerciseInfo={item} onPress={() => handleOpenExerciceDetails(item.id)} />
                        )} />


                </VStack>}
        </VStack >
    )
}