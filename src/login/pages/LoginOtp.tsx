import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { MdOutlineDevices } from "react-icons/md";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

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
            <form id="kc-otp-login-form" className="space-y-6" action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className="space-y-3">
                        <RadioGroup name="selectedCredentialId" defaultValue={otpLogin.selectedCredentialId} className="space-y-2">
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <div key={otpCredential.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <RadioGroupItem value={otpCredential.id} id={`kc-otp-credential-${index}`} />
                                    <Label htmlFor={`kc-otp-credential-${index}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                                        <MdOutlineDevices />
                                        <span className="text-sm font-medium">{otpCredential.userLabel}</span>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">
                        {msg("loginOtpOneTime")}
                    </Label>
                    <Input
                        id="otp"
                        name="otp"
                        autoComplete="off"
                        type="text"
                        autoFocus
                        placeholder="Enter your authentication code"
                        aria-invalid={messagesPerField.existsError("totp")}
                    />
                    {messagesPerField.existsError("totp") && (
                        <InputError id="input-error-otp-code">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("totp"))
                                }}
                            />
                        </InputError>
                    )}
                </div>

                <Button className="w-full" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
