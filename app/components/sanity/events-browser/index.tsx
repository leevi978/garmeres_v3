import { Language } from '@/types/language';
import EventsBrowserInteractive from './events-browser-interactive';
import { getCalendarPage } from '@/services/events-service';

export default async function EventsBrowser({
	language,
}: {
	language: Language;
}) {
	const initialCalendarPage = await getCalendarPage(0);
	return (
		<EventsBrowserInteractive
			language={language}
			initialCalendarPage={initialCalendarPage}
		/>
	);
}
