curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
    --header "X-Pin-Topics: americas" \
    -d @pin-5pm.json
curl -X PUT https://timeline-api.getpebble.com/v1/shared/pins/brawl-39 \
    --header "Content-Type: application/json" \
    --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
    --header "X-Pin-Topics: europe,taiwan-china,korea" \
    -d @pin-9pm.json

# curl -X DELETE https://timeline-api.getpebble.com/v1/shared/pins/brawl-37 \
#     --header "Content-Type: application/json" \
#     --header "X-API-Key: SB6yu1j5t5ls4gfbmadcvljcotmmoyqq" \
