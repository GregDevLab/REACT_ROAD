// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import ColorPlugin from "editorjs-text-color-plugin";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Underline from "@editorjs/underline";
// @ts-ignore
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import AceCodeEditorJS, { AceCodeConfig } from "ace-code-editorjs";
import ace from "ace-builds";
import "ace-builds/esm-resolver";
import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
import modeJSWorker from "ace-builds/src-noconflict/worker-javascript?url";
import modeCSSWorker from "ace-builds/src-noconflict/worker-css?url";
import modePHPWorker from "ace-builds/src-noconflict/worker-php?url";
ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);
ace.config.setModuleUrl("ace/mode/javascript_worker", modeJSWorker);
ace.config.setModuleUrl("ace/mode/css_worker", modeCSSWorker);
ace.config.setModuleUrl("ace/mode/php_worker", modePHPWorker);
import { uploadFile } from "@src/api/upload";

export const ACE_CONFIG: AceCodeConfig = {
    languages: {
        plain: {
            label: "Plain Text",
            mode: "ace/mode/plain_text",
        },
        html: {
            label: "HTML",
            mode: "ace/mode/html",
        },
        javascript: {
            label: "JavaScript",
            mode: "ace/mode/javascript",
        },
        css: {
            label: "CSS",
            mode: "ace/mode/css",
        },
        php: {
            label: "PHP",
            mode: "ace/mode/php",
        },
        jsx: {
            label: "JSX",
            mode: "ace/mode/jsx",
        },
        tsx: {
            label: "TSX",
            mode: "ace/mode/tsx",
        },
        typescript: {
            label: "TypeScript",
            mode: "ace/mode/typescript",
        },
        sql: {
            label: "SQL",
            mode: "ace/mode/sql",
        },
    },
    options: {
        fontSize: 16,
        minLines: 4,
		tabSize: 2,
        theme: "ace/theme/dracula",
		enableAutoIndent: true,
		enableBasicAutocompletion: true,
		enableLiveAutocompletion: true,
		enableSnippets: true,
		mergeUndoDeltas: true,
    },
};

export const TOOLS = {
    align: {
        class: AlignmentTuneTool,
        config: {
            default: "left",
            blocks: {
                header: "center",
                list: "right",
            },
        },
    },
    underline: Underline,
    header: {
        class: Header,
        inlineToolbar: true,
        tunes: ["align"],
    },
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: "http://localhost:4000/api/fetchurl",
        },
    },
    embed: {
        class: Embed,
        config: {
            services: {
                youtube: true,
                coub: true,
            },
        },
    },
    image: {
        class: ImageTool,
        config: {
            embed: {
                display: true,
            },
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: File) {
                    return uploadFile(file).then((res) => {
                        return {
                            success: 1,
                            file: {
                                url: `${import.meta.env.VITE_IMAGE_URL}/${
                                    res.data.object.filename
                                }`,
                                // any other image data you want to store, such as width, height, color, extension, etc
                            },
                        };
                    });
                },
            },
        },
    },
    delimiter: Delimiter,
    liste: {
        class: List,
        inlineToolbar: true,
    },
    table: {
        class: Table,
        inlineToolbar: true,
        tunes: ["align"],
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ["align"],
    },
    Marker: {
        class: ColorPlugin,
        config: {
            defaultColor: "#CDDC39",
            type: "marker",
            icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>`,
            customPicker: true,
        },
    },
    code: {
        class: AceCodeEditorJS,
        config: ACE_CONFIG,
    },
    color: {
        class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        config: {
            defaultColor: "#00BCD4",
            type: "text",
            icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 18h14v3H5zm7.5-14h-1c-.401 0-.764.24-.921.609L5.745 16h2.173l1.273-3h5.604l1.268 3h2.171L13.421 4.61A1 1 0 0 0 12.5 4zm-2.46 7 1.959-4.616L13.95 11h-3.91z"></path></svg>',
            customPicker: true, // add a button to allow selecting any colour
        },
    },
};

export const TRANSLATE = {
    messages: {
        ui: {
            blockTunes: {
                toggler: {
                    "Click to tune": "Cliquez pour modifier",
                    "or drag to move": "ou glissez pour déplacer",
                },
            },
            inlineToolbar: {
                converter: {
                    "Convert to": "Convertir en",
                },
            },
            toolbar: {
                toolbox: {
                    Add: "Ajouter",
                },
            },
        },
        toolNames: {
            Text: "Texte",
            Heading: "Titre",
            List: "Liste",
            Warning: "Avertissement",
            Checklist: "Checklist",
            Quote: "Citation",
            Code: "Code",
            Delimiter: "Délimiteur",
            "Raw HTML": "HTML",
            Table: "Tableau",
            Link: "Lien",
            Marker: "Surligner",
            Bold: "Gras",
            Italic: "Italic",
            InlineCode: "Code simple",
            "Ace Code": "Editeur de code",
            Color: "Couleur du texte",
            "Click to tune": "Modifier",
        },
        tools: {
            // Section for passing translations to the external tools classes
            // The first-level keys of this object should be equal of keys ot the 'tools' property of EditorConfig
            warning: {
                // <-- 'Warning' tool will accept this dictionary section
                Title: "Titre",
                Message: "Message",
            },

            /**
             * Link is the internal Inline Tool
             */
            link: {
                "Add a link": "Ajouter un lien",
            },

            table: {
                "Add row above": "Ajouter une ligne avant",
                "Add row below": "Ajouter une ligne après",
                "Delete row": "Supprimer la ligne",
                "Add column to left": "Ajouter une colonne avant",
                "Add column to right": "Ajouter une colonne après",
                "Delete column": "Supprimer la colonne",
                "With headings": "Avec entete",
                "Without headings": "Sans entete",
            },

            liste: {
                Unordered: "Non ordonnée",
                Ordered: "Ordonnée",
            },

            image: {
                "With border": "Avec bordure",
                "Stretch image": "Etendre l'image",
                "With background": "Avec fond",
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            stub: {
                "The block can not be displayed correctly.":
                    "Le bloc ne peut pas être affiché correctement.",
            },
        },
        blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            delete: {
                Delete: "Supprimer",
                "Click to delete": "Confirmer",
            },
            moveUp: {
                "Move up": "Remonter",
            },
            moveDown: {
                "Move down": "Descendre",
            },
        },
    },
};
