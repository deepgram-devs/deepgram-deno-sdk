import { Deepgram, DefaultOptions } from "./deps.ts";
declare global {
  interface Window {
    sdkVersion: string;
    dgAgent: string;
  }
}
window.sdkVersion = "1.1.0";
window.dgAgent = `deepgram-deno-sdk/v${window.sdkVersion}`;

export default async function deepgram(
  apiKey: string,
  apiUrl?: string
): Promise<Deepgram> {
  const _apiUrl = apiUrl || DefaultOptions.apiUrl;
  const desc = { name: "net", host: _apiUrl } as const;
  const status = await Deno.permissions.request(desc);

  if (status.state === "granted") {
    return new Deepgram(apiKey, apiUrl);
  } else {
    throw new Error(
      `DG: The Deepgram deno-SDK needs net permissions for ${_apiUrl} in order to work.`
    );
  }
}
