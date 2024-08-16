import { Colors } from "../../domain/entities/colors";
import { ColorsResponse } from "../interfaces/colors.response";
export class ColorsMappper {
  static ColorToEntity(colorResponse: ColorsResponse): Colors {
    return {
      id: colorResponse.id,
      name: colorResponse.name,
    };
  }
}
