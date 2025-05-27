
import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import { Div, Button, Icon, Modal, ThemeProvider } from "react-native-magnus";

export default function Test() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button block m={10} onPress={() => setVisible(true)}>
                Open Modal
            </Button>

            <Modal isVisible={visible}  
                h={300}
                // justifyContent="center"
                onBackdropPress={() => setVisible(false)}
                // alignItems="center"
                bg="red"
                animationIn="bounce" animationOut="flash" animationInTiming={600} animationOutTiming={600}
                >
                <Button
                    bg="gray400"
                    h={35}
                    w={35}
                    position="absolute"
                    top={50}
                    right={15}
                    rounded="circle"
                    onPress={() => {
                        setVisible(false);
                    }}
                >
                    <Icon color="black900" name="close" />
                </Button>
            </Modal>

        </>
    )
}