import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type IoniconsProps = keyof typeof Ionicons.glyphMap;

interface IconButtonProps {
  icon: IoniconsProps;
  size: number;
  color: string;
  onPress: () => void;
}
export function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },

  pressed: {
    opacity: 0.75,
  },
});
