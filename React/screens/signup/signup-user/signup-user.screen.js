import { View, Text } from "react-native";

export default function SingupUser({ navigation }) {
  console.log('SignupUser');
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}>
      <Text
        style={{
          position: 'absolute',
          bottom: 30,
        }}>
        SignupUser
      </Text>
    </View>
  );
}
