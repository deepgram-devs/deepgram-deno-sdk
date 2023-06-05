import { ScopeList, Message } from "./deps.ts";

export class Scopes {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Retrieves scopes of the specified member in the specified project.
   * @param projectId Unique identifier of the project
   * @param memberId Unique identifier of the member
   */
  async get(projectId: string, memberId: string): Promise<ScopeList> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}/members/${memberId}/scopes`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${this._credentials}`,
          "Content-Type": "application/json",
          "X-DG-Agent": window.dgAgent,
        },
      }
    );
    if (response.ok) {
      return response.json();
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
  }

  /**
   * Updates the scope for the specified member in the specified project.
   * @param projectId Unique identifier of the project
   * @param memberId Unique identifier of the member being updated
   * @param scope string of the scope to update to
   */
  async update(
    projectId: string,
    memberId: string,
    scope: string
  ): Promise<Message> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}/members/${memberId}/scopes`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${this._credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scope,
        }),
      }
    );
    if (response.ok) {
      return response.json();
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
  }
}
