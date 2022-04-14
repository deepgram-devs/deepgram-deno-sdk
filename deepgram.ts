import { Scopes, DefaultOptions, validateOptions } from "./deps.ts";

export class Deepgram {
  private _apiUrl: string;
  private _apiKey: string;

  scopes: Scopes;

  constructor(apiKey: string, apiUrl?: string) {
    this._apiKey = apiKey;
    this._apiUrl = apiUrl || DefaultOptions.apiUrl;

    /**
     * Ensures that the provided options were provided
     */
    validateOptions(this._apiKey, this._apiUrl);

    this.scopes = new Scopes(this._apiKey, this._apiUrl);
  }
}
