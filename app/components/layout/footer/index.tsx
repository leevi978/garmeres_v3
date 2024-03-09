import { Language } from '@/types/language';
import BackgroundAttribution from './background-attribution';

export default function Footer({ language }: { language: Language }) {
	return (
		<footer className='flex flex-col justify-center bg-zinc-800 py-6 px-8 text-white z-10'>
			<BackgroundAttribution language={language} />
		</footer>
	);
}
