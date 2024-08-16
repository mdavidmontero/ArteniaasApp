import { Decoration } from "../../domain/entities/decoration";
import { DecorationResponse } from "../interfaces/decoration.response";

export class DecorationsMapper {
  static DecorationsToEntity(
    decorationsResponse: DecorationResponse
  ): Decoration {
    return {
      id: decorationsResponse.id,
      descripcion: decorationsResponse.descripcion,
      precio: decorationsResponse.precio,
      imagen: decorationsResponse.imagen,
    };
  }
}
