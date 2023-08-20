// edjsHTML tranforms editor js blocks to html
import { EditorParser, EditorRenderer } from "@mobtakr/editorjs-parser";
import { CodeBlock, DelimiterBlock, ImageRender, LinkRender, RenderListe, TableRender, TextRender } from "@src/containers/Editor/RenderType";


export default function ParserEditor({ data }:any) {

	const renderText = (block:any) => <TextRender block={block} key={block.id} />;
	const renderCode = (block:any) => <CodeBlock block={block} key={block.id} />;
	const renderTable = (block:any) => <TableRender block={block} key={block.id} />;
	const renderImage = (block:any) => <ImageRender block={block} />;
	const renderDelimiter = (block:any) => <DelimiterBlock block={block} key={block.id} />;
	const renderListe = (block:any) => <RenderListe block={block} key={block.id} />;
	const renderLink = (block:any) => <LinkRender block={block} key={block.id} />;

    const content = data;
    const parser = new EditorParser(content?.blocks);

    parser.registerBlock("code", renderCode);
	parser.registerBlock("paragraph", renderText);
	parser.registerBlock("header", renderText);
	parser.registerBlock("table", renderTable);
	parser.registerBlock("image", renderImage);
	parser.registerBlock("delimiter", renderDelimiter);
	parser.registerBlock("liste", renderListe);
	parser.registerBlock("linkTool", renderLink);

    const parsedBlocks = parser.parse();
	
    return (
        <EditorRenderer
            parsedBlocks={parsedBlocks}
        />
    );
}
