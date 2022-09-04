aws configure set aws_access_key_id "access_key_id"
aws configure set aws_secret_access_key "secret_access_key"
aws configure set region "us-east-1"

aws dynamodb create-table \
--endpoint-url=http://dynamo-db-local:8000 \
--table-name SUPER_TABLE_NAME \
--attribute-definitions \
AttributeName=key_selector,AttributeType=S  \
AttributeName=range_selector,AttributeType=N  \
--key-schema \
AttributeName=key_selector,KeyType=HASH  \
AttributeName=range_selector,KeyType=RANGE  \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5;
