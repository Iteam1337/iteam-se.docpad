---
title: Att jobba hos oss
layout: job
pageOrder: 2
topImage: ""
backgroundDark: true
summary: >

  # Johanna Grahn Gustafsson
är vår Utvecklingschef & Webbutvecklare.
Hennes dagar går ut på att
Johanna kodar bäst i

# Rickard Laurin
är en av våra Frontendutvecklare.
Hans dagar går ut på att
Rickard kodar bäst i

# Maria Sölscher
är vår Projektledare.
Hennes dagar går ut på att
Maria jobbar som bäst när

# Rasmus Fredriksson
är en av våra Seniora Supporttekniker.
Hans dagar går ut på att
Rasmus utvecklas mest när han 

# Anders Bornholm
är en av våra Technical Creative Directors.
Hans dagar går ut på att
Anders kodar bäst i



    #opportunities.span5.offset1
      h2 Just nu söker vi
      ul
        each career in getCollection('ledigatjanster').toJSON()
          if !!career.title
            li
              a.title(href=career.url)= career.title + ' »'
              p!= career.summary