import { auth, db } from "@/utils/FirebaseConfig"; // Ajusta las rutas según tu proyecto
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useState } from "react";

type Role = "vaccinationAgent" | "fedeganManager" | "farmManager";

interface LoginContextInterface {
    login: (email: string, password: string) => Promise<Role | null>;
    register: (user: any) => Promise<boolean>;
    logout: () => Promise<void>;
    updateUser: (user: any) => Promise<void>;
    updateRole: (role: Role) => Promise<void>;
}

const LoginContext = createContext<LoginContextInterface | undefined>(undefined);

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error("useLogin must be used within a LoginProvider");
    return context;
};

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const login = async (email: string, password: string): Promise<Role | null> => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
            const role = userDoc.data().role as Role;
            setCurrentUser({ uid, ...userDoc.data() });
            return role;
        } else {
            return null;
        }
        } catch (error) {
        console.error("Login error:", error);
        return null;
        }
    };

    const register = async (user: any): Promise<boolean> => {
        try {
        const { email, password, ...userData } = user;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        await setDoc(doc(db, "users", uid), { ...userData, email });
        setCurrentUser({ uid, ...userData, email });
        return true;
        } catch (error) {
        console.error("Register error:", error);
        return false;
        }
    };

    const logout = async () => {
        try {
        await signOut(auth);
        setCurrentUser(null);
        } catch (error) {
        console.error("Logout error:", error);
        }
    };

    const updateUser = async (updatedUser: any): Promise<void> => {
        if (!currentUser) return;
        try {
        await updateDoc(doc(db, "users", currentUser.uid), updatedUser);
        setCurrentUser((prev: any) => ({ ...prev, ...updatedUser }));
        } catch (error) {
        console.error("Update user error:", error);
        }
    };

    const updateRole = async (role: Role): Promise<void> => {
        if (!currentUser) return;
        try {
        await updateDoc(doc(db, "users", currentUser.uid), { role });
        setCurrentUser((prev: any) => ({ ...prev, role }));
        } catch (error) {
        console.error("Update role error:", error);
        }
    };

    return (
        <LoginContext.Provider value={{ login, register, logout, updateUser, updateRole }}>
        {children}
        </LoginContext.Provider>
    );
};
