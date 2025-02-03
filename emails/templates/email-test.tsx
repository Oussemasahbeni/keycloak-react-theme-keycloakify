import { messages } from "emails/messages/message";
import { Button, Link, render, Text } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

type TemplateProps = Omit<GetTemplateProps, "plainText">;

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const link = {
  textDecoration: 'underline',
};

const rtlStyle = {
  direction: 'rtl' as const,
  textAlign: 'right' as const,
};

const buttonContainer = {
  textAlign: 'left' as const,
};

const buttonContainerRTL = {
  textAlign: 'right' as const,
};

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'medium',
}).format(new Date());

export const Template = ({ locale }: TemplateProps) => {
  const msg = messages[locale];
  const isRTL = locale === 'ar';

  return (
    <EmailLayout preview={"Here is a preview"} locale={locale}>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>{msg.greeting} oussema,</Text>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>
        {msg.passwordUpdate.replace("{date}", formattedDate)}
      </Text>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>
        {msg.passwordReset}{' '}
        <Link href="#" style={link}>
          {msg.passwordReset}
        </Link>{' '}
        {msg.passwordReset}
      </Text>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>
        {msg.passwordAdvice}
      </Text>
      <div style={isRTL ? buttonContainerRTL : buttonContainer}>
        <Button
          width={isRTL ? 220: 152}
          height={40}
          backgroundColor="#5e6ad2"
          borderRadius={3}
          textColor="#fff"
          fontSize={15}
          href="https://linear.app"
        >
          {msg.loginButton}
        </Button>
      </div>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>
        {msg.contactSupport.replace("{realmName}", exp("realmName"))}
      </Text>
      <Text style={{ ...paragraph, ...(isRTL && rtlStyle) }}>
        {msg.thanks},
        <br />
        {msg.supportTeam.replace("{realmName}", exp("realmName"))}
      </Text>
    </EmailLayout>
  );
};

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  switch (_props.locale) {
    case "en":
      return "[KEYCLOAK] - SMTP test message";
    case "fr":
      return "[KEYCLOAK] - Message de test SMTP";
    case "ar":
      return "[KEYCLOAK] - رسالة اختبار SMTP";
    default:
      return "[KEYCLOAK] - SMTP test message";
  }
};