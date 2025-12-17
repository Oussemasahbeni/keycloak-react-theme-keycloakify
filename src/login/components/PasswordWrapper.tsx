import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { JSX } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";


export function PasswordWrapper(props: {
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { passwordInputId, children } = props;
    const { kcContext } = useKcContext();

    const { msgStr } = useI18n();

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className={`absolute inset-y-0 ${kcContext.locale?.rtl ? "left-0 pl-3" : "right-0 pr-3"} flex items-center text-sm leading-5`}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    );
}
