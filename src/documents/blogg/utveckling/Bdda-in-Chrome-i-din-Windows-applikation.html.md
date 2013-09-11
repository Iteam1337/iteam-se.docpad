---
title: Bädda in Chrome i din Windows-applikation
layout: blogg
category: utveckling
author: anders
realDate: 2012-11-07
backgroundImage: "http://tekniken.nu/uploads/634878113954504837-Google_Chrome_logo.png"
intro: "Undvik IE7 och använd Chrome även i din integrerade webbläsare! Med CEF låter du användarna komma åt webbaserade verktyg i en windows-applikation. Så här gör du!"
---


## Varför?

Skälen till att man kan vilja ha en inbäddad webbläsare i sin Windows-applikation är många. Det vanligaste är att man vill integrera en ny funktion eller tjänst som är webbaserad i ett arbetsverktyg som är byggt som Windows-applikation, men med en integrerad känsla som gör att användaren inte behöver öppna en ny webbläsare.

## CEF

I .NET finns en inbyggd komponent för att bädda in en webbläsare i en Windows-applikation. Den heter WebBrowser, men bäddar tyvärr in en IE7, som ju inte erbjuder något större stöd för moderna webbtekniker.

Ett alternativ är att istället bädda in Chrome i applikationen, en modern webbläsare med webbens snabbaste JavaScript-motor. Googles eget ramverk för inbäddning av Chrome i applikationer heter Chromium Embedded Framework, CEF. Det innehåller bara stöd för C och C++. Som tillägg till CEF har tredjepartsutvecklare skapat fristående stöd för andra programspråk, bland annat Java, Python och C#. Det finns flera projekt som utökar CEF med stöd för C#, vår favorit är CefSharp.

Såhär gör man för att använda CefSharp i sin applikation:

### Ladda ner och infoga CEF och CefSharp i projektet

* Ladda ner binärreleasen (Current) av CefSharp från[https://github.com/chillitom/CefSharp](https://github.com/chillitom/CefSharp)
* Öppna projektet för applikationen.
* Kopiera in filerna från CefSharp i projektet. De DLL-filer som heter CefSharp.dll och CefSharp.Winforms.dll ska refereras in i projektet. DLL-filer som inte har namn som börjar på CefSharp ska placeras så att de när projektet byggs hamnar i bin-mappen.
&nbsp;

### Implementera klasserna för den inbäddade webbläsaren

Den inbäddade webbläsaren hanteras via två klasser, en för själva browsermotorn (WebView) och en s.k. presenter för att applikationen ska kunna hantera anrop (Request) och besök (Visit).

Börja med att skapa presentern genom att göra en klass som implementerar interfacen IRequestHandler och ICookieVisitor. I IRequestHandler finns följande metoder:

* OnBeforeBrowse: anropas varje gång användaren klickar på en länk i webbläsaren. Om man vill att applikationen ska göra något annat än att ladda den önskade urlen gör man det här och returnerar true, vilket stoppar laddningen i browsern. Vill man att sidan ska laddas som vanlig i den inbäddade webbläsaren returnernar man false.
* OnBeforeResourceLoad: anropas varje gång en sida ska hämtas. CefSharp innehåller inte nuläget kod för att automatiskt hantera nedladdning av filer på det sätt som en fristående Chrome gör, så här kan man välja att hämta filen i själva applikationen istället med hjälp av .NETs inbyggda klasser för webbkommunikation (t.ex. System.Net.WebClient).
* OnResourceResponse: anropas när en sida har laddats och ska visas i den inbäddade webbläsaren.
I ICookieVisitor finns följande metod:

* Visit: håller reda på besökssessionen, med cookies etc.
I presenter-klassen skapar man metoden Init() som initierar det underliggande CEF-ramverket. Den måste anropas innan instanser av presentern skapas.

### Lägg till webbläsaren i applikationsfönstret

Det finns i nuläget ingen design view-komponent för CefSharp, så man kan inte lägga till webbläsaren via designläget i Visual Studio. Det enklaste är att lägga till en vanlig panel där man vill att webbläsaren ska visas och att sen i koden instantiera och lägga till webbläsaren.

Instantiering går till enligt följande:

* Skapa en WebView-komponent.
* Lägg till komponenten till panelen där den ska visas (enligt ovan)
* Skapa presenter-objektet (ChromiumBrowser i POC) och skicka in WebView-komponenten och applikationsfönstret.
Webbläsaren kommer inte att göra något förrän den visas. Det är viktigt att inte försöka ladda sidor innan webbläsaren har visats för första gången, för att kontrollera detta används WebView.isBrowserInitialized(). Det är lämpligt att i presenter-klassen lägga till en egenskap för URL, och ladda den när WebViewn har initialiserats (d.v.s. visats för första gången) om den inte är initialiserad sen tidigare.

### Vanliga fel

* Om applikationen vid start ger ett Windows-felmeddelande med texten “Could not load requested module” saknas nödvändiga DLL-filer i bin-mappen för applikationen. Modifiera ditt projekt så berörda DLLer från CefSharp kopieras till bin. Det enklaste (men kanske inte strukturmässigt snyggaste) sättet är att lägga DLL-filerna i roten på projektet och markera dem med Build action = Content.
* Om applikationen vid start klagar på saknade DLLer som börjar på ”d3” har datorn en för gammal version av DirectX. Installera nyare version från Microsofts webbplats.
Lycka till!

