import { uploadAssets } from './client/sanity';
import {
    fetchStoryblokAssets,
    getAllBlogPostAssets,
    getTranslatedBlogPosts,
} from './client/storyblok';
import { transformTranslatedBlogPost, uploadedAssetMap } from './transform';
import { mkdir, writeJsonFile, writeNdjsonFile } from './utils';

async function run() {
    const stories = await getTranslatedBlogPosts();
    mkdir('data');
    await writeJsonFile('./data/blog-posts.json', stories);
    const storyblokAssets = getAllBlogPostAssets(stories);
    const localAssets = await fetchStoryblokAssets(storyblokAssets);
    const uploadedAssets = await uploadAssets(localAssets);
    const uaMap = uploadedAssetMap(uploadedAssets);
    await writeJsonFile('./data/uploaded-assets-map.json', uaMap);
    const output = stories.flatMap((story) =>
        transformTranslatedBlogPost(story)
    );
    await writeNdjsonFile('./data/output.ndjson', output);
}

run();
