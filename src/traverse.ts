import { ElementType } from "./element";

/**
 * - option中是每个类型Node的回调
 * - 修改后，后续的traverse以新的tree为
 * @param {*} ast
 * @param { Program, WXScript, WXElement, WXStartTag, WXEndTag(不一定存在), WXAttribute, WXAttributeInterpolation, WXInterpolation, WXText, WXComment } options
 * @param { quote?: '"' | "'" } state
 */
function traverse(ast, options, state: { quote?: '"' | "'" | undefined } = {}) {
    switch (ast.type) {
        // 原子节点
        case ElementType.WXScript:
            typeof options.WXScript === 'function' && options.WXScript(ast);
            if (ast.startTag) {
                traverse(ast.startTag, options, state);
            }
            if (ast.endTag) {
                traverse(ast.endTag, options, state);
            }
            break;
        case ElementType.WXText:
            typeof options.WXText === 'function' && options.WXText(ast);
            break;
        case ElementType.WXAttributeInterpolation:
            typeof options.WXAttributeInterpolation === 'function' &&
                options.WXAttributeInterpolation(ast, { quote: state?.quote });
            break;
        case ElementType.WXInterpolation:
            typeof options.WXInterpolation === 'function' && options.WXInterpolation(ast);
            break;
        case ElementType.WXComment:
            typeof options.WXComment === 'function' && options.WXComment(ast);
            break;
        // 复杂节点
        case ElementType.Program:
            // enter
            typeof options.enter === 'function' && options.enter(ast);
            Array.isArray(ast.body) && ast.body.forEach(item => traverse(item, options, state));
            typeof options.leave === 'function' && options.leave(ast);
            // leave
            break;
        case ElementType.WXElement:
            typeof options.WXElement === 'function' && options.WXElement(ast);
            if (ast.startTag) {
                traverse(ast.startTag, options, state);
            }
            Array.isArray(ast.children) && ast.children.forEach(child => traverse(child, options, state));
            if (ast.endTag) {
                traverse(ast.endTag, options, state);
            }
            break;
        case ElementType.WXAttribute:
            state.quote = ast.quote;
            typeof options.WXAttribute === 'function' && options.WXAttribute(ast);
            Array.isArray(ast.children) && ast.children.forEach(child => traverse(child, options, state));
            delete state.quote;
            break;
        case ElementType.WXStartTag:
            typeof options.WXStartTag === 'function' && options.WXStartTag(ast);
            Array.isArray(ast.attributes) && ast.attributes.forEach(attribute => traverse(attribute, options, state));
            break;
        case ElementType.WXEndTag:
            typeof options.WXEndTag === 'function' && options.WXEndTag(ast);
            break;
    }
}

export default traverse;
