import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@apollo/client';
import {GET_CHECKIN} from '../query/GetCheckIn';
const CheckInComponent = () => {
  const {loading, error, data} = useQuery(GET_CHECKIN);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error :(</Text>;
  }
  const {tags, user, created} = data?.checkIn;
  const tagsEdge = tags.edges;
  const userName = user.firstName + ' ' + user.lastName;
  const date1 = new Date(created);
  const date2 = new Date();

  const difference = date2.getTime() - date1.getTime();

  const days = Math.ceil(difference / (1000 * 3600 * 24));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.avatar}>😎</Text>
          <View>
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.subHeader}>
              Check-in provided via self check-in.
            </Text>
          </View>
        </View>
        <View style={styles.rowDirection}>
          <Text style={styles.duration}>{days} days ago</Text>
          <Icon name="chevron-down" size={15} color="#1F2638" />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Is there anything you would like your teacher to know about you that
          they currently don't?
        </Text>
        <Text style={styles.paragraph}>
          Got selected for the state basketball team!
        </Text>
      </View>
      <View>
        <View style={styles.rowDirection}>
          {tagsEdge.map(tag => (
            <View key={tag.node.id} style={styles.tagContainer}>
              <Text>
                <Icon name="pricetag" size={15} color="#808080" />
              </Text>
              <Text style={styles.tagText}>{tag.node.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CheckInComponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    fontSize: 30,
    paddingRight: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerItem: {alignItems: 'center', flexDirection: 'row'},
  rowDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  paragraph: {
    fontWeight: 'bold',
    color: '#1F2638',
  },
  tagText: {
    fontSize: 10,
    color: '#808080',
    marginLeft: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
    padding: 5,
    borderColor: '#808080',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },

  description: {
    marginVertical: 10,
  },
  descriptionContainer: {},
  subHeader: {
    fontSize: 12,
  },
  title: {
    color: 'blue',
    fontWeight: 'bold',
  },
  duration: {
    color: 'blue',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
