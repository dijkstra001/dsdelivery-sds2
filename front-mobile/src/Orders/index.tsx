import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import OrderCard from '../OrderCard';
import fetchOrders from '../api';
import { Order } from '../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';

export default function Orders() {

    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = () => {
        setIsLoading(true)
        fetchOrders()
        .then(response => setOrders(response.data))
        .catch(() => Alert.alert('Ocorreu um erro ao listar os pedidos'))
        .finally(() => setIsLoading(false));
    }

    useEffect(() =>{
       if (isFocused){
           fetchData();
       }
    }, [isFocused]);

    const handleOnPress = (order: Order) =>{
        navigation.navigate('OrderDetails', {
            order
        });
    }

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <Text style={styles.message}>Buscando pedidos...</Text>
                ) : (
                    orders.map(order => (
                    <TouchableWithoutFeedback 
                    key={order.id} 
                    onPress={() => handleOnPress(order)}
                    >
                        <OrderCard order={order}/>
                    </TouchableWithoutFeedback>
                    ))
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    message:{
        fontSize: 25,
        color: '#FFF',
        fontFamily: 'OpenSans_700Bold',
        marginTop: '65%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%',
        padding: 45,
        backgroundColor: '#DA5C5C',
        shadowOpacity: 0,
        shadowColor: '#1C1C1C',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 20,
        borderRadius: 15,
        elevation: 10
    }
});
