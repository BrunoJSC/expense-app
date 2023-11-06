import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Modal } from "./components/Modal";
import { IconButton } from "./components/UI/IconButton";
import {
  ExpensesContextProvider,
  useExpensesContext,
} from "./context/ExpensesContext";
import { AllExpenses } from "./screens/AllExpenses";
import { RecentExpenses } from "./screens/RecentExpenses";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export type RootStackParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
  Modal: {
    mode: "add" | "edit";
  };
};

type ModalScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Modal"
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function RenderButtonTabs() {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const expenseCtx = useExpensesContext();
  return (
    <Tabs.Navigator initialRouteName="RecentExpenses">
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
        initialParams={{
          data: expenseCtx?.expenses ?? [],
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          headerRight: () => (
            <IconButton
              icon="add"
              color="black"
              size={32}
              onPress={() => {
                navigation.navigate("Modal", { mode: "add" });
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="RecentExpenses"
            component={RenderButtonTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Modal"
            component={Modal}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
