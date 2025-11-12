# Job Queue POC

## Overview
This repository is a proof of concept that demonstrates how a React front end can drive long-running workflows through a GraphQL API that hands work off to BullMQ and a dedicated worker. The React Router client (with Apollo Client) issues mutations for each underwriting step, the GraphQL Yoga server translates those requests into BullMQ jobs backed by Redis, and a BullMQ worker simulates the slow operations until results flow back to the UI through a polling `submissionStatus` query.

## Prerequisites and Local Setup
Requirements:
- Node.js 20+ and npm
- Docker Desktop (or another Docker host) so Redis can run locally

Steps:
1. Install dependencies: `npm install`
2. Start the development stack: `npm run dev`
   - The root `dev` script runs four processes concurrently: the React Router dev server, the GraphQL Yoga server (`npm run dev:yoga -w server`), a Redis container (`npm run dev:redis -w server` which executes `docker run -p 6379:6379 redis`), and the BullMQ worker (`npm run dev:worker -w server`).
   - Visit `http://localhost:5173` for the UI and `http://localhost:3000/graphql` for the Yoga GraphQL endpoint. The Redis container stops when you terminate the dev script; rerun `npm run dev:redis -w server` if you want it running independently.

## Architecture and File Structure
Data flow:
1. The React Router page in `app/routes/home.tsx` renders multi-step forms (`CreateQualificationForm`, `UpdateAnswersForm`, `UpdateLocationsForm`, `FinalReview`). Each form fires a GraphQL mutation defined via the generated `~/gql` helpers.
2. GraphQL resolvers in `server/src/schema/submissionQueue/resolvers/**` validate the input, build deterministic BullMQ job IDs (`server/src/lib/build-job-id.ts`), enqueue work on the `submissions` queue (`server/src/lib/submissions-queue.ts`), and return an initial `SubmissionStatus`.
3. The BullMQ worker (`server/src/lib/submissions-worker.ts`) consumes those jobs. It locks on the transaction ID so only one job per submission is handled at a time, introduces artificial delays to mimic real services, and resolves with synthetic policy data or a calculated premium.
4. The UI polls `submissionStatus` (defined in `server/src/schema/submissionQueue/schema.graphql` and implemented via `server/src/lib/job-status.ts`) to know when work is queued, running, failed, or finished. Completed jobs stream their payload back to the client, which advances the workflow to the next step.

Key directories:
```
app/                      React Router + Apollo client code
  components/             Form steps that call GraphQL mutations
  routes/home.tsx         Orchestrates the end-to-end flow and status polling
  gql/                    Generated hooks and types from graphql-codegen
server/
  src/server.ts           Minimal GraphQL Yoga HTTP server
  src/lib/
    submissions-queue.ts  Queue configuration, Redis connection, helper utilities
    submissions-worker.ts Long-running job handlers invoked by BullMQ Worker
    job-status.ts         Maps BullMQ state to the SubmissionStatus GraphQL type
    build-job-id.ts       Consistent job ID generation & dedupe helpers
  src/schema/
    submissionQueue/      SDL + resolvers for queue-related queries/mutations
  src/generated/          Codegen output (typeDefs, resolvers, TypeScript types)
codegen.ts                Root GraphQL Code Generator config for the client
server/codegen.ts         Server-side GraphQL Code Generator config
```

With this structure you can swap the fake delays and data builders for real downstream services while keeping the same contract between the React client, GraphQL API, and BullMQ job execution pipeline.
