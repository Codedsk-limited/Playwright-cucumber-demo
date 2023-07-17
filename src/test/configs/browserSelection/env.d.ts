export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER : "chrome" | "firefox" | "safari",
            ENV: "test" | "prod",
            BASEURL : string,
            HEAD : "true" | "false"

        }
    }
}