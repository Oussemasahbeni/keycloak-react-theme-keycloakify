import { useInsertLinkTags } from "@keycloakify/login-ui/tools/useInsertLinkTags";
import { useInsertScriptTags } from "@keycloakify/login-ui/tools/useInsertScriptTags";
import { useEffect } from "react";
import { BASE_URL } from "../../../kc.gen";
import { useKcContext } from "../../KcContext";

export function useInitializeTemplate() {
    const { kcContext } = useKcContext();

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        effectId: "Template",
        hrefs: []
    });

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "Template",
        scriptTags: [
            ...(kcContext.scripts === undefined
                ? []
                : kcContext.scripts.map(src => ({
                      type: "text/javascript" as const,
                      src
                  }))),
            {
                type: "module",
                textContent: [
                    `import { startSessionPolling, checkAuthSession } from "${BASE_URL}keycloak-theme/login/js/authChecker.js";`,
                    ``,
                    `startSessionPolling("${kcContext.url.ssoLoginInOtherTabsUrl}");`,
                    kcContext.authenticationSession === undefined
                        ? ""
                        : `checkAuthSession("${kcContext.authenticationSession.authSessionIdHash}");`
                ].join("\n")
            }
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
