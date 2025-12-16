

import { cn } from '@/components/lib/utils';
import { useI18n } from '@/login/i18n';
import type { Attribute } from "@keycloakify/login-ui/KcContext";
import { useKcClsx } from '@keycloakify/login-ui/useKcClsx';
import { assert } from "tsafe/assert";

export function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
}) {
    const { attribute, groupNameRef } = props;

    const { advancedMsg } = useI18n();

    const { kcClsx } = useKcClsx();


    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={cn("space-y-4 p-4 border rounded-lg bg-card", kcClsx("kcFormGroupClass"))}
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <div className={cn("", kcClsx("kcContentWrapperClass"))}>
                                <h3 id={`header-${attribute.group.name}`} className={cn("text-lg font-semibold", kcClsx("kcFormGroupHeader"))}>
                                    {groupHeaderText}
                                </h3>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <div className={cn("", kcClsx("kcLabelWrapperClass"))}>
                                    <p
                                        id={`description-${attribute.group.name}`}
                                        className={cn("text-sm text-muted-foreground", kcClsx("kcLabelClass"))}
                                    >
                                        {groupDescriptionText}
                                    </p>
                                </div>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}