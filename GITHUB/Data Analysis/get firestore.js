function getFirestore() {
  return FirestoreApp.getFirestore("detials here"
  );
}
function onOpen() {
  Spreadsheet.App.getUi().createMenu('Firestore').addItem('Import', 'ImportFromFirestore').addToUi();
}



function importFromFirestore() {
  const firestore = getFirestore();
  const allDocuments = firestore.getDocuments('lux3').map(function(document){
    return document.obj;
  });
  const first = allDocuments[0];
  const columns = Object.keys(first);

  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(columns);

  allDocuments.forEach(function(document){
    const row = columns.map(function(column){
      return document[column];
    });
    sheet.appendRow(row);
  })

}
