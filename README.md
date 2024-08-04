# Garmeres website

This is the source code for the Garmeres website, hosted by [Vercel](https://vercel.com) at https://garmeres.com.

The project is written in [TypeScript](https://www.typescriptlang.org/) and built with [Next.js](https://nextjs.org/docs), a [React](https://react.dev/) based frontend framework. It is styled using [TailwindCSS](https://tailwindcss.com/) and linted using [ESLint](https://eslint.org/).

[Sanity](https://sanity.io) is used as a headless content management system, and is integrated using [next-sanity](https://www.sanity.io/plugins/next-sanity) and the following guides:

- [Document internationalization](https://www.sanity.io/plugins/document-internationalization)
- [Visual editing](https://www.sanity.io/docs/visual-editing?utm_source=github&utm_medium=readme&utm_campaign=next-sanity)
- [Block content and portable text](https://www.sanity.io/docs/block-content)
- [Embed Sanity studio](https://github.com/sanity-io/next-sanity?tab=readme-ov-file#embedded-sanity-studio)

## System requirements

To work on this repo locally, you need to install the following on your machine:

- [Git](https://git-scm.com/downloads) - this readme assumes Git is properly installed and authenticated on your machine
- [Node.js v20 or later](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- An IDE of your choice. [Visual Studio Code](https://code.visualstudio.com/) is a good free option
- If you are using VSCode - the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension is quite useful for formatting. See [this tutorial](https://scottsauber.com/2017/06/10/prettier-format-on-save-never-worry-about-formatting-javascript-again/) to set up auto formatting on save.

## Getting Started

### Clone and open the project

Open your machines terminal or command line. Next, clone this repository using **Git** by running the following command:

```
git clone https://github.com/leevi978/garmeres_v3.git
```

Open the repository folder with **Visual Studio Code**. For simplicity, you may want to run the rest of the commands from a VSCode terminal. That way you can the the code as well as the terminal at the same time.

You may also want to ensure auto formatting on save is enabled in VSCode. See the link in **System requirements** for a tutorial.

### Get access to Sanity

[Sanity](https://sanity.io) is a third-party service that stores the website content. In order to build this website locally, you need a **Sanity API read token**. There are two ways to get this token:

1. Ask someone who might have this token available. This can be an administrator of Garmeres' Sanity project, or another person who has already setup this repo locally.

2. Get access to the Garmeres prioject in Sanity by asking someone with access to invite you. Go to https://sanity.io -> _Manage projects_ -> _Garmeres_ -> _API_ -> _Tokens_ -> _Add API token_. Give the token a name, and make it a _viewer_ token.

### Set up local environment variables

Create a file in the project root folder called `.env` and paste the following environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=a75rine5
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
NEXT_PUBLIC_GTAG=
NEXT_PUBLIC_GTM_ID=
SANITY_HOOK_SECRET=
```

Populate the variable called `SANITY_API_READ_TOKEN` with the token received from the previous step. You should be able to leave the rest of it blank for now.

#### Why do we do this?

The Sanity API token is secret, meaning that we do not want to push it to Github. We have a file called `.gitignore`, in which `.env` is listed. This makes it so all the environment variables are kept outside of git, and never leaked to the public internet.

### Install dependencies

Install third-party dependencies using **NPM** by running the following command from the project root:

```
npm install
```

### Running dev server

Run the dev server locally by running the following command from the project root:

```
npm run dev
```

This will start a local dev server - that is, a server that immediately updates the rendered page after a code edit. This is convenient during development, to see how the website changes as you go.

### Running local production build

To build the complete website, as it would in production, run the following command from the project root:

```
npm run build
```

Once the build completes, run the local production server using the following command:

```
npm run serve
```

Note that the local production server does not have live updates as the source code changes. To see a code change, you need to build again.

## Contributing

The `main` branch is protected, meaning you need to create a pull request, which must be approved before you can publish any changes.

### Create a new branch

To begin making changes, create a new branch that is up to date with the `main` branch. This guide assumes you are starting from a blank canvas, and that you have no local changes you want to keep.

First, stash any local changes you have to start from scratch

```
git add . && git stash
```

Next, pull the latest changes from `main`

```
git checkout main
git pull
```

Lastly, create a new local branch

```
git checkout -b <BRANCH NAME>
```

### Make code changes

When you have checked out a local branch, make any code changes in your local copy of the source code.

When you are done, you can see the status of your changed files using

```
git status
```

Red files means that the changes are unstaged. Green means that the changes to that file are staged for commit.

### Staging for commit

In order to save your local file changes to your branch's remote git history, they first need to be staged for commit. In git, a **commit** is considered one unit of change, and may contain changes to one or multiple files. See [Git documentation](https://git-scm.com/doc) for a more detailed introduction to Git concepts.

To stage a file change for commit, use the following command

```
git add <FILENAME>
```

Or, to stage all local file changes, run the following command

```
git add .
```

Now, if you run `git status`, the files you staged for commit should be green.

### Commit your staged files

Once you have staged the file changes you want to commit to the git history of your local branch, commit them by running the following command:

```
git commit -m "<COMMIT MESSAGE>"
```

The commit message should be a short description of the unit of change that has been made. For example, if the file changes changed the layout of the "about us" page, the commit message would say something like "Changed the layout of about-us page".

### Push your local branch to remote

So far all of your changes are locally on your own machine. If you want to publish them to the Github repository, you need to push your local branch, meaning that the git history in your local branch is synchronized to its remote counterpart on the internet.

If it is the first time the branch is pushed, run the following command

```
git push --set-upstream origin <BRANCH NAME>
```

If it is not the first time, it is enough to run

```
git push
```

By doing so, your branch will be uploaded to Github and the code will be available for the public to see on Github. Don't worry, the changes aren't visible on the website yet.

**Note:** It is only commited changes that are pushed. Any unstaged and uncommited file changes will remain on your local machine only.

### Create pull request

So far your changes are on its own branch. The code is public, but the changes are not published to the website. To publish your changes, you must create a pull request from your branch into the `main` branch.

The `main` branch is our default branch, and the version of the code that is automatically built and published to the website when changed. It is illegal to push directly from a local machine into `main`, so to make changes you must do it through a pull request.

A pull request is a change proposal, where you propose to add the changes made in a given branch, onto a different branch.

You can create a pull request by going into the [pull request secrion of this repository](https://github.com/leevi978/garmeres_v3/pulls), and clicking _Create pull request_. If you just recently pushed your branch to remote, you will get a pop-up option to immediately create a pull-request into main for it.

Save your pull request, and ask another contributor to approve it. Once it is approved, you are free to merge it into main, at which point it will be published on the website.

**Note:** Take a look at the automatically built preview before merging, just to make sure everything looks the way you expect it to.

## Third party services used

### Content management system (CMS)

This website uses [Sanity](https://sanity.io) as a headless CMS, meaning that it is used to managed content only, while the rendered HTML code is created in this repository.

To get access to the Garmeres project in Sanity, ask your system administrator to send you an invite.

### Hosting provider

This website is hosted using the free tier plan of [Vercel](https://vercel.com). The Garmeres project in Vercel has been integrated with this Github repository, meaning that the `main` branch is automatically built and deployed to https://garmeres.com upon update.

Furthermore, Vercel has a Github bot that automatically creates a preview of every pull-request branch, and comments a link to it in the pull request. If the build fails, merging the PR will not be permitted.

Because we are using the free tier of Vercel, the Github repository must be a public personal repository, and only a single user may have access to the Vercel project. This must always be the user connected to the Github account that owns the repository.

### Domain provider

We are using [Domeneshop](https://domeneshop.no) as domain provider for this website, with the following DNS-records:

```
*.garmeres.com -> 76.76.21.21 (Vercel load balancer)
garmeres.com -> 76.76.21.21 (Vercel load balancer)
www.garmeres.com -> cname.vercel-dns.com
```

The domain points to the Vercel load balancer, which forwards traffic based on configuration in Vercel.

Access credentials to Domeneshop should be stored as a password in Balve. Ask your system administrator to share it with you.

### AWS

While this website isn't directly hosted by [AWS](https://console.aws.amazon.com/console), there is a calendar component that retrieves a list of upcoming events from a Cloudfront distribution that is owned by the Garmeres AWS account, and hosted at `https://events.api.garmeres.com`.

The AWS account is secured by 2-factor, and currently only the system administrator has access. If you need to make changes or access AWS, ask the system administrator to setup an account for you.

## Learn More

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Sanity

To learn more about Sanity and its integration with Next.js, take a look at:

- [Sanity documentation](https://www.sanity.io/docs)
- [next-sanity documentation](https://github.com/sanity-io/next-sanity)
