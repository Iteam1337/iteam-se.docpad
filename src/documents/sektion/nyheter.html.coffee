---
title: Nyheter
layout: page
pageOrder: 11
---

formatDate = (datestring) ->
  weeksdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
  months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

  newdate = new Date(datestring)
  year = newdate.getFullYear()
  month = months[newdate.getMonth()]
  weekday = weeksdays[newdate.getDay()]
  day = newdate.getDate()

  return weekday + ' ' + day + ' ' + month + ' ' + year

getClass = (id) ->
  if id.indexOf('git') > -1
    return 'git'

entries = (@feedr.feeds.iteam?.entry or [])
if entries.length isnt 0 then ul class: "press" , ->
  for entry in entries
    li datetime: entry.updated, class: getClass(entry.id), ->
      div class: "post-date", ->
        formatDate(entry.updated)
      a class: "post-title", href: entry.link['@'].href, target:"_blank", ->
        entry.title
      p ->
        entry.content['#']