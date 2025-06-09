/**
 * Enumerates all supported API endpoints in the system.
 * Used to determine credit cost and track usage statistics.
 *
 * The enum values are the exact string paths used in actual API calls.
 * These values are also used as keys in quota configuration and analytics.
 */
export const enum APIEndpoint {
  // Creator-related endpoints
  SubmitCreators = '/submit-creators',
  DiscoverCreators = '/discover-creators',
  GetCreatorInfo = '/get-creator-info',

  // Keyword-related endpoints
  GetTopicItems = '/get-topic-items',
  GetNicheItems = '/get-niche-items',
  GetHashtagItems = '/get-hashtag-items',

  // Add other endpoints as needed
}
