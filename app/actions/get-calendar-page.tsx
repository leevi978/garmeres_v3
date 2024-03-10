'use server';
import { getCalendarPage as getData } from '@/services/events-service';

export async function getCalendarPage({ page }: { page?: number }) {
	return getData(page);
}
