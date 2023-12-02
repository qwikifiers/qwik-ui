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
git checkout -b my-fix-branch main
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

- Once you made some changes in either package (`headless` or `fluffy`) or the documentation website (`apps/website`), you will see them immediately reflected on the page.

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
pnpm build.clouflare
```

- Preview the Cloudfare build of the qwik-ui documentation (no HMR)

```shell
pnpm preview.clouflare
```

### 5. Make sure you add / modify tests

Run either command to make sure there aren't any errors.

```shell
pnpm test.headless --skip-nx-cache
```

This will set up the Cypress component testing GUI. Please refer to official Cypress [documentation](https://docs.cypress.io/guides/overview/why-cypress) for further assistance.

### 6. Commit your changes using commitizen:

Instead of `git commit` use the following command:

```shell
pnpm commit
```

Or if you prefer to keep your git workflow, you can install commitizen globally:

```shell
pnpm install -g commitizen
```

And run it with:

```shell
git cz
```

It will then ask you a bunch of questions.

This will create a descriptive commit message that follows the
[Angular commit message convention](#commit-message-format).

This allows us to keep meaningful release notes / CHANGELOG automatically.

### 7. Push your branch to GitHub:

```shell
git push origin my-fix-branch
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

- Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

  ```shell
  git rebase main -i
  git push -f
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
  git push origin --delete my-fix-branch
  ```

- Check out the `main` branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
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
