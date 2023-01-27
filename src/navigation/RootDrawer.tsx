import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PlaceholderScreen } from "../common/PlaceholderScreen";
import { createCustomDrawer } from "./customDrawer/createCustomDrawer";
import { commonRootDrawerScreenOptions } from "./RootDrawerUtils";
import { StartTabs, StartTabsParamList } from "./StartTabs";

export type RootDrawerParamList = {
  StartTabs: NavigatorScreenParams<StartTabsParamList>;
  YourCartStack: undefined;
  FavouritesStack: undefined;
  YourOrdersStack: undefined;
};

const Drawer = createCustomDrawer<RootDrawerParamList>();

const YourCartStack = createStackScreen("Your Cart");
const FavouritesStack = createStackScreen("Favourites");
const YourOrdersStack = createStackScreen("Your Orders");

export function RootDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="StartTabs" component={StartTabs} />
      <Drawer.Screen name="YourCartStack" component={YourCartStack} />
      <Drawer.Screen name="FavouritesStack" component={FavouritesStack} />
      <Drawer.Screen name="YourOrdersStack" component={YourOrdersStack} />
    </Drawer.Navigator>
  );
}

function createStackScreen(name: string) {
  const Stack = createStackNavigator();

  const Screen: React.FC = () => <PlaceholderScreen name={name} />;
  Screen.displayName = name;

  const Result: React.FC = () => (
    <Stack.Navigator screenOptions={commonRootDrawerScreenOptions}>
      <Stack.Screen name={name} component={Screen} />
    </Stack.Navigator>
  );
  Result.displayName = name + "Stack";

  return Result;
}
