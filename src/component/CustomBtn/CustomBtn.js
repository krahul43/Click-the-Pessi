import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../Utils/colors';

const CustomBtn = ({text, onPress}) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.mainView}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: wp('90%'),
    height: hp('7.1%'),
    backgroundColor: colors.darkBlack,
    marginTop: hp('7.5%'),
    borderRadius: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.darkBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  loadingState: {
    borderRadius: 50,
    width: wp('14%'),
    height: wp('14%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp('2.8%'),
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: colors.white,
    backgroundColor: 'transparent',
  },
});

export default CustomBtn;
