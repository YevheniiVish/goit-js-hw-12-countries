import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountriesApi from './services/fetchCountries.js';
import countiesListTemplates from '../templates/countiesListTemplates.hbs';
import countriesList from '../templates/countriesListItem.hbs';

const refs = {
  searchInput: document.querySelector('#input'),
  countryList: document.querySelector('ul[data-action="countries"]'),
};

refs.searchInput.addEventListener('input', debounce(handlerSearchInput, 500));

function handlerSearchInput(event) {
  event.preventDefault();
  clearMarkup();
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
        refs.countryList.innerHTML = `${countriesList(res)}`;
        PNotify.success({
          title: 'Your country!',
          type: 'success',
          text: 'This is your country?',
          delay: 2000,
        });
        clouseNotificationWindow();
        return;
      }
      if (res.length >= 2 && res.length <= 10) {
        refs.countryList.innerHTML = `${countiesListTemplates(res)}`;
      }

      if (res.length > 10) {
        PNotify.error({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'error',
          delay: 2000,
        });
        clouseNotificationWindow();
        return;
      }
    })
    .catch(error => console.warn(error));
}

function clouseNotificationWindow() {
  const notifyClassSelect = document.querySelector('.ui-pnotify');

  function clousePnotify(event) {
    if (event.currentTarget) {
      notifyClassSelect.remove();
    }
  }
  notifyClassSelect.addEventListener('click', clousePnotify);
}

function clearMarkup() {
  refs.countryList.innerHTML = ' ';
}
