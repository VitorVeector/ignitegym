import React, { useState } from "react"

import { HStack, VStack, FlatList } from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { JsxElement } from "typescript"


export const Home = () => {

    const [exercices, setExercices] = useState(["peitoral", "costas", "bíceps", "tríceps", "ombro", "abdomem", "pernas"])
    const [groupSelected, setGroupSelected] = useState<string>('peitoral');

    return (
        <VStack flex={1}>
            <HomeHeader />
            <HStack>
                <FlatList
                    mt={10}
                    ml={8}
                    data={exercices}
                    keyExtractor={item => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Group
                            groupName={item}
                            isActive={groupSelected === item}
                            onPress={() => setGroupSelected(item)} />
                    )} />

            </HStack>
        </VStack>
    )
}