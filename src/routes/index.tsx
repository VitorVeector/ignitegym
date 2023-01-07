import { Box, useTheme } from "native-base"

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export const Routes = () => {

    const { user, isLoadingStorageUserData } = useAuth()

    const nativeTheme = useTheme()
    const theme = DefaultTheme
    theme.colors.background = nativeTheme.colors.gray[700]

    if (isLoadingStorageUserData) {
        return <Loading />
    }

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={theme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}