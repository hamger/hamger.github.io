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
npm run push
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
npm run d
```
update blog need node version is `12.16.2`, if not, execute `npm run n`.

before `npm run n` make sure `n` is installed, if not, execute `npm i n`.

[more hexo command](https://hexo.io/zh-cn/docs/commands.html)
