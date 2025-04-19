import MapView, { Marker, Callout } from 'react-native-maps'
import { Div, Text } from 'react-native-magnus'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PlaceModal from './PlaceModal';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Callout } from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import colors from '../../../config/colors';

const MapViewSection = ({ places }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme()
  const { t, i18n } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState()





  const toggleModal = (place) => {
    setSelectedPlace(place)
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

        style={{
          height: '100%',
        }}
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
            title={place.nameAr}
            coordinate={{ latitude: parseFloat(place.location.lat), longitude: parseFloat(place.location.lng) }}
            onPress={() => toggleModal(place)}
            style={{ width: 200, height: 200 }}
          >
           
          </Marker>
        ))}
      </MapView>




      {/* modal Start */}
      <PlaceModal isModalVisible={isModalVisible} toggleModal={toggleModal} selectedPlace={selectedPlace} />
      {/* modal End */}

    </Div>
  )
}

export default MapViewSection