import { Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { EmailLayout } from "../layout";

import { createVariablesHelper } from "keycloakify-emails/variables";

type TemplateProps = Omit<GetTemplateProps, "plainText">

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  textAlign: "left" as const,
};

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Update OTP";

const { exp } = createVariablesHelper("event-update_totp.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Update OTP`} locale={locale}>

    <Text style={paragraph}>
      OTP was updated for your account on {exp("event.date")} from {exp("event.ipAddress")}.
    </Text>

    <Text style={paragraph}>
      If this was not you, please contact an administrator.
    </Text>


  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "Update OTP"
};
