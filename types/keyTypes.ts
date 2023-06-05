import { Member } from "./index.ts";

/**
 * API key used for authenticating with the Deepgram API
 */
export type Key = {
  /**
   * Unique identifier of the key to use in API requests
   */
  api_key_id: string;
  /**
   * API key to send in API requests (Only displayed when first created)
   */
  key?: string;
  /**
   * Comment for user reference
   */
  comment: string;
  /**
   * Timestamp of the date/time the key was created
   */
  created: string;
  /**
   * Array of scopes assigned to the key
   */
  scopes: Array<string>;
};

/**
 * Response from the Deepgram API to list keys
 */
export type KeyResponse = {
  /**
   * Array of API keys associated with the project
   */
  api_keys: Array<{
    /**
     * Optional member associated with the API key
     */
    member?: Member;

    /**
     * API key
     */
    api_key: Key;

    /**
     * Unique identifier of the key to use in API requests
     * @deprecated This property has moved to api_key.api_key_id and will
     * be removed in future versions.
     */
    api_key_id: string;
    /**
     * API key to send in API requests (Only displayed when first created)
     * @deprecated This property has moved to api_key.key and will
     * be removed in future versions.
     */
    key?: string;
    /**
     * Comment for user reference
     * @deprecated This property has moved to api_key.comment and will
     * be removed in future versions.
     */
    comment: string;
    /**
     * Timestamp of the date/time the key was created
     * @deprecated This property has moved to api_key.created and will
     * be removed in future versions.
     */
    created: string;
    /**
     * Array of scopes assigned to the key
     * @deprecated This property has moved to api_key.scopes and will
     * be removed in future versions.
     */
    scopes: Array<string>;
  }>;
};

/**
 * Optional options used when creating an API key
 */
export type CreateKeyOptions = {
  /**
   * Date on which the key you would like to create should expire.
   */
  expirationDate?: Date;
  /**
   * Length of time (in seconds) during which the key you would like to create will remain valid.
   */
  timeToLive?: number;
  tags?: Array<string>;
};

export type KeyResponseObj = {
  /**
   * Optional member associated with the API key
   */
  member?: Member;

  /**
   * API key
   */
  api_key: Key;

  /**
   * Unique identifier of the key to use in API requests
   * @deprecated This property has moved to api_key.api_key_id and will
   * be removed in future versions.
   */
  api_key_id: string;
  /**
   * API key to send in API requests (Only displayed when first created)
   * @deprecated This property has moved to api_key.key and will
   * be removed in future versions.
   */
  key?: string;
  /**
   * Comment for user reference
   * @deprecated This property has moved to api_key.comment and will
   * be removed in future versions.
   */
  comment: string;
  /**
   * Timestamp of the date/time the key was created
   * @deprecated This property has moved to api_key.created and will
   * be removed in future versions.
   */
  created: string;
  /**
   * Array of scopes assigned to the key
   * @deprecated This property has moved to api_key.scopes and will
   * be removed in future versions.
   */
  scopes: Array<string>;
};
