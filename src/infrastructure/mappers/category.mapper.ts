import { Category } from "../../domain/entities/category";
import { CategoryResponse } from "../interfaces/category.response";
export class CategoryMaper {
  static CategoryToEntity(categoryResponse: CategoryResponse): Category {
    return {
      id: categoryResponse.id,
      name: categoryResponse.name,
    };
  }
}
