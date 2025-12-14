import { LogoutOtherSessions } from "@/components/logout-other-sessions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { I18n } from "@/login/i18n";
import { KcContext } from "@/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";

export default function LoginConfigTotp(
    props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol
                    id="kc-totp-settings"
                    className="list-decimal space-y-4 text-sm text-gray-700 dark:text-gray-300"
                >
                    <li className="space-y-2">
                        <p>{msg("loginTotpStep1")}</p>
                        <ul
                            className="list-disc list-inside ml-4 space-y-1"
                            id="kc-totp-supported-apps"
                        >
                            {totp.supportedApplications.map(app => (
                                <li
                                    className="text-blue-600 dark:text-blue-400"
                                    key={app}
                                >
                                    {advancedMsg(app)}
                                </li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p className="mb-3">{msg("loginTotpManualStep2")}</p>
                                <div className="bg-muted/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div>
                                        <span
                                            id="kc-totp-secret-key"
                                            className="font-mono text-lg bg-secondary px-3 py-2 rounded border break-all"
                                        >
                                            {totp.totpSecretEncoded}
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="outline" asChild>
                                            <a href={totp.qrUrl} className="text-sm">
                                                {msg("loginTotpScanBarcode")}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p className="mb-3">{msg("loginTotpManualStep3")}</p>
                                <div className="bg-muted/30 p-4 rounded-lg border">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpType")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {msg(`loginTotp.${totp.policy.type}`)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpAlgorithm")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {totp.policy.getAlgorithmKey()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {msg("loginTotpDigits")}:
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {totp.policy.digits}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                {totp.policy.type === "totp"
                                                    ? msg("loginTotpInterval")
                                                    : msg("loginTotpCounter")}
                                                :
                                            </span>
                                            <span className="font-mono bg-secondary px-2 py-1 rounded text-xs">
                                                {totp.policy.type === "totp"
                                                    ? totp.policy.period
                                                    : totp.policy.initialCounter}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <li className="space-y-2">
                            <p>{msg("loginTotpStep2")}</p>
                            <img
                                id="kc-totp-secret-qr-code"
                                className="mt-2 dark:mt-0"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />

                            <Button variant="outline" asChild>
                                <a href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </Button>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

                <form
                    action={url.loginAction}
                    className="space-y-4 mt-2"
                    id="kc-totp-settings-form"
                    method="post"
                >
                    <div className={kcClsx("kcFormGroupClass")}>
                        <Field>
                            <FieldLabel htmlFor="totp">
                                {msg("authenticatorCode")}{" "}
                                <span className="required">*</span>
                            </FieldLabel>
                            <Input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("totp")}
                            />
                            {messagesPerField.existsError("totp") && (
                                <FieldError>
                                    {" "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.get("totp")
                                            )
                                        }}
                                    />
                                </FieldError>
                            )}
                        </Field>
                        <input
                            type="hidden"
                            id="totpSecret"
                            name="totpSecret"
                            value={totp.totpSecret}
                        />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Field>
                            <FieldLabel htmlFor="userLabel">
                                {msg("loginTotpDeviceName")}{" "}
                                {totp.otpCredentials.length >= 1 && (
                                    <span className="required">*</span>
                                )}
                            </FieldLabel>
                            <Input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <FieldError>
                                    {" "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.get("userLabel")
                                            )
                                        }}
                                    />
                                </FieldError>
                            )}
                        </Field>
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions i18n={i18n} />
                    </div>

                    {isAppInitiatedAction ? (
                        <>
                            <div className="flex justify-between mt-4 gap-3">
                                <Button
                                    variant="secondary"
                                    value="true"
                                    id="cancelTOTPBtn"
                                    name="cancel-aia"
                                    type="submit"
                                    className="flex-1"
                                >
                                    {msgStr("doCancel")}
                                </Button>
                                <Button id="saveTOTPBtn" type="submit" className="flex-1">
                                    {msgStr("doSubmit")}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button id="saveTOTPBtn" className="w-full" type="submit">
                            {msgStr("doSubmit")}
                        </Button>
                    )}
                </form>
            </>
        </Template>
    );
}
