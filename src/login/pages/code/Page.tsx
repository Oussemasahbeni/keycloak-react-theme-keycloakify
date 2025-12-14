import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

import { Button } from "@/components/ui/button";

import { MdContentCopy } from "react-icons/md";

import { useI18n } from '@/login/i18n';
import { useKcContext } from '@/login/KcContext';
import { useState } from 'react';
import { MdCheck } from "react-icons/md";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {

    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "code.ftl");

    const [copied, setCopied] = useState(false);

    const { msg } = useI18n();


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(kcContext.code.code ?? "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Template
            headerNode={
                kcContext.code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", kcContext.code.error)
            }
        >
            <div id="kc-code">
                {kcContext.code.success ? (
                    <>
                        <Alert variant="success" className=" my-3">
                            <AlertDescription>
                                <span>{msg("copyCodeInstruction")}</span>
                            </AlertDescription>
                        </Alert>
                        <div className="relative">
                            <Input
                                id="code"
                                defaultValue={kcContext.code.code}
                                readOnly
                                className="font-mono"
                            />

                            <Button
                                onClick={handleCopy}
                                variant="secondary"
                                size="icon"
                                className="size-4 absolute end-2 top-1/2 transform -translate-y-1/2"
                            >
                                {copied ? (
                                    <MdCheck className="text-green-500" />
                                ) : (
                                    <MdContentCopy />
                                )}
                            </Button>
                        </div>
                    </>
                ) : (
                    kcContext.code.error && (
                        <Alert variant="error" className="my-3">
                            <AlertDescription>
                                <p
                                    id="error"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(kcContext.code.error)
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
