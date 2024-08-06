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

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();
  const renderBackAction = () => (
    <TopNavigationAction
      icon={<FontAwesome size={28} name="backward" onPress={goBack} />}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction
        onPress={rightAction}
        icon={<FontAwesome size={28} name="plus" color="#000" />}
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
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: "100%" }}>{children}</Layout>
    </Layout>
  );
};
