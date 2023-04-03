import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { timeFormatter } from '../utils/timeFormatter'

const CARD_COLORS = ["#dcf5f8", "#D3D8F0", "#dbdcf1"]

const Card = ({ title, description, id, createdAt }) => {

    const navigation = useNavigation();
    const color = useMemo(() => CARD_COLORS[Math.floor(Math.random() * 3)], []);

    return (
        <TouchableOpacity activeOpacity={.5} className={`h-36 w-40  items-start justify-start rounded-md bg-opacity-50`} style={{ elevation: 2, backgroundColor: color }} onPress={() => navigation.navigate("Notes", { titleProp: title, descriptionProp: description, color, id, createdAt })}>
            <View className={`h-[100%] w-[100%] items-start justify-start rounded-md p-2 bg-[#fff0]  overflow-hidden`} >
                <Text className="h-[25%] text-[#3f3f3f] text-[16px] " style={{ fontFamily: "Nunito-Bold", }} numberOfLines={1}>{title}</Text>
                <Text className="h-[60%] text-[#3f3f3f] text-[12px]" style={{ fontFamily: "Nunito", }} numberOfLines={5}>{description}</Text>
                <Text className="h-[15%] w-[100%] text-[#5f5f5f] text-[11px] text-right" style={{ fontFamily: "Nunito", }} numberOfLines={1}>{timeFormatter(createdAt)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card