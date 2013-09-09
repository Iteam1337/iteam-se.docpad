---
title: Testa ditt Web API med RestSharp
layout: blogg
category: utveckling
author: martin
realDate: 2013-02-04
backgroundImage: "http://tekniken.nu/uploads/634939317528614697-image001.jpg"
intro: "RestSharp är, som namnet kanske avslöjar, ett verktyg för att skriva automatiska tester mot REST-tjänster i C#. Vi har testat det! Så här kommer du igång."
---


Jag satt för ett tag sedan med uppgiften att skriva automatiserade tester av ett REST-API byggt med MS Web API. Eftersom Visual Studio var vår utvecklingsmiljö och vi hade Continous Integration med tester på plats i TFSen tänkte jag att jag skulle använda inbyggda MSTest och inte blanda in en best som till exempel SoapUI.

Jag började glad i hågen koda och skapade min testklass. Ok, hur konsumerar jag REST-tjänster från C#? Googlande gav mig den här artikeln [http://johnnycode.com/2012/02/23/consuming-your-own-asp-net-web-api-rest-service/](http://johnnycode.com/2012/02/23/consuming-your-own-asp-net-web-api-rest-service/). Hmm… det var mycket kod, någon borde ha gjort det här redan. Lite mer letande efter REST-klienter gav mig lite olika kandidater men valet föll till slut på [https://github.com/restsharp/RestSharp](https://github.com/restsharp/RestSharp) som finns som NuGet-paket.

RestSharp ger massor av fina funktioner för att wrappa all kod kring HttpClient, endpoints m.m. Nu kan jag skriva ett test med bara några få rader.

