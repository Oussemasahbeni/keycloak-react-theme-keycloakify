import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect } from "react";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function FrontchannelLogout(props: PageProps<Extract<KcContext, { pageId: "frontchannel-logout.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { logout } = kcContext;

    const { msg, msgStr } = i18n;

    useEffect(() => {
        if (logout.logoutRedirectUri) {
            window.location.replace(logout.logoutRedirectUri);
        }
    }, []);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <Alert type="info" className="my-6">
                <AlertDescription >
                    <p>{msg("frontchannel-logout.message")}</p>
                </AlertDescription>
            </Alert>

            {logout.clients.length > 0 && (
                <div className="my-6 space-y-3">
                    <div className="space-y-2">
                        {logout.clients.map((client, index) => (
                            <div key={client.name || index} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                                <FiCheck className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">
                                    {client.name || `Application ${index + 1}`}
                                </span>
                                <iframe
                                    src={client.frontChannelLogoutUrl}
                                    style={{ display: "none" }}
                                    title={`Logout frame for ${client.name}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {logout.logoutRedirectUri && (
                <div className="mt-6 flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="min-w-[200px]"
                    >
                        <a id="continue" href={logout.logoutRedirectUri} className="flex items-center gap-2">
                            {msg("doContinue")}
                            <FiExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            )}
        </Template>
    );
}