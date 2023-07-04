import prismadb from "@/lib/prismadb";
import { format } from "date-fns"

import { PaymentClient } from "./components/client";
import { PaymentColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const PaymentsPage = async ({
  params
}: {
  params: { applicationId: string }
}) => {
  const payments = await prismadb.payment.findMany({
    where: {
      applicationId: params.applicationId
    },
    include: {
      order: true,
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedPayments: PaymentColumn[] = payments.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    amount: formatter.format(Number(item.amount)),
    userEmail: item.user.email,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PaymentClient data={formattedPayments}/>
      </div>
    </div>
  );
}

export default PaymentsPage;