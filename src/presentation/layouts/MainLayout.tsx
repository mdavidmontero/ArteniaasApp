import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HamburgerMenu } from "../components/ui/HamburgerMenu";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  showBackButton?: boolean; // Nueva propiedad
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  showBackButton = false, // Valor por defecto
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<MyIcon name={rightActionIcon} />}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <HamburgerMenu />
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={
          showBackButton && canGoBack() ? renderBackAction : undefined
        }
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: "100%" }}>{children}</Layout>
    </Layout>
  );
};
