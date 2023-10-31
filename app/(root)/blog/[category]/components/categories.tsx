"use client";
import {Card , CardBody, CardHeader , Link} from "@nextui-org/react"
import { useTranslation } from "react-i18next";
import Image from 'next/image'
export function CategoriesCard({ categories }: { categories: any[] }) {
    const {t, i18n} = useTranslation()
  return (
    <ul className="grid col-span-6 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <li>
          <Link className="w-full" href={`blog/${category.translations.find((t:any) => t.lang === i18n.language)?.name}`}>
          {category.translations.find((t:any) => t.lang === i18n.language)?.name}
        </Link>
        </li>
      ))}
    </ul>
  );
}
