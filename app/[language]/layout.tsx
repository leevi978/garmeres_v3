import { Language, defaultLanguage, languages } from '@/types/language';
import { ReactNode } from 'react';
import RootLayout from '@/app/components/layout/root-layout';
import { generateStaticLanguageParams } from '../navigation/language';
import { getMenuItems } from '@/services/sanity-service';

export const generateStaticParams = generateStaticLanguageParams;

export const dynamicParams = true;

export default async function Layout({
	children,
	params: { language },
}: {
	children: ReactNode;
	params: { language: Language };
}) {
	const menuItems = await getMenuItems({ language });
	return (
		<RootLayout
			menuItems={menuItems}
			params={{
				language: languages.includes(language) ? language : defaultLanguage,
			}}
		>
			{children}
		</RootLayout>
	);
}
