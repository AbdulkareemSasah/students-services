"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { LanguageContext } from "@/components/providers/language-provider";
import DropdownGroupForm from "./dropdown-group-form";
import { DropDownGroupClientProps } from "./type";


export default function DropDownGroupClient({navbarItems, dropdownGroups,dropdownItems}:DropDownGroupClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
                <Tabs defaultValue={dropdownGroups.length>0 ? dropdownGroups[0]?.id : "create"} className="w-full">
                    <TabsList className={`flex flex-row w-fit  mx-auto`}>
                        {dropdownGroups.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} className={"px-5"}>{nav?.translations?.find((e:any) => e.lang === selectedLang)?.name}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" className={"px-5"}>Create</TabsTrigger>
                    </TabsList>
                    {dropdownGroups.map(nav => (
                                <TabsContent id={nav.id} key={nav.id}  value={nav.id}>
                                        <DropdownGroupForm 
                                            navbarItems={navbarItems}
                                            dropdownItems={dropdownItems} 
                                            initialData={nav}/>
                                </TabsContent>
                    ))}
                    
                    <TabsContent id={"create"} value="create">
                    <DropdownGroupForm 
                        navbarItems={navbarItems}
                        dropdownItems={dropdownItems} 
                        />
                    </TabsContent>
                </Tabs>    
    )
}