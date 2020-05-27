const baseUrl = 'https://restcountries.eu/rest/v2';

export default {
  fetchCountries(searchQuery) {
    return fetch(baseUrl + `/name/${searchQuery}`)
      .then(res => res.json())
      .catch(error => console.warn(error));
  },
};
