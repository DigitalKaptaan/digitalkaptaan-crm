"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/ui/table.module.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  // optional custom cell renderer: (row, value) => ReactNode
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[]; // full data when client-side
  total?: number; // required for server-side
  pageSizeOptions?: number[];
  initialPage?: number;
  initialPageSize?: number;
  serverSide?: boolean; // if true, expects onPageChange to be provided
  onPageChange?: (opts: {
    page: number;
    pageSize: number;
    sortKey?: string;
    sortDir?: "asc" | "desc";
  }) => void;
  className?: string;
  loading?: boolean;
};

function sortData<T>(arr: T[], key: string, dir: "asc" | "desc") {
  const copy = [...arr];
  copy.sort((a: any, b: any) => {
    const av = a?.[key];
    const bv = b?.[key];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "number" && typeof bv === "number") {
      return dir === "asc" ? av - bv : bv - av;
    }
    const sa = String(av).toLowerCase();
    const sb = String(bv).toLowerCase();
    if (sa === sb) return 0;
    return dir === "asc" ? (sa > sb ? 1 : -1) : sa > sb ? -1 : 1;
  });
  return copy;
}

export default function Table<T extends Record<string, any>>(
  props: TableProps<T>
) {
  const {
    columns,
    data,
    total,
    pageSizeOptions = [10, 25, 50],
    initialPage = 1,
    initialPageSize = pageSizeOptions[0],
    serverSide = false,
    onPageChange,
    className,
    loading = false,
  } = props;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // totalItems defaults to client-side length if not provided
  const totalItems = typeof total === "number" ? total : data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // When serverSide and onPageChange provided, call it whenever page/pageSize/sort changes
  useEffect(() => {
    if (serverSide && typeof onPageChange === "function") {
      onPageChange({ page, pageSize, sortKey, sortDir });
    }
  }, [page, pageSize, sortKey, sortDir, serverSide]);

  // For client-side, apply sorting and slicing
  const visibleRows = useMemo(() => {
    if (serverSide) {
      // when server side, data already corresponds to current page
      return data;
    }
    let processed = data ?? [];
    if (sortKey) {
      processed = sortData(processed, sortKey, sortDir);
    }
    const start = (page - 1) * pageSize;
    return processed.slice(start, start + pageSize);
  }, [data, page, pageSize, sortKey, sortDir, serverSide]);

  // handlers
  const goToPage = (p: number) => {
    const newPage = Math.min(Math.max(1, p), totalPages);
    setPage(newPage);
  };

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = String(col.key);
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      setPage(1);
      return;
    }
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  // small pager helper: show pages near current
  const paginationRange = (() => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (range[0] !== 1) range.unshift(1);
    if (range[0] > 2) range.splice(1, 0, -1); // -1 = dots
    if (range[range.length - 1] !== totalPages) range.push(-1, totalPages);
    return range;
  })();

  return (
    <div className={`${styles.tableWrap} ${className ?? ""}`}>
      <div className={styles.tableContainer} aria-busy={loading}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => {
                  const isSorted = sortKey === String(col.key);
                  return (
                    <th
                      key={String(col.key)}
                      onClick={() => toggleSort(col)}
                      className={`${styles.th} ${
                        col.sortable ? styles.sortable : ""
                      } ${col.className ?? ""}`}
                      role={col.sortable ? "button" : undefined}
                      tabIndex={col.sortable ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (
                          col.sortable &&
                          (e.key === "Enter" || e.key === " ")
                        )
                          toggleSort(col);
                      }}
                      aria-sort={
                        isSorted
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <div className={styles.thInner}>
                        <span>{col.label}</span>
                        {col.sortable ? (
                          <span className={styles.sortIcon}>
                            {isSorted ? (
                              sortDir === "asc" ? (
                                <FaSortUp />
                              ) : (
                                <FaSortDown />
                              )
                            ) : (
                              <FaSort />
                            )}
                          </span>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {visibleRows.length === 0 ? (
                <tr>
                  <td className={styles.empty} colSpan={columns.length}>
                    {loading ? "Loading..." : "No data available"}
                  </td>
                </tr>
              ) : (
                visibleRows.map((row, rIdx) => (
                  <tr key={(row as any).id ?? rIdx} className={styles.tr}>
                    {columns.map((col) => (
                      <td key={String(col.key)} className={styles.td}>
                        {col.render
                          ? col.render(row)
                          : (row as any)[col.key as string]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination controls */}
      <div className={styles.footer}>
        <div className={styles.leftControls}>
          <label className={styles.pageSizeLabel}>
            Show
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s} color="red">
                  {s}
                </option>
              ))}
            </select>
            /page
          </label>
          <div className={styles.summary}>
            {totalItems > 0 ? (
              <>
                {`Showing ${(page - 1) * pageSize + 1} - ${Math.min(
                  totalItems,
                  page * pageSize
                )} of ${totalItems}`}
              </>
            ) : (
              "No entries"
            )}
          </div>
        </div>

        <div className={styles.pager}>
          <button
            className={styles.pagerBtn}
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            <FaChevronLeft color="#000" />
          </button>

          {paginationRange.map((p, i) =>
            p === -1 ? (
              <span key={`dots-${i}`} className={styles.dots}>
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`${styles.pagerItem} ${
                  p === page ? styles.activePage : styles.deActivePage
                }`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            className={styles.pagerBtn}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            <FaChevronRight color="#000" />
          </button>
        </div>
      </div>
    </div>
  );
}
