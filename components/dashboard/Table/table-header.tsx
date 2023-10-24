"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";
import { Heading } from "@/components/dashboard/ui/heading";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "../selectLanguage";

export function TableHeader({
  data,
  link,
  title,
  description,
  showAddButton = true,
}: {
  data: any[];
  link: string;
  title: string;
  description?: string;
  showAddButton?: boolean;
}) {
  const router = useRouter();
  const params = useParams();
  const { t } = useTranslation();
  return (
    <div className="mt-3 flex items-center justify-between">
      <Heading title={title} description={description} />
      <div className="flex gap-5">
        {showAddButton && (
          <Button onClick={() => router.push(`${link}`)}>
            <Plus className="mr-2 h-4 w-4" /> {t("Add New")}
          </Button>
        )}
        <SelectLanguage />
      </div>
    </div>
  );
}
