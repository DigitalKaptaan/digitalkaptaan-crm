"use client";
import { getBlogListAction } from "@/networking";
import { getErrorMessage } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export function useBlogs(initialPage = 1, initialPageSize = 10) {
  const [data, setData] = useState<
    {
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
    }[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = useCallback(
    async ({ page, pageSize }: { page: number; pageSize: number }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await getBlogListAction(page, pageSize);

        if (res.status !== 200) {
          throw new Error("Something went wrong while fetching blogs");
        }
        setData(res.data.data.blogs ?? []);
        setTotal(res.data.data.pagination?.totalItems ?? 0);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message || "Something went wrong while fetching blogs");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handlePageChange({ page: initialPage, pageSize: initialPageSize });
  }, [handlePageChange, initialPage, initialPageSize]);

  return { data, total, loading, error, handlePageChange };
}
