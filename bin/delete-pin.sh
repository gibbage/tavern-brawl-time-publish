#!/bin/sh

curl -X DELETE https://timeline-api.getpebble.com/v1/shared/pins/brawl-start-42 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
