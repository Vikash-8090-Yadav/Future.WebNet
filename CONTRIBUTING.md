# Contributing Guidelines📝

This documentation contains a set of guidelines to help you during the contribution process.
# How to Contribute
Here are the steps you should follow to contribute to this repo.

## Step 1 : Find an issue

- Take a look at the Existing Issues 
#### Create new Issue
![NEW ISSUE](https://user-images.githubusercontent.com/95535448/190171896-103749a0-f622-4c45-a042-62651620dd87.png)

- You can create your own Issues too
- Wait for the Issue to be assigned to you after which you can start working on it.

## Step 2 : Fork the Project


![Screenshot 2022-09-14 191244](https://user-images.githubusercontent.com/95535448/190172005-e975a53a-0dbd-439a-8fe7-bc283840e4c4.png)

- Fork this Repository. This will create a Local Copy of this Repository on your Github Profile. Keep a reference to the original project in `upstream` remote.

```
$ git clone https://github.com/<your_user_name>/Future.WebNet.git
$ cd Future.WebNet
$ git remote add upstream https://github.com/Vikash-8090-Yadav/Future.WebNet.git 
```

- If you have already forked the project, update your copy before working.

```
$ git remote update
$ git checkout <branch-name>
$ git rebase upstream/<branch-name>
```

## Step 3 : Branch

Create a new branch. Use its name to identify the issue your addressing.

```
# It will create a new branch with name Branch_Name and switch to that branch
$ git checkout -b branch_name
```

## Step 4 : Work on the issue assigned

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made changes or made your contribution to the project add changes to the branch you've just created by:

```
# To add all new files to branch Branch_Name
$ git add .
```

## Step 5 : Commit

- To commit give a descriptive message for the convenience of reveiwer by:

```
# This message get associated with all files you have changed
$ git commit -m 'message
```

## Step 6 : Work Remotely

- Now you are ready to your work to the remote repository.
- When your work is ready and complies with the project conventions, upload your changes to your fork:

```
# To push your work to your remote repository
$ git push -u origin Branch_Name
```

## Step 7 : Pull Request

Go to your repository in browser and click on compare and pull requests. Then add a title and description to your pull request that explains your contribution.

 **Woohoo!** You have made a PR to the Future.WebNet Repo :boom: . Wait for your submission to be accepted and your PR to be merged.

## Need more help?🤔

You can refer to the following articles on basics of Git and Github and also contact the Project Mentors, in case you are stuck:

- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://lab.github.com/githubtraining/introduction-to-github)

**Thank you for your interest in contributing to our Repository.**
