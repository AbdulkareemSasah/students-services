"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard/ui/tabs";
import { useContext } from "react";
import { LanguageContext } from "@/components/dashboard/providers/language-provider";
import DropdownGroupForm from "./dropdown-group-form";
import { DropDownGroupClientProps } from "./type";


export default function DropDownGroupClient({navbarItems, dropdownGroups,dropdownItems}:DropDownGroupClientProps) {
    const { selectedLang } = useContext(LanguageContext);

    return (
        <div className="flex justify-center items-center container">
                <Tabs defaultValue={dropdownGroups.length>0 ? dropdownGroups[0]?.id : "create"} className="w-full">
                    <TabsList className={`container mx-auto`}>
                        {dropdownGroups.map(nav => (
                                <TabsTrigger value={nav.id} key={nav.id} >{nav?.translations?.find((e:any) => e.lang === selectedLang)?.name}</TabsTrigger>
                        ))}
                        <TabsTrigger value="create" >Create</TabsTrigger>
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
                </div>
    )
}