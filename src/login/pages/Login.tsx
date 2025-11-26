import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import { PasswordWrapper } from "@/components/password-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { InputError } from "@/components/ui/input-error";
import { useScript } from 'keycloakify/login/pages/LoginUsername.useScript';
import useProviderLogos from "../useProviderLogos";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, locale, enableWebAuthnConditionalUI, authenticators } =
        kcContext;
    const { msg, msgStr } = i18n;

    const providerLogos = useProviderLogos();

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
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={
                <div className="text-start">
                    <p className="text-2xl font-bold">{msg("loginAccountTitle")}</p>
                    <p className="text-balance font-normal text-sm text-muted-foreground">{msg("enterCredentials")}</p>
                    <hr className="my-3" />
                </div>
            }
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span className="space-x-2">
                            {msg("noAccount")}
                            <a
                                className="text-primary dark:text-primary-foreground underline underline-offset-4 "
                                tabIndex={8}
                                href={url.registrationUrl}
                            >
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <div className="mt-4 flex items-center text-sm">
                                <div className="mt-px flex-auto border-t"></div>
                                <div className="text-muted-foreground mx-2">{msg("identity-provider-login-label")}</div>
                                <div className="mt-px flex-auto border-t"></div>
                            </div>
                            <ul className={`mt-4! grid gap-2 sm:grid-cols-1 ${(social?.providers?.length ?? 0) > 3 ? "sm:grid-cols-2" : ""}`}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <Button variant="outline" className="w-full hover:text-current">
                                            <a
                                                id={`social-${p.alias}`}
                                                className={clsx(
                                                    kcClsx(providers.length > 3 && "kcFormSocialAccountGridItem"),
                                                    "flex items-center justify-center gap-2 "
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                <div className={"h-5 w-5"}>
                                                    {providerLogos[p.alias] ? (
                                                        <img src={providerLogos[p.alias]} alt={`${p.displayName} logo`} className={"h-full w-auto"} />
                                                    ) : (
                                                        // Fallback to the original iconClasses if the logo is not defined
                                                        p.iconClasses && (
                                                            <i
                                                                className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses, `text-provider-${p.alias}`)}
                                                                aria-hidden="true"
                                                            ></i>
                                                        )
                                                    )}
                                                </div>

                                                {/* {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>} */}
                                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}></span>
                                            </a>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className={messagesPerField.existsError("username", "password") ? "space-y-1" : "space-y-4"}
                        >
                            {!usernameHidden && (
                                <div>
                                    <Label htmlFor="username">
                                        {!realm.loginWithEmailAllowed
                                            ? msg("email")
                                            : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("username")}
                                    </Label>
                                    <Input
                                        tabIndex={2}
                                        type="text"
                                        id="username"
                                        defaultValue={login.username ?? ""}
                                        name="username"
                                        autoFocus
                                        className="autofill:bg-background"
                                        autoComplete="username"
                                        placeholder="m@example.com"
                                        error={messagesPerField.existsError("username", "password")}
                                    />

                                    {messagesPerField.existsError("username", "password") && (
                                        <InputError id="input-error-password">{messagesPerField.getFirstError("username", "password")}</InputError>
                                    )}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="password">{msg("password")}</Label>

                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} locale={locale} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder={msgStr("passwordPlaceholder")}
                                        autoComplete="current-password"
                                        error={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>

                                {messagesPerField.existsError("username", "password") && (
                                    <InputError id="input-error-password">{messagesPerField.getFirstError("username", "password")}</InputError>
                                )}
                            </div>

                            <div className=" space-y-1 my-3 flex justify-between text-xs  ">
                                <div>
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center space-x-2 ">
                                            <Checkbox tabIndex={5} id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} />

                                            <Label htmlFor="rememberMe" className="text-sm font-medium cursor-pointer">
                                                {msg("rememberMe")}
                                            </Label>
                                        </div>
                                    )}
                                </div>
                                <div className="link-style ">
                                    {realm.resetPasswordAllowed && (
                                        <span className="text-primary dark:text-primary-foreground underline-offset-4 hover:underline">
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                <Label className="text-sm font-medium cursor-pointer">{msg("doForgotPassword")}</Label>
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                <Button
                                    disabled={isLoginButtonDisabled}
                                    className="w-full"
                                    tabIndex={7}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
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
            </div>
        </Template>
    );
}
