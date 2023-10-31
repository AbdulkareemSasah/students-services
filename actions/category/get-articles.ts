type GetProps = {
    model: string
    take?: string
    skip?: string
    fore?: string
    filter?: string
}
const getDataFilter = async ({ model, take = "all", skip, fore = "short", filter = '' }: GetProps): Promise<any[]> => {
    const URL = `${process.env.NEXT_PUBLIC_URL}/api/${model}?take=${take}&skip=${skip}&for=${fore}&filter=${filter}`;
    const res = await fetch(URL);
    return res.json();
};
export default getDataFilter