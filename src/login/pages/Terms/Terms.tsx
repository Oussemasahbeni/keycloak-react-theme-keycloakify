import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div className="space-y-6">
                <div id="kc-terms-text" className="p-4 bg-muted/50 rounded-lg max-h-64 overflow-y-auto text-sm leading-relaxed">
                    {msg("termsText")}
                </div>

                <form className="space-y-4" action={url.loginAction} method="POST">
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                        <Button name="accept" id="kc-accept" type="submit" className="sm:flex-1">
                            {msgStr("doAccept")}
                        </Button>
                        <Button variant="outline" name="cancel" id="kc-decline" type="submit" className="sm:flex-1">
                            {msgStr("doDecline")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
