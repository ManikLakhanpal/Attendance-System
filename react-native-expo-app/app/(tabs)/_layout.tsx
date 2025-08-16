import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const _layout = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={openDrawer}>
              <Entypo name="menu" size={24} color="#0096FF" />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, focused }) => {
            const iconColor = focused ? color : "#FFFFFF";
            return (
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "red",
                  bottom: 15,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <FontAwesome6 name="people-group" size={24} color={iconColor} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="proxy"
        options={{
          title: "Proxy",
          tabBarIcon: ({ color }) => {
            return <MaterialIcons name="error-outline" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;
