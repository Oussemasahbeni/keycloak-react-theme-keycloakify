import { useInsertScriptTags } from "@keycloakify/login-ui/tools/useInsertScriptTags";
import { waitForElementMountedOnDom } from "@keycloakify/login-ui/tools/waitForElementMountedOnDom";
import { useEffect } from "react";
import { assert } from "tsafe/assert";

import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";

export function useScript(params: { webAuthnButtonId: string }) {
    const { webAuthnButtonId } = params;

    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "webauthn-authenticate.ftl");

    const { msgStr, isFetchingTranslations } = useI18n();

    const { insertScriptTags } = useInsertScriptTags({
        effectId: "WebauthnAuthenticate",
        scriptTags: [
            {
                type: "module",
                textContent: () => `

                    import { authenticateByWebAuthn } from "${import.meta.env.BASE_URL}keycloak-theme/login/js/webauthnAuthenticate.js";
                    const authButton = document.getElementById('${webAuthnButtonId}');
                    authButton.addEventListener("click", function() {
                        const input = {
                            isUserIdentified : ${kcContext.isUserIdentified},
                            challenge : '${kcContext.challenge}',
                            userVerification : '${kcContext.userVerification}',
                            rpId : '${kcContext.rpId}',
                            createTimeout : ${kcContext.createTimeout},
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        };
                        authenticateByWebAuthn(input);
                    });
                `
            }
        ]
    });

    useEffect(() => {
        if (isFetchingTranslations) {
            return;
        }

        (async () => {
            await waitForElementMountedOnDom({
                elementId: webAuthnButtonId
            });

            insertScriptTags();
        })();
    }, [isFetchingTranslations]);
}
