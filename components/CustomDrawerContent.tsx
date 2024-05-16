import { logout } from "@/redux/features/userSlice";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

export default function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={"Logout"} onPress={() => dispatch(logout())} />
    </DrawerContentScrollView>
  );
}
