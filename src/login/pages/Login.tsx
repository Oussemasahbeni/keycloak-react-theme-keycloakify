import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import { checkboxVariants } from "@/components/ui/checkbox";
import useProviderLogos from "../useProviderLogos";





export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, locale, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const providerLogos = useProviderLogos();


    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={
                <div className={clsx("text-left ", locale?.rtl && "text-right")}>
                    <p className=" text-2xl  font-bold  gap-2">
                        {msg("loginAccountTitle")}
                    </p>
                    <p className="text-balance font-normal text-sm text-muted-foreground">
                        {msg("enterCredentials")}
                    </p>
                    <hr className="mt-1" />
                </div>
            }
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span className="space-x-2">
                            {msg("noAccount")}
                            <a className="text-primary hover:text-red underline underline-offset-2  " tabIndex={8} href={url.registrationUrl}>
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

                            <div className="relative mt-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    {msg("identity-provider-login-label")}
                                </span>
                            </div>
                            <ul className={clsx(kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass"), " gap-2")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <Button variant="outline" className="w-full dark:bg-slate-200 hover:text-current">
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
                                                <span

                                                    dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                                ></span>
                                            </a>
                                        </Button>

                                    </li>
                                ))}
                            </ul>

                            {/* <h2>{msg("identity-provider-login-label")}</h2> */}
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
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
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
                                        autoComplete="username"
                                        placeholder="m@example.com"
                                        isError={messagesPerField.existsError("username", "password")}
                                    />

                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                {/* <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label> */}
                                <Label htmlFor="password">
                                    {msg("password")}
                                </Label>

                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} locale={locale} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder={msgStr("passwordPlaceholder")}
                                        autoComplete="current-password"
                                        isError={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>


                            <div className=" space-y-1 mb-3 flex justify-between text-xs  ">
                                <div>
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center space-x-2 ">
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                className={clsx(checkboxVariants({}), "")}
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                            />
                                            <span>{msgStr("rememberMe")}</span>
                                        </div>
                                    )}
                                </div>
                                <div className=" link-style">
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msgStr("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                <Button disabled={isLoginButtonDisabled} className="w-full" name="login" type="submit" value={msgStr("doLogIn")}>
                                    {msgStr("doLogIn")}
                                </Button>
                                {/* <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={clsx(
                                        kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                        "rounded-lg"
                                    )}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                /> */}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; locale: KcContext["locale"], children: JSX.Element }) {
    const { i18n, passwordInputId, locale, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className={`absolute inset-y-0 ${locale?.rtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-sm leading-5`}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    );
}
