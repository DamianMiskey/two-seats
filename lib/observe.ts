import "server-only";
import { SpanStatusCode, trace, type Attributes } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import { after } from "next/server";

// Small helpers for our own spans and logs. When telemetry is off
// (production, or no keys) the OpenTelemetry API is a no-op, so these cost
// nothing and logs still go to the console as before.

const tracer = trace.getTracer("two-seats");
const logger = logs.getLogger("two-seats");

/** Runs fn inside a named span; records errors and always ends the span. */
export function withSpan<T>(name: string, attributes: Attributes, fn: (setAttributes: (a: Attributes) => void) => Promise<T>): Promise<T> {
  return tracer.startActiveSpan(name, { attributes }, async (span) => {
    try {
      return await fn((a) => span.setAttributes(a));
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: (error as Error)?.message });
      throw error;
    } finally {
      span.end();
    }
  });
}

const SEVERITY = {
  info: SeverityNumber.INFO,
  warn: SeverityNumber.WARN,
  error: SeverityNumber.ERROR,
} as const;

/** A structured log: to the console, and to Coralogix (linked to the current trace). */
export function log(level: keyof typeof SEVERITY, message: string, attributes: Attributes = {}, error?: unknown) {
  const attrs: Attributes = { ...attributes };
  if (error instanceof Error) {
    attrs["exception.type"] = error.name;
    attrs["exception.message"] = error.message;
    if (error.stack) attrs["exception.stacktrace"] = error.stack;
  }
  console[level](message, attrs);
  logger.emit({ severityNumber: SEVERITY[level], severityText: level.toUpperCase(), body: message, attributes: attrs });
  flushLogsAfterResponse();
}

// Serverless functions can freeze as soon as the response is sent, so ask
// Next to flush pending logs once it is. Outside a request (build, startup)
// `after` throws, and the batch processor's own timer flushes instead.
function flushLogsAfterResponse() {
  const provider = logs.getLoggerProvider() as { forceFlush?: () => Promise<void> };
  if (typeof provider.forceFlush !== "function") return;
  try {
    after(() => provider.forceFlush?.());
  } catch {
    /* not in a request scope */
  }
}
