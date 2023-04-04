import { MessageDto } from "@typekit/shared";

export const getAll = async (): Promise<MessageDto[]> => {
	const res = await fetch("/api/messages");
	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}
	return res.json();
};
