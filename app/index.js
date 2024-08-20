import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig'; 

export default function Inicio() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar o estado de autenticação do usuário
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(rotas)/primeira');
      }
      setLoading(false);
    });
    // Limpar a subscrição ao desmontar o componente
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#300030" />
      </View>
    );
  }

  return null;
}
