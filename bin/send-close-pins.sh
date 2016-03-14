curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: americas" \
    -d @pin-close-americas.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: europe" \
    -d @pin-close-europe.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: taiwan-china,korea" \
    -d @pin-close-taiwan-china_korea.json
echo
