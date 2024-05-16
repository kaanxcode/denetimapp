import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HistoryAuditBox from "@/components/HistoryAuditBox";
import getHistory from "@/api/getHistory";

const History = () => {
  const [historyAuditData, setHistoryAuditData] = useState([]);

  useEffect(() => {
    const fetchAuditsHistory = async () => {
      try {
        const auditsHistory = await getHistory();
        //console.log("Audits history: ", auditsHistory);
        setHistoryAuditData(auditsHistory); // Belgeleri doğrudan state'e atın
      } catch (error) {
        console.error("Error fetching audits history: ", error);
      }
    };

    fetchAuditsHistory();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={historyAuditData}
        keyExtractor={(item, index) => index.toString()} // Her öğenin benzersiz bir key'e ihtiyacı olduğunu belirtmek için index'i kullanın
        renderItem={({ item }) => <HistoryAuditBox historyAuditData={item} />} // Her bir öğe için AuditBox bileşenini oluşturun
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: "#EFE6DD",
  },
});
