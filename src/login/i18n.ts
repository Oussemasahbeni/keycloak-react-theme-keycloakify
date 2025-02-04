/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder.withThemeName<ThemeName>()
.withCustomTranslations({
    en: {
        loginAccountTitle: "<span class='text-primary'>Login to </span> your account",
        registerTitle: "<span class='text-primary'>Register</span> a new account",
        email: "Email Address",
        passwordPlaceholder: "Enter your password",
        noAccount: "Don't have an account?",
        doRegister: "Sign up",
        home: "Home",
    },
    ar: {
        loginAccountTitle: "<span class='text-primary'> تسجيل الدخول</span>   إلى حسابك",
        registerTitle: "<span class='text-primary'>تسجيل</span> حساب جديد",
        email: "عنوان البريد الإلكتروني",
        passwordPlaceholder: "أدخل كلمة المرور الخاصة بك",
        doRegister: "إنشاء حساب",
        noAccount: "ليس لديك حساب؟",
        home: "الصفحة الرئيسية",
    },
    fr: {
        loginAccountTitle: "<span class='text-primary'>Connectez-vous</span> à votre compte",
        registerTitle: "<span class='text-primary'>Créer</span> un nouveau compte",
        email: "Adresse e-mail",
        passwordPlaceholder: "Entrez votre mot de passe",
        doRegister: "S'inscrire",
        noAccount: "Vous n'avez pas de compte?",
        home: "Accueil",
    },
})
.build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
