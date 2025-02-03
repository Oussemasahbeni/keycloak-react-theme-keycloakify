// src/emails/messages.ts


export interface EmailMessages {
    greeting: string;
    passwordUpdate: string;
    passwordReset: string;
    passwordAdvice: string;
    loginButton: string;
    contactSupport: string;
    thanks: string;
    supportTeam: string;
  }

export const messages:{ [key: string]: EmailMessages } = {
    en: {
      greeting: "Hi",
      passwordUpdate: "You updated the password for your Twitch account on {date}. If this was you, then no further action is required.",
      passwordReset: "However if you did NOT perform this password change, please reset your account password immediately.",
      passwordAdvice: "Remember to use a password that is both strong and unique to your Twitch account. To learn more about how to create a strong and unique password,",
      loginButton: "Login to Inspark",
      contactSupport: "Still have questions? Please contact {realmName} Support",
      thanks: "Thanks,",
      supportTeam: "{realmName}, Support Team",
    },
    fr: {
      greeting: "Bonjour",
      passwordUpdate: "Vous avez mis à jour le mot de passe de votre compte Twitch le {date}. Si c'était vous, aucune autre action n'est requise.",
      passwordReset: "Cependant, si vous n'avez PAS effectué ce changement de mot de passe, veuillez réinitialiser votre mot de passe immédiatement.",
      passwordAdvice: "N'oubliez pas d'utiliser un mot de passe à la fois fort et unique pour votre compte Twitch. Pour en savoir plus sur la création d'un mot de passe fort et unique,",
      loginButton: "Connexion à Inspark",
      contactSupport: "Vous avez encore des questions ? Veuillez contacter le support {realmName}",
      thanks: "Merci,",
      supportTeam: "L'équipe de support {realmName}",
    },
    ar: {
      greeting: "مرحبا",
      passwordUpdate: "لقد قمت بتحديث كلمة المرور لحساب Twitch الخاص بك في {date}. إذا كان هذا أنت، فلا يلزم اتخاذ أي إجراء آخر.",
      passwordReset: "ومع ذلك، إذا لم تقم بإجراء هذا التغيير في كلمة المرور، يرجى إعادة تعيين كلمة المرور الخاصة بك على الفور.",
      passwordAdvice: "تذكر استخدام كلمة مرور قوية وفريدة لحساب Twitch الخاص بك. لمعرفة المزيد حول كيفية إنشاء كلمة مرور قوية وفريدة،",
      loginButton: "تسجيل الدخول إلى Inspark",
      contactSupport: "هل لا تزال لديك أسئلة؟ يرجى الاتصال بدعم {realmName}",
      thanks: "شكرا،",
      supportTeam: "فريق دعم {realmName}",
    },
  };