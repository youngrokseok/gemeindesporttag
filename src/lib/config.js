// Nach dem Google-Apps-Script-Setup hier die Web-App-URL eintragen:
export const config = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbzOs15kdXXPTnrf-oKVCp2Cs0rocypke0uaYHExzHXcObGEEnXKkimY-8xN2-VvLUaY/exec",
  event: {
    title: "Gemeindesporttag",
    dateLabel: "Samstag, 12.09.2026",
    place: "Kautz Sportcenter",
    address: "Rhöndorfer Str. 10–13, 50939 Köln",
    paypalEmail: "youngrokseok@gmail.com",
  },
  maxParticipants: 10,
  ageGroups: [
    { id: "ab30", label: "ab 30 Jahre — 5 €", amount: 5 },
    { id: "15-29", label: "15–29 Jahre — 3 €", amount: 3 },
    { id: "unter15", label: "unter 15 Jahre — 2 €", amount: 2 },
  ],
  activities: [
    { id: "fussball", label: "Fußball Erwachsene (15:30–17:00)" },
    { id: "fussball-kinder", label: "Fußball Kinder (17:00–18:00)" },
    { id: "badminton", label: "Badminton (15:30–17:00)" },
    { id: "sprungplatz", label: "Sprungplatz für Kinder (17:00–18:00)" },
    { id: "pizza", label: "Pizza-Gemeinschaft (ab 18:30)" },
  ],
  program: [
    { name: "Fußball", time: "15:30–17:00 Erwachsene / 17:00–18:00 Kinder" },
    { name: "Badminton", time: "15:30–17:00" },
    { name: "Sprungplatz für Kinder", time: "17:00–18:00" },
    { name: "Pizza-Gemeinschaft", time: "ab 18:30" },
  ],
  fees: "ab 30 J.: 5 € · 15–29 J.: 3 € · unter 15 J.: 2 €",
};
