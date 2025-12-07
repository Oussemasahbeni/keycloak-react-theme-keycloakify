import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../KcContext";
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
            <form id="kc-reset-password-form" className="space-y-2" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                        {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                    </Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        autoFocus
                        defaultValue={auth.attemptedUsername ?? ""}
                        error={messagesPerField.existsError("username")}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <InputError id="input-error-username">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        </InputError>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button variant="link" type="button">
                        <a id="backToApplication" className="dark:text-white" href={url.loginUrl}>
                            {msg("backToApplication")}
                        </a>
                    </Button>
                </div>

                <Button className="w-full" type="submit">
                    {msgStr("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
