declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            AUTHKEY: string;
            JWT_SECRET_KEY: string;
            PORT: number,
            EMAILMAIL: string,
            EMAILPASS: string,
            EMAILSLIST: string,
        }
    }
}

export { };