declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      API_ENDPOINT: string;
    }
  }
}
