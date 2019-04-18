---
title: 常用git命令
date: 2019-04-15 09:27:23
tags: git
---

| 命令                        | 作用                                                          |
| --------------------------- | ------------------------------------------------------------- |
| git reset [commit]          | 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变 |
| git reset --hard            | 重置暂存区与工作区，与上一次 commit 保持一致                  |
| git add [file1] ...         | 添加指定文件到暂存区                                          |
| git add [dir]               | 添加指定目录到暂存区，包括子目录                              |
| git rm [file1] ...          | 删除工作区文件，并且将这次删除放入暂存区                      |
| git commit -m [message]     | 提交暂存区到仓库区                                            |
| git branch                  | 列出所有本地分支                                              |
| git branch -r               | 列出所有远程分支                                              |
| git branch -a               | 列出所有本地分支和远程分支                                    |
| git branch [branch-name]    | 新建一个分支，但依然停留在当前分支                            |
| git branch -d [branch-name] | 删除分支                                                      |
| git checkout -b [branch]    | 新建一个分支，并切换到该分支                                  |
| git checkout [branch-name]  | 切换到指定分支，并更新工作区                                  |
| git checkout -              | 切换到上一个分支                                              |
| git checkout [file]         | 恢复暂存区的指定文件到工作区                                  |
| git merge [branch]          | 合并指定分支到当前分支                                        |
| git tag [tag]               | 新建一个 tag 在当前 commit                                    |
| git log                     | 显示当前分支的版本历史                                        |
| git reflog                  | 显示当前分支的最近几次提交                                    |
| git diff HEAD               | 显示工作区与当前分支最新 commit 之间的差异                    |

> `git checkout`可以缩写为`gco` 

> `HEAD` 指向当前分支，`HEAD^n`表示当前分支的第n个父提交，`HEAD~n`表示当前分支的第n个父提交，用于第一父母存在歧义的情况下