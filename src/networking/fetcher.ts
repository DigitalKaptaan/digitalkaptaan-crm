import { getErrorMessage, getToken } from "@/utils";

const instance = {
  BASEURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  TIMEOUT: 5000,
};

export const https = {
  get: async (URL: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`${instance.BASEURL}${URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-store",
      });
      console.log("response", response, `${instance.BASEURL}${URL}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { status: response.status, data };
    } catch (error: unknown) {
      return {
        status: 500,
        error: getErrorMessage(error),
      };
    }
  },

  post: async <T extends Record<string, unknown>>(
    URL: string,
    body: T | FormData,
    option?: Record<string, string>
  ) => {
    try {
      const isFormData = body instanceof FormData;
      const token = await getToken();
      const response = await fetch(`${instance.BASEURL}${URL}`, {
        method: "POST",
        headers: {
          ...option,
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Authorization: `Bearer ${token?.value}`,
        },

        body: isFormData ? body : JSON.stringify(body),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { status: response.status, data };
    } catch (error: unknown) {
      return {
        status: 500,
        error: getErrorMessage(error),
      };
    }
  },

  put: async <T extends Record<string, unknown>>(URL: string, body: T) => {
    try {
      const token = await getToken();
      const response = await fetch(`${instance.BASEURL}${URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },

        body: JSON.stringify(body),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { status: response.status, data };
    } catch (error: unknown) {
      return {
        status: 500,
        error: getErrorMessage(error),
      };
    }
  },
};
