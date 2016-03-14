#!/bin/bash

ZIP_FILE=dist/sendBrawlPins.zip

if [ -e ${ZIP_FILE} ]; then
  rm ${ZIP_FILE}
fi

zip --recurse-paths --junk-paths --quiet ${ZIP_FILE} src/*.js
zip --recurse-paths ${ZIP_FILE} --quiet node_modules

echo "Packaging complete!"
ls -lh ${ZIP_FILE}
