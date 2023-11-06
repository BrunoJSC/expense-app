import { StyleSheet, Text, View } from "react-native";
import { getFormattedAmount } from "../../utils/format";
import { ExpenseList } from "./ExpenseList";

type Expenses = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

interface ExpenseProps {
  periodName: string;
  expenses: Expenses[];
}

export function Expense({ periodName, expenses }: ExpenseProps) {
  const total = expenses?.reduce((acc, expense) => {
    const amount = Number(expense.amount);
    const calc = acc + amount;
    return isNaN(calc) ? 0 : calc;
  }, 0);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>{periodName}</Text>
        <Text style={styles.infoText}>{getFormattedAmount(total)}</Text>
      </View>

      <ExpenseList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#374151",
    padding: 12,
    marginTop: 24,
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  infoText: {
    fontSize: 18,
    color: "#9ca3af",
  },
});
