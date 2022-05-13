import { View, Text } from "react-native";

export default function SignupService({ navigation }) {
  console.log('SignupService');
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
        SignupService
      </Text>
    </View>
  );
}
