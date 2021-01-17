# Blog

Welcome to [my blog](https://hangermeng.top/)

## Install

```bash
git clone -b hexo https://github.com/hamger/hamger.github.io.git blog
cd blog
yarn
yarn global add hexo-cli
```

### update repository

```bash
git pull origin hexo
git add .
git commit -m '181003_fix01'
git push origin hexo
```

### update blog

> add article
```bash
hexo n 'articleName'
```
edit articles in `source/_posts`

> preview blog
```bash
hexo g
hexo s
```

> update blog
```bash
hexo d
```
if without preview just `hexo g -d`

[more hexo command](https://hexo.io/zh-cn/docs/commands.html)
