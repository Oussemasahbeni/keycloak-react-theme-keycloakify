import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "code.ftl" });

const meta = {
    title: "login/code.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithDarkModeDisabled: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                properties: {
                    ENABLE_THEME_TOGGLE: "false"
                }
            }}
        />
    )
};

export const WithDarkModeEnabled: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                properties: {
                    ENABLE_THEME_TOGGLE: "true"
                }
            }}
        />
    )
};

export const WithErrorCode: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                code: {
                    success: false,
                    error: "Failed to generate code"
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
export const French: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                locale: {
                    currentLanguageTag: "fr"
                }
            }}
        />
    )
};
export const WithFrenchLanguage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                locale: {
                    currentLanguageTag: "fr"
                },
                code: {
                    success: true,
                    code: "XYZ789"
                }
            }}
        />
    )
};
export const WithHtmlErrorMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                code: {
                    success: false,
                    error: "Something went wrong. <a href='https://example.com'>Try again</a>"
                }
            }}
        />
    )
};
