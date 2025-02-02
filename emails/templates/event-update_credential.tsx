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

export const templateName = "Update credential";

const { exp } = createVariablesHelper("event-update_credential.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Identity Providerl`} locale={locale}>
   
    <Text style={paragraph}>
    Your {exp('event.details.credential_type!"unknown"')} credential was changed on {exp("event.date")} from {exp("event.ipAddress")}.
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
  return "Update credential"
};
