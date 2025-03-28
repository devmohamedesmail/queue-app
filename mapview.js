import MapView, { Marker, Callout } from 'react-native-maps'
import { Div, Text, Button } from 'react-native-magnus'
import places from '../../../config/places'
import Modal from "react-native-modal";
import React, { useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../../config/colors';
import CustomButton from '../../../CustomComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const MapViewSection = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState()
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState([]);
  const { t, i18n } = useTranslation();
  const [places, setPlaces] = useState([]);




  const toggleModal = (place) => {
    setModalVisible(!isModalVisible);

  };


  // Define styles for both light and dark mode (background only)
  const lightModeStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"  // Light background for light theme
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"  // Ensure labels are visible in both modes
        }
      ]
    }
  ];

  const darkModeStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c3e50"  // Dark background for dark theme
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"  // Ensure labels are visible in both modes
        }
      ]
    }
  ];


  // Set the map style based on the current theme
  useEffect(() => {
    if (theme === 'dark') {
      setMapStyle(darkModeStyle);
    } else {
      setMapStyle(lightModeStyle);
    }
  }, [theme]);


const fetchPlaces = async () => {
  try {
    const response = await fetch('https://queue-app-express-js.onrender.com/api/v1/places');
    const data = await response.json();
  
    setPlaces(data.data);
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
  fetchPlaces();
},[])


  return (
    <Div position='relative'>

      <MapView style={{ height: '100%' }}
        provider='google'
        // initialRegion={{
        //   latitude: 25.276987,
        //   longitude: 55.296249,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        showsUserLocation={true}
       
        followUserLocation={true}
      // customMapStyle={mapStyle} 
      >
        {places.map((marker, index) => (
          <>
            <Marker

              key={marker._id}
              coordinate={{ latitude: marker.location.lat, longitude: marker.location.lng }}
              title={marker.nameEn}
              onPress={() => { toggleModal(marker) }}
            >
              <Callout>
                <Text>{marker.title}</Text>
              </Callout>
            </Marker>

          </>
        ))}
      </MapView>


      <Button position='absolute' top="60%" right={15} p={0} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} shadow="sm" w={40} h={40} >
        <FontAwesome6 name="location-arrow" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} />
      </Button>


      <Modal isVisible={isModalVisible} animationIn="bounceIn" animationOut="bounceOut" animationInTiming={500} animationOutTiming={500}>
        <Div bg= {theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={20}>

          <Div flexDir='row' justifyContent='flex-end'>
            <Button onPress={() => toggleModal()} bg='transparent'>
              <AntDesign name="close" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} />
            </Button>
          </Div>


          <Div flexDir='column' justifyContent='center' alignItems='center'>
            <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} my={20} fontSize={16}> Are You Want Book Queue in </Text>
            <Text fontWeight='bold' my={20} fontSize={16} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>Mashreq Bank</Text>
          </Div>


          <Div flexDir='row' px={20} my={20} justifyContent='space-evenly'>
            <CustomButton title={t('close')} bg="red600" w="45%" />
            <CustomButton title={t('ok')} bg={colors.lightTheme.primary} w="45%" onPress={() => navigation.navigate("BankQueue")} />
          </Div>



        </Div>
      </Modal>






    </Div>
  )
}

export default MapViewSection