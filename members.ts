import { MemberList, Message } from "./deps.ts";

export class Members {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Retrieves account objects for all of the accounts in the specified project.
   * @param projectId Unique identifier of the project
   */
  async listMembers(projectId: string): Promise<MemberList> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}/members`,
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
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
  }

  /**
   * Retrieves account objects for all of the accounts in the specified project.
   * @param projectId Unique identifier of the project
   * @param memberId Unique identifier of the member
   */
  async removeMember(projectId: string, memberId: string): Promise<Message> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}/members/${memberId}`,
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
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
  }
}
