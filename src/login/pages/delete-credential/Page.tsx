import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "delete-credential.ftl");

    const { msgStr, msg } = useI18n();

    return (
        <Template
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", kcContext.credentialLabel)}
        >
            <Alert variant="warning" className=" my-3">
                <AlertDescription>
                    <span>
                        {msg("deleteCredentialMessage", kcContext.credentialLabel)}
                    </span>
                </AlertDescription>
            </Alert>

            <form
                className="form-actions"
                action={kcContext.url.loginAction}
                method="POST"
            >
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                    <Button
                        variant="outline"
                        name="cancel-aia"
                        id="kc-decline"
                        type="submit"
                        className="sm:flex-1"
                    >
                        {msgStr("doCancel")}
                    </Button>

                    <Button
                        name="accept"
                        id="kc-accept"
                        type="submit"
                        variant="destructive"
                        className="sm:flex-1 text-white"
                    >
                        {msgStr("doConfirmDelete")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
