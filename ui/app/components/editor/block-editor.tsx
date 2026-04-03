import { Editor } from "@tiptap/react";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";

const COMMAND_GROUPS = [
    {
        group: "Text",
        items: [
            {
                id: "paragraph",
                label: "Text",
                desc: "Plain paragraph",
                icon: "",
                shortcut: "P",
                run: (editor: Editor) => {
                    editor.chain().focus().setParagraph().run();
                },
            },
            {
                id: "h1",
                label: "Heading 1",
                desc: "Large heading",
                icon: "",
                shortcut: "#",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                },
            },
            {
                id: "h2",
                label: "Heading 2",
                desc: "Medium title",
                icon: "",
                shortcut: "##",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                },
            },
            {
                id: "h3",
                label: "Heading 3",
                desc: "Heading 3",
                icon: "",
                shortcut: "###",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                },
            },
            {
                id: "blockquote",
                label: "Quote",
                desc: "Highlighted blockquote",
                icon: "",
                shortcut: "\"",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleBlockquote().run();
                },
            },
        ],
    },
    {
        group: "Lists",
        items: [
            {
                id: "bulletList",
                label: "Bullet List",
                desc: "Unordered list",
                icon: "",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleBulletList().run();
                },
            },
            {
                id: "orderedList",
                label: "Numbered List",
                desc: "Ordered list",
                icon: "",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleOrderedList().run();
                },
            },
            {
                id: "taskList",
                label: "Task List",
                desc: "To-do list",
                icon: "",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleTaskList().run();
                },
            },
        ],
    },
    {
        group: "Content",
        items: [
            {
                id: "codeBlock",
                label: "Code Block",
                desc: "Monospace code snippet",
                icon: "</>",
                run: (editor: Editor) => {
                    editor.chain().focus().toggleCodeBlock().run();
                },
            },
            {
                id: "horizontalRule",
                label: "Divider",
                desc: "Horizontal rule",
                icon: "-",
                run: (editor: Editor) => {
                    editor.chain().focus().setHorizontalRule().run();
                },
            },
            {
                id: "table",
                label: "Table",
                desc: "3x3 Table",
                icon: "-",
                run: (editor: Editor) => {
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                },
            },
            {
                id: "image",
                label: "Image",
                desc: "Embeded image from URL",
                requiresInput: true,
                run: (editor: Editor, src: string) => {
                    if (!src) return;
                    editor.chain().focus().setImage({ src }).run();
                },
            },
        ],
    },
];

export const ALL_COMMANDS = COMMAND_GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.group })));
