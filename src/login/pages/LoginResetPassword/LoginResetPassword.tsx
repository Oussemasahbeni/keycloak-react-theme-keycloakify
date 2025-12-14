import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from "@/components/ui/input";
import { KcContext } from '@/login/KcContext';
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className='space-y-3' action={url.loginAction} method="post">
                <Field >
                    <FieldLabel htmlFor="username">  {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}</FieldLabel>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        autoFocus
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <FieldError>
                            <span
                                id="input-error"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.getFirstError("username"))
                                }}
                            />
                        </FieldError>
                    )}
                </Field>

                <Button className="w-full" type="submit">
                    {msgStr("doSubmit")}
                </Button>

                <div className="flex justify-end">
                    <Button variant="link" type="button">
                        <a id="backToApplication" href={url.loginUrl}>
                            {msg("backToApplication")}
                        </a>
                    </Button>
                </div>
            </form>
        </Template>
    );
}
