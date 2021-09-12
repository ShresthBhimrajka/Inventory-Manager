import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Profile";
import ViewUsers from "./ViewUsers";

const ProfileScreen = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name='Users' component={ViewUsers} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default ProfileScreen;