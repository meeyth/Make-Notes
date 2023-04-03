import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, Feather } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar'
import { StackActions, useNavigation } from '@react-navigation/native';
import { clearHistory, getHistory } from '../storage';
import AnimatedLottieView from 'lottie-react-native';
import HistoryRow from '../components/HistoryRow';


const NoteHistoryScreen = () => {
    const navigation = useNavigation();

    const [notesHistory, setNotesHistory] = useState([]);
    const [allNotesHistory, setAllNotesHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (allNotesHistory.length === 0) {
            getHistory()
                .then((history) => {
                    const historyArray = Object.entries(history).reverse();
                    setAllNotesHistory(historyArray);
                    setNotesHistory(historyArray);
                })
        }

    }, [])

    return (
        <View className="flex-1 items-center bg-[#edf0f6]">
            <StatusBar style='auto' />
            <View className="items-center justify-between bg-[#ff555500] flex-row w-[100%] my-10" >
                <View className="flex-row items-center justify-between ml-3 w-[40%]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name={"arrow-left"} size={30} color="#2f2f2f" />
                    </TouchableOpacity>
                    <Text className="text-lg text-[#3f3f3f]" style={{ fontFamily: "Nunito-Medium", textAlignVertical: "bottom" }}>Notes history</Text>
                </View>
                {!!notesHistory.length && <View className="flex-row items-center justify-between mr-4 w-[32%] p-1 rounded-full bg-[#ff5555]" style={{ elevation: 5 }}>
                    <TouchableOpacity onPress={() => {
                        clearHistory().then(() => navigation.dispatch(
                            StackActions.replace("Home")))
                    }} className="flex-row w-[100%] h-[100%] items-center justify-evenly">
                        <Feather name={"trash"} size={25} color="#fff" />
                        <Text className="text-sm text-[#fff] bg-[#0000]" style={{ fontFamily: "Nunito-Bold", textAlignVertical: "bottom" }}>Delete all</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            <View className="h-11 items-center justify-evenly bg-[#fff5] w-[88%] flex-row rounded-lg border border-[#797979] mb-3">
                <Ionicons name={"search"} size={34} color="#5f5f5f" />
                <TextInput className="h-[100%] w-[80%] bg-[transparent] text-xl" placeholder='Search notes' placeholderTextColor="#d0d0d0" cursorColor="gray" style={{ fontFamily: "Nunito" }} value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
                {
                    !!searchQuery?.length && (
                        <TouchableOpacity className="absolute right-2" onPress={() => setSearchQuery("")}>
                            <Feather name={"x"} size={30} color="#5f5f5f" />
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                !allNotesHistory?.length ?
                    (
                        <AnimatedLottieView source={require('../assets/animation/working.json')} autoPlay loop className="h-[50%] items-center justify-center scale-125 mt-12" autoSize={true} />
                    ) :
                    <ScrollView className="w-[90%] mb-4" showsVerticalScrollIndicator={false}>
                        {/* {console.log(allNotesHistory)} */}
                        {allNotesHistory.map((notes) => <HistoryRow notes={notes} key={notes[0]} searchQuery={searchQuery} />)}
                    </ScrollView>

            }
        </View>
    )
}

export default NoteHistoryScreen