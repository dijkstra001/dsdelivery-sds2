import React from 'react';
import Header from '../Header';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import OrderCard from '../OrderCard';

export default function Orders() {

    return (
        <>
            <Header />
            <ScrollView style={styles.container}>
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    }
});
