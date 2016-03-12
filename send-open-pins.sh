curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-open-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
    --header "X-Pin-Topics: americas" \
    -d @pin-open-americas.json
echo
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-open-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
    --header "X-Pin-Topics: europe,taiwan-china,korea" \
    -d @pin-open-europe_taiwan_china_korea.json
echo

# curl -X DELETE https://timeline-api.getpebble.com/v1/shared/pins/brawl-37 \
#     --header "Content-Type: application/json" \
#     --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
