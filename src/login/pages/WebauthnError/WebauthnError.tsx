import { Button } from "@/components/ui/button";
import { KcContext } from '@/login/KcContext';
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage
            headerNode={msg("webauthn-error-title")}
        >
            <div className="space-y-4">
                <form id="kc-error-credential-form" action={url.loginAction} method="post">
                    <input type="hidden" id="executionValue" name="authenticationExecution" />
                    <input type="hidden" id="isSetRetry" name="isSetRetry" />
                </form>

                <Button
                    tabIndex={4}
                    onClick={() => {
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("isSetRetry").value = "retry";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("executionValue").value = "${execution}";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("kc-error-credential-form").submit();
                    }}
                    type="button"
                    className="w-full"
                    name="try-again"
                    id="kc-try-again"
                >
                    {msgStr("doTryAgain")}
                </Button>

                {isAppInitiatedAction && (
                    <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                        <Button type="submit" variant="outline" className="w-full" id="cancelWebAuthnAIA" name="cancel-aia" value="true">
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}
