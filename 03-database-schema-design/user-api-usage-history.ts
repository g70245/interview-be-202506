import { APIEndpoint } from "./config/api-endpoints";

/**
 * Represents a single API usage record made by a user.
 * Used for credit deduction, debugging, and usage tracking.
 */
export type UserAPIUsageHistory = {
  /** Primary identifier for this usage record */
  historyId: string;

  /** The user who made the API call */
  userId: string;

  /** The API endpoint that was called */
  endpoint: APIEndpoint;

  /**
   * Actual credits charged at the time of the API call.
   * Immutable — reflects historical quota cost even if current pricing changes.
   */
  creditsCharged: number;

  /** Timestamp when the API call occurred (UTC, in milliseconds) */
  calledAt: number;
};
