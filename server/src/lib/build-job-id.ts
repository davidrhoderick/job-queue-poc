import crypto from "node:crypto";

export const safePart = (s: string) => s.replace(/[:]/g, "-"); // sanitize just in case

export const buildJobId = (
	transactionId: string,
	name: string,
	payload?: unknown,
	dedupe = true,
) => {
	const base = `${safePart(transactionId)}__${safePart(name)}`;
	if (!dedupe) return `${base}__${crypto.randomUUID()}`;
	const h = crypto
		.createHash("sha1")
		.update(JSON.stringify(payload ?? ""))
		.digest("hex");
	return `${base}__${h}`;
};
