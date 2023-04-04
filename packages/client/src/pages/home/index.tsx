import { MessageDto } from "@typekit/shared";
import { useEffect, useState } from "react";

import { getAll } from "../../services/messagesService";

export default function Home(): JSX.Element {
	const [[message], setMessages] = useState<MessageDto[]>([]);

	useEffect(() => {
		getAll().then(setMessages);
	}, []);

	return <>{message?.content ?? null}</>;
}
