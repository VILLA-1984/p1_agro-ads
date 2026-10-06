//////////////////
import { useFocusRefresh } from "@/hooks/use-focus-refresh";
import { useCallback, useState } from 'react';

import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { db } from "@/firebase";
import { addDoc, collection, getDocs } from 'firebase/firestore';

import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface Aluno{
    id: string;
    nome: string;
    idade: string;
    matricula: string;
}

const [alunos, setAlunos ] = useState<Aluno[]>([]);

const carregarAlunos = useCallback(async () => {
    try{
        const dados = await getDocs(collection(db, "alunos"));
        const lista: Aluno[] = dados.docs.map((d)=>({
            id: d.id,
            nome: d.data().nome,
            idade: d.data().idade,
            matricula: d.data().matricula,
        }));
        setAlunos(lista);
    }catch (error: any){
        Toast.show({
            type: "error",
            text1: "Erro",
            text2: "ERRO AO CONSULTAR DADOS"
        })
    }
},[]);

useFocusRefresh(carregarAlunos);

const lstAlunos = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <View>
                <Text style={styles.title}>{item.nome}</Text>
                <Text>Idade: {item.idade}</Text>
                <Text>Matrícula: {item.matricula}</Text>
            </View>
        )}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default lstAlunos;