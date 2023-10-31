"use client";
import {Card , CardBody, CardHeader , Link} from "@nextui-org/react"
import { useTranslation } from "react-i18next";
import Image from 'next/image'
export function ArticlesCard({ articles, className }: { articles: any[],className?: string }) {
    const {t, i18n} = useTranslation()
  return (
    <div className={"grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 "+ className}>
      {articles.map((article) => (
        <Link className="w-full" href={`${article.category.translations.find((t:any) => t.lang === i18n.language).name}/${article.translations.find((t:any) => t.lang === i18n.language)?.slug}`}>
        <Card key={article.id} className="w-full">
          <CardHeader>
            <h3>{article.translations.find((t:any) => t.lang === i18n.language)?.title}</h3>
            <p>{article.translations.find((t:any) => t.lang === i18n.language)?.description}</p>
          </CardHeader>
          <CardBody>
            {article.translations.find((t:any) => t.lang === i18n.language)?.Image?.map((img: string) => {
              <Image src={img} alt={article.translations.find((t:any) => t.lang === i18n.language)?.title} />;
            })}
          </CardBody>
        </Card>
        </Link>
      ))}
    </div>
  );
}
