import { LogoutOtherSessions } from "@/components/logout-other-sessions";
import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <div className="flex items-center justify-center gap-2">
                    <span>{msg("webauthn-registration-title")}</span>
                </div>
            }
        >
            <div className="space-y-6">
                <form id="register" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                </form>

                <LogoutOtherSessions i18n={i18n} />

                <div className="space-y-3">
                    <Button type="button" className="w-full" id={authButtonId}>
                        {msgStr("doRegisterSecurityKey")}
                    </Button>

                    {!isSetRetry && isAppInitiatedAction && (
                        <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                            <Button type="submit" variant="outline" className="w-full" id="cancelWebAuthnAIA" name="cancel-aia" value="true">
                                {msgStr("doCancel")}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
