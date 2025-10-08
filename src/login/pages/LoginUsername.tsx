import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration" className="text-center text-sm">
                    <span>
                        {msg("noAccount")}{" "}
                        <a
                            className="text-primary dark:text-primary-foreground underline underline-offset-4 "
                            tabIndex={8}
                            href={url.registrationUrl}
                        >
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="space-y-4">
                            <div className="text-center">
                                <h2 className="text-sm font-medium text-muted-foreground">{msg("identity-provider-login-label")}</h2>
                            </div>
                            <div className={clsx("grid gap-2", social.providers.length > 3 ? "grid-cols-2" : "grid-cols-1")}>
                                {social.providers.map(p => (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
                                        href={p.loginUrl}
                                    >
                                        {p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                                        <span className="text-sm font-medium">{p.displayName}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            }
        >
            {realm.password && (
                <form
                    id="kc-form-login"
                    className="space-y-6"
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                >
                    {!usernameHidden && (
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </Label>
                            <Input
                                tabIndex={2}
                                type="text"
                                id="username"
                                defaultValue={login.username ?? ""}
                                name="username"
                                autoFocus
                                autoComplete="username"
                                error={messagesPerField.existsError("username")}
                            />
                            {messagesPerField.existsError("username") && (
                                <InputError id="input-error">{messagesPerField.getFirstError("username")}</InputError>
                            )}
                        </div>
                    )}

                    {realm.rememberMe && !usernameHidden && (
                        <div className="flex items-center space-x-2">
                            <Checkbox tabIndex={3} id="rememberMe" name="rememberMe" value="on" defaultChecked={!!login.rememberMe} />
                            <Label htmlFor="rememberMe" className="text-sm font-medium cursor-pointer">
                                {msg("rememberMe")}
                            </Label>
                        </div>
                    )}

                    <Button disabled={isLoginButtonDisabled} className="w-full" name="login" type="submit" tabIndex={4}>
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            )}
        </Template>
    );
}
