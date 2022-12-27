import { Center, Heading } from "native-base"
import React from "react"

type ScreenHeaderProps = {
    title: string
}

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
    return (
        <Center
            width="full"
            bg="gray.500"
            pt={16} pb={5}>
            <Heading fontFamily="heading" color="gray.100">{title}</Heading>
        </Center>
    )
}