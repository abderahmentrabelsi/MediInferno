'use client';

import React, { ReactNode, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Skeleton,
  Card
} from '@nextui-org/react';
import { snakeCaseToHumanReadable } from '@utils/string-utils';
import { CardBody } from '@nextui-org/card';
import {
  IdentifiableSchema,
  PaginatedQuery
} from '@/app/tickets/_api/ticketCustomSchemas';

export interface RenderTableCellProps<
  T,
  K extends string | number | symbol = never
> {
  columnKey: keyof Omit<T, K>;
  item: Omit<T, K>;
}

interface PaginatedTableProps<
  T extends IdentifiableSchema,
  K extends string | number | symbol = never,
  V extends Record<string, string> = Record<string, string>
> {
  useQuery: PaginatedQuery<T, V>;
  RenderCell: React.FC<RenderTableCellProps<T, K>>;
  rowsPerPage?: number;
  actions?: (id: number) => ReactNode;
  excludeKeys?: Array<K>;
  useQueryPathParams?: V;
}

const PaginatedTable = <
  T extends IdentifiableSchema,
  K extends keyof T = never,
  V extends Record<string, string> = Record<string, string>
>({
  useQuery,
  RenderCell,
  rowsPerPage = 10,
  actions,
  excludeKeys = [], // Default to an empty array
  useQueryPathParams
}: PaginatedTableProps<T, K, V>) => {
  const [page, setPage] = useState(1);

  const {
    data: rawData,
    isError,
    error,
    isLoading
  } = useQuery({
    queryParams: {
      skip: (page - 1) * rowsPerPage,
      limit: rowsPerPage
    },
    // @ts-ignore
    pathParams: useQueryPathParams
  });

  const data = useMemo(() => {
    if (rawData && actions) {
      return {
        ...rawData,
        // @ts-ignore <-- gadma
        items: rawData.map((item: T) => ({
          ...item,
          actions: actions(item.id)
        }))
      };
    } else {
      return rawData;
    }
  }, [rawData, actions, excludeKeys, page]);

  const columnKeys = useMemo(() => {
    const keys = Object.keys(data?.items?.[0] ?? {}) as Array<keyof T>;
    return keys.filter((key) => !excludeKeys.includes(key as K));
  }, [data, excludeKeys]);

  if (!data || isLoading) {
    return <Skeleton className="w-full min-h-[250px] rounded-xl my-2" />;
  }

  if (isError) {
    return <div>Error: {error?.toString()}</div>;
  }

  if (!data.items?.length || !columnKeys) {
    return (
      <Card>
        <CardBody>No Data</CardBody>
      </Card>
    );
  }

  return (
    <Table
      isHeaderSticky
      isStriped
      bottomContent={
        data.total_pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={data.total_pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
      classNames={{
        table: 'min-h-[150px]'
      }}
    >
      <TableHeader>
        {columnKeys.map((columnKey) => (
          <TableColumn key={columnKey as string} className="text-xs uppercase">
            {snakeCaseToHumanReadable(String(columnKey)).toUpperCase()}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={data?.items}
        loadingContent={<Skeleton className="w-full min-h-[250px]" />}
      >
        {(item: T) => (
          <TableRow key={`item-${item.id}`}>
            {columnKeys.map((columnKey) => (
              <TableCell key={`${item.id}-${String(columnKey)}`}>
                <RenderCell
                  columnKey={columnKey as Exclude<keyof T, K>}
                  item={item as Omit<T, K>}
                />
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PaginatedTable;
