import {
  Scopes,
  DefaultOptions,
  validateOptions,
  Transcriber,
  Projects,
  Members,
  Keys,
  Usage,
  Invitation,
} from "./deps.ts";

export class Deepgram {
  private _apiUrl: string;
  private _apiKey: string;

  scopes: Scopes;
  transcription: Transcriber;
  projects: Projects;
  members: Members;
  keys: Keys;
  usage: Usage;
  invitation: Invitation;

  constructor(apiKey: string, apiUrl?: string) {
    this._apiKey = apiKey;
    this._apiUrl = apiUrl || DefaultOptions.apiUrl;

    /**
     * Ensures that the provided options were provided
     */
    validateOptions(this._apiKey, this._apiUrl);

    this.scopes = new Scopes(this._apiKey, this._apiUrl);
    this.transcription = new Transcriber(this._apiKey, this._apiUrl);
    this.projects = new Projects(this._apiKey, this._apiUrl);
    this.members = new Members(this._apiKey, this._apiUrl);
    this.keys = new Keys(this._apiKey, this._apiUrl);
    this.usage = new Usage(this._apiKey, this._apiUrl);
    this.invitation = new Invitation(this._apiKey, this._apiUrl);
  }
}
