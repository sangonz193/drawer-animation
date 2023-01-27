import {
  createNavigatorFactory,
  DrawerRouter,
  useNavigationBuilder,
} from "@react-navigation/core";
import {
  createDrawerNavigator,
  getDrawerStatusFromState,
} from "@react-navigation/drawer";
import { useEffect } from "react";
import { LayoutRectangle, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useOnLayout } from "../../common/useOnLayout";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { useOpenDrawerYOffset } from "./useOpenDrawerYOffset";

function CustomDrawer(
  props: React.ComponentProps<
    ReturnType<typeof createDrawerNavigator>["Navigator"]
  >
) {
  const { state, descriptors, NavigationContent } =
    useNavigationBuilder(DrawerRouter, {
      children: props.children,
      screenOptions: props.screenOptions,
      backBehavior: props.backBehavior,
      defaultStatus: props.defaultStatus,
      id: props.id,
      initialRouteName: props.initialRouteName,
    });

  const [screenLayout, onScreenLayout] = useOnLayout();
  const insets = useSafeAreaInsets();

  const isOpen = getDrawerStatusFromState(state) === "open";
  const drawerProgress = useDrawerProgress(isOpen);

  const screensWrapperStyle = useScreensWrapperStyle(
    drawerProgress,
    screenLayout
  );

  const openDrawerYOffset = useOpenDrawerYOffset();
  const drawerWrapperStyle = useDrawerWrapperStyle(
    drawerProgress,
    openDrawerYOffset
  );

  const statusBarPaddingStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: "white",
      height: interpolate(
        drawerProgress.value,
        [0, 1],
        [insets.top, 20],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <NavigationContent>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, drawerWrapperStyle]}
      >
        <CustomDrawerContent />
      </Animated.View>

      <Animated.View
        style={[StyleSheet.absoluteFillObject, screensWrapperStyle]}
        onLayout={onScreenLayout}
      >
        <Animated.View style={statusBarPaddingStyle} />

        <SafeAreaProvider>
          {state.routes.map((route, i) => {
            return (
              <View
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  { display: i === state.index ? "flex" : "none" },
                ]}
              >
                {descriptors[route.key].render()}
              </View>
            );
          })}
        </SafeAreaProvider>
      </Animated.View>
    </NavigationContent>
  );
}

export const createCustomDrawer = createNavigatorFactory(CustomDrawer);

function useScreensWrapperStyle(
  drawerProgress: SharedValue<number>,
  screenLayout: LayoutRectangle | null
) {
  return useAnimatedStyle(() => {
    if (!drawerProgress) return {};

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 40], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const rotate = interpolate(drawerProgress.value, [0, 1], [0, -10], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const transformOriginTranslates = {
      y: -(screenLayout?.height ?? 0) / 2,
      x: -(screenLayout?.width ?? 0) / 2,
    };

    const translateX = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, screenLayout?.width ? screenLayout.width / 2 : 300],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );

    const translateY = interpolate(drawerProgress.value, [0, 1], [0, 150], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      borderRadius,
      overflow: "hidden",
      transform: [
        { translateY: transformOriginTranslates.y },
        { translateX: transformOriginTranslates.x },
        { rotate: rotate + "deg" },
        { translateY: -transformOriginTranslates.y + translateY },
        { translateX: -transformOriginTranslates.x + translateX },
      ],
    };
  });
}

function useDrawerProgress(isOpen: boolean) {
  const drawerProgress = useSharedValue(0);

  useEffect(() => {
    if (!drawerProgress) return;
    if (isOpen) {
      drawerProgress.value = withTiming(1, { duration: 500 });
    } else {
      drawerProgress.value = withTiming(0, { duration: 500 });
    }
  }, [isOpen, drawerProgress]);

  return drawerProgress;
}

function useDrawerWrapperStyle(
  drawerProgress: SharedValue<number>,
  openDrawerYOffset: number
) {
  return useAnimatedStyle(() => {
    if (!drawerProgress) return {};

    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 40], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    const translateY = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, openDrawerYOffset],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor: "rgb(28,20,40)",
      overflow: "hidden",
      transform: [{ translateY: translateY }],
      borderTopLeftRadius: borderRadius,
    };
  });
}
