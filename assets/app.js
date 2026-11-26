"use strict";
const DEF = [
  ["Klasse 7 - Q1", "Die Schule beginnt um acht Uhr. Ich gehe jeden Morgen zu Fuß dorthin. Der Weg dauert nur zehn Minuten. Meine Klasse ist sehr nett. Wir haben viele verschiedene Fächer. Mathe und Deutsch sind am wichtigsten. In der Pause essen wir ein Brot mit Käse. Danach spielen wir im Schulhof Fußball. Bei Regen bleiben wir drinnen und lesen. Um eins ist der Unterricht vorbei. Dann gehe ich mit meinen Freunden nach Hause. Am Nachmittag mache ich meine Hausaufgaben. Manchmal helfe ich meiner Mutter im Garten. Am Abend lese ich noch ein Buch. Um neun Uhr gehe ich ins Bett. So sieht mein Tag aus."],
  ["Klasse 7 - Q2", "Am Wochenende fahre ich gern mit dem Rad. Der Weg führt an einem Fluss entlang. Manchmal sehe ich Enten auf dem Wasser. Ich halte an einer Bank an und trinke etwas. Die Sonne scheint und es ist warm. Nach einer Stunde fahre ich zurück. Ich fühle mich fit und zufrieden. Zu Hause warte ich auf meine Familie. Wir essen zusammen zu Mittag. Am Nachmittag treffe ich einen Freund. Wir spielen im Park Federball. Gegen Abend wird es kühl. Ich gehe duschen und ziehe mir etwas Warmes an. Danach sehe ich einen Film. Es war ein schöner Tag."],
  ["Klasse 7 - Q3", "Mein Lieblingsfach ist Kunst. Wir malen bunte Bilder mit Wasserfarben. Manchmal basteln wir auch Figuren aus Ton. Unsere Lehrerin zeigt uns viele Techniken. Sie erklärt uns, wie man Farben mischt. Ich male am liebsten Landschaften mit Bäumen. Einmal habe ich einen großen Sonnenuntergang gemalt. Am Ende hängen wir die Bilder im Flur auf. Alle Schüler bleiben stehen und schauen sie an. Meine Mutter hat mein Bild sehr gelobt. Sie hat es sogar zu Hause aufgehängt. Ich freue mich schon auf die nächste Stunde. Vielleicht male ich dann ein Tier. Ein Pferd oder einen Hund. Mal sehen, was mir einfällt."],
  ["Klasse 7 - Q4", "Der Herbst ist da. Die Blätter werden gelb und rot. Auf dem Weg zur Schule rascheln sie unter meinen Füßen. Ich sammle ein paar schöne Blätter. Zu Hause lege ich sie in ein dickes Buch. So bleiben sie lange schön. Ich kann sie mir immer wieder ansehen. Am Wochenende gehen wir im Wald spazieren. Es riecht nach feuchter Erde und Pilzen. Mein Vater kennt viele Baumarten. Er zeigt mir Eichen, Buchen und Ahorn. Wir finden auch ein paar Kastanien. Damit basteln wir später kleine Figuren. Am Abend trinken wir heißen Tee. Der Herbst ist meine Lieblingsjahreszeit."],
  ["Klasse 8 - Q1", "Im Sommer fahren wir oft an den See. Das Wasser ist klar und angenehm warm. Wir schwimmen bis zur Boje und wieder zurück. Danach liegen wir auf der Wiese und trocknen in der Sonne. Manchmal bringen wir ein Picknick mit. Es gibt belegte Brote, Obst und kalte Getränke. Meine kleine Schwester baut Sandburgen am Ufer. Mein Vater liest ein Buch im Schatten. Meine Mutter schwimmt gerne lange Strecken. Ich selbst tauche am liebsten und schaue nach Fischen. Das Wasser ist so klar, dass man den Grund sehen kann. Am späten Nachmittag wird es kühler. Dann packen wir unsere Sachen zusammen. Auf dem Heimweg sind alle müde, aber glücklich. Wir essen abends noch ein Eis. Es ist immer ein schöner Ausflug. Nächstes Wochenende wollen wir wieder hinfahren. Vielleicht bringen wir dann Freunde mit. Der See ist ein toller Ort zum Entspannen und Spielen. Ich freue mich jedes Mal darauf. Auch die Großeltern kommen manchmal mit. Sie sitzen dann auf einer Decke und erzählen Geschichten. Es ist schön, wenn die ganze Familie zusammen ist. So ein Tag bleibt lange in Erinnerung."],
  ["Klasse 8 - Q2", "Bibliotheken sind ruhige Orte. Man kann dort lesen, lernen oder einfach nachdenken. Die Regale sind voller spannender Bücher. Ich leihe mir meistens Romane aus. Zu Hause lese ich jeden Abend ein paar Seiten. So tauche ich in andere Welten ein und vergesse den Alltag. In der Bibliothek gibt es auch Zeitungen und Zeitschriften. Man kann sie vor Ort lesen oder ausleihen. Es gibt gemütliche Sessel und große Tische. Viele Schüler lernen dort für Prüfungen. Manche lesen auch nur zum Vergnügen. Die Mitarbeiter helfen gerne bei der Suche nach einem Buch. Sie kennen sich gut aus. Man kann Bücher auch online verlängern. Das ist praktisch, wenn man noch nicht fertig ist. Wenn man ein Buch verliert, muss man es ersetzen. Deshalb passe ich immer gut auf meine Ausleihen auf. Bibliotheken sind ein wertvoller Ort für alle. Man trifft dort ruhige Menschen. Jeder ist mit sich beschäftigt. Es ist kein lauter Ort. Man kann sich gut konzentrieren. Ich gehe mindestens zweimal im Monat dorthin. Es ist Teil meines Alltags geworden."],
  ["Klasse 8 - Q3", "Ein guter Freund ist wichtig. Wir kennen uns seit der Grundschule. Zusammen machen wir oft Ausflüge in die Stadt. Wir gehen ins Kino oder essen Pizza. Manchmal besuchen wir auch ein Museum. Wenn ich Probleme habe, kann ich mit ihm reden. Er hört zu und gibt mir ehrliche Ratschläge. Auch wenn wir unterschiedlicher Meinung sind, bleiben wir Freunde. Wir können über alles reden. Das ist nicht selbstverständlich. Viele Freundschaften zerbrechen an Kleinigkeiten. Bei uns ist das anders. Wir haben gelernt, einander zu verzeihen. Ein gutes Gespräch hilft oft mehr als langes Schweigen. Wir haben auch gemeinsame Hobbys. Beide spielen wir gerne Fußball. Manchmal trainieren wir zusammen im Park. Am Wochenende schauen wir Bundesliga. Wir halten zur gleichen Mannschaft. Das verbindet uns zusätzlich. Meine Eltern mögen ihn auch. Sie sagen, dass er ein höflicher Mensch ist. Ich bin froh, dass ich so einen Freund habe. Er ist für mich wie ein Bruder. Wir werden sicher unser Leben lang befreundet bleiben. Das hoffe ich jedenfalls. Gute Freunde sind selten. Ich schätze ihn sehr."],
  ["Klasse 8 - Q4", "Früher schrieben die Menschen Briefe mit der Hand. Heute nutzen die meisten ein Smartphone oder einen Computer. Eine Nachricht ist schnell geschrieben und noch schneller verschickt. Doch manche Dinge sagen wir lieber persönlich. Ein Brief wird mit Sorgfalt verfasst und bleibt oft lange aufbewahrt. Viele Menschen bewahren alte Briefe von Großeltern auf. Sie erzählen von einer anderen Zeit. Die Sprache war damals anders. Man schrieb förmlicher und länger. Heute sind Nachrichten oft nur wenige Wörter lang. Emojis und Abkürzungen ersetzen ganze Sätze. Das ist bequem, aber manchmal auch missverständlich. Ein Brief hat etwas Persönliches. Man erkennt die Handschrift des Schreibers. Man fühlt die Mühe, die dahinter steckt. Natürlich will ich nicht zurück zur alten Zeit. Aber ich schreibe trotzdem manchmal eine Karte an meine Oma. Sie freut sich jedes Mal darüber. Sie sagt, dass sie meine Briefe in einer Schachtel sammelt. Das finde ich sehr schön. So bleibt ein Stück von mir bei ihr."],
  ["Klasse 9 - Q1", "Die Digitalisierung verändert unsere Welt in rasantem Tempo. Immer mehr Geräte sind miteinander vernetzt. Das betrifft nicht nur Computer, sondern auch Haushaltsgeräte oder Autos. Für Schüler bedeutet das neue Chancen, aber auch neue Aufgaben. Wir lernen nicht mehr nur aus Büchern, sondern auch aus Videos und Online-Kursen. Das hat Vorteile, weil man im eigenen Tempo lernen kann. Man kann Videos anhalten und zurückspulen. Man kann sich zu jeder Zeit informieren. Aber es gibt auch Nachteile. Nicht jeder hat zu Hause einen guten Internetzugang. Manche Kinder haben kein eigenes Gerät. Das kann zu Ungleichheit führen. Auch die Konzentration leidet oft. Ständige Benachrichtigungen lenken ab. Wer immer online ist, schläft schlechter. Fachleute empfehlen deshalb klare Regeln. Man soll Bildschirmzeiten begrenzen. Man soll Pausen machen und sich bewegen. Die Digitalisierung ist nicht gut oder schlecht an sich. Es kommt darauf an, wie wir sie nutzen. Wenn wir bewusst mit Technik umgehen, können wir davon profitieren. Wenn wir sie unkontrolliert nutzen, kann sie uns schaden. Schulen müssen deshalb Medienkompetenz vermitteln. Nicht nur wie man ein Gerät bedient, sondern wann man es besser weglässt. Auch der Datenschutz ist wichtig. Wer im Internet unterwegs ist, hinterlässt Spuren. Man sollte darauf achten, welche Daten man teilt. Ich selbst versuche, bewusst mit meinem Handy umzugehen. Aber es ist manchmal schwer."],
  ["Klasse 9 - Q2", "Wer im Winter draußen unterwegs ist, sollte sich warm anziehen. Dicke Jacken, Mützen und Handschuhe halten die Kälte ab. Besonders wichtig sind rutschfeste Schuhe, denn die Wege können glatt sein. Ein warmes Getränk in einer Thermosflasche wärmt unterwegs von innen. Wer sich gut vorbereitet, kann die kalte Jahreszeit in vollen Zügen genießen. Viele Menschen unterschätzen die Kälte. Sie ziehen sich zu dünn an und frieren schnell. Dabei gibt es viele einfache Tricks, um warm zu bleiben. Zwiebelprinzip heißt das Zauberwort. Mehrere dünne Schichten wärmen besser als eine dicke. Die Luft zwischen den Schichten isoliert sehr gut. Baumwolle ist im Winter nicht ideal, weil sie Feuchtigkeit speichert. Besser geeignet sind Wolle oder moderne Kunstfasern. Sie halten auch dann warm, wenn man schwitzt. Auch der Kopf sollte geschützt werden, denn über ihn geht viel Wärme verloren. Hände und Füße werden besonders schnell kalt. Warme Socken und Handschuhe sind deshalb wichtig. Bei sehr niedrigen Temperaturen sollte man nicht zu lange draußen bleiben. Man sollte sich zwischendurch drinnen aufwärmen. Ein Spaziergang im Schnee ist etwas Schönes, wenn man richtig angezogen ist. Kinder haben meistens mehr Freude am Winter als Erwachsene. Sie bauen Schneemänner und rodeln gerne. Für sie ist die Kälte kein Problem, solange sie warm eingepackt sind. Eltern sollten darauf achten, dass ihre Kinder nicht nass werden. Nasse Kleidung kühlt den Körper schnell aus. Ein trockener Ersatz ist deshalb immer sinnvoll. Winter kann sehr schön sein."],
  ["Klasse 9 - Q3", "Sport ist gut für Körper und Geist. Regelmäßige Bewegung stärkt das Herz und die Muskeln. Man schläft besser und fühlt sich ausgeglichener. Dabei muss es nicht immer Leistungssport sein. Ein Spaziergang an der frischen Luft oder eine Runde Radfahren reichen schon aus. Wichtig ist, dass man Freude an der Bewegung hat und dranbleibt. Viele Menschen nehmen sich für das neue Jahr vor, mehr Sport zu treiben. Aber nach wenigen Wochen geben sie wieder auf. Das liegt oft daran, dass sie sich zu viel vornehmen. Besser ist es, klein anzufangen. Einmal pro Woche schwimmen oder zweimal joggen ist ein guter Anfang. Wenn man Erfolge sieht, kommt die Motivation von selbst. Auch der Austausch mit anderen hilft. In einem Verein oder einer Gruppe fällt es leichter, regelmäßig zu trainieren. Man motiviert sich gegenseitig. Man lernt neue Leute kennen. Sport ist auch gut für das Selbstbewusstsein. Wer merkt, dass er fitter wird, ist auch im Alltag selbstsicherer. Man kann besser mit Stress umgehen. Man fühlt sich wohler in seinem Körper. Natürlich sollte man es nicht übertreiben. Zu viel Training kann den Körper überlasten. Man sollte auf die Signale hören. Schmerzen sind ein Warnsignal. Wer krank ist, sollte pausieren. Nach einer Erkältung sollte man langsam wieder anfangen. Auch die Ernährung spielt eine Rolle. Wer sich ausgewogen ernährt, hat mehr Energie. Sport und gesunde Ernährung gehören zusammen. Man muss nicht perfekt sein. Es geht um die kleinen Schritte. Jeder Schritt zählt."],
  ["Klasse 9 - Q4", "Umweltschutz beginnt im Alltag. Wir können Müll trennen, Strom sparen und öfter das Fahrrad nehmen. Auch beim Einkaufen lässt sich viel bewegen. Wer regionale Produkte kauft, unterstützt kurze Transportwege. Kleine Schritte helfen, wenn viele Menschen mitmachen. Jeder Einzelne kann einen Beitrag leisten, das ist die wichtigste Botschaft. Viele Menschen denken, dass sie allein nichts verändern können. Aber das stimmt nicht. Wenn zehn Menschen auf Plastiktüten verzichten, sind das schon zehn Tüten weniger. Wenn tausend Menschen das tun, sind es tausend. Man kann seinen eigenen Einfluss leicht unterschätzen. Auch die Politik ist gefragt. Gesetze können größere Veränderungen bewirken. Aber auch dort braucht es Menschen, die Druck machen. Umweltorganisationen leisten hier wichtige Arbeit. Sie informieren, klagen und machen auf Missstände aufmerksam. Man kann sie unterstützen, indem man Mitglied wird oder spendet. Aber man sollte sich nicht nur auf andere verlassen. Jeder kann im eigenen Umfeld etwas tun. Man kann mit Freunden über das Thema reden. Man kann in der Schule Projekte starten. Man kann im Verein oder in der Gemeinde Vorschläge machen. Der Klimawandel ist eine große Herausforderung. Aber wir haben noch Zeit, etwas zu tun. Wenn wir jetzt handeln, können wir die schlimmsten Folgen vermeiden. Es geht nicht um Verzicht auf alles. Es geht um kluge Entscheidungen. Wer bewusst lebt, lebt nicht schlechter. Oft sogar besser. Man schätzt die Dinge mehr, die man hat. Man wird achtsamer. Und das ist am Ende ein Gewinn für alle."],
  ["Klasse 10 - Q1", "Die Geschichte der Schrift reicht mehrere tausend Jahre zurück. Erste Schriftzeichen entstanden in Mesopotamien vor etwa fünftausend Jahren. Damals ritzte man Zeichen in feuchte Tontafeln. Diese wurden anschließend getrocknet oder gebrannt. So blieben die Informationen erhalten. Später wurden Papyrus und Pergament verwendet. Papyrus stellte man aus der Papyrusstaude her. Diese wuchs vor allem am Nil in Ägypten. Pergament wurde aus Tierhäuten gemacht. Es war teurer, aber auch haltbarer. Im Mittelalter schrieben Mönche in Klöstern Bücher ab. Das dauerte oft viele Monate. Bücher waren deshalb sehr kostbar. Nur wenige Menschen konnten sie sich leisten. Mit der Erfindung des Buchdrucks durch Johannes Gutenberg um 1450 begann eine neue Ära. Bücher wurden günstiger und konnten sich in ganz Europa verbreiten. Immer mehr Menschen lernten lesen und schreiben. Bildung wurde nicht mehr nur Reichen vorbehalten. Die Erfindung des Buchdrucks gilt deshalb als eine der wichtigsten in der Geschichte der Menschheit. Später kamen Zeitungen auf. Im neunzehnten Jahrhundert wurden sie zum Massenmedium. Millionen Menschen konnten sich nun täglich informieren. Im zwanzigsten Jahrhundert entstanden Radio und Fernsehen. Auch diese veränderten die Art, wie Menschen Nachrichten erhielten. Heute spielt das Internet eine zentrale Rolle. Jeder kann Nachrichten verbreiten. Das hat Vorteile, aber auch Risiken. Falschnachrichten können sich rasend schnell verbreiten. Es ist deshalb wichtig, genau hinzuschauen. Man sollte prüfen, ob eine Information stimmt, bevor man sie weitergibt. Die Geschichte der Schrift zeigt, wie eng Kommunikation und Gesellschaft miteinander verbunden sind. Jede neue Technik hat die Welt verändert. Manches wurde besser, manches schlechter. Letztlich kommt es darauf an, wie wir die Werkzeuge nutzen, die uns zur Verfügung stehen. Die Schrift ist eines der wichtigsten Werkzeuge überhaupt. Ohne sie gäbe es keine Wissenschaft, keine Literatur, keine Geschichtsschreibung. Alles Wissen der Menschheit hängt an ihr. Wer sich mit der Geschichte der Schrift beschäftigt, lernt auch viel über die Menschen, die sie erfunden haben. Erstaunlich ist, wie früh bereits Menschen erkannt haben, dass man Gedanken festhalten kann. Diese Idee war revolutionär. Sie hat es möglich gemacht, dass Wissen über Generationen weitergegeben wird. Ohne Schrift gäbe es keine Bücher, keine Gesetze, keine Verträge. Unsere moderne Gesellschaft beruht auf ihr. Umso wichtiger ist es, dass alle Kinder lesen und schreiben lernen. Die Schrift ist ein Geschenk der Vergangenheit an die Zukunft."],
  ["Klasse 10 - Q2", "Künstliche Intelligenz ist längst Teil unseres Alltags, auch wenn uns das oft nicht bewusst ist. Suchmaschinen erkennen Muster, Navigationsgeräte berechnen Routen und Sprachassistenten verstehen unsere Fragen. Hinter diesen Systemen stecken komplexe Algorithmen. Sie lernen aus großen Mengen von Daten. Fachleute streiten darüber, welche Chancen und Risiken damit verbunden sind. Einerseits können KI-Systeme in der Medizin helfen. Sie erkennen Tumore oft früher als Menschen. Sie analysieren Röntgenbilder in Sekunden. Sie können auch bei der Entwicklung neuer Medikamente helfen. Andererseits gibt es berechtigte Sorgen. Manche Berufe könnten wegfallen. Fahrer von Lastwagen zum Beispiel könnten durch selbstfahrende Fahrzeuge ersetzt werden. Auch in Büros könnten viele Aufgaben automatisiert werden. Kritiker warnen davor, dass die Schere zwischen Arm und Reich größer wird. Wer von der Technik profitiert, hat einen Vorsprung. Wer abgehängt wird, hat es schwerer. Ein weiteres Problem ist der Datenschutz. KI-Systeme brauchen viele Daten, um gut zu funktionieren. Diese Daten kommen oft von uns. Sie werden gesammelt und ausgewertet. Manche Menschen fühlen sich dadurch überwacht. Sie wollen selbst entscheiden, welche Daten sie preisgeben. Auch die Frage nach der Verantwortung ist wichtig. Wer haftet, wenn ein selbstfahrendes Auto einen Unfall verursacht? Der Hersteller, der Fahrer oder der Programmierer? Diese Fragen sind noch nicht endgültig geklärt. Juristen und Ethiker arbeiten daran. Ein weiteres Thema ist die Kreativität. KI-Systeme können heute Bilder malen, Musik komponieren und Texte schreiben. Manche Künstler sehen das als Konkurrenz. Andere sehen es als Werkzeug. Die Wahrheit liegt vielleicht in der Mitte. KI kann den Menschen unterstützen, aber nicht ersetzen. Was uns ausmacht, ist unsere Erfahrung, unsere Gefühle, unsere Intuition. Das kann eine Maschine nicht nachmachen. Bildung wird dadurch noch wichtiger. Wer versteht, wie KI funktioniert, kann sie besser nutzen. Wer nur blind vertraut, ist schnell überfordert. Es ist deshalb wichtig, dass Schülerinnen und Schüler früh lernen, mit diesen Technologien umzugehen. Sie sollten auch die Grenzen kennen. Kein System ist unfehlbar. Auch KI macht Fehler. Und diese Fehler können schwerwiegende Folgen haben."],
  ["Klasse 10 - Q3", "Reisen bildet, dieser Satz ist alt, aber immer noch wahr. Wer andere Länder besucht, lernt fremde Kulturen kennen. Man hört andere Sprachen, probiert neue Speisen und sieht Bauwerke, von denen man bisher nur gelesen hat. Solche Erfahrungen verändern den eigenen Blick auf die Welt. Man wird toleranter und offener. Natürlich kostet Reisen Zeit und Geld. Doch die Erinnerungen, die man mitbringt, sind oft unbezahlbar. Es geht nicht darum, möglichst viele Länder zu besuchen. Es geht darum, ein Land wirklich kennenzulernen. Wer nur an den Strand fliegt und im Hotel bleibt, verpasst das Wesentliche. Wer sich die Zeit nimmt, lernt viel mehr. Man kann mit Einheimischen reden. Man kann Märkte besuchen. Man kann kleinere Orte entdecken. Oft sind es diese Momente, die im Gedächtnis bleiben. Nicht die großen Sehenswürdigkeiten, sondern die kleinen Begegnungen. Ein freundliches Lächeln, ein unerwartetes Gespräch, ein ungewohntes Essen. Solche Dinge vergisst man nicht. Reisen ist auch eine Schule fürs Leben. Man muss sich organisieren. Man muss mit Problemen umgehen. Wenn der Zug Verspätung hat oder das Hotel nicht passt, muss man eine Lösung finden. Das stärkt die Selbstständigkeit. Man lernt, geduldig zu sein. Man lernt, flexibel zu sein. Auch sprachlich kann man viel dazulernen. Selbst wenn man eine Sprache nicht gut spricht, versteht man sich irgendwie. Hände und Füße helfen oft mehr als gedacht. Viele junge Menschen nutzen die Zeit nach der Schule für eine Reise. Ein Jahr im Ausland kann prägend sein. Man lernt eine neue Sprache, findet neue Freunde, bekommt neue Perspektiven. Manche entdecken dabei, was sie beruflich machen wollen. Andere merken, wie gut sie es zu Hause haben. In jedem Fall kommen sie als andere Menschen zurück. Reisen ist eine Investition in sich selbst. Es muss nicht immer weit weg sein. Auch die Nachbarländer haben viel zu bieten. Man muss nicht in ein Flugzeug steigen. Ein Zugticket reicht manchmal schon. Wichtig ist, neugierig zu bleiben. Wer offen ist, erlebt überall etwas Neues."],
  ["Klasse 10 - Q4", "Die Frage nach dem richtigen Beruf beschäftigt viele Jugendliche. Nach der Schule stehen zahlreiche Wege offen: Ausbildung, Studium oder ein freiwilliges Jahr. Wichtig ist, dass man sich Zeit nimmt und die eigenen Interessen und Stärken ernst nimmt. Praktika und Gespräche mit Berufstätigen können helfen. Auch ein Umweg ist kein Fehler. Manchmal findet man gerade dadurch, was wirklich zu einem passt. Der erste Beruf ist selten der letzte. Viele Menschen wechseln im Laufe ihres Lebens mehrmals die Stelle. Das ist völlig normal. Früher war es üblich, jahrzehntelang im gleichen Betrieb zu bleiben. Heute ist das anders. Die Arbeitswelt verändert sich schnell. Neue Berufe entstehen, alte verschwinden. Man sollte deshalb bereit sein, lebenslang zu lernen. Wer neugierig bleibt, kann sich leichter anpassen. Aber was ist eigentlich ein guter Beruf? Sicherheit ist vielen wichtig. Man möchte eine Stelle, die nicht morgen schon weg ist. Ein gutes Gehalt spielt auch eine Rolle. Man will sich schließlich etwas leisten können. Aber Geld allein macht nicht glücklich. Wer seine Arbeit hasst, leidet darunter. Man verbringt schließlich viel Zeit damit. Ein Beruf sollte auch Freude machen. Man sollte das Gefühl haben, etwas Sinnvolles zu tun. Man sollte sich mit seinen Kollegen verstehen. Man sollte stolz auf das sein, was man macht. Das klingt vielleicht idealistisch. Aber es gibt viele Menschen, die so arbeiten. Sie sind oft zufriedener als die, die nur ans Geld denken. Natürlich kann man nicht immer alles gleichzeitig haben. Manchmal muss man Kompromisse eingehen. Vielleicht ist der Job nicht perfekt, aber er passt gerade. Vielleicht ist das Gehalt niedriger, dafür ist die Arbeit sinnvoll. Jeder muss für sich selbst entscheiden, was ihm wichtig ist. Es kann helfen, eine Liste zu machen. Was kann ich gut? Was macht mir Spaß? Was ist mir wichtig? Wenn man diese Fragen beantwortet, kommt man seinem Wunschberuf oft näher. Auch Gespräche mit Freunden und Familie können helfen. Sie kennen einen gut und können ehrlich sein. Manchmal sieht man sich selbst nicht so klar, wie andere es tun. Wichtig ist, dass man auf sein Bauchgefühl hört. Wenn ein Beruf sich falsch anfühlt, sollte man lieber weitersuchen. Es gibt nicht nur einen richtigen Beruf. Es gibt viele Wege, glücklich zu werden. Man muss nur bereit sein, sie zu entdecken. Der erste Schritt ist meist der schwerste. Aber wer ihn geht, findet oft schnell weiter."]
];
/* Fingerübungen: feste Wortlisten aus den jeweiligen Tasten (immer gleich, damit Bestwerte vergleichbar bleiben) */
function fingerText(keys, count, seed, legacy = false) {
 let state = seed;
 const next = limit => {
  if (legacy) {
   state = (state * 1103515245 + 12345) & 0x7fffffff;
   return state % limit;
  }
  state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
  return (state >>> 16) % limit;
 };
 return Array.from({length: count}, () => {
  const length = 3 + next(3);
  return Array.from({length}, () => keys[next(keys.length)]).join("");
 }).join(" ");
}
const fingerLessons = [
 ["Grundreihe", "asdfjklö", 90, 7], ["Obere Reihe", "qwertzuiopü", 90, 11],
 ["Untere Reihe", "yxcvbnm", 90, 13], ["Alle Buchstaben", "abcdefghijklmnopqrstuvwxyz", 100, 17],
 ["Umlaute", "äöüßaousnl", 90, 19], ["Zahlen", "1234567890", 70, 23]
];
const FIN = fingerLessons.map(([name, ...lesson]) => ["Finger - " + name, fingerText(...lesson)]);
const OLD=["Augenoptiker","Briefregel 1","Briefregel 2","Briefregel 3","Briefregel 4","Briefregel 5","Briefregel 6","Briefregel 7","Briefregel 8","Briefregel 9"];
const TEXT_VERSION=5,MAXC=6000;
const ROWS=["^1234567890ß´","qwertzuiopü+","asdfghjklöä#","<yxcvbnm,.-"];
const FINGERS=[["^1qa<y","Linker kleiner Finger",20],["2wsx","Linker Ringfinger",45],["3edc","Linker Mittelfinger",95],["45rtfgvb","Linker Zeigefinger",170],["67zuhjnm","Rechter Zeigefinger",205],["8ik,","Rechter Mittelfinger",245],["9ol.","Rechter Ringfinger",285],["0ß´pü+öä#-","Rechter kleiner Finger",330],[" ","Daumen",0]];
const FMAP={};FINGERS.forEach(([cs,n,h])=>[...cs].forEach(c=>{FMAP[c]={n,h}}));
const RANKS=[["Bronze",0],["Silber",200],["Gold",600],["Platin",1500],["Diamant",3500],["Meister",7500]];
const symbol = name => '<svg class="i" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
const rankSvg = () => symbol("medal");
const MEDAL = symbol("medal");
const BADGES=[{id:"start",n:"Erster Schritt",d:"Erste Übung beendet",f:()=>true},{id:"test",n:"Prüfungsreif",d:"Ersten Test abgeschlossen",f:c=>c.test},{id:"sprint",n:"Sprinter",d:"Einen Sprint beendet",f:c=>c.sprint},
 {id:"acc",n:"Makellos",d:"100 % Genauigkeit (ab 50 Anschlägen)",f:c=>c.acc===100&&c.cnt>=50},{id:"t100",n:"Tempo 100",d:"100 Anschläge pro Minute",f:c=>c.net>=100},{id:"t150",n:"Tempo 150",d:"150 Anschläge pro Minute",f:c=>c.net>=150},
 {id:"t200",n:"Tempo 200",d:"200 Anschläge pro Minute",f:c=>c.net>=200},{id:"best",n:"Neuer Rekord",d:"Eigenen Bestwert geschlagen",f:c=>c.nb},{id:"s3",n:"Dranbleiber",d:"3 Tage in Folge geübt",f:c=>c.streak>=3},{id:"s7",n:"Wochenserie",d:"7 Tage in Folge geübt",f:c=>c.streak>=7}];
const $=id=>document.getElementById(id);
const store={g(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const C=Object.assign({scale:100,font:"serif",sound:false,glow:true,fing:false,daily:10,goal:0,lock:false,name:"",kl:"",last:""},store.g("tippoC",{}));
const P=Object.assign({xp:0,days:{},badges:[],hist:[],best:{},kc:{},ke:{},runs:0,tests:0},store.g("tippoP",{}));
const saveC=()=>store.s("tippoC",C),saveP=()=>store.s("tippoP",P);
const nat=(a,b)=>a.localeCompare(b,"de",{numeric:true});
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pct=x=>x.toFixed(1).replace(".",",")+" %";
const day=(d=new Date())=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const mmss=s=>Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
const rankOf=xp=>RANKS.reduce((a,r,i)=>xp>=r[1]?i:a,0);
function streak(){let n=0,d=new Date();if(!P.days[day(d)])d.setDate(d.getDate()-1);while(P.days[day(d)]>0){n++;d.setDate(d.getDate()-1)}return n}
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),3400)}

/* ---------- Speicher: Ordner (File System Access) oder Browser-Speicher (IndexedDB) ---------- */
const dbp=new Promise((res,rej)=>{const r=indexedDB.open("tippo",1);r.onupgradeneeded=()=>{["texte","ges","cfg"].forEach(n=>r.result.createObjectStore(n))};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
async function idb(st,mode,fn){const d=await dbp;return new Promise((res,rej)=>{const t=d.transaction(st,mode),r=fn(t.objectStore(st));t.oncomplete=()=>res(r&&r.result);t.onerror=()=>rej(t.error)})}
let TD=null,GD=null;
async function connect(h){TD=await h.getDirectoryHandle("Texte",{create:true});GD=await h.getDirectoryHandle("Gesicherte Texte",{create:true})}
const fsNames=async d=>{const a=[];for await(const [n,e] of d.entries())if(e.kind==="file"&&/\.txt$/i.test(n))a.push(n);return a};
const fsRead=async(d,n)=>(await(await d.getFileHandle(n)).getFile()).text();
async function fsWrite(d,n,t){const w=await(await d.getFileHandle(n,{create:true})).createWritable();await w.write(t);await w.close()}
const listT=async()=>(TD?await fsNames(TD):await idb("texte","readonly",s=>s.getAllKeys())).sort(nat);
const getT=n=>TD?fsRead(TD,n):idb("texte","readonly",s=>s.get(n));
const putT0=(n,t)=>TD?fsWrite(TD,n,t):idb("texte","readwrite",s=>s.put(t,n));
const putT=async(n,t)=>{const r=await putT0(n,t);onSaved();return r};
const delT=async n=>{if(TD){try{await TD.removeEntry(n)}catch(e){}}else await idb("texte","readwrite",s=>s.delete(n))};
const listG=async()=>(GD?await fsNames(GD):await idb("ges","readonly",s=>s.getAllKeys())).sort();
const getG=n=>GD?fsRead(GD,n):idb("ges","readonly",s=>s.get(n));
async function putG(n,t){const ex=await listG();let f=n,k=0;while(ex.includes(f)){k++;f=n.replace(/\.txt$/,"_"+k+".txt")}
 if(GD)await fsWrite(GD,f,t);else await idb("ges","readwrite",s=>s.put(t,f));onSaved();return f}
/* Standardtexte anlegen; bei neuer TEXT_VERSION werden die alten Standardtexte ersetzt */
async function seed(){
 const l=await listT(),v=store.g("tippoTV",0),all=[...DEF,...FIN];
 if(v<TEXT_VERSION){
  for(const n of l)if(OLD.includes(n.replace(/\.txt$/,"")))await delT(n);
  for(const [n,t] of all)await putT0(n+".txt",t);store.s("tippoTV",TEXT_VERSION);
 } else {
  for (const [name, text] of all) if (!l.includes(name + ".txt")) await putT0(name + ".txt", text);
  for (const [name, ...lesson] of fingerLessons) {
   const file = "Finger - " + name + ".txt";
   // Ersetze die früher erzeugte Vorlage, falls sie unverändert gespeichert ist.
   if (l.includes(file) && await getT(file) === fingerText(...lesson, true)) {
    await putT0(file, fingerText(...lesson));
   }
  }
 }
}

/* ---------- Texte und Startseite ---------- */
let T=[],FLT="Alle";
const S={view:"home",run:false,test:false,sprint:false,drill:false,target:"",typed:"",t0:0,lim:0,errs:0,cnt:0,k1:{},e1:{},samp:[],ls:0,tpl:"",tname:"",cur:"",nm:"",kl:"",last:null};
const grp=n=>{const b=n.replace(/\.txt$/i,""),m=b.match(/^(.+?) - (.+)$/);return m?[m[1],m[2]]:["Eigene Texte",b]};
async function refresh(keep){
 const names=await listT();T=[];
 for(const n of names){let t="";try{t=(await getT(n)||"").replace(/^\uFEFF/,"")}catch(e){}const [g,l]=grp(n);T.push({n,g,l,t,len:t.replace(/\s+/g," ").trim().length})}
 const groupOrder = group => group.startsWith("Klasse") ? 0 : group === "Finger" ? 1 : 2;
 const fingerOrder = name => {
  const index = FIN.findIndex(([label]) => label + ".txt" === name);
  return index === -1 ? FIN.length : index;
 };
 T.sort((a, b) => groupOrder(a.g) - groupOrder(b.g)
  || (a.g === "Finger" ? fingerOrder(a.n) - fingerOrder(b.n) : 0)
  || nat(a.n, b.n));
 const want=keep||C.last,it=T.find(x=>x.n===want)||T[0];
 if(it)pick(it.n,true);else{S.tpl="";S.tname="";S.cur="";S.target=""}
 home()}
function pick(n,quiet){const it=T.find(x=>x.n===n);if(!it)return;S.cur=n;S.tpl=it.t;S.tname=it.n.replace(/\.txt$/i,"");S.drill=false;C.last=n;saveC();if(!quiet)home()}
function paintTexts() {
 const groups = ["Alle", ...new Set(T.map(text => text.g))];
 if (!groups.includes(FLT)) FLT = "Alle";
 $("filters").innerHTML = groups.map(group => '<button class="f' + (group === FLT ? ' on' : '') + '" data-f="' + esc(group) + '" aria-pressed="' + (group === FLT) + '">' + esc(group) + '</button>').join("");
 const texts = T.filter(text => FLT === "Alle" || text.g === FLT);
 $("grid").innerHTML = texts.map(text => {
  const selected = text.n === S.cur;
  return '<button class="tc' + (selected ? ' on' : '') + '" data-n="' + esc(text.n) + '" aria-pressed="' + selected + '"><span><b class="t">' + esc(text.n.replace(/\.txt$/i, "")) + '</b><small>' + text.len + ' Zeichen</small></span>' + (selected ? symbol("book") : "") + '</button>';
 }).join("");
}
function home() {
 $("curTxt").textContent = S.tname || "Kein Text ausgewählt";
 $("bPlay").disabled = $("bTest").disabled = $("bSprint").disabled = !S.tpl.trim();
 if (A) $("bAcc").querySelector("b").textContent = "…" + A.id.slice(-5);
 const td=P.days[day()]||0,goal=C.daily*60,st=streak(),ri=rankOf(P.xp),nx=RANKS[ri+1];
 $("ringFg").style.strokeDashoffset=326.7*(1-Math.min(1,td/goal));$("ringT").textContent=mmss(td);
 $("chStreak").textContent=st+(st===1?" Tag":" Tage");$("chRank").innerHTML=rankSvg(ri)+" "+RANKS[ri][0];$("pRankI").innerHTML=rankSvg(ri);$("ladder").innerHTML=RANKS.map((r,i)=>`<span class="rl${i===ri?" on":i<ri?" done":""}" title="${r[0]}">${rankSvg(i)}<small>${r[0]}</small></span>`).join("");
 $("lead").textContent=C.name?`Hallo ${C.name}! ${st>1?"Du übst seit "+st+" Tagen in Folge. ":""}Wähle einen Text und leg los.`:"Wähle einen Text und leg mit einer Übung oder einem Test los.";
 $("pRank").textContent=RANKS[ri][0];$("pXp").max=nx?nx[1]-RANKS[ri][1]:1;$("pXp").value=nx?P.xp-RANKS[ri][1]:1;$("pXpT").textContent=P.xp+" XP"+(nx?" · noch "+(nx[1]-P.xp)+" bis "+nx[0]:" · höchster Rang");
 $("pToday").textContent=mmss(td);$("pTodayT").textContent=td>=goal?"Topleistung erreicht":"noch "+mmss(Math.max(0,goal-td))+" bis zur Topleistung";
 const h=P.hist,mx=Math.max(...h,10);$("spark").innerHTML=h.length>1?`<polyline fill="none" stroke="var(--acc)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" points="${h.map((v,i)=>(i/(h.length-1)*300).toFixed(1)+","+(66-v/mx*60).toFixed(1)).join(" ")}"/>`:`<text x="0" y="40" fill="var(--mut)" font-size="12">Noch zu wenig Ergebnisse.</text>`;
 $("pAvg").textContent=h.length?"Ø "+Math.round(h.reduce((a,b)=>a+b,0)/h.length)+" · Bestwert "+Math.max(...h):"";
 $("badges").innerHTML=BADGES.map(b=>`<div class="bd${P.badges.includes(b.id)?" on":""}" title="${esc(b.d)}">${MEDAL}<b>${b.n}</b><span>${b.d}</span></div>`).join("");
 $("bDrill").hidden=!Object.keys(P.ke).length}

/* ---------- Tastatur, Ton, Zähler ---------- */
function mkKb(el){const keys={};ROWS.forEach(r=>{const d=document.createElement("div");d.className="r";[...r].forEach(c=>{const k=document.createElement("div");k.className="key";k.textContent=c==='ß'?c:c.toUpperCase();keys[c]=k;d.appendChild(k)});el.appendChild(d)});
 const d=document.createElement("div");d.className="r";const k=document.createElement("div");k.className="key sp";keys[" "]=k;d.appendChild(k);el.appendChild(d);return keys}
const KR=mkKb($("kbRun")),KD=mkKb($("kbDone"));
let ac;function snd(f,d,g){if(!C.sound)return;try{ac=ac||new AudioContext();const o=ac.createOscillator(),n=ac.createGain();o.frequency.value=f;n.gain.value=g;o.connect(n);n.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
function count(el,to){if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.firstChild.nodeValue=to;return}const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/900);el.firstChild.nodeValue=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
function setView(view) {
 S.view = view;
 document.body.dataset.v = view;
 if (view !== "home") {
  if (!root.classList.contains("is-desktop")) side(false);
  menu(false);
 }
 $("app").inert = view !== "home";
 if (view === "home") {
  if (S.drill && S.cur) pick(S.cur, true);
  home();
  const focus = root.dataset.pg === "start" ? $("bPlay") : pageHeading();
  focus.focus({ preventScroll: true });
 }
}

/* ---------- Üben und Testen ---------- */
function prep(t,want){let b=t.replace(/\s+/g," ").trim();if(!b)return"";
 if(!want){if(b.length>MAXC){const c=b.lastIndexOf(". ",MAXC);b=b.slice(0,c>MAXC/2?c+1:MAXC)}return b}
 let o="";while(o.length<want)o+=b+" ";return o.slice(0,want).trim()}
let tmr=0;
function startRun(test,mins,want,sprint){
 if(!S.tpl.trim()){toast("Bitte zuerst einen Text auswählen.");return false}
 S.target=prep(S.tpl,want||0);if(!S.target){toast("Dieser Text enthält keinen verwendbaren Inhalt.");return false}
 Object.assign(S,{run:true,test:!!test,sprint:!!sprint,typed:"",t0:0,errs:0,cnt:0,lim:(test||sprint)?mins*60:0,k1:{},e1:{},samp:[],ls:0});
 $("rInfo").textContent=S.tname+(test?" · Test "+S.nm+" ("+S.kl+")":sprint?" · Sprint":" · Übung");$("mZk").textContent=S.lim?"Restzeit":"Zeit";
 setView("run");$("run").scrollTop=0;cap.value="";rRun();cap.focus({preventScroll:true});clearInterval(tmr);tmr=setInterval(tick,100);return true}
function tick(){if(!S.run)return;if(S.t0){const s=Math.floor(el());while(S.ls<s){S.ls++;S.samp.push(S.cnt-S.errs)}}
 if(C.goal)rRun();else rMet();if(S.lim&&S.t0&&el()>=S.lim)end(false)}
const el=()=>S.t0?(Date.now()-S.t0)/1000:0;
function rMet(){const e=el();$("mT").textContent=e>2?Math.round((S.cnt-S.errs)*60/e):0;
 $("mA").innerHTML=(S.cnt?Math.round((1-S.errs/S.cnt)*100):100)+"<small>%</small>";$("mZ").textContent=mmss(S.lim?Math.max(0,S.lim-e):e);
 $("tb").style.width=S.lim?Math.min(100,e/S.lim*100)+"%":"0";$("pb").style.width=S.target?S.typed.length/S.target.length*100+"%":"0"}
function rRun(){
 const t=S.target,v=S.typed,gi=C.goal&&S.t0?Math.floor(el()*C.goal/60):-1;let h="";
 for(let i=0;i<t.length;i++){const ch=esc(t[i]);let c="";
  if(i<v.length)c=(v[i]===t[i]||S.test)?"d1":"x";else if(i===v.length)c="c";
  if(i===gi&&i>=v.length)c+=(c?" ":"")+"gh";
  h+=c?`<span class="${c}"${i===v.length?' id="cur"':""}>${ch}</span>`:ch}
 const tp=$("tp");tp.innerHTML=h;const cu=$("cur");if(cu){const lh=parseFloat(getComputedStyle(tp).lineHeight)||50;tp.scrollTop=Math.max(0,cu.offsetTop-lh)}
 for(const c in KR){const k=KR[c];k.classList.remove("on");k.style.background=C.fing&&c!==" "&&FMAP[c]?`hsl(${FMAP[c].h} 35% 26%)`:""}
 let hint="";if(C.glow&&v.length<t.length){const ch=t[v.length],k=KR[ch.toLowerCase()],f=FMAP[ch.toLowerCase()];if(k){k.classList.add("on");k.style.background=""}
  hint="Nächste Taste: <b>"+(ch===" "?"Leertaste":esc(ch))+"</b>"+(f?" · "+f.n:"")+(ch!==ch.toLowerCase()?" · mit Umschalt":"")}
 if(C.goal&&S.t0){const d=v.length-Math.floor(el()*C.goal/60);hint+=(hint?"   ·   ":"")+"Ziel "+C.goal+": <b>"+(d>=0?d+" voraus":-d+" zurück")+"</b>"}
 $("hint").innerHTML=hint;rMet()}
function tipp(c){const v=S.typed,t=S.target;if(v.length>=t.length)return;if(!S.t0)S.t0=Date.now();
 const w=t[v.length],k=w.toLowerCase();S.cnt++;S.k1[k]=(S.k1[k]||0)+1;
 if(c!==w){S.errs++;S.e1[k]=(S.e1[k]||0)+1;snd(160,.09,.05)}else snd(1500,.012,.012);
 S.typed+=c;rRun();if(S.typed.length>=t.length)end(false)}
function stop() {
 if (!S.run) return;
 if (S.test && S.cnt) $("stopd").showModal();
 else end(true);
}
$("keepWriting").onclick = () => $("stopd").close();
$("endTest").onclick = () => { $("stopd").close(); end(true); };

async function end(abort){
 if(!S.run)return;S.run=false;clearInterval(tmr);
 const ms=Math.max(S.t0?Date.now()-S.t0:0,1000);
 if(!S.cnt){setView("home");toast(S.test?"Nichts geschrieben, daher nichts gespeichert.":"Übung beendet.");return}
 const net=Math.round((S.cnt-S.errs)*60000/ms),acc=Math.round((1-S.errs/S.cnt)*1000)/10;
 if(net>800){setView("home");toast("Ergebnis unplausibel (zu schnell) und nicht gewertet.");return}
 for(const k in S.k1){P.kc[k]=(P.kc[k]||0)+S.k1[k]}for(const k in S.e1){P.ke[k]=(P.ke[k]||0)+S.e1[k]}
 const r=reward(net,acc,ms);S.last={net,acc,ms,cnt:S.cnt,errs:S.errs,name:S.test?S.nm:C.name,kl:S.test?S.kl:C.kl,tname:S.tname,date:new Date()};
 showDone(net,acc,ms,r);
 if(S.test)await saveTest(ms,net,abort)}
function reward(net,acc,ms){
 const rb=rankOf(P.xp),key=S.tname,prev=P.best[key]||0,nb=!S.drill&&net>prev;if(nb)P.best[key]=net;
 const xp=Math.round((S.cnt-S.errs)/10)+(S.test?10:0)+(acc===100?10:0)+(nb&&prev?5:0);P.xp+=xp;P.runs++;if(S.test)P.tests++;P.hist.push(net);P.hist=P.hist.slice(-12);
 P.days[day()]=(P.days[day()]||0)+Math.round(ms/1000);
 const ctx={net,acc,cnt:S.cnt,test:S.test,sprint:S.sprint,nb:nb&&prev>0,streak:streak()};
 const gained=BADGES.filter(b=>!P.badges.includes(b.id)&&b.f(ctx));gained.forEach(b=>P.badges.push(b.id));saveP();
 return{xp,nb:nb&&prev>0,gained,rankUp:rankOf(P.xp)>rb}}
function showDone(net,acc,ms,r){
 setView("done");$("done").scrollTop=0;$("dTitle").focus({preventScroll:true});const ri=rankOf(P.xp),nx=RANKS[ri+1];
 $("dKick").textContent=S.tname+(S.test?" · Test":S.sprint?" · Sprint":" · Übung");
 $("dTitle").textContent=net>=200?"Weltklasse.":net>=150?"Stark gemacht.":net>=100?"Sauber getippt.":acc>=97?"Genau richtig.":"Weiter so.";
 $("dScore").innerHTML="0<small>Netto-Anschläge pro Minute</small>";count($("dScore"),net);
 const tag=(t,c)=>`<span class="tag ${c||""}">${t}</span>`;
 $("dTags").innerHTML=tag("Genauigkeit "+pct(acc))+tag(S.errs+" Fehler")+tag(Math.round(S.cnt*60000/ms)+" brutto")+tag(mmss(ms/1000))+tag("+"+r.xp+" XP","g")+(r.nb?tag("Neuer Bestwert","g"):"")+r.gained.map(b=>tag(b.n,"g")).join("")+
  Object.entries(S.e1).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([c,n])=>tag((c===" "?"Leer":esc(c.toUpperCase()))+" ×"+n,"e")).join("");
 $("dXp").style.width="0";setTimeout(()=>{$("dXp").style.width=(nx?(P.xp-RANKS[ri][1])/(nx[1]-RANKS[ri][1])*100:100)+"%"},60);
 $("dXpT").textContent="Rang "+RANKS[ri][0]+" · "+P.xp+" XP"+(nx?" · noch "+(nx[1]-P.xp)+" bis "+nx[0]:"");
 for(const c in KD){const e=S.e1[c]||0,a=S.k1[c]||1;KD[c].style.background=e?`rgba(255,138,122,${(.25+.6*Math.min(1,e/a)).toFixed(2)})`:"";KD[c].style.color=e?"#fff":""}
 requestAnimationFrame(()=>chart($("chart")));
 if(r.rankUp)setTimeout(()=>toast("Neuer Rang: "+RANKS[ri][0]),700);else if(r.gained.length)setTimeout(()=>toast("Neues Abzeichen: "+r.gained.map(b=>b.n).join(", ")),700)}
function chart(cv){const w=cv.clientWidth,h=cv.clientHeight;if(!w)return;const d=devicePixelRatio||1;cv.width=w*d;cv.height=h*d;const x=cv.getContext("2d");x.scale(d,d);
 const sp=S.samp.map((v,i)=>{const k=Math.min(5,i+1),b=i-k>=0?S.samp[i-k]:0;return(v-b)*60/k});
 if(sp.length<2){x.fillStyle="rgba(255,255,255,.55)";x.font="13px sans-serif";x.fillText("Zu kurz für ein Diagramm.",0,24);return}
 const mx=Math.max(...sp,C.goal,10)*1.15;x.strokeStyle="rgba(255,255,255,.12)";[.25,.5,.75].forEach(f=>{x.beginPath();x.moveTo(0,h*f);x.lineTo(w,h*f);x.stroke()});
 if(C.goal){x.setLineDash([5,5]);x.strokeStyle="rgba(255,255,255,.5)";const y=h-C.goal/mx*h;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();x.setLineDash([])}
 x.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--acc");x.lineWidth=3;x.lineJoin="round";x.beginPath();sp.forEach((v,i)=>{const px=i/(sp.length-1)*w,py=h-v/mx*h;i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke()}

/* ---------- Test: Dialog, Countdown, Blatt Papier ---------- */
function countdown(cb){const e=$("cd"),n=$("cdN");let i=3;setView("cd");e.classList.add("on");
 const step=()=>{if(!i){e.classList.remove("on");if(!cb())setView("home");return}n.textContent=i;n.style.animation="none";void n.offsetWidth;n.style.animation="";snd(660,.08,.05);i--;setTimeout(step,900)};step()}
function wrap(t,cols){const out=[];for(const para of t.replace(/\r/g,"").split("\n")){if(!para.trim()){out.push("");continue}if(para.length<=cols){out.push(para);continue}let cu="";
 for(let w of para.split(" ")){if(!w)continue;while(w.length>cols){if(cu){out.push(cu);cu=""}out.push(w.slice(0,cols));w=w.slice(cols)}
  const x=cu?cu+" "+w:w;if(x.length>cols){out.push(cu);cu=w}else cu=x}out.push(cu)}return out.join("\n")}
let curFn="Tippo.txt";
function sheet(t,fn){curFn=fn||"Tippo.txt";$("sheet").textContent=wrap(t,70);$("sheetd").showModal();$("sheet").scrollTop=0}
async function saveTest(ms,net,abort){
 const result=S.last;
 const d=new Date(),p=n=>String(n).padStart(2,"0"),ds=`${p(d.getDate())}.${p(d.getMonth()+1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
 const L=[["Name",S.nm],["Klasse",S.kl],["Datum",ds],["Modus","Temposchreiben"],["Textvorlage",S.tname],["Maximale Dauer",S.lim/60+" Min."],["Benötigte Zeit",mmss(ms/1000)+(abort?"  (vorzeitig beendet)":"")],
  ["Anschläge",S.cnt],["Tastfehler",S.errs],["Fehleranteil",pct(S.errs/S.cnt*100)],["Brutto/Minute",Math.round(S.cnt*60000/ms)],["Netto/Minute",net]];
 const doc="TIPPO - Schreibtest\n===================\n\n"+L.map(([k,v])=>(k+":").padEnd(20)+v).join("\n")+"\n\n--- Abgetippter Text ---\n\n"+wrap(S.typed,70)+"\n";
 const cl=s=>s.replace(/[^0-9A-Za-zÄÖÜäöüß-]/g,"_").slice(0,30),fn=`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}_${cl(S.nm)}_${cl(S.kl)}.txt`;
 let sf;try{sf=await putG(fn,doc)}catch(e){toast("Das Ergebnis konnte nicht gespeichert werden.");return}
 toast("Ergebnis gespeichert: "+sf);if(S.view==="done"&&S.last===result&&!modal())sheet(doc,sf)}
function dl(b,n){const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000)}
const png=cv=>new Promise(r=>cv.toBlob(r,"image/png"));
const img=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
async function sheetPng(){const W=1240,H=1754,M=120,LH=38,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");x.font="26px 'Courier New',monospace";x.textBaseline="top";
 const cols=Math.floor((W-2*M)/x.measureText("M").width),L=wrap($("sheet").textContent,cols).split("\n"),lpp=Math.floor((H-2*M)/LH),pages=Math.max(1,Math.ceil(L.length/lpp)),base=curFn.replace(/\.txt$/i,"");
 for(let p=0;p<pages;p++){x.fillStyle="#fff";x.fillRect(0,0,W,H);x.fillStyle="#111";x.font="26px 'Courier New',monospace";L.slice(p*lpp,(p+1)*lpp).forEach((l,i)=>x.fillText(l,M,M+i*LH));
  x.fillStyle="#888";x.font="20px 'Segoe UI',sans-serif";x.fillText("Tippo – Seite "+(p+1)+" von "+pages,M,H-70);dl(await png(c),base+(pages>1?"_Seite"+(p+1):"")+".png");await new Promise(r=>setTimeout(r,300))}}
/* Urkunde als Bild */
async function certificate(){
 const r=S.last;if(!r)return;const W=1754,H=1240,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
 x.fillStyle="#FBF8F1";x.fillRect(0,0,W,H);x.strokeStyle="#C8A96A";x.lineWidth=6;x.strokeRect(56,56,W-112,H-112);x.lineWidth=2;x.strokeRect(80,80,W-160,H-160);
 const lg=await img("./assets/logo.svg");if(lg){x.filter="brightness(0)";x.drawImage(lg,W/2-150,130,300,90);x.filter="none"}
 x.textAlign="center";x.fillStyle="#141414";const D="Bahnschrift,'Arial Narrow',Arial,sans-serif",SF="Georgia,'Palatino Linotype',serif";
 try{x.letterSpacing="14px"}catch(e){}x.font=`700 92px ${D}`;x.fillText("URKUNDE",W/2+7,440);try{x.letterSpacing="0px"}catch(e){}
 x.fillStyle="#6D6A63";x.font=`italic 30px ${SF}`;x.fillText("Diese Urkunde erhält",W/2,520);
 x.fillStyle="#141414";x.font=`italic 84px ${SF}`;x.fillText(r.name||"Tippo-Schüler/in",W/2,630);if(r.kl){x.fillStyle="#6D6A63";x.font=`28px ${SF}`;x.fillText("Klasse "+r.kl,W/2,684)}
 x.fillStyle="#6D6A63";x.font=`italic 30px ${SF}`;x.fillText("für ihr Ergebnis im Schreibtraining „"+r.tname+"“:",W/2,760);
 x.fillStyle="#4D6BFE";x.font=`700 190px ${D}`;x.fillText(String(r.net),W/2,940);x.fillStyle="#141414";x.font=`600 28px ${D}`;try{x.letterSpacing="6px"}catch(e){}x.fillText("NETTO-ANSCHLÄGE PRO MINUTE",W/2+3,990);try{x.letterSpacing="0px"}catch(e){}
 x.fillStyle="#6D6A63";x.font=`26px ${SF}`;x.fillText(`Genauigkeit ${pct(r.acc)}  ·  ${r.cnt} Anschläge  ·  ${mmss(r.ms/1000)}  ·  Rang ${RANKS[rankOf(P.xp)][0]}`,W/2,1050);
 x.fillText(r.date.toLocaleDateString("de-DE",{day:"numeric",month:"long",year:"numeric"}),W/2,1120);
 const u=c.toDataURL("image/png");$("certImg").src=u;$("certd").showModal()}

/* ---------- Dialoge ---------- */
const modal=()=>document.querySelector("dialog[open]");
function openTest(){$("iN").value=C.name;$("iK").value=C.kl;$("dlg").showModal();($("iN").value?$("iM"):$("iN")).focus()}
$("bTest").onclick=openTest;$("dC").onclick=()=>$("dlg").close();
$("runExit").onclick=stop;
$("fdlg").onsubmit=e=>{e.preventDefault();const nm=$("iN").value.trim(),kl=$("iK").value.trim();if(!nm||!kl){($("iN").value?$("iK"):$("iN")).focus();return}
 S.nm=C.name=nm;S.kl=C.kl=kl;saveC();const m=Math.min(180,Math.max(1,+$("iM").value||10)),w=Math.min(MAXC,Math.max(0,+$("iW").value||0));$("dlg").close();
 setTimeout(()=>countdown(()=>startRun(true,m,w)),150)};
$("bPlay").onclick=()=>startRun(false,0,0);$("bSprint").onclick=()=>countdown(()=>startRun(false,1,0,true));
$("dAgain").onclick=()=>S.sprint?countdown(()=>startRun(false,1,0,true)):S.test?(setView("home"),openTest()):startRun(false,0,0);$("dHome").onclick=()=>setView("home");$("dCert").onclick=certificate;
$("dDrill").onclick=()=>drill();$("bDrill").onclick=()=>drill();
$("certd").addEventListener("close",()=>{});$("ceC").onclick=()=>$("certd").close();$("ceP").onclick=()=>window.print();$("ceS").onclick=()=>dl(new Blob([Uint8Array.from(atob($("certImg").src.split(",")[1]),c=>c.charCodeAt(0))],{type:"image/png"}),"Tippo-Urkunde.png");
$("shC").onclick=()=>$("sheetd").close();$("shP").onclick=()=>window.print();$("shT").onclick=()=>dl(new Blob(["\ufeff"+wrap($("sheet").textContent,70).replace(/\n/g,"\r\n")],{type:"text/plain;charset=utf-8"}),curFn);$("shI").onclick=sheetPng;$("genC").onclick=()=>$("gen").close();
/* Schwächen üben: Wörter mit den fehleranfälligsten Tasten (über alle Übungen hinweg) */
function drill(){
 const ks=Object.keys(P.ke).filter(k=>P.ke[k]&&k.trim()).sort((a,b)=>P.ke[b]/P.kc[b]-P.ke[a]/P.kc[a]||P.ke[b]-P.ke[a]).slice(0,3);
 if(!ks.length){toast("Noch keine Fehler aufgezeichnet.");return}
 const all=(S.tpl+" "+DEF.map(d=>d[1]).join(" ")).toLowerCase().match(/[a-zäöüß]{3,}/g)||[];
 const pool=[...new Set(all)].filter(w=>ks.some(k=>w.includes(k)));
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 let words=pool.slice(0,22);if(words.length<8)words=words.concat(ks.map(k=>k+k+k+" "+k+k+" "+k+k+k));
 S.tpl=words.join(" ");S.tname="Schwächentraining · "+ks.map(k=>k.toUpperCase()).join(" ");S.drill=true;startRun(false,0,0)}
/* Einstellungen */
function apply() {
 document.documentElement.dataset.f = C.font;
 document.documentElement.style.setProperty("--scale", C.scale / 100);
}
function bind(id, key, type) {
 const input = $(id);
 if (type === "b") input.checked = C[key];
 else input.value = C[key];
 input.onchange = () => {
  C[key] = type === "b" ? input.checked : type === "n" ? Number(input.value) : input.value;
  saveC();
  apply();
  home();
 };
}
[["sScale", "scale", "n"], ["sFont", "font"], ["sDaily", "daily", "n"], ["sGoal", "goal", "n"],
 ["sGlow", "glow", "b"], ["sFing", "fing", "b"], ["sSound", "sound", "b"], ["sLock", "lock", "b"]]
 .forEach(args => bind(...args));
$("bSet").onclick=()=>$("setd").showModal();$("sClose").onclick=()=>$("setd").close();
$("sAna").onclick=()=>{$("setd").close();const k=Object.keys(P.kc).filter(x=>P.ke[x]).sort((a,b)=>P.ke[b]-P.ke[a]).slice(0,12);
 $("genb").innerHTML="<h3 class='d'>Fehleranalyse</h3>"+(k.length?"<table><tr><th>Taste</th><th>Fehler</th><th>Gefordert</th><th>Anteil</th></tr>"+k.map(x=>`<tr><td>${esc(x===" "?"Leer":x.toUpperCase())}</td><td>${P.ke[x]}</td><td>${P.kc[x]}</td><td>${pct(P.ke[x]/P.kc[x]*100)}</td></tr>`).join("")+"</table>":"<p>Noch keine Fehler aufgezeichnet.</p>");$("gen").showModal()};
$("bGes").onclick=async()=>{const l=(await listG()).reverse(),b=$("genb");b.innerHTML="<h3 class='d'>Gesicherte Texte</h3>"+(l.length?"":"<p>Noch keine gesicherten Texte.</p>")+"<div class='lst'></div>";
 l.slice(0,60).forEach(n=>{const x=document.createElement("button");x.className="pill l s";x.textContent=n;x.onclick=async()=>{$("gen").close();sheet(await getG(n),n)};b.querySelector(".lst").appendChild(x)});$("gen").showModal()};
/* Texte hinzufügen */
async function saveText(name, text) {
 const base = name.trim().replace(/[\\/:*?"<>|]/g, "_").replace(/\.txt$/i, "").trim() || "Eigener Text";
 const names = new Set(await listT());
 let file = base + ".txt";
 for (let n = 2; names.has(file); n++) file = base + "_" + n + ".txt";
 await putT(file, text);
 return file;
}
$("textAdd").onclick = () => {
 $("textd").close();
 $("textError").hidden = true;
 $("pN").value = "";
 $("pT").value = "";
 $("pastd").showModal();
 $("pN").focus();
};
$("pX").onclick = () => { $("pastd").close(); openTexts(textOpener); };
$("pS").onclick = async () => {
 const input = $("pT");
 const error = $("textError");
 if (!input.value.trim()) {
  error.hidden = false;
  error.textContent = "Gib zuerst einen Text ein.";
  input.focus();
  return;
 }
 $("pS").disabled = true;
 error.hidden = true;
 try {
  const name = await saveText($("pN").value, input.value);
  await refresh(name);
  $("pastd").close();
  selectedText();
  toast("Text hinzugefügt und ausgewählt.");
 } catch {
  error.hidden = false;
  error.textContent = "Der Text konnte nicht gespeichert werden.";
 } finally {
  $("pS").disabled = false;
 }
};
$("textImport").onclick = () => $("fin").click();
$("fin").onchange = async event => {
 const input = event.target;
 const files = [...input.files];
 let last;
 let failed = 0;
 $("textImport").disabled = true;
 try {
  for (const file of files) {
   try {
    const text = await file.text();
    if (!text.trim() || !/\.txt$/i.test(file.name)) { failed++; continue; }
    last = await saveText(file.name, text);
   } catch { failed++; }
  }
  if (last) {
   await refresh(last);
   $("textd").close();
   selectedText();
  }
  if (failed) toast(failed + " Datei(en) konnten nicht importiert werden.");
  else if (last) toast("Text importiert und ausgewählt.");
 } catch {
  toast("Die Textliste konnte nicht geladen werden.");
 } finally {
  input.value = "";
  $("textImport").disabled = false;
 }
};
if(window.showDirectoryPicker){$("sDir").onclick=async()=>{try{const h=await showDirectoryPicker({mode:"readwrite",id:"tippo"});await connect(h);await idb("cfg","readwrite",s=>s.put(h,"root"));store.s("tippoTV",0);await seed();await refresh();$("setd").close();toast("Ordner verbunden: "+h.name)}catch(e){if(e.name!=="AbortError")alert("Ordner konnte nicht verbunden werden: "+e.message)}}}else $("oDir").hidden=true;

/* ---------- Tastatur-Eingabe ---------- */
const cap = $("cap");
let composing = false;
function syncInput() {
 cap.value = S.typed;
 cap.setSelectionRange(cap.value.length, cap.value.length);
 cap.scrollTop = cap.scrollHeight;
}
function back() {
 if (S.view !== "run" || C.lock) return;
 S.typed = S.typed.slice(0, -1);
 rRun();
}
function feed(data) {
 for (const char of data) {
  if (S.view !== "run" || !S.run) break;
  if (!/[\r\n\t]/.test(char)) tipp(char);
 }
}
cap.addEventListener("beforeinput", event => {
 if (event.isComposing || composing || !event.cancelable) return;
 event.preventDefault();
 if (event.inputType === "deleteContentBackward") back();
 if (event.inputType === "insertText" && event.data) feed(event.data);
 syncInput();
});
cap.addEventListener("input", event => {
 if (composing || event.isComposing || cap.value === S.typed) return;
 if (event.inputType === "deleteContentBackward") back();
 else if (event.inputType === "insertText" && event.data) feed(event.data);
 syncInput();
});
cap.addEventListener("compositionstart", () => { composing = true; });
cap.addEventListener("compositionend", event => {
 composing = false;
 if (event.data) feed(event.data);
 syncInput();
});
for (const type of ["copy", "cut", "paste", "drop"]) {
 $("run").addEventListener(type, event => event.preventDefault());
}
$("tp").addEventListener("click", () => cap.focus({ preventScroll: true }));
$("stopd").addEventListener("close", () => { if (S.run) cap.focus({ preventScroll: true }); });
document.addEventListener("keydown", event => {
 if (event.defaultPrevented || modal() || event.isComposing || S.view === "cd") return;
 const { key, target } = event;
 if (key === "Escape") {
  if (S.view === "run") stop();
  else if (S.view === "done") setView("home");
  return;
 }
 if (event.ctrlKey || event.metaKey || (event.altKey && !event.getModifierState("AltGraph"))) return;
 if (target === cap || target.matches("input, textarea, select, [contenteditable=true]")) return;
 if ((key === " " || key === "Enter") && target.closest("button, a")) return;
 if (S.view === "done" && key === "Enter") { $("dAgain").click(); return; }
 if (key.length !== 1 && key !== "Dead") return;
 if (S.view === "home") {
  if (root.dataset.pg !== "start" || (!desktop.matches && sideOpen()) || !$("mMore").hidden || !S.tpl || key === " ") return;
  if (!startRun(false, 0, 0)) return;
 }
 if (S.view !== "run") return;
 cap.focus({ preventScroll: true });
 if (key !== "Dead") {
  event.preventDefault();
  feed(key);
  syncInput();
 }
});
if (window.visualViewport) {
 const viewport = window.visualViewport;
 const run = $("run");
 const updateRunHeight = () => {
  const keyboardVisible = viewport.scale === 1 && viewport.height < innerHeight - 80;
  run.classList.toggle("keyboard-open", keyboardVisible);
  if (keyboardVisible) run.style.setProperty("--run-height", viewport.height + "px");
  else run.style.removeProperty("--run-height");
 };
 viewport.addEventListener("resize", updateRunHeight);
 updateRunHeight();
}

/* ---------- Navigation ---------- */
const root = document.documentElement;
const desktop = matchMedia("(min-width: 1100px)");
const phone = matchMedia("(max-width: 699px)");
let sideOpener;
const sideOpen = () => root.classList.contains("side-open");
function side(open, restore = false) {
 root.classList.toggle("side-open", open);
 $("side").inert = phone.matches && !open;
 $("shell").inert = $("tabs").inert = !desktop.matches && open;
 for (const button of document.querySelectorAll('[aria-controls="side"]')) {
  button.setAttribute("aria-expanded", String(open));
 }
 if (open && !desktop.matches) $("bCol").focus({ preventScroll: true });
 if (!open && restore && sideOpener?.getClientRects().length) sideOpener.focus({ preventScroll: true });
}
function syncSide() {
 root.classList.toggle("is-desktop", desktop.matches);
 root.classList.toggle("is-compact", !desktop.matches);
 let saved = false;
 try { saved = localStorage.getItem("tippoSb") === "1"; } catch {}
 side(desktop.matches && saved);
}
desktop.addEventListener("change", syncSide);
phone.addEventListener("change", syncSide);
syncSide();
$("bMark").onclick = event => {
 sideOpener = event.currentTarget;
 side(true);
 if (desktop.matches) {
  try { localStorage.setItem("tippoSb", "1"); } catch {}
  $("bCol").focus({ preventScroll: true });
 }
};
$("bCol").onclick = () => {
 side(false, true);
 if (desktop.matches) {
  try { localStorage.setItem("tippoSb", "0"); } catch {}
  $("bMark").focus({ preventScroll: true });
 }
};
$("scrim").onclick = () => side(false, true);
$("yr").textContent = new Date().getFullYear();
const pages = { start: ["#start", "h1"], progress: ["#fortschritt", "progressHeading"], game: ["#spiel", "gameHeading"] };
const pageHeading = () => $(pages[root.dataset.pg][1]);
function go(page, updateHash = true) {
 const previous = root.dataset.pg;
 root.dataset.pg = page;
 for (const button of document.querySelectorAll("[data-page]")) {
  if (button.dataset.page === page) button.setAttribute("aria-current", "page");
  else button.removeAttribute("aria-current");
 }
 const hash = pages[page][0];
 if (updateHash && location.hash !== hash) location.hash = hash;
 if (updateHash || previous !== page) window.scrollTo(0, 0);
 if (previous !== page) window.dispatchEvent(new CustomEvent("tippo-page", { detail: page }));
}
function readPage() {
 const page = Object.keys(pages).find(key => pages[key][0] === location.hash) || "start";
 go(page, false);
}
window.addEventListener("hashchange", readPage);
readPage();

const mm = $("mMore");
const mb = $("bMore");
function menu(open) {
 mm.hidden = !open;
 mb.setAttribute("aria-expanded", String(open));
}
mb.onclick = () => menu(mm.hidden);
document.addEventListener("click", event => {
 const target = event.target;
 const page = target.closest("[data-page]");
 if (page) {
  if (!desktop.matches) side(false);
  menu(false);
  go(page.dataset.page);
  pageHeading().focus({ preventScroll: true });
 }
 const action = target.closest("[data-act]");
 if (action?.dataset.act === "side") {
  sideOpener = action;
  side(true);
 }
 if (action?.dataset.act === "texts") openTexts(action);
 if (action?.dataset.act === "set") $("bSet").click();
 if (!mm.hidden && !target.closest(".split")) menu(false);
});
document.addEventListener("keydown", event => {
 if (event.key !== "Escape" || modal()) return;
 if (!mm.hidden) {
  menu(false);
  mb.focus();
 } else if (!desktop.matches && sideOpen()) {
  side(false, true);
 }
});
for (const id of ["bGes", "sAna", "bDrill", "bSet"]) {
 $(id).addEventListener("click", () => { if (!desktop.matches) side(false); }, true);
}

/* ---------- Textauswahl ---------- */
const textDialog = $("textd");
let textOpener;
function placeTexts() {
 textDialog.classList.toggle("anchored", textOpener === $("curBtn") && !phone.matches);
 if (!textDialog.classList.contains("anchored")) return;
 const anchor = textOpener.getBoundingClientRect();
 const width = textDialog.offsetWidth;
 const height = textDialog.offsetHeight;
 const left = Math.min(Math.max(12, anchor.right - width), innerWidth - width - 12);
 const top = anchor.bottom + height + 20 > innerHeight ? anchor.top - height - 8 : anchor.bottom + 8;
 textDialog.style.setProperty("--text-left", left + "px");
 textDialog.style.setProperty("--text-top", Math.max(12, top) + "px");
}
function openTexts(opener) {
 if (textDialog.open) return;
 if (!desktop.matches) side(false);
 textOpener = opener;
 $("curBtn").setAttribute("aria-expanded", "true");
 const selected = T.find(item => item.n === S.cur);
 FLT = selected?.g || "Alle";
 paintTexts();
 textDialog.showModal();
 placeTexts();
 $("grid").scrollTop = 0;
}
function selectedText() {
 go("start");
 $("curBtn").focus({ preventScroll: true });
}
$("curBtn").onclick = event => openTexts(event.currentTarget);
$("textClose").onclick = () => textDialog.close();
textDialog.addEventListener("close", () => {
 if (textDialog.open) return;
 $("curBtn").setAttribute("aria-expanded", "false");
 textDialog.classList.remove("anchored");
 if (!modal() && document.activeElement === document.body) {
  const target = textOpener?.getClientRects().length ? textOpener : sideOpener;
  target?.focus({ preventScroll: true });
 }
});
textDialog.addEventListener("click", event => {
 if (event.target !== textDialog) return;
 const rect = textDialog.getBoundingClientRect();
 if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) textDialog.close();
});
$("filters").addEventListener("click", event => {
 const button = event.target.closest("button[data-f]");
 if (!button) return;
 FLT = button.dataset.f;
 const index = [...$("filters").children].indexOf(button);
 paintTexts();
 $("grid").scrollTop = 0;
 $("filters").children[index].focus({ preventScroll: true });
 placeTexts();
});
$("grid").addEventListener("click", event => {
 const button = event.target.closest("button[data-n]");
 if (!button) return;
 pick(button.dataset.n);
 textDialog.close();
 selectedText();
});
window.addEventListener("resize", () => { if (textDialog.open) placeTexts(); });

/* ---------- Einstellungen im Website-Design ---------- */
function enhanceSelect(select) {
 const wrapper = document.createElement("div");
 wrapper.className = "cs";
 select.after(wrapper);
 select.hidden = true;
 const button = document.createElement("button");
 button.type = "button";
 button.className = "cs-b";
 button.setAttribute("aria-haspopup", "listbox");
 const list = document.createElement("div");
 list.className = "cs-m";
 list.id = select.id + "Options";
 list.setAttribute("role", "listbox");
 list.setAttribute("aria-labelledby", select.id + "Label");
 button.setAttribute("aria-controls", list.id);
 button.innerHTML = '<span></span>' + symbol("chev");
 button.firstChild.id = select.id + "Value";
 button.setAttribute("aria-labelledby", select.id + "Label " + button.firstChild.id);
 wrapper.append(button, list);
 const setOpen = (open, option) => {
  list.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) option.focus();
 };
 const options = [...select.options].map(option => {
  const item = document.createElement("button");
  item.type = "button";
  item.setAttribute("role", "option");
  item.tabIndex = -1;
  item.textContent = option.text;
  item.onclick = () => {
   select.value = option.value;
   select.dispatchEvent(new Event("change"));
   paint();
   setOpen(false);
   button.focus();
  };
  list.append(item);
  return item;
 });
 function paint() {
  const index = select.selectedIndex;
  button.firstChild.textContent = select.options[index]?.text || "";
  options.forEach((option, i) => option.setAttribute("aria-selected", String(i === index)));
 }
 paint();
 setOpen(false);
 button.onclick = () => setOpen(list.hidden, options[Math.max(0, select.selectedIndex)]);
 wrapper.addEventListener("focusout", event => {
  if (!wrapper.contains(event.relatedTarget)) setOpen(false);
 });
 wrapper.addEventListener("keydown", event => {
  const index = options.indexOf(document.activeElement);
  if (event.key === "Escape" && !list.hidden) {
   event.preventDefault();
   event.stopPropagation();
   setOpen(false);
   button.focus();
  }
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  event.preventDefault();
  const next = index === -1 ? Math.max(0, select.selectedIndex) : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
  setOpen(true, options[next]);
 });
}
["sFont", "sDaily", "sGoal"].forEach(id => enhanceSelect($(id)));

/* ---------- Konto per ID: vorübergehend deaktiviert (ID_ON=false) ---------- */
const ID_ON=false;
const AL="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newId(){const a=new Uint8Array(31);crypto.getRandomValues(a);let o="#";a.forEach(b=>{o+=AL[b%32]});return o}
const normId=v=>{const x=(v||"").toUpperCase().replace(/[^A-Z0-9]/g,"");return x.length===31&&[...x].every(c=>AL.includes(c))?"#"+x:""};
const maskId=id=>"#"+"*".repeat(id.length-1);
let A=null,idShow=false;
const saveA=()=>{store.s("tippoAuth",A);return idb("cfg","readwrite",s=>s.put(A,"auth")).catch(()=>{})};
async function authInit(){
 if(!ID_ON)return false;
 A=store.g("tippoAuth",null);
 if(!A||!normId(A.id)){try{const r=await idb("cfg","readonly",s=>s.get("auth"));if(r&&normId(r.id))A=r}catch(e){}}
 let fresh=false;if(!A||!normId(A.id)){A={id:newId(),dev:newId().slice(1,12),made:Date.now(),ack:false};fresh=true}
 await saveA();$("bAcc").hidden=false;return fresh}
function paintId(){$("idBox").textContent=idShow?A.id:maskId(A.id);$("idEye").textContent=idShow?"Verbergen":"Anzeigen"}
function showId(msg,auto){if(!ID_ON||!A)return;$("idW").textContent=msg||"Das ist deine persönliche ID.";idShow=false;paintId();$("idS").textContent="";if(!$("idd").open)$("idd").showModal();if(auto)copyId(true)}
async function copyId(quiet){try{await navigator.clipboard.writeText(A.id);$("idS").textContent="ID in die Zwischenablage kopiert.";return true}catch(e){}
 if(!quiet)$("idS").textContent="Kopieren ging nicht automatisch.";return false}
let svT;function onSaved(){if(!ID_ON||!A||A.ack)return;clearTimeout(svT);svT=setTimeout(()=>{if(!$("idd").open&&!$("rsd").open)showId("Gespeichert. Kopiere deine ID und lade die ZIP-Sicherung herunter.",true)},500)}
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=t[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0}})();
function zip(files){
 const enc=new TextEncoder(),now=new Date(),tm=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1),dt=((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate(),parts=[],cen=[];let off=0;
 for(const f of files){const nm=enc.encode(f.n),crc=CRC(f.d),h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(10,tm,true);h.setUint16(12,dt,true);h.setUint32(14,crc,true);h.setUint32(18,f.d.length,true);h.setUint32(22,f.d.length,true);h.setUint16(26,nm.length,true);
  parts.push(new Uint8Array(h.buffer),nm,f.d);
  const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(12,tm,true);c.setUint16(14,dt,true);c.setUint32(16,crc,true);c.setUint32(20,f.d.length,true);c.setUint32(24,f.d.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
  cen.push(new Uint8Array(c.buffer),nm);off+=30+nm.length+f.d.length}
 let cl=0;cen.forEach(x=>cl+=x.length);
 const e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cl,true);e.setUint32(16,off,true);
 return new Blob([...parts,...cen,new Uint8Array(e.buffer)],{type:"application/zip"})}
function unzip(buf){const v=new DataView(buf),u=new Uint8Array(buf),dec=new TextDecoder(),o={};let p=0;
 while(p+30<=u.length&&v.getUint32(p,true)===0x04034b50){const fl=v.getUint16(p+6,true),me=v.getUint16(p+8,true),cs=v.getUint32(p+18,true),nl=v.getUint16(p+26,true),el=v.getUint16(p+28,true);
  if(me!==0||(fl&8))throw new Error("zip");const nm=dec.decode(u.subarray(p+30,p+30+nl)),st=p+30+nl+el;o[nm]=u.slice(st,st+cs);p=st+cs}
 return o}
const safeN=n=>n.replace(/[\\/:*?"<>|]/g,"_");
async function pack(){
 const def=new Set([...DEF,...FIN].map(x=>x[0]+".txt")),tx={},gs={},enc=new TextEncoder();
 for(const n of await listT())if(!def.has(n))tx[n]=await getT(n);
 for(const n of await listG())gs[n]=await getG(n);
 const data={app:"tippo",v:1,id:A.id,made:new Date().toISOString(),C,P,texts:tx,saved:gs};
 const info="Tippo – deine ID\r\n\r\n"+A.id+"\r\n\r\nGib ID und ZIP nicht weiter.\r\n";
 const files=[{n:"Tippo-ID.txt",d:enc.encode("\ufeff"+info)},{n:"Tippo-Daten.json",d:enc.encode(JSON.stringify(data))}];
 for(const n in tx)files.push({n:"Texte/"+safeN(n),d:enc.encode("\ufeff"+tx[n])});
 for(const n in gs)files.push({n:"Gesichert/"+safeN(n),d:enc.encode("\ufeff"+gs[n])});
 return zip(files)}
$("bAcc").onclick=()=>showId();
$("idCopy").onclick=()=>copyId(false);$("idEye").onclick=()=>{idShow=!idShow;paintId()};
$("idZip").onclick=async()=>{try{dl(await pack(),"Tippo-ID-"+day()+".zip");$("idS").textContent="ZIP-Sicherung wird heruntergeladen."}catch(e){$("idS").textContent="Die ZIP konnte nicht erstellt werden."}};
$("idOk").onclick=()=>{A.ack=true;saveA();$("idd").close()};
$("idRest").onclick=()=>{$("idd").close();$("rsE").textContent="";$("rsd").showModal()};
$("idNew").onclick=()=>{if(!confirm("Neue ID erzeugen? Deine Daten bleiben auf diesem Gerät."))return;A={...A,id:newId(),made:Date.now(),ack:false};saveA();idShow=false;paintId();$("idS").textContent="Neue ID erzeugt. Bitte kopieren und sichern.";home()};
$("rsX").onclick=()=>$("rsd").close();
$("rsGo").onclick=async()=>{
 const er=$("rsE"),raw=$("rsId").value.trim(),id=normId(raw),f=$("rsF").files[0];er.textContent="";
 if(raw&&!id){er.textContent="Die ID ist ungültig.";return}
 if(!f){if(id&&A&&id===A.id){$("rsd").close();return}er.textContent="Wähle bitte auch die ZIP-Sicherung aus.";return}
 let d;try{const z=unzip(await f.arrayBuffer());d=JSON.parse(new TextDecoder().decode(z["Tippo-Daten.json"]));if(d.app!=="tippo"||!normId(d.id))throw 0}catch(e){er.textContent="Diese Datei ist keine gültige Tippo-Sicherung.";return}
 if(id&&id!==d.id){er.textContent="Die ID passt nicht zu dieser Sicherung.";return}
 if(!confirm("Texte und Ergebnisse auf diesem Gerät werden durch die Sicherung ersetzt. Fortfahren?"))return;
 try{store.s("tippoC",d.C||{});store.s("tippoP",d.P||{});
  for(const n in d.texts||{})await putT0(n,d.texts[n]);
  for(const n in d.saved||{}){if(GD)await fsWrite(GD,n,d.saved[n]);else await idb("ges","readwrite",s=>s.put(d.saved[n],n))}
  A={id:d.id,dev:(A&&A.dev)||"",made:Date.now(),ack:true};await saveA();location.reload()}
 catch(e){er.textContent="Die Sicherung konnte nicht geladen werden: "+e.message}};

/* ---------- Start ---------- */
(async()=>{apply();const fresh=await authInit();try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
 try{const h=await idb("cfg","readonly",s=>s.get("root"));if(h&&await h.queryPermission({mode:"readwrite"})==="granted")await connect(h)}catch(e){}
 try { await seed(); await refresh(); } catch {
  T = [...DEF, ...FIN].map(([label, t]) => { const n = label + ".txt"; const [g, l] = grp(n); return {n, g, l, t, len: t.length}; });
  pick(T.some(item => item.n === C.last) ? C.last : T[0].n);
  toast("Browserspeicher nicht verfügbar. Du kannst mit den Standardtexten üben.");
 }
 if(fresh&&ID_ON)showId("Willkommen bei Tippo! Das ist deine persönliche ID.",true)})();
