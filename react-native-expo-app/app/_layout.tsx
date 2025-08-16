import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: "Home",
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "Settings",
                    headerShown: true,
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}