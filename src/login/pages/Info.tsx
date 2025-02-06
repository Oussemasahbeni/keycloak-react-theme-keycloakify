import { Alert, AlertDescription } from "@/components/ui/alert";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });


    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >

            <Alert variant="default" className="flex  gap-2 justify-center">
                <div>
                    <span className={kcClsx("kcFeedbackInfoIcon")}></span>
                </div>
                <AlertDescription>
                    <div id="kc-info-message">
                        <p

                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                    (() => {
                                        let html = message.summary;

                                        if (requiredActions) {
                                            html += "<b>";

                                            html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                            html += "</b>";
                                        }

                                        return html;
                                    })()
                                )
                            }}
                        />

                    </div>
                </AlertDescription>
            </Alert>

            {(() => {
                if (skipLink) {
                    return null;
                }

                if (pageRedirectUri) {
                    return (
                        <p>
                            <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                        </p>
                    );
                }
                if (actionUri) {
                    return (
                        <p>
                            <a href={actionUri}>{msg("proceedWithAction")}</a>
                        </p>
                    );
                }

                if (client.baseUrl) {
                    return (
                        <p>
                            <a href={client.baseUrl}>{msg("backToApplication")}</a>
                        </p>
                    );
                }
            })()}
        </Template>
    );
}
