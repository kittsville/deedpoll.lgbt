const getFormValue = (e, fieldName) => e.srcElement.elements[fieldName].value;

const getDateSuffix = day => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const getCurrentDate = () => {
  const date = new Date(),
  month = (date.getMonth() + 1).toString().padStart(2, '0'),
  day = date.getDate().toString().padStart(2, '0'),
  year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const showForm = () => location.hash = '';
const showDeedPoll = () => location.hash = 'deedpoll';
const onHashChange = () => {
  if (location.hash === '#deedpoll') {
    document.getElementById('data-entry').hidden = true;
    document.getElementById('printable-deed-poll').hidden = false;
  } else {
    document.getElementById('data-entry').hidden = false;
    document.getElementById('printable-deed-poll').hidden = true;
  }
  scroll(0,0);
}

const templateDeedPoll = (key, value) =>
  document.querySelectorAll(`[data-source=${key}]`).forEach(element => element.textContent = value);

const generateDeedPoll = e => {
  e.preventDefault();

  const formKeys = [
    'old-name',
    'new-name',
    'address',
    'witness-1-name',
    'witness-1-address',
    'witness-2-name',
    'witness-2-address'
  ];

  formKeys.forEach(key => {
    const value = getFormValue(e, key);
    templateDeedPoll(key, value);
  });

  const date = new Date(getFormValue(e, "date")),
  months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"],
  day = date.getDate();

  templateDeedPoll('day', day);
  templateDeedPoll('day-suffix', getDateSuffix(day));
  templateDeedPoll('month', months[date.getMonth()]);
  templateDeedPoll('year', date.getFullYear());

  showDeedPoll();
  window.print();
}

document.getElementById('date').value = getCurrentDate();
document.getElementById('user-info').addEventListener('submit', generateDeedPoll);
document.getElementById('back').addEventListener('click', showForm);
document.getElementById('see-example').addEventListener('click', showDeedPoll);
window.addEventListener("hashchange", onHashChange);
// Trigger hash change on page load in case user is already on #deedpoll
onHashChange();

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
mdc.iconButton.MDCIconButtonToggle.attachTo(document.querySelector('button'));
