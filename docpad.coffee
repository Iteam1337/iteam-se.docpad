# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig =

  # Template Data
  # =============
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

  templateData:

    # Specify some site properties
    site:
      # The production url of our website
      url: "http://iteam.se"

      # Here are some old site urls that you would like to redirect from
      oldUrls: [
      ]

      # The default title of our website
      title: "Iteam.se | Vi förverkligar drömmar med teknik"

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
      @site.keywords.concat(@document.keywords or []).join(', ')


  # Collections
  # ===========
  # These are special collections that our website makes available to us

  collections:
    # For instance, this one will fetch in all documents that have pageOrder set within their meta data
    pages: (database) ->
      database.findAllLive({relativeOutDirPath:'sektion', pageOrder: $exists: true}, [pageOrder:1,title:1])

    # This one, will fetch in all documents that will be outputted to the blogg directory
    blogg: (database) ->
      database.findAllLive({relativeOutDirPath:'blogg'},[date:-1])

    # This one, will fetch in all documents that will be outputted to the feedback directory
    feedback: (database) ->
      database.findAllLive({relativeOutDirPath:'feedback'},[pageOrder:1])

    # This one, will fetch in all documents that will be outputted to the cases directory
    cases: (database) ->
      database.findAllLive({relativeOutDirPath:'cases'},[title:1])

    # This one, will fetch in all documents that will be outputted to the coworkers directory
    coworkers: (database) ->
      database.findAllLive({relativeOutDirPath:'coworkers'},[filename:1])

    # This one, will fetch in all documents that will be outputted to the coworkers directory
    operations: (database) ->
      database.findAllLive({relativeOutDirPath:'operations'},[pageOrder:1])

    # This one, will fetch in all documents that will be outputted to the services directory
    services: (database) ->
      database.findAllLive({relativeOutDirPath:'services'},[pageOrder:1])

    # This one, will fetch in all documents that will be outputted to the services directory
    om: (database) ->
      database.findAllLive({relativeOutDirPath:'om'},[pageOrder:1])

    # This one, will fetch in all documents that will be outputted to the hiring directory
    hiring: (database) ->
      database.findAllLive({relativeOutDirPath:'hiring'},[pageOrder:1])

    # This one, will fetch in all documents that will be outputted to the hiring directory
    testaren: (database) ->
      database.findAllLive({relativeOutDirPath:'testaren'},[pageOrder:1])

  # =================================
  # Plugin Configuration

  plugins:
    feedr:
      feeds:
        'blogs':
          url: 'http://mix.chimpfeedr.com/c22cf-iteam-blogg'
        'iteam':
          url: 'http://mix.chimpfeedr.com/16486-Iteam'

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
      oldUrls = latestConfig.templateData.site.oldUrls or []
      newUrl = latestConfig.templateData.site.url

      # Redirect any requests accessing one of our sites oldUrls to the new site url
      server.use (req,res,next) ->
        if req.headers.host in oldUrls
          res.redirect 301, newUrl+req.url
        else
          next()

    # Write After
    # Used to minify our assets with grunt
    writeAfter: (opts,next) ->
        # Prepare
        balUtil = require('safeps')
        docpad = @docpad
        rootPath = docpad.config.rootPath

        command = ["#{rootPath}/node_modules/.bin/grunt", 'default']

        # Execute
        balUtil.spawn(command, {cwd:rootPath,output:true}, next)

        # Chain
        @


# Export our DocPad Configuration
module.exports = docpadConfig
