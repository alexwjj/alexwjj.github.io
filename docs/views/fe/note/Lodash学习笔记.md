---
title: 【官方文档】Lodash学习笔记
sidebar: 'auto'
date: 2020-01-02
tags:
 - 类库
categories:
 - 前端
---

> 一些常用的函数还是要掌握下的，提高开发效率，减少线上bug
<!-- more -->

## 前言
lodash作为现在的主流类库，也是要好好学习一下的，同事写代码里面经常有看到，不会的话也看不懂。关键是确实挺好用的，虽然很多工具类可以自己写，但是自己写的大概率存在各种漏洞。

跟着官网过一遍：

[https://www.lodashjs.com/](https://www.lodashjs.com/)

## Array
- chunk 拆分数组
- `compact`去除数组中的假值false, null, 0, "", undefined, 和 NaN 
concat （arr, value）合并数组和值，合并的数组可以扁平一层
- `difference` （arr1, arr2） 对比数组，返回arr1中，arr2没有的部分
- drop(arr , n) 去除数组的前n项 默认1
- dropRight (arr, n) 去除数组尾部n项 默认1
- find（arr， function | object | 属性） 查找符合条件的某一项
- flatten(array) 减少一级嵌套
- `flattenDeep`(array,depth)将array递归为一维数组。可指定减少的层级
- fromPairs(pairs) 数组转换为对象键值对
- head(array) 返回数组第一项
- intersection([arrays]) 获取多个数组的交集
- nth(array, [n=0])获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。 n  - 下标
- pull(array, [values]) 删除数组中给定的值，改变原数组
- take(array, [n=1]) 从头开始提取n个元素
- `uniq` 数组去重
- without(array, [values]) 剔除所有给定值的新数组，
- xor([arrays])创建一个给定数组唯一值的数组 合并数组，取唯一值
- zip([arrays])将多个数组index相同的项合并成数组
- zipObject([props=[]], [values=[]]) 合并成键值对形式的对象

## Collection
- flatMap(collection, [iteratee=_.identity])扁平化（同阶数组）数组
- reject(collection, [predicate=_.identity])_.filter的反向方法
- size(collection)返回collection（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。
- sortBy(collection, [iteratees=[_.identity]])升序排序。 这个方法执行稳定排序
- Date
- now()直到现在的毫秒数
## Lang

- castArray(value)如果 value 不是数组, 那么强制转为数组。
- clone(value)浅拷贝。 
- `cloneDeep`(value)深拷贝。
- isArguments(value)检查 value 是否是一个类 arguments 对象。
- `isNil`(value)检查 value 是否是 null 或者 undefined。
- max(array)min(array)计算 array 中的最大值/最小值。 如果 array 是 空的或者假值将会返回 undefined。
- mean(array)计算 array 的平均值。
- get(object, path, [defaultValue])根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
- invert(object)创建一个object键值倒置后的对象。如果 object 有重复的值，后面的值会覆盖前面的值。
- invoke(object, path, [args])调用object对象path上的方法。
- `pic`k`(object, [props])创建一个从 object 中选中的属性的对象。
- `omit`(object, [props])反向pick
- set(object, path, value)设置 object对象中对应 path 属性路径上的值，
## String
- camelCase([string=''])转换字符串string为 驼峰写法。
- capitalize([string=''])转换字符串string首字母为大写，剩下为小写。
- repeat([string=''], [n=1])重复 N 次给定字符串。
- replace([string=''], pattern, replacement)替换string字符串中匹配的pattern为给定的replacement 。












