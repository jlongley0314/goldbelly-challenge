import { useQuery } from "react-query";

async function getUrlBySlug(accessToken: string, slug: string) {
  let myHeaders = new Headers();
  myHeaders.append("GB-Access-Token", accessToken);
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/links/${slug}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  if (!response.ok) {
    throw new Error(`Error fetching url with slug: ${slug}`);
  }
  return await response.json();
}

export function useGetUrlBySlug(accessToken: string, slug: string) {
  return useQuery(
    `getUrlBySlug:${slug}`,
    () => getUrlBySlug(accessToken, slug),
    {
      enabled: !!accessToken && accessToken !== "" && !!slug && slug !== "",
    }
  );
}
