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

interface PlantCardSecundaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function PlantCardSecundary({
  data,
  ...rest
}: PlantCardSecundaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <View style={styles.imageContent}>
        <SvgFromUri 
          uri={data.photo} 
          width={50} 
          height={50}
        />
      </View>

      <Text style={styles.title}>
        {data.name}
      </Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>
          Regar às
        </Text>
        <Text style={styles.time}>
          {data.hour}
        </Text>
      </View>

    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 10,
    color: colors.heading,
  },
  imageContent: {
    width: 50,
    height: 50,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontFamily: fonts.text,
    fontSize: 16,
    color: colors.body_light,
  },
  time: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.body_dark,
    marginTop: 5,
  }
});
