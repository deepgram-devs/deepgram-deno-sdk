import { Message, InvitationOptions, InvitationList } from "./deps.ts";

export class Invitation {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Lists all the current invites of a specified project.
   * @param projectId Unique identifier of the project
   */
  async list(projectId: string): Promise<InvitationList> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/invites`,
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
      throw new Error("DG: Cannot List invites. " + error);
    }
  }

  /**
   * Sends an invitation to join the specified project.
   * @param projectId Unique identifier of the project
   */
  async send(projectId: string, options: InvitationOptions): Promise<Message> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/invites`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${this._credentials}`,
            "Content-Type": "application/json",
            "X-DG-Agent": "deno-sdk/1.0.0",
          },
          body: JSON.stringify({ email: options.email, scope: options.scope }),
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        throw `${response.status} ${response.statusText}`;
      }
    } catch (error) {
      throw new Error("DG: Cannot send invite. " + error);
    }
  }

  //   /**
  //    * Removes the authenticated account from the specified project.
  //    * @param projectId Unique identifier of the project
  //    */
  async leave(projectId: string): Promise<Message> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/leave`,
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
      throw new Error("DG: Cannot leave project. " + error);
    }
  }

  //   /**
  //    * Removes the specified email from the invitations on the specified project.
  //    * @param projectId Unique identifier of the project
  //    * @param email email address of the invitee
  //    * NOTE: This will return successful even if the email does not have an invite on the project.
  //    */
  async delete(projectId: string, email: string): Promise<Message> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/invites/${email}`,
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
      throw new Error("DG: Cannot delete invite. " + error);
    }
  }
}
