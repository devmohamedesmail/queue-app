import MapView, { Marker} from 'react-native-maps'
import { Div} from 'react-native-magnus'
import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../../context/ThemeContext';
import PlaceModal from './PlaceModal';
import colors from '../../../config/colors';
import * as Location from 'expo-location';
import CustomIconBtn from '../../../custom/CustomIconBtn';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomActivityIndicator from '../../../custom/CustomActivityIndicator';
import {darkMapStyle, lightMapStyle} from '../../../config/mapStyles'; // Assuming you have map styles defined here
const MapViewSection = ({ places }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme()
  const [selectedPlace, setSelectedPlace] = useState()
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [userRegion, setUserRegion] = useState(null);

  const toggleModal = (place) => {
    setSelectedPlace(place)
    setModalVisible(!isModalVisible);


  };

  const goToMyLocation = async () => {
    try {
      setLoading
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {

        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;


      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude,
            longitude,
          },
          zoom: 15,
          pitch: 0,
          heading: 0,
          altitude: 0,
        });
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('Error getting location:', error);
    } finally {
      setLoading(false)
    }
  };




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);


  return (
    <Div position='relative' h="100%">


      <MapView
        ref={mapRef}

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
        showsMyLocationButton={false}
        showsIndoors={true}
        style={{
          height: '100%',
        }}
        customMapStyle={theme === 'dark' ? darkMapStyle : lightMapStyle}
        initialRegion={userRegion || {
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


      <Div position="absolute" bottom={300} right={20}>
        {loading ? <CustomIconBtn icon={<CustomActivityIndicator />} /> : <CustomIconBtn icon={<FontAwesome6 name="location-arrow" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />} onPress={goToMyLocation} />}
        {/* <CustomIconBtn icon={<FontAwesome6 name="location-arrow" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />} onPress={goToMyLocation} /> */}
      </Div>





      <PlaceModal isModalVisible={isModalVisible} toggleModal={toggleModal} selectedPlace={selectedPlace} />


    </Div>
  )
}

export default MapViewSection