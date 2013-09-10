---
title: Ta kontroll över dina loggar
layout: blogg
category: drift
author: christian
realDate: 2013-05-10
backgroundImage: "http://tekniken.nu/uploads/635037795770493918-graphs-dashboard.png"
intro: "För att ta kontroll på appar som har workers och delkomponenter som ska övervakas är det väldigt bra att använda någon sorts loghantering, det finns en del att välja på."
---


För att ta kontroll på appar som har workers och delkomponenter som ska övervakas är det väldigt bra att använda någon sorts loghantering, det finns en del att välja på. Jag har utvärderat logentries och papertrail. Det finns även open-source verktyg som man installerar inhouse som ger riktigt bra kontroll men kräver med installationssteg för att komma igång - kolla in logstash&nbsp;[http://logstash.net](http://logstash.net) om du inte vill lägga loghanteringen i molnet.
Så här ser logentries ut (se bild).
Så här ser logentries ut när man är i realtidsläge:
[http://cl.ly/image/2b2w1Z1P3J1D](http://cl.ly/image/2b2w1Z1P3J1D)

Lite andra vyer:&nbsp;[http://cl.ly/image/3J0S3k2m1411](http://cl.ly/image/3J0S3k2m1411)
Bra är att man kan sätta upp alerts på logfel:&nbsp;[http://cl.ly/image/2N2A130N1k11](http://cl.ly/image/2N2A130N1k11)
Men att man också kan sätta nivåer för hur ofta mailen skickas:&nbsp;[http://cl.ly/image/2j2G1F1G4439](http://cl.ly/image/2j2G1F1G4439)
Det går också att snabbt zooma in i loggarna med hjälp av tidslinjen:
Att sätta upp konto är gratis och inkluderar rätt mycket data i månaden. Enklast är att köra deras agenter för Windows eller Linux som då loggar alla console.log och fel i systemloggar osv automatiskt. Vill man köra detaljerad loggning specifikt i node kan man installera deras node-paket:
[https://logentries.com/doc/nodejs/](https://logentries.com/doc/nodejs/)
Finns även i en .NET version på nuget:&nbsp;[https://logentries.com/doc/dotnet/](https://logentries.com/doc/dotnet/)

