import { useLogin } from "@/context/loginContext/LoginContext"; // Ajusta la ruta si es necesario
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RegisterScreen = ({ navigation }: any) => {
    const { register } = useLogin();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"vaccinationAgent" | "fedeganManager" | "farmManager">("farmManager");

    const handleRegister = async () => {
        if (!email || !password || !name || !role) {
        Alert.alert("Error", "Todos los campos son obligatorios");
        return;
        }

        const success = await register({
        email,
        password,
        name,
        role,
        });

        if (success) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        navigation.navigate("Login"); // O a la pantalla principal según el rol
        } else {
        Alert.alert("Error", "No se pudo registrar el usuario");
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>

        <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <Text style={styles.label}>Selecciona tu rol:</Text>
        {["farmManager", "vaccinationAgent", "fedeganManager"].map((r) => (
            <TouchableOpacity
            key={r}
            style={[
                styles.roleButton,
                role === r && styles.selectedRoleButton
            ]}
            onPress={() => setRole(r as any)}
            >
            <Text style={styles.roleText}>{r}</Text>
            </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 8
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    },
    roleButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 6,
        marginBottom: 10
    },
    selectedRoleButton: {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50"
    },
    roleText: {
        color: "#000",
        textAlign: "center"
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 14,
        borderRadius: 8,
        marginTop: 20
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    }
});
