import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { categories } from "./categories";

export interface IMarker {
    id: string;
    name: string;
    category: string;
    description: string;
    contact: string;
    latitude: number;
    longitude:number;
}

export default function Home() {

    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [filter, setFilter] = useState('');

    const navigation = useNavigation()

    const filteredData = markers.filter(m => m.category === filter)

    useEffect(()=> {
        try {
            fetch("http://192.168.100.44:3000/getAll").then(async (request) => {
                const data = await request.json();
                setMarkers(data);
            });
        } catch(e: any) {
           console.log('Error:'+ e.message)
        }

    },[]);

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Bem vindo</Text>
            <Text style={styles.subTitle}>Encontre no mapa um ponto do comércio local</Text>
        </View>

        <MapView 
            style={styles.map} 
            initialRegion={{
                latitude: -20.201793, 
                longitude: -40.221464,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
        >
            {(filter ? filteredData : markers).map((item) => (
                <Marker 
                    key={item.id}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                    onPress={() => {
                        navigation.navigate('Detail' as never, item as never);
                    }}
                />
            ))}
            
        </MapView>

        <View style={styles.categoryContainer}>
            <FlatList 
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10}}></View>}
                contentContainerStyle={{
                    alignItems:'center'
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={() => {
                        setFilter(filter === item.key ? "" : item.key);
                    }}
                    style={[
                        styles.categoryItem,
                        filter === item.key ? styles.selectedCategory : null
                    ]} 
                    key={item.key}>
                        <Image style={styles.categoryImage} source={item.image}/>
                        <Text style={styles.categoryText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatList>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff"
    },
    headerContainer: {
        padding:20,
        paddingTop: Platform.OS === 'android' ? 50 : 0
    },
    title: {
        fontSize: 24,
        fontWeight:"400",
        color: "#322153"
    },
    subTitle: {
        fontSize: 14,
        fontWeight:"400",
        color: "#6c6c80"
    },
    map: {
        flex:1
    },
    categoryContainer: {
        padding: 10
    },
    categoryItem: {
        height: 110,
        backgroundColor: '#f0f0f5',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    categoryImage: {
        width: 50,
        height: 50
    },
    categoryText: {
        textAlign: 'center',
        color: "#6c6c80"
    },
    selectedCategory: {
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor: "#322153"
    }
})