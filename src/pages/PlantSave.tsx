import React, { useState } from 'react';
import { 
  Alert,
  Image,
  Platform,
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DateTimerPicker, { Event } from '@react-native-community/datetimepicker';

import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';

import { savePlant } from '../services/storange';
import { Button } from '../componets/Button';
import { Plant } from '../model/plant';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png';

interface PlantSaveParams {
  plant: Plant,
}

export function PlantSave() {
  const [ selectedDateTime, setSelectedDateTime ] = useState(new Date());
  const [ showDatePickker, setShowDatePicker ] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();
  const route = useRoute();

  const { plant } = route.params as PlantSaveParams;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime) {
      if (isBefore(dateTime, new Date())) {
        setSelectedDateTime(new Date());
        Alert.alert('Data inválida!', 'Escolha uma data no futuro ⏰');
        return;
      }

      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePicker() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        description: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('Não foi possível salvar 😢');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            style={styles.tipImage}
            source={waterdrop}
          />
          <Text style={styles.tipDescription}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor  horário para ser lembrado:
        </Text>

        {showDatePickker && (
          <DateTimerPicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleChangeTime}>
          </DateTimerPicker>
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity 
            style={styles.changeDateButton}
            onPress={handleOpenDateTimePicker}
          >
            <Text style={styles.changeDateText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button
          title="Cadastrar planta"
          onPress={handleSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginVertical: 15,
  },
  plantAbout: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
  },
  controller: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
    backgroundColor: colors.white,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
    position: 'relative',
    bottom: 60,
  },
  tipImage: {
    height: 56,
    width: 56,
  },
  tipDescription: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify',
    color: colors.blue,
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 14,
    marginBottom: 5,
  },
  changeDateButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  changeDateText: {
    fontFamily: fonts.text,
    fontSize: 24,
    color: colors.heading,
  },
});