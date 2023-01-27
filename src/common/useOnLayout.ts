import { useCallback, useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export function useOnLayout() {
    const [layout, setLayout] = useState<LayoutRectangle | null>(null);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        setLayout(event.nativeEvent.layout);
    }, []);

    return [layout, onLayout] as const;
}