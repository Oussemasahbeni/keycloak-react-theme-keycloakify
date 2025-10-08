import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { I18n } from "@/login/i18n";
import { IoLanguage } from "react-icons/io5";
import { Button } from "./ui/button";

export function Languages(props: Readonly<{ i18n: I18n }>) {
    const { msgStr, currentLanguage, enabledLanguages } = props.i18n;

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        tabIndex={1}
                        variant="outline"
                        size="sm"
                        aria-label={msgStr("languages")}
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-controls="language-switch1"
                        className="px-3 py-0 border-gray-400 text-base hover:border-gray-500  flex items-center"
                    >
                        <IoLanguage />
                        {currentLanguage.label}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    id="language-switch1"
                    role="menu"
                    className="max-h-72 overflow-y-auto"
                >
                    {enabledLanguages.map(({ languageTag, label, href }, i) => (
                        <DropdownMenuItem key={languageTag} role="none">
                            <a role="menuitem" id={`language-${i + 1}`} href={href}>
                                {label}{" "}
                            </a>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
