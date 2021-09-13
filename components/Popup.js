import React, {useState, useEffect} from "react";
import { StyleSheet, Modal, View } from "react-native";

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
        <Modal transparent visible={showModal}>
            <View style={styles.modal}>
                {children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '40%',
        backgroundColor: 'white',
        padding: 10
    }
});

export default Popup;