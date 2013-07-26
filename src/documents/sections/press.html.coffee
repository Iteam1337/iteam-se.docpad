---
title: Nyheter
layout: page
pageOrder: 11
---

getClass = (id) ->
  if id.indexOf('git') > -1
    return 'git'

entries = (@feedr.feeds.iteam?.entry or [])
if entries.length isnt 0 then ul ->
  for entry in entries
    li datetime: entry.updated, class: getClass(entry.id), ->
      a href: entry.link['@'].href, target:"_blank", ->
        entry.title
      p ->
        entry.content['#']
