import { Materials } from "../../domain/entities/materials";
import { MaterialsResponse } from "../interfaces/materials.response";

export class MaterialsMapper {
  static MaterialsToEntity(materialsResponse: MaterialsResponse): Materials {
    return {
      id: materialsResponse.id,
      name: materialsResponse.name,
      description: materialsResponse.description,
      image: materialsResponse.image,
    };
  }
}
