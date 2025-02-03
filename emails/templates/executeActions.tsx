import { applyRTL } from 'emails/utils/RTL';
import i18n, { TFunction } from 'i18next';
import { Button, Raw, Text, render } from "jsx-email";
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

export const templateName = "ExecuteActions";

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale, t }: TemplateProps) => {
  const isRTL = locale === 'ar';

  return (
    <EmailLayout preview={t('executeActions.subject')} locale={locale}>
      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('executeActions.message', { realmName: exp("realmName") })}
        <Raw 
          content="<#assign requiredActionsText><#if requiredActions??><#list requiredActions><#items as reqActionItem>${msg('requiredAction.${reqActionItem}')}<#sep>, </#sep></#items></#list></#if></#assign>"
        />
      </Text>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('executeActions.clickLink')}
      </Text>

        <Button
          width={152}
          height={40}
          backgroundColor="#5e6ad2"
          align={isRTL ? "right" : "left"}

          borderRadius={3}
          textColor="#fff"
          fontSize={15}
          href={exp("link")}
        >
          {t('executeActions.updateAccountButton')}
        </Button>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('executeActions.linkExpiration', { expiration: exp("linkExpirationFormatter(linkExpiration)") })}
      </Text>

      <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
        {t('executeActions.ignoreMessage')}
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
  return t('executeActions.subject');
};