import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({
  data,
  ...rest
}: PlantCardPrimaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <View style={styles.imageContent}>
        <SvgFromUri 
          uri={data.photo} 
          width={70} 
          height={70}
        />
      </View>
      <Text style={styles.title}>
        {data.name}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: '45%',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
    marginVertical: 16,
  },
  imageContent: {
    width: 70,
    height: 70,
  }
});
