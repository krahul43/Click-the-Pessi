import React from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CustomBtn from '../component/CustomBtn/CustomBtn';
import colors from '../Utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({navigation}) => {
  const nextbtn = async () => {
    navigation.navigate("Home");
    AsyncStorage.setItem('isAppFirstLaunched', 'true');
  };
  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ImageBackground
          source={require('../assets/pessi.jpeg')}
          style={styles.image}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(245, 245, 245, 0)', 'rgba(245, 245, 245, 1)', 'rgba(245, 245, 245, 1)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.3}}>
            <View style={styles.txtView}>
              <Text style={styles.txtlite}>Click the Pessi to gain points. {'\n'} The Ronaldo shows where you {'\n'} had clicked last! </Text>
              <Text style={styles.txtsublite}>
              Have Fun!
              </Text>
            </View>
            <CustomBtn text='Get Started' onPress={()=>nextbtn()}/>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};


export default Onboarding;

const styles = StyleSheet.create({
    container: {
      flex: 1,
         resizeMode:'contain'
    },
    gradient: {
      marginTop:hp('50%'),
      height:hp('100%')
    },
    image: {
      width: wp('100%'),
      height: hp('70%%'),
   
    },
    txtView: {
      marginTop: hp('19%'),
    },
    txtlite: {
      fontSize: hp('3.1%'),
      color: colors.darkBlack,
      fontWeight: '800',
      textAlign: 'center',
    },
    txtsublite: {
        fontSize: hp('2.1%'),
        fontWeight: '400',
        color:colors.lightGray,
        marginTop: hp('1.3%'),
        textAlign: 'center',
      },
  });