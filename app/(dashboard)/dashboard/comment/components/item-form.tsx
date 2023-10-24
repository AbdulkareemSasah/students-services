"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/dashboard/ui/input";
import { Button } from "@/components/dashboard/ui/button";
import axios from "axios";
import { z } from "zod";
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
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Check, ChevronsUpDown, Trash2Icon } from "lucide-react";
import { Heading } from "@/components/dashboard/ui/heading";
import { AlertModal } from "@/components/dashboard/modals/alert-modal";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/dashboard/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";
import { getTags } from "@/actions/get-tags";
import { ItemType } from "@/actions/get-categories";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import DynamicForm from "@/components/blocks/dynamic";

type Translation = {
  id?: string;
  lang: string;
  name: string;
  author: {
    name: string;
  };
  body: string;
};

interface formatedTranslation {
  [language: string]: {
    id?: string;
    name: string;
    body: string;
    lang: string;
    author: {
      name: string;
    };
  };
}

const formatedTranslationSchema = z.record(
  z.object({
    name: z.string(),
    body: z.string(),
    lang: z.string(),
    author: z.object({
      name: z.string(),
    }),
  })
);

export function formatTranslation(
  translations: Translation[]
): formatedTranslation {
  const result: formatedTranslation = {};

  translations.forEach((item) => {
    const { id, name, body, lang, author } = item;

    if (!result[lang]) {
      result[lang] = {
        id,
        name,
        lang,
        body,
        author,
      };
    }
  });

  return result;
}

function convertToTranslationArray(
  translationObject: formatedTranslation
): Translation[] {
  const result: Translation[] = [];

  for (const lang in translationObject) {
    if (translationObject.hasOwnProperty(lang)) {
      const { id, name, body, author } = translationObject[lang];

      result.push({
        id,
        name,
        body,
        lang,
        author,
      });
    }
  }

  return result;
}

type FormValues = {
  translations: formatedTranslation;
  articleId: string;
};

const FormValuesSchema = z.object({
  translations: formatedTranslationSchema,
  articleId: z.string(),
});

interface CommentFormProps {
  initialData?: {
    translations: any[];
  };
  articles: any[];
}
const ItemForm: React.FC<CommentFormProps> = ({ initialData, articles }) => {
  const { selectedLang } = useContext(LanguageContext);
  const params = useParams();
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const name = "comment";
  const head = {
    title: initialData
      ? initialData.translations.find((t) => t.lang === selectedLang)?.name
      : t(`comment.create.title`),
    description: initialData
      ? initialData.translations.find((t) => t.lang === selectedLang)
          ?.description
      : t(`comment.create.description`),
  };
  const title = initialData
    ? t(`comment.edit.title`)
    : t(`comment.create.title`);
  const description = initialData
    ? t(`comment.edit.description`)
    : t(`comment.create.description`);
  const toastMessage = {
    success: initialData
      ? t(`comment.toast.update.success`)
      : t(`comment.toast.create.success`),
    error: initialData
      ? t(`comment.toast.update.error`)
      : t(`comment.toast.create.error`),
  };
  const action = initialData ? t("Save changes") : t("Create");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const [isFormEmpty, setIsFormEmpty] = useState(false);
  const [languages, setLanguages] = useState<any[]>([]);
  const initialDataAfter =
    initialData && formatTranslation(initialData.translations);
  const defaultValues = initialData
    ? {
        translations: initialDataAfter,
      }
    : {
        articleId: "",
        translations: {
          ar: {
            name: "",
            lang: "ar",
            body: "",
          },
          en: {
            name: "",
            lang: "en",
            body: "",
          },
        },
      };
  const form = useForm<FormValues>({
    resolver: zodResolver(FormValuesSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  useEffect(() => {
    axios
      .get("/api/language")
      .then((data) => data.data)
      .then((lang) => {
        setLanguages(lang);
      })
      .catch((err) => {
        console.error(err);
        setLanguages([
          {
            label: "English",
            language: "en",
          },
          {
            label: "العربية",
            language: "ar",
          },
        ]);
      });
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const formData = {
      translations: convertToTranslationArray(form.getValues().translations),
    };

    const isTranslationsEmpty = formData.translations.every((t) => {
      return !t.name.trim();
    });
    if (isTranslationsEmpty) {
      setIsFormEmpty(true);
      setLoading(false);
      return;
    }

    setIsFormEmpty(false);
    if (initialData) {
      try {
        const response = await fetch(`/api/comment/${params?.id}`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          router.push(`/dashboard/comment/${params?.id}#view`);
          toast.success(toastMessage.success);
        } else {
          setLoading(false);
          console.error("Failed to submit data");
          toast.error(toastMessage.error);
        }
      } catch (error) {
        console.error("Error submitting data", error);
        toast.error(toastMessage.error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`/api/comment`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          form.reset();
          router.push(`/dashboard/comment`);
          toast.success(toastMessage.success);
        } else {
          setLoading(false);
          console.error("Failed to submit data");
          toast.error(toastMessage.error);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error submitting data", error);
        toast.error(toastMessage.error);
      } finally {
        setLoading(false);
      }
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/comment/${params?.id}`);
      router.refresh();
      router.push(`/dashboard/comment`);
      toast.success(t(`comment.toast.delete.success`));
    } catch (error: any) {
      toast.error(t(`comment.toast.delete.error`));
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


  return (
    <div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className={"space-y-8 w-full"}
    >
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={head.title} description={head.description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
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
                    <FormField
                      control={form.control}
                      name={`translations.${l.language}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t(`comment.form.name.label`)}</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder={t("comment.form.name.placeholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`translations.${l.language}.lang`}
                      render={({ field }) => (
                        <FormItem hidden={true}>
                          <FormControl>
                            <Input
                              disabled={loading}
                              {...field}
                              value={l.language}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`translations.${l.language}.body`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t(`comment.form.body.label`)}</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder={t(`comment.form.body.placeholder`)}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}

              <FormField
                control={form.control}
                name={`articleId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("comment.form.article.label")}</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-fit min-w-[8em]">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder={t("article.form.category.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-fit min-w-[8em]">
                        {articles.map((color) => (
                          <SelectItem
                            key={color.id}
                            value={color.id}
                          >
                            {color[selectedLang]?.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default ItemForm;
