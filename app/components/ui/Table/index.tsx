export interface Column<T, D = React.ReactNode> {
  name: string
  id: string
  accessor: ((data: T) => D) | keyof T
}

export interface TableProps<T> {
  columns: Column<T>[]
  data?: T[]
}

interface BaseData {
  id?: string
}

const Table = <T extends BaseData>(props: TableProps<T>): React.ReactElement => {
  const { columns, data } = props
  return (
    <div className="hidden mt-8 sm:block">
      <div className="align-middle inline-block min-w-full border-b border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="border-t border-gray-200">
              {columns.map((c) => (
                <th
                  key={c.id}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {(data || []).map((d) => (
              <tr key={d.id}>
                {columns.map((c) => (
                  <td key={c.id} className="px-6 py-3 text-sm font-medium text-gray-900">
                    {typeof c.accessor === 'function' ? c.accessor(d) : d[c.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
