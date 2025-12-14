import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { KcContext } from "@/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginRecoveryAuthnCodeInput(
    props: PageProps<
        Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>,
        I18n
    >
) {
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
            <form
                id="kc-recovery-code-login-form"
                className="space-y-6"
                action={url.loginAction}
                method="post"
            >
                <Field>
                    <FieldLabel htmlFor="recoveryCodeInput">
                        {" "}
                        {msg(
                            "auth-recovery-code-prompt",
                            `${recoveryAuthnCodesInputBean.codeNumber}`
                        )}
                    </FieldLabel>
                    <Input
                        tabIndex={1}
                        id="recoveryCodeInput"
                        name="recoveryCodeInput"
                        autoComplete="off"
                        type="text"
                        autoFocus
                        placeholder="Enter recovery code"
                        aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                    />
                    {messagesPerField.existsError("recoveryCodeInput") && (
                        <FieldError>
                            <span
                                id="input-error"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(
                                        messagesPerField.getFirstError(
                                            "recoveryCodeInput"
                                        )
                                    )
                                }}
                            />
                        </FieldError>
                    )}
                </Field>

                <Button className="w-full" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
