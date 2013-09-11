---
title: MDT: Problem att deploya Windows XP till Dell Latitude E5530?
layout: blogg
category: drift
author: rasmus
realDate: 2012-11-01
backgroundImage: "http://tekniken.nu/uploads/windowsxp.jpg"
intro: "Två tips om du har problem att rulla om Latitude E5530 med Windows XP"
---


Som rubriken lyder upptäckte jag två olika problem när jag skulle rulla om Latitude E5530 med Windows XP.

1.Innan du börjar rulla om dina Latitude E5530, kontrollera datorns korrekta modellbeteckning genom att köra kommandotwmic csproduct get name om du tex använder DriverGroups. I mitt fall var datorns korrekta namnLatitude E5530 non-VPro och inte Latitude E5530, som man skulle kunna tro. Detta gjorde att nästan inga drivrutiner installerades.
2.Drivrutinen för Free Fall Data Protection (st_accel.inf) ställde till problem och hängde omrullningen vid mini-setup. Jag tog bort drivrutinen från minLatitude E5530 non-VPro mapp i Out-of-box Drivers och lyckades då rulla om maskinen utan problem. Efter att omrullningen är klar får man manuellt installera denna drivrutin från Dells hemsida.