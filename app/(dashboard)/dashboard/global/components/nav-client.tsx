"use client"

import { Button } from "@/components/dashboard/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard/ui/card";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/ui/tabs";
import NavbarItemForm from "./nav-form";
import { useContext } from "react";
import { LanguageContext } from "@/components/dashboard/providers/language-provider";
import { NavbarClientProps } from "./type";



export default function NavbarClient({navbarItems,pages, articles, dropdownGroups,dropdownItems}:NavbarClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
        
                <Tabs defaultValue={navbarItems ? navbarItems[0]?.id : "create"} className="w-full">
                    <TabsList className={`flex flex-row w-fit  mx-auto`}>
                        {navbarItems.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} className={"px-5"}>{nav?.translations?.find(e => e.lang === selectedLang)?.name}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" className={"px-5"}>Create</TabsTrigger>
                    </TabsList>
                    {navbarItems.map(nav => (
                                <TabsContent id={nav.id} key={nav.id}  value={nav.id}>
                                        <NavbarItemForm 
                                            pages={pages}
                                            dropdownGroups={dropdownGroups}
                                            articles={articles}
                                            dropdownItems={dropdownItems} 
                                            initialData={nav}/>
                                </TabsContent>
                    ))}
                    
                    <TabsContent id={"create"} value="create">
                        <NavbarItemForm 
                            dropdownItems={dropdownItems} 
                            pages={pages}
                            dropdownGroups={dropdownGroups}
                            articles={articles}
                        />
                    </TabsContent>
                </Tabs>
            
    )
}