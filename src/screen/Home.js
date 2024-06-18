import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Utils/colors';
import LottieView from 'lottie-react-native';
import animation from './animation/gameover.json';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageSize = wp('20%'); // Image size as 20% of width
const bottomOffset = hp('2%'); // Distance from bottom
const bottomContainerHeight = hp('10%'); // Height of bottom container
const centerY = (screenHeight - imageSize) / 2 - hp('5%'); // Center minus offset

const Home = () => {
  const [clickCount, setClickCount] = useState(0); // State to store the total click count
  const [selectedImage, setSelectedImage] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const animatedValue1 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue2 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue3 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue4 = React.useRef(new Animated.ValueXY()).current;

  const animatedValues = [
    animatedValue1,
    animatedValue2,
    animatedValue3,
    animatedValue4,
  ];

  // useEffect to set initial positions
  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      animatedValue.setValue({
        x: index * (screenWidth / animatedValues.length),
        y: screenHeight - bottomContainerHeight - imageSize - bottomOffset,
      });
    });
  }, []);

  const moveImageToCenterOrRandom = index => {
    setClickCount(prevCount => prevCount + 1); // Increment total click count

    if (selectedImage === index) {
      // Move to a random position within bounds (upper half)
      const randomX = Math.random() * (screenWidth - imageSize);
      const randomY = Math.random() * centerY; // Only in upper area
      Animated.spring(animatedValues[index], {
        toValue: {x: randomX, y: randomY},
        useNativeDriver: false,
      }).start();
      setSelectedImage(null);
    } else {
      // Move to the center of the screen
      const centerX = (screenWidth - imageSize) / 2;
      Animated.spring(animatedValues[index], {
        toValue: {x: centerX, y: centerY},
        useNativeDriver: false,
      }).start();
      setSelectedImage(index);
    }
  };

  const resetPositions = () => {
    animatedValues.forEach((animatedValue, index) => {
      Animated.spring(animatedValue, {
        toValue: {
          x: index * (screenWidth / animatedValues.length),
          y: screenHeight - bottomContainerHeight - imageSize - bottomOffset,
        },
        useNativeDriver: false,
      }).start();
    });
    setSelectedImage(null);
    setClickCount(0);
    setGameOver(true);
    setTimeout(() => {
      setGameOver(false); 
    }, 2000); 
  };



  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{`Pessi Kill Count: ${clickCount}`}</Text>
      {gameOver && (
        <LottieView source={animation} autoPlay style={styles.lottieimage} />
      )}
      {animatedValues.map((animatedValue, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => moveImageToCenterOrRandom(index)}
          style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.image,
              {
                transform: animatedValue.getTranslateTransform(),
                zIndex: selectedImage === index ? 1 : 0,
              },
            ]}>
            <Image
              source={require('../assets/pessi.jpeg')}
              style={styles.imageContent}
            />
          </Animated.View>
        </TouchableOpacity>
      ))}
      <View style={styles.doneButtonContainer}>
        <TouchableOpacity
          onPress={() => resetPositions()}
          style={styles.mainView}>
          <Text style={styles.buttonText}>{'Done'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  txt: {
    color: colors.darkBlack,
    fontSize: hp('3%'),
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  imageContainer: {
    position: 'absolute',
    width: imageSize,
    height: imageSize,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieimage: {
    width: wp('100%'),
    height: hp('70%'),
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#28fffd',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  doneButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  mainView: {
    width: wp('60%'),
    height: hp('7.1%'),
    backgroundColor: colors.darkBlack,
    marginTop: hp('7.5%'),
    borderRadius: 32,
    alignSelf: 'center',
    marginHorizontal: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.darkBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
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
