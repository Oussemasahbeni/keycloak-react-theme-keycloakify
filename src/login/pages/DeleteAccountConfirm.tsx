import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("deleteAccountConfirm")}>
            <form action={url.loginAction} className="space-y-6" method="post">

                <Alert type="warning" className="my-3">
                    <AlertDescription>
                        <span>{msg("irreversibleAction")}</span>
                    </AlertDescription>
                </Alert>

                <div className="space-y-4">
                    <p className="text-foreground">{msg("deletingImplies")}</p>

                    <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                        <li>{msg("loggingOutImmediately")}</li>
                        <li>{msg("errasingData")}</li>
                    </ul>

                    <p className="text-foreground font-medium mt-6">
                        {msg("finalDeletionConfirmation")}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                    <Button type="submit" variant="destructive" className="sm:flex-1">
                        {msgStr("doConfirmDelete")}
                    </Button>
                    {triggered_from_aia && (
                        <Button variant="outline" type="submit" name="cancel-aia" value="true" className="sm:flex-1">
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}