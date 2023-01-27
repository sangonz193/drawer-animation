# Drawer animation

This is an example of a drawer animation using [react-navigation](https://reactnavigation.org/) v6 and [react-reanimated](https://docs.swmansion.com/react-native-reanimated/).

## Demo

<img src="./docs/demo.gif" width=300 />

## Run the project

1. Run `npm install` to install dependencies.
2. Run `npm run ios` to start the project in a iOS simulator, or `npm run android` to start the project in a Android emulator.

## Implementation

### Navigators tree

```
NavigationContainer
└── RootDrawer (DrawerNavigator w/ custom view)
    ├── StartTabs (BottomTabNavigator)
    │   ├── HomeStack (StackNavigator)
    │   │   ├── Screen1 (Screen)
    │   │   └── Screen2 (Screen)
    │   └── ContactsStack (StackNavigator)
    │       └── Contacts (Screen)
    ├── YourCartStack (StackNavigator)
    │   └── Your Cart (Screen)
    ├── FavouritesStack (StackNavigator)
    │   └── Favourites (Screen)
    └── YourOrdersStack (StackNavigator)
        └── Your Orders (Screen)
```

### Custom drawer view

The main file containing most of the logic and animations is [src/navigation/customDrawer/createCustomDrawer.tsx](./src/navigation/customDrawer/createCustomDrawer.tsx). The `createCustomDrawer` function returns a custom DrawerNavigator, which is used in the `RootDrawer` navigator. The custom drawer differs from the default one in the way it renders the screen content and the drawer itself.

Both the screen content and the drawer are rendered inside Animated.View components, from [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/), which are animated using the `useAnimatedStyle` hook.

The Animated.View containing the screen content is animated using the `translateX`, `translateY`, `borderRadius`, and `rotate` styles. By default React Native rotates the content around the center of the content, but in this case the content should rotate around the top left corner of the content. As React Native does not support this the `transform-origin` css property, this was achieved by first translating the center of the content to where the anchor point will be, then rotating the content, and finally translating the content back to its original position. More information: https://stackoverflow.com/a/58444898.

The Animated.View containing the drawer is animated using the `translateY` and `borderTopLeftRadius` styles.
