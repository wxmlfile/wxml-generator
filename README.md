## @wxml/generator

[![npm version](https://img.shields.io/npm/v/@wxml/generator)](https://www.npmjs.com/package/@wxml/generator)


A wxml code generator from AST parsed by @wxml/parser.

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
const { generate, traverse } = require("@wxml/generator");
traverse(AST, {
    WXInterpolation(node) {
        if (node.value === 'mallName') {
            node.value = 'somethingNew';
        }
    }
});
const code = generate(AST);
console.log("AST structure: ", AST);
console.log("Code: ", code);
```
