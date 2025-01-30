import { Text, render } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import * as Fm from "keycloakify-emails/jsx-email";
import { EmailLayout } from "../layout";

import { createVariablesHelper } from "keycloakify-emails/variables";


interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
  color: "#777",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={`Here is a preview`} locale={locale}>
    <Text style={paragraph}>
      <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
        <p>
          Hi, {exp("firstName")} {exp("lastName")}.
        </p>
      </Fm.If>

      <p>
        You were invited to join the {exp("organization.name")} organization. Click the
        link below to join.{" "}
      </p>
      <p>
        <a href={exp("link")}>Link to join the organization</a>
      </p>
      <p>
        This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
      </p>
      <p>If you don't want to join the organization, just ignore this message.</p>
    </Text>
  </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Invitation to join the {0} organization";
};
