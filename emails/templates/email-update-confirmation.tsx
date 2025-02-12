import { applyRTL } from 'emails/utils/RTL';
import i18n, { TFunction } from 'i18next';
import { Button, Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  textAlign: "left" as const,
};

const rtlStyle = {
  direction: 'rtl' as const,
  textAlign: 'right' as const,
};

export const previewProps: TemplateProps = {
  t: i18n.getFixedT('en'),
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale, t }: TemplateProps) => {
  const isRTL = locale === 'ar';

  return (
    <EmailLayout preview={t('email-update-confirmation.subject')} locale={locale}>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('email-update-confirmation.updateEmailAddress', { realmName: exp("realmName"), newEmail: exp("newEmail") })}
      </Text>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('email-update-confirmation.clickLinkBelow')}
      </Text>

        <Button
          width={200}
          height={40}
          backgroundColor="#5e6ad2"
          borderRadius={3}
          textColor="#fff"
          align={isRTL ? "right" : "left"}
          fontSize={15}
          href={exp("link")}
        >
          {t('email-update-confirmation.updateEmail')}
        </Button>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('email-update-confirmation.linkExpiration', { expiration: exp("linkExpirationFormatter(linkExpiration)") })}
      </Text>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('email-update-confirmation.ignoreMessage')}
      </Text>
    </EmailLayout>
  );
};

export const getTemplate: GetTemplate = async (props) => {
  const t = i18n.getFixedT(props.locale);
  return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (props) => {
  const t = i18n.getFixedT(props.locale);
  return t('email-update-confirmation.subject');
};