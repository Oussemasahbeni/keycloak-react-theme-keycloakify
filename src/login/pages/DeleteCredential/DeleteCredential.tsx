import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { I18n } from '@/login/i18n';
import { KcContext } from '@/login/KcContext';
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, credentialLabel } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <Alert type="warning" className=" my-3">
                <AlertDescription>
                    <span>{msg("deleteCredentialMessage", credentialLabel)}</span>
                </AlertDescription>
            </Alert>

            <form className="form-actions" action={url.loginAction} method="POST">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                    <Button variant="outline" name="cancel-aia" id="kc-decline" type="submit" className="sm:flex-1">
                        {msgStr("doCancel")}
                    </Button>

                    <Button name="accept" id="kc-accept" type="submit" variant="destructive" className="sm:flex-1">
                        {msgStr("doConfirmDelete")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
