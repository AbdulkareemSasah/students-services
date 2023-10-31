"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/ui/tabs";
import { useContext } from "react";
import { LanguageContext } from "@/components/dashboard/providers/language-provider";
import DropdownItemForm from "./dropdown-item-form";
import { DropDownClientProps } from "./type";



export default function DropDownItemClient({navbarItems,pages, articles, dropdownGroups,dropdownItems}:DropDownClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
        <div className="flex justify-center items-center container">
                <Tabs defaultValue={dropdownItems.length>0 ? dropdownItems[0]?.id : "create"} className="w-full">
                    <TabsList className={`container mx-auto`}>
                        {dropdownItems.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} >{nav?.translations?.find(e => e.lang === selectedLang)?.name}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" >Create</TabsTrigger>
                    </TabsList>
                    {dropdownItems.map(nav => (
                                <TabsContent id={nav.id} key={nav.id}  value={nav.id}>
                                        <DropdownItemForm 
                                            pages={pages}
                                            navbarItems={navbarItems}
                                            dropdownGroups={dropdownGroups}
                                            articles={articles}
                                            initialData={nav}
                                            />
                                </TabsContent>
                    ))}
                    
                    <TabsContent id={"create"} value="create">
                    <DropdownItemForm 
                                            pages={pages}
                                            navbarItems={navbarItems}
                                            dropdownGroups={dropdownGroups}
                                            articles={articles}       
                    />
                    </TabsContent>

                </Tabs>
                </div>
           
    )
}