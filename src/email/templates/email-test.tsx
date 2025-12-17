import { btnTextColor, primaryColor } from "@/email/constants";
import { previewLocale } from "@/email/utils/previewLocale";
import { applyRTL } from "@/email/utils/RTL";
import i18n, { TFunction } from "i18next";
import { Button, Link, render, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14
};

const link = {
    textDecoration: "underline"
};

const rtlStyle = {
    direction: "rtl" as const,
    textAlign: "right" as const
};

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "vanilla"
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium"
}).format(new Date());

export const Template = ({ locale, t }: TemplateProps) => {
    const isRTL = locale === "ar";

    return (
        <EmailLayout preview={"Here is a preview"} locale={locale}>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.greeting")} oussema,
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.passwordUpdate", { date: formattedDate })}
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.passwordReset")}{" "}
                <Link href="#" style={link}>
                    {t("email-test.passwordReset")}
                </Link>{" "}
                {t("email-test.passwordReset")}
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.passwordAdvice")}
            </Text>
            <Button
                width={200}
                height={40}
                align={isRTL ? "right" : "left"}
                backgroundColor={primaryColor}
                textColor={btnTextColor}
                borderRadius={3}
                fontSize={15}
                href="https://linear.app"
            >
                {t("email-test.loginButton")}
            </Button>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.contactSupport", { realmName: exp("realmName") })}
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.thanks")},
                <br />
                {t("email-test.supportTeam", { realmName: exp("realmName") })}
            </Text>
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async props => {
    const t = i18n.getFixedT(props.locale);
    return t("email-test.subject");
};
