#!/bin/sh

curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-start-americas-42 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: americas" \
    -d @data/pins/pin-open-americas.json
echo

curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-start-europe-42 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: europe" \
    -d @data/pins/pin-open-europe.json
echo

curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-start-korea-42 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: korea" \
    -d @data/pins/pin-open-korea.json
echo

curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-start-taiwan-china-42 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: taiwan-china" \
    -d @data/pins/pin-open-taiwan_china.json
echo
