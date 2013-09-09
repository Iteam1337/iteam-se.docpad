---
title: SignalR + MailGun för realtidsfeed av inkommande mail
layout: blogg
category: utveckling
author: christian
realDate: 2013-03-04
backgroundImage: "http://tekniken.nu/uploads/634967896715024603-image001.png"
intro: "I C# finns det ett utmärkt bibliotek för att skapa en realtidskommunikation mellan klient och server via WebSockets (med fallback till andra tekniker). Biblioteket heter SignalR och här kommer en liten redogörelse för ett proof of concept vi har gjort där vi kombinerar detta bibliotek med MailGun som är en grym molntjänst för att ta emot email till en applikation."
---


I C# finns det ett utmärkt bibliotek för att skapa en realtidskommunikation mellan klient och server via WebSockets (med fallback till andra tekniker). Biblioteket heter [SignalR](http://nuget.org/packages/signalr) och här kommer en liten redogörelse för ett proof of concept vi har gjort där vi kombinerar detta bibliotek med [MailGun](http://www.mailgun.com/) som är en grym molntjänst för att ta emot email till en applikation.

DEMO: För att testa proof of concept går du till:

[http://mailfeed-1.apphb.com/mail](http://mailfeed-1.apphb.com/mail) (Pröva att skicka ett mail till [info@mailfeed.mailgun.org](mailto:info@mailfeed.mailgun.org)&nbsp;och se hur mailet magiskt kommer upp på skärmen.)

Detta kan vara utmärkt för många saker, bland annat om man ska bygga en omröstningsfunktion, kontrollera mailadresser med aktiveringskod osv osv.

Nedan hittar du ett utdrag från de viktigaste delarna i koden (som du hittar i sin helhet på GitHub: [https://github.com/irony/Mailfeed](https://github.com/irony/Mailfeed))

Först sätter vi upp en MVC route för att ta emot mailet från MailGun

[![](http://tekniken.nu/uploads/634967896715366413-image001.jpg)](http://tekniken.nu/uploads/634967896715366413-image001.jpg)

För att överföra mellan olika delar i systemet använder vi en statisk IObservable

[![](http://tekniken.nu/uploads/634967896715278519-image002.jpg)](http://tekniken.nu/uploads/634967896715278519-image002.jpg)

Sen lyssnar vi på förändringar i denna och synkar till anslutna klienter

Observera att vi i Add metoden anropar en klientfunktion (!):

[![](http://tekniken.nu/uploads/634967896715493371-image003.jpg)](http://tekniken.nu/uploads/634967896715493371-image003.jpg)

Sen tar vi emot all kommunikation på klientsidan:

Här deklareras metoden ”updateInbox” som vi ovan anropar från servern:

[![](http://tekniken.nu/uploads/634967896715620329-image004.png)](http://tekniken.nu/uploads/634967896715620329-image004.png)

