import type { UseCaseError } from "@/core/errors/use-case-error";

export class NotAlowwedError extends Error implements UseCaseError {
	constructor() {
		super("Not allowed");
	}
}
