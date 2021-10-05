import { useMutation } from "react-query";

export function useDeleteUrlBySlug(accessToken: string) {
  return useMutation(async (slug: string) => {
    let headers = new Headers();
    headers.append("GB-Access-Token", accessToken);
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "DELETE",
      headers: headers,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/links/${slug}`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      throw error.error;
    }

    return response;
  });
}
