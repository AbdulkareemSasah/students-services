"use client"

import { Button } from "@/components/dashboard/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard/ui/card";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/ui/tabs";
import { useContext } from "react";
import { LanguageContext } from "@/components/dashboard/providers/language-provider";
import GroupFooterForm from "./footer-group-form";
import { GroupFooterClientProps } from "./type";


export default function GroupFooterClient({pages, articles,groupFooters}:GroupFooterClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
        <div className="flex justify-center items-center container">
                <Tabs defaultValue={groupFooters.length>0 ? groupFooters[0]?.id : "create"} className="w-full">
                    <TabsList className={`container mx-auto`}>
                        {groupFooters.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} >{nav?.translations?.find(e => e.lang === selectedLang)?.title}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" >Create</TabsTrigger>
                    </TabsList>
                    {groupFooters.map(group => (
                                <TabsContent id={group.id} key={group.id}  value={group.id}>
                                        <GroupFooterForm 
                                            pages={pages}
                                            articles={articles} 
                                            initialData={group}
                                            />
                                </TabsContent>
                    ))}
                    
                    <TabsContent id={"create"} value="create">
                    <GroupFooterForm 
                            pages={pages}
                            articles={articles} 
                        />
                    </TabsContent>
                </Tabs>   
                </div> 
    )
}