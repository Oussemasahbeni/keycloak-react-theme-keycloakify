import { createKcPageStory, type Meta, type StoryObj } from "../../mocks/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "frontchannel-logout.ftl" });

const meta = {
    title: "login/frontchannel-logout.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Arabic: Story = {
    args: {
        kcContext: {
            locale: {
                currentLanguageTag: "ar",
                rtl: true
            }
        }
    }
};
export const French: Story = {
    args: {
        kcContext: {
            locale: {
                currentLanguageTag: "fr"
            }
        }
    }
};

export const WithoutRedirectUrl: Story = {
    args: {
        kcContext: {
            logout: {
                clients: []
            }
        }
    }
};
