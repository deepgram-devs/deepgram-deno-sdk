import {
  Project,
  ProjectPatchResponse,
  ProjectResponse,
  ProjectPatchRequest,
} from "./deps.ts";

export class Projects {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Returns all projects accessible by the API key
   */
  async list(): Promise<ProjectResponse> {
    const response = await fetch(`https://${this._apiUrl}${this.apiPath}`, {
      method: "GET",
      headers: {
        Authorization: `token ${this._credentials}`,
        "Content-Type": "application/json",
        "X-DG-Agent": "deno-sdk/1.0.0",
      },
    });
    return response.json();
  }

  /**
   * Retrieves a specific project based on the provided projectId
   * @param projectId Unique identifier of the project to retrieve
   */
  async get(projectId: string): Promise<Project> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${this._credentials}`,
          "Content-Type": "application/json",
          "X-DG-Agent": "deno-sdk/1.0.0",
        },
      }
    );
    return response.json();
  }

  /**
   * Update a specific project
   * @param project project to update
   */
  async update(
    projectId: string,
    updateBody: ProjectPatchRequest
  ): Promise<ProjectPatchResponse> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${this._credentials}`,
          "Content-Type": "application/json",
          "X-DG-Agent": "deno-sdk/1.0.0",
        },
        body: JSON.stringify(updateBody),
      }
    );

    return response.json();
  }
}
