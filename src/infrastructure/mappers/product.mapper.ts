import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../interfaces/product.response";

export class ProductMaper {
  static ProductToEntity(productRespon: ProductResponse): Product {
    return {
      id: productRespon.id,
      name: productRespon.name,
      descripcion: productRespon.descripcion,
      price: productRespon.price,
      nombreDibujo: productRespon.nombreDibujo,
      category: productRespon.category,
      ancho: productRespon.ancho,
      alto: productRespon.alto,
      colores: productRespon.colores,
      material: productRespon.material,
      image: productRespon.image || [],
    };
  }
}
