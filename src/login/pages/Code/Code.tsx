import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { KcContext } from '@/login/KcContext';
import { I18n } from '@/login/i18n';
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import { MdContentCopy } from "react-icons/md";

import { MdCheck } from "react-icons/md";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const [copied, setCopied] = useState(false);

    const { code } = kcContext;
    const { msg } = i18n;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code.code ?? "");
            setCopied(true);
            toast.success(msg("copySuccessTitle"));
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error(msg("copyErrorTitle"));
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div>
                <Toaster />
            </div>

            <div id="kc-code">
                {code.success ? (
                    <>
                        <Alert type="success" className=" my-3">
                            <AlertDescription>
                                <span>{msg("copyCodeInstruction")}</span>
                            </AlertDescription>
                        </Alert>
                        <div className="relative">
                            <Input id="code" defaultValue={code.code} readOnly className=" font-mono" />

                            <Button
                                onClick={handleCopy}
                                variant="secondary"
                                size="icon"
                                className="size-4 absolute end-2 top-1/2 transform -translate-y-1/2"
                            >
                                {copied ? <MdCheck /> : <MdContentCopy />}
                            </Button>
                        </div>
                    </>
                ) : (
                    code.error && (
                        <Alert type="error" className="my-3">
                            <AlertDescription>
                                <p
                                    id="error"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(code.error)
                                    }}
                                />
                            </AlertDescription>
                        </Alert>
                    )
                )}
            </div>
        </Template>
    );
}
