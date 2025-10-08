import { KcContext } from "@/kc.gen";
import { I18n } from "keycloakify/login/i18n";
import { KcClsx } from "keycloakify/login/lib/kcClsx";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    locale: KcContext["locale"];
    children: JSX.Element;
}) {
    const { i18n, passwordInputId, locale, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className={`absolute inset-y-0 ${locale?.rtl ? "left-0 pl-3" : "right-0 pr-3"} flex items-center text-sm leading-5`}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    );
}
