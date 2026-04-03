import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const CommandPalettePluginKey = new PluginKey("commandPalette");

export const CommandPalette = Extension.create({
    name: "commandPalette",
    //
    addOptions() {
        return {
            onOpen: () => { },
            onClose: () => { },
        };
    },
    //
    addProseMirrorPlugins() {
        const { onOpen, onClose } = this.options;

        return [
            new Plugin({
                key: CommandPalettePluginKey,

                props: {
                    handleKeyDown(view, event) {
                        if (event.key === "Escape") {
                            onClose();
                            return false;
                        }

                        if (event.key !== "/") {
                            return false;
                        }

                        const { from } = view.state.selection;
                        const coords = view.coordsAtPos(from);
                        const domRect = {
                            x: coords.left,
                            y: coords.bottom + 6,
                            width: 0,
                            height: 0,
                        };

                        setTimeout(() => {
                            onOpen(domRect);
                        }, 0);

                        return false;
                    },
                }
            })
        ];
    }
});
