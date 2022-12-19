import React from "react"

import { Text, Pressable, IPressableProps } from "native-base"

type GroupProps = IPressableProps & {
    groupName: string,
    isActive?: boolean
}

export const Group = ({ groupName, isActive, ...rest }: GroupProps) => {
    return (
        <Pressable
            mr={3}
            bg="gray.600"
            width={24}
            height={10}
            rounded="md"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            borderWidth={1}
            borderColor="gray.600"
            isPressed={isActive}
            {...rest}
            _pressed={{
                borderWidth: 1,
                borderColor: "green.500"
            }}
        >
            < Text
                color={isActive ? "green.500" : "gray.200"}
                fontWeight={isActive ? "bold" : "normal"}
                fontSize="xs"
                textTransform="uppercase"
            >
                {groupName}
            </ Text>
        </Pressable>

    )
}