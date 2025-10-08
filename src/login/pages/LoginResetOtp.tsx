import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { Fragment } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-reset-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className="flex flex-col gap-2 w-full">
                    <p id="kc-otp-reset-form-description">{msg("otp-reset-description")}</p>
                    {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                        <Fragment key={otpCredential.id}>
                            <div className="flex items-center gap-2">
                                <input
                                    id={`kc-otp-credential-${index}`}
                                    className={kcClsx("kcLoginOTPListInputClass")}
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={otpCredential.id === configuredOtpCredentials.selectedCredentialId}
                                />
                                <Label
                                    htmlFor={`kc-otp-credential-${index}`}
                                    className={clsx(kcClsx("kcLoginOTPListClass"), "w-full")}
                                    tabIndex={index}
                                >
                                    <span className={kcClsx("kcLoginOTPListItemHeaderClass")}>
                                        <span className={kcClsx("kcLoginOTPListItemIconBodyClass")}>
                                            <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                        </span>
                                        <span className={kcClsx("kcLoginOTPListItemTitleClass")}>{otpCredential.userLabel}</span>
                                    </span>
                                </Label>
                            </div>
                        </Fragment>
                    ))}
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button id="kc-otp-reset-form-submit" className={"w-full"} type="submit">
                                {msgStr("doSubmit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
