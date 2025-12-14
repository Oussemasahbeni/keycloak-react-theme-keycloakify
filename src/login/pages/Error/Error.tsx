import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { I18n } from "@/login/i18n";
import { KcContext } from "@/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";

export default function Error(
    props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    getKcClsx({ doUseDefaultCss, classes });

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
            <div id="kc-error-message">
                <Alert variant="error" className="my-3">
                    <AlertDescription>
                        <span
                            className="instruction"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(message.summary)
                            }}
                        />
                    </AlertDescription>
                </Alert>

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <div className="mt-2 flex justify-end">
                        <Button type="button">
                            <a id="backToApplication" href={client.baseUrl}>
                                {msg("backToApplication")}
                            </a>
                        </Button>
                    </div>
                )}
            </div>
        </Template>
    );
}
