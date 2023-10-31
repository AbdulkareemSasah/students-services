"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/dashboard/ui/input";
import { Button } from "@/components/dashboard/ui/button";
import axios from "axios";
import { LanguageContext } from "@/components/dashboard/providers/language-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/dashboard/ui/form";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Check, ChevronsUpDown, Trash2Icon } from "lucide-react";
import { Heading } from "@/components/dashboard/ui/heading";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/dashboard/ui/command";
import { NavbarItem, NavbarItemTranslation } from "@prisma/client";
import { NavbarItemFormProps } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";

interface formatedTranslation {
  [language: string]: NavbarItemTranslation;
}
export function formatTranslation(
  translations: NavbarItemTranslation[]
): formatedTranslation {
  const result: formatedTranslation = {};

  translations.forEach((item) => {
    const { id, name, lang, navbarItemId, createdAt, updatedAt } = item;

    if (!result[lang]) {
      result[lang] = {
        id,
        name,
        lang,
        navbarItemId,
        createdAt,
        updatedAt,
      };
    }
  });

  return result;
}

function convertToTranslationArray(
  translationObject: formatedTranslation
): NavbarItemTranslation[] {
  const result: NavbarItemTranslation[] = [];

  for (const lang in translationObject) {
    if (translationObject.hasOwnProperty(lang)) {
      const { id, name, navbarItemId, createdAt, updatedAt } =
        translationObject[lang];

      result.push({
        id,
        name,
        lang,
        navbarItemId,
        createdAt,
        updatedAt,
      });
    }
  }

  return result;
}

type FormValues = {
  translations: formatedTranslation;
  dropdownGroups: string[];
  dropdownItems: string[];
} & NavbarItem;

const NavbarItemForm = ({
  initialData,
  pages,
  dropdownGroups,
  dropdownItems,
  articles,
}: NavbarItemFormProps) => {
  const { selectedLang } = useContext(LanguageContext);
  const { i18n, t } = useTranslation();
  const name = "navItem";
  const head = {
    title: initialData
      ? initialData.translations.find((t) => t.lang === selectedLang)?.name
      : t(`${name}.create.title`),
    description: t(`${name}.create.description`),
  };
  const title = initialData
    ? t(`${name}.edit.title`)
    : t(`${name}.create.title`);
  const description = initialData
    ? t(`${name}.edit.description`)
    : t(`${name}.create.description`);
  const toastMessage = {
    success: initialData
      ? t(`${name}.toast.update.success`)
      : t(`${name}.toast.create.success`),
    error: initialData
      ? t(`${name}.toast.update.error`)
      : t(`${name}.toast.create.error`),
  };
  const action = initialData ? t("Save changes") : t("Create");
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const [type, setType] = useState(
    initialData?.isDropdown
      ? "dropdown"
      : initialData?.forPage
      ? "page"
      : "article"
  );

  const [isFormEmpty, setIsFormEmpty] = useState(false);
  const [languages, setLanguages] = useState<any[]>([]);
  const defaultValues = initialData
    && {
        translations: formatTranslation(initialData.translations),
        dropdownGroups: initialData.dropdownGroups.map((d) => d.id),
        dropdownItems: initialData.dropdownItems.map((d) => d.id),
      }
    ;
  const form = useForm<FormValues>({
    // resolver: zodResolver(),
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  useEffect(() => {
    axios
      .get("/api/language")
      .then((data) => data.data)
      .then((lang) => {
        setLanguages(lang);
      });
  }, []);
  const AddsField = React.useMemo(() => {
    if (type === "page") {
      return (
        <FormField
          control={form.control}
          name="pageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>for Navbar</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value || ""}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value || ""}
                      placeholder="Select a billboard"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pages.map(({ id, translations }) => (
                    <SelectItem key={id} value={id}>
                      {
                        translations.find((t: any) => t.lang === selectedLang)
                          ?.title
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (type === "article") {
      return (
        <FormField
          control={form.control}
          name="articleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>for Navbar</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value || ""}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value || ""}
                      placeholder="Select a billboard"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {articles.map(({ id, translations }) => (
                    <SelectItem key={id} value={id}>
                      {
                        translations.find((t: any) => t.lang === selectedLang)
                          ?.title
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    if (type === "dropdown") {
      return (
        <>
          <FormField
            control={form.control}
            name={`dropdownGroups`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t(`navItem.form.tags.label`)}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? field.value.length + " Selected"
                          : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t(`navItem.form.tag.search.placeholder`)}
                      />
                      <CommandEmpty>{t("navItem.form.tag.empty")}</CommandEmpty>
                      <CommandGroup>
                        {dropdownGroups.map((d) => (
                          <CommandItem
                            value={d.id}
                            key={d.id}
                            onSelect={() => {
                              const selectedIds = Array.isArray(field.value)
                                ? field.value
                                : [];
                              form.setValue(`dropdownGroups`, [
                                ...selectedIds,
                                d.id,
                              ]);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                Array.isArray(field.value) &&
                                  field.value.includes(d.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {
                              d.translations.find(
                                (e: any) => e.lang === selectedLang
                              )?.name
                            }
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t("navItem.form.tag.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`dropdownItems`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t(`navItem.form.tags.label`)}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? field.value.length + " Selected"
                          : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t(`navItem.form.tag.search.placeholder`)}
                      />
                      <CommandEmpty>{t("navItem.form.tag.empty")}</CommandEmpty>
                      <CommandGroup>
                        {dropdownItems.map((d) => (
                          <CommandItem
                            value={d.id}
                            key={d.id}
                            onSelect={() => {
                              const selectedIds = Array.isArray(field.value)
                                ? field.value
                                : [];
                              form.setValue(`dropdownItems`, [
                                ...selectedIds,
                                d.id,
                              ]);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                Array.isArray(field.value) &&
                                  field.value.includes(d.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {
                              d.translations.find(
                                (e: any) => e.lang === selectedLang
                              )?.name
                            }
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t("navItem.form.tag.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }
  }, [
    type,
    selectedLang,
    form,
    loading,
    pages,
    t,
    dropdownGroups,
    articles,
    dropdownItems,
  ]);

  const onSubmit = async () => {
    setLoading(true);
    let formData: any = {
      translations: convertToTranslationArray(form.getValues().translations),
    };
    if (type === "article") {
      formData["isDropdown"] = false;
      formData["forPage"] = false;
      formData["forArticle"] = true;
      formData["articleId"] = form.getValues().articleId;
      formData["pageId"] = null;
      formData["dropdownGroups"] = [];
      formData["dropdownItems"] = [];
    }
    if (type === "page") {
      formData["isDropdown"] = false;
      formData["forPage"] = true;
      formData["forArticle"] = false;
      formData["articleId"] = null;
      formData["pageId"] = form.getValues().pageId;
      formData["dropdownGroups"] = [];
      formData["dropdownItems"] = [];
    }
    if (type === "dropdown") {
      formData["isDropdown"] = true;
      formData["forPage"] = false;
      formData["forArticle"] = false;
      formData["articleId"] = null;
      formData["pageId"] = null;
      formData["dropdownGroups"] = form.getValues().dropdownGroups;
      formData["dropdownItems"] = form.getValues().dropdownItems;
    }

    const isTranslationsEmpty = formData.translations.every((t: any) => {
      return !t.name.trim();
    });
    if (isTranslationsEmpty) {
      setIsFormEmpty(true);
      return;
    }
    setIsFormEmpty(false);
    if (initialData) {
      try {
        const response = await fetch(`/api/${name}/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          let data = await response.json();

          initialData = formData;
          toast.success(toastMessage.success);
        } else {
          console.error("Failed to submit data");
          toast.error(toastMessage.error);
        }
      } catch (error) {
        console.error("Error submitting data", error);
        toast.error(toastMessage.error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`/api/${name}`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          form.reset();
          toast.success(toastMessage.success);
        } else {
          console.error("Failed to submit data");
          toast.error(toastMessage.error);
        }
      } catch (error) {
        console.error("Error submitting data", error);
        toast.error(toastMessage.error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className={"container mx-auto space-y-8 max-w-sm"}
    >
      <div className="flex items-center justify-between">
        <Heading title={head.title} description={head.description} />
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl"}>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              {languages.map((l, index) => {
                return (
                  <div
                    key={l.language}
                    className={
                      selectedLang === l.language ? "gap-y-3" : "hidden"
                    }
                  >
                    <FormItem>
                      <FormLabel>{t(`${name}.form.name`)}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...register(`translations.${l.language}.name`)}
                        />
                      </FormControl>
                      {errors.translations?.[l.language]?.name && (
                        <p>
                          {errors.translations?.[l.language]?.name?.message}
                        </p>
                      )}
                    </FormItem>
                    <FormItem hidden={true}>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...register(`translations.${l.language}.lang`)}
                          hidden={true}
                          value={l.language}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                );
              })}

              <FormItem>
                <FormLabel>for Navbar</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={(value) => setType(value)}
                  value={type}
                  defaultValue={type}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={type}
                        placeholder="Select a billboard"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key={"page"} value={"page"}>
                      {t("page")}
                    </SelectItem>
                    <SelectItem key={"dropdown"} value={"dropdown"}>
                      {t("dropdown")}
                    </SelectItem>
                    <SelectItem key={"article"} value={"article"}>
                      {t("article")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>

              {AddsField}
              {isFormEmpty && <p>يرجى ملء جميع الحقول اللغوية</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {action}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default NavbarItemForm;
