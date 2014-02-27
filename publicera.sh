#!/bin/bash
export KEY=AKIAIAKDS7MEDH4MTJIA
export SECRET=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
export AWS_ACCESS_KEY_ID=AKIAIAKDS7MEDH4MTJIA
export AWS_SECRET_ACCESS_KEY=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
# Show notifications and start deploy, finish with another notification
#osascript -e 'display notification "Startar publicering" with title "Iteam.se"'

cd /Users/sru/Projects/iteam.se; /usr/local/bin/grunt deploy:production;
# 'display notification "Publicerat!" with title "Iteam.se"'