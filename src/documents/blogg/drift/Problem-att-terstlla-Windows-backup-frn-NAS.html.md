---
title: Problem att återställa Windows-backup från NAS?
layout: blogg
category: drift
author: rasmus
realDate: 2013-04-05
backgroundImage: "http://tekniken.nu/uploads/rasmus-fredriksson.jpg"
intro: "Har du fått ett kryptiskt fel när du försöker återställa en backup från en NAS? Läs mer här"
---
För ett tag sedan skulle jag återställa en dator efter att hårddisken bytts ut. I detta fall användes Windows egna backup och detta var en Windows 7-dator.

Jag fick dock ganska snabbt problem när jag skulle återställa backupen som låg på en NAS i nätverket. Efter att ha pekat UNC-sökväg och fyllt i användaruppgifter för att kunna komma åt backupen möts jag dock av felkoden: 0x800704CF

I mitt fall betydde detta att jag var tvungen att peka ut drivrutiner för nätverkskortet på datorn. Jag tog hem drivrutinerna på en annan dator och lade dem på ett usb-minne. Efter att ha pekat ut de rätta drivrutinerna kunde jag enkelt återställa den senaste backupen.

Man blir lätt lurad av rutan som vill att du anger användaruppgifterna när du vill ansluta mot din NAS. Jag förutsatte då att nätverket inte alls var orsaken till felet, utan något helt annat.