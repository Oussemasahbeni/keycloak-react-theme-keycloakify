import { createKcPageStory } from "@/login/KcPageStory";
import type { Meta, StoryObj } from "@storybook/react";

const { KcPageStory } = createKcPageStory({ pageId: "login-password.ftl" });

const meta = {
    title: "login/login-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithPasswordError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    resetPasswordAllowed: true
                },
                url: {
                    loginAction: "/mock-login",
                    loginResetCredentialsUrl: "/mock-reset-password"
                },
                messagesPerField: {
                    existsError: (field: string) => field === "password",
                    get: () => "Invalid password"
                }
            }}
        />
    )
};

export const Arabic: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                locale: {
                    currentLanguageTag: "ar",
                    rtl: true
                }
            }}
        />
    )
};

export const WithWebauthn: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: {
                    loginAction: "/mock-login-action"
                },
                enableWebAuthnConditionalUI: true
            }}
        />
    )
};

export const WithoutResetPasswordOption: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    resetPasswordAllowed: false
                },
                url: {
                    loginAction: "/mock-login",
                    loginResetCredentialsUrl: "/mock-reset-password"
                },
                messagesPerField: {
                    existsError: () => false
                }
            }}
        />
    )
};
