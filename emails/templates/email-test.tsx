import { Button, Link, render, Text } from "jsx-email";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
} from "keycloakify-emails";
import { EmailLayout } from "../layout";

import { createVariablesHelper } from "keycloakify-emails/variables";


type TemplateProps = Omit<GetTemplateProps, "plainText">

// const paragraph = {
//   color: "#777",
//   fontSize: "16px",
//   lineHeight: "24px",
//   textAlign: "left" as const,
// };


const paragraph = {
  lineHeight: 1.5,
  fontSize: 14
};



const link = {
  textDecoration: 'underline'
};


export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");


const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'medium'
}).format(new Date());


export const Template = ({ locale }: TemplateProps) => (
  <EmailLayout preview={"Here is a preview"} locale={locale}>
    <Text style={paragraph}>Hi oussema,</Text>
    <Text style={paragraph}>
      You updated the password for your Twitch account on {formattedDate}. If this was you,
      then no further action is required.
    </Text>
    <Text style={paragraph}>
      However if you did NOT perform this password change, please{' '}
      <Link href="#" style={link}>
        reset your account password
      </Link>{' '}
      immediately.
    </Text>
    <Text style={paragraph}>
      Remember to use a password that is both strong and unique to your Twitch account. To
      learn more about how to create a strong and unique password,{' '}
      {/* <Link href="#" style={link}>
                click here.
              </Link> */}
      <Button
        width={152}
        height={40}
        backgroundColor="#5e6ad2"
        borderRadius={3}
        textColor="#fff"
        fontSize={15}
        href="https://linear.app"
      >
        Login to Inspark
      </Button>
    </Text>
    <Text style={paragraph}>
      Still have questions? Please contact{' '}
      <Link href="#" style={link}>
        {exp("realmName")} Support
      </Link>
    </Text>
    <Text style={paragraph}>
      Thanks,
      <br />
      {exp("realmName")}, Support Team
    </Text>

    {/* <Container>
      <Img src={`${baseUrl}/kc-logo.png`} alt="KC Logo" width="83" height="75" />
    </Container>
    <Text style={paragraph}>This is a test message from {exp("realmName")}</Text> */}
  </EmailLayout>
);

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
