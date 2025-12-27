const months = [
  ["January", "Jan"],
  ["February", "Feb"],
  ["March", "Mar"],
  ["April", "Apr"],
  ["May", "May"],
  ["June", "Jun"],
  ["July", "Jul"],
  ["August", "Aug"],
  ["September", "Sep", "Sept"],
  ["October", "Oct"],
  ["November", "Nov"],
  ["December", "Dec"]
];

const getMonth = month => {
  if (/^\d+$/.test(month)) return months[month - 1][0];
  return months.find(monthNames => monthNames.find(name => name.toLowerCase() === month.toLowerCase()))[0];
};

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

  return [year, month, day];
};

const showForm = () => location.hash = '';
const showDeedPoll = () => location.hash = 'deedpoll';
const onHashChange = () => {
  if (location.hash === '#deedpoll') {
    document.getElementById('data-entry').hidden = true;
    document.getElementById('footer').hidden = true;
    document.getElementById('printable-deed-poll').hidden = false;
  } else {
    document.getElementById('data-entry').hidden = false;
    document.getElementById('footer').hidden = false;
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

  const day = getFormValue(e, "deed-poll-signed-day"), rawMonth = getFormValue(e, "deed-poll-signed-month"), year = getFormValue(e, "deed-poll-signed-year");
  const month = getMonth(rawMonth);

  templateDeedPoll('day', day);
  templateDeedPoll('day-suffix', getDateSuffix(day));
  templateDeedPoll('month', month);
  templateDeedPoll('year', year);

  showDeedPoll();
}

const [currentYear, currentMonth, currentDay] = getCurrentDate();
document.getElementById('deed-poll-signed-year').value = currentYear;
document.getElementById('deed-poll-signed-month').value = currentMonth;
document.getElementById('deed-poll-signed-day').value = currentDay;
document.getElementById('user-info').addEventListener('submit', generateDeedPoll);
document.getElementById('back').addEventListener('click', showForm);
document.getElementById('see-example').addEventListener('click', showDeedPoll);
document.getElementById('print').addEventListener('click', () => window.print());
window.addEventListener("hashchange", onHashChange);
// Trigger hash change on page load in case user is already on #deedpoll
onHashChange();
