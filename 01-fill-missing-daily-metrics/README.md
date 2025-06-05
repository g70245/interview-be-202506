# 01 - Fill Missing Daily Metrics

## Problem Description

This task is part of a backend exercise for a social media analytics platform. The system returns up to 7 days of metric data for a creator, sorted by date. However, data may be missing for some days.

Your goal is to ensure **exactly 7 days of metric data**, from **6 days ago up to today (inclusive)**, all aligned to UTC midnight. Missing entries must be filled by copying data from the nearest available date.

## Input Format

Each entry in the input array has the following structure:

```ts
type Metric = {
  date: number; // UTC timestamp at 00:00:00Z
  averageLikesCount: number;
  followersCount: number;
  averageEngagementRate: number;
};
```

- Input: up to `METRIC_DAYS` entries, sorted by ascending date.
- Output: exactly `METRIC_DAYS` entries covering `[today - (METRIC_DAYS - 1), ..., today]`.

## Fill-in Rules

- If a date is missing:
  - Find the entry with the **smallest absolute distance** to the target date.
  - If two are equally close, **prefer the earlier date**.
- Clone the nearest metric and **replace the `date` field** with the target date.

## Implementation Highlights

- `METRIC_DAYS` is configurable via `config.ts`, defaulting to 7.
- Dates are handled in UTC at midnight precision.
- The logic uses a single-pass scan with a pointer index for efficient fallback selection.

### Key Functions

```ts
function fillMissingMetrics(data: Metric[]): Metric[]
```

Returns a completed list of metrics for the target date range.

```ts
function getMetricDateByIndex(index: number, today: number): number
```

Computes the UTC midnight timestamp for the given index in the metric window.

```ts
function diffBetweenTimestamps(a: number, b: number): number
```

Computes absolute distance between two timestamps in milliseconds.

## Example

If `METRIC_DAYS = 7` and today is `2023-10-07T00:00:00Z`, the target range is:

```
2023-10-01T00:00:00Z to 2023-10-07T00:00:00Z
```

Given input:

```json
[
  { "date": "2023-10-02T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-07T00:00:00Z", "followersCount": 700 }
]
```

Expected output:

```json
[
  { "date": "2023-10-01T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-02T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-03T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-04T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-05T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-06T00:00:00Z", "followersCount": 700 },
  { "date": "2023-10-07T00:00:00Z", "followersCount": 700 }
]
```

## Testing

Run tests with:

```bash
npm install
npm test
```

The test suite covers:

- Complete 7-day range
- Only early/late points (outside range)
- Sparse entries (e.g., 1–3 points)
- Equal-distance fallbacks
- `METRIC_DAYS = 14` range validation

Tests are located in:

```ts
01-fill-missing-daily-metrics/__tests__/solution.spec.ts
```

And use helper utilities like:

```ts
createMetric(overrides?: Partial<Metric>): Metric
```

To generate consistent mock data.

## Bonus

- ✅ Configurable window size via `config.METRIC_DAYS`
- ✅ Modular and typed helper functions
- ✅ Comprehensive Jest test suite
- ✅ Efficient implementation (single-pass with lookahead)
