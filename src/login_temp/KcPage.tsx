import { ThemeProvider } from '@/components/theme-provider';
import { useExclusiveAppInstanceEffect } from "@keycloakify/login-ui/tools/useExclusiveAppInstanceEffect";
import { KcClsxProvider } from "@keycloakify/login-ui/useKcClsx";
import type { ReactNode } from "react";
import { assert } from "tsafe/assert";
import { type KcContext, KcContextProvider } from "./KcContext";
import { I18nProvider } from "./i18n";
import "./index.css";
import { PageIndex } from "./pages/PageIndex";
import { useStyleLevelCustomization } from "./styleLevelCustomization";


export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const defaultTheme = (): "light" | "dark" | "system" => {
        if (kcContext.properties.ENABLE_THEME_TOGGLE !== "true") {
            // If theme toggle is disabled, use the default os theme setting
            return window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
        return "system";
    };

    return (
        <KcContextProvider kcContext={kcContext}>
            <I18nProvider kcContext={kcContext}>
                <StyleLevelCustomization>
                    <ThemeProvider defaultTheme={defaultTheme()} storageKey="theme">
                        <PageIndex />
                    </ThemeProvider>

                </StyleLevelCustomization>
            </I18nProvider>
        </KcContextProvider>
    );
}

function StyleLevelCustomization(props: { children: ReactNode }) {
    const { children } = props;

    const { doUseDefaultCss, classes, loadCustomStylesheet, Provider } = useStyleLevelCustomization();

    useExclusiveAppInstanceEffect({
        effectId: "loadCustomStylesheet",
        isEnabled: loadCustomStylesheet !== undefined,
        effect: () => {
            assert(loadCustomStylesheet !== undefined);
            loadCustomStylesheet();
        }
    });

    return (
        <KcClsxProvider doUseDefaultCss={doUseDefaultCss} classes={classes}>
            {Provider === undefined ? children : <Provider>{children}</Provider>}
        </KcClsxProvider>
    );
}
