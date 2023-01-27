import { createStackNavigator } from "@react-navigation/stack";
import { Contacts } from "../screens/Contacts";
import { commonRootDrawerScreenOptions } from "./RootDrawerUtils";

export type ContactsStackParamList = {
  Contacts: undefined;
};

const Stack = createStackNavigator<ContactsStackParamList>();

export function ContactsStack() {
  return (
    <Stack.Navigator screenOptions={commonRootDrawerScreenOptions}>
      <Stack.Screen name="Contacts" component={Contacts} options={{ headerTitle: "Contacts" }} />
    </Stack.Navigator>
  );
}
