import { ElementType } from "./element";

/**
 *
 * @param {*} node
 * @param {*} options
 */
function render(node, options?) {
    const nodes = 'length' in node ? node : [node];

    let output = '';

    for (let i = 0; i < nodes.length; i++) {
        output += renderNode(nodes[i], options);
    }

    return output;
}

function renderNode(node, options) {
    switch (node.type) {
        case ElementType.Program:
            return render(node.body, options);
        case ElementType.WXComment:
            return renderComment(node);
        case ElementType.WXScript:
        case ElementType.WXElement:
            return renderElement(node, options);
        case ElementType.WXText:
            return renderText(node, options);
        case ElementType.WXInterpolation:
            return renderInterpolation(node);
        case ElementType.WXAttributeInterpolation:
            return renderWXAttributeInterpolation(node, options);
    }
}

function renderComment(node) {
    return `<!--${node.value}-->`;
}

function renderElement(node, options) {
    let tag = `<${node.name}`;
    const attribs = formatAttributes(node.startTag.attributes, options);
    if (attribs) {
        tag += ` ${attribs}`;
    }
    if (!node.endTag) {
        tag += ' />';
    } else {
        tag += '>';
        // WXScript
        if (node.value) {
            tag += node.value;
            // WXElement
        } else if (node.children) {
            tag += render(node.children);
        }
        tag += `</${node.name}>`;
    }
    return tag;
}

// 单双引号
function formatAttributes(attribs, options) {
    let printed = '';
    attribs.forEach((attrib, idx) => {
        printed += renderAttribute(attrib, options);
        if (idx !== attribs.length - 1) printed += ' ';
    });
    return printed;
}

function renderAttribute(attrib, options) {
    if (!attrib.quote) return attrib.key;
    let attribVal = '';
    if (Array.isArray(attrib.children) && attrib.children.length) {
        attrib.children.forEach(child => {
            attribVal += render(child, options);
        });
    } else {
        attribVal += attrib.value;
    }
    return attrib.key + '=' + attrib.quote + attribVal + attrib.quote;
}

function renderWXAttributeInterpolation(node, options) {
    return `{{${node.value}}}`;
}

function renderText(node, options) {
    let value = node.value;
    return value;
}

function renderInterpolation(node) {
    return `{{${node.value}}}`;
}

export default render;
