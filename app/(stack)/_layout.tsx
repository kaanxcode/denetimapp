import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {},
        headerTintColor: "#000",
        headerTitleStyle: {},
      }}
    >
      {/* "/add-audit" rotasını tanımlayın ve AddAuditScreen component'ini eşleştirin */}
      <Stack.Screen
        name="Add-audit"
        options={{
          headerTitle: "Yeni Denetim Oluştur",
        }}
      />
      <Stack.Screen name="[Audit]" />
      <Stack.Screen
        name="add-question"
        options={{
          presentation: "modal",
          headerTitle: "Yeni Soru Ekle",
        }}
      />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
    </Stack>
  );
}
