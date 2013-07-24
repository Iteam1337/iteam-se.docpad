---
title: Blogg
layout: page
pageOrder: 12
---

entries = (@feedr.feeds.blogs?.entry or [])
if entries.length isnt 0 then div class:"blog", ->
  for entry in entries
    section class: "post", datetime: entry.updated, ->
      header ->
        div class:"date", ->
          entry.updated
        a class: "title", href: entry.link['@'].href, target:"_blank", ->
          entry.title
      article ->
        entry.summary

  # //- each doc in getCollection('posts').toJSON()
  # //-   section(class="post")
  # //-     header
  # //-       div.date= doc.date.toDateString()
  # //-       a.title(href=doc.url)= doc.title

  # //-     article= doc.intro
