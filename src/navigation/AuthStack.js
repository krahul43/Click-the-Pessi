import React, {useState, useEffect, FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screen/Splash';
import Onboarding from '../screen/Onboarding';
import Home from '../screen/Home';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null);
  const [showWellcome, setShowWellcome] = useState(true);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        setIsFirstTimeUser(appData);
        setTimeout(() => {
          setShowWellcome(false);
        }, 2000); 
      } catch (error) {
        console.error('Error checking first-time user:', error);
      }
    };
    checkFirstTimeUser();
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {showWellcome ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : null}
        {isFirstTimeUser == null ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
