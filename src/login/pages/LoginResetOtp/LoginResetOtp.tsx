import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { KcContext } from '@/login/KcContext';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { Smartphone } from 'lucide-react';
import type { I18n } from "../../i18n";

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

                    <RadioGroup name="selectedCredentialId" defaultValue={configuredOtpCredentials.selectedCredentialId} className="space-y-2">
                        {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                            <div key={otpCredential.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <Label htmlFor={`kc-otp-credential-${index}`} className="flex items-center space-x-2 cursor-pointer flex-1">
                                    <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                    <span className="text-sm font-medium">{otpCredential.userLabel}</span>
                                </Label>
                                <RadioGroupItem value={otpCredential.id} id={`kc-otp-credential-${index}`} />

                            </div>
                        ))}
                    </RadioGroup>

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
