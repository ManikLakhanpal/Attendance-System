import AttendanceCard from "@/components/AttendanceCard";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface AttendanceItem {
  name: string;
  id: string,
  email: string;
  batch: string;
  type: string;
  uid: string;
  time: string;
}

// Replace this with your computer's local IP address
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL; // TODO: Update this IP address

const Home = () => {
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<AttendanceItem[]>(
        `${API_BASE_URL}/attendance`
      );

      console.log("Response data:", response.data);

      setAttendance(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNREFUSED") {
          setError(
            "Could not connect to server. Please check if the server is running and the IP address is correct."
          );
        } else if (err.response) {
          setError(`Server error: ${err.response.status}`);
        } else if (err.request) {
          setError(
            "No response from server. Please check your network connection."
          );
        } else {
          setError("Failed to fetch attendance data");
        }
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAttendance();
  }, [fetchAttendance]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading attendance data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance List</Text>
        <Text style={styles.subtitle}>{attendance.length} records found</Text>
      </View>
      <FlatList
        data={attendance}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0066cc"]}
            tintColor="#0066cc"
          />
        }
        renderItem={({ item }) => (
          <AttendanceCard
            name={item.name}
            email={item.email}
            batch={item.batch}
            type={item.type}
            uid={item.uid}
            id={item.id}
            time={item.time}
            onDelete={fetchAttendance}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default Home;
