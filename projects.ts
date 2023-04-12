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
        "X-DG-Agent": window.dgAgent,
      },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
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
          "X-DG-Agent": window.dgAgent,
        },
        body: JSON.stringify(updateBody),
      }
    );

    if (response.ok) {
      return response.json();
    }
    throw new Error(`DG: ${response.status} ${response.statusText}`);
  }

  async delete(projectId: string): Promise<void> {
    const response = await fetch(
      `https://${this._apiUrl}${this.apiPath}/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${this._credentials}`,
          "Content-Type": "application/json",
          "X-DG-Agent": window.dgAgent,
        },
      }
    );
}
