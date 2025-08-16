import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleLogout = () => {
    // Add logout functionality here
    console.log("Logout pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.name}>Manik Lakhanpal</Text>
        <Text style={styles.email}>lakhanpalmanik@gmail.com</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
