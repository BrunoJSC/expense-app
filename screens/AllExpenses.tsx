import { View } from "react-native";
import { Expense } from "../components/Expense/Expense";
import { useExpensesContext } from "../context/ExpensesContext";

const DUMMY_DATA = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-05-12"),
  },

  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-05-13"),
  },

  {
    id: "e3",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2022-05-14"),
  },

  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-05-15"),
  },

  {
    id: "e5",
    description: "Another book",
    amount: 18.99,
    date: new Date("2022-05-16"),
  },

  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-05-17"),
  },

  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-05-18"),
  },

  {
    id: "e8",
    description: "Some Bananas",
    amount: 5.99,
    date: new Date("2022-05-19"),
  },

  {
    id: "e9",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-05-20"),
  },

  {
    id: "e10",
    description: "Another book",
    amount: 18.99,
    date: new Date("2022-05-21"),
  },

  {
    id: "e11",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-05-22"),
  },

  {
    id: "e12",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-05-23"),
  },
];

export function AllExpenses() {
  const expenseCtx = useExpensesContext();
  return (
    <View>
      <Expense
        periodName="All expenses"
        expenses={expenseCtx?.expenses ?? []}
      />
    </View>
  );
}
