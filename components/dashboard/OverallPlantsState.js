import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OverallPlantsState = ({ score }) => {
  const markerPosition = `${Math.max(1, Math.min(score * 100, 99))}%`;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Planternes tilstand</Text>
      <View style={styles.barContainer}>
        <Text style={styles.leaf}>🍂</Text>
        <LinearGradient
          colors={["#f7baba", "#ffe08a", "#d4f4a3", "#a7eac3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bar}
        >
          <View style={[styles.marker, { left: markerPosition }]} />
        </LinearGradient>
        <Text style={styles.leaf}>🌿</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },

  label: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bar: {
    flex: 1,
    height: 30,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },

  marker: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#000",
  },

  leaf: {
    fontSize: 30,
    marginHorizontal: 10,
  },
});

export default OverallPlantsState;
