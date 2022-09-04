import aws, { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
export class DatabaseService {
  private documentClient: DynamoDB.DocumentClient;
  private TABLE_NAME: string = "SUPER_TABLE";

  constructor() {
    aws.config.update({
      // region: "us-east-1",
      region: "local"
      // accessKeyId: "access_key_id",
      // secretAccessKey: "secret_access_key"
    });
    this.documentClient = new aws.DynamoDB.DocumentClient({
      // endpoint: "http://localhost:8000"
    });
  }

  async create(): Promise<void> {
    try {
      const item = {
        lastName: "Sisler",
        firstName: `Aaron`,
        randomNote: "I like tacos"
      };
      const params = {
        TableName: this.TABLE_NAME,
        Item: item
      };
      await this.documentClient.put(params).promise();
    } catch (error) {
      console.log(error);
      throw new Error("Record not created");
    }
  }

  async getItem(
    lastName: string,
    firstName: string
  ): Promise<DocumentClient.AttributeMap> {
    try {
      var params = {
        Key: { lastName, firstName },
        TableName: this.TABLE_NAME
      };
      const { Item } = await this.documentClient.get(params).promise();

      return Item;
    } catch (error) {
      console.log(error);
      throw new Error("Record not created");
    }
  }
}
