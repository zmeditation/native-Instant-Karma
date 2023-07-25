
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
    FlatList,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { TabRouter } from '@react-navigation/routers';

const bandList = [
    {
        name: 'London Rooftop',
        date: 'December 25, 2019',
        position: 'Tooele, UT',
        img_url: require('../res/imgs/london_rooftop.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32.00',
    },

    {
        name: 'The Grimme Concert',
        date: 'December 25, 2019',
        position: 'Tooele, UT',
        img_url: require('../res/imgs/artist.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32.00',
    },

    {
        name: 'Toast Concert',
        date: 'December 25, 2019',
        position: 'Tooele, UT',
        img_url: require('../res/imgs/toast_band.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32.00',
    },


];

const lrtList = [

    {
        id: '1-0',
        name: 'London Rooftop',
        img_url: require('../res/imgs/london_rooftop.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32',
    },
    {
        id: '1-1',
        name: 'LRT Guitar Grey Frost',
        img_url: require('../res/imgs/lrt_tshirt_guitar.png'),
        price: '35',
        des: 'S'

    },
    {
        id: '1-2',
        name: 'LRT Lets Rock Black Frost',
        img_url: require('../res/imgs/lrt_tshirt_rockblack.png'),
        price: '32',
        des: 'S'
    },

    {
        id: '1-3',
        name: 'LRT Lets Rock Black Frost',
        img_url: require('../res/imgs/lrt_tshirt_pickblue.png'),
        price: '35',
        des: 'S'
    },
];
const grimList = [
    {
        id: '2-0',
        name: 'The Grimme Concert',
        date: 'December 25, 2019',
        position: 'Tooele, UT',
        img_url: require('../res/imgs/artist.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32',
    },
    {
        id: '1-4',
        name: 'The Grimm Shirt Black Frost Mens',
        img_url: require('../res/imgs/gr_tshirt_blackfrost.png'),
        price: '25',
        des: 'S'
    },
    {
        id: '1-5',
        name: 'The Grimm Shirt Black Frost Womens',
        img_url: require('../res/imgs/gr_tshirt_black_women.png'),
        price: '75',
        des: 'S'
    },
    {
        id: '1-6',
        name: 'The Grimm Shirt Blue Frost Mens',
        img_url: require('../res/imgs/gr_tshirt_blue.png'),
        price: '15',
        des: 'S'
    },
    {
        id: '1-7',
        name: 'The Grimm Shirt Blue Frost Womens',
        img_url: require('../res/imgs/gr_tshirt_blue_women.png'),
        price: '15',
        des: 'S'
    },
    {
        id: '1-8',
        name: 'The Grimm Shirt Natural TV Album',
        img_url: require('../res/imgs/gr_tshirt_natural.png'),
        price: '15',
        des: 'S'
    },

    {
        id: '2-1',
        name: 'The Grimm Lost Tracks Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost.png'),
        price: '15',
        des: 'S'
    },
    {
        id: '2-2',
        name: 'The Grimm Lost Tracks 2 Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost2.png'),
        price: '15',
        des: 'S'
    },

    {
        id: '2-3',
        name: 'The Grimm Oculus Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_oculus.png'),
        price: '15',
        des: 'S'
    },

    {
        id: '3-3',
        name: 'The Grimm Summertime Digital Download',
        img_url: require('../res/imgs/gr_pic_summertime.png'),
        price: '15',
        des: 'S'
    },
];
const toastList = [
    {
        id: '3-0',
        name: 'Toast Concert',
        date: 'December 25, 2019',
        position: 'Tooele, UT',
        img_url: require('../res/imgs/toast_band.png'),
        des: 'Lynn Doe Amphitheater',
        price: '32',
    },
    {
        id: '1-9',
        name: 'Toast Heather Raglan Tee',
        img_url: require('../res/imgs/toast_tshirt.png'),
        price: '15',
        des: 'S'
    },
    {
        id: '1-10',
        name: 'Toast Special Order Baby Onesie',
        img_url: require('../res/imgs/toast_tshirt_baby.png'),
        price: '15',
        des: 'S'
    },

    {
        id: '1-11',
        name: 'Toast Special Order Baby Onesie',
        img_url: require('../res/imgs/toast_tshirt_baby.png'),
        price: '15',
        des: 'S'
    },
];

const BandItemListScreen = ({ navigation, route }) => {
    const [cartNum, setCartNum] = useState("0");
    const [cartItemFirst, setCartItemFirst] = useState();
    const [cartItemSec, setCartItemSec] = useState();
    const [cartItemThird, setCartItemThird] = useState();
    const [cartItemFour, setCartItemFour] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [cartItemSource, setCartItemSource] = useState([]);
    useEffect(async () => {

        try {
            const value = await AsyncStorage.getItem('cart_num')
            if (value !== null) {
                // value previously stored

                setCartNum(value);
            }
        } catch (e) {
            // error reading value
        }
        if(route.params?.band == 1) {
            setDataSource(lrtList);            
        }else if(route.params?.band == 2) {
            setDataSource(grimList);
        }else{
            setDataSource(toastList);
        }
    }, []);
    const goBack = () => {
        navigation.goBack();
    }


    const goToConcertCart = () => {
        navigation.navigate('ConcertCart')
    }

    const addItemToCart = (item) => {
        if (cartItemSource.length > 3) {
            alert("Can't add concert item to cart anymore")
        } else {
            cartItemSource.push(item);
            if (cartItemSource.length == 1) {
                setCartItemFirst(item.img_url);
            } else if (cartItemSource.length == 2) {
                setCartItemSec(item.img_url);
            } else if (cartItemSource.length == 3) {
                setCartItemThird(item.img_url);
            } else {
                setCartItemFour(item.img_url);
            }
        }
    }

    const removeItemFromCart = (index) => {

        if (cartItemSource.length == 1) {
            setCartItemFirst(null);
        } else if (cartItemSource.length == 2) {
            setCartItemSec(null);
        } else if (cartItemSource.length == 3) {
            setCartItemThird(null);
        } else {
            setCartItemFour(null);
        }

        let tmp = [];
        cartItemSource.map((item, i) => {
            if (index != i) {
                tmp.push(item);
            }
        });
        setCartItemSource(tmp);

    }

    const addItemToConcertCart = async () => {
        if (cartItemSource.length > 0) {

            // localStorage.setItem("cart_num", setCartItemSource.length);
            // localStorage.setItem(JSON.stringify(cartItemSource));
            try {
                const value = await AsyncStorage.getItem('cart_num');

                if (value !== null) {
                    // value previously stored
                    let cartNum = parseInt(value);
                    cartNum += cartItemSource.length;
                    setCartNum(cartNum);
                    await AsyncStorage.setItem('cart_num', '' + cartNum);

                } else {

                    await AsyncStorage.setItem('cart_num', '' + cartItemSource.length);

                    setCartNum(cartItemSource.length);
                }

            } catch (e) {
                // saving error
            }

            try {
                const cartVal = await AsyncStorage.getItem('concert_cart');
                if (cartVal !== null) {
                    let cartTempData = JSON.parse(cartVal);

                    const mergeData = [...cartTempData, ...cartItemSource];
                    await AsyncStorage.setItem('concert_cart', JSON.stringify(mergeData));

                } else {
                    await AsyncStorage.setItem('concert_cart', JSON.stringify(cartItemSource));
                }
            } catch (e) {

            }

            setCartItemSource([]);
            setCartItemFirst(null);
            setCartItemSec(null);
            setCartItemThird(null);
            setCartItemFour(null);
            Toast.show({
                type: 'success',
                text1: 'Instant Karma',
                text2: 'Successfully added! 👋'
            });

        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImage} source={require("../res/imgs/background.png")}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Instant Karma®</Text>
                    <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
                        <Image source={require("../res/imgs/back_white.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtnContainer} onPress={goToConcertCart}>
                        <ImageBackground style={styles.cartBtnBack} source={require("../res/imgs/cart_num_back.png")}>
                            <Text style={styles.cartNumText}>{cartNum}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../res/imgs/music_purple.png')}></Image>
                    <Text style={{ color: '#745EFF', fontSize: 28, marginLeft: 12 }}>Select Concerts</Text>
                </View>

                <FlatList
                    data={dataSource}
                    style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20, }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 16,
                                marginRight: 16,
                                marginTop: 8,
                                marginBottom: 8,
                                alignItems: 'center',
                            }}
                            onPress={() => addItemToCart(item)}
                        >
                            <Image
                                style={styles.imageThumbnail}
                                source={item.img_url}
                            />

                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 17, fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 15, color: '#745EFF' }}>${item.price}.00</Text>
                            


                        </TouchableOpacity>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={<View style={{ margin: 140 }}></View>}
                />

                <View style={styles.cartContainer}>
                    <View style={styles.cartItemContainer}>
                        <TouchableOpacity style={styles.cartItem} onPress={() => removeItemFromCart(0)}>
                            <Image source={cartItemFirst} style={styles.cartItemImage}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cartItem} onPress={() => removeItemFromCart(1)}>
                            <Image source={cartItemSec} style={styles.cartItemImage}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartItem} onPress={() => removeItemFromCart(2)}>
                            <Image source={cartItemThird} style={styles.cartItemImage}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cartItem} onPress={() => removeItemFromCart(3)}>
                            <Image source={cartItemFour} style={styles.cartItemImage}></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#745EFF', textAlign: 'center', marginTop: 20, fontSize: 12, }}>Tap the band to remove</Text>
                    <Image source={require('../res/imgs/music_bar.png')} style={{ width: '100%', marginTop: 12 }}></Image>
                    <TouchableOpacity onPress={addItemToConcertCart} style={{ flexDirection: 'row', justifyContent: 'center', color: '#745EFF', alignItems: 'center', backgroundColor: '#745EFF', flex: 1 }}>
                        <Image source={require('../res/imgs/music.png')}></Image>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 4 }}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
};

export default BandItemListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backImage: {
        width: '100%', height: '100%', backgroundColor: '#eeeeee'
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#745EFF',
        height: 80,
        marginBottom: 24,

    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },

    backBtnContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        paddingTop: 10,
    },
    cartBtnContainer: {
        position: 'absolute',
        top: 16,
        right: 24,
        width: 40,
        height: 48,
    },

    cartBtnBack: {
        width: '100%',
        height: '100%'
    },
    cartNumText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        color: "#745EFF"
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 156,
        borderRadius: 2,
        resizeMode: 'contain',
    },

    cartContainer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 24,
        height: 240,
        borderColor: '#745EFF',
        borderWidth: 4,
        borderRadius: 3,
        backgroundColor: 'white'
    },
    cartItemContainer: {
        marginTop: 24,
        marginLeft: 12,
        marginRight: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cartItem: {
        flex: 1,
        margin: 4,
    },

    cartItemImage: {
        width: '100%',
        height: 70,
        borderWidth: 0.5,
        borderColor: 'gray',
        resizeMode: 'contain'
    },

});