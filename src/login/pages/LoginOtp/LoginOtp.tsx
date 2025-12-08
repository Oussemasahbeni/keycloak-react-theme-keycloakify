import { Button } from "@/components/ui/button";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { KcContext } from '@/login/KcContext';
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { MdOutlineDevices } from "react-icons/md";
import type { I18n } from "../../i18n";

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
                    <Label htmlFor="otp" className="text-sm font-medium text-center block">
                        {msg("loginOtpOneTime")}
                    </Label>
                    <div className="flex justify-center">
                        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} name="otp" autoFocus>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                                <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                                <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                                <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                                <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                                <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
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
