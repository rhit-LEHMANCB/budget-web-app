import * as dotenv from "dotenv";
import * as path from "path";

console.log("Current directory:", __dirname);
// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    ATLAS_URI?: string;
    DB_NAME?: string;
    USERS_COLLECTION_NAME?: string;
    PORT?: string;
    AUTH_SECRET?: string;
    AUTH_BASE_URL?: string;
    AUTH_CLIENT_ID?: string;
    AUTH_ISSUER_BASE_URL?: string;
}

interface Config {
    ATLAS_URI: string;
    DB_NAME: string;
    USERS_COLLECTION_NAME: string;
    PORT: string;
    AUTH_SECRET: string;
    AUTH_BASE_URL: string;
    AUTH_CLIENT_ID: string;
    AUTH_ISSUER_BASE_URL: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        ATLAS_URI: process.env.ATLAS_URI,
        DB_NAME: process.env.DB_NAME,
        USERS_COLLECTION_NAME: process.env.USERS_COLLECTION_NAME,
        PORT: process.env.PORT,
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_BASE_URL: process.env.AUTH_BASE_URL,
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
        AUTH_ISSUER_BASE_URL: process.env.AUTH_ISSUER_BASE_URL,
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;