"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PaymentColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"



interface PaymentClientProps {
  data: PaymentColumn[]
}

export const PaymentClient: React.FC<PaymentClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`Payments (${data.length})`}
          description="Manage payments for your application"
        />
        {/* <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="userEmail" columns={columns} data={data}/>
      <Heading 
        title="API" description="API calls for payments"
      />
      <Separator />
      <ApiList entityName="payments" entityIdName="paymentId"/>
    </>
  )
}