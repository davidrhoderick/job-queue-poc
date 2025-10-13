import { getQuoteJobsDb } from "@/lib/couch";

type QuoteJobDoc = {
  _id: string;
  _rev: string;
  type: "quote_job";
  status: "queued" | "processing" | "succeeded" | "failed";
  quoteId: string;
  payload: Record<string, unknown> | null;
  attempts: number;
  error?: { message: string; code?: string; details?: unknown } | null;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  finishedAt?: string;
};

export async function processQuoteJob(jobId: string): Promise<void> {
  // Load job
  const job = (await couchDb.get(jobId)) as QuoteJobDoc;
  if (job.type !== "quote_job") throw new Error("Invalid job type");

  // Transition to processing
  job.status = "processing";
  job.startedAt = new Date().toISOString();
  job.updatedAt = job.startedAt;
  await couchDb.insert(job);

  try {
    // Do service API calls here (network requests, computation, etc.)
    // Example: await externalService.generateQuote(job.quoteId, job.payload);

    // On success
    const refreshed = (await couchDb.get(jobId)) as QuoteJobDoc;
    refreshed.status = "succeeded";
    refreshed.error = null;
    refreshed.finishedAt = new Date().toISOString();
    refreshed.updatedAt = refreshed.finishedAt;
    await couchDb.insert(refreshed);
  } catch (err: any) {

    if(attempts < 3) {
      processQuotejob(jobId)
    }
    // On failure: capture error details; increment attempts
    const refreshed = (await couchDb.get(jobId)) as QuoteJobDoc;
    refreshed.status = "failed";
    refreshed.attempts = (refreshed.attempts ?? 0) + 1;
    refreshed.error = {
      message: err?.message ?? "Unknown error",
      code: err?.code,
      details: err,
    };
    refreshed.finishedAt = new Date().toISOString();
    refreshed.updatedAt = refreshed.finishedAt;
    await couchDb.insert(refreshed);

    // Re-throw or swallow depending on your worker strategy
    // throw err;
  }
}