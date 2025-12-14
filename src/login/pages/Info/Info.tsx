import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { I18n } from "@/login/i18n";
import { KcContext } from "@/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";

export default function Info(
    props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const {
        messageHeader,
        message,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client
    } = kcContext;
    getKcClsx({ doUseDefaultCss, classes });

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
                        __html: kcSanitize(
                            messageHeader
                                ? advancedMsgStr(messageHeader)
                                : message.summary
                        )
                    }}
                />
            }
        >
            <Alert variant="info" className="my-3">
                <AlertDescription>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(
                                (() => {
                                    let html = message.summary;

                                    if (requiredActions) {
                                        html += "<b>";

                                        html += requiredActions
                                            .map(requiredAction =>
                                                advancedMsgStr(
                                                    `requiredAction.${requiredAction}`
                                                )
                                            )
                                            .join(", ");

                                        html += "</b>";
                                    }

                                    return html;
                                })()
                            )
                        }}
                    />
                </AlertDescription>
            </Alert>

            {(() => {
                if (skipLink) {
                    return null;
                }

                if (pageRedirectUri) {
                    return (
                        <Button type="button" className="mt-2 flex ms-auto">
                            <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                        </Button>
                    );
                }
                if (actionUri) {
                    return (
                        <Button type="button" className="mt-2 flex ms-auto ">
                            <a href={actionUri}>{msg("proceedWithAction")}</a>
                        </Button>
                    );
                }

                if (client.baseUrl) {
                    return (
                        <Button type="button" className="mt-2 flex  ms-auto-end">
                            <a href={client.baseUrl}>{msg("backToApplication")}</a>
                        </Button>
                    );
                }
            })()}
        </Template>
    );
}
