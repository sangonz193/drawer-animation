import { createStackNavigator } from "@react-navigation/stack";
import { Screen1 } from "../screens/Screen1";
import { Screen2 } from "../screens/Screen2";
import { commonRootDrawerScreenOptions } from "./RootDrawerUtils";

export type HomeStackParamList = {
  Screen1: undefined;
  Screen2: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ ...commonRootDrawerScreenOptions, title: "Start" }}>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
  );
}
