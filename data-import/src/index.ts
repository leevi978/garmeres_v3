import { getTranslatedBlogPosts } from './client/storyblok';
import { transformTranslatedBlogPost } from './transform';
import { mkdir, writeJsonFile, writeNdjsonFile } from './utils';

async function run() {
	const stories = await getTranslatedBlogPosts();
	mkdir('data');
	await writeJsonFile('./data/blog-posts.json', stories);
	const output = stories.flatMap((story) => transformTranslatedBlogPost(story));
	await writeNdjsonFile('./data/output.ndjson', output);
}

run();
