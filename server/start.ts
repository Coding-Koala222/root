// Entry point that initializes dd-trace BEFORE any other module is imported.
// This is required because dd-trace monkey-patches Node.js built-ins (http,
// net, etc.) and must run before those modules are loaded. A dynamic import
// at the end guarantees the tracer is fully initialized before index.ts
// and its transitive dependencies execute.

import tracer from 'dd-trace';

if (process.env.DD_TRACE_ENABLED === 'true') {
  // DD_AGENT_HOST, DD_TRACE_AGENT_PORT, DD_ENV, DD_VERSION, DD_SITE are read
  // automatically from the environment by dd-trace.
  tracer.init({
    service: process.env.DD_SERVICE ?? 'root-game',
    logInjection: false,
  });
}

await import('./index.js');
