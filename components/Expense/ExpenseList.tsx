import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text } from "react-native";
import { ExpenseItem } from "./ExpenseItem";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  const navigation = useNavigation();
  function onPressHandler(expenseId: string) {
    navigation.navigate("Modal", {
      expenseId: expenseId,
      data: expenses,
      mode: "edit",
    });
  }
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExpenseItem
          id={item.id}
          description={item.description}
          amount={item.amount}
          date={item.date}
          onPress={() => onPressHandler(item.id)}
        />
      )}
      ListEmptyComponent={() => (
        <Text style={styles.infoText}>No expenses found.</Text>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: 12 }}
    />
  );
}

const styles = StyleSheet.create({
  infoText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
});
