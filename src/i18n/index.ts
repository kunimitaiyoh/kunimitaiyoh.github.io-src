import { addLocaleData, IntlProvider } from "react-intl";

addLocaleData([]);

export const locales: Record<string, any> = {
    en: require("./locales/en.json"),
    ja: require("./locales/ja.json"),
};

export class IntlMessage {
    protected intl: ReactIntl.InjectedIntl

    constructor(locale: string) {
        this.intl = this.resolveIntl(locale);
    }

    public format(
        messageDescriptor: ReactIntl.FormattedMessage.MessageDescriptor,
        values?: { [key: string]: ReactIntl.MessageValue },
    ): string {
        return this.intl.formatMessage.bind(this.intl)(messageDescriptor, values)
    }

    public setLanguage(locale: string) {
        this.intl = this.resolveIntl(locale)
    }

    protected resolveIntl(locale: string): ReactIntl.InjectedIntl {
        const intlProvider = new IntlProvider({
            locale,
            messages: locales[locale],
        })
        return intlProvider.getChildContext().intl
    }
}
