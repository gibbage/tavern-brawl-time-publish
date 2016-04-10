curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-americas-43 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: americas" \
    -d @data/pins/pin-close-americas.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-europe-43 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: europe" \
    -d @data/pins/pin-close-europe.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-taiwan-china-43 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: taiwan-china" \
    -d @data/pins/pin-close-taiwan_china.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-end-korea-43 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: ${TIMELINE_API_KEY}" \
    --header "X-Pin-Topics: korea" \
    -d @data/pins/pin-close-korea.json
echo
