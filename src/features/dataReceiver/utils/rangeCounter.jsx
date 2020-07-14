import _map from 'lodash/map';
import _each from 'lodash/each';
import _sortBy from 'lodash/sortBy';

export const MIN_VALUE = 0;
export const MAX_VALUE = 100;
export const BARS_COUNT = 10;

let rangeCache = null;
export const getRange = () => {
  if (rangeCache) {
    return rangeCache;
  }

  const step = (MAX_VALUE - MIN_VALUE) / BARS_COUNT;
  rangeCache = [];

  for (let ii = MIN_VALUE; ii < MAX_VALUE; ii += step) {
    rangeCache.push({
      key: `${ii} - ${ii + step}`,
      isPassing: val => val >= ii && val < ii + step,
    });
  }

  return rangeCache;
};

export const getBars = raw => {
  const data = {};

  _each(raw, value => {
    _each(getRange(), range => {
      if (!data[range.key]) {
        data[range.key] = 0;
      }

      if (range.isPassing(value)) {
        data[range.key] += 1;
      }
    });
  });

  return _sortBy(_map(data, (value, name) => ({ value, name })), 'name');
};

export default getRange;
