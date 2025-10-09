export interface Configuration {
  [key: string]: any;
  baseUrl: string;
  logLevel: string;
  featureFlags: { [key: string]: boolean };
}
