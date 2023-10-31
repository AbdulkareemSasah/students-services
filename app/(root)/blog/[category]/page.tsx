import getData from "@/actions/get-data";
import { CategoriesCard } from "./components/categories";
import { ArticlesCard } from "./components/articles";
import { Link } from "@nextui-org/react";
export const revalidate = 0;
export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const articles = await getData({
    model: "article",
    take: "all",
    fore: "short",
    filter: JSON.stringify({
      category: {
        translations: {
          some: {
            name: params.category,
          },
        },
      },
    }),
  });
  const categories = await getData({
    model: "category",
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div>
      <CategoriesCard categories={categories} />
        </div>
      <ArticlesCard articles={articles} className="col-span-3" />
    </div>
  );
}
