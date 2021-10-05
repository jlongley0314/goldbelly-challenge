import { useQuery } from "react-query";

async function getAllGeneratedUrls(accessToken: string) {
  let myHeaders = new Headers();
  myHeaders.append("GB-Access-Token", accessToken);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/links`, {
    method: "GET",
    headers: myHeaders,
  });
  if (!response.ok) {
    throw new Error("Error fetching generated urls");
  }
  return await response.json();
}

export function useGetAllGeneratedUrls(accessToken: string) {
  return useQuery(
    "getAllGeneratedUrls",
    () => getAllGeneratedUrls(accessToken),
    {
      enabled: !!accessToken && accessToken !== "",
    }
  );
}
