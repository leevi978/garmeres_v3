'use client';

import { Language } from '@/types/language';
import { usePathname } from 'next/navigation';
import { getPageBySlug } from '@/app/actions/get-background-attribution';
import { useEffect, useState } from 'react';

export default function BackgroundAttribution({
	language,
}: {
	language: Language;
}) {
	const pathname = usePathname();
	const slug = pathname.split('/').at(-1);
	const [attribution, setAttribution] = useState<string | undefined>(undefined);
	useEffect(() => {
		if (slug) {
			getPageBySlug({ language, slug }).then((page) => {
				if (page?.backgroundImage?.attribution) {
					setAttribution(page.backgroundImage.attribution);
				}
			});
		}
	}, [pathname]);
	return <p>{attribution}</p>;
}
