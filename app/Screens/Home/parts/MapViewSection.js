import MapView, { Marker, Callout } from 'react-native-maps'
import { Div, Text } from 'react-native-magnus'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PlaceModal from './PlaceModal';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
            title={place.nameAr}
            coordinate={{ latitude: parseFloat(place.location.lat), longitude: parseFloat(place.location.lng) }}
            onPress={() => toggleModal(place)}
            style={{ width: 200, height: 200 }}
          >
            {/* <Callout>
              <Text w={20} h={20}>{place.nameAr}</Text>
            </Callout> */}
            <Div bg="white" w={50} h={50} rounded={10} p={10} position='relative'>
              {/* <Text mb={20} bg="red" position='absolute' top={-10} right={10} zIndex={100}> {place.nameAr}</Text> */}
              <FontAwesome name="building-o" size={24} color="black" />

            </Div>
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