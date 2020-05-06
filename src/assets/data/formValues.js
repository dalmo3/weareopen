// import dbCities from './cities.json';
import dbCategories from './categories.json';
import dbSuburbs from './suburbs.json';
import dbIndustries from './industries.json';

export const regions = [
  'Auckland',
  'Bay of Plenty',
  'Canterbury',
  'Gisborne',
  "Hawke's Bay",
  'Manawatu-Wanganui',
  'Marlborough',
  'Nelson',
  'Northland',
  'Otago',
  'Southland',
  'Tasman',
  'Taranaki',
  'Waikato',
  'Wairarapa',
  'Wellington',
  'West Coast',
  'North Island',
  'South Island',
  'All New Zealand',
  'Other',
];

// export const suburbs = dbSuburbs;
// export const cities = dbCities;
export const categories = dbCategories.map(c=>c._id).sort((a,b) => a < b ?-1 : 1);
export const industries = dbIndustries.map(i=>i._id).sort((a,b) => a < b ?-1 : 1);

export const homeCategories = dbCategories
  .slice(0, 500)
  .filter(({ _id }) => _id.length < 12)
  .map((c) => c._id)
  .sort(() => Math.random() - 0.5);
export const homeLocations = dbSuburbs
  .slice(0, 500)
  .filter(({ _id }) => _id.length < 12)
  .map((c) => c._id)
  .sort(() => Math.random() - 0.5);
