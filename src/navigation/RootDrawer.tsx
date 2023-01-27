import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import { createCustomDrawer } from "./customDrawer/createCustomDrawer";
import { StartTabs, StartTabsParamList } from "./StartTabs";

export type RootDrawerParamList = {
  StartTabs: NavigatorScreenParams<StartTabsParamList>;
};

const Drawer = createCustomDrawer<RootDrawerParamList>();

export function RootDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="StartTabs" component={StartTabs} />
    </Drawer.Navigator>
  );
}
