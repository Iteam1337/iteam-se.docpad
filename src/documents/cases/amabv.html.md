---
title: Svensk Byggtjänsts AMA Beskrivningsverktyg
layout: case
tags: ['Systemutveckling']
images: ['sb-amabv1.jpg']
imagePos: ['right']
imageGallery: ['sb-amabv1.jpg']
team: ['anders','johanna','hans','christian','mats']
intro: Vi utvecklade AMA Beskrivningsverktyg för ett effektivare byggverige. Design och formgivning tillsammans med byråpartnern Britny.
siteurl: http://amabv.byggtjanst.se/Account/Logon
twitterTag: [ '#svenskbyggtjanst', '#svb' ]
---

### Google Docs-liknande beskrivningsverktyg för byggsverige
Att driva ett byggprojekt är en komplicerad uppgift, och handlar det inte om en hemmarenovering utan ett helt bostadsområde eller en tågtunnel under Stockholm så inser man att ett sätt att verktyg för att hantera kravspecifikationer och projektledning är absolut nödvändigt. Verktyget finns redan, det heter AMA. AMA är ursprungligen en bok med standardiserade beskrivningar av alla olika moment och byggdelar som kan förekomma i ett byggprojekt. Som ett led i att göra AMA mer tillgängligt och lättare än någonsin att använda gav Svensk Byggtjänst Iteam uppdraget att utveckla det till ett webbaserat verktyg.

AMA beskrivningsverktyg är ett Google Docs-liknande verktyg där användarna i webbläsaren sätter ihop sin byggbeskrivning genom att välja specifikationskoder, och får ett skräddarsytt dokument som är grunden för en färdig specifikation. Till koderna finns informationstext från de olika AMA-utgåvorna, allmänna råd kring det specifika momentet eller materialet och färdiga texter där man bara behöver fylla i specifika mått eller värden för det egna projektet. När beskrivningen är klar exporterar man den enkelt med ett klick till färdig byggbeskrivning i Word- och Excel-format.

### Modern användarvänlig teknik
AMA beskrivningsverktyg är byggd på moderna tekniker så som Ext JS 4, Episerver CMS 6 R2 och Microsoft MVC. Inbyggt finns användarvänliga funktioner för innehållsredigering och systemet är optimerat för hastighet eftersom endast den information som behövs laddas in vid rätt tillfälle med hjälp av AJAX. Tillsammans utgör det avancerade gränssnittet och en backend byggd med EPiServer en lättanvänd applikation där man som användare aldrig behöver vara rädd för att tappa ändringar. Man kan mitt i arbetet stänga ett dokument och fortsätta med det senare på valfri dator med internetuppkoppling. Att arbeta flera personer från olika datorer samtidigt i samma byggbeskrivning är något som verktyget redan från början designats för, eftersom detta ofta är en förutsättning under specifikation av komplicerade projekt.