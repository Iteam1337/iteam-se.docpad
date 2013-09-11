---
title: Git-tfs gör att du kan checka in till TFS från Mac och Linux
layout: blogg
category: utveckling
author: christian
realDate: 2012-12-18
backgroundImage: "http://tekniken.nu/uploads/Git-Logo-Black.png"
intro: "Har du någon gång velat jobba mot en TFS-miljö från Mac har du tidigare varit tvungen att checka in dina filer via Bootcamp eller VMWare fusion eller liknande. Numera kan du göra allt direkt från din vanliga terminal."
---


Har du någon gång velat jobba mot en TFS-miljö från Mac har du tidigare varit tvungen att checka in dina filer via Bootcamp eller VMWare fusion eller liknande. Numera kan du göra allt direkt från din vanliga terminal.

Microsoft har släppt en cross-platform klient för TFS. Det är enkelt att installera och funkar bra både i Windows och Mac. Det krävs ingen installation på servern. Det finns två snarlika lösningar som heter precis samma sak så se till att du tar den som är från Microsoft, den fungerar både på Mac och på Windows (märkligt att det inte är tvärtom, Microsoft börjar lära sig ;).

1\. Hämta zip-paketet här:&nbsp;[http://aka.ms/git-tf](http://aka.ms/git-tf)

2\. Packa upp zipfilen i en mapp, t ex /usr/git-tf&nbsp;

3\. Redigera filen .profile som ligger i din hemmapp:
$ cd
$ touch .profile
$ open .profile

4\. Lägg in följande rad
export PATH=”/usr/git-tf/”:$PATH

5\. Testa att du har java installerat. Skriv och följ eventuella instruktioner:
$ java

6\. Starta om terminalen

7\. Nu ska du kunna skriva git tf och få upp följande:
$ git tf
usage: git-tf [--version] [--help] [--quiet|-q|--verbose] [&lt;command...&gt;]
The git-tf commands are:
&nbsp; &nbsp;help &nbsp; &nbsp; &nbsp; Displays usage information
&nbsp; &nbsp;clone &nbsp; &nbsp; &nbsp;Initializes a git repository from a TFS path
&nbsp; &nbsp;configure &nbsp;Configures an existing git repository to add to TFS
&nbsp; &nbsp;checkin &nbsp; &nbsp;Checks in changes to a TFS folder
&nbsp; &nbsp;fetch &nbsp; &nbsp; &nbsp;Fetch the latest code from TFS into FETCH_HEAD
&nbsp; &nbsp;pull &nbsp; &nbsp; &nbsp; Pulls the latest code from TFS and merge/rebase the changes into master
&nbsp; &nbsp;shelve &nbsp; &nbsp; Shelves the changes to a TFS folder
&nbsp; &nbsp;shelvesets Lists the shelvesets available on the server. Provides a way to delete shelvesets
&nbsp; &nbsp;unshelve &nbsp; Unshelves a shelveset from TFS into the repository

8\. Klona ett TFS repo med clone kommandot:
git tf clone http://tfs.iteam.se/tfs/DefaultCollection "$/Customer/Project/trunk"

9\. Nu kan du jobba lokalt och köra commit mot ditt lokala git repo och sen köra git checkin när du vill lägga upp dina ändringar till TFS. Default är att alla dina lokala commits hamnar i samma changeset i TFS men det går att justera genom att lägga till --deep så får du ett changeset per commit.&nbsp;
$ git add .
$ git commit -m "Checked in on MAC with git tf"
[master 19bc7f2] Checked in on MAC with git tf
&nbsp;1 file changed, 0 insertions(+), 0 deletions(-)
&nbsp;rewrite Apps/Narmaste.Bootstrap/Readme.txt (100%)
$ git tf checkin
Username: XXXX
Password: XXXX
Connecting to TFS...
Checking in to $/Customer/Project/trunk: 100%, done. 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Checked commit 19bc7f2 in as changeset 40801

