import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { useState } from "react";
import { FaBitbucket, FaFacebook, FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";
import { FaPaypal, FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { SiInstagram } from "react-icons/si";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import { IoLogoMicrosoft } from "react-icons/io5";









export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, locale, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={
                <div className={clsx("text-left text-2xl  font-bold  gap-2", locale?.rtl && "text-right")}>
                          {msg("loginAccountTitle")}
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
                                        <Button variant="outline" className="w-full">
                                            <a
                                                id={`social-${p.alias}`}
                                                className={clsx(
                                                    kcClsx(providers.length > 3 && "kcFormSocialAccountGridItem"),
                                                    "flex items-center justify-center gap-5"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {(() => {
                                                    switch (p.providerId) {
                                                        case "github":
                                                            return <FaGithub color="black" />

                                                        case "google":
                                                            return <FcGoogle />
                                                        case "facebook":
                                                            return <FaFacebook color="#1877F2" />

                                                        case "microsoft":
                                                            return <IoLogoMicrosoft color="#1877F2" />


                                                        case "twitter":
                                                            return <FaSquareXTwitter color="black" />

                                                        case "instagram":
                                                            return <SiInstagram color="#E4405F" />

                                                        case "linkedin":
                                                            return <FaLinkedin color="#0077B5" />

                                                        case "stackoverflow":
                                                            return <FaStackOverflow color="#F48024" />

                                                        case "bitbucket":
                                                            return <FaBitbucket color="#0052CC" />

                                                        case "paypal":
                                                            return <FaPaypal color="#003087" />


                                                        case "gitlab":
                                                            return <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                                                <path fill="#e53935" d="M24 43L16 20 32 20z"></path><path fill="#ff7043" d="M24 43L42 20 32 20z"></path><path fill="#e53935" d="M37 5L42 20 32 20z"></path><path fill="#ffa726" d="M24 43L42 20 45 28z"></path><path fill="#ff7043" d="M24 43L6 20 16 20z"></path><path fill="#e53935" d="M11 5L6 20 16 20z"></path><path fill="#ffa726" d="M24 43L6 20 3 28z"></path>
                                                            </svg>
                                                    }
                                                    return <IoIosLink />

                                                })()}

                                                {/* {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>} */}
                                                <span
                                                    className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
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
                                    <Label className="flex justify-between" htmlFor="username">
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
                                        placeholder="youremail@example.com"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
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
                                <Label className="flex justify-between" htmlFor="password">
                                    {msg("password")}

                                    
                                </Label>

                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} locale={locale} passwordInputId="password">
                                    <Input
                                        tabIndex={3}
                                        type="password"
                                        id="password"
                                        defaultValue={login.username ?? ""}
                                        name="password"
                                        autoFocus
                                        placeholder={msgStr("passwordPlaceholder")}
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
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

                            <div className="flex items-center justify-between">
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                
                                {realm.resetPasswordAllowed && (
                                        <span className="mb-3">
                                            <a
                                                className="text-primary hover:text-violet-600 focus:text-violet-600 "
                                                tabIndex={6}
                                                href={url.loginResetCredentialsUrl}
                                            >
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
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
