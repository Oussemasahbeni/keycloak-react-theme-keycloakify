import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";

export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<
        Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <form
                id="kc-user-verify-device-user-code-form"
                className="space-y-5"
                action={url.oauth2DeviceVerificationAction}
                method="post"
            >
                <Field>
                    <FieldLabel htmlFor="device-user-code">
                        {" "}
                        {msg("verifyOAuth2DeviceUserCode")}
                    </FieldLabel>
                    <Input
                        id="device-user-code"
                        name="device_user_code"
                        autoComplete="off"
                        type="text"
                        className={kcClsx("kcInputClass")}
                        autoFocus
                    />
                </Field>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <div className={kcClsx("kcFormButtonsWrapperClass")}>
                            <Button className="w-full" type="submit">
                                {msgStr("doSubmit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
