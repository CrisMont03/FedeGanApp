import { LoginProvider } from "@/context/loginContext/LoginContext"; // Asegúrate de que la ruta sea correcta
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <LoginProvider>     
            <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="menuCliente/index" options={{ title: "Menu del Cliente" }} />
            <Stack.Screen name="menuChef/index" options={{ title: "Menu del Cashier" }} />
            <Stack.Screen name="menuCachier/index" options={{ title: "Menu del Chef" }} />
            </Stack> 
        </LoginProvider>
    );
}