import { applyRTL } from 'emails/utils/RTL';
import i18n, { TFunction } from 'i18next';
import { Button, Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import * as Fm from "keycloakify-emails/jsx-email";
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

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale, t }: TemplateProps) => {
  const isRTL = locale === 'ar';

  return (
    <EmailLayout preview={t('org-invite.subject')} locale={locale}>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
          <p>
            {t('org-invite.greeting', { firstName: exp("firstName"), lastName: exp("lastName") })}
          </p>
        </Fm.If>
      </Text>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('org-invite.message', { organizationName: exp("organization.name") })}
      </Text>

        <Button
          width={162}
          align={isRTL ? "right" : "left"}
          height={40}
          backgroundColor="#5e6ad2"
          borderRadius={3}
          textColor="#fff"
          fontSize={15}
          href={exp("link")}
        >
          {t('org-invite.joinButton')}
        </Button>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('org-invite.linkExpiration', { expiration: exp("linkExpirationFormatter(linkExpiration)") })}
      </Text>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('org-invite.ignoreMessage')}
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
  return t('org-invite.subject', { organizationName: exp("organization.name") });
};