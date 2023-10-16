"use client"

import '@react-page/plugins-image/lib/index.css';
import Editor,{ Value } from '@react-page/editor';
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import React from 'react';
import { cellPlugins } from '@/plugins/cellPlugins';

interface EditorProps {
    value?: any,
    onChangeValue: (value: Value) => {}
}
export default function PageBuilder({ value, onChangeValue }: EditorProps) {
    const ref = React.useRef<typeof Editor>()
    const [isMounted, setIsMounted] = React.useState<boolean>(false)
    const [editor, setEditor] = React.useState<any>()
  
  const initializeEditor = React.useCallback(async () => {
    const Editor = (await import('@react-page/editor')).default
    const image = (await import("@react-page/plugins-image")).default
    const slate = (await import("@react-page/plugins-slate")).default
    const cellPlugins = [slate(), image];
    const editor =  <Editor 
                        cellPlugins={cellPlugins}
                        value={value}
                        onChange={onChangeValue}
                    />

    setEditor(editor)
  }, [value])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()
    }
  }, [isMounted, initializeEditor])


  if (!isMounted) {
    return null
  }

  return (
      {editor}
  )
}
