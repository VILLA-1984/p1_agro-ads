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

const LstAlunos = () => {

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
          console.log("Erro ao consultar alunos:", error.code, error.message);
          Toast.show({
              type: "error",
              text1: "Erro",
              text2: "ERRO AO CONSULTAR DADOS: " + (error.code ?? error.message)
          })
      }
  },[]);

  useFocusRefresh(carregarAlunos);

  return (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <View>
                <Text style={styles.item}>{item.nome}</Text>
                <Text style={styles.item}>Idade: {item.idade}</Text>
                <Text style={styles.item}>Matrícula: {item.matricula}</Text>
            </View>
        )}
      />
      <Toast />
    </SafeAreaView>
  </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ffffff',
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

export default LstAlunos;

//Adicionar a regra ao firebase
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       // allow read, write: if request.time < timestamp.date(2026, 9, 30);
//       allow read, write: if request.auth != null;
//     }
//   }
// }