---
title: Intro till Amazons molntjänster
layout: blogg
category: drift
author: alexander
realDate: 2013-07-23
backgroundImage: "http://tekniken.nu/uploads/635075927174415514-image001.png"
intro: "AWS OpsWorks ger dig kontroll över apparna i molnet"
---


## Vad är AWS OpsWorks?

OpsWorks är en ny del av Amazon Web Services. Det ingår i alla AWS-konton och har samma kostnadsmodell som Amazons traditionella molntjänster, alltså att man betalar för de resurser man faktiskt använder. Kortfattat kan man beskriva OpsWorks som ett nytt sätt att administrera sina serverinstanser i molnet. Innan man skapar serverinstanser skapar man s.k. Layers som fungerar som mallar, har man en applikation som körs på en instans och önskar skala upp den kan man då enkelt lägga till nya instanser som ärver inställningarna för ett Layer.

De applikationer man vill köra&nbsp; i OpsWorks kan man enkelt konfigurera och installera från kontrollpanelen. OpsWorks kan hämta både källkod och zip-filer som man med några enkla knapptryck installerar och kör igång på en eller flera instanser samtidigt. Detta gör det lätt att både sätta upp nya och att lägga till instanser på befintliga&nbsp; applikationer, dessutom är det lätt att se när man senast gjort uppdateringar.

Nedanför utgår jag från ett litet exempel där jag har en statisk webb som jag kör på en instans, samt ett backend i nodejs som kör på en annan instans. Dessa har jag satt upp i var sitt Layer under en och samma Stack.

## Stacks och Layers

En Stack används för att gruppera EC2-instanser rent administrativt, t.ex. skapar man en stack för webb- och databasserver som tillsammans utgör en hel webbsite.

Inuti en Stack skapar man ett eller flera Layers. Dessa fungerar som mallar för den eller de instanser man vill köra. Om man som i mitt exempel har en applikation som består av en webb och ett API som kör NodeJS kan det se ut såhär:

[![](http://tekniken.nu/uploads/635075927174415514-image001.png)](http://tekniken.nu/uploads/635075927174415514-image001.png)

Varje Layer har egna inställningar för nätverk, säkerhet, lastbalansering m.m. och har minst en instans under sig. Om t.ex. webbservern skulle behöva skalas upp kan jag enkelt skapa en ny instans under detta layer som direkt har samma inställningar och setup som den första.

## Apps

OpsWorks kan ladda ner källkod från t.ex. ett Git-repository eller ett arkiv och deploya den på önskade instanser. Vill man t.ex. snabbt få upp en proof-of-concept är det väldigt enkelt att starta upp en instans, peka ut sin källkod och låta OpsWorks ladda ner och köra igång appen. I många fall vill eller kan man inte låta källkoden vara tillgänglig utifrån, då passar det bra att istället bygga och zippa en release som man låter OpsWork hämta och deploya.

[![](http://tekniken.nu/uploads/635075927174454574-image002.png)](http://tekniken.nu/uploads/635075927174454574-image002.png)

I dagsläget finns det stöd för Subversion, Git, S3-arkiv och zip-filer som hämtas över http/https.

[![](http://tekniken.nu/uploads/635075927174464339-image003.png)](http://tekniken.nu/uploads/635075927174464339-image003.png)

## Deployments

Från OpsWorks kan man göra deployer, eller utföra kommandon, på en eller flera instanser i taget. De typer av appar som stöds direkt är Ruby on Rails, PHP, Node.JS eller statiska webbar. Med lite handpåläggning kan man även få andra typer av appar att fungera. Det går att skapa Chef-script/recipes som man kan köra på en eller flera instanser samtidigt på samma sätt som vid deploy.

Bilderna nedan visar hur det ser ut när jag vill utföra en Deploy av min nodejs-server. Här kan jag välja vilken eller vilka instanser som berörs.

[![](http://tekniken.nu/uploads/635075927174474104-image004.png)](http://tekniken.nu/uploads/635075927174474104-image004.png)

[![](http://tekniken.nu/uploads/635075927174483869-image005.png)](http://tekniken.nu/uploads/635075927174483869-image005.png)

## Läs mer

AWS OpsWorks: [http://aws.amazon.com/opsworks/](http://aws.amazon.com/opsworks/)

Chef: [http://docs.opscode.com/](http://docs.opscode.com/)

