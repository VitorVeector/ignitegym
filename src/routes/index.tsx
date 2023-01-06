import React from "react"

import { Box, useTheme } from "native-base"

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";

export const Routes = () => {

    const { user } = useAuth()

    console.log(user)

    const nativeTheme = useTheme()
    const theme = DefaultTheme
    theme.colors.background = nativeTheme.colors.gray[700]

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={theme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}