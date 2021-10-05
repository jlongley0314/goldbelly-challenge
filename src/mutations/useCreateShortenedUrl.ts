import { useMutation } from "react-query";

export type UrlShortenerFormData = {
  url: string;
  short_url: string;
  slug?: string;
};

export function useCreateShortenedUrl(accessToken: string) {
  return useMutation(async (formData: UrlShortenerFormData) => {
    let headers = new Headers();
    headers.append("GB-Access-Token", accessToken);
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify(formData);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/links`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      if (error.errors && Object.keys(error.errors)[0]) {
        const errorKey = Object.keys(error.errors)[0];
        const errorValue = Object.values(error.errors)[0];
        const newError = new Error();
        newError.message = `${errorKey} ${errorValue}`;
        throw newError;
      } else {
        throw new Error("Something went wrong.");
      }
    }

    return response;
  });
}
