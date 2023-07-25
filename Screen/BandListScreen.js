
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
import { Icon, Overlay, Card } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const bandList = [
    {
        id: 1,
        name: 'London Rooftop',
    },
    {
        id: 2,
        name: 'The Grimm',
    },
    {
        id: 3,
        name: 'Toast',
    },
]

const BandListScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [animating, setAnimating] = useState(true);
    const [cartNum, setCartNum] = useState("0");


    useEffect(async () => {

        setDataSource(bandList);

    }, []);


    const goBack = () => {
        navigation.goBack();
    }

    const goToBandItemList = (item) => {
        navigation.navigate({name: 'BandItemList', params: {band: item.id}})
    }




    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../res/imgs/background.png')} style={styles.backImage}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Instant Karma®</Text>
                    <TouchableOpacity style={styles.backBtnContainer} onPress={goBack}>
                        <Image source={require("../res/imgs/back_white.png")} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../res/imgs/music_purple.png')}></Image>
                    <Text style={{ color: '#745EFF', fontSize: 28, marginLeft: 12 }}>Band Group List</Text>
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
                                padding: 4,
                            }}
                        >
                            <TouchableOpacity style={styles.card} onPress={() => goToBandItemList(item)}>
                                <Image source={require('../res/imgs/folder_ic.png')} style={{width: 32, height: 32, marginRight: 12}}/>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                            </TouchableOpacity>
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

            </ImageBackground>
        </SafeAreaView>


    );
};

export default BandListScreen;

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

    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 4,
        flexDirection: 'row', alignItems: 'center'
      }

});