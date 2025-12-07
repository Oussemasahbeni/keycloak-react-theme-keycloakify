import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <div className="space-y-6">
                <form id="kc-register-form" className="space-y-6" action={url.registrationAction} method="post">
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        kcClsx={kcClsx}
                        onIsFormSubmittableValueChange={setIsFormSubmittable}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />

                    {termsAcceptanceRequired && (
                        <TermsAcceptance
                            i18n={i18n}
                            messagesPerField={messagesPerField}
                            areTermsAccepted={areTermsAccepted}
                            onAreTermsAcceptedValueChange={setAreTermsAccepted}
                        />
                    )}

                    {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                        <div className="space-y-2">
                            <div className="flex justify-center">
                                <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                            <button
                                className={clsx(
                                    "w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors",
                                    "g-recaptcha"
                                )}
                                data-sitekey={recaptchaSiteKey}
                                style={{ width: "100%" }}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msg("doRegister")}
                            </button>
                        ) : (
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className="w-full"
                                name="register"
                                type="submit"
                            >
                                {msgStr("doRegister")}
                            </Button>
                        )}
                    </div>
                </form>

                <div className="mt-2 flex justify-end">
                    <Button variant="ghost">
                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                    </Button>
                </div>
            </div>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <h3 className="font-medium text-sm">{msg("termsTitle")}</h3>
                <div className="text-sm text-muted-foreground">{msg("termsText")}</div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={areTermsAccepted}
                        onCheckedChange={checked => onAreTermsAcceptedValueChange(!!checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm font-medium cursor-pointer">
                        {msg("acceptTerms")}
                    </Label>
                </div>

                {messagesPerField.existsError("termsAccepted") && (
                    <InputError id="input-error-terms-accepted">
                        <span dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("termsAccepted")) }} />
                    </InputError>
                )}
            </div>
        </div>
    );
}
