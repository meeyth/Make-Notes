import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from 'react-native-vector-icons';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import { createNote, updateNote } from '../storage';

const CreateNoteScreen = () => {
    const navigation = useNavigation();

    const { params } = useRoute();

    const [title, setTitle] = useState(params?.titleProp ?? "");
    const [description, setDescription] = useState(params?.descriptionProp ?? "");
    const id = params?.id;

    return (
        <View className="flex-1 items-center bg-[#edf0f6]">
            <StatusBar style='auto' />
            <View className="items-center justify-between bg-[#ff555500] flex-row w-[100%] my-10" >
                <View className="flex-row items-center justify-between ml-3 w-fit bg-[#ff555500]">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
                        <Feather name={"arrow-left"} size={30} color="#2f2f2f" />
                    </TouchableOpacity>
                    <Text className="text-lg text-[#3f3f3f]" style={{ fontFamily: "Nunito-Medium", textAlignVertical: "bottom" }}>{title.length ? "Edit" : "Create"} notes</Text>
                </View>
                <View className="flex-row items-center justify-between mr-4 w-[23%]">
                    <TouchableOpacity onPress={() => {
                        if (!params?.titleProp) {
                            title.length && createNote(title, description).then(() => {
                                navigation.dispatch(
                                    StackActions.replace("Home"))
                            })
                        } else {
                            title.length && updateNote(id, title, description).then(() => {
                                navigation.dispatch(
                                    StackActions.replace("Home"))
                            })
                        }
                    }} className="flex-row w-[100%] justify-between items-center">
                        <Feather name={"upload"} size={25} color="#2f2f2f" />
                        <Text className="text-lg text-[#3f3f3f]" style={{ fontFamily: "Nunito-Medium", textAlignVertical: "bottom" }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput className="w-[90%] h-max min-h-[50] border border-[#797979] rounded-md px-5 py-1 text-lg mb-6" placeholder='Note Title' cursorColor={"#797979"} placeholderTextColor="#5f5f5f" style={{ fontFamily: "Nunito" }} onChangeText={(text) => setTitle(text)} value={title} />
            <ScrollView className="w-[90%] border border-[#797979] rounded-md px-5 py-0 text-lg mb-12" showsVerticalScrollIndicator={false}>
                <TextInput className="w-[100%] h-[100%] text-lg items-center justify-center my-2" placeholder='Note Description' cursorColor={"#797979"} placeholderTextColor="#5f5f5f" style={{ fontFamily: "Nunito", textAlignVertical: "top" }} multiline onChangeText={(text) => setDescription(text)} value={description} />
            </ScrollView>
            {/* <TextInput className="w-[100%] h-[30%] text-lg items-center justify-center my-2" placeholder='Note Description' cursorColor={"#797979"} placeholderTextColor="#5f5f5f" style={{ fontFamily: "Nunito", textAlignVertical: "top" }} multiline onChangeText={(text) => setDescription(text)} value={description} /> */}

            <AnimatedLottieView source={require('../assets/animation/empty.json')} autoPlay loop className="h-[40%] items-center justify-center scale-125 absolute -z-10 top-[30%] opacity-75" autoSize={true} />
        </View>
    )
}

export default CreateNoteScreen