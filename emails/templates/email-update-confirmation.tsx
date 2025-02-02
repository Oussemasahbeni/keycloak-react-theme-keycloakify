import { Button, Text, render } from "jsx-email";
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

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Update email`} locale={locale}>
    <Text style={paragraph}>
      To update your {exp("realmName")} account with email address {exp("newEmail")},
      click the link below
    </Text>

    <Button
      width={152}
      height={40}
      backgroundColor="#5e6ad2"
      borderRadius={3}
      textColor="#fff"
      fontSize={15}
      href={exp("link")}
    >
      Update email
    </Button>
    {/* <Text style={paragraph}>
        <a href={exp("link")}>{exp("link")}</a>
      </Text> */}
    <Text style={paragraph}>
      This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={paragraph}>
      If you don&apos;t want to proceed with this modification, just ignore this message.
    </Text>

  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "Verify new email";
};
