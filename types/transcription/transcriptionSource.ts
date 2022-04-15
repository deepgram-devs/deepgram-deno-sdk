export type TranscriptionSource = UrlSource | BufferSource | ReadStreamSource;

export type ReadStreamSource = {
  stream: ReadableStream;
  mimetype: string;
};

export type UrlSource = {
  url: string;
};

export type BufferSource = {
  buffer: ArrayBuffer;
  mimetype: string;
};
