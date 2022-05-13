import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./context/app.context";
import RootNavigation, { navigationRef } from "./navigation/root.navigation";
import 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#263963",
      }}>
        <AppProvider>
          <NavigationContainer
            ref={navigationRef}
            fallback={<Text>Loading...</Text>}
          >
            <RootNavigation />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
