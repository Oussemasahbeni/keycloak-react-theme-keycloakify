import { LogoutOtherSessions } from "@/components/logout-other-sessions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { Copy, Download, Printer } from "lucide-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <div className="space-y-6">
                <Alert type="warning">
                    <AlertDescription>
                        <div className="space-y-2">
                            <h4 className="font-medium">{msg("recovery-code-config-warning-title")}</h4>
                            <p className="text-sm">{msg("recovery-code-config-warning-message")}</p>
                        </div>
                    </AlertDescription>
                </Alert>

                <div className="bg-muted/50 rounded-lg p-4">
                    <ol id={olRecoveryCodesListId} className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm">
                        {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <span className="text-muted-foreground min-w-[2rem]">{index + 1}:</span>
                                <span className="font-medium">
                                    {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex flex-wrap  gap-2">
                    <Button id="printRecoveryCodes" variant="outline" size="sm" type="button" className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        {msg("recovery-codes-print")}
                    </Button>
                    <Button id="downloadRecoveryCodes" variant="outline" size="sm" type="button" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {msg("recovery-codes-download")}
                    </Button>
                    <Button id="copyRecoveryCodes" variant="outline" size="sm" type="button" className="flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        {msg("recovery-codes-copy")}
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="kcRecoveryCodesConfirmationCheck"
                        name="kcRecoveryCodesConfirmationCheck"
                        onCheckedChange={checked => {
                            //@ts-expect-error: This is inherited from the original code
                            document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !checked;
                        }}
                    />
                    <Label htmlFor="kcRecoveryCodesConfirmationCheck" className="text-sm font-medium cursor-pointer">
                        {msg("recovery-codes-confirmation-message")}
                    </Label>
                </div>

                <form action={kcContext.url.loginAction} className="space-y-4" id="kc-recovery-codes-settings-form" method="post">
                    <input
                        type="hidden"
                        name="generatedRecoveryAuthnCodes"
                        value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
                    />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    <LogoutOtherSessions i18n={i18n} />

                    {isAppInitiatedAction ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button type="submit" id="saveRecoveryAuthnCodesBtn" disabled className="sm:flex-1">
                                {msgStr("recovery-codes-action-complete")}
                            </Button>
                            <Button
                                type="submit"
                                variant="outline"
                                name="cancel-aia"
                                value="true"
                                id="cancelRecoveryAuthnCodesBtn"
                                className="sm:flex-1"
                            >
                                {msg("recovery-codes-action-cancel")}
                            </Button>
                        </div>
                    ) : (
                        <Button type="submit" className="w-full" id="saveRecoveryAuthnCodesBtn" disabled>
                            {msgStr("recovery-codes-action-complete")}
                        </Button>
                    )}
                </form>
            </div>
        </Template>
    );
}
