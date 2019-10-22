import Constants from './constants';

let legendBody = {};

legendBody.ru = {
    title: 'Воронка продаж',
    desc:
        'Воронка продаж предназначена для отображения активности клиентов по товарам и магазинам торговой сети. ' +
        'Алгоритм основан на том что среднее посещение магазина в неделю составляет 3000 человек.',
    signsCaption: 'Обозначения',
    termsCaption: 'Определения',
    signs: [
        {
            color: Constants.deviationPositiveColor,
            desc: 'Отклонение КУП от общесетевого более 20%',
        },
        { color: Constants.deviationNegativeColor, desc: 'Отклонение КУП от общесетевого менее 20%' },
        { color: Constants.noActiveGoodColor, desc: 'Не активный товар' },
        { color: Constants.newGoodColor, desc: 'Товар новинка (первая активация < 3 месяцев)' },
    ],
    terms: [
        { term: 'Период', desc: 'Полных три недели назад от указанной даты' },
        {
            term: 'КУП',
            desc: 'Количество клиентов в неделю (максимальное 3000)',
        },
        {
            term: 'Отклонение',
            desc: 'Отклонение КУП товара по магазину от сети в целом',
        },
        { term: 'Цена продажи', desc: 'Средняя цена продажи за три недели' },
        { term: 'Сумма продажи', desc: 'Сумма продажи за три недели' },
        { term: 'Остаток', desc: 'Количество товара на конец периода' },
    ],
};

export default legendBody;
