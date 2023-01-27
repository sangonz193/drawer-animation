import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useOpenDrawerYOffset() {
  const insets = useSafeAreaInsets();
  return insets.top + 10;
}
