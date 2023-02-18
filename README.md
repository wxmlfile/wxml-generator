## @wxml/generator

[![npm version](https://img.shields.io/npm/v/@wxml/generator)](https://www.npmjs.com/package/@wxml/generator)


A wxml code generator from AST parsed by @wxml/parser.
`traverse` has Updated to [wxml-traverse](https://github.com/wxmlfile/wxml-traverse)

## Basic Usage

```javascript
const { parse } = require("@wxml/parser");
const AST = parse(`
  <view class="search-contianer">
    <view class="search" style="height:{{navHeight}}px;padding-top:{{navTop}}px">
      <view class="search-title" src="../../images/actLogo/ytlogo.png">
        {{mallName}}
      </view>
      <input
        placeholder-class="search-placeholder"
        type="text"
        placeholder="please enter keyword for search"
        disabled
        value="{{name}}"
        bindinput="bindinput"
        bindtap="goSearch">
      </input>
    </view>
  </view>
`);
const { generate } = require("@wxml/generator");
// const { traverseStatic } = require("@wxml/generator");
// traverseStatic(AST, {
//     WXInterpolation(node) {
//         if (node.value === 'mallName') {
//             node.value = 'somethingNew';
//         }
//     }
// });
const { traverse } = require('@wxml/traverse');
traverse(AST, {
    WXInterpolation(path) {
        if (path.node.value === 'mallName') {
            path.node.value = 'somethingNew';
        }
    }
});
const code = generate(AST);
console.log("AST structure: ", AST);
console.log("Code: ", code);
```

## 贡献者

<a href="https://github.com/wxmlfile/wxml-generator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wxmlfile/wxml-generator" />
</a>