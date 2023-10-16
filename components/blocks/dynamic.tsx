"use client"
import React, {useRef, useState} from 'react';
import { PlusIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/dashboard/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/dashboard/ui/popover";
import {DeleteIcon} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/dashboard/ui/card";
import {useTranslation} from "react-i18next";
import NotionEditor from './NotionEditor';
import QuillEditor from './quill/editor';
import NovelEditor from './noval-editor';
import {Editor as NovalEditor} from 'novel';
import Editor from './editor';

import { cellPlugins } from '@/plugins/cellPlugins';
import QuillEditorJS from './quill/quilljs';

const typeFields = [
    "notion editor",
    "quill text editor",
    "quill js text editor"
    // "novel text editor"
]
type Block = {
    type: string,
    content: string
}
interface DynamicFormProps {
    field : any,
    loading:boolean| false
}


const DynamicForm: React.FC<DynamicFormProps> = ({field, loading}) => {
    const [fields, setFields] = useState<string[]>(field.value.map(({type}:{type:string}) => type));
    const {t, i18n } = useTranslation()


    const handleAddField = (field : string) => {
        setFields([...fields, field]);
    };
    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        const updatedValues = field.value.filter((item:any, i:number) => i !== index);
        setFields(updatedFields);
        field.value = [updatedValues]
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Blocks</CardTitle>
            </CardHeader>
            <CardContent className={"w-full"}>
                {fields.map((f, index) => (
                    <Card className={"w-full"} key={index}>
                        <CardHeader className={"flex flex-row justify-between"}>
                                <CardTitle>{f}</CardTitle>
                                <Button
                                    type={"button"}
                                    onClick={() => handleRemoveField(index)}
                                    variant={"outline"}
                                    size={"icon"}
                                ><DeleteIcon/></Button>

                        </CardHeader>
                            <CardContent className={"w-full"}>
                                 {f === "notion editor" &&
                                    <> 
                                     <Editor
                                         value={field?.value[index]?.content ? JSON.parse(field.value?.[index]?.content) : ""}
                                         onChangeValue={newValue => {
                                             field.value[index] = {
                                                 type : "notion editor",
                                                 content: newValue
                                             }
                                         }}
                                     />
                                    </>
                                }
                                {f === "quill text editor" &&
                                <>
                                <QuillEditor
                                        name={"editor"+index}
                                        value={field?.value[index]?.content ? field?.value[index]?.content : ""}
                                        onChange={newValue => {
                                            field.value[index] = {
                                                type : "quill text editor",
                                                content: newValue
                                            }
                                        }}
                                    />
                                </>
                                    
                                }
                                {f === "quill js text editor" &&
                                <>
                                <QuillEditorJS
                                        
                                    />
                                </>
                                    
                                }
                                {/* {f === "novel text editor" &&
                                <>
                                    <NovalEditor 
                                        className='dark:bg-background'
                                        onUpdate={ (editor)=> {
                                            field.value[index] = {
                                                type : "quill text editor",
                                                content: editor
                                            }
                                        }}
                                    
                                    />
                                </>
                                    
                                } */}
                            </CardContent>
                    </Card>
                ))}
            </CardContent>
            <CardFooter >
                <Popover>
                    <PopoverTrigger className={"content-center"}>
                        <Button type={"button"} variant={"secondary"} className={"rounded-full h-[50px] w-[50px]"}><PlusIcon /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full flex flex-row gap-5">
                        {typeFields.map(e => (
                            <Button
                                key={e}
                                variant={"secondary"}
                                type={"button"}
                                className={"flex font-bold hover:border-card justify-center items-center gap-y-2 flex-col h-full"}
                                onClick={() => handleAddField(e)}
                            >
                                <div className={"p-[25px] bg-card rounded-full"}>
                                    <PlusIcon className={""}/>
                                </div>
                                {e}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    );
};

export default DynamicForm;