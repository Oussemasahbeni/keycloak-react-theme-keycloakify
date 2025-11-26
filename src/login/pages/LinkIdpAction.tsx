import { Button } from '@/components/ui/button';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
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
            <div id="kc-link-text" >
                {msg("linkIdpActionMessage", idpDisplayName)}
            </div>
            <form action={url.loginAction} method="post">
                <div >
                    <div id="kc-form-buttons" className="flex  gap-3 mt-4">

                        <Button name="continue" id="kc-continue" type="submit" >
                            {msgStr("doContinue")}
                        </Button>

                        <Button
                            name="cancel-aia"
                            variant="outline"
                            id="kc-cancel"
                            type="submit" >
                            {msgStr("doCancel")}
                        </Button>


                    </div>
                </div>
            </form>
            <div className="clearfix" />
        </Template>
    );
}
