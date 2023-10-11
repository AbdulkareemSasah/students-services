"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { LanguageContext } from "@/components/providers/language-provider";
import GroupFooterForm from "./footer-group-form";
import { GroupFooterClientProps } from "./type";


export default function GroupFooterClient({pages, articles,groupFooters}:GroupFooterClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
                <Tabs defaultValue={groupFooters.length>0 ? groupFooters[0]?.id : "create"} className="w-full">
                    <TabsList className={`flex flex-row w-fit  mx-auto`}>
                        {groupFooters.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} className={"px-5"}>{nav?.translations?.find(e => e.lang === selectedLang)?.title}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" className={"px-5"}>Create</TabsTrigger>
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
    )
}