import { deleteDocumentsOfType } from './client/sanity';

async function run() {
    await deleteDocumentsOfType('blog-post');
}

run();
