import React, { useState } from "react"

import { HStack, VStack } from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"

export const Home = () => {

    const [groupSelected, setGroupSelected] = useState('ombro');

    return (
        <VStack flex={1}>
            <HomeHeader />
            <HStack>
                <Group
                    groupName="peitoral"
                    isActive={groupSelected === "peitoral"}
                    onPress={() => setGroupSelected("peitoral")} />
                <Group
                    groupName="costas"
                    isActive={groupSelected === "costas"}
                    onPress={() => setGroupSelected("costas")} />
                <Group
                    groupName="bíceps"
                    isActive={groupSelected === "bíceps"}
                    onPress={() => setGroupSelected("bíceps")} />
                <Group
                    groupName="tríceps"
                    isActive={groupSelected === "tríceps"}
                    onPress={() => setGroupSelected("tríceps")} />
                <Group
                    groupName="ombro"
                    isActive={groupSelected === "ombro"}
                    onPress={() => setGroupSelected("ombro")} />
                <Group
                    groupName="abdomem"
                    isActive={groupSelected === "abdomem"}
                    onPress={() => setGroupSelected("abdomem")} />
                <Group
                    groupName="pernas"
                    isActive={groupSelected === "pernas"}
                    onPress={() => setGroupSelected("pernas")} />
            </HStack>

        </VStack>
    )
}