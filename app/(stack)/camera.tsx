import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useCameraPermissions, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { setPhoto } from "@/redux/features/cameraSlice";
import { useDispatch } from "react-redux";

const CameraScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] =
    MediaLibrary.usePermissions();
  const [image, setImage] = useState("");
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const cameraRef = useRef(null);

  const requestPermissionAll = async () => {
    await requestPermission();
    await requestPermissionMedia();
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.textPermission}>
          Görüntü ekleyebilmeniz için butona basarak izinleri vermeniz
          gerekmektedir.
        </Text>
        <Button
          color="#7EBDC2"
          onPress={requestPermissionAll}
          title="Kamera Kullanımına İzİn Ver"
        />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        let data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
              <Text style={styles.text}>Resim Çek</Text>
              <Ionicons name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <>
          <Image source={{ uri: image }} style={{ flex: 1 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setImage("")}
              style={styles.button}
            >
              <Text style={styles.text}>Tekrar Çek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (image) {
                  try {
                    dispatch(setPhoto(image));
                    console.log("Image saved successfully");
                    navigation.goBack();
                  } catch (error) {
                    console.log("Error saving image", error);
                  }
                }
              }}
              style={styles.button}
            >
              <Text style={styles.text}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",

    alignContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  containerPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  textPermission: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
