import { CalendarEvent } from '@/services/events-service';
import { Language } from '@/types/language';
import DateIcon from './date-icon';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function CalendarEvent(
	props: CalendarEvent & { language: Language }
) {
	return (
		<Accordion>
			<AccordionSummary
				id='panel-header'
				aria-controls='panel-content'
				className='flex flex-row py-2 px-4'
			>
				<DateIcon
					language={props.language}
					datetimeIso={props.start}
				/>
				<div className='flex flex-col flex-grow'>
					<h2>{props.name}</h2>
				</div>
			</AccordionSummary>
			<AccordionDetails className='flex flex-col gap-4'>
				<p>{props.location}</p>
				<p>{props.description}</p>
			</AccordionDetails>
		</Accordion>
	);
}
