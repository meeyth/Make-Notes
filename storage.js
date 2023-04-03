import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    v4 as uuid
} from 'uuid';

export const initialize = async () => {
    try {
        await AsyncStorage.setItem('@ll_notes', JSON.stringify({}))
    } catch (e) {
        console.log(e.message);
    }
}

export const createNote = async (
    title,
    description
) => {
    const unique_id = uuid();

    const note = {
        id: unique_id,
        title: title,
        description: description,
        createdAt: new Date(),
    }

    try {

        const allNotes = await AsyncStorage.getItem('@ll_notes');
        const date = new Date();
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        // Adding new note

        const allNotesObj = JSON.parse(allNotes)

        if (dateString in allNotesObj) {
            allNotesObj[dateString].push(note);
        } else {
            allNotesObj[dateString] = [note];
        }

        await AsyncStorage.setItem('@ll_notes', JSON.stringify(allNotesObj));

    } catch (e) {
        console.log(e.message);
    }
}

export const getAllNotes = async () => {
    const notes = await AsyncStorage.getItem('@ll_notes');
    const allNotesObj = JSON.parse(notes);
    // console.log(allNotesObj, 'all');
    return allNotesObj;
}

export const updateNote = async (id, title, description) => {
    try {

        const notes = await AsyncStorage.getItem('@ll_notes');
        const allNotesObj = JSON.parse(notes);

        const allDates = Object.keys(allNotesObj);

        allDates.forEach((notesOfADayKey) => {
            allNotesObj[notesOfADayKey].forEach(note => {
                if (note.id === id) {
                    note.title = title;
                    note.description = description;
                }
            });
        });

        await AsyncStorage.setItem('@ll_notes', JSON.stringify(allNotesObj));

    } catch (e) {
        console.log(e.message);
    }
}

export const deleteNote = async (id) => {

    try {
        // Search for all notes

        const notes = await AsyncStorage.getItem('@ll_notes');
        const allNotesObj = JSON.parse(notes);

        const allDates = Object.keys(allNotesObj);

        allDates.forEach((notesOfADayKey) => {
            const updatedNotesOfADay = allNotesObj[notesOfADayKey].filter(note => {
                return note.id !== id;
            });
            allNotesObj[notesOfADayKey] = updatedNotesOfADay;
        })

        await AsyncStorage.setItem('@ll_notes', JSON.stringify(allNotesObj));

    } catch (e) {
        console.log(e.message);
    }
}

export const getHistory = async () => {
    const history = await AsyncStorage.getItem('@ll_notes');
    // console.log(history);
    return JSON.parse(history)
}

export const clearHistory = async () => {
    await AsyncStorage.setItem('@ll_notes', JSON.stringify({}))
    // console.log(await AsyncStorage.getItem('@ll_notes'));
}