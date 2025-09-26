import { I18n } from 'keycloakify/login/i18n';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (

        <div className="flex items-center space-x-2">
            <Checkbox
                id="logout-sessions"
                name="logout-sessions"
                value="on"
                defaultChecked={true}
            />
            <Label htmlFor="logout-sessions" className="text-sm font-medium cursor-pointer">
                {msg("logoutOtherSessions")}
            </Label>
        </div>


    );
}
