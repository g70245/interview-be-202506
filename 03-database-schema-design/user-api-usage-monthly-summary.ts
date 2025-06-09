import { APIEndpoint } from "./config/api-endpoints";

/**
 * Represents monthly usage statistics for a user and a specific API endpoint.
 * Used for user-facing analytics and billing breakdown.
 */
export type UserAPIUsageMonthlySummary = {
  /** Primary identifier for this summary record */
  summaryId: string;

  /**
   * Month in YYYY-MM format (e.g., '2025-06').
   * Represents the aggregation period.
   */
  month: string;

  /** The user this summary belongs to */
  userId: string;

  /** The API endpoint this summary refers to */
  endpoint: APIEndpoint;

  /** Number of times this endpoint was called by the user in the given month */
  requestCount: number;

  /** Total credits charged for this endpoint in the given month */
  creditsCharged: number;

  /** Record creation timestamp (UTC, in milliseconds) */
  createdAt: number;

  /** Record last update timestamp (UTC, in milliseconds) */
  updatedAt: number;
};
