type GetProps = {
    slug: string
    
  }
  const getArticle = async ({ slug }: GetProps): Promise<any[]> => {
    const URL = `${process.env.NEXT_PUBLIC_URL}/api/${slug}`;
    const res = await fetch(URL);
    return res.json();
  };
  export default getArticle