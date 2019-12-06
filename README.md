# Übungsaufgabe 01: Datenkompression

Implementieren Sie den Huffman-Algorithmus zur Kompression von 8-Bit Unsigned PCM-Samples. Als Beispiele dienen die Dateien `sv_ttt_min_pcm_u8.wav`, `sv_ttt_full_pcm_u8.wav`, `sv_ttt_noise_pcm_u8.wav`. 

In dieser Vorlage ist bereits das Laden der Audio-Datei, die Auszählung der Symbolwahrscheinlichkeiten und die Speicherung als Binärdatei enthalten (siehe `audioConverter.js`). Ihre Aufgabe ist es den Rumpf der folgenden drei Funktionen in `huffmanEncoder.js` zu implementieren.

- `getTree` (**3 Punkte**)
- `getCodes` (**3 Punkte**)
- `encodeData` (**2 Punkte**)

Die restlichen **2 Punkte** gibt es für allgemeine Code-Qualität.

Die generierte Huffman-Datei kann mit dem beiliegenden Huffman-Decoder getestet werden. Dazu rufen Sie die Datei `test/index.html` auf.

Bitte senden Sie Ihre Lösung als ZIP-Datei an: `julien.letellier@htw-berlin.de` 

Abgabetermin für diese Übungsaufgabe: **30.10.2019 14:00 Uhr**

## Aufbau der Binärdatei

```
|--|---...--|-----------------...
 |      |           |
 |      |           |---> Huffman-codierte Nachricht
 |      |
 |      |---> Variable-length Code (VLC) Header (x Bits)
 |
 |---> Gesamtlänge x in Bits des VLC-Headers (16 Bits)
```

Die ersten 2 Byte (16 bit unsigned integer in big endian) geben die Länge des VLC-Headers an. Anschließend folgen hintereinander jeweils die Symbol-Code-Paare (siehe unten). Nach dem VLC-Header folgt die Nachricht, die mit dem Huffman-Baum codiert wurde.

## Aufbau eines Symbol-Code-Paares

```
|-|-|-...
 | |  |
 | |  |----------------> Binärcode des Symbols (y Bits)
 | |
 | |-------------> Symbol (8 Bit)
 |
 |---------> Länge y in Bits des Codes (8 Bit)
```

## Tipps und nützliche Links

- JavaScript `Array` bietet bereits eine Reihe nützlicher Methoden, z.B. [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- Der Datentyp `Map` eignet sich besonders zur Speicherung von Symbol-Code-Paaren, siehe [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- JavaScript bietet Methoden zur Konvertierung von Zahlen (`number`) in ihre Binärrepräsentation als Zeichenkette (`string`), siehe [toString(radix)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString). Strings können mit [padStart()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) auf eine feste Länge gebraucht werden.
    - So lässt sich beispielsweise mit dem folgenden Befehl die Zahl `1337` als Binärrepräsentation (16 bit unsigned integer in big endian) darstellen: `(1337).toString(2).padStart(16, '0')` Das Ergebnis ist folgender String: `"0000010100111001"`
- Mithilfe von [JSDoc](https://devdocs.io/jsdoc/) können Klassen, Attribute, Methoden, etc. dokumentiert werden. Visual Studio Code versteht diese API standardmäßig und bietet hilfreiche Code-Vervollständigung an.
