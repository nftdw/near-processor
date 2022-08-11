import { GetConfig, LoadConfig } from "../config.js";
import {
    QueueServiceClient,
    StorageSharedKeyCredential
} from "@azure/storage-queue";

LoadConfig();

let config = GetConfig();

(async () => {
    let qsClient = new QueueServiceClient(`https://${config.AzureAccountName}.queue.core.windows.net`, new StorageSharedKeyCredential(config.AzureAccountName, config.AzureAccountKey));
    let qClient = qsClient.getQueueClient(config.Topic);

    await qClient.createIfNotExists();
    let response = await qClient.clearMessages();
    console.log(response);
    
    
})();
