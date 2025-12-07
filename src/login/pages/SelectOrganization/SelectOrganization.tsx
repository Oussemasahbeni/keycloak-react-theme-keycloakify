import { Button } from '@/components/ui/button';
import { KcContext } from '@/login/KcContext';
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { MouseEvent, useRef, useState } from "react";
import type { I18n } from "../../i18n";

export default function SelectOrganization(props: PageProps<Extract<KcContext, { pageId: "select-organization.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, user } = kcContext;

    const { msg } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!organizationInputRef.current || !formRef.current) {
            return;
        }

        organizationInputRef.current.value = organizationAlias;
        setIsSubmitting(true);

        if (typeof formRef.current.requestSubmit === "function") {
            formRef.current.requestSubmit();
            return;
        }

        formRef.current.submit();
    };

    const organizations = user.organizations ?? [];
    const shouldDisplayGrid = organizations.length > 3;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={null}
        >
            <form ref={formRef} action={url.loginAction} method="post">
                <div className="space-y-4">
                    <p className="text-md ">
                        {msg("organization.select")}
                    </p>

                    <div className={shouldDisplayGrid ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
                        {organizations.map(({ alias, name }) => (
                            <Button
                                key={alias}
                                id={`organization-${alias}`}
                                className="w-full justify-start"
                                variant="outline"
                                type="button"
                                onClick={onOrganizationClick(alias)}
                                disabled={isSubmitting}
                            >
                                <span className="text-left font-medium">{name ?? alias}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <input ref={organizationInputRef} type="hidden" name="kc.org" />
            </form>

        </Template>
    );
}