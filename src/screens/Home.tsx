import React, { useState, useEffect } from "react"

import { HStack, VStack, FlatList, Heading, Text, Toast, useToast } from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { ExerciseCard } from "@components/ExerciseCard"
import { useNavigation } from "@react-navigation/native"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"


export const Home = () => {

    const navigation = useNavigation<AppRouteNavigationRoutesProps>()

    const [group, setGroup] = useState([])

    const [groupSelected, setGroupSelected] = useState<string>('peitoral');

    const [exercices, setExercices] = useState(["Puxada", "Remada"])

    const handleOpenExerciceDetails = () => {
        navigation.navigate("exercise")
    }

    const toast = useToast()

    const fetchGroups = async () => {
        try {
            const groups = await api.get("/groups")
            setGroup(groups.data)
        } catch (error) {
            const appError = error instanceof AppError
            const title = appError ? error.message : "Erro interno do servidor, tente novamente mais tarde"
            toast.show({ title, placement: "top", color: "red.500" })
        }
    }

    // const fetchExercises = async () => {
    //     try {
    //         const exercises = await api.get(`/exercises/bygroup/${groupSelected}`)
    //         console.log(exercises.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    useEffect(() => {
        fetchGroups()
    }, [])

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

            <VStack
                mx={8}>
                <HStack
                    justifyContent="space-between"
                    mb={3}
                >
                    <Heading fontFamily="heading"
                        color="gray.200"
                        fontSize="md"
                    >Exercícios</Heading>
                    <Text color="gray.200" fontSize="sm">{exercices.length}</Text>
                </HStack>
                <FlatList
                    data={exercices}
                    keyExtractor={item => item}
                    _contentContainerStyle={{ pb: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ExerciseCard onPress={handleOpenExerciceDetails} />
                    )} />

            </VStack>

        </VStack>
    )
}