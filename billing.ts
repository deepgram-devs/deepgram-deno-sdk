import { BalanceList, Balance } from "./deps.ts";

export class Billing {
  constructor(private _credentials: string, private _apiUrl: string) {}

  private apiPath = "/v1/projects";

  /**
   * Retrieves list of balance info of the specified project.
   * @param projectId Unique identifier of the project
   */
  async listBalances(projectId: string): Promise<BalanceList> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/balances`,
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
      throw new Error("DG: Cannot List balances. " + error);
    }
  }

  /**
   * Retrieves balance info of a specified balance_id in the specified project.
   * @param projectId Unique identifier of the project
   * @param balanceId Unique identifier of the balance
   */

  async getBalance(projectId: string, balanceId: string): Promise<Balance> {
    try {
      const response = await fetch(
        `https://${this._apiUrl}${this.apiPath}/${projectId}/balances/${balanceId}`,
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
      throw new Error("DG: Cannot get balance. " + error);
    }
  }

  // return this._request(
  //   "GET",
  //   this._credentials,
  //   this._apiUrl,
  //   `${this.apiPath}/${projectId}/balances/${balanceId}`
  // );
}
