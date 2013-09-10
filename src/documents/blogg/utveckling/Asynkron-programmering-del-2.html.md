---
title: Asynkron programmering del 2
layout: blogg
category: utveckling
author: christian
realDate: 2012-09-03
backgroundImage: "http://tekniken.nu/uploads/juggle.jpg"
intro: "En av de stora anledningarna till att Javascript har fått en nyrenässans de senaste åren är på grund av dess möjlighet att skicka funktioner som objekt. Detta möjliggör ett väldigt smidigt sätt att skriva asynkron kod. "
---


En av de stora anledningarna till att Javascript har fått en nyrenässans de senaste åren är på grund av dess möjlighet att skicka funktioner som objekt. Detta möjliggör ett väldigt smidigt sätt att skriva asynkron kod. Istället för att vänta på att resultatet från ett databasanrop ska bli klart kan man skapa en anonym funktion som tar hand om resultatet och under tiden kan resten av koden köras klart.

Tänk på följande kodsnuttar:

