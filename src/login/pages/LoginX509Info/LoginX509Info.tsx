import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KcContext } from '@/login/KcContext';
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginX509Info(props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, x509 } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <form id="kc-x509-login-info" className="space-y-6" action={url.loginAction} method="post">
                <div className="space-y-2">
                    <Label className="text-sm font-medium">{msg("clientCertificate")}</Label>
                    <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-mono break-all">{x509.formData.subjectDN || msg("noCertificate")}</p>
                    </div>
                </div>

                {x509.formData.isUserEnabled && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">{msg("doX509Login")}</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium">{x509.formData.username}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                    {x509.formData.isUserEnabled && (
                        <Button variant="outline" name="cancel" id="kc-cancel" type="submit" className="sm:flex-1">
                            {msgStr("doIgnore")}
                        </Button>
                    )}
                    <Button name="login" id="kc-login" type="submit" className="sm:flex-1">
                        {msgStr("doContinue")}
                    </Button>

                </div>
            </form>
        </Template>
    );
}
