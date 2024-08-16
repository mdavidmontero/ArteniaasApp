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
import { getDecorations } from "../../../actions/decoration.actions";
import { DecorationList } from "../../components/decorations/DecorationList";
export const DecorationScreen = () => {
  const { data: decoraciones } = useQuery({
    queryKey: ["decoraciones"],
    queryFn: getDecorations,
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <DecorationList decoraciones={decoraciones!} />
      <FAB
        onPress={() =>
          navigation.navigate("DecorationForm", { decorationId: "new" })
        }
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};
