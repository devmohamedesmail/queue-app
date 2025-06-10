
import colors from '../../../config/colors'
import { Div, Text} from 'react-native-magnus';
import { useTheme } from '../../../context/ThemeContext';
import CustomButton from '../../../custom/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Custom_modal from '../../../custom/Custom_modal';



export default function PlaceModal({ isModalVisible, toggleModal, selectedPlace }) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
   
    return (
        <Custom_modal isVisible={isModalVisible} onPressClose={toggleModal} onClose={toggleModal}  >
             <Div flexDir='column' justifyContent='center' alignItems='center'>
                    <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} my={20} fontSize={13}> {t('book-confirm')} </Text>

                   <Text
                       fontWeight='bold'
                       my={20}
                       fontSize={12}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                      textAlign='center'
                   >
                       {selectedPlace ? (i18n.language === "ar" ? selectedPlace.nameAr : selectedPlace.nameEn) : "جارٍ التحميل..."}


                    </Text>
                 </Div>


               <Div flexDir='row' px={20} my={20} justifyContent='space-evenly'>
                    <CustomButton title={t('close')} bg="red600" w="45%" onPress={() => toggleModal()} />
                   <CustomButton title={t('ok')}  w="45%" onPress={() => navigation.navigate("BankQueue", { place: selectedPlace })} />
                </Div>
        </Custom_modal>
    )
}
