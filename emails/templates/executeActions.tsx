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

export const templateName = "ExecuteActions";

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Excute Actions`} locale={locale}>

    <Text style={paragraph}>
      Your administrator has just requested that you update your {exp("realmName")} account by performing the following action(s):
      {exp("")}
    </Text>

    <Text style={paragraph}>
      Click on the link below to start this process.
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
      Update Account
    </Button>

    <Text style={paragraph}>
      This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>

    <Text style={paragraph}>
      If you are unaware that your administrator has requested this, just ignore this message and nothing will be changed.
    </Text>

  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Update Your Account"
};
