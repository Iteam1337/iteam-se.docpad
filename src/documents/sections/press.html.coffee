---
title: Press
layout: page
pageOrder: 11
---

entries = (@feedr.feeds.mynewsdesk.channel.item or [])
if entries.length isnt 0 then ul ->
  for entry in entries
    li datetime: entry.pubDate, ->
      a href: entry.link, target:"_blank", ->
        entry.title
      p ->
        entry.description
