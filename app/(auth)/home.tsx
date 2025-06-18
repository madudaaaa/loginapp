import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import Item from '../../components/Itens'; // seu componente de lista
import BtnAdd from '../../components/AddButton'; // seu botão flutuante
import LoggedUser from '../../components/LoggedUser'; // seu componente de usuário logado

interface Tarefa {
  id: string;
  titulo: string;
}

const Page = () => {
  const user = auth().currentUser;
  const router = useRouter();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore()
      .collection('tarefas')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const lista = snapshot.docs.map(doc => ({
            id: doc.id,
            titulo: doc.data().titulo,
          }));
          setTarefas(lista);
        },
        error => {
          console.error('Erro ao buscar tarefas:', error);
          Alert.alert('Erro', 'Não foi possível carregar as tarefas');
        }
      );

    return () => unsubscribe();
  }, [user]);

  const handleDeleteTask = async (id: string) => {
    try {
      await firestore().collection('tarefas').doc(id).delete();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível excluir a tarefa');
    }
  };

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <LoggedUser email={user?.email ?? 'Convidado'} onLogout={handleLogout} />

      <Item
        data={tarefas}
        onDelete={handleDeleteTask}
        onEdit={(id, titulo) => router.push({ pathname:'(auth)/editar-tarefa', params: { id, titulo } })}
      />

      <BtnAdd onPress={() => router.push('/(auth)/nova-tarefa')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 22 },
});

export default Page;