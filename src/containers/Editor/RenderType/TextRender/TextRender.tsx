import HtmlToReactParser from "html-to-react";
import React from "react";
const htmlParser = HtmlToReactParser.Parser;

const TextRender = ({ block }:any) => {
	// @ts-ignore
    const htmlToReactParser = new htmlParser();
    const text = block.data?.text;
    const alignment = block.tunes?.align.alignment;

    const balise = block.type === 'header' ? `h${block.data.level}` : 'p';
    const ReactComponent = balise;

    const parsedText = htmlToReactParser.parse(text);

    return React.createElement(ReactComponent, { style: {textAlign: alignment, margin:'15px auto', maxWidth:'650px'}, target: '_blank'}, parsedText);
};

export default TextRender;
