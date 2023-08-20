import HtmlToReactParser from "html-to-react";
import React from "react";
const htmlParser = HtmlToReactParser.Parser;


const RenderListe = ({block}:any) => {
	// @ts-ignore
    const htmlToReactParser = new htmlParser();
	const thisblock = block;
	const items = thisblock.data?.items;
	const style = thisblock.data?.style;

	const balise = style === 'ordered' ? 'ol' : 'ul';
	const ReactComponent = balise;

	return (
		React.createElement(ReactComponent,
			{style: {
			    margin: '0 15px',
				paddingLeft: '40px',
				outline: 'none',
				}
			},
			items.map((item:string, i:number) => (
				<li key={i+'-'+item} 
					style={{
						padding: "5.5px 0 5.5px 3px",
						lineHeight: '1.6em',
					}}
				>
					{htmlToReactParser.parse(item)}
				</li>
			))
		)
	)
}

export default RenderListe