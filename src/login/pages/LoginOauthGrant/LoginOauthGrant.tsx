import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../../KcContext";
import type { I18n } from "../../i18n";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                <div className="flex flex-col items-center space-y-3">
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} alt="Client logo" className="h-12 w-auto object-contain" />}
                    <p className="text-lg font-medium text-center">
                        {client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}
                    </p>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-base">{msg("oauthGrantRequest")}</div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        {oauth.clientScopesRequested.map(clientScope => (
                            <div key={clientScope.consentScreenText} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    {advancedMsg(clientScope.consentScreenText)}
                                    {clientScope.dynamicScopeParameter && (
                                        <>
                                            : <span className="font-medium text-foreground">{clientScope.dynamicScopeParameter}</span>
                                        </>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    {(client.attributes.policyUri || client.attributes.tosUri) && (
                        <>
                            <div className="space-y-2">
                                <CardDescription className="text-xs">
                                    {client.name
                                        ? msg("oauthGrantInformation", advancedMsgStr(client.name))
                                        : msg("oauthGrantInformation", client.clientId)}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {client.attributes.tosUri && (
                                        <a
                                            href={client.attributes.tosUri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary dark:text-white hover:text-primary/80 underline underline-offset-4"
                                        >
                                            {msg("oauthGrantTos")}
                                        </a>
                                    )}
                                    {client.attributes.policyUri && (
                                        <a
                                            href={client.attributes.policyUri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary dark:text-white hover:text-primary/80 underline underline-offset-4"
                                        >
                                            {msg("oauthGrantPolicy")}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <form className="w-full" action={url.oauthAction} method="POST">
                        <input type="hidden" name="code" value={oauth.code} />
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Button type="submit" name="cancel" id="kc-cancel" variant="outline" className="flex-1">
                                {msgStr("doNo")}
                            </Button>
                            <Button type="submit" name="accept" id="kc-login" className="flex-1">
                                {msgStr("doYes")}
                            </Button>

                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
