"use client";

import axios from "axios";
import { useState } from "react";
import {EditIcon, TrashIcon, ViewIcon,} from "lucide-react";
import toast from 'react-hot-toast';
import {useParams, useRouter} from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CopyleftIcon } from "lucide-react";






export const CellAction = ({
  data,
}: {data:any}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/category/${data.id}`);
      toast.success('Tag deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Make sure you removed all categories using this tag first.');
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };


  return (
    <>

<div className="relative flex items-start gap-2">
        <TooltipProvider>
                <Tooltip>
                    <TooltipContent>
                        View Item
                    </TooltipContent>
                  <TooltipTrigger>
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <ViewIcon onClick={() => router.push(`category/${data.id}#view`)}/>
                      </span>
                  </TooltipTrigger>
                </Tooltip>
                <Tooltip>
                    <TooltipContent>
                        Edit Item
                    </TooltipContent>
                    <TooltipTrigger>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon onClick={() => router.push(`category/${data.id}#edit`)}/>
                          </span>
                    </TooltipTrigger>
                </Tooltip>
                <Tooltip>
                    <TooltipContent color={"1a2e05"}>
                        Delete item
                    </TooltipContent>
                    <TooltipTrigger>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <TrashIcon onClick={() => setOpen(true)}/>
                          </span>
                    </TooltipTrigger>
                </Tooltip>
        </TooltipProvider>
          </div>
      
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onConfirm}
          loading={loading}
        />
          
    </>
  );
};
