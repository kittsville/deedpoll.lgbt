getFormValue = (e, fieldName) => e.srcElement.elements[fieldName].value;

getDateSuffix = day => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

getDeedPollText = (
    oldName,
    newName,
    address,
    witness1Name,
    witness1Address,
    witness2Name,
    witness2Address,
    date
  ) => {
  const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"],
  day = date.getDate(),
  month = months[date.getMonth()],
  year = date.getFullYear();

  return `
    <p>By this deed of change of name made by myself the undersigned <strong>${newName}</strong> of ${address} formerly known as <strong>${oldName}</strong>.</p>
    <p>Hereby declare as follows:</p>
    <ol>
      <li>I absolutely and entirely renounce, relinquish and abandon the use of my former name of ${oldName} and assume, adopt and determine to take and use from the date hereof the name of ${newName} in substitution for my former name of ${oldName}.</li>
      <li>I shall at all times hereafter in all records, deeds, documents and other writings and in all actions and proceedings, as well as in all dealings and transactions and on all occasions whatsoever use and subscribe the said name of ${newName} as my name, in substitution for my former name of ${oldName} so relinquished as aforesaid to the intent that I may hereafter be called, known or distinguished by the name of ${newName} only and not by my former name of ${oldName}.</li>
      <li>I authorise and require all persons at all times to designate, describe and address me by the adopted name of ${newName}.</li>
    </ol>
    <p>Dated this ${day}${getDateSuffix(day)} day of ${month} in the year ${year}.</p>`;
}

getCurrentDate = () => {
  const date = new Date(),
  month = (date.getMonth() + 1).toString().padStart(2, '0'),
  day = date.getDate().toString().padStart(2, '0'),
  year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

drawSignatureBox = (doc, xStart, y, text) => {
  const lineLength = 55;

  const xEnd = xStart + lineLength;
  doc.line(xStart, y, xEnd, y);

  const textXStart = xStart + (lineLength / 2),
  textYStart = y + 6;
  doc.text(text, textXStart, textYStart, 'center');
}

document.getElementById('date').value = getCurrentDate();

document.getElementById('user-info').addEventListener('submit', e => {
  e.preventDefault();

  const pageCenter = 210/2;

  const doc = new jsPDF();

  doc.setFontSize(33);
  doc.setFont('OldeEnglish');

  const titleText = 'Deed of Change of Name';
  doc.text(titleText, pageCenter, 30, 'center');
  doc.setLineWidth(0.5);
  const titleTextWidth = doc.getTextWidth(titleText);
  doc.line(
    pageCenter - (titleTextWidth / 2),
    31,
    pageCenter + (titleTextWidth / 2),
    31
  );

  doc.setFont('LinLibertine_R');
  doc.setFontSize(12);

  const oldName   = getFormValue(e, "old-name"),
  newName         = getFormValue(e, "new-name"),
  address         = getFormValue(e, "address"),
  witness1Name    = getFormValue(e, "witness-1-name"),
  witness1Address = getFormValue(e, "witness-1-address"),
  witness2Name    = getFormValue(e, "witness-2-name"),
  witness2Address = getFormValue(e, "witness-2-address"),
  date = new Date(getFormValue(e, "date"));

  const deedPollText = getDeedPollText(
    oldName,
    newName,
    address,
    witness1Name,
    witness1Address,
    witness2Name,
    witness2Address,
    date
  );

  doc.fromHTML(deedPollText, 25.4, 55, {
      width: '159.2'
    }
  );

  doc.setLineWidth(0.4);
  doc.setFontSize(10);
  drawSignatureBox(doc, 35, 200, ['by the above name', newName]);
  drawSignatureBox(doc, 120, 200, ['by the above name', oldName]);

  drawSignatureBox(doc, 35, 240, [witness1Name, witness1Address]);
  drawSignatureBox(doc, 120, 240, [witness2Name, witness2Address]);

  doc.save('a4.pdf');
});

Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
mdc.iconButton.MDCIconButtonToggle.attachTo(document.querySelector('button'));
