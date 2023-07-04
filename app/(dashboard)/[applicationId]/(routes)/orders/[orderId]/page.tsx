import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const OrderPage = async({
  params
}: {
  params: { orderId: string }
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={order}/>
      </div>

    </div>
  )
}

export default OrderPage;