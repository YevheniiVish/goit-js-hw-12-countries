import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountriesApi from './services/fetchCountries.js';
import countiesListTemplates from '../templates/countriesListItem.hbs';

const refs = {
  searchInput: document.querySelector('#input'),
  countiesList: document.querySelector('ul[data-action="counties"]'),
};

refs.searchInput.addEventListener('input', debounce(handlerSearchInput, 500));

// refs.countiesList.addEventListener('click', loadMoreBtnHandler);

function handlerSearchInput(event) {
  console.dir(event.target);

  if (event.target.value === ' ' || event.target.value === '') {
    PNotify.notice({
      text: 'Enter a country name?',
      type: 'notice',
      delay: 5000,
    });
    clouseNotificationWindow();
    return;
  }
}

fetchCountriesApi
  .fetchCountries(event.target.value)
  .then(res => {
    if (res.length === 1) {
      refs.countiesList.innerHTML = `${countiesListTemplates(data)}`;
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
