import { Button, Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { EmailLayout } from "../layout";

import { createVariablesHelper } from "keycloakify-emails/variables";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> { }

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  textAlign: "left" as const,
};

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Remove Credential";

const { exp } = createVariablesHelper("event-remove_credential.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Remove Credential`} locale={locale}>
   {/* check the credential type, it's not found */}
   
    <Text style={paragraph}>
      Credential {exp("event.credentialType")} was removed from your account on {exp("event.date")} from {exp("event.ipAddress")}.  
    </Text>

    <Text style={paragraph}>
      If this was not you, please contact an administrator.
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
      Link Accounts
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
    <Text style={paragraph}>
      If you link accounts, you will be able to login to {exp("identityProviderDisplayName")} through {exp("realmName")}.
    </Text>

  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Link {0}"
};
