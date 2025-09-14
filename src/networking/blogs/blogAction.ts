"use server";
import { getErrorMessage } from "@/utils";
import { https } from "../fetcher";

export const getBlogListAction = async (page: number, pageSize: number) => {
  try {
    const res = await https.get(
      `/api/blog/admin/blogs?page=${page}&pageSize=${pageSize}`
    );

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    return {
      data: res.data,
      error: res.error,
      status: res.status,
      message: res?.data?.message,
    };
  } catch (error: unknown) {
    return {
      data: null,
      status: 500,
      error: getErrorMessage(error),
      message: getErrorMessage(error),
    };
  }
};
export const getBlogDetailsBySlugAction = async (slug: string) => {
  try {
    const res = await https.get(`/api/blog/admin/by/${slug}`);

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    return {
      data: res.data,
      error: res.error,
      status: res.status,
      message: res?.data?.message,
    };
  } catch (error: unknown) {
    return {
      data: null,
      status: 500,
      error: getErrorMessage(error),
      message: getErrorMessage(error),
    };
  }
};

export const updateBlogDetailsBySlugAction = async (
  slug: string,
  body: {
    title: string;
    content: string;
    coverImage: string;
    status: string;
    meta: {
      title: string;
      description: string;
      keywords: string[];
    };
  }
) => {
  try {
    const res = await https.put(`/api/blog/${slug}`, body);

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    return {
      data: res.data,
      error: res.error,
      message: res?.data?.message,
      status: res.status,
    };
  } catch (error: unknown) {
    return {
      data: null,
      status: 500,
      error: getErrorMessage(error),
      message: getErrorMessage(error),
    };
  }
};

export const createBlogAction = async (body: {
  title: string;
  content: string;
  coverImage: File | null; // ✅ allow File for upload
  status: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}) => {
  try {
    const formBody = new FormData();

    // file (cover image)
    if (body.coverImage) {
      formBody.append("file", body.coverImage);
    }

    // simple fields
    formBody.append("title", body.title);
    formBody.append("content", body.content);
    formBody.append(
      "meta",
      JSON.stringify({
        title: body.meta.title,
        description: body.meta.description,
        keywords: body.meta.keywords,
      })
    );

    const res = await https.post(`/api/blog/admin/create`, formBody);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(res.error || "Failed to create blog");
    }

    return {
      data: res.data,
      error: null,
      message: res.data?.message || "Blog created successfully",
      status: res.status,
    };
  } catch (error: unknown) {
    return {
      data: null,
      status: 500,
      error: getErrorMessage(error),
      message: getErrorMessage(error),
    };
  }
};
