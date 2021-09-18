import React, {useState, useEffect} from "react";
import { StyleSheet, Modal, View, ScrollView} from "react-native";

const Popup = ({visible,children}) => {
    const [showModal, setShowModal] = useState(visible);

    useEffect(() => {
        toggleModal();
    }, [visible])

    const toggleModal = () => {
        if(visible){
            setShowModal(true);
        }
        else{
            setShowModal(false);
        }
    };

    return(
        <Modal transparent visible={showModal} animationType='slide'>
            <ScrollView>
                <View style={styles.modal}>
                    {children}
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 30,
        marginVertical: '10%',
        marginHorizontal: '5%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 20,
        shadowOpacity: 1,
        elevation: 9,
    }
});

export default Popup;