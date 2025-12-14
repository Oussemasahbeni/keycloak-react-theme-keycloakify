import { Alert, AlertDescription } from "@/components/ui/alert";
import { KcContext } from '@/login/KcContext';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <Alert variant="warning" className="my-6">
                <AlertDescription>
                    <div className="space-y-3 text-sm leading-relaxed">
                        <p>
                            {msg("pageExpiredMsg1")}{" "}
                            <a
                                id="loginRestartLink"
                                href={url.loginRestartFlowUrl}
                                className="text-primary dark:text-white hover:text-primary/80 underline underline-offset-2 font-medium"
                            >
                                {msg("doClickHere")}
                            </a>
                            .
                        </p>
                        <p>
                            {msg("pageExpiredMsg2")}{" "}
                            <a
                                id="loginContinueLink"
                                href={url.loginAction}
                                className="text-primary dark:text-white hover:text-primary/80 underline underline-offset-2 font-medium"
                            >
                                {msg("doClickHere")}
                            </a>
                            .
                        </p>
                    </div>
                </AlertDescription>
            </Alert>
        </Template>
    );
}
