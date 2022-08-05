import { querystring } from "../deps.ts";
import {
  PrerecordedTranscriptionOptions,
  PrerecordedTranscriptionResponse,
  TranscriptionSource,
  UrlSource,
  BufferSource,
  ReadStreamSource,
} from "../types/index.ts";

function isUrlSource(
  providedSource: TranscriptionSource
): providedSource is UrlSource {
  if ((providedSource as UrlSource).url) return true;
  return false;
}

function isBufferSource(
  providedSource: TranscriptionSource
): providedSource is BufferSource {
  if ((providedSource as BufferSource).buffer) return true;
  return false;
}

function isReadStreamSource(
  providedSource: TranscriptionSource
): providedSource is ReadStreamSource {
  if ((providedSource as ReadStreamSource).stream) return true;
  return false;
}

/**
 * Transcribes audio from a file or buffer
 * @param credentials Base64 encoded API key & secret
 * @param source Url or Buffer of file to transcribe
 * @param options Options to modify transcriptions
 */
export const preRecordedTranscription = async (
  apiKey: string,
  apiUrl: string,
  source: TranscriptionSource,
  options?: PrerecordedTranscriptionOptions
): Promise<PrerecordedTranscriptionResponse> => {
  const transcriptionOptions = { ...{}, ...options };

  if (
    !isUrlSource(source) &&
    (source.mimetype === undefined || source.mimetype.length === 0)
  ) {
    throw new Error(
      "DG: Mimetype must be provided if the source is a Buffer or a ReadStream"
    );
  }

  let body;
  if (isUrlSource(source)) {
    body = JSON.stringify(source);
  } else if (isBufferSource(source)) {
    body = source.buffer;
  } else if (isReadStreamSource(source)) {
    body = source.stream;
  } else {
    throw new Error("Unknown TranscriptionSource type");
  }

  let contentType = "application/json";
  if (!isUrlSource(source)) {
    contentType = source.mimetype;
  }

  const response = await fetch(
    `https://${apiUrl}/v1/listen?${querystring.stringify(
      transcriptionOptions
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${apiKey}`,
        "Content-Type": contentType,
        "X-DG-Agent": window.dgAgent,
      },
      body,
    }
  );
  return response.json();
};
