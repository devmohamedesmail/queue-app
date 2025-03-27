import MapView, { Marker, Callout } from 'react-native-maps'
import { Div, Text, Button } from 'react-native-magnus'
import Modal from "react-native-modal";
import React, { useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../../config/colors';
import CustomButton from '../../../CustomComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const MapViewSection = ({ places }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();





  const toggleModal = (place) => {
    setModalVisible(!isModalVisible);

  };




  return (
    <Div position='relative' h="100%">


      <MapView
        provider="google"
        camera={{
          center: {
            latitude: 25.276987,
            longitude: 55.296249,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 10,
        }}

        showsScale={true}
        showsCompass={true}
        showsUserLocation={true}
        userLocationUpdateInterval={1000}
        followsUserLocation={true}
        userInterfaceStyle='light'
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        showsTraffic={true}
        showsBuildings={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}
        showsPointsOfInterest={true}

        style={{ height: '66%' }}
        initialRegion={{
          latitude: 25.276987,
          longitude: 55.296249,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

      >
        {places && places.length > 0 && places.map((place, index) => (
          <Marker
            key={place._id}
            coordinate={{ latitude: parseFloat(place.location.lat), longitude: parseFloat(place.location.lng) }}
          >

          </Marker>
        ))}
      </MapView>

    </Div>
  )
}

export default MapViewSection