import { fillMissingMetrics, MS_PER_DAY } from '../solution';
import { config } from '../config';
import { Metric } from '../types';

function buildExpectedDates(days: number, today: number): number[] {
  return Array.from({ length: days }, (_, i) => today - (days - 1 - i) * MS_PER_DAY);
}

export function createMetric(overrides: Partial<Metric> = {}): Metric {
  return {
    date: Date.now(),
    averageLikesCount: 100,
    followersCount: 2000,
    averageEngagementRate: 0.1,
    ...overrides,
  };
}

describe('fillMissingMetrics with METRIC_DAYS = 7', () => {
  let today: number;
  let expectedDates: number[];

  beforeEach(() => {
    config.METRIC_DAYS = 7;
    today = new Date().setUTCHours(0, 0, 0, 0);
    expectedDates = buildExpectedDates(config.METRIC_DAYS, today);
  });

  describe('when input contains complete metrics in the range', () => {
    it('should return the input unchanged', () => {
      const completeMetrics = expectedDates.map((date, i) =>
        createMetric({
          date,
          followersCount: 1000 + i * 100,
        })
      );

      const expected = expectedDates.map((date, i) => ({ ...completeMetrics[i], date: date }));

      const result = fillMissingMetrics(completeMetrics);
      expect(result).toEqual(expected);
    });
  });

  describe('when input only contains two metrics outside the range', () => {
    it('should fallback to nearest metric for each day', () => {
      const earlyMetric = createMetric({
        date: expectedDates[0] - MS_PER_DAY,
        followersCount: 100,
      });
      const lateMetric = createMetric({ date: expectedDates[6] + MS_PER_DAY, followersCount: 700 });

      const expected = expectedDates.map((date, i) => ({
        ...(i < 4 ? earlyMetric : lateMetric),
        date,
      }));

      const result = fillMissingMetrics([earlyMetric, lateMetric]);
      expect(result).toEqual(expected);
    });
  });

  describe('when input only contains three metrics in the range', () => {
    it('should fallback to nearest metric only for missing dates', () => {
      const earlyMetric = createMetric({ date: expectedDates[1], followersCount: 100 });
      const middleMetric = createMetric({ date: expectedDates[3], followersCount: 300 });
      const lateMetric = createMetric({ date: expectedDates[6], followersCount: 700 });

      const expected = [
        { ...earlyMetric, date: expectedDates[0] },
        { ...earlyMetric, date: expectedDates[1] },
        { ...earlyMetric, date: expectedDates[2] },
        { ...middleMetric, date: expectedDates[3] },
        { ...middleMetric, date: expectedDates[4] },
        { ...lateMetric, date: expectedDates[5] },
        { ...lateMetric, date: expectedDates[6] },
      ];

      const result = fillMissingMetrics([earlyMetric, middleMetric, lateMetric]);
      expect(result).toEqual(expected);
    });
  });
});

describe('fillMissingMetrics with METRIC_DAYS = 14', () => {
  let today: number;
  let expectedDates: number[];

  beforeEach(() => {
    config.METRIC_DAYS = 14;
    today = new Date().setUTCHours(0, 0, 0, 0);
    expectedDates = buildExpectedDates(config.METRIC_DAYS, today);
  });

  describe('when input contains complete metrics in the range', () => {
    it('should return the input unchanged', () => {
      const completeMetrics = expectedDates.map((date, i) =>
        createMetric({
          date,
          followersCount: 1000 + i * 100,
        })
      );

      const expected = expectedDates.map((date, i) => ({ ...completeMetrics[i], date: date }));

      const result = fillMissingMetrics(completeMetrics);
      expect(result).toEqual(expected);
    });
  });

  describe('when input only contains two metrics outside the range', () => {
    it('should fallback to nearest metric for each day', () => {
      const earlyMetric = createMetric({
        date: expectedDates[0] - MS_PER_DAY,
        followersCount: 100,
      });
      const lateMetric = createMetric({
        date: expectedDates[13] + MS_PER_DAY,
        followersCount: 700,
      });

      const expected = expectedDates.map((date, i) => ({
        ...(i < 7 ? earlyMetric : lateMetric),
        date,
      }));

      const result = fillMissingMetrics([earlyMetric, lateMetric]);
      expect(result).toEqual(expected);
    });
  });

  describe('when input only contains three metrics in the range', () => {
    it('should fallback to nearest metric only for missing dates', () => {
      const earlyMetric = createMetric({ date: expectedDates[1], followersCount: 100 });
      const middleMetric = createMetric({ date: expectedDates[3], followersCount: 300 });
      const lateMetric = createMetric({ date: expectedDates[11], followersCount: 700 });

      const expected = [
        { ...earlyMetric, date: expectedDates[0] },
        { ...earlyMetric, date: expectedDates[1] },
        { ...earlyMetric, date: expectedDates[2] },
        { ...middleMetric, date: expectedDates[3] },
        { ...middleMetric, date: expectedDates[4] },
        { ...middleMetric, date: expectedDates[5] },
        { ...middleMetric, date: expectedDates[6] },
        { ...middleMetric, date: expectedDates[7] },
        { ...lateMetric, date: expectedDates[8] },
        { ...lateMetric, date: expectedDates[9] },
        { ...lateMetric, date: expectedDates[10] },
        { ...lateMetric, date: expectedDates[11] },
        { ...lateMetric, date: expectedDates[12] },
        { ...lateMetric, date: expectedDates[13] },
      ];

      const result = fillMissingMetrics([earlyMetric, middleMetric, lateMetric]);
      expect(result).toEqual(expected);
    });
  });
});
