import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO"
import { api } from "@services/api"
import { VStack, SectionList, Heading, Text } from "native-base"
import React, { useEffect, useState } from "react"

export const History = () => {
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

    const getHistoryInfo = async () => {
        try {
            const response = await api.get('/history')
            setExercises(response.data)
        } catch (err) {
            
        }
    }

    useEffect(()=>{
        getHistoryInfo()
    },[])

    return (
        <VStack flex={1}>
            <ScreenHeader title='Histórico de exercícios' />
            <SectionList
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                        {title}
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    )
}