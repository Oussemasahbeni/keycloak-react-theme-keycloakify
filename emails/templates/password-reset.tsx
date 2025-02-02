import { Button, Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";

import { EmailLayout } from "../layout";

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

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Password reset`} locale={locale}>
      <Text style={paragraph}>
        Someone just requested to change your {exp("realmName")} account&apos;s credentials. If
        this was you, click on the link below to reset them.
      </Text>
      <Text>
        {/* <a href={exp("link")}>Link to reset credentials</a> */}

        <Button
          width={152}
          height={40}
          backgroundColor="#5e6ad2"
          borderRadius={3}
          textColor="#fff"
          fontSize={15}
          href={exp("link")}                      
          >
          Reset credentials
        </Button>
      </Text>
      <Text style={paragraph}>
        This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
      </Text>
      <Text style={paragraph}>
        If you don&apos;t want to reset your credentials, just ignore this message and nothing
        will be changed.
      </Text>
  </EmailLayout>
);
export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "Reset password";
};
