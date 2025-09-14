"use client";
import { getBlogListAction } from "@/networking";
import { useCallback, useEffect, useState } from "react";

export function useBlogs(initialPage = 1, initialPageSize = 10) {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = useCallback(
    async ({
      page,
      pageSize,
      sortKey,
      sortDir,
    }: {
      page: number;
      pageSize: number;
      sortKey?: string;
      sortDir?: "asc" | "desc";
    }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await getBlogListAction(page, pageSize);

        if (res.status !== 200) {
          throw new Error("Something went wrong while fetching blogs");
        }
        setData(res.data.data.blogs ?? []);
        setTotal(res.data.data.pagination?.totalItems ?? 0);
      } catch (err: any) {
        setError(err?.message || "Something went wrong while fetching blogs");
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
