import { OTLPHttpProtoTraceExporter, registerOTel } from "@vercel/otel";
import { serverTelemetry } from "./lib/telemetry-config";

// OpenTelemetry for the server, exported straight to Coralogix over OTLP/HTTP.
// Next.js already creates spans for each request, render and fetch (so
// Sanity calls appear without extra code); lib/observe.ts adds our own.
// Does nothing unless CX_SEND_KEY and CX_DOMAIN are set, and never in production.
export async function register() {
  const cx = serverTelemetry();
  if (!cx) return;

  // Logs use the Node exporter, so only load it in the Node.js runtime.
  let logRecordProcessors;
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { BatchLogRecordProcessor } = await import("@opentelemetry/sdk-logs");
    const { OTLPLogExporter } = await import("@opentelemetry/exporter-logs-otlp-http");
    logRecordProcessors = [
      new BatchLogRecordProcessor({ exporter: new OTLPLogExporter({ url: `${cx.endpoint}/v1/logs`, headers: cx.headers }) }),
    ];
  }

  registerOTel({
    serviceName: "two-seats",
    attributes: {
      "deployment.environment.name": cx.environment,
      "cx.application.name": "two-seats",
      "cx.subsystem.name": cx.headers["CX-Subsystem-Name"],
    },
    traceExporter: new OTLPHttpProtoTraceExporter({ url: `${cx.endpoint}/v1/traces`, headers: cx.headers }),
    logRecordProcessors,
  });
}
