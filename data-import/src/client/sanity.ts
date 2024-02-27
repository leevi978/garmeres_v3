import { LocalAsset, UploadedAsset } from 'src/types/common';
import { createClient } from '@sanity/client';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

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

export async function deleteDocumentsOfType(documentType: string) {
    try {
        const translations = await client.fetch(
            `*[_type == "translation.metadata" && "${documentType}" in schemaTypes]{_id}`
        );
        await Promise.all(
            translations.map(async (t: any) => {
                return client
                    .delete(t._id)
                    .then((_) => {
                        console.log(
                            `Deleted translation document with ID: ${t._id}`
                        );
                    })
                    .catch((error) => {
                        console.error(
                            'Error deleting translation document:',
                            error.message
                        );
                    });
            })
        );
        // Fetch all documents of the specified type
        const documents = await client.fetch(
            `*[_type == "${documentType}"]{_id}`
        );

        await Promise.all(
            documents.map((doc: any) => {
                return client
                    .delete(doc._id)
                    .then((_) => {
                        console.log(`Deleted document with ID: ${doc._id}`);
                    })
                    .catch((error) => {
                        console.error(
                            'Error deleting document:',
                            error.message
                        );
                    });
            })
        );
        console.log(`Deleted all documents of type ${documentType}`);
    } catch (error) {
        console.error('Error deleting documents:', error.message);
    }
}
