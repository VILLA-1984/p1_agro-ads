import {
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';

import { auth } from "@/firebase";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import Toast from "react-native-toast-message";

export default function Login() {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    async function onPress() {
        try{
            await signInWithEmailAndPassword(auth, usuario, senha);
            router.replace("/(tabs)/aluno");
        }catch(error: any){
            Toast.show({
                type: "error",
                text1: 'Erro!',
                text2: 'Usuário ou Senha inválidos!'
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.baseText}></Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsuario}
                value={usuario}
                placeholder="Usuário"
            />
            <TextInput
                style={styles.input}
                onChangeText={setSenha}
                value={senha}
                placeholder="Usuário"
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>Login</Text>
            </TouchableOpacity>

            <Toast />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    baseText: {
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 12
    },
});
