import { useQuery } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/SideMenuNavigator";
import { FAB } from "../../components/ui/FAB";
import { ColorsList } from "../../components/colors/ColorList";
import { getColors } from "../../../actions/colors.actions";
export const ColorsScreen = () => {
  const { data: colores } = useQuery({
    queryKey: ["colores"],
    queryFn: getColors,
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <ColorsList colores={colores!} />
      <FAB
        onPress={() => navigation.navigate("ColorForm", { colorId: "new" })}
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </>
  );
};
