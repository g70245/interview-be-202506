import { Metric } from './types';
import { config } from './config';

const MS_PER_DAY = 86400 * 1000;

/**
 * Returns the absolute difference in milliseconds between two UTC midnight timestamps.
 *
 * @param targetDate - UTC midnight timestamp (in milliseconds)
 * @param baseDate - UTC midnight timestamp (in milliseconds)
 * @returns Absolute time difference in milliseconds
 */
function diffBetweenTimestamps(targetDate: number, baseDate: number): number {
  return Math.abs(targetDate - baseDate);
}

/**
 * Computes the UTC midnight timestamp for a given index in a fixed-length date range.
 *
 * The range covers METRIC_DAYS consecutive days ending at the specified `today` timestamp (inclusive).
 * Index 0 corresponds to the earliest day in the range (the first day),
 * and index (METRIC_DAYS - 1) corresponds to `today` itself.
 *
 * @param index - Zero-based index within the metric range
 * @param today - UTC midnight timestamp (in milliseconds), representing the latest date in the range
 * @returns UTC midnight timestamp (in milliseconds) for the indexed day
 */
function getMetricDateByIndex(index: number, today: number): number {
  return today - (config.METRIC_DAYS - 1 - index) * MS_PER_DAY;
}

/**
 * Fills in missing metrics to ensure complete data for the last 7 days
 *
 * @param data - Array of metric objects sorted by date in ascending order
 * @returns Array of metrics with exactly 7 days of data (from 6 days ago to today)
 */
function fillMissingMetrics(data: Metric[]): Metric[] {
  const today = new Date().setUTCHours(0, 0, 0, 0);
  const result = new Array<Metric>(config.METRIC_DAYS);

  let scanIndex = 0;

  for (let i = 0; i < result.length; i++) {
    let targetDate = getMetricDateByIndex(i, today);

    while (scanIndex < data.length && data[scanIndex].date < targetDate) {
      scanIndex++;
    }

    let chosen: Metric;

    if (scanIndex === 0) {
      chosen = data[0];
    } else if (scanIndex === data.length) {
      chosen = data[scanIndex - 1];
    } else {
      const currDiff = diffBetweenTimestamps(data[scanIndex].date, targetDate);
      const prevDiff = diffBetweenTimestamps(data[scanIndex - 1].date, targetDate);

      chosen = currDiff >= prevDiff ? data[scanIndex - 1] : data[scanIndex];
    }

    result[i] = { ...chosen, date: targetDate };
  }

  return result;
}

export { fillMissingMetrics, MS_PER_DAY };
