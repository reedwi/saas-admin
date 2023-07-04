import prismadb from "@/lib/prismadb";
import { format } from "date-fns"

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({
  params
}: {
  params: { applicationId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      applicationId: params.applicationId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}/>
      </div>
    </div>
  );
}

export default ProductsPage;