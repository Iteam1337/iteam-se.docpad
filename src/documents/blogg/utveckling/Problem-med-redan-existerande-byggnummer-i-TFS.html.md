---
title: Problem med redan existerande byggnummer i TFS
layout: blogg
category: utveckling
author: martin
realDate: 2012-11-05
backgroundImage: "http://tekniken.nu/uploads/tfsbuild_destroy_masked.png"
intro: "Om cancellerade byggen och hur du blir av med felmeddelandet \"The build number ‘xxx.1.0.27.0’ already exists for build definition.\"."
---


Efter att ha tagit bort ett misslyckat bygge ur TFS genom att ta bort det ur Build Explorer i Visual Studio fick vi ett problem numreringen av byggena. När vi försökte köra om bygget fick vi felmeddelandet "TF42064: The build number ‘x-stage.xxx.se_1.0.27.0’ already exists for build definition". Efter att ha googlat lite hittade jag [http://geekswithblogs.net/jehan/archive/2011/04/23/tf42064-the-build-number-already-exists-for-build-definition-error.aspx](http://geekswithblogs.net/jehan/archive/2011/04/23/tf42064-the-build-number-already-exists-for-build-definition-error.aspx) om hur man löser problemet.

Problemet beror på att det gamla bygget inte helt raderas från TFS:en. Det ligger kvar information om det. När sedan nästa bygge startar försöker den räkna upp byggnumret och bygga men då finns det redan. Det borttagna bygget ligger och spökar. För att få bort det helt och hållet kan man använda sig av kommandot _tfsbuild destroy_ i Visual Studios command prompt.

tfsbuild destroy /collection:&lt;URL till din collection&gt; /builddefinition:"&lt;Namnet pp byggdefinitionen&gt;" BuildNumber &lt;Byggnumret som du vill ta bort&gt;

När du kör kommandot kommer du få en läskig fråga om du verkligen vill ta bort det permanent. Svara: Yes

Klart.

tfsbuild destroy tar bort det som finns kvar av det gamla borttagna bygget och man kan sedan starta ett nytt bygge.

