"use client"
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import Table from '@editorjs/table'
// @ts-ignore
import Paragraph from '@editorjs/paragraph'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Carousel from '@/dist/carousel';
// @ts-ignore
import EJLaTeX from 'editorjs-latex'
// @ts-ignore
import Warning from '@editorjs/warning'
// @ts-ignore
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import Raw from '@editorjs/raw'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import Marker from '@editorjs/marker'
// @ts-ignore
import CheckList from '@editorjs/checklist'
// @ts-ignore
import Delimiter from '@editorjs/delimiter'
// @ts-ignore
import InlineCode from '@editorjs/inline-code'
// @ts-ignore
import ImageGallery  from '@rodrigoodhin/editorjs-image-gallery'
// @ts-ignore
import SimpleImage from '@editorjs/simple-image'
// @ts-ignore
import {MDParser}  from '@/dist/mdparser'
// @ts-ignore
import {MDImporter} from '@/dist/mdparser'
// @ts-ignore
import ChangeCase from 'editorjs-change-case';
// @ts-ignore
import DragDrop from 'editorjs-drag-drop';
// @ts-ignore
import MermaidTool  from 'editorjs-mermaid';
// @ts-ignore
import NestedList from '@editorjs/nested-list';
// @ts-ignore
import ToggleBlock from 'editorjs-toggle-block';
// @ts-ignore
import {StyleInlineTool} from "editorjs-style";
// @ts-ignore
import Alert from 'editorjs-alert';
// @ts-ignore
import Tooltip from 'editorjs-tooltip';
import Annotation from '../../dist/annotation'
// @ts-ignore
import Undo from 'editorjs-undo';
import { Button } from "../ui/button";
export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
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
    style: StyleInlineTool,
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
}

interface NotionEditorProps {
    value?: any,
    onChangeValue: (value: string) => void
}
export default function NotionEditor({value, onChangeValue}:NotionEditorProps ) {
    const [isMounted, setIsMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default


        if (ref.current) {
            const editor = new EditorJS({
                data:value || "",
                holder: ref.current,
                tools: EDITOR_JS_TOOLS,
                onReady: () => {
                    new Undo({ editor });
                    MermaidTool.config({ 'theme': 'neutral' })
                    new DragDrop(editor);
                },
                onChange: () => {
                    if (ref.current) {
                        // @ts-ignore
                        ref.current.save().then((outputData) => {
                            onChangeValue(JSON.stringify(outputData.blocks))
                        })
                    }
                },
                i18n: {
                    direction: 'rtl',
                },
                tunes: ['AlignmentTuneTool'],
            });
            // @ts-ignore
            ref.current = editor
        }
    };



    useEffect(() => {
        const init = async () => {
            await initializeEditor();
        };

        if (isMounted) {
            init();
            return () => {
                if (ref.current) {
                        // @ts-ignore
                    ref.current.destroy();
                }
            }
        }
    }, [isMounted,initializeEditor])

    const save = () => {
        if (ref.current) {
                        // @ts-ignore
            ref.current.save().then((outputData) => {
                onChangeValue(JSON.stringify(outputData.blocks))
            })
        }
    }

    return (
        <>
            <div ref={ref} className="" />
            <Button onClick={save}>Save</Button>
        </>
    )

};
