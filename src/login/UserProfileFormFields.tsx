import { PasswordWrapper } from "@/components/password-wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    getButtonToDisplayForMultivaluedAttributeField,
    useUserProfileForm,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { assert } from "keycloakify/tools/assert";
import { Fragment, useEffect } from "react";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const { locale } = kcContext;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Fragment key={attribute.name}>
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <Field
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ||
                                    (attribute.name === "password-confirm" && !doMakeUserConfirmPassword)
                                        ? "none"
                                        : undefined
                            }}
                        >
                            <FieldLabel htmlFor={attribute.name}>
                                {advancedMsg(attribute.displayName ?? "")}
                                {attribute.required && <span className="text-destructive ml-1">*</span>}
                            </FieldLabel>
                            <FieldContent>
                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <FieldDescription id={`form-help-text-before-${attribute.name}`}>
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </FieldDescription>
                                )}
                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    locale={locale}
                                    i18n={i18n}
                                />
                                <FieldErrors attribute={attribute} displayableErrors={displayableErrors} kcClsx={kcClsx} fieldIndex={undefined} />
                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <FieldDescription id={`form-help-text-after-${attribute.name}`}>
                                        {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                    </FieldDescription>
                                )}

                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </FieldContent>
                        </Field>
                    </Fragment>
                );
            })}
        </>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;

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

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined; kcClsx: KcClsx }) {
    const { attribute, fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <FieldError id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}>
            {displayableErrors.map(({ errorMessage }, i, arr) => (
                <Fragment key={i}>
                    {errorMessage}
                    {arr.length - 1 !== i && <br />}
                </Fragment>
            ))}
        </FieldError>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    locale: KcContext["locale"];
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues, locale } = props;

    switch (attribute.annotations.inputType) {
        case "hidden":
            return <input type="hidden" id={attribute.name} name={attribute.name} value={valueOrValues as string} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper kcClsx={props.kcClsx} i18n={props.i18n} locale={locale} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;

    const { advancedMsgStr } = i18n;

    return (
        <>
            <Input
                type={(() => {
                    const { inputType } = attribute.annotations;

                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }

                    return inputType ?? "text";
                })()}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");

                    return valueOrValues;
                })()}
                aria-invalid={displayableErrors.length !== 0}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors attribute={attribute} kcClsx={kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    return (
        <div className="flex items-center gap-2 mt-2">
            {hasRemove && (
                <Button
                    id={`kc-remove${idPostfix}`}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex)
                        })
                    }
                >
                    {msg("remove")}
                </Button>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </Button>
            )}
        </div>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, i18n, valueOrValues } = props;

    const isRadio = (() => {
        const { inputType } = attribute.annotations;

        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

        return inputType === "select-radiobuttons";
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    if (isRadio) {
        return (
            <RadioGroup
                value={typeof valueOrValues === "string" ? valueOrValues : ""}
                onValueChange={value =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: value
                    })
                }
                disabled={attribute.readOnly}
                className="space-y-2"
            >
                {options.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={option}
                            id={`${attribute.name}-${option}`}
                            aria-invalid={props.displayableErrors.length !== 0}
                            onBlur={() =>
                                dispatchFormAction({
                                    action: "focus lost",
                                    name: attribute.name,
                                    fieldIndex: undefined
                                })
                            }
                        />
                        <Label
                            htmlFor={`${attribute.name}-${option}`}
                            className={cn("text-sm font-normal", attribute.readOnly && "opacity-50 cursor-not-allowed")}
                        >
                            {inputLabel(i18n, attribute, option)}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        );
    }

    return (
        <div className="space-y-2">
            {options.map(option => (
                <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                        id={`${attribute.name}-${option}`}
                        checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
                        disabled={attribute.readOnly}
                        onCheckedChange={checked =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = checked === true;

                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];

                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }

                                        return newValues;
                                    }

                                    return isChecked ? option : "";
                                })()
                            })
                        }
                        onBlur={() =>
                            dispatchFormAction({
                                action: "focus lost",
                                name: attribute.name,
                                fieldIndex: undefined
                            })
                        }
                    />
                    <Label
                        htmlFor={`${attribute.name}-${option}`}
                        className={cn("text-sm font-normal", attribute.readOnly && "opacity-50 cursor-not-allowed")}
                    >
                        {inputLabel(i18n, attribute, option)}
                    </Label>
                </div>
            ))}
        </div>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;

    return (
        <textarea
            id={attribute.name}
            name={attribute.name}
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                displayableErrors.length !== 0 && "border-destructive ring-destructive/20 focus-visible:ring-destructive"
            )}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, displayableErrors, i18n, valueOrValues } = props;

    const isMultiple = attribute.annotations.inputType === "multiselect";

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            assert(typeof inputOptionsFromValidation === "string");

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    // For multiselect, fall back to native select as shadcn doesn't support multi-select
    if (isMultiple) {
        return (
            <select
                id={attribute.name}
                name={attribute.name}
                className={cn(
                    "flex min-h-[100px] h-auto w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    displayableErrors.length !== 0 && "border-destructive ring-destructive/20 focus:ring-destructive"
                )}
                aria-invalid={displayableErrors.length !== 0}
                disabled={attribute.readOnly}
                multiple={true}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                value={valueOrValues}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: Array.from(event.target.selectedOptions).map(option => option.value)
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined
                    })
                }
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {inputLabel(i18n, attribute, option)}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <Select
            value={typeof valueOrValues === "string" && valueOrValues !== "" ? valueOrValues : undefined}
            onValueChange={value =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: value
                })
            }
            disabled={attribute.readOnly}
        >
            <SelectTrigger
                id={attribute.name}
                className={cn("w-full", displayableErrors.length !== 0 && "border-destructive ring-destructive/20 focus-visible:ring-destructive")}
                aria-invalid={displayableErrors.length !== 0}
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined
                    })
                }
            >
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option} value={option}>
                        {inputLabel(i18n, attribute, option)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return option;
}
