---
title: 制作banner组件
date: 2018-03-27 21:27:38
tags: Vue.js
---
在实际的移动端项目中会遇到横幅展示的需求，用来展示最新上架的内容或者广告等。为此我制作了一个 Vue 组件（[Demo&源码](https://github.com/hamger/hg-vcomponents)），让我们来一步步实现这个组件吧，有可以改进的地方欢迎指正。

### 制定一个小目标
首先我们搭建一个简单的例子，并希望引入`Banner`组件就可以实现 banner 效果。
```html
<template>
  <div>
    <banner>
      <div slot="item" class="item"><img src="http://olislpb6q.bkt.clouddn.com/bizhi1.jpg"></div>
      <div slot="item" class="item"><img src="http://olislpb6q.bkt.clouddn.com/bizhi2.jpg"></div>
      <div slot="item" class="item"><img src="http://olislpb6q.bkt.clouddn.com/bizhi4.jpg"></div>
    </banner>
  </div>
</template>

<script>
import { Banner } from '@/components';
export default {
  name: 'el-banner',
  components: { Banner }
};
</script>

<style lang="scss" scoped>
.item {
  img {
    height: 150px;
    width: 100%;
  }
}
</style>
```

<!-- more -->
### 创建组件结构
编写 banner 组件的第一步就是搭建组件基础的 HTML 和 CSS 。使用如下样式，可以使子元素自动撑开父元素宽度，这样就不需要计算父元素的宽度了。
```html
<template>
    <div class="view" :style="{height: height}">
      <div ref="wrap" class="wrap">
        <slot name="item"></slot>
      </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss"  scoped>
  .view {
    position: relative;
    overflow: hidden;
    font-size: 0; // 去除幽灵节点的影响
    .wrap {
      white-space: nowrap; // 确保所有子元素在一行显示
      width:auto;
      transition: transform 0.2s ease-out;
      & > div {
        display:inline-block;
      }
    }
  }
</style>
```

### 编写js代码
控制运动的核心是改变父元素的`transform: translate3d(${disX}px, 0, 0)`
```html
<template>
  <div ref="bannerView"  class="view">
    <div ref="wrap" class="wrap"
      @touchstart="_touchstart"
      @touchmove="_touchmove"
      @touchend="_touchend"
      :style="{
        transform: `translate3d(${disX}px, 0, 0)`
      }">
      <slot name="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      startX: 0,
      curPos: 0,
      disX: 0,
      itemWidth: 0,
      itemAmount: 0
    };
  },
  methods: {
    _touchstart (e) {
      this.startX = e.touches[0].clientX;
      this.curPos = this.disX;
    },
    _touchmove (e) {
      let moveX = e.touches[0].clientX - this.startX;
      if (moveX > 0 && this.disX >= 0) {
        this.disX = 0;
      } else if (moveX < 0 && this.disX <= -1 * this.itemWidth * (this.itemAmount - 1)) {
        this.disX = -1 * this.itemWidth * (this.itemAmount - 1);
      } else {
        this.disX = this.curPos + moveX;
      }
    },
    _touchend (e) {
      this.disX = Math.round(this.disX / this.itemWidth) * this.itemWidth;
    }
  },
  mounted () {
    // 获得总共有多少个子元素
    this.itemAmount = this.$slots.item.length;
    // 获得外部容器的宽度，即子元素的宽度
    this.itemWidth = this.$refs.bannerView.clientWidth;
  }
};
</script>
```
到这里一个简单的 Banner 组件就诞生了，在此基础上我们还可以一些其他东西，比如底部的小圆点，用来提示当前图片所在的位置。具体实现代码见[这里](https://github.com/hamger/hg-vcomponents/blob/master/src/components/Banner/banner.vue)。