import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet
} from 'react-native';

import { useState } from 'react';

export default function Login() {

    const [usuario, setUsuario] = useState('Jucaco');
    const [senha, setSenha] = useState('12345678');

    function onPress(){
        console.log('Usuário: ', usuario)
        console.log('Senha: ', senha)
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
                <Text>Press Here</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    },
});
