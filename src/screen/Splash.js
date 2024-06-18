import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Utils/colors';

const Splash = ({navigation}) => {
  return (
    <View style={styles.viewtxt}>
      <View style={styles.viewMain}>
        <View style={styles.container}>
          <Text style={[styles.text, {color: colors.white}]}>C</Text>
        </View>
        <Text
          style={[styles.text, {marginLeft: wp('1.4%'), fontSize: hp('4%')}]}>
          lick The Pessi
        </Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  viewtxt: {
    flex: 1,
    backgroundColor: colors.lightwhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: wp('16%'),
    height: hp('7%'),
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-17deg'}],
  },
  text: {
    color: colors.darkBlack,
    fontSize: hp('3%'),
    fontWeight: '700',
  },
});
