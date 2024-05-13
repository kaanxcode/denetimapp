import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={"Logout"} onPress={() => router.replace("Login")} />
    </DrawerContentScrollView>
  );
}
