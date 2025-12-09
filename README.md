<p align="center">
  <img src="src/login/assets/img/auth-logo.svg" alt="Planingo Logo" width="200"/>
</p>

Keycloak React Theme

A modern, customizable Keycloak login theme built with React, Tailwind CSS, and Keycloakify v11</strong>

---

## ✨ Features

-   🎨 **Modern UI** - Beautiful, responsive design using Tailwind CSS v4 and shadcn/ui components
-   🌙 **Dark Mode** - Built-in dark/light/system theme toggle with persistent preferences
-   🌍 **Multi-language Support** - i18n ready with English, French, and Arabic translations (RTL supported)
-   📧 **Custom Email Templates** - Styled email templates using jsx-email for all Keycloak events
-   🔐 **Complete Login Flow** - All 35+ Keycloak login pages fully customized
-   🎭 **Social Login Providers** - Pre-styled icons for 16+ OAuth providers (Google, GitHub, Microsoft, etc.)
-   📖 **Storybook Integration** - Visual testing and documentation for all components
-   ⚡ **Vite Powered** - Fast development with HMR and optimized builds
-   🔧 **Type-Safe** - Full TypeScript support throughout the codebase

## 🖼️ Supported Pages

This theme includes custom implementations for all Keycloak login pages:

| Authentication      | Account Management  | Security              |
| ------------------- | ------------------- | --------------------- |
| Login               | Register            | WebAuthn Authenticate |
| Login with Username | Update Profile      | WebAuthn Register     |
| Login with Password | Update Email        | Configure TOTP        |
| Login OTP           | Delete Account      | Recovery Codes        |
| Login with Passkeys | Logout Confirm      | Reset OTP             |
| OAuth Grant         | Terms & Conditions  | X509 Info             |
| Device Verification | Select Organization | Delete Credential     |

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm, yarn, or pnpm
-   [Maven](https://maven.apache.org/) (for building the theme JAR)

### Installation

```bash
# Clone the repository
git clone https://github.com/Oussemasahbeni/keycloak-react-theme-keycloakify.git
cd keycloak-react-theme-keycloakify

# Install dependencies
pnpm  install
```

### Development

```bash
# Start development server with hot reload
pnpm  dev

# Run Storybook for component development
pnpm  storybook

# Preview email templates
pnpm emails:preview
```

## 🎨 Customization

### Theme Configuration

The theme is configured in `vite.config.ts`:

```typescript
keycloakify({
    accountThemeImplementation: "none",
    themeName: "planingo-theme",
    keycloakVersionTargets: {
        "22-to-25": false,
        "all-other-versions": "planingo-theme.jar"
    },
    environmentVariables: [{ name: "ENABLE_THEME_TOGGLE", default: "true" }]
});
```

### Branding

1. **Logo**: Replace `src/login/assets/img/auth-logo.svg` with your company logo
2. **Colors**: Modify CSS variables in `src/login/index.css`
3. **Fonts**: Update font imports in `src/login/assets/fonts/`

### Internationalization

Add or modify translations in `src/login/i18n.ts`:

```typescript
.withCustomTranslations({
    en: {
        welcomeMessage: "Welcome to Your App",
        loginAccountTitle: "Login to your account",
        // ... more translations
    },
    fr: { /* French translations */ },
    ar: { /* Arabic translations */ }
})
```

### UI Components

The theme uses shadcn/ui components located in `src/components/ui/`:

-   `alert.tsx` - Alert messages
-   `button.tsx` - Buttons with variants
-   `card.tsx` - Card containers
-   `checkbox.tsx` - Checkbox inputs
-   `input.tsx` - Text inputs
-   `label.tsx` - Form labels
-   `dropdown-menu.tsx` - Dropdown menus
-   `radio-group.tsx` - Radio button groups
-   `tooltip.tsx` - Tooltips

## 📧 Email Templates

Custom email templates are built with [jsx-email](https://jsx.email/) and support multiple languages.

### Available Templates

| Template                     | Description                     |
| ---------------------------- | ------------------------------- |
| `email-verification.tsx`     | Email verification              |
| `password-reset.tsx`         | Password reset link             |
| `executeActions.tsx`         | Required actions                |
| `identity-provider-link.tsx` | IDP linking                     |
| `org-invite.tsx`             | Organization invitation         |
| `event-login_error.tsx`      | Login error notification        |
| `event-update_password.tsx`  | Password change notification    |
| `event-update_totp.tsx`      | TOTP configuration notification |
| And more...                  |                                 |

### Preview Emails

```bash
pnpm run emails:preview
```

### Email Locales

Translations are in `emails/locales/{locale}/translation.json`:

-   `en/` - English
-   `fr/` - French
-   `ar/` - Arabic

## 🔨 Building

### Install Maven

-   **macOS**: `brew install maven`
-   **Ubuntu/Debian**: `sudo apt-get install maven`
-   **Windows**: `choco install openjdk && choco install maven`

### Build the Theme

```bash
# Build the Keycloak theme JAR
pnpm  build-keycloak-theme
```

The built theme will be output as `planingo-theme.jar` in the `dist_keycloak` directory.

### Deploy to Keycloak

1. Copy the `.jar` file to your Keycloak's `providers/` directory
2. Restart Keycloak
3. Select the theme in Keycloak Admin Console under Realm Settings → Themes

## 🧪 Testing

### Storybook

```bash
# Run Storybook for visual testing
pnpm  storybook

# Build static Storybook
pnpm  build-storybook
```

### Local Keycloak Testing

See the [Keycloakify documentation](https://docs.keycloakify.dev/testing-your-theme) for testing with a local Keycloak instance.

## 📁 Project Structure

```text
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── langauges.tsx    # Language switcher
│   │   ├── theme-toggle.tsx # Dark mode toggle
│   │   └── theme-provider.tsx
│   └── login/
│       ├── assets/          # Fonts, images, provider logos
│       ├── pages/           # All login page components
│       ├── shared/          # Shared components
│       ├── Template.tsx     # Main page template
│       ├── i18n.ts          # Translations
│       └── index.css        # Tailwind styles
├── emails/
│   ├── templates/           # Email templates (jsx-email)
│   ├── locales/             # Email translations
│   └── i18n.ts              # Email i18n config
└── vite.config.ts           # Vite & Keycloakify config
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

-   [Keycloakify](https://keycloakify.dev) - For making Keycloak theming with React possible
-   [shadcn/ui](https://ui.shadcn.com) - For the beautiful UI components
-   [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
-   [jsx-email](https://jsx.email) - For React email templates
