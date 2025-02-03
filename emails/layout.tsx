import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Text } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { PropsWithChildren, ReactNode } from "react";


const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};


// const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

// const main = {
//   backgroundColor: '#efeef1',
//   fontFamily
// };

// const container = {
//   backgroundColor: "#ffffff",
//   margin: "0 auto",
//   marginBottom: "64px",
//   padding: "20px 0 48px",
// };

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff'
};

const content = {
  padding: '5px 30px 10px 30px'

};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30
};

const sectionsBorders = {
  width: '100%',
  display: 'flex'
};
const sectionsBordersBottom = {
  width: '100%',
  display: 'flex',
  marginBottom: '20px'
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px'
};

const sectionCenter = {
  borderBottom: '1px solid rgb(145,71,255)',
  width: '102px'
};

const footer = {
  width: '580px',
  margin: '0 auto'
};

// const baseUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}";
const currentYear = new Date().getFullYear();

const { exp } = createVariablesHelper("email-test.ftl");




export const EmailLayout = ({
  locale,
  children,
  preview,
}: PropsWithChildren<{ preview: ReactNode; locale: string; }>) => {
  return (
    <Html lang={locale} dir= {locale === "ar" ? "rtl" : "ltr"}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
      <Container style={container}>
      <Section style={logo}>
        <Img width={200} src="https://res.cloudinary.com/dyo9yeeck/image/upload/v1738352235/plutj3dm2hposbgpy4i6.png" />
      </Section>

      <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
      </Section>
        
      <Section style={content}>{children}</Section>
        


      <Section style={sectionsBordersBottom}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
      </Section>
      <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '32px', height: '48px', paddingRight: '8px' }}>
              <Img src="https://img.icons8.com/color/48/facebook-new.png" /> 
            </Column>
            <Column align="left" style={{width: '32px', height: '48px', paddingLeft: '8px' }}>
              <Img src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: 'center', color: '#706a7b' }}>
              © {currentYear} {exp("realmName")}, All Rights Reserved <br />
              Pole Tech. Ghazela, 2036 Ariana, Tunisia
            </Text>
          </Row>
      </Section>
        </Container>
      </Body>
    </Html>
  );
};
