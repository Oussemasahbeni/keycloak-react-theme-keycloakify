import { Button } from "@/components/ui/button";
import { KcContext } from "@/login/KcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LinkIdpAction(
    props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { idpDisplayName, url } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("linkIdpActionTitle", idpDisplayName)}
            displayMessage={false}
        >
            <div id="kc-link-text">{msg("linkIdpActionMessage", idpDisplayName)}</div>
            <form action={url.loginAction} method="post">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                    <Button
                        name="cancel-aia"
                        variant="outline"
                        className="flex-1"
                        id="kc-cancel"
                        type="submit"
                    >
                        {msgStr("doCancel")}
                    </Button>
                    <Button
                        name="continue"
                        id="kc-continue"
                        type="submit"
                        className="flex-1"
                    >
                        {msgStr("doContinue")}
                    </Button>
                </div>
            </form>
            <div className="clearfix" />
        </Template>
    );
}
