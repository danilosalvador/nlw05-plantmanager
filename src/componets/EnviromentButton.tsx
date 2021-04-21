import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnviromentButton({ 
  title, 
  active = false, 
  ...rest 
}: EnviromentButtonProps) {

  return (
    <RectButton 
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.title,
          active && styles.titleActive
        ]}  
      >
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: colors.shape,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  title: {
    fontFamily: fonts.text,
    color: colors.heading,
  },
  titleActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});
