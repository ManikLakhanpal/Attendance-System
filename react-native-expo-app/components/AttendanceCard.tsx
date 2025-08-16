import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AttendanceCardProps {
    uid: string;
    id: string;
    name: string;
    email: string;
    batch: string;
    type: string;
    time: string;
    onDelete?: () => void;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const AttendanceCard = (props: AttendanceCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      "Delete Attendance",
      "Are you sure you want to delete this attendance record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);
  
              const response = await axios({
                method: 'delete',
                url: `${API_BASE_URL}/attendance`,
                data: {
                  uid: props.uid,
                  id: props.id,
                },
              });
  
              if (response.status === 200) {
                Alert.alert("Success", "Attendance record deleted successfully");
                props.onDelete?.();
              }
            } catch (error) {
              if (axios.isAxiosError(error) && error.response?.status === 404) {
                Alert.alert("Error", "Attendance record not found");
              } else {
                Alert.alert("Error", "Failed to delete attendance record. Please try again.");
              }
              console.error("Delete error:", error);
            } finally {
              setIsDeleting(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.headerRight}>
          <View style={[
            styles.typeBadge,
            { backgroundColor: props.type === 'present' ? '#4CAF50' : '#FFA000' }
          ]}>
            <Text style={styles.typeText}>{props.type}</Text>
          </View>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.deleteButtonText}>Delete</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{props.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Batch:</Text>
          <Text style={styles.value}>{props.batch}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{props.uid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{new Date(props.time).toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>UID:</Text>
          <Text style={styles.value}>{props.id}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    width: 60,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default AttendanceCard;