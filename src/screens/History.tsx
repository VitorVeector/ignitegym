import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { VStack, Text } from "native-base"
import React from "react"

export const History = () => {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <VStack px={8} mt={10}>
                <HistoryCard />
            </VStack>
        </VStack>
    )
}