import { RouteProp, useRoute } from "@react-navigation/native";
import { isAfter, isBefore, subDays } from "date-fns";
import { View } from "react-native";
import { Expense } from "../components/Expense/Expense";
import { useExpensesContext } from "../context/ExpensesContext";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

type RootStackParamList = {
  params: {
    data: Expense[];
    expenseId: string;
  };
};

export function RecentExpenses() {
  const router = useRoute<RouteProp<RootStackParamList, "params">>();
  const expenseCtx = useExpensesContext();

  const { data, expenseId } = router.params;

  const today = new Date();

  // Text code
  // const expense = [
  //   {
  //     id: Date.now().toString(),
  //     description: "Test",
  //     amount: 100,
  //     date: new Date("2023-11-20"),
  //   },
  // ];

  const saveDayAgo = subDays(today, 7);

  const recent = expenseCtx?.expenses.filter((item) => {
    const date = new Date(item.date);

    const isRecent = isAfter(date, saveDayAgo) && isBefore(today, date);
    return isRecent;
  });

  return (
    <View>
      <Expense periodName="Recent expenses" expenses={recent ?? []} />
    </View>
  );
}
