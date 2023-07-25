
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import { ButtonGroup, CheckBox } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopItemScreen = ({ navigation, route }) => {

 
    const [addCartText, setAddCartText] = useState('Add To Cart');
    const [itemInfo, setItemInfo] = useState();
    const [selectedIndex, updateIndex] = useState(0);
    const [checked, updateChecked] = useState(true);
    const buttons = ['S', 'M', 'L', 'XL', 'XXL'];

    useEffect(async () => {
        setItemInfo(route.params.itemInfo);

        try {
            const value = await AsyncStorage.getItem('shop_cart_items')
            if (value !== null) {
                // value previously stored
                if(value.indexOf(route.params?.itemInfo.id) != -1){
                    setAddCartText('Added To Cart')
                }     
            }
        } catch (e) {
            // error reading value
        }  
     }, []);

    const goToShopDetailItem = () => {
        navigation.navigate({name:'ShopDetail', params: {itemInfo: itemInfo}})
    }

    const goBack = () => {
        navigation.replace('ShopItemList');
    }

    const addItemToCart = async () => {
        if(addCartText === 'Add To Cart'){
            try {
                let tmpObj = [];
                const value = await AsyncStorage.getItem('shop_cart_items')
                if (value !== null) {
                    // value previously stored
                    tmpObj = JSON.parse(value);
                }
                tmpObj.push(itemInfo);
                await AsyncStorage.setItem('shop_cart_items', JSON.stringify(tmpObj));  
                setAddCartText('Added To Cart')     

            } catch (e) {
                // error reading value
            }    
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <ImageBackground style={styles.backImage}>

                    <Image style={styles.itemImage} source={route.params?.itemInfo.img_url}>
                    </Image>
                    <Text style={styles.textItemName}>{route.params?.itemInfo.name}</Text>
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.itemPriceText}>${route.params?.itemInfo.price}.00</Text>
                        <Text style={styles.itemSeeText}>see sizing info</Text>
                    </View>
                    <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
                        <Image source={require('../res/imgs/back_gray_ic.png')} style={styles.backButtonImage} />
                    </TouchableOpacity>
                    <ButtonGroup
                        onPress={selectedIndex => updateIndex(selectedIndex)}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 56, backgroundColor: '#F0F2F8', padding: 6, borderWidth: 0, borderRadius: 4, marginLeft: 20, marginRight: 20, marginTop: 20 }}
                        buttonStyle={{ backgroundColor: '#F0F2F8', borderWidth: 0 }}
                        selectedButtonStyle={{ backgroundColor: '#745EFF', borderRadius: 4, }}
                        innerBorderStyle={{ width: 0 }}
                        textStyle={{ fontSize: 15 }}

                    />
                    <CheckBox
                        checkedIcon={<Image source={require('../res/imgs/radio_selected.png')} />}
                        uncheckedIcon={<Image source={require('../res/imgs/radio_unselected.png')} />}
                        left
                        title='Pick up at the concert (skip the lines!)'
                        containerStyle={{ backgroundColor: '#00000000', borderWidth: 0, marginBottom: 0, marginLeft: 20, marginRight: 20 }}
                        textStyle={{ fontWeight: '300', fontSize: 15 }}
                        wrapperStyle={{ height: 30 }}
                        checked={checked}
                        onPress={(checked) => updateChecked(checked)}
                    />
                    <CheckBox
                        checkedIcon={<Image source={require('../res/imgs/radio_selected.png')} />}
                        uncheckedIcon={<Image source={require('../res/imgs/radio_unselected.png')} />}
                        left
                        title='Deliver'
                        containerStyle={{ backgroundColor: '#00000000', borderWidth: 0, marginTop: 0, marginLeft: 20, marginRight: 20, }}
                        textStyle={{ fontWeight: '300', fontSize: 15 }}
                        wrapperStyle={{ height: 30 }}
                        checked={!checked}
                        onPress={(checked) => updateChecked(!checked)}
                    />

                    <TouchableHighlight onPress={addItemToCart} style={{ backgroundColor: '#745EFF', padding: 16, marginLeft: 20, marginRight: 20, marginBottom: 8, borderRadius: 6, }}>
                        <Text style={styles.buttonText}>{addCartText}</Text>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={goToShopDetailItem} style={{ marginLeft: 20, marginRight: 20, marginBottom: 8, borderRadius: 6, alignItems: 'center', backgroundColor: 'black' }}>
                        <Image source={require('../res/imgs/apple_pay.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToShopDetailItem} style={{ marginLeft: 20, marginRight: 20, marginBottom: 8, marginBottom: 20, borderRadius: 6, alignItems: 'center', backgroundColor: '#ffc43a' }}>
                        <Image source={require('../res/imgs/paypal_pay.png')}></Image>
                    </TouchableOpacity>

                </ImageBackground>
            </ScrollView>
        </View>
    );
};

export default ShopItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImage: {
        width: '100%', height: '100%', backgroundColor: 'white',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 32,
        left: 16,
        width: 32,
        height: 32,
    },
    backButtonImage: {
        resizeMode: 'contain'
    },
    itemImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        // backgroundColor: '#F0F2F8',
    },
    textItemName: {
        fontSize: 20,
        color: '#292B2D',
        fontWeight: '400',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 24,
        marginBottom: 8,

    },
    itemPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    itemPriceText: {
        fontSize: 36,
        color: '#745EFF',
        fontWeight: '400',
    },
    itemSeeText: {
        fontSize: 14,
        color: '#745EFF',
        textAlignVertical: 'bottom',
        fontWeight: '400',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }

});