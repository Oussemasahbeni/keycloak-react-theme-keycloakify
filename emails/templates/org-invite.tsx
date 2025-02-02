import { Button, Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import * as Fm from "keycloakify-emails/jsx-email";
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

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Organization invite`} locale={locale}>
    <Text style={paragraph}>
      <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
        <p>
          Hi, {exp("firstName")} {exp("lastName")}.
        </p>
      </Fm.If>

      <Text style={paragraph}>
        You were invited to join the {exp("organization.name")} organization. Click the
        link below to join.{" "}
      </Text>

       <Button
                width={162}
                height={40}
                backgroundColor="#5e6ad2"
                borderRadius={3}
                textColor="#fff"
                fontSize={15}
                href={exp("link")}                      
                >
                 Join the organization
              </Button>
      {/* <Text style={paragraph}>
        <a href={exp("link")}>Link to join the organization</a>

      </Text> */}
      <Text style={paragraph}>
        This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
      </Text>
      <Text style={paragraph}>If you don&apos;t want to join the organization, just ignore this message.</Text>
    </Text>
  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "Invitation to join the {0} organization";
};
