import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBarContent from "@/components/SearchBarComponent";
import AuditBox from "@/components/AuditBox";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import UserAudit from "@/components/UserAudit";
import { useSegments } from "expo-router";
import getUserAudits from "@/api/getUserAudits";

const Home = () => {
  const [auditData, setAuditData] = useState([]);
  const [userAuditData, setUserAuditData] = useState();
  const [fetch, setFetch] = useState(false);

  const reoloadFetch = (value) => {
    setFetch(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "audits"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setAuditData(data);
    };

    fetchData();
  }, []);

  const segments = useSegments();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAudits = await getUserAudits();
        //console.log("Audits history: ", auditsHistory);
        setUserAuditData(userAudits); // Belgeleri doğrudan state'e atın
      } catch (error) {
        console.error("Error fetching audits history: ", error);
      }
    };
    fetchData();
    setFetch(false);
  }, [segments, fetch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBarContent />
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={auditData}
          keyExtractor={(item, index) => index.toString()} // Her öğenin benzersiz bir key'e ihtiyacı olduğunu belirtmek için index'i kullanın
          renderItem={({ item }) => <AuditBox auditData={item} />} // Her bir öğe için AuditBox bileşenini oluşturun
        />
        <FlatList
          data={userAuditData}
          keyExtractor={(item, index) => index.toString()} // Her öğenin benzersiz bir key'e ihtiyacı olduğunu belirtmek için index'i kullanın
          renderItem={({ item }) => (
            <UserAudit userAuditData={item} onValueChange={reoloadFetch} />
          )} // Her bir öğe için AuditBox bileşenini oluşturun
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE6DD",
  },
  searchBarContainer: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
  },
  contentContainer: {},
});
