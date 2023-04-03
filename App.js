import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  Animated,
  StyleSheet,
  View,
} from "react-native";

import HomeScreen from "./screens/HomeScreen"
import CreateNoteScreen from "./screens/CreateNoteScreen"
import NoteHistoryScreen from "./screens/NoteHistoryScreen";
import NotesScreen from "./screens/NotesScreen";

import { getAllNotes, initialize } from "./storage";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync().catch((e) => {
  console.log(e.message);
});


function AnimatedSplashScreen ({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "#fff",
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

function AnimatedAppLoader ({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare () {
      // await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

export default App = () => {
  useEffect(() => {
    const check = async () => {
      !(await getAllNotes()) && initialize();
    }
    check()
  }, []);

  const [fontsLoaded, e] = useFonts({
    "Nunito": require("./assets/fonts/static/Nunito-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/static/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./assets/fonts/static/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AnimatedAppLoader>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={HomeScreen} options={{
            animation: "fade_from_bottom",
          }} />
          <Stack.Screen name="CreateNote" component={CreateNoteScreen} options={{
            animation: "slide_from_bottom",
          }} />
          <Stack.Screen name="NoteHistory" component={NoteHistoryScreen} options={{
            animation: "slide_from_right",
          }} />
          <Stack.Screen name="Notes" component={NotesScreen} options={{
            animation: "fade",
          }} />
        </Stack.Navigator>
      </AnimatedAppLoader>
    </NavigationContainer>
  );
}