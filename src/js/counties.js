import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountriesApi from './services/fetchCountries.js';
import countriesList from '../templates/countiesListTemplates.hbs';
import countiesListTemplates from '../templates/countriesListItem.hbs';

const refs = {
  searchInput: document.querySelector('#input'),
  countryList: document.querySelector('ul[data-action="countries"]'),
};

refs.searchInput.addEventListener('input', debounce(handlerSearchInput, 500));

function handlerSearchInput(event) {
  if (event.target.value === ' ' || event.target.value === '') {
    PNotify.notice({
      text: 'Enter a country name?',
      type: 'notice',
      delay: 2000,
    });
    clouseNotificationWindow();
    return;
  }

  fetchCountriesApi
    .fetchCountries(event.target.value)
    .then(res => {
      if (res.length === 1) {
        refs.countryList.innerHTML = `${countiesListTemplates(res)}`;
        PNotify.success({
          title: 'Your country!',
          type: 'success',
          text: 'This is your country?',
          delay: 2000,
        });
      }
      if (res.length >= 2 && res.length <= 10) {
        refs.countryList.innerHTML = `${countriesList(res)}`;
      }
      if (data.length > 10) {
        PNotify.error({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'error',
          delay: 2000,
        });
      }
    })
    .catch(error => console.warn(error));

  function clouseNotificationWindow() {
    const notifyClassSelect = document.querySelector('.ui-pnotify');

    function clousePnotify(event) {
      if (event.target) {
        notifyClassSelect.remove();
      }

      notifyClassSelect.addEventListener('click', clousePnotify);
    }
  }
}
