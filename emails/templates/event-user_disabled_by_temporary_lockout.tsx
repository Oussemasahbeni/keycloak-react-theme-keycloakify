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

export const templateName = "User Disabled by Temporary Lockout";

const { exp } = createVariablesHelper("event-user_disabled_by_temporary_lockout.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`User Disabled by Temporary Lockout`} locale={locale}>

    <Text style={paragraph}>
      Your user has been disabled temporarily because of multiple failed attemps on {exp("event.date")}.
    </Text>
    <Text style={paragraph}>
      Please contact an administrator.
    </Text>

  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "User disabled by temporary lockout"
};
