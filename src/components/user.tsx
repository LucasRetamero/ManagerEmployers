import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = PressableProps & {
  data: {
    email: string
    password: string
  }
  onDelete: () => void
  onOpen: () => void
}

export function User({ data, onDelete, onOpen, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: "#CECECE",
        padding: 20,
        borderRadius: 1,
        gap: 12,
        flexDirection: "row",
      }}
      {...rest}
    >
      <Text style={{ flex: 1 }}>
        {data.email} - {data.password}
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen}>
        <MaterialIcons name="visibility" size={24} color="blue" />
      </TouchableOpacity>
    </Pressable>
  )
}