import { http, HttpResponse } from "msw";
import { products } from "./data";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "category-1" },
      { id: 2, name: "category-2" },
      { id: 3, name: "category-3" },
    ]);
  }),

  http.get("/products", () => {
    return HttpResponse.json(products);
  }),

  // http.get<{ id: string }>("/products/:id", ({ params }) => {
  //   const { id } = params;

  //   if (!id) {
  //     return new HttpResponse(null, { status: 404 });
  //   }

  //   return HttpResponse.json({
  //     id: Number(id),
  //     name: `product-${id}`,
  //     price: 100,
  //   });
  // }),

  http.get("/products/:id", ({ params }) => {
    const { id } = params;

    const product = products.find(p => p.id === Number(id))

    if (!product) {
      return new HttpResponse(null, {status: 404})
    }

    return HttpResponse.json(product)
  }),
];
