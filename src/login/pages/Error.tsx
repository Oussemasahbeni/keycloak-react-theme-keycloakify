import { Alert, AlertDescription } from "@/components/ui/alert";
import clsx from "clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });


    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >

            <div id="kc-error-message" >
                <Alert variant="destructive" className="flex  gap-2 justify-center">
                    <div>

                        {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                    </div>
                    <AlertDescription>
                        <div
                            className={clsx(
                                `alert-${message.type}`,
                                `pf-m-${message?.type === "error" ? "danger" : message.type}`
                            )}
                        >
                            <span
                                className="instruction"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary)
                                }}
                            />
                        </div>
                    </AlertDescription>
                </Alert>

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p className="mt-2">
                        <a id="backToApplication" href={client.baseUrl}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
