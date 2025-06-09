import { APIEndpoint } from "./api-endpoints";

/**
 * Defines the credit cost for each API endpoint.
 * This configuration is used when deducting user credits on API usage.
 *
 * Keys must exactly match the values from `APIEndpoint`.
 * Values represent how many credits are charged per call to that endpoint.
 */
export const apiQuotaMap: Record<APIEndpoint, number> = {
  // Creator-related endpoints
  [APIEndpoint.SubmitCreators]: 1,
  [APIEndpoint.DiscoverCreators]: 2,
  [APIEndpoint.GetCreatorInfo]: 3,

  // Keyword-related endpoints
  [APIEndpoint.GetTopicItems]: 1,
  [APIEndpoint.GetNicheItems]: 1,
  [APIEndpoint.GetHashtagItems]: 1,

  // Add other mappings as needed
} as const;
