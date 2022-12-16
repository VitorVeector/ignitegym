import { Center, Spinner } from 'native-base'
import React from 'react'

export const Loading = () => {
    return (
        <Center flex={1} width="full" bg="gray.700">
            <Spinner color="green.500" />
        </Center>
    )
}