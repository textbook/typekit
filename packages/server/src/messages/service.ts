export interface Message {
	content: string;
	created: Date;
}

export const getAll = (): Message[] => [
	{ content: "Hello, world!", created: new Date() },
];
