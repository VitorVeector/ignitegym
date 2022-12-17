import React from "react";

import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";

type AppRoutes = {
    home: undefined,
    exercise: undefined
    history: undefined
    profile: undefined
}

export type AppRouteNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export const AppRoutes = () => {
    return (
        <Navigator>
            <Screen name="home" component={Home} />
            <Screen name="exercise" component={Exercise} />
            <Screen name="history" component={History} />
            <Screen name="profile" component={Profile} />
        </Navigator>
    )
}