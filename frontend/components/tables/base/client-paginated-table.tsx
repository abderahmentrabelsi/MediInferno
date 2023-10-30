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
  Card,
  CardBody
} from '@nextui-org/react';
import { snakeCaseToHumanReadable } from '@utils/string-utils';
import { UseQueryResult } from '@tanstack/react-query';

export interface RenderTableCellProps<
  T,
  K extends string | number | symbol = never
> {
  columnKey: keyof Omit<T, K>;
  item: Omit<T, K>;
}

interface ClientPaginatedTableProps<
  T extends Record<string, any>,
  K extends string | number | symbol = never
> {
  useQuery: (val: any) => UseQueryResult<T[]>;
  RenderCell: React.FC<RenderTableCellProps<T, K>>;
  rowsPerPage?: number;
  actions?: (id: number) => ReactNode;
  excludeKeys?: Array<K>;
}

const ClientPaginatedTable = <
  T extends Record<string, any>,
  K extends keyof T = never
>({
  useQuery,
  RenderCell,
  rowsPerPage = 10,
  actions,
  excludeKeys = []
}: ClientPaginatedTableProps<T, K>) => {
  const [page, setPage] = useState(1);
  const { data: rawData, isError, error, isLoading } = useQuery({});

  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rawData?.slice(start, end) ?? [];
  }, [rawData, page, rowsPerPage]);

  const columnKeys = useMemo(() => {
    const keys = Object.keys(data?.[0] ?? {}) as Array<keyof T>;
    return keys.filter((key) => !excludeKeys.includes(key as K));
  }, [data, excludeKeys]);

  if (!data || isLoading) {
    return <Skeleton className="w-full min-h-[250px] rounded-xl my-2" />;
  }

  if (isError) {
    return <div>Error: {error?.toString()}</div>;
  }

  if (!data.length || !columnKeys.length) {
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
        rawData?.length > rowsPerPage ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={Math.ceil(rawData.length / rowsPerPage)}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
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
        items={data}
        loadingContent={<Skeleton className="w-full min-h-[250px]" />}
      >
        {(item: T) => (
          <TableRow key={`item-${item.id}`}>
            {columnKeys.map((columnKey) => (
              <TableCell key={`item-${item.id}-${String(columnKey)}`}>
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

export default ClientPaginatedTable;
