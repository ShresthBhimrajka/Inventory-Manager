import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 20,
        shadowOpacity: 1,
        elevation: 9,
        padding: 20,
        borderRadius: 10
    }
});

export default Card;