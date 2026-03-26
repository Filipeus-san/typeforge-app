// Server-side i18n for TSTL — bilingual admin (Czech + English, default English)

export type Language = 'cs' | 'en';

interface Translations {
    pageTitles: {
        login: string;
        dashboard: string;
        pages: string;
        pageCreate: string;
        pageEdit: string;
        users: string;
        userCreate: string;
        userEdit: string;
        media: string;
        menu: string;
        redirects: string;
        redirectCreate: string;
        redirectEdit: string;
        settings: string;
        blog: string;
        blogSettings: string;
        blogCreate: string;
        blogEdit: string;
        profile: string;
        forgotPassword: string;
        resetPassword: string;
    };
    errors: {
        loginBothFields: string;
        loginInvalidCredentials: string;
        pageNameRequired: string;
        redirectSourceTargetRequired: string;
        redirectSourceSlash: string;
        redirectDuplicate: string;
        userNameEmailRequired: string;
        userPasswordMin: string;
        userPasswordMismatch: string;
        userEmailExists: string;
        blogTitleRequired: string;
        profileNameEmailRequired: string;
        profilePasswordMin: string;
        profilePasswordMismatch: string;
        forgotPasswordEmailRequired: string;
        resetPasswordInvalidToken: string;
        resetPasswordMin: string;
        resetPasswordMismatch: string;
        resetEmailFailed: string;
    };
    success: {
        settingsSaved: string;
        menuSaved: string;
        pageCreated: string;
        pageSaved: string;
        pageDuplicated: string;
        pageDeleted: string;
        redirectCreated: string;
        redirectSaved: string;
        redirectActivated: string;
        redirectDeactivated: string;
        redirectDeleted: string;
        userCreated: string;
        userSaved: string;
        userBanned: string;
        userUnbanned: string;
        userDeleted: string;
        profileSaved: string;
        blogCreated: string;
        blogSaved: string;
        blogDuplicated: string;
        blogDeleted: string;
        blogSettingsSaved: string;
        mediaUploaded: string;
        mediaDeleted: string;
        forgotPasswordSent: string;
        resetPasswordDone: string;
        resetEmailSent: string;
    };
    misc: {
        copy: string;
        resetEmailSubject: string;
        resetEmailGreeting: string;
        resetEmailText: string;
        resetEmailButton: string;
        resetEmailExpiry: string;
        resetEmailIgnore: string;
    };
}

const cs: Translations = {
    pageTitles: {
        login: 'Přihlášení — Administrace',
        dashboard: 'Dashboard — Administrace',
        pages: 'Stránky — Administrace',
        pageCreate: 'Nová stránka — Administrace',
        pageEdit: 'Upravit stránku — Administrace',
        users: 'Uživatelé — Administrace',
        userCreate: 'Nový uživatel — Administrace',
        userEdit: 'Upravit uživatele — Administrace',
        media: 'Média — Administrace',
        menu: 'Menu — Administrace',
        redirects: 'Přesměrování — Administrace',
        redirectCreate: 'Nové pravidlo — Administrace',
        redirectEdit: 'Upravit pravidlo — Administrace',
        settings: 'Nastavení — Administrace',
        blog: 'Blog — Administrace',
        blogSettings: 'Nastavení blogu — Administrace',
        blogCreate: 'Nový článek — Administrace',
        blogEdit: 'Upravit článek — Administrace',
        profile: 'Můj profil — Administrace',
        forgotPassword: 'Zapomenuté heslo',
        resetPassword: 'Obnovení hesla',
    },
    errors: {
        loginBothFields: 'Vyplňte obě pole.',
        loginInvalidCredentials: 'Nesprávné přihlašovací údaje.',
        pageNameRequired: 'Název stránky je povinný.',
        redirectSourceTargetRequired: 'Zdrojová cesta a cílová URL jsou povinné.',
        redirectSourceSlash: 'Zdrojová cesta musí začínat lomítkem (/).',
        redirectDuplicate: 'Pravidlo pro tuto zdrojovou cestu již existuje.',
        userNameEmailRequired: 'Jméno a email jsou povinné.',
        userPasswordMin: 'Heslo musí mít alespoň 6 znaků.',
        userPasswordMismatch: 'Hesla se neshodují.',
        userEmailExists: 'Uživatel s tímto emailem již existuje.',
        blogTitleRequired: 'Název článku je povinný.',
        profileNameEmailRequired: 'Jméno a email jsou povinné.',
        profilePasswordMin: 'Heslo musí mít alespoň 6 znaků.',
        profilePasswordMismatch: 'Hesla se neshodují.',
        forgotPasswordEmailRequired: 'Zadejte svůj e-mail.',
        resetPasswordInvalidToken: 'Odkaz pro obnovení hesla je neplatný nebo vypršel.',
        resetPasswordMin: 'Heslo musí mít alespoň 6 znaků.',
        resetPasswordMismatch: 'Hesla se neshodují.',
        resetEmailFailed: 'E-mail pro obnovení hesla se nepodařilo odeslat.',
    },
    success: {
        settingsSaved: 'Nastavení bylo uloženo.',
        menuSaved: 'Menu bylo uloženo.',
        pageCreated: 'Stránka byla vytvořena.',
        pageSaved: 'Stránka byla uložena.',
        pageDuplicated: 'Stránka byla zduplikována.',
        pageDeleted: 'Stránka byla smazána.',
        redirectCreated: 'Pravidlo bylo vytvořeno.',
        redirectSaved: 'Pravidlo bylo uloženo.',
        redirectActivated: 'Pravidlo bylo aktivováno.',
        redirectDeactivated: 'Pravidlo bylo deaktivováno.',
        redirectDeleted: 'Pravidlo bylo smazáno.',
        userCreated: 'Uživatel byl vytvořen.',
        userSaved: 'Uživatel byl uložen.',
        userBanned: 'Uživatel byl zablokován.',
        userUnbanned: 'Uživatel byl odblokován.',
        userDeleted: 'Uživatel byl smazán.',
        profileSaved: 'Profil byl uložen.',
        blogCreated: 'Článek byl vytvořen.',
        blogSaved: 'Článek byl uložen.',
        blogDuplicated: 'Článek byl zduplikován.',
        blogDeleted: 'Článek byl smazán.',
        blogSettingsSaved: 'Nastavení blogu bylo uloženo.',
        mediaUploaded: 'Soubor byl nahrán.',
        mediaDeleted: 'Soubor byl smazán.',
        forgotPasswordSent: 'Pokud tento e-mail existuje v systému, byl na něj odeslán odkaz pro obnovení hesla.',
        resetPasswordDone: 'Heslo bylo úspěšně změněno. Nyní se můžete přihlásit.',
        resetEmailSent: 'E-mail pro obnovení hesla byl odeslán na',
    },
    misc: {
        copy: '(kopie)',
        resetEmailSubject: 'Obnovení hesla',
        resetEmailGreeting: 'Dobrý den,',
        resetEmailText: 'Obdrželi jsme žádost o obnovení vašeho hesla. Klikněte na tlačítko níže pro nastavení nového hesla.',
        resetEmailButton: 'Obnovit heslo',
        resetEmailExpiry: 'Tento odkaz je platný 1 hodinu.',
        resetEmailIgnore: 'Pokud jste o obnovení hesla nežádali, tento e-mail můžete ignorovat.',
    },
};

const en: Translations = {
    pageTitles: {
        login: 'Login — Administration',
        dashboard: 'Dashboard — Administration',
        pages: 'Pages — Administration',
        pageCreate: 'New Page — Administration',
        pageEdit: 'Edit Page — Administration',
        users: 'Users — Administration',
        userCreate: 'New User — Administration',
        userEdit: 'Edit User — Administration',
        media: 'Media — Administration',
        menu: 'Menu — Administration',
        redirects: 'Redirects — Administration',
        redirectCreate: 'New Redirect — Administration',
        redirectEdit: 'Edit Redirect — Administration',
        settings: 'Settings — Administration',
        blog: 'Blog — Administration',
        blogSettings: 'Blog Settings — Administration',
        blogCreate: 'New Article — Administration',
        blogEdit: 'Edit Article — Administration',
        profile: 'My Profile — Administration',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
    },
    errors: {
        loginBothFields: 'Please fill in both fields.',
        loginInvalidCredentials: 'Invalid credentials.',
        pageNameRequired: 'Page title is required.',
        redirectSourceTargetRequired: 'Source path and target URL are required.',
        redirectSourceSlash: 'Source path must start with a slash (/).',
        redirectDuplicate: 'A rule for this source path already exists.',
        userNameEmailRequired: 'Name and email are required.',
        userPasswordMin: 'Password must be at least 6 characters.',
        userPasswordMismatch: 'Passwords do not match.',
        userEmailExists: 'A user with this email already exists.',
        blogTitleRequired: 'Article title is required.',
        profileNameEmailRequired: 'Name and email are required.',
        profilePasswordMin: 'Password must be at least 6 characters.',
        profilePasswordMismatch: 'Passwords do not match.',
        forgotPasswordEmailRequired: 'Please enter your email.',
        resetPasswordInvalidToken: 'The reset link is invalid or has expired.',
        resetPasswordMin: 'Password must be at least 6 characters.',
        resetPasswordMismatch: 'Passwords do not match.',
        resetEmailFailed: 'Failed to send password reset email.',
    },
    success: {
        settingsSaved: 'Settings saved.',
        menuSaved: 'Menu saved.',
        pageCreated: 'Page created.',
        pageSaved: 'Page saved.',
        pageDuplicated: 'Page duplicated.',
        pageDeleted: 'Page deleted.',
        redirectCreated: 'Redirect created.',
        redirectSaved: 'Redirect saved.',
        redirectActivated: 'Redirect activated.',
        redirectDeactivated: 'Redirect deactivated.',
        redirectDeleted: 'Redirect deleted.',
        userCreated: 'User created.',
        userSaved: 'User saved.',
        userBanned: 'User banned.',
        userUnbanned: 'User unbanned.',
        userDeleted: 'User deleted.',
        profileSaved: 'Profile saved.',
        blogCreated: 'Article created.',
        blogSaved: 'Article saved.',
        blogDuplicated: 'Article duplicated.',
        blogDeleted: 'Article deleted.',
        blogSettingsSaved: 'Blog settings saved.',
        mediaUploaded: 'File uploaded.',
        mediaDeleted: 'File deleted.',
        forgotPasswordSent: 'If that email exists in our system, a password reset link has been sent.',
        resetPasswordDone: 'Your password has been changed successfully. You can now log in.',
        resetEmailSent: 'Password reset email sent to',
    },
    misc: {
        copy: '(copy)',
        resetEmailSubject: 'Password Reset',
        resetEmailGreeting: 'Hello,',
        resetEmailText: 'We received a request to reset your password. Click the button below to set a new password.',
        resetEmailButton: 'Reset Password',
        resetEmailExpiry: 'This link is valid for 1 hour.',
        resetEmailIgnore: 'If you did not request a password reset, you can ignore this email.',
    },
};

const allTranslations: Record<string, Translations> = { cs: cs, en: en };

let currentLanguage: Language = 'en';

export function setLanguage(lang: Language): void {
    currentLanguage = lang;
}

export function getCurrentLanguage(): Language {
    return currentLanguage;
}

export function t(): Translations {
    return allTranslations[currentLanguage];
}
