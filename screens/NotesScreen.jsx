import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from 'react-native-vector-icons';
import AnimatedLottieView from 'lottie-react-native'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

import { deleteNote } from "../storage"
import { timeFormatter } from '../utils/timeFormatter';

const NotesScreen = () => {
    const navigation = useNavigation();

    const { params } = useRoute();

    const title = params?.titleProp ?? "";
    const description = params?.descriptionProp ?? "";
    const color = params?.color ?? "";
    const createdAt = params?.createdAt ?? "";
    const id = params?.id ?? "";
    const isDeletable = params?.isDeletable ?? null;

    return (
        <View className="flex-1 items-center" style={{ backgroundColor: color }}>
            <StatusBar style='auto' />
            <View className="items-center justify-between bg-[#ff555500] flex-row w-[100%] mb-0 h-[15%]" >
                <View className="flex-row items-center justify-between ml-3 w-[34%]">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name={"arrow-left"} size={30} color="#2f2f2f" />
                    </TouchableOpacity>
                    <Text className="text-lg text-[#3f3f3f]" style={{ fontFamily: "Nunito-Medium", textAlignVertical: "bottom" }}>Your notes</Text>
                </View>
                <View className="flex-row items-center justify-between mr-4 w-[20%]">
                    <TouchableOpacity onPress={() => title.length && navigation.navigate("CreateNote", { titleProp: title, descriptionProp: description, id })} className="flex-row w-[100%] justify-between items-center">
                        <Feather name={"edit"} size={25} color="#2f2f2f" />
                        <Text className="text-lg text-[#3f3f3f]" style={{ fontFamily: "Nunito-Medium", textAlignVertical: "bottom" }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text className="w-[90%] rounded-md px-5 py-1 text-4xl mb-0 h-fit bg-[#ff666600] text-[#3f3f3f]" style={{ fontFamily: "Nunito-Bold" }}>{title}</Text>
            <Text className="w-[90%] rounded-md px-5 py-1 text-sm mb-0 h-fit bg-[#ff666600] text-[#5f5f5f]" style={{ fontFamily: "Nunito" }}>{timeFormatter(createdAt)}</Text>
            <ScrollView className="w-[90%] rounded-md px-5 py-2 text-lg mb-12 h-[70%]" showsVerticalScrollIndicator={false}>
                <Text className="w-[100%] rounded-md text-lg mb-12 items-center justify-center h-[100%] text-[#3f3f3f]" style={{ fontFamily: "Nunito", textAlignVertical: "top" }}>{description}</Text>
            </ScrollView>

            <AnimatedLottieView source={require('../assets/animation/empty.json')} autoPlay loop className="h-[40%] items-center justify-center scale-125 absolute -z-10 top-[30%] opacity-75" autoSize={true} />
            <TouchableOpacity className="h-10 w-10 bg-slate-50 items-center justify-center rounded-full right-4 bottom-10 absolute" onPress={() => {
                deleteNote(params.id).then(() => {
                    navigation.dispatch(
                        StackActions.replace("Home")
                    )
                })
            }}>
                <Feather name={"trash-2"} size={30} color={"#ff5555"} />
            </TouchableOpacity>
        </View>
    )
}

export default NotesScreen