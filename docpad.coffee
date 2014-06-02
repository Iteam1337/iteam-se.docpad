# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig =

  # Template Data
  # =============
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

  templateData:

    # Expose package info
    pkg: require process.cwd() + "/package.json"

    # Specify some site properties
    site:
      # The production url of our website
      url: "http://iteam.se"

      # The default title of our website
      title: "Iteam.se"

      # The website description (for SEO)
      description: """
        Iteam är en teknikbyrå i Stockholm. Genom att erbjuda goda råd, teknisk spjutspets och driftexpertis förverkligar vi din dröm Tillsammans med oss kan du få uppleva värdet av hög kvalitet, service och innovation. Vi utvecklar smarta webblösningar som t ex communities, e-handel och intranät.
        """

      # The website keywords (for SEO) separated by commas
      keywords: """
        iteam, iteamsolutions, iteam solutions, rådgivning, lead tech, proof-of-concept, entreprenörsrådgivning, systemutveckling, scrum, agil utveckling, systemdevelopment, agile, scrum-metodik, utvecklingsteam,.net, dotnet, nodejs, bootstrap, nosql, mongodb, angular, angularjs, git, github, tfs, drift & support, operations, devops, IT-review, specialist- och projektstöd, hyr en IT-avdelning, systemförvaltning, arkitektur & infrastruktur, säkerhetsreview

        """

      # The website author's name
      author: "Iteam Solutions AB"

      # The website author's email
      email: "info@iteam.se"

      # Your company's name
      copyright: "© Iteam Solutions AB 2013"


    # Helper Functions
    # ----------------

    # Get the prepared site/document title
    # Often we would like to specify particular formatting to our page's title
    # we can apply that formatting here
    getPreparedTitle: ->
      # if we have a document title, then we should use that and suffix the site's title onto it
      if @document.title
        "#{@document.title} | #{@site.title}"
      # if our document does not have it's own title, then we should just use the site's title
      else
        @site.title

    # Get the prepared site/document description
    getPreparedDescription: ->
      # if we have a document description, then we should use that, otherwise use the site's description
      @document.description or @site.description

    # Get the prepared site/document keywords
    getPreparedKeywords: ->
      # Merge the document keywords with the site keywords
      @site.keywords.concat(@document.keywords or []).join ', '

    getGravatarUrl: (size=false, doc=@document) ->
      hash = require('crypto').createHash('md5').update(doc.email).digest('hex')
      url = "http://www.gravatar.com/avatar/#{hash}.jpg"
      if size then url += "?s=#{size}"
      return url

    capitalizeFirstChar: (str="") ->
      composed = str.charAt(0).toUpperCase() + str.slice 1
      return composed

    getMetadataFrom: (page, section="vara-tjanster") ->
      if !page or typeof section is not "string" then return
      queryObject = {
        relativeOutDirPath: section,
        dontIndexInAnyCollection: {
          $exists: false
        },
        tags: {
          $in: [
            page
          ]
        }
      }
      return @getCollection("documents").findOne(queryObject)?.toJSON()

    topImage: (page=@document) ->
      return if page.topImage then "background-image:url(" + page.topImage + ")" else ""

    singlePageCase: () ->
      base = @document.url.split("/")
      slug = @document.slug
      onCase = base[1] is "case" and slug isnt "case-index"
      return if onCase then "single-case" else ""

    getAllCasesByCoworker: (coworker="", max=6) ->
      casesArray = []
      for data, i in @getCollection('case')?.toJSON()
        if data.team then for member, j in data.team
          if member is coworker then casesArray.push data
      return casesArray.slice 0, max

    toDateString: (date=@document.date, short=false) ->
      month = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"]
      month_abbr = ["Jan","Febr","Mars","Apr","Maj","Juni","Juli","Aug","Sept","Okt","Nov","Dec"]
      day = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"]
      day_abbr = ["Sön","Mån","Tis","Ons","Tors","Fre","Lör"]
      d = new Date(date)

      if short
        return "#{day_abbr[d.getDay()]} #{d.getDate()} #{month_abbr[d.getMonth()]}, #{(d.getFullYear()).substr(2, 2)}"
      else
        return "#{day[d.getDay()]} #{d.getDate()} #{month[d.getMonth()]}, #{d.getFullYear()}"

    getShowCase: (max) ->
      casesArray = []

      max = max or 4
      for data, i in @getCollection('showcase')?.toJSON()
        casesArray.push data
        i++
        if i is max then break
      return casesArray

    fromMarkdown: (markdownString) ->
      mardown = require("markdown").markdown
      return mardown.toHTML(markdownString)


  plugins:
    ## skips the .html extension by adding a folder and index.html and creates a redirect html
    cleanurls:
          trailingSlashes: true
    grunt:
      writeAfter: false
      generateAfter: ["stylus", "cssmin", "concat"]

  # Collections
  # ===========
  # These are special collections that our website makes available to us
  collections:
    # http://docs.mongodb.org/manual/reference/operator/ <- great reference for nosql-query
    #
    # This is the main collection, for index:es
    sektion: (database) ->
      database.findAllLive({pageIndex: $exists: true}, [pageIndex:1,title:1])

    # Collection of all cases
    case: (database) ->
      database.findAllLive({relativeOutDirPath:'case', dontIndexInAnyCollection: {$exists: false}},[releaseDate:-1, title:1])

    showcase: (database) ->
      database.findAllLive({relativeOutDirPath:'case', caseIndex: {$lte: 4}, dontIndexInAnyCollection: {$exists: false} }, [caseIndex:1, title:1])

    # Collection of all feedback-posts}
    feedback: (database) ->
      database.findAllLive({relativeOutDirPath:'feedback', dontIndexInAnyCollection: $exists: false},[pageOrder:1])

    # Collection of a coworkers
    medarbetare: (database) ->
      database.findAllLive({relativeOutDirPath:'medarbetare', dontIndexInAnyCollection: $exists: false},[filename:1])

    # Collection of all available positions
    ledigatjanster: (database) ->
      database.findAllLive({relativeOutDirPath:'karriar', dontIndexInAnyCollection: $exists: false},[pageOrder:1])

    # All of our services
    tjanster: (database) ->
      database.findAllLive({relativeOutDirPath:'vara-tjanster', dontIndexInAnyCollection: $exists: false},[pageOrder:1])

    # A collection of information about us
    om: (database) ->
      database.findAllLive({relativeOutDirPath:'om-oss', dontIndexInAnyCollection: $exists: false},[pageOrder:1])

    # =======================
    # not _really_ in use
    # =======================
    operations: (database) ->
      database.findAllLive({relativeOutDirPath:'operations', dontIndexInAnyCollection: $exists: false},[pageOrder:1])

  # =================================
  # Plugin Configuration
  #plugins:

  # Out Path
  # Where should we put our generated website files?
  # If it is a relative path, it will have the resolved `rootPath` prepended to it
  outPath: "./out"


  # Ignore Paths
  # Can be set to an array of absolute paths that we should ignore from the scanning process
  ignorePaths: [
    "files/jade_includes",
    "files/scripts"
  ]


  # DocPad Events
  # =============

  # Here we can define handlers for events that DocPad fires
  # You can find a full listing of events on the DocPad Wiki
  events:

    # Server Extend
    # Used to add our own custom routes to the server before the docpad routes are added
    serverExtend: (opts) ->
      # Extract the server from the options
      {server} = opts
      docpad = @docpad

      # As we are now running in an event,
      # ensure we are using the latest copy of the docpad configuraiton
      # and fetch our urls from it
      latestConfig = docpad.getConfig()

# Export our DocPad Configuration
module.exports = docpadConfig
