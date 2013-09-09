---
title: Testa din express-app med Mocha
layout: blogg
category: utveckling
author: alexander
realDate: 2013-09-03
backgroundImage: "http://tekniken.nu/uploads/635100331631179867-image002.png"
intro: "Oavsett hur mycket eller lite du jobbat med NodeJS är det både viktigt och praktiskt att testa din kod. Läs vidare för att lära dig grunderna om testramverket Mocha"
---


Nodejs blir allmer populärt och allteftersom det dyker upp fler och fler moduler kan man komma igång väldigt snabbt när man bygger många typer av applikationer. Som webbutvecklare har jag intresserat mig för expressjs ([http://expressjs.com](http://expressjs.com)), som utökar nodejs med ett HTTP-ramverk. Express passar t.ex. väldigt bra om man vill bygga ett enkelt och snabbt API, man kommer igång väldigt fort och det är lite kod som behöver skrivas utöver den affärslogik man vill implementera.

&nbsp;

Vill man skriva enhetstester till sin kod kan man använda sig av node-modulen Mocha ([http://visionmedia.github.io/mocha/](http://visionmedia.github.io/mocha/)). Mocha är snyggt och prydligt och låter dig använda olika moduler för assertions, alltså det som drar slutsatsen om huruvida ett test går genom eller inte. En sådan modul man kan använda heter should ([https://github.com/visionmedia/should.js/](https://github.com/visionmedia/should.js/)). Använder man should blir testkoden mycket läsbar, något man ofta vill om man arbetar enligt tankesättet BDD (Business Driven Development) eller om det är människor av olika roll, inte bara utvecklare, som ska förstå sig på och köra testerna.

Skriva tester i Mocha

I exemplet nedan har jag en HTTP-metod på sökvägen /beverages/list som returnerar en lista med drycker i JSON-format. Express-koden för det ser ut som på följande bild. Varje express-metod deklarerar en sökväg och en funktion som tar emot request- och response-objekten för HTTP-anropet. I metoden deklarerar jag min lista med drycker och stoppar in i response-objektet, därefter avslutar jag response med status 200 (vilket också är default).

[![](http://tekniken.nu/uploads/635100331631179867-image002.png)](http://tekniken.nu/uploads/635100331631179867-image002.png)

Eftersom detta är en GET-request kan jag testa den enkelt i min webbläsare.

[![](http://tekniken.nu/uploads/635100331631277517-image001.png)](http://tekniken.nu/uploads/635100331631277517-image001.png)

Jag har också skrivit ett enhetstest som gör detta åt mig. I Mocha grupperar man test med describe, följt av ett namn och en funktion inuti vilken man skriver sina test. Varje test börjar med it följt av en beskrivning och en funktion som kör själva testkoden. I mitt exempel nedan vill jag alltså testa att min egna modul “BeverageHandler” kan lista tillgängliga drycker. Testet får då den snygga beskrivningen “BeverageHandler can list available beverages”. Tack vare modulen should blir den avgörande koden också enkel och prydlig – “res.should.have.status(200)”.

[![](http://tekniken.nu/uploads/635100331631287282-image003.png)](http://tekniken.nu/uploads/635100331631287282-image003.png)

Plockar man ut res.body får man själva listan med drycker. För att demonstrera har jag lagt till två assertions till som tittar på detta, en med should och en med modulen assert ([http://nodejs.org/api/assert.html](http://nodejs.org/api/assert.html)).

[![](http://tekniken.nu/uploads/635100331631297047-image004.png)](http://tekniken.nu/uploads/635100331631297047-image004.png)

Hur man kör Mocha

Nu när vi har ett test på plats är det dags att köra Mocha! I mitt exempel nedan visar jag hur det fungerar via terminalen i Mac OS och linux. Du kan ladda ner mitt exempel-projekt på GitHub här om du inte har något eget: [https://github.com/ZenDeveloper/nodejs-express-example](https://github.com/ZenDeveloper/nodejs-express-example) Om du har nodejs installerat kan du köra igång det direkt, ta gärna en stund och bekanta dig med koden först. När du kör igång express-appen kan det se ut såhär.

[![](http://tekniken.nu/uploads/635100331631306812-image005.png)](http://tekniken.nu/uploads/635100331631306812-image005.png)

Installerar du Mocha globalt (med npm install –g mocha) bör det hamna i din PATH så att du kan köra det genom att skriva mocha rätt upp-och-ner. Installerar du det lokalt för ditt projekt bör du först gå till projektets mapp. Därefter kan du köra ./node-modules/mocha/bin/mocha test/

Mocha har några olika s.k. “reporters”. Jag tycker om den som heter “spec” som visar en lista med alla test. Man väljer reportern spec med flaggan –reporter spec. I bilden nedan körs mitt test och det blir en fin grön bock som indikerar att det gått bra.

[![](http://tekniken.nu/uploads/635100331631316577-image006.png)](http://tekniken.nu/uploads/635100331631316577-image006.png)

Du kan läsa mer om vilka reporters som finns här:[http://visionmedia.github.io/mocha/#reporters](http://visionmedia.github.io/mocha/#reporters) och det finns mycket annat som Mocha klarar. T.ex. kan man generera rapporter på “code coverage” som visar hur mycket av ens kod som täcks utav test. Det är en siffra att ta med en nypa salt eftersom det ofta krävs en människa för att avgöra hur mycket värde ett enskilt test verkligen tillför, men kan samtidigt vara en värdefull fingervisning.

