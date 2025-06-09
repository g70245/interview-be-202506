import { APIEndpoint } from "./config/api-endpoints";

/**
 * Aggregated monthly API usage statistics across all users for a specific endpoint.
 * Used for platform-level analytics and monitoring.
 */
export type APIUsageMonthlySummary = {
  /** Primary identifier for this summary record */
  summaryId: string;

  /**
   * Month in YYYY-MM format (e.g., '2025-06').
   * Represents the aggregation period.
   */
  month: string;

  /** The API endpoint this summary refers to */
  endpoint: APIEndpoint;

  /** Total number of times this endpoint was called by all users in the given month */
  requestCount: number;

  /** Total credits charged across all users for this endpoint in the given month */
  creditsCharged: number;

  /** Record creation timestamp (UTC, in milliseconds) */
  createdAt: number;

  /** Record last update timestamp (UTC, in milliseconds) */
  updatedAt: number;
};
