"use client";

import {useContext, useEffect, useState} from 'react';

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {Badge} from "@/components/ui/badge";
import {LanguageContext} from "@/components/providers/language-provider";

interface MultiSelectFieldProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
                                                     disabled,
                                                     onChange,
                                                     onRemove,
                                                     value,
                                                 }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { selectedLang } = useContext(LanguageContext);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((text) => (
                    <div key={text} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(text)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Badge>{text}</Badge>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default MultiSelectField;
