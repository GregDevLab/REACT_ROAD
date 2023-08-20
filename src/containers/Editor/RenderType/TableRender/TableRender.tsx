import HtmlToReactParser from "html-to-react";
const htmlParser = HtmlToReactParser.Parser;

const TableRender = ({ block }:any) => {
	//@ts-ignore
    const htmlToReactParser = new htmlParser();
    const thisblock = block;
    const table = thisblock.data?.content;
	const alignment = block.tunes?.align.alignment;
    const withHeadings = thisblock.data.withHeadings;

    return (
        <div className="w-full overflow-x-scroll py-5">
            <table
                style={{borderCollapse: "collapse", minWidth: '100%'}}>
                <thead>
                    {withHeadings && (
                        <tr>
                            {table[0].map((col:string, j:number) => (
                                <th
                                    key={"col-" + j}
                                    style={{
                                        border: "1px solid #e8e8eb",
                                        minWidth: "150px",
                                        maxWidth: "300px",
                                        padding: "5px",
                                        textAlign: alignment,
                                    }}
                                >
                                    {htmlToReactParser.parse(col.trim())}
                                </th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {table.slice(withHeadings ? 1 : 0).map((row:[], i:number) => (
                        <tr key={"row-" + i}>
                            {row.map((col:string, j:number) => (
                                <td
                                    key={"col-" + j}
                                    style={{
                                        border: "1px solid #e8e8eb",
                                        minWidth: "150px",
                                        maxWidth: "300px",
                                        padding: "5px",
                                        textAlign: alignment,
                                    }}
                                >
                                    {htmlToReactParser.parse(col.trim())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableRender;
