getFormValue = (e, fieldName) => e.srcElement.elements[fieldName].value;

getDeedPollText = e => `I ${getFormValue(e, "old-name")} of ${getFormValue(e, "address")} have given up my name ${getFormValue(e, "old-name")} and have adopted for all purposes the name ${getFormValue(e, "new-name")}.

Signed as a deed on ${getFormValue(e, "date")} as ${getFormValue(e, "old-name")} and ${getFormValue(e, "new-name")} in the presence of ${getFormValue(e, "witness-1-name")} of ${getFormValue(e, "witness-1-address")}, and ${getFormValue(e, "witness-2-name")} of ${getFormValue(e, "witness-2-address")}.

[your new signature], [your old signature]

[witness 1 signature], [witness 2 signature]`;

getCurrentDate = () => {
  const date = new Date(),
  month = (date.getMonth() + 1).toString().padStart(2, '0'),
  day = date.getDate().toString().padStart(2, '0'),
  year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

document.getElementById('date').value = getCurrentDate();

document.getElementById('user-info').addEventListener('submit', e => {
  e.preventDefault();

  var doc = new jsPDF();

  deedPoll = getDeedPollText(e);
  deedPollLinewrapped = doc.splitTextToSize(deedPoll, 180);

  doc.text(deedPollLinewrapped, 10, 10);
  doc.save('a4.pdf');
});
