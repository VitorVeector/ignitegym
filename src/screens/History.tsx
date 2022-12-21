import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { VStack, SectionList, Heading, Text } from "native-base"
import React, { useState } from "react"

export const History = () => {
    const [exercices, setExercices] = useState([{
        title: "18.12.22",
        data: ["Costas", "Biceps"]
    },
    {
        title: "19.12.22",
        data: ["Peitoral, Triceps"]
    }])

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <VStack px={8} mt={10}>
                <SectionList
                    sections={exercices}
                    renderItem={({ item }) => (
                        <HistoryCard />
                    )}
                    renderSectionHeader={({ section }) => (
                        <Heading
                            fontSize="md"
                            color="gray.100"
                            mb={3}>
                            {section.title}
                        </Heading>
                    )}
                    ListEmptyComponent={() => (
                        <Text textAlign="center" color="gray.300">Não há registro de treino. Vamos treinar!</Text>
                    )}
                />

            </VStack>
        </VStack>
    )
}