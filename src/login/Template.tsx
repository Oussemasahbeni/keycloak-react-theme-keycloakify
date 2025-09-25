import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { redirectUrlOrigin } from "./shared/redirectUrlOrigin";


import companylogo from "./assets/img/auth-logo.svg";
import shape from "./assets/img/shape.svg";

import { Languages } from '@/components/langauges';
import { ModeToggle } from '@/components/theme-toggle';





export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;



    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (

        <div className="grid min-h-svh lg:grid-cols-2 dark:bg-slate-950">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <div className="flex items-center gap-2 font-medium">
                        <Button variant="outline" size="sm" className=" border-gray-400 self-center font-medium text-base ">
                            <a className="flex items-center gap-1 hover:no-underline no-hover-color" href={kcContext.client.baseUrl ?? redirectUrlOrigin}>
                                <FiArrowLeft /> {msg("home")}
                            </a>
                        </Button>
                        {enabledLanguages.length > 1 && (
                            <Languages i18n={i18n} />
                        )}
                        <ModeToggle i18n={i18n} />
                    </div>

                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">

                        <Card>
                            <CardHeader className="text-center px-6 pt-6">
                                <div className="flex items-center mx-auto mb-2  justify-between gap-2 lg:hidden">
                                    <img src={companylogo} className="h-12 w-36" alt="" />
                                </div>
                                <CardTitle>
                                    {(() => {
                                        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                            <h1 className="text-xl">{headerNode}</h1>
                                        ) : (
                                            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                                <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                                    <div className="kc-login-tooltip">
                                                        <i className={kcClsx("kcResetFlowIcon")}></i>
                                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        );

                                        if (displayRequiredFields) {
                                            return (
                                                <div className="flex items-center justify-between gap-2">
                                                    <div>{node}</div>
                                                    <div>
                                                        <span className="subtitle">
                                                            <span className="text-red-500">*</span>
                                                            {msg("requiredFields")}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return node;
                                    })()}
                                </CardTitle>
                            </CardHeader>
                            <CardContent >
                                <div id="kc-content" >
                                    <div id="kc-content-wrapper">

                                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                            <Alert variant={getAlertVariant(message.type)} className="flex  gap-2 justify-center">
                                                <div>
                                                    {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                                    {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                                    {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                                    {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                                </div>
                                                <AlertDescription>

                                                    <div
                                                        className={clsx(
                                                            `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                                        )}
                                                    >
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: kcSanitize(message.summary)
                                                            }}
                                                        />
                                                    </div>
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <div className="children">
                                            {children}
                                        </div>
                                        {socialProvidersNode}
                                        {auth !== undefined && auth.showTryAnotherWayLink && (
                                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                                <div className={kcClsx("kcFormGroupClass")}>
                                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                                    <a
                                                        href="#"
                                                        id="try-another-way"
                                                        onClick={() => {
                                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                                            return false;
                                                        }}
                                                    >
                                                        {msg("doTryAnotherWay")}
                                                    </a>
                                                </div>
                                            </form>
                                        )}
                                        {displayInfo && <div className="text-center text-sm mt-4">{infoNode}</div>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="bg-primary  relative lg:block! dark:bg-white/5">
                <div className="flex items-center pt-20 h-full justify-center z-1">
                    <div className="absolute right-0 top-0 w-full max-w-[250px] xl:max-w-[450px]">
                        <img
                            src={shape}
                            alt="grid"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                        <img
                            src={shape}
                            alt="grid"
                        />
                    </div>

                    <div className="flex justify-center my-auto flex-col items-center max-w-xs">
                        <a className="block mb-4">
                            <img
                                width="231"
                                height="48"
                                src={companylogo}
                                alt="Logo"
                            />
                        </a>
                        <p className="text-center  text-gray-400 dark:text-white/60">
                            {msg("welcomeMessage")}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
}


const getAlertVariant = (type: string) => {
    switch (type) {
        case "error":
            return "destructive";
        case "warning":
            return "warning";
        case "success":
            return "success";
        default:
            return "default";
    }
};
