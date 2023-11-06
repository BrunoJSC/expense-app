import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFormattedAmount, getFormattedDate } from "../../utils/format";

interface ExpenseItemProps {
  id: string;
  description: string;
  amount: number;
  date: Date;
  onPress: (id: string) => void;
}

export function ExpenseItem({
  id,
  description,
  amount,
  date,
  onPress,
}: ExpenseItemProps) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => pressed && styles.pressed}
      android_ripple={{ color: "#ccc" }}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{getFormattedAmount(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    backgroundColor: "#e4e4e4",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    marginVertical: 8,
  },
  textBase: {
    color: "#212121",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: "#212121",
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.75,
  },
});
