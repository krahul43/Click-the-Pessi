import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Dimensions, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const colors = {
  darkBlack: '#000000',
  blue: '#0000FF',
  green: '#00FF00',
  red: '#FF0000',
  yellow: '#FFFF00',
  lightGrey: '#D3D3D3',
  white: '#FFFFFF',
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageSize = wp('20%'); // Image size as 20% of width
const bottomOffset = hp('2%'); // Distance from bottom
const bottomContainerHeight = hp('10%'); // Height of bottom container
const centerY = (screenHeight - imageSize) / 2 - hp('5%'); // Center minus offset

const Home = () => {
  const [clickCount, setClickCount] = useState(0); // State to store the total click count
  const [selectedImage, setSelectedImage] = useState(null);

  const animatedValue1 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue2 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue3 = React.useRef(new Animated.ValueXY()).current;
  const animatedValue4 = React.useRef(new Animated.ValueXY()).current;

  const animatedValues = [animatedValue1, animatedValue2, animatedValue3, animatedValue4];

  // useEffect to set initial positions
  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      animatedValue.setValue({
        x: index * (screenWidth / animatedValues.length),
        y: screenHeight - bottomContainerHeight - imageSize - bottomOffset,
      });
    });
  }, []);

  const moveImageToCenterOrRandom = (index) => {
    setClickCount(prevCount => prevCount + 1); // Increment total click count

    if (selectedImage === index) {
      // Move to a random position within bounds (upper half)
      const randomX = Math.random() * (screenWidth - imageSize);
      const randomY = Math.random() * centerY; // Only in upper area
      Animated.spring(animatedValues[index], {
        toValue: { x: randomX, y: randomY },
        useNativeDriver: false,
      }).start();
      setSelectedImage(null);
    } else {
      // Move to the center of the screen
      const centerX = (screenWidth - imageSize) / 2;
      Animated.spring(animatedValues[index], {
        toValue: { x: centerX, y: centerY },
        useNativeDriver: false,
      }).start();
      setSelectedImage(index);
    }
  };

  const resetPositions = () => {
    animatedValues.forEach((animatedValue, index) => {
      Animated.spring(animatedValue, {
        toValue: { x: index * (screenWidth / animatedValues.length), y: screenHeight - bottomContainerHeight - imageSize - bottomOffset },
        useNativeDriver: false,
      }).start();
    });
    setSelectedImage(null);
    setClickCount(0); // Reset click count
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Home</Text>
      <Text style={styles.clickCountTxt}>{`Total Clicks: ${clickCount}`}</Text>
      {animatedValues.map((animatedValue, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => moveImageToCenterOrRandom(index)}
          style={styles.imageContainer}
        >
          <Animated.View style={[
            styles.image,
            { transform: animatedValue.getTranslateTransform(), zIndex: selectedImage === index ? 1 : 0 }
          ]}>
            <Image source={require('../assets/pessi.jpeg')} style={styles.imageContent} />
          </Animated.View>
        </TouchableOpacity>
      ))}
      <View style={styles.doneButtonContainer}>
        <Button title="Done" onPress={resetPositions} />
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
  clickCountTxt: {
    color: colors.darkBlack,
    fontSize: hp('2.5%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  imageContainer: {
    position: 'absolute',
    width: imageSize,
    height: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
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
});
