import { LocalAsset, UploadedAsset } from 'src/types/common';
import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

export async function uploadAssets(assets: LocalAsset[]) {
    return Promise.all(
        assets.map(
            (asset) =>
                new Promise<UploadedAsset>((resolve, reject) => {
                    const file = fs.createReadStream(asset.filename);
                    const filename = asset.filename.split('/').at(-1);
                    const creditLine =
                        asset.storyblokAsset.copyright &&
                        asset.storyblokAsset.copyright !== ''
                            ? asset.storyblokAsset.copyright
                            : undefined;
                    const title =
                        asset.storyblokAsset.title &&
                        asset.storyblokAsset.title !== ''
                            ? asset.storyblokAsset.title
                            : undefined;
                    const description =
                        asset.storyblokAsset.alt &&
                        asset.storyblokAsset.alt !== ''
                            ? asset.storyblokAsset.alt
                            : undefined;
                    client.assets
                        .upload('image', file, {
                            filename,
                            creditLine,
                            title,
                            description,
                            tag: 'imported',
                        })
                        .then((sanityAssetDocument) => {
                            console.log(`File uploaded: ${filename}`);
                            resolve({
                                ...asset,
                                sanityAssetDocument,
                            });
                        })
                        .catch(reject)
                        .finally(function () {
                            file.close();
                        });
                })
        )
    );
}
