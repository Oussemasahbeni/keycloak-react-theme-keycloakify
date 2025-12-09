import { Button } from "@/components/ui/button";
import { KcContext } from '@/login/KcContext';
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("logoutConfirmTitle")}>
            <div className="space-y-4">
                <p className="text-foreground ">{msg("logoutConfirmHeader")}</p>

                <form className="space-y-6" action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />

                    <Button tabIndex={4} className="w-full" name="confirmLogout" id="kc-logout" type="submit">
                        {msgStr("doLogout")}
                    </Button>
                </form>

                {!logoutConfirm.skipLink && client.baseUrl && (
                    <div className="flex justify-end">
                        <a href={client.baseUrl} className="text-sm text-primary dark:text-white hover:text-primary/80 underline underline-offset-4">
                            {msg("backToApplication")}
                        </a>
                    </div>
                )}
            </div>
        </Template>
    );
}
