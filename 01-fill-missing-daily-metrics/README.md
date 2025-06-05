# 01 - Fill Missing Daily Metrics

Implements `fillMissingMetrics(data: Metric[]): Metric[]` to fill missing days in a time series. The result includes exactly `METRIC_DAYS` entries (default: 7), from N days ago up to today (inclusive), all aligned to UTC midnight.

## Metric Format

```ts
type Metric = {
  date: number; // UTC timestamp at 00:00:00Z
  averageLikesCount: number;
  followersCount: number;
  averageEngagementRate: number;
};
```

## Rules

- Generate a fixed date range: `[today - (N - 1), ..., today]`
- If a date is missing:
  - Use the nearest available metric
  - If tied, prefer the earlier (older) one
  - If all available dates are after or before the target, use the boundary
- Replace only the `date` field when copying

## Example

Input (2 metrics only):

```json
[
  { "date": "2023-10-02T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-07T00:00:00Z", "followersCount": 700 }
]
```

Output (`METRIC_DAYS = 7`):

```json
[
  { "date": "2023-10-01T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-02T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-03T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-04T00:00:00Z", "followersCount": 100 },
  { "date": "2023-10-05T00:00:00Z", "followersCount": 700 },
  { "date": "2023-10-06T00:00:00Z", "followersCount": 700 },
  { "date": "2023-10-07T00:00:00Z", "followersCount": 700 }
]
```

## Testing

Run with:

```bash
npm install
npm test
```

Test cases include:
- Complete and sparse input
- Equal-distance fallback logic
- Different values of `METRIC_DAYS`

## Notes

- Configurable via `config.METRIC_DAYS`
- Efficient single-pass scan
- Typed, modular, and test-covered
