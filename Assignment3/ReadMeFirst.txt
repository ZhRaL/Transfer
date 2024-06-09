Folgende Features zur BasisVersion wurden implementiert:
- Suche: Eine Suche ist nun verfügbar, welche in der NavBar über ein LupenSymbol erreichbar ist. Hier öffnet sich ein Textfeld, in welchem der Suchbegriff eingegeben werden kann. Die Ergebnisse der Suche werden anschließend auf einer neuen Seite dargestellt, gleicher Stil wie die Ansicht der "Verwandten Begriffe".
- Es wurde ein Home Screen erstellt, welcher eine Übersicht aller Fakultäten, Personen etc. beinhaltet, welche man entsprechend Filtern kann. Dies stellt den Einstieg in die Applikation dar
- Routing wurde entsprechend angepasst, sodass nicht vorhandene URLs nun zu /Home zurückführen. 
- Kleinigkeiten wie beispielsweise den veränderten Cursor wenn man über ein "Connected Item" hovered, etwas andere Seitenabstände

X Suche Implementieren:
    - einfache Suche, die nur Namen sucht
    - Begriffe in dem Results die exakt dem Suchbegriff entsprechen Highlighten
    (- erweiterte Suche, die auch in den Texten(stringValue) sucht)

X- Übersicht:
  X- z.B. Darstellung aller Fakultäten oder Ähnliches als neues /Home
  X- Routing bei falschen URLs etc immer zu /Home zurück
  - 3 Buttons für Types
  - Alphabetisch!!

X Bei verlinkten Items gleich ein kleines Tag davor um welchen Typ es sich handelt(Person, Fakultät,News etc.)
  - Idee ist schon da:Checken, wieso bei item.component.html:20-22 kein Bild angezeigt wird -> Für Tags wichtig

X- leere verbundene Items nicht anzeigen( vgl https://app.communitymirrors.net/item/a_220)
    -> Bug irgendwie?! -> citem.getItemName() != "";

X - Kleinigkeiten, etwas mehr Schatten mit rein, vlt mit paar Kacheln mehr arbeiten, DashBoard Style

X - bei kleinen Displays Textfeld + 3 Buttons rechts in neue Zeile

X- Cursor bei connected Items ändern

X - Textfeld zu Lupensymbol bisschen Abstand

X - Searchresult abstand zu linkem Bidlschirmrand

- blinkender CUrsor bei SUchtext oben
