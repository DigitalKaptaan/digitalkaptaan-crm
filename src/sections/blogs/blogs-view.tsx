"use client";
import { useBlogs } from "@/hooks";
import { Table } from "@/shared";
import { Column } from "@/shared/ui/Table";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { FaPencil } from "react-icons/fa6";

type BLOG = {
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

const BlogsView = () => {
  const { push } = useRouter();
  const { data, error, handlePageChange, loading, total } = useBlogs();

  const columns = useMemo<Column<BLOG>[]>(
    () => [
      { key: "title", label: "Title", sortable: true },
      { key: "status", label: "Status", sortable: true },
      { key: "createdAt", label: "Created", sortable: true },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <FaPencil
            onClick={() => push(`/blog/edit/${row.slug}`)}
            className=""
          />
        ),
      },
    ],
    [push]
  );

  return (
    <div>
      <h2>Users</h2>
      {error && <div>{error}</div>}
      <Table
        serverSide
        columns={columns}
        data={data}
        total={total}
        onPageChange={handlePageChange}
        loading={loading}
        initialPageSize={10}
      />
    </div>
  );
};

export default BlogsView;
