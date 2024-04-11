# Contribution Guidelines

We would love for you to contribute to this project.
As a contributor, here are the guidelines we would like you to follow 👇

### Be Kind - Code of Conduct

Please, read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to help us keep this project open and inclusive.

### Found a bug? Want a feature? - Submit an Issue

[Choose an issue template](https://github.com/qwikifiers/qwik-ui/issues/new/choose) to file a bug report / feature request.

## Ready to contribute a Pull Request (PR)?

### 1. Make sure you aren't duplicating someone else's efforts.

- [Look out for existing PRs](https://github.com/qwikifiers/qwik-ui/pulls)

### 2. Make sure your idea is the right way to solve the issue.

[Look out for existing issues](https://github.com/qwikifiers/qwik-ui/issues) that may describe the problem you're fixing, or document the design for the feature you'd like to add.

Please, consider [creating an issue](https://github.com/qwikifiers/qwik-ui/issues/new) if you can't find anything.

Discussing the design up front helps to ensure that we're ready to accept your work.

### 3. Fork this repo and create a branch.

- Hit the "Fork" button (top-right of the github repository).

![image](https://user-images.githubusercontent.com/1430726/95460679-ec014400-097d-11eb-9a7a-93e0262d37d9.png)

- git clone your fork

```shell
git clone YOUR_FORK_URL
```

Get your URL by from here 👇

![image](https://user-images.githubusercontent.com/1430726/95461173-94afa380-097e-11eb-9568-dc986e050de6.png)

- Create a new branch locally in your fork's repo

```shell
git checkout -b pr-my-fix-branch main
```

### 4. Run the library

- From the root of the project run the install script:

```shell
pnpm install
```

- Then run the dev script to get the qwik-ui documentation site in dev mode:

```shell
pnpm dev
```

- Visit the URL printed in the console and you'll have a page opened with the suite of widgets.

- Once you made some changes in either package (`headless` or `styled`) or the documentation website (`apps/website`), you will see them immediately reflected on the page.

- Alternitavely, if your only goal is to add a new component, or add new tests to an already exisiting component, you can run the component test server for significant speed gains:

```shell
pnpm dev.ct
```

- This mode is a lot more barebones and requires more background knowledge to use effectively, so keep the folling things in mind:

- 1. Familirize yourself with the following directory structure:

```shell
apps/website/src/routes/docs/[KIT]/[COMPONENT]/examples/
```

- This is the _only place_ where you can add files. So if you wanted to add a select component to the headless kit, you would add all your files to this directory: apps/website/src/routes/docs/headless/select/examples/hero.tsx

- 2. Follow the component test server's URL structure
- The default message on the "home page" of the dev server is a reminder of how to use the address bar to actually view the file you want. By default it would have this structure:

```shell
http://localhost:5173/[KIT]/[COMPONENT]/[EXAMPLE]
```

- So if you wanted to see the hero example for the headless select you would go here:

```shell
http://localhost:5173/headless/select/hero/
```

Below is a list of other commands that you might find useful:

- Build the qwik-ui documentation:

```shell
pnpm build
```

- Preview of the qwik-ui documentation (no HMR):

```shell
pnpm preview
```

- Build the Cloudfare version of the qwik-ui documentation

```shell
pnpm build.cloudflare
```

- Preview the Cloudfare build of the qwik-ui documentation (no HMR)

```shell
pnpm preview.cloudflare
```

### 5. Make sure you add / modify tests

Run either command to make sure there aren't any errors.

```shell
pnpm test.headless --skip-nx-cache
```

This will set up the Cypress component testing GUI. Please refer to official Cypress [documentation](https://docs.cypress.io/guides/overview/why-cypress) for further assistance.

### 6. Added a "changeset"

**6.1.** Run the following command to create a changeset:

```shell
pnpm change
```

**6.2.** Choose the packages that should be included in the changeset

**6.3** Choose the specific packages for each type of change

(hit `Enter` if you need to skip to the next option)

- `major` for breaking changes
- `minor` for new features
- `patch` for bug fixes

**6.4.** Prefix your change title with one of these:

- `FEAT:` or `feat:` for features
- `FIX:` or `fix:` for bug fixes
- `DOCS` or `docs:` for documentation

**6.5.** Modify the created MD file

After the `change` command runs, a new MD file will be created under the `.changeset` folder.
ד
Please modify this file to include a descriptive message of the changes you made.

You can even add code examples if you need do, to describe a new feature for example. (pun intended 😉)

The prefix and this elaborated description will be used to create the changelog files and release notes, so please give them love. 💗😊

---

#### ❓ "What if my PR is not a significant change?"

If you made small changes like fixing typos, CI config, prettier, etc, you can run `pnpm change add --empty` to generate an empty changeset file to document
your changes.

---

### 7. Commit and push your branch to GitHub:

```shell
git commit -m "Your descriptive message of the change"
git push origin pr-my-fix-branch
```

### 8. Create a PR

In GitHub, create a pull request for `qwikifiers/qwik-ui:main`.

Make sure you check the following checkbox "Allow edits from maintainers" -

![image](https://user-images.githubusercontent.com/1430726/95461503-fbcd5800-097e-11eb-9b55-321d1ff0e6bb.png)

#### If you need to update your PR for some reason

- Make the required updates.

- Re-run the tests to ensure tests are still passing:

```shell
pnpm test.headless --skip-nx-cache
```

- Merge the `main` branch if your branch is out of date

  ```shell
  git merge main
  git push
  ```

### 9. Sign the CLA

You will be asked to sign a [CLA (Contributor License Agreement)](/CLA.md) as part of the PR process, if you haven't already signed it.

Simply submit a comment on your PR with the following text:

```
I have read the CLA Document and I hereby sign the CLA
```

The CLA assistant will automatically add your signature [here](/cla-signs/v1/cla.json) and push a commit to the main branch.

### 10. After your PR is merged - delete your branches

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete pr-my-fix-branch
  ```

- Check out the `main` branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D pr-my-fix-branch
  ```

- Update your `main` with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```

### 11. That's it! Thank you for your contribution! 🙏💓

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

## Running in your own app

Sometimes you may not face an issue after running the build process, but your consumer app still might.

When that is the case, you can use npm linking to link your own app to your forked version of qwik-ui.

### 1. Link your fork

Inside the root of **your qwik-ui branch** run:

```
pnpm link.dist
```

### 2. Link your app

Inside the root of **your project** run:

```
pnpm install
pnpm link --global @qwik-ui/headless
```
