import { LogoutOtherSessions } from "@/components/logout-other-sessions";
import { PasswordWrapper } from "@/components/password-wrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { KcContext } from "@/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginUpdatePassword(
    props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, locale, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form
                id="kc-passwd-update-form"
                className="space-y-6"
                action={url.loginAction}
                method="post"
            >
                <Field>
                    <FieldLabel htmlFor="password-new">{msg("passwordNew")}</FieldLabel>
                    <PasswordWrapper
                        kcClsx={kcClsx}
                        i18n={i18n}
                        locale={locale}
                        passwordInputId="password-new"
                    >
                        <Input
                            type="password"
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password")}
                        />
                    </PasswordWrapper>
                    {messagesPerField.existsError("password") && (
                        <FieldError>
                            <span
                                id="input-error"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(
                                        messagesPerField.getFirstError("password")
                                    )
                                }}
                            />
                        </FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="password-confirm">
                        {msg("passwordConfirm")}
                    </FieldLabel>
                    <PasswordWrapper
                        kcClsx={kcClsx}
                        i18n={i18n}
                        locale={locale}
                        passwordInputId="password-confirm"
                    >
                        <Input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError(
                                "password-confirm"
                            )}
                        />
                    </PasswordWrapper>
                    {messagesPerField.existsError("password-confirm") && (
                        <FieldError>
                            <span
                                id="input-error"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(
                                        messagesPerField.getFirstError("password-confirm")
                                    )
                                }}
                            />
                        </FieldError>
                    )}
                </Field>

                <LogoutOtherSessions i18n={i18n} />

                <div className="space-y-3">
                    <Button className="w-full" type="submit">
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            variant="outline"
                            className="w-full"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
