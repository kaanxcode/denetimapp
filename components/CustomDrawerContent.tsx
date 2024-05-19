import { logout } from "@/redux/features/userSlice";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

export default function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View>
          <Image
            source={require("../assets/images/drawer-logo.png")}
            style={{ width: 150, height: 75, alignSelf: "center" }}
          />
          <Text style={{ textAlign: "center", color: "gray" }}>
            Kullanıcı: {user?.email}
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label={"Çıkış Yap "} onPress={() => dispatch(logout())} />
      </DrawerContentScrollView>
    </View>
  );
}
