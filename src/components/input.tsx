import { StyleSheet, TextInput, TextInputProps } from "react-native";

const Style = StyleSheet.create({
    input: {
      height: 50,
      width: 250,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 7,
      paddingHorizontal: 16
    }
  });

export function Input({ ...rest }: TextInputProps){
  return <TextInput style={Style.input} { ...rest }/>
}


