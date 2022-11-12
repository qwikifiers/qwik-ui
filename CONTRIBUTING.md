# Contribution Guidelines

We would love for you to contribute to this project.
As a contributor, here are the guidelines we would like you to follow:

## Be Kind - Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to help us keep this project open and inclusive.

<br/>

## Found a bug? Want a feature? - Submit an Issue

[Choose an issue template](https://github.com/qwikifiers/qwik-ui/issues/new/choose) to file a bug report / feature request.

<br/>

## Ready to contribute a Pull Request (PR)?

<br/>

### ▶ 1. First - [Search this repo for existing PRs](https://github.com/qwikifiers/qwik-ui/pulls) !

Try to find an open or closed PR that relates to the change you want to introduce.

<br/>

### ▶ 2. **Before you start coding - [find](https://github.com/qwikifiers/qwik-ui/issues) / [create an issue](https://github.com/qwikifiers/qwik-ui/issues/new/choose)**

**Make sure there's an issue** describing the problem you're fixing, or documents the design for the feature you'd like to add.
Discussing the design up front helps to ensure that we're ready to accept your work.

**Don't waste your time working on code before you got a 👍 in an issue comment.**

<br/>

### ▶ 3. Fork the this repo and create a branch.

- Hit that "Fork" button above (in this repo's github page).

![image](https://user-images.githubusercontent.com/1430726/95460679-ec014400-097d-11eb-9a7a-93e0262d37d9.png)

- git clone your fork

`git clone YOUR_FORK_URL`

Get your url by from here 👇

![image](https://user-images.githubusercontent.com/1430726/95461173-94afa380-097e-11eb-9568-dc986e050de6.png)

- Create a new branch locally in your fork's repo

```shell
git checkout -b my-fix-branch master
```

<br/>

### ▶ 4. Run the storybook

- From the root of the project run `npm install`. 

- Then, in one terminal run `npm run dev --workspace=packages/core` and in another one run `npx nx storybook core`.

- After running `npx nx storybook core` visit the URL printed in the console and you'll have the Storybook opened with the suite of widgets.

- Once you made some changes to the `core` package, refresh the storybook tab in your browser to see the changes reflected.

### ▶ 5. Make sure you add / modify tests

Run `npm run test` to make sure there aren't any errors

<br/>

### ▶ 6. Commit your changes using commitizen:

Instead of `git commit` use the following command:

```shell
npm run commit
```

It will then ask you a bunch of questions.

This will create a descriptive commit message that follows the
[Angular commit message convention](#commit-message-format).

This is necessary to generate meaningful release notes / CHANGELOG automatically.

<br/>

### ▶ 7. Push your branch to GitHub:

```shell
git push origin my-fix-branch
```

### ▶ 8. Create a PR

In GitHub, create a pull request for `qwikifiers/qwik-ui:master`.

Make sure you check the following checkbox "Allow edits from maintainers" -

![image](https://user-images.githubusercontent.com/1430726/95461503-fbcd5800-097e-11eb-9b55-321d1ff0e6bb.png)

If you need to update your PR for some reason -

- Make the required updates.

- Re-run the tests to ensure tests are still passing `npm run test`

- Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

  ```shell
  git rebase master -i
  git push -f
  ```

<br/>

### ▶ 9. After your PR is merged - delete your branches

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

<br/>

### ▶ 10. That's it! Thank you for your contribution! 🙏💓

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
