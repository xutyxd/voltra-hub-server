
import { App } from "./app";
import { MongoDatabaseService } from "./crosscutting/database/services/mongo-database.service";

const app = new App();

// Check if mongodb is available
const { MONGODB_URI, MONGODB_DATABASE } = process.env;

if (MONGODB_URI && MONGODB_DATABASE) {
    const configuration = {
        uri: process.env.MONGODB_URI,
        database: process.env.MONGODB_DATABASE
    };

    app.set.database(MongoDatabaseService, configuration);
}

app.start();

export default app;