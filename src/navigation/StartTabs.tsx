import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ContactsStack } from "./ContactsStack";
import { HomeStack } from "./HomeStack";

export type StartTabsParamList = {
  HomeStack: undefined;
  ContactsStack: undefined;
};

const BottomTabs = createBottomTabNavigator<StartTabsParamList>();

export function StartTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { borderTopWidth: 0 },
        tabBarLabelStyle: { textTransform: "uppercase" },
      }}
    >
      <BottomTabs.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: "Home" }} />
      <BottomTabs.Screen name="ContactsStack" component={ContactsStack} options={{ tabBarLabel: "Contacts" }} />
    </BottomTabs.Navigator>
  );
}
