import React from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Person {
  id: number;
  name: string;
  role: string;
  image: ImageSourcePropType;
}

const people: Person[] = [
  {
    id: 1,
    name: 'Manik Lakhanpal',
    role: 'Backend Coding',
    image: require('../../assets/images/Members/Manik.jpeg')
  },
  {
    id: 2,
    name: 'Sujal Garg',
    role: 'Frontend Coding',
    image: require('../../assets/images/Members/Sujal.jpeg')
  },
  {
    id: 3,
    name: 'Ojasv Jindal',
    role: 'Connections',
    image: require('../../assets/images/Members/Ojasv.jpeg')
  },
  {
    id: 4,
    name: 'Naman Singh',
    role: 'Connections',
    image: require('../../assets/images/Members/Naman.jpeg')
  },
  {
    id: 5,
    name: 'Navjot Singh',
    role: 'Components Assembly',
    image: require('../../assets/images/Members/Navjot.jpeg')
  }
]

const Card = ({ person }: { person: Person }) => (
  <View style={styles.card}>
    <View style={styles.imageContainer}>
      <Image
        source={person.image}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.role}>{person.role}</Text>
    </View>
  </View>
)

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('../../assets/images/Team.jpeg')}
        style={styles.teamImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Our Team</Text>
      <View style={styles.cardsContainer}>
        {people.map((person, index) => (
          <View key={person.id} style={[
            styles.cardWrapper,
            index % 2 === 0 ? styles.leftCard : styles.rightCard
          ]}>
            <Card person={person} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  teamImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  cardsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  leftCard: {
    marginRight: 'auto',
  },
  rightCard: {
    marginLeft: 'auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a1a1a',
  },
  role: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
})

export default About