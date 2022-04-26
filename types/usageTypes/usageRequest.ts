import { Message } from "../index.ts";

export type UsageCallback = {
  code: number;
  completed: string;
};

export type UsageRequestDetail = {
  details: {
    usd: number;
    duration: number;
    total_audio: number;
    channels: number;
    streams: number;
    model: string;
    method: "sync" | "async" | "streaming";
    tags: Array<string>;
    features: Array<string>;
    config: {
      multichannel?: boolean;
      interim_results?: boolean;
      punctuate?: boolean;
      ner?: boolean;
      utterances?: boolean;
      replace?: boolean;
      profanity_filter?: boolean;
      keywords?: boolean;
      sentiment?: boolean;
      diarize?: boolean;
      detect_language?: boolean;
      search?: boolean;
      redact?: boolean;
      alternatives?: boolean;
      numerals?: boolean;
    };
  };
};

export type UsageRequest = {
  request_id: string;
  created: string;
  path: string;
  accessor: string;
  response?: UsageRequestDetail | Message;
  callback?: UsageCallback;
};

export type UsageRequestList = {
  page: number;
  limit: number;
  requests?: Array<UsageRequest>;
};

export type UsageRequestListOptions = {
  start?: string;
  end?: string;
  page?: number;
  limit?: number;
  status?: "succeeded" | "failed";
};
