declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "dev" | "prod";
      TOKEN: string;
      CLIENT_ID: string;
      DEV_GUILD_ID: string;
    }
  }
}

export default {};
