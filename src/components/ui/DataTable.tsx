import * as React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'

export interface Column<T> {
  header: string
  accessorKey?: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
}

export interface PageInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  onRowClick?: (item: T) => void
  pageInfo?: PageInfo
  onPageChange?: (page: number) => void
  onSearch?: (query: string) => void
  onFilterChange?: (key: string, value: string) => void
  searchPlaceholder?: string
  filterOptions?: { label: string; value: string }[]
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  onRowClick,
  pageInfo,
  onPageChange,
  onSearch,
  onFilterChange,
  searchPlaceholder = 'Search...',
  filterOptions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) onSearch(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <div className="w-full space-y-4">
      {/* Controls: Search and Filter */}
      {(onSearch || filterOptions) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {onSearch && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10 border-gray-200 focus:border-primary focus:ring-primary/10"
              />
            </div>
          )}

          {filterOptions && onFilterChange && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-gray-700"
                onChange={(e) => onFilterChange('status', e.target.value)}>
                <option value="">All Statuses</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={cn(
                      'px-6 py-4 font-semibold text-gray-600 text-xs uppercase tracking-wider',
                      col.className
                    )}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Spinner size="md" />
                      <p className="text-sm text-gray-400">Loading data...</p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <p>No results found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => onRowClick?.(item)}
                    className={cn('group transition-colors hover:bg-gray-50/80', onRowClick && 'cursor-pointer')}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className={cn('px-6 py-4 text-gray-700', col.className)}>
                        {col.cell
                          ? col.cell(item)
                          : col.accessorKey
                          ? (item[col.accessorKey] as React.ReactNode)
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!isLoading && pageInfo && (
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-gray-50/50">
            <div className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-900">{(pageInfo.currentPage - 1) * pageInfo.limit + 1}</span> to{' '}
              <span className="font-medium text-gray-900">
                {Math.min(pageInfo.currentPage * pageInfo.limit, pageInfo.totalItems)}
              </span>{' '}
              of <span className="font-medium text-gray-900">{pageInfo.totalItems}</span> results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={!pageInfo.hasPrevPage}
                onClick={() => onPageChange?.(pageInfo.currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium text-gray-700">
                Page {pageInfo.currentPage} of {pageInfo.totalPages}
              </div>
              <Button
                variant="secondary"
                size="sm"
                disabled={!pageInfo.hasNextPage}
                onClick={() => onPageChange?.(pageInfo.currentPage + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
