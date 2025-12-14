import type { ClassKey } from "@keycloakify/login-ui/useKcClsx";
import type { ReactNode } from "react";

type Classes = { [key in ClassKey]?: string };

type StyleLevelCustomization = {
    doUseDefaultCss: boolean;
    classes?: Classes;
    loadCustomStylesheet?: () => void;
    Provider?: (props: { children: ReactNode }) => ReactNode;
};

export function useStyleLevelCustomization(): StyleLevelCustomization {
    return {
        doUseDefaultCss: false
    };
}
