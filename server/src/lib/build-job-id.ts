import crypto from "node:crypto";

export const buildJobId = (
	transactionId: string,
	name: string,
	payload?: unknown,
	dedupe = true,
) => {
	const nonce = dedupe
		? crypto
				.createHash("sha1")
				.update(JSON.stringify(payload ?? ""))
				.digest("hex")
		: crypto.randomUUID();
	return `${transactionId}:${name}:${nonce}`;
};
