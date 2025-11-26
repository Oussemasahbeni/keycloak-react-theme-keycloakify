import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

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
                <div className="flex justify-between mt-4">
                    <Button name="accept" id="kc-accept" type="submit" >
                        {msgStr("doConfirmDelete")}
                    </Button>

                    <Button variant="outline" name="cancel-aia" id="kc-decline" type="submit">
                        {msgStr("doCancel")}
                    </Button>
                </div>
            </form>
            <div className="clearfix" />
        </Template>
    );
}
