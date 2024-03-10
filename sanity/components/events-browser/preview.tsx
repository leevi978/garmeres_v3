import { PreviewProps } from 'sanity';

export default function EventsBrowserPreview(props: PreviewProps) {
	const { title } = props;
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				padding: '1em',
				justifyItems: 'center',
			}}
		>
			<span>{`Events browser - ${title}`}</span>
		</div>
	);
}
