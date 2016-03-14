#!/bin/bash

LAMBDA_FUNCTION_NAME=sendBrawlPins
ZIP_FILE=dist/sendBrawlPins.zip

AWS_PROFILE=tavern_brawl aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_NAME} --zip-file fileb://${ZIP_FILE}
