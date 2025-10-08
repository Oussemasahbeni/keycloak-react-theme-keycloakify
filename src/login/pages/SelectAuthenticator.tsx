import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { ChevronRight } from "lucide-react";
import { FaKey } from "react-icons/fa";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;

    getKcClsx({ doUseDefaultCss, classes });
    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <form id="kc-select-credential-form" className="space-y-3" action={url.loginAction} method="post">
                <div className="space-y-2">
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <Button
                            key={i}
                            variant="outline"
                            className="w-full h-auto p-4 flex items-center justify-between text-left hover:bg-accent"
                            type="submit"
                            name="authenticationExecution"
                            value={authenticationSelection.authExecId}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <FaKey />

                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">{advancedMsg(authenticationSelection.displayName)}</div>
                                    <div className="text-xs text-muted-foreground mt-1 whitespace-normal">
                                        {advancedMsg(authenticationSelection.helpText)}
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </Button>
                    ))}
                </div>
            </form>
        </Template>
    );
}
