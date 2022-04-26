import { CreateKeyOptions, KeyResponse, Key, KeyResponseObj } from "./deps.ts";

export class Keys {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Retrieves all keys associated with the provided projectId
   * @param projectId Unique identifier of the project containing API keys
   */
  async list(projectId: string): Promise<KeyResponse> {
    let response = null;
    try {
      const firstResponse = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/keys`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${this._credentials}`,
            "Content-Type": "application/json",
            "X-DG-Agent": "deno-sdk/1.0.0",
          },
        }
      );
      if (firstResponse.ok) {
        response = await firstResponse.json();
        const output = response.api_keys.map((apiKey: KeyResponseObj) => {
          return {
            ...apiKey,
            ...apiKey.api_key,
          };
        });
        return { api_keys: output };
      } else {
        throw `${firstResponse.status} ${firstResponse.statusText}`;
      }
    } catch (error) {
      throw "DG: Cannot List Keys. " + error;
    }
  }

  /**
   * Retrieves a specific key associated with the provided projectId
   * @param projectId Unique identifier of the project containing API keys
   * @param keyId Unique identifier for the key to retrieve
   */
  async get(projectId: string, keyId: string): Promise<Key> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/keys/${keyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${this._credentials}`,
            "Content-Type": "application/json",
            "X-DG-Agent": "deno-sdk/1.0.0",
          },
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        throw `${response.status} ${response.statusText}`;
      }
    } catch (error) {
      throw "DG: Cannot Get Key. " + error;
    }
  }

  /**
   * Creates an API key with the provided scopes
   * @param projectId Unique identifier of the project to create an API key under
   * @param comment Comment to describe the key
   * @param scopes Permission scopes associated with the API key
   * @param options Optional options used when creating API keys
   */
  async create(
    projectId: string,
    comment: string,
    scopes: Array<string>,
    options?: CreateKeyOptions
  ): Promise<Key> {
    /** Throw an error if the user provided both expirationDate and timeToLive */
    if (
      options &&
      options.expirationDate !== undefined &&
      options.timeToLive !== undefined
    ) {
      throw new Error(
        "Please provide expirationDate or timeToLive or neither. Providing both is not allowed."
      );
    }
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/keys`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${this._credentials}`,
            "Content-Type": "application/json",
            "X-DG-Agent": "deno-sdk/1.0.0",
          },
          body: JSON.stringify({
            comment,
            scopes,
            expiration_date:
              options && options.expirationDate
                ? options.expirationDate
                : undefined,
            time_to_live_in_seconds:
              options && options.timeToLive ? options.timeToLive : undefined,
          }),
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        throw `${response.status} ${response.statusText}`;
      }
    } catch (error) {
      throw "DG: Cannot Create Key. " + error;
    }
  }

  /**
   * Deletes an API key
   * @param projectId Unique identifier of the project to create an API key under
   * @param keyId Unique identifier for the key to delete
   */
  async delete(projectId: string, keyId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/keys/${keyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `token ${this._credentials}`,
            "Content-Type": "application/json",
            "X-DG-Agent": "deno-sdk/1.0.0",
          },
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        throw `${response.status} ${response.statusText}`;
      }
    } catch (error) {
      throw "DG: Cannot Delete Key. " + error;
    }
  }
}
