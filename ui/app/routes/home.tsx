import type { Route } from "./+types/home";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Collaboration from "@tiptap/extension-collaboration";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useMemo } from "react";

export const meta = ({ }: Route.MetaArgs) => {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}


const Home = () => {
    const ydoc = useMemo(() => {
        return new Y.Doc();
    }, []);

    // const provider = useMemo(() => {
    //     return new WebsocketProvider(
    //         "ws://localhost:8080/ws",
    //         "noroom",
    //         ydoc,
    //     );
    // }, [ydoc]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                undoRedo: false,
            }),
            Collaboration.configure({
                document: ydoc,
            }),
            // CollaborationCaret.configure({
            //     provider,
            //     user: {
            //         name: "Phap",
            //         color: "#2196F3"
            //     }
            // })
        ],
        immediatelyRender: false,
    });

    return (
        <EditorContent editor={editor} />
    );
}

export default Home;
