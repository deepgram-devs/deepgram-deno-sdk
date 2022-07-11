import { querystring } from "../deps.ts";
import EventEmitter from "https://deno.land/x/events@v1.0.0/mod.ts";
import { ConnectionState, LiveTranscriptionEvents } from "../enums/index.ts";
import { LiveTranscriptionOptions } from "../types/index.ts";

export class LiveTranscription extends EventEmitter {
  private _socket: WebSocket;

  constructor(
    credentials: string,
    apiUrl: string,
    options?: LiveTranscriptionOptions
  ) {
    super();
    const query = options ? querystring.stringify(options) : {};

    this._socket = new WebSocket(`wss://${apiUrl}/v1/listen?${query}`, [
      "token",
      credentials,
    ]);
    this._bindSocketEvents();
  }

  private _bindSocketEvents(): void {
    this._socket.addEventListener("open", () => {
      this.emit(LiveTranscriptionEvents.Open, this);
    });

    this._socket.addEventListener("close", (event: CloseEvent) => {
      this.emit(LiveTranscriptionEvents.Close, event);
    });

    this._socket.addEventListener("error", (event) => {
      this.emit(LiveTranscriptionEvents.Error, event);
    });

    this._socket.addEventListener("message", (m) => {
      this.emit(LiveTranscriptionEvents.TranscriptReceived, m.data);
    });
  }

  /**
   * Returns the ready state of the websocket connection
   */
  public getReadyState(): ConnectionState {
    return this._socket.readyState;
  }

  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   */
  public send(
    data: string | ArrayBufferLike | Blob | ArrayBufferView | Uint8Array
  ): void {
    if (this._socket.readyState === ConnectionState.OPEN) {
      this._socket.send(data);
    } else {
      this.emit(
        LiveTranscriptionEvents.Error,
        "Could not send. Connection not open."
      );
    }
  }

  /**
   * Denote that you are finished sending audio and close
   * the websocket connection when transcription is finished
   */
  public finish(): void {
    this._socket.send(new Uint8Array(0));
  }
}
