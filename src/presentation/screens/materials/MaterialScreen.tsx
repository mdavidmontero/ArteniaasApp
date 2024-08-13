import { useQuery } from "@tanstack/react-query";
import { CustomView } from "../../components/ui/CustomView";
import { Text } from "@ui-kitten/components";
import { getMaterials } from "../../../actions/materials.actions";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { MaterialCard } from "../../components/materials/MaterialCard";
import { MaterialList } from "../../components/materials/MaterialList";
import { FAB } from "../../components/ui/FAB";
import { HamburgerMenu } from "../../components/ui/HamburgerMenu";
export const MaterialScreen = () => {
  const { data: categorias } = useQuery({
    queryKey: ["materiales"],
    queryFn: getMaterials,
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <MaterialList materiales={categorias!} />
      <FAB
        onPress={() =>
          navigation.navigate("MaterialForm", { materialId: "new" })
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};
