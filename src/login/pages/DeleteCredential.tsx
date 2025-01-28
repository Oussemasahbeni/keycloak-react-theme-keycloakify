import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { kcClsx } = getKcClsx({
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
            <div id="kc-delete-text">{msg("deleteCredentialMessage", credentialLabel)}</div>
            <form className="form-actions" action={url.loginAction} method="POST">
                <div className="flex justify-between mt-4">
                    <Button className={"bg-blue-600 hover:bg-blue-700"} name="accept" id="kc-accept" type="submit" value={msgStr("doConfirmDelete")}>
                        {msgStr("doConfirmDelete")}
                    </Button>

                    <Button className="bg-gray-400 hover:bg-gray-500 " name="cancel-aia" id="kc-decline" type="submit">
                        {msgStr("doCancel")}
                    </Button>
                </div>
            </form>
            <div className="clearfix" />
        </Template>
    );
}
