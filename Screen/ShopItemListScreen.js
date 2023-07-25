
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
    Linking,
    ScrollView,
    Button,
    FlatList,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Overlay } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';


const itemList = [
    {
        id:'1-1',
        name: 'LRT Guitar Grey Frost',
        img_url: require('../res/imgs/lrt_tshirt_guitar.png'),
        price: '35',
        size: 'S'
        
    },
    {
        id:'1-2',
        name: 'LRT Lets Rock Black Frost',
        img_url: require('../res/imgs/lrt_tshirt_rockblack.png'),
        price: '32',
        size: 'S'
    },

    {
        id:'1-3',
        name: 'LRT Lets Rock Black Frost',
        img_url: require('../res/imgs/lrt_tshirt_pickblue.png'),
        price: '35',
        size: 'S'
    },
    {
        id:'1-4',
        name: 'The Grimm Shirt Black Frost Mens',
        img_url: require('../res/imgs/gr_tshirt_blackfrost.png'),
        price: '25',
        size: 'S'
    },
    {
        id:'1-5',
        name: 'The Grimm Shirt Black Frost Womens',
        img_url: require('../res/imgs/gr_tshirt_black_women.png'),
        price: '75',
        size: 'S'
    },
    {
        id:'1-6',
        name: 'The Grimm Shirt Blue Frost Mens',
        img_url: require('../res/imgs/gr_tshirt_blue.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'1-7',
        name: 'The Grimm Shirt Blue Frost Womens',
        img_url: require('../res/imgs/gr_tshirt_blue_women.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'1-8',
        name: 'The Grimm Shirt Natural TV Album',
        img_url: require('../res/imgs/gr_tshirt_natural.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'1-9',
        name: 'Toast Heather Raglan Tee',
        img_url: require('../res/imgs/toast_tshirt.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'1-10',
        name: 'Toast Special Order Baby Onesie',
        img_url: require('../res/imgs/toast_tshirt_baby.png'),
        price: '15',
        size: 'S'
    },

];

const vinylList = [
    {
        id:'2-1',
        name: 'The Grimm Lost Tracks Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'2-2',
        name: 'The Grimm Lost Tracks 2 Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost2.png'),
        price: '15',
        size: 'S'
    },

    {
        id:'2-3',
        name: 'The Grimm Oculus Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_oculus.png'),
        price: '15',
        size: 'S'
    },

    {
        id:'2-4',
        name: 'The Grimm Lost Tracks Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost.png'),
        price: '15',
        size: 'S'
    },
    {
        id:'2-5',
        name: 'The Grimm Lost Tracks 2 Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_lost2.png'),
        price: '15',
        size: 'S'
    },

    {
        id:'2-6',
        name: 'The Grimm Oculus Vinyl, CD',
        img_url: require('../res/imgs/gr_vinyl_oculus.png'),
        price: '15',
        size: 'S'
    },
];

const ShopItemListScreen = ({ navigation, route }) => {

    const [shopItemDataSource, setShopItemDataSource] = useState([]);
    const [shopCartNum, setShopCartNum] = useState("0");
    const [cartNum, setCartNum] = useState("0");
    const [totalPrice, setTotalPrice] = useState("0")
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(async () => {

        try {
            const value = await AsyncStorage.getItem('cart_num')
            if (value !== null) {
                // value previously stored

                setCartNum(value);
            }

            const value1 = await AsyncStorage.getItem('shop_cart_items')
            if (value1 !== null) {
                // value previously stored
                setShopCartNum(JSON.parse(value1).length);

                setDataSource(JSON.parse(value1));
                let tmpPrice = 0.0;



                JSON.parse(value1).map((item, i) => {
                    // let price = item.price.replace("$", "");
                    let tmp = parseFloat(item.price);
                    tmpPrice += tmp;
                })

                setTotalPrice(tmpPrice);
            }
        } catch (e) {
            // error reading value
        }
        if(route.params?.category == 2){
            setShopItemDataSource(vinylList);
        }else{
            setShopItemDataSource(itemList);
        }
    }, []);



    const goToConcertCart = () => {
        navigation.navigate('ConcertCart')
    }
    const goBack = () => {
        navigation.replace('ShopCollection');
    }

    const goToItem = (item) => {
        navigation.navigate({name: 'ShopItem', params: {itemInfo: item}, })
    }



    const goPurchase = () => {
        let item = {price: totalPrice, img_url: require('../res/imgs/tshirt_temp.png'), size: 'small', name: 'Total'}
        navigation.navigate({name: 'ShopDetail', params: {itemInfo: item}});
    }

    const viewCart = () => {
        if(shopCartNum != 0)
        setModalVisible(true);
    }

    const removeItemFromCart = async (itemInfo) => {

        setShopCartNum(dataSource.length-1);
        setTotalPrice(totalPrice-itemInfo.price);
        let tmpList = [];
        dataSource.map((item, i) => {
            if(item.id !== itemInfo.id){
                tmpList.push(item);
            }
        });

        setDataSource(tmpList);
        if(tmpList.length == 0) {
            setModalVisible(!modalVisible);
        }
        try {
            await AsyncStorage.setItem('shop_cart_items', JSON.stringify(tmpList));   
        }
        catch (e) {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>

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
                    <Text style={{ color: '#745EFF', fontSize: 28, marginLeft: 12 }}>Shop Merch</Text>
                </View>
                <FlatList
                    data={shopItemDataSource}
                    style={{paddingLeft: 12, paddingRight: 12, paddingTop: 20 }}
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
                            onPress={() => goToItem(item)}
                            >
                            <Image
                                style={styles.imageThumbnail}
                                source={item.img_url}
                            />
                            
                            <Text style={{textAlign: 'center', width: '100%', fontSize: 17, fontWeight: 'bold', marginTop: 8}}>{item.name}</Text>
                                <Text style={{textAlign: 'center', width: '100%', fontSize: 15, color: '#745EFF' }}>${item.price}.00</Text>
                                <Text style={{textAlign: 'center', width: '100%', fontSize: 14,}}>Size: {item.size}</Text>

                            
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={<View style={{margin: 56}}></View>}
                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />
            
                <TouchableOpacity style={styles.normalButton} onPress={viewCart}>
                    <Icon
                        name='shopping-bag'
                        iconStyle={{ color: 'white' }}
                    />
                    <Text style={styles.buttonText}>
                        VIEW CART</Text>
                    <Text style={{ color: '#745EFF', borderRadius: 10, width: 20, height: 20, backgroundColor: 'white', textAlign: 'center', fontWeight: 'bold' }}>{shopCartNum}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    {modalVisible &&
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'black', opacity: .6 } }
                        onPress={() => setModalVisible(!modalVisible)}
                    />}
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Merch Cart</Text>
                            <Text style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></Text>
                            <FlatList
                                data={dataSource}
                                style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20, width: '100%' }}
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
                                            <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#745EFF', }}>${item.price}.00</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                            <TouchableOpacity>
                                                <Image
                                                    style={styles.imageCartThumbnail}
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
                                                <TouchableOpacity style={{ borderRadius: 25, borderColor: '#745EFF', borderWidth: 1, padding: 4, marginLeft: 12 }} onPress={() => removeItemFromCart(item)}>
                                                    <Icon
                                                        name='remove'
                                                        iconStyle={{ color: '#745EFF' }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ textAlign: 'left', width: '100%', fontSize: 14, }}>Size: {item.size}</Text>

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
                            <View style={{width: '100%',}}>
                                <View style={{ flexDirection: 'row', backgroundColor: '#DDDDDD', justifyContent: 'space-between', padding: 16, borderRadius: 4,  }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#745EFF' }}>${totalPrice}.00</Text>
                                </View>
                                <TouchableOpacity style={{ marginTop: 8, marginBottom: 4, width:'100%', alignItems:'center', backgroundColor: 'black', borderRadius: 4 }} onPress={goPurchase}>
                                    <Image source={require('../res/imgs/apple_pay.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 8, marginBottom: 4, width:'100%', alignItems:'center', backgroundColor: '#ffc43a', borderRadius: 4 }} onPress={goPurchase}>
                                    <Image source={require('../res/imgs/paypal_pay.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>


    );
};

export default ShopItemListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 24,
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
        width: '100%',
        height: 156,
        
        resizeMode: 'contain',
    },

    imageCartThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,

        resizeMode: 'contain',
    },
    modalView: {

        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        width: '96%',
        height: '90%'
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    modalText: {
        fontSize: 32,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    }
});