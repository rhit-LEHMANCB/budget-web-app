import * as dotenv from "dotenv";
import * as path from "path";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../config/.env.local") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    ATLAS_URI?: string;
    DB_NAME?: string;
    USERS_COLLECTION_NAME?: string;
    PORT?: string;
}

interface Config {
    ATLAS_URI: string;
    DB_NAME: string;
    USERS_COLLECTION_NAME: string;
    PORT: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        ATLAS_URI: process.env.ATLAS_URI,
        DB_NAME: process.env.DB_NAME,
        USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME,
        PORT: process.env.PORT
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;