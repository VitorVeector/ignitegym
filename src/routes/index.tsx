import { Box, useTheme } from "native-base"

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from "./auth.routes"
import { AppRoutes } from "./app.routes";

import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Routes = () => {

    const { user, isLoadingStorageUserData } = useAuth()

    const nativeTheme = useTheme()
    const theme = DefaultTheme
    theme.colors.background = nativeTheme.colors.gray[700]

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
          try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
              // Aqui você deve verificar se o token é válido ou não
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } catch (error) {
            setIsAuthenticated(false);
          }
        }
        checkAuthentication();
      }, []);
  

    if (isLoadingStorageUserData) {
        return <Loading />
    }

    return (
        <Box flex={1} bg='gray.700'>
            <NavigationContainer theme={theme}>
                {isAuthenticated ? <AuthRoutes /> : <AppRoutes />}
            </NavigationContainer>
        </Box>
    )
}