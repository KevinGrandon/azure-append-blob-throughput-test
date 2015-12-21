# Azure Append Blob Throughput Test

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Tries to hammer azure with blob append requests. This script will create an append blob and append a bunch of stuff to it.

You will need to define two environment variables: AZURE_STORAGE_ACCOUNT and AZURE_STORAGE_ACCESS_KEY.