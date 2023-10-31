"use client";

import { Card, CardBody, CardHeader, Link, Chip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export function TagsCard({ tags }: { tags: any[] }) {
    const {t, i18n} = useTranslation()
  return (
    <Card>
      <CardHeader>
        <h3>Tags</h3>
      </CardHeader>
      <CardBody>
        {tags.map((tag) => (
          <Chip key={tag.id}>
            <Link href={`blog/tag/${tag.translations.find((t:any) => t.lang === i18n.language).name}`}>
              {tag.translations.find((t:any) => t.lang === i18n.language).name}
            </Link>
          </Chip>
        ))}
      </CardBody>
    </Card>
  );
}
