"use client";
import { BlogForm } from "@/components";
import { updateBlogDetailsBySlugAction } from "@/networking";
import { createBlogAction } from "@/networking/blogs/blogAction";
import { showToast } from "@/utils";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  details?: {
    meta: {
      title: string;
      description: string;
      keywords: string[];
    };
    _id: string;
    title: string;
    content: string;
    coverImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    __v: number;
  };
  slug?: string;
  type: "CREATE" | "EDIT";
};

const BlogDetailsView = ({ details, slug, type }: Props) => {
  const handleBlog = useCallback(
    async (formData: {
      title: string;
      content: string;
      status: string;
      coverImage: string;
      coverFile?: File;
      meta: {
        title: string;
        description: string;
        keywords: string[];
      };
    }) => {
      const loadindId = toast.loading("Loading...", { position: "top-right" });
      try {
        const { title, content, status, coverImage, meta } = formData;
        if (type === "CREATE") {
          const response = await createBlogAction({
            title,
            content,
            status,
            coverImage: formData?.coverFile ?? null,
            meta,
          });

          if (response.status !== 201) {
            throw new Error(response?.message || "Something went wrong");
          }

          showToast(
            "SUCCESS",
            response?.message || "Blog created successfully"
          );

          return;
        }

        const response = await updateBlogDetailsBySlugAction(slug || "", {
          title,
          content,
          status,
          coverImage,
          meta,
        });

        if (response.status === 200) {
          showToast(
            "SUCCESS",
            response?.message || "Blog updated successfully ✅"
          );
        } else {
          throw new Error(response?.error || response?.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToast(
            "ERROR",
            error?.message || "Failed to update blog. Please try again."
          );
        } else {
          showToast("ERROR", "Failed to update blog. Please try again.");
        }
      } finally {
        toast.dismiss(loadindId);
      }
    },
    [slug, type]
  );

  return <BlogForm type={type} initialData={details} onSubmit={handleBlog} />;
};

export default BlogDetailsView;
