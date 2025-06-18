import {Stack, useRouter, useSegments} from 'expo-router';
import { useEffect, useState } from 'react';
import auth, {FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, ActivityIndicator } from 'react-native';
 
 
export default function RootLayout(){
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
    const router = useRouter();
    const segments = useSegments();
 
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };
 
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
 
 
    useEffect(() => {
        if(initializing) return;
 
        const InAuthGroup = segments[0] === '(auth)';
 
        if (user && !InAuthGroup){
            router.replace('/(auth)/home');
        } else if (!user && InAuthGroup) {
            router.replace('/');
        }
    }, [user, initializing]);
 
    if (initializing)
        return (
            <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}
            >
                <ActivityIndicator size="large" />
            </View>
    );
 
    return(
        <Stack>
            <Stack.Screen name="index" options={{title: 'login'}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
        </Stack>
    )
}