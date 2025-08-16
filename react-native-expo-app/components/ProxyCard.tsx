import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

interface ProxyCardProps {
  giver_name: string;
  giver_uid: string;
  giver_email: string;
  receiver_name: string;
  receiver_uid: string;
  receiver_email: string;
  time: string;
}

const ProxyCard = (props: ProxyCardProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{props.receiver_name}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{props.receiver_email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{props.receiver_uid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Giver:</Text>
          <Text style={styles.value}>{props.giver_name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Giver ID:</Text>
          <Text style={styles.value}>{props.giver_uid}</Text>
        </View>     
        <View style={styles.detailRow}>
          <Text style={styles.label}>Giver Email:</Text>
          <Text style={styles.value}>{props.giver_email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {new Date(props.time).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    width: 60,
  },
  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});

export default ProxyCard;
