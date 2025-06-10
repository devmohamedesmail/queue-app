
import { Button, Image } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { Div } from 'react-native-magnus';
import colors from '../../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from '../../../custom/CustomText';

export default function PlaceItem({ onPress, name, address, id, add_to_favorites, distance, isFavorite, image }) {
    const { theme } = useTheme();


    return (
        <Button

            bg='transparent'
            w="100%"
            onPress={onPress}
            key={id}
            flexDir='row'
            alignItems='center'
            py={0}
            my={2}
            borderBottomWidth={1}
            borderBottomColor='gray300'
        >

            <Div px={10} w="100%">
                <Div flexDir='row' justifyContent='space-between'>
                    <Div>
                        <Image
                            rounded='md'
                            h={60}
                            w={60}
                            source={{
                                uri:
                                    `${image}`,
                            }} />
                    </Div>
                    <Div mx={10} flex={1}>
                        <Div>
                            <CustomText w="100%" textTransform="uppercase" content={name} color={theme === 'light' ? "" : "#a2a4f8"} />
                            <CustomText content={address} fontSize={10} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} />
                        </Div>

                        <Div flexDir='row' justifyContent='space-between' >
                            {distance && (
                                <CustomText color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.textSecondary} fontSize={10} content={`${distance} Km`} />
                            )}

                            <Button bg='transparent' onPress={add_to_favorites}>
                                {isFavorite ?
                                    <AntDesign name="heart" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.textSecondary} />
                                    :
                                    <AntDesign name="hearto" size={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.textSecondary} />
                                }

                            </Button>

                        </Div>

                    </Div>

                </Div>










            </Div>
        </Button>
    )
}
