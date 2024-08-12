import * as ImagePicker from "expo-image-picker";

export class CameraOne {
  static async takePicture() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets;
    }
  }

  static async getPicturesFromLibraryOne(): Promise<string[]> {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access gallery was denied");
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
