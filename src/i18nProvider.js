import russianMessages from './i18n/ru';
import englishMessages from './i18n/en';

export default locale => {
    if (locale === 'ru') {
        return russianMessages;
    }

    // Always fallback on english
    return englishMessages;
};
