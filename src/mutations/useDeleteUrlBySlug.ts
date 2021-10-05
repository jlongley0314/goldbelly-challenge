import { useMutation } from "react-query";

export function useDeleteUrlBySlug(accessToken: string) {
  return useMutation(async (slug: string) => {
    let myHeaders = new Headers();
    myHeaders.append("GB-Access-Token", accessToken);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/links/${slug}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw error.error;
    }

    return response;
  });
}
