
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
    Alert,
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Text,
    Linking,
    ScrollView,
    Button,
    FlatList,
    Modal,
    Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Overlay } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const ConcertCartScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [animating, setAnimating] = useState(true);
    const [cartNum, setCartNum] = useState("0");
    const [totalPrice, setTotalPrice] = useState("0")

    useEffect(async () => {

        try {
            const value = await AsyncStorage.getItem('cart_num')
            if (value !== null) {
                // value previously stored
                setCartNum(value);

                const tmpVal = await AsyncStorage.getItem('concert_cart');

                setDataSource(JSON.parse(tmpVal));
                let tmpPrice = 0.0;



                JSON.parse(tmpVal).map((item, i) => {
                    // let price = item.price.replace("$", "");
                    let tmp = parseFloat(item.price);
                    tmpPrice += tmp;
                })

                setTotalPrice(tmpPrice);
                setAnimating(false);


            }


        } catch (e) {
            // error reading value
        }

    }, []);


    const goBack = () => {
        navigation.replace('ConcertSelectScreen');
    }

    const goToItems = (item) => {
        navigation.navigate('ShopItemList');
    }

    const goContinue = () => {
        setModalVisible(true)
    }

    const removeItemFromCart = async () => {
        dataSource.pop();
        let tmpPrice = 0;
        dataSource.map((item, i) => {
            // let price = item.price.replace("$", "");
            let tmp = parseFloat(item.price);
            tmpPrice += tmp;
        })

        setTotalPrice(tmpPrice);
        try {
            await AsyncStorage.setItem('cart_num', '' + dataSource.length);
            setCartNum(dataSource.length);
        } catch (e) {
        }

        try {
            await AsyncStorage.setItem('concert_cart', JSON.stringify(dataSource));
        }
        catch (e) {
        }

    }

    const goPurchase = () => {
        navigation.navigate('ConcertPurchased');
    }

    const goToSignIn = () => {
        setModalVisible(!modalVisible)
        navigation.navigate('Auth')
    }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Instant Karma®</Text>
                    <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
                        <Image source={require("../res/imgs/back_white.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtnContainer}>
                        <ImageBackground style={styles.cartBtnBack} source={require("../res/imgs/cart_num_back.png")}>
                            <Text style={styles.cartNumText}>{cartNum}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../res/imgs/music_purple.png')}></Image>
                    <Text style={{ color: '#745EFF', fontSize: 28, marginLeft: 12 }}>Concert Cart</Text>
                </View>
                <FlatList
                    data={dataSource}
                    style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20, }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 8,
                                marginRight: 8,
                                marginTop: 8,
                                marginBottom: 8,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.5,

                                padding: 4,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#745EFF', }}>${item.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, }}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.imageThumbnail}
                                        source={item.img_url}
                                    />

                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ borderRadius: 25, borderColor: '#745EFF', borderWidth: 1, padding: 4 }}>
                                        <Icon
                                            name='edit'
                                            iconStyle={{ color: '#745EFF' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ borderRadius: 25, borderColor: '#745EFF', borderWidth: 1, padding: 4, marginLeft: 12 }} onPress={removeItemFromCart}>
                                        <Icon
                                            name='remove'
                                            iconStyle={{ color: '#745EFF' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'left', width: '100%', fontSize: 14, }}>{item.date}</Text>
                                <Text style={{ textAlign: 'left', width: '100%', fontSize: 14, }}>{item.position}</Text>
                            </View>


                        </View>
                    )}
                    //Setting the number of column
                    ListFooterComponent={
                        <View style={{ margin: 80 }}>

                        </View>
                    }
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />

                <View style={{ position: 'absolute', left: 16, right: 16, bottom: 24 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#DDDDDD', justifyContent: 'space-between', padding: 16, borderRadius: 4 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#745EFF' }}>${totalPrice}.00</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 16, backgroundColor: '#745EFF', alignItems: 'center', marginTop: 8, borderRadius: 4 }} onPress={goContinue}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>

                {animating &&
                    <ActivityIndicator
                        animating={animating}
                        color="#292B2D"
                        size="large"
                        style={styles.activityIndicator}
                    />}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>${totalPrice}.00</Text>
                            <Text style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></Text>
                            <TouchableOpacity style={{ marginTop: 8, marginBottom: 4 }} onPress={goPurchase}>
                                <Image source={require('../res/imgs/apple_pay.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 8, marginBottom: 4 }} onPress={goPurchase}>
                                <Image source={require('../res/imgs/paypal_pay.png')}></Image>
                            </TouchableOpacity>
                            <Text style={{ width: '100%', height: 0.5, backgroundColor: 'gray', marginTop: 8 }}></Text>
                            <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between', marginBottom: 12 }}>
                                <TouchableOpacity style={{ backgroundColor: '#745EFF', padding: 12, borderRadius: 4, width: '45%', marginRight: 8, alignItems: 'center' }} onPress={goToSignIn}>
                                    <Text style={{ color: 'white', fontSize: 15, }}>Sign In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 4, width: '45%', borderWidth: 1, borderColor: '#745EFF', marginLeft: 8, alignItems: 'center' }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>


    );
};

export default ConcertCartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        flex: 1,
    },
    backImage: {
        width: '100%', height: '100%'
    },
    normalButton: {
        backgroundColor: '#745EFF',
        padding: 12,
        borderRadius: 25,
        position: 'absolute',
        bottom: 24,
        left: 32,
        right: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        justifyContent: 'space-between',
    },

    buttonText: {
        fontSize: 17,
        color: '#FFFFFF',
        textAlign: 'center',
        marginLeft: 8,
        fontWeight: 'bold'
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
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 2,
        padding: 8,
    },

    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },

    modalText: {
        fontSize: 36,
        color: '#745EFF',
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    }
});