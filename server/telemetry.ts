// Thin wrapper around dd-trace's DogStatsD client for custom game metrics.
// All helpers are no-ops unless DD_TRACE_ENABLED=true, so the server runs
// fine without a Datadog agent.

import tracer from 'dd-trace';

const enabled = process.env.DD_TRACE_ENABLED === 'true';

function t(obj?: Record<string, string | number>): string[] {
  if (!obj) return [];
  return Object.entries(obj).map(([k, v]) => `${k}:${v}`);
}

export const metrics = {
  increment(name: string, tags?: Record<string, string | number>): void {
    if (enabled) tracer.dogstatsd.increment(name, 1, t(tags));
  },
  decrement(name: string, tags?: Record<string, string | number>): void {
    if (enabled) tracer.dogstatsd.decrement(name, 1, t(tags));
  },
  gauge(name: string, value: number, tags?: Record<string, string | number>): void {
    if (enabled) tracer.dogstatsd.gauge(name, value, t(tags));
  },
  histogram(name: string, value: number, tags?: Record<string, string | number>): void {
    if (enabled) tracer.dogstatsd.histogram(name, value, t(tags));
  },
};
