import { UserAPIUsageHistory } from './user-api-usage-history';
import { UserAPIUsageMonthlySummary } from './user-api-usage-monthly-summary';

/**
 * Represents a user account and their credit balance.
 * `userId` is used as the primary identifier across the schema.
 */
export type User = {
  /** Primary identifier for the user (as per task definition) */
  userId: string;

  /** Number of credits the user has prepurchased */
  prepurchasedCredits: number;

  /**
   * Logical relation — the user's detailed API call history.
   * Not stored in the user table; resolved via userId (lazy-loaded if needed).
   */
  apiUsageHistory: UserAPIUsageHistory[];

  /**
   * Logical relation — monthly aggregated usage stats for the user.
   * Not stored in the user table; resolved via userId (lazy-loaded if needed).
   */
  apiUsageMonthlySummary: UserAPIUsageMonthlySummary[];

  /** Timestamp when the user was created (UTC, ms) */
  createdAt: number;

  /** Timestamp when the user record was last updated (UTC, in milliseconds) */
  updatedAt: number;
};
