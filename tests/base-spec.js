const { expect } = require("chai");

const { parse } = require("@wxml/parser");
const { traverse, generate } = require("../lib");

describe("Base Test", () => {
  it("traverse, transform and generate", () => {
    const AST = parse(`<view class="search-title" src="../../images/actLogo/ytlogo.png">{{mallName}}</view>`);
    traverse(AST, {
      WXInterpolation(node) {
        if (node.value === "mallName") {
          node.value = "somethingNew";
        }
      },
    });
    const code = generate(AST);
    expect(code).to.be.equals(`<view class="search-title" src="../../images/actLogo/ytlogo.png">{{somethingNew}}</view>`);
  });
});
