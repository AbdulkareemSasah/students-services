"use client"

import { Card, CardBody, CardHeader, Link } from "@nextui-org/react"
import { useTranslation } from "react-i18next"

 

export function CategoriesCard({categories}:{categories: any[]}) {
    const {t, i18n} = useTranslation()
    return (
        <Card>
            <CardHeader>
              <h2>Categories</h2>
            </CardHeader>
            <CardBody>
              {categories.map((category) => (
                <>
                  <div key={category.id} className="content-start">
                    <Link
                        className="py-2 "
                      href={`blog/${category.translations.find((t:any) => t.lang === i18n.language)?.name}`}
                    >
                      {category.translations.find((t:any) => t.lang === i18n.language)?.name}
                    </Link>
                  </div>
                </>
              ))}
            </CardBody>
          </Card>
    )
}