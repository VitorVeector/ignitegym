import React, { useState } from "react"

import { HStack, VStack, FlatList, Heading, Text } from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { ExerciseCard } from "@components/ExerciseCard"
import { useNavigation } from "@react-navigation/native"
import { AppRouteNavigationRoutesProps } from "@routes/app.routes"


export const Home = () => {

    const navigation = useNavigation<AppRouteNavigationRoutesProps>()

    const [group, setGroup] = useState(["peitoral", "costas", "bíceps", "tríceps", "ombro", "abdomem", "pernas"])
    const [groupSelected, setGroupSelected] = useState<string>('peitoral');
    const [exercices, setExercices] = useState(["Puxada", "Remada"])

    function handleOpenExercice() {
        navigation.navigate("exercise")
    }

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
                    <Heading
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
                        <ExerciseCard onPress={handleOpenExercice} />
                    )} />

            </VStack>

        </VStack>
    )
}