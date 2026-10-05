import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet
} from 'react-native';

import { useState } from 'react';
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { db } from "@/firebase";
import { addDoc, collection } from 'firebase/firestore';

export default function CadAluno() {

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');

    async function onPress() {
        try{
            await addDoc(collection(db, "alunos"),{
                nome: nome,
                idade: idade,
                email: email,
                matricula: matricula,
            });
            Toast.show({
                type: "success",
                text1: 'Sucesso!',
                text2: 'Usuário Cadastrado!'
            })
        }catch(error: any){
            Toast.show({
                type: "error",
                text1: 'Erro!',
                text2: 'Usuário Não Cadastrado!'
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.baseText}></Text>
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome do Aluno"
            />
            <TextInput
                style={styles.input}
                onChangeText={setIdade}
                value={idade}
                placeholder="Idade do aluno"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail do aluno"
            />
            <TextInput
                style={styles.input}
                onChangeText={setMatricula}
                value={matricula}
                placeholder="Matricula do aluno"
            />

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>Cadastrar</Text>
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
