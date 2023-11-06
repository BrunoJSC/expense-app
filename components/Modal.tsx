import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useExpensesContext } from "../context/ExpensesContext";
import { getFormattedDate } from "../utils/format";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

type RootStackParamList = {
  prams: {
    data: Expense[];
    expenseId: string;
    mode: "add" | "edit";
  };
};

export function Modal() {
  const router = useRoute<RouteProp<RootStackParamList>>();

  const navigation = useNavigation();
  const expenseCtx = useExpensesContext();

  const { data, expenseId, mode } = router.params;

  const expenseItem = data?.find((item: Expense) => item.id === expenseId);

  // const expense = mode === "edit" ? expenseItem : undefined;

  const [description, setDescription] = useState(
    expenseItem?.description ?? ""
  );
  const [amount, setAmount] = useState(expenseItem?.amount ?? 0);
  const [date, setDate] = useState(new Date());

  function addExpenses() {
    if (!description || !amount || !date) {
      return;
    }

    expenseCtx?.addExpense({
      id: Date.now().toString(),
      description: description,
      amount: amount,
      date: date,
    });

    navigation.goBack();
  }

  function deleteExpense(id: string) {
    expenseCtx?.deleteExpense(id);

    navigation.goBack();
  }

  function updateExpense(id: string) {
    expenseCtx?.updateExpense(id, {
      id: id,
      description: description,
      amount: amount,
      date: date,
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {mode === "edit" ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={String(amount)}
            onChangeText={(text) => setAmount(Number(text))}
          />

          <View>
            <Pressable
              onPress={() => deleteExpense(expenseId)}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => updateExpense(expenseId)}
              style={styles.buttonSave}
            >
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View>
            <Text>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={String(amount)}
              onChangeText={(text) => setAmount(Number(text))}
            />
          </View>

          <View>
            <Text>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={getFormattedDate(date)}
              onChangeText={(text) => setDate(new Date(text))}
            />
          </View>

          <View>
            <Pressable onPress={addExpenses} style={styles.buttonSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  container: {
    padding: 12,
    width: "100%",
  },

  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 12,
    width: "100%",
    marginBottom: 12,
  },

  buttonSave: {
    backgroundColor: "blue",
    padding: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  buttonDelete: {
    backgroundColor: "red",
    padding: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 12,
  },
});
