import * as ImagePicker from "expo-image-picker";

export class cameraAdapter {
  static async takePicture(): Promise<string[]> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access camera was denied");
        return [];
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets.map((asset) => asset.uri);
      }

      return [];
    } catch (error) {
      console.error("Error taking picture:", error);
      return [];
    }
  }

  static async getPicturesFromLibrary(): Promise<string[]> {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access gallery was denied");
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // Soporta seleccionar múltiples imágenes
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets.map((asset) => asset.uri);
      }

      return [];
    } catch (error) {
      console.error("Error getting pictures from library:", error);
      return [];
    }
  }
}
