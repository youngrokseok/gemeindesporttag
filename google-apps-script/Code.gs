var SHEET_ANMELDUNGEN = "Anmeldungen";
var SHEET_ANGEBOTE = "Angebote";

var HEADERS = [
  "Zeitstempel",
  "Teilnehmer",
  "Altersgruppe",
  "Beitrag (€)",
  "Angebote",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var participants = Array.isArray(data.participants) ? data.participants : [];
    var timestamp = new Date();

    if (participants.length < 1 || participants.length > 10) {
      return json_({ ok: false, error: "1–10 Teilnehmer erforderlich." });
    }

    var sheet = getOrCreateAnmeldungenSheet_();
    var rows = [];

    for (var i = 0; i < participants.length; i++) {
      var p = participants[i] || {};
      var name = String(p.name || "").trim();
      var ageGroup = String(p.ageGroup || "").trim();
      var amount = Number(p.amount) || 0;
      var activities = Array.isArray(p.activities) ? p.activities.join(", ") : "";

      if (!name || !ageGroup || !activities) {
        return json_({ ok: false, error: "Unvollständige Teilnehmerdaten." });
      }

      rows.push([timestamp, name, ageGroup, amount, activities]);
    }

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    rebuildAngeboteSheet_();

    return json_({ ok: true, count: participants.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  rebuildAngeboteSheet_();
  return json_({ ok: true, service: "Gemeindesporttag Anmeldung" });
}

function getOrCreateAnmeldungenSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ANMELDUNGEN);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_ANMELDUNGEN);
  }

  var headersMatch = false;
  if (sheet.getLastRow() > 0) {
    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var firstRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var filledHeaders = [];
    for (var i = 0; i < firstRow.length; i++) {
      var cell = String(firstRow[i] || "").trim();
      if (cell) filledHeaders.push(cell);
    }
    headersMatch =
      filledHeaders.length === HEADERS.length &&
      HEADERS.every(function (h, i) {
        return filledHeaders[i] === h;
      });
  }

  if (!headersMatch) {
    sheet.clear();
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Baut das Tab „Angebote“ neu auf:
 * Eine Spalte pro Angebot — Zeile 1: Name, Zeile 2: Anzahl, ab Zeile 3: Namen untereinander.
 */
function rebuildAngeboteSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var anmeldungen = ss.getSheetByName(SHEET_ANMELDUNGEN);
  var overview = ss.getSheetByName(SHEET_ANGEBOTE);
  if (!overview) {
    overview = ss.insertSheet(SHEET_ANGEBOTE);
  }

  overview.clear();
  overview.setFrozenRows(2);

  if (!anmeldungen || anmeldungen.getLastRow() < 2) {
    overview.getRange(1, 1).setValue("Noch keine Anmeldungen");
    return;
  }

  var data = anmeldungen.getDataRange().getValues();
  var byActivity = {};

  for (var i = 1; i < data.length; i++) {
    var name = String(data[i][1] || "").trim();
    var activitiesStr = String(data[i][4] || "").trim();
    if (!name || !activitiesStr) continue;

    var acts = activitiesStr.split(",");
    for (var j = 0; j < acts.length; j++) {
      var act = String(acts[j] || "").trim();
      if (!act) continue;
      if (!byActivity[act]) byActivity[act] = [];
      if (byActivity[act].indexOf(name) === -1) {
        byActivity[act].push(name);
      }
    }
  }

  var keys = Object.keys(byActivity).sort();
  if (keys.length === 0) {
    overview.getRange(1, 1).setValue("Noch keine Anmeldungen");
    return;
  }

  var maxNames = 0;
  for (var k = 0; k < keys.length; k++) {
    byActivity[keys[k]].sort();
    if (byActivity[keys[k]].length > maxNames) {
      maxNames = byActivity[keys[k]].length;
    }
  }

  // Zeile 1: Angebotsname | Zeile 2: „N Personen“ | ab Zeile 3: Namen
  var headerRow = [];
  var countRow = [];
  var nameRows = [];
  for (var r = 0; r < maxNames; r++) {
    nameRows.push([]);
  }

  for (var c = 0; c < keys.length; c++) {
    var names = byActivity[keys[c]];
    headerRow.push(keys[c]);
    countRow.push(names.length + (names.length === 1 ? " Person" : " Personen"));
    for (var n = 0; n < maxNames; n++) {
      nameRows[n].push(n < names.length ? names[n] : "");
    }
  }

  overview.getRange(1, 1, 1, keys.length).setValues([headerRow]);
  overview.getRange(2, 1, 1, keys.length).setValues([countRow]);
  if (maxNames > 0) {
    overview.getRange(3, 1, maxNames, keys.length).setValues(nameRows);
  }

  var headerRange = overview.getRange(1, 1, 1, keys.length);
  headerRange.setFontWeight("bold");
  headerRange.setWrap(true);
  headerRange.setVerticalAlignment("middle");
  overview.setRowHeight(1, 60);

  var countRange = overview.getRange(2, 1, 1, keys.length);
  countRange.setFontWeight("bold");
  countRange.setBackground("#eef8f2");

  for (var col = 1; col <= keys.length; col++) {
    overview.setColumnWidth(col, 200);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
