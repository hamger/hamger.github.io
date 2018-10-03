# Blog

Welcome to [my blog](https://hamger.github.io/)

## Install
```bash
git clone -b hexo https://github.com/hamger/hamger.github.io.git blog
cd blog
npm install
npm install hexo-cli -g
```

### update repository
```bash
git pull origin hexo
git add .
git commit -m 'updade_181003'
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
