import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginRecoveryAuthnCodeInput(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <form id="kc-recovery-code-login-form" className="space-y-6" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label htmlFor="recoveryCodeInput" className="text-sm font-medium">
                        {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    </Label>
                    <Input
                        tabIndex={1}
                        id="recoveryCodeInput"
                        name="recoveryCodeInput"
                        aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                        autoComplete="off"
                        type="text"
                        autoFocus
                        placeholder="Enter recovery code"
                        error={messagesPerField.existsError("recoveryCodeInput")}
                    />
                    {messagesPerField.existsError("recoveryCodeInput") && (
                        <InputError id="input-error">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                                }}
                            />
                        </InputError>
                    )}
                </div>

                <Button className="w-full" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}