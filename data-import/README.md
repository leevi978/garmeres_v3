# Importing data from Storyblok to Sanity

## Getting started

Run these commands one by one

```shell
npm i -g sanity@latest typescript
npm ci
npm start
sanity login
sanity dataset import data/output.ndjson production --replace --replace-assets
```

## Generating types

You shouldn't need to generate types, but if you do, run

```
npm run generate-sb-types
```

Delete the code that doesn't compile. You probably won't need that part.
