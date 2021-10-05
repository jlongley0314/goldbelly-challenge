import { useMutation } from "react-query";

export function useCreateShortenedUrl(accessToken: string) {
  return useMutation(async (formData: FormData) => {
    let myHeaders = new Headers();
    myHeaders.append("GB-Access-Token", accessToken);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/links`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw error.error;
    }

    return response;
  });
}
