import * as R from 'ramda';

import berlin from './assets/berlin.jpg';
import chicago from './assets/chicago.jpg';
import cairo from './assets/cairo.jpg';
import london from './assets/london.jpg';
import ny from './assets/ny.jpg';
import paris from './assets/paris.jpg';
import rome from './assets/rome.jpg';
import seoul from './assets/seoul.jpg';
import tokyo from './assets/tokyo.jpg';
import madrid from './assets/madrid.jpg';

import berlin_normalized from './assets/berlin_normalized.jpg';
import chicago_normalized from './assets/chicago_normalized.jpg';
import cairo_normalized from './assets/cairo_normalized.jpg';
import london_normalized from './assets/london_normalized.jpg';
import ny_normalized from './assets/ny_normalized.jpg';
import paris_normalized from './assets/paris_normalized.jpg';
import rome_normalized from './assets/rome_normalized.jpg';
import seoul_normalized from './assets/seoul_normalized.jpg';
import tokyo_normalized from './assets/tokyo_normalized.jpg';
import madrid_normalized from './assets/madrid_normalized.jpg';

import berlin_odd from './assets/berlin_odd.jpg';
import chicago_odd from './assets/chicago_odd.jpg';
import cairo_odd from './assets/cairo_odd.jpg';
import london_odd from './assets/london_odd.jpg';
import ny_odd from './assets/ny_odd.jpg';
import paris_odd from './assets/paris_odd.jpg';
import rome_odd from './assets/rome_odd.jpg';
import seoul_odd from './assets/seoul_odd.jpg';
import tokyo_odd from './assets/tokyo_odd.jpg';
import madrid_odd from './assets/madrid_odd.jpg';

const IMAGES = [
  berlin,
  chicago,
  cairo,
  london,
  ny,
  paris,
  rome,
  seoul,
  madrid,
  tokyo,
];

const IMAGES_ODD = [
  berlin_odd,
  chicago_odd,
  cairo_odd,
  london_odd,
  ny_odd,
  paris_odd,
  rome_odd,
  seoul_odd,
  madrid_odd,
  tokyo_odd,
];

const IMAGES_NORMALIZED = [
  berlin_normalized,
  chicago_normalized,
  cairo_normalized,
  london_normalized,
  ny_normalized,
  paris_normalized,
  rome_normalized,
  seoul_normalized,
  madrid_normalized,
  tokyo_normalized,
];

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

const CITY_NAMES = [
  'Berlin, Germany',
  'Chicago, Illinois',
  'Cairo, Egypt',
  'London, England',
  'New York, New York',
  'Paris, France',
  'Rome, Italy',
  'Seoul, South Korea',
  'Madrid, Spain',
  'Tokyo, Japan',
];

function getCitiesWithImages(type) {
  const zipFn = (title, imageUrl) => {
    return { title, imageUrl };
  };
  let images = IMAGES;
  if (type === 'normalized') {
    images = IMAGES_NORMALIZED;
  } else if (type === 'odd') {
    images = IMAGES_ODD;
  }
  return R.zipWith(zipFn, CITY_NAMES, images);
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function getSampleData(imageType) {
  const MIN_TEXT_LENGTH = 50;
  const cities = getCitiesWithImages(imageType);
  return R.addIndex(R.map)((location, index) => {
    return R.merge(
      {
        date: addDays(new Date('2013-12-08'), index * 8),
        text: R.slice(0, Math.random() * (R.length(IPSUM) - MIN_TEXT_LENGTH) + MIN_TEXT_LENGTH, IPSUM),
        buttonText: 'Read More',
        onClick: () => {
          const city = R.head(R.split(', ', location.title));
          window.open(`https://wikipedia.org/wiki/${city}`);
        },
        extras: {
          foo: '#Travel',
        },
      },
      location
    );
  }, cities);
}
