﻿(function (jsPDFAPI) {
var callAddFont = function () {
this.addFileToVFS('LinLibertine_R-normal.ttf', font);
this.addFont('LinLibertine_R-normal.ttf', 'LinLibertine_R', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);