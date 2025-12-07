import { Alert, AlertDescription } from "@/components/ui/alert";
import { KcContext } from '@/login/KcContext';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <Alert id="instruction1" type={"info"} className="my-3">
                <AlertDescription>{msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}</AlertDescription>
            </Alert>

            <div className="space-y-2 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                    {msg("emailLinkIdp2")}{" "}
                    <a href={url.loginAction} className="inline-flex items-center gap-1 text-primary dark:text-white underline underline-offset-2">
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp3")}
                </p>

                <p className="leading-relaxed">
                    {msg("emailLinkIdp4")}{" "}
                    <a href={url.loginAction} className="inline-flex items-center gap-1 text-primary dark:text-white underline underline-offset-2">
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
