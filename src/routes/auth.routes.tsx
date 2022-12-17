import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthProps = {
    signIn: undefined,
    signUp: undefined
}

export type AuthNavigationRoutesProps = NativeStackNavigationProp<AuthProps>

const { Navigator, Screen } = createNativeStackNavigator<AuthProps>();

export const AuthRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signIn" component={SignIn} />
            <Screen name="signUp" component={SignUp} />
        </Navigator>
    )
}