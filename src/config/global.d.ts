declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ATLAS_URI: string;
            DB_NAME: string;
            USERS_COLLECTION_NAME: string;
            PORT?: string;
        }
    }
}

export {}