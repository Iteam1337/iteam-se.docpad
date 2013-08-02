---
title: Blogg
layout: post
pageOrder: 12
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


entries = (@feedr.feeds.blogs?.entry or [])
if entries.length isnt 0 then div class:"blog", ->
  for entry in entries
    section class: "post", datetime: entry.updated, ->
      header ->
        div class:"post-date", ->
          formatDate(entry.updated)
        h2 class: "post-title", ->
          a href: entry.link['@'].href, target:"_blank", ->
            entry.title
      article ->
        entry.content['#']

  # //- each doc in getCollection('blogg').toJSON()
  # //-   section(class="post")
  # //-     header
  # //-       div.date= doc.date.toDateString()
  # //-       a.title(href=doc.url)= doc.title

  # //-     article= doc.intro
