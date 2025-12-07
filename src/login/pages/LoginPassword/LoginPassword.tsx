import { PasswordWrapper } from "@/components/password-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { KcContext } from '@/login/KcContext';
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from 'keycloakify/login/pages/LoginUsername.useScript';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import type { I18n } from "../../i18n";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { realm, url, locale, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);


    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({
        webAuthnButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <form
                id="kc-form-login"
                className="space-y-3"
                onSubmit={() => {
                    setIsLoginButtonDisabled(true);
                    return true;
                }}
                action={url.loginAction}
                method="post"
            >
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                        {msg("password")}
                    </Label>
                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} locale={locale} passwordInputId="password">
                        <Input
                            tabIndex={2}
                            type="password"
                            id="password"
                            name="password"
                            autoFocus
                            autoComplete="current-password"
                            placeholder={msgStr("passwordPlaceholder")}
                            error={messagesPerField.existsError("password")}
                        />
                    </PasswordWrapper>

                    {messagesPerField.existsError("password") && (
                        <InputError id="input-error-password">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        </InputError>
                    )}
                </div>

                <div className="flex justify-end">
                    {realm.resetPasswordAllowed && (
                        <a
                            tabIndex={5}
                            href={url.loginResetCredentialsUrl}
                            className="text-primary dark:text-primary-foreground underline-offset-4 hover:underline"
                        >
                            {msg("doForgotPassword")}
                        </a>
                    )}
                </div>

                <Button disabled={isLoginButtonDisabled} className="w-full" name="login" type="submit" tabIndex={4}>
                    {msgStr("doLogIn")}
                </Button>
            </form>
            {enableWebAuthnConditionalUI && (
                <>
                    <form id="webauth" action={url.loginAction} method="post">
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input type="hidden" id="authenticatorData" name="authenticatorData" />
                        <input type="hidden" id="signature" name="signature" />
                        <input type="hidden" id="credentialId" name="credentialId" />
                        <input type="hidden" id="userHandle" name="userHandle" />
                        <input type="hidden" id="error" name="error" />
                    </form>

                    {authenticators !== undefined && authenticators.authenticators.length !== 0 && (
                        <>
                            <form id="authn_select" className={kcClsx("kcFormClass")}>
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                                ))}
                            </form>
                        </>
                    )}
                    <br />

                    <Button
                        id={webAuthnButtonId}
                        type="button"
                        className="w-full"
                        variant="outline"

                    >
                        {msgStr("passkey-doAuthenticate")}
                    </Button>
                </>
            )}
        </Template>
    );
}
