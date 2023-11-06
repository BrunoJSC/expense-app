import { createContext, useContext, useReducer } from "react";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
}

type Action = {
  type: "add" | "delete" | "update";
  payload: Expense;
};

const ExpensesContext = createContext<ExpenseState | undefined>(undefined);

export const ExpensesReducer = (state: ExpenseState, action: Action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };

    case "update":
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.payload.id) {
            return action.payload;
          }

          return expense;
        }),
      };

    case "delete":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const expensesContextDefaultValues: ExpenseState = {
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expense) => {},
};

export function ExpensesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    ExpensesReducer,
    expensesContextDefaultValues
  );

  const addExpense = (expense: Expense) => {
    dispatch({ type: "add", payload: expense });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const updateExpense = (id: string, expense: Expense) => {
    dispatch({ type: "update", payload: { ...expense, id } });
  };

  return (
    <ExpensesContext.Provider
      value={{ ...state, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export const useExpensesContext = () => {
  return useContext(ExpensesContext);
};
