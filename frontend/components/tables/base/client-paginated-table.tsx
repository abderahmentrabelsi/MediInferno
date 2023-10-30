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
  CardBody,
  Input
} from '@nextui-org/react';
import { randomString, snakeCaseToHumanReadable } from '@utils/string-utils';
import { UseQueryResult } from '@tanstack/react-query';
import { SearchIcon } from '@components/icons';

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
  excludeKeys = []
}: ClientPaginatedTableProps<T, K>) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = React.useState('');

  const {
    data: rawData,
    isError,
    error,
    isLoading
  } = useQuery({
    queryParams: {
      q: searchValue
    }
  });

  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rawData?.slice(start, end) ?? [];
  }, [rawData, page, rowsPerPage]);

  const columnKeys = useMemo(() => {
    const keys =
      rawData && rawData.length > 0
        ? (Object.keys(rawData[0]) as Array<keyof T>)
        : [];
    return keys.filter((key) => !excludeKeys.includes(key as K));
  }, [rawData, excludeKeys]);

  if (isError) {
    return <div>Error: {error?.toString()}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Your search query here..."
        value={searchValue}
        onValueChange={setSearchValue}
        startContent={
          <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      {rawData ? (
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
              <TableColumn
                key={columnKey as string}
                className="text-xs uppercase"
              >
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
              <TableRow key={`item-${randomString()}`}>
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
      ) : (
        <Skeleton className="min-h-[250px] rounded-2xl" />
      )}
    </div>
  );
};

export default ClientPaginatedTable;
