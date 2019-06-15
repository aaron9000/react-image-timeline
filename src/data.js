import * as R from 'ramda';
import berlin from './assets/berlin.jpg';
import chicago from './assets/chicago.jpg';
import cairo from './assets/cairo.jpg';
import london from './assets/london.jpg'
import ny from './assets/ny.jpg'
import paris from './assets/paris.jpg'
import rome from './assets/rome.jpg'
import seoul from './assets/seoul.jpg'
import tokyo from './assets/tokyo.jpg'
import madrid from './assets/madrid.jpg'

const IPSUM = `Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem. Phasellus tincidunt rhoncus magna,
eget elementum odio rutrum fermentum. Ut a justo lacus. Maecenas blandit molestie felis ac viverra. Pellentesque
sagittis ligula neque, sit amet feugiat massa tempor sed. Duis id bibendum ex, pulvinar tincidunt orci. Curabitur
id sem urna. Maecenas sed elit malesuada, cursus ligula ut, vestibulum lorem. Suspendisse vitae ultrices libero.
Mauris maximus, ligula vitae tincidunt scelerisque, ipsum magna euismod massa, eu vulputate enim est tempus sem.
Maecenas id nibh vitae ante volutpat facilisis nec eget velit. Proin et ligula feugiat, auctor tellus sit amet,
accumsan neque. Quisque porttitor lectus quis elit fermentum, a facilisis est suscipit. Integer consectetur dapibus
nisi, ut lacinia enim vulputate vitae. Curabitur id diam mauris. Duis dictum, dolor at porttitor aliquet, justo libero
mattis magna, eu pellentesque augue mauris eget erat. Pellentesque lacinia velit nec ullamcorper mollis. Pellentesque
lacus tortor, maximus eget tincidunt non, luctus scelerisque odio. Suspendisse potenti. Etiam vel augue blandit, auctor
sem sit amet, imperdiet dolor. Ut a quam laoreet, feugiat orci sed, feugiat nulla. Nulla gravida nisi eu ex egestas
dapibus.`;

const CITIES = [
    {
        title: 'Berlin, Germany',
        imageUrl: berlin
    },
    {
        title: 'Chicago, Illinois',
        imageUrl: chicago
    },
    {
        title: 'Cairo, Egypt',
        imageUrl: cairo
    },
    {
        title: 'London, England',
        imageUrl: london
    },
    {
        title: 'New York, New York',
        imageUrl: ny
    },
    {
        title: 'Paris, France',
        imageUrl: paris
    },
    {
        title: 'Rome, Italy',
        imageUrl: rome
    },
    {
        title: 'Seoul, South Korea',
        imageUrl: seoul
    },
    {
        title: 'Madrid, Spain',
        imageUrl: madrid
    },
    {
        title: 'Tokyo, Japan',
        imageUrl: tokyo
    }
];

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export function getSampleData() {
    const MIN_TEXT_LENGTH = 50;
    return R.addIndex(R.map)((location, index) => {
        return R.merge({
            date: addDays(new Date('2013-12-08'), index * 8),
            text: R.slice(0, Math.random() * (R.length(IPSUM) - MIN_TEXT_LENGTH) + MIN_TEXT_LENGTH, IPSUM),
            buttonText: 'Read More',
            onClick: () => {
                const city = R.head(R.split(', ', location.title));
                window.open(`https://wikipedia.org/wiki/${city}`);
            },
            extras: {
                foo: '#Travel'
            }
        }, location);
    }, CITIES);
}