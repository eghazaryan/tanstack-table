import { Checkbox, Container, Table, TextInput } from '@mantine/core';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './Welcome.module.css';

type Person = {
  id: number;
  name: string;
  email: string;
  age: number;
  registration: string;
  terms: boolean;
};

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    age: 12,
    registration: '12.12.2012',
    terms: true,
  },
  {
    id: 2,
    name: 'Joe Smith',
    email: 'joesmith@gmail.com',
    age: 22,
    registration: '11.11.2011',
    terms: false,
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'janendoe@gmail.com',
    age: 13,
    registration: '15.12.2012',
    terms: true,
  },
];

export function Welcome() {
  const columnHelper = createColumnHelper<Person>();
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: () => <span>Name</span>,
      cell: (info) => <div>{info.getValue()}</div>,
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.email, {
      id: 'email',
      header: () => <span>Email</span>,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.age, {
      id: 'age',
      header: () => <span>Age</span>,
      cell: (info) => <div>{info.getValue()}</div>,
      meta: {
        // filterVariant: 'range',
      },
    }),
    columnHelper.accessor((row) => row.registration, {
      id: 'registration',
      header: () => <span>Registration date</span>,
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.terms, {
      id: 'terms',
      header: () => <span>Terms</span>,
      cell: (info) => <Checkbox checked={info.getValue()} label="I accept terms and conditions" />,
    }),
  ];

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (person) =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (search && filteredData.length === 0) {
    //
  }

  return (
    <Container mt="lg">
      <TextInput
        placeholder="Search by name or email"
        leftSection={<IconSearch size={18} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />
      <Table>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id} className={classes.tr}>
              {headerGroup.headers.map((header) => (
                <Table.Th fz="lg" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <IconChevronDown size={18} />,
                    desc: <IconChevronUp size={18} />,
                  }[header.column.getIsSorted() as string] ?? <IconSelector size={18} />}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
