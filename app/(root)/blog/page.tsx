import getData from "@/actions/get-data";
import { CategoriesCard, TagsCard, ArticlesCard } from "./components";
export const revalidate = 0;
export default async function Page() {
  const categories = await getData({
    model: "category",
  });
  const tags = await getData({
    model: "tag",
  });
  const articles = await getData({
    model: "article",
  });
  return (
    <div className="grid gap-x-3 lg:grid-cols-8 grid-cols-1 sm:space-y-5 md:space-y-5">
      <ArticlesCard articles={articles} />
      <div className="sticky col-span-2 top-10 space-y-6 w-full">
        <CategoriesCard categories={categories} />
        <TagsCard tags={tags} />
      </div>
    </div>
  );
}
