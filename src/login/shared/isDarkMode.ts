const SESSION_STORAGE_KEY = "isDarkMode";

export const  getIsDarkMode =( (): boolean => {
    from_url: {
        const url = new URL(window.location.href);

        const value = url.searchParams.get("dark");

        if (value === null) {
            // There was no &dark= query param in the URL,
            // so we check session storage next.
            break from_url;
        }

        // Remove &dark= from the URL (just to keep it clean)
        url.searchParams.delete("dark");
        window.history.replaceState({}, "", url.toString());

        const isDark = value === "true";
        
        // Persist the value in session storage so that
        // if the user navigates, for example, from login.ftl to
        // register.ftl, we don’t lose the state.
        sessionStorage.setItem(SESSION_STORAGE_KEY, `${isDark}`);

        return isDark;
    }

    from_session_storage: {
        const value = sessionStorage.getItem(SESSION_STORAGE_KEY);

        if (value === null) {
            break from_session_storage;
        }

        return value === "true";
    }

    // Return the browser preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
})