import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { calendarForm } from '../utils/timeFormatter';
import Card from './Card';

const HistoryRow = ({ notes, searchQuery }) => {
    const [date, notesArray] = notes;
    const [reversedNotesArray, setReversedNotesArray] = useState([]);
    useEffect(() => {
        setReversedNotesArray(searchQuery.length ? notesArray.reverse().filter((note) => note.title.startsWith(searchQuery)) : notesArray.reverse());
    }, [searchQuery])
    return (
        <View className="h-48 items-center bg-[#f550]">
            <View className="w-[95%] items-start h-[20%] justify-center">
                <Text className="text-[#3f3f3f] text-[16px] w-[100%]" style={{ fontFamily: "Nunito-Bold", }}>{calendarForm(date)}</Text>
            </View>
            <ScrollView className="w-[95%] h-[80%] pl-1 bg-[#ff555500]" contentContainerStyle={{ gap: 10, alignItems: "center" }} showsHorizontalScrollIndicator={false} horizontal>
                {reversedNotesArray.map((note) => <Card id={note.id} description={note.description} title={note.title} key={note.id} createdAt={note.createdAt} />)}
            </ScrollView>
        </View>
    )
}

export default HistoryRow