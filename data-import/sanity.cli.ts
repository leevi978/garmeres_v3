import { defineCliConfig } from '@sanity/cli';
import dotenv from 'dotenv';

dotenv.config();

export default defineCliConfig({
    api: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
    },
});
