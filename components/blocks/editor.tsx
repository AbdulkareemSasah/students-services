"use client"

import * as React from "react"
import EditorJS from "@editorjs/editorjs"
// @ts-ignore
import {MDParser,MDImporter}  from '@/dist/mdparser'
import {StyleInlineTool} from "editorjs-style"

interface EditorProps {
    value?: any,
    onChangeValue: (value: string) => void
}
export default function Editor({ value, onChangeValue }: EditorProps) {
  const ref = React.useRef<EditorJS>()
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default
    // @ts-ignore
    const List = (await import("@editorjs/list")).default
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default
    // @ts-ignore
    const Paragraph = (await import("@editorjs/paragraph")).default
    // @ts-ignore
    const Carousel = (await import("@/dist/carousel")).default
    // @ts-ignore
    const EJLaTeX = (await import("editorjs-latex")).default
    // @ts-ignore
    const Warning = (await import("@editorjs/warning")).default
    // @ts-ignore
    const AlignmentTuneTool = (await import("editorjs-text-alignment-blocktune")).default
    // @ts-ignore
    const Image = (await import("@editorjs/image")).default
    // @ts-ignore
    const Raw = (await import("@editorjs/raw")).default
    // @ts-ignore
    const Quote = (await import("@editorjs/quote")).default
    // @ts-ignore
    const Marker = (await import("@editorjs/marker")).default
    // @ts-ignore
    const CheckList = (await import("@editorjs/checklist")).default
    // @ts-ignore
    const Delimiter = (await import("@editorjs/delimiter")).default
    // @ts-ignore
    const ImageGallery  = (await import("@rodrigoodhin/editorjs-image-gallery")).default
    // const {MDParser}  = (await import("@/dist/mdparser")).default
    // const {MDImporter} = (await import("@/dist/mdparser")).default
    // @ts-ignore
    const ChangeCase = (await import("editorjs-change-case")).default
    // @ts-ignore
    const DragDrop = (await import("editorjs-drag-drop")).default
    // @ts-ignore
    const MermaidTool  = (await import("editorjs-mermaid")).default
    // @ts-ignore
    const NestedList = (await import("@editorjs/nested-list")).default
    // @ts-ignore
    const ToggleBlock = (await import("editorjs-toggle-block")).default
    // @ts-ignore
    const Alert = (await import('editorjs-alert')).default
    // @ts-ignore
    const Tooltip = (await import('editorjs-tooltip')).default
    // @ts-ignore
    const Annotation = (await import('../../dist/annotation')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          new DragDrop(editor);
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: value.content,
        tunes: ['AlignmentTuneTool'],
        tools: {
            paragraph: Paragraph,
            embed: Embed,
            table: Table,
            alert: {
                class: Alert,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+A',
                config: {
                    defaultType: 'primary',
                    messagePlaceholder: 'Enter something',
                },
            },
            annotation: Annotation,
            style: StyleInlineTool,
            carousel: {
                class: Carousel,
                config: {
                    endpoints: {
                        byFile: "URL_FETCH",
                    }
                }
            },
            imageGallery: ImageGallery,
            tooltip: {
                class: Tooltip,
                config: {
                    location: 'top',
                    highlightColor: '#FFEFD5',
                    underline: true,
                    backgroundColor: '#154360',
                    textColor: '#FDFEFE',
                    holder: 'editorId',
                }
            },
            list: {
                class: NestedList,
                inlineToolbar: true,
                config: {
                    defaultStyle: 'unordered'
                },
            },
            warning: Warning,
            // style: StyleInlineTool,
            code: Code,
            linkTool: LinkTool,
            image: Image,
            raw: Raw,
            header: Header,
            quote: Quote,
            marker: Marker,
            checklist: CheckList,
            delimiter: Delimiter,
            inlineCode: InlineCode,
            changeCase: {
                class: ChangeCase,
                config: {
                    showLocaleOption: true, // enable locale case options
                    locale: 'tr' // or ['tr', 'TR', 'tr-TR']
                }
            },
            toggle: {
                class: ToggleBlock,
                inlineToolbar: true,
            },
            mermaid: MermaidTool,
            AlignmentTuneTool:AlignmentTuneTool,
            markdownParser: MDParser,
            markdownImporter: MDImporter,
            Math: {
                class: EJLaTeX,
                shortcut: 'CMD+SHIFT+M',
                config: {
                    css: '.math-input-wrapper { padding: 5px; }'
                }
            }
        },
      })
    }
  }, [value])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])


  if (!isMounted) {
    return null
  }

  return (
      <div className="grid w-full gap-10">
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
   
  )
}
