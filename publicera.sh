#!/bin/bash
# Declare AWS key and secret
KEY=AKIAIAKDS7MEDH4MTJIA
SECRET=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
# Show notifications and start deploy, finish with another notification
osascript -e 'display notification "Startar publicering" with title "Iteam.se"'
AWS_ACCESS_KEY_ID=KEY AWS_SECRET_ACCESS_KEY=SECRET grunt deploy:production
osascript -e 'display notification "Publicerat!" with title "Iteam.se"'