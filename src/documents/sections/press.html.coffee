---
title: Nyheter
layout: page
pageOrder: 11
---

entries = (@feedr.feeds.iteam?.entry or [])
if entries.length isnt 0 then ul ->
  for entry in entries
    li datetime: entry.updated, ->
      a href: entry.link['@'].href, target:"_blank", ->
        entry.title
      p ->
        entry.summary
