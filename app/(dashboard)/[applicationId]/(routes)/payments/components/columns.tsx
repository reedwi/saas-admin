"use client"

import { ColumnDef } from "@tanstack/react-table"

export type PaymentColumn = {
  id: string
  amount: string
  userEmail: string
  orderId: string
  createdAt: string
}

export const columns: ColumnDef<PaymentColumn>[] = [
  {
    accessorKey: "id",
    header: "Payment Id",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
  },
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
]
