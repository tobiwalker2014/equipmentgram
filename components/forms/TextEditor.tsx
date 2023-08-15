// @ts-nocheck

import React, { useState, useMemo, useCallback } from "react";
import {
  Descendant,
  Editor,
  Element as SlateElement,
  Text as SlateText,
  Transforms,
} from "slate";
import { ReactEditor, Slate, Editable, withReact } from "slate-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faHeading,
  faListOl,
  faListUl,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  editor: ReturnType<typeof withReact> & {
    isInline: (element: SlateElement) => boolean;
    isVoid: (element: SlateElement) => boolean;
  };
  initialValue: Descendant[];
};

export const TextEditor: React.FC<Props> = ({ editor, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  // const [characterCount, setCharacterCount] = useState(
  //   Editor.string(editor, value).length
  // );
  // const MAX_CHARACTERS = 500; // adjust as needed

  const handleEditorChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      // const newPlainTextValue = Editor.string(editor, newValue);
      // setCharacterCount(newPlainTextValue.length);
    },
    [editor]
  );

  const handleFormatBold = () => {
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.bold === true,
      universal: true,
    });
    const isActive = !!match;
    Editor.addMark(editor, "bold", isActive ? null : true);
  };

  const handleFormatItalic = () => {
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.italic === true,
      universal: true,
    });
    const isActive = !!match;
    Editor.addMark(editor, "italic", isActive ? null : true);
  };

  const handleFormatUnderline = () => {
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.underline === true,
      universal: true,
    });
    const isActive = !!match;
    Editor.addMark(editor, "underline", isActive ? null : true);
  };

  const handleFormatHeading = (level: number) => {
    Editor.nodes(editor, {
      match: (n) => Editor.isBlock(editor, n),
      at: editor.selection,
      mode: "highest",
      voids: true,
    }).forEach(([node, path]) => {
      if (node.type === "heading" && node.level === level) {
        Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
      } else if (SlateElement.isElement(node) && !editor.isInline(node)) {
        Transforms.setNodes(editor, { type: "heading", level }, { at: path });
      }
    });
  };

  const handleFormatNumberList = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "numbered-list",
      universal: true,
    });
    const isActive = !!match;
    Editor.setNodes(
      editor,
      { type: isActive ? "paragraph" : "numbered-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  const handleFormatBulletList = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "bulleted-list",
      universal: true,
    });
    const isActive = !!match;
    Editor.setNodes(
      editor,
      { type: isActive ? "paragraph" : "bulleted-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  const handleFormatAlign = (alignment: string) => {
    Editor.setNodes(
      editor,
      { alignment },
      { match: (n) => ReactEditor.isEditor(n) || Editor.isBlock(editor, n) }
    );
  };

  const handleInsertImage = (url: string) => {
    const text = { text: "" };
    const image = { type: "image", url, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  return (
    <div className="text-body-color focus:border-primary w-full rounded border border-[#EBEBEB] bg-white py-2 px-[14px] text-base leading-relaxed outline-none focus-visible:shadow-none md:py-1 md:px-[18px]">
      <div className="flex pb-1">
        <div className="flex-1 flex [&>button]:px-[10px] [&>button]:py-[5px] hover:[&>button]:bg-slate-500/10 [&>button]:rounded">
          <button type="button" onClick={handleFormatBold}>
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            type="button"
            onClick={handleFormatItalic}
            className="hidden md:block"
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            type="button"
            onClick={handleFormatUnderline}
            className="hidden md:block"
          >
            <FontAwesomeIcon
              icon={faUnderline}
              className="relative top-[1px]"
            />
          </button>
          <button type="button" onClick={() => handleFormatHeading(3)}>
            <FontAwesomeIcon icon={faHeading} />
          </button>
        </div>
        <div className="flex [&>button]:px-[10px] [&>button]:py-[5px] hover:[&>button]:bg-slate-500/10 [&>button]:rounded">
          <button type="button" onClick={handleFormatNumberList}>
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button onClick={handleFormatBulletList}>
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button
            type="button"
            onClick={() => handleFormatAlign("left")}
            className="hidden md:block"
          >
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button
            type="button"
            onClick={() => handleFormatAlign("center")}
            className="hidden md:block"
          >
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button
            type="button"
            onClick={() => handleFormatAlign("right")}
            className="hidden md:block"
          >
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
          <button
            type="button"
            onClick={() => handleFormatAlign("justify")}
            className="hidden md:block"
          >
            <FontAwesomeIcon icon={faAlignJustify} />
          </button>
        </div>
        <div className="flex-1 flex justify-end [&>button]:px-[10px] [&>button]:py-[5px] hover:[&>button]:bg-slate-500/10 [&>button]:rounded">
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter the URL of the image:");
              if (url) {
                handleInsertImage(url);
              }
            }}
          >
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>
      </div>
      <div className="py-2">
        <Slate editor={editor} value={value} onChange={handleEditorChange}>
          <Editable />
        </Slate>
      </div>
      {/* {characterCount >= MAX_CHARACTERS && (
        <p>Reached character limit of {MAX_CHARACTERS}.</p>
      )} */}
    </div>
  );
};
