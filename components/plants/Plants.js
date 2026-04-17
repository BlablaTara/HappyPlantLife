import { View, Text, Image, StyleSheet } from "react-native";
import { getPlantStage } from "../../utils/plantStage.js";
import { getPlantStageImage } from "../../utils/plantStageImage.js";

const Plants = ({ plant, lastWatered, waterNeeds }) => {
  // const overlayColor = getWaterStatusColor(lastWatered, waterNeeds);

  const stage = getPlantStage(lastWatered, waterNeeds);
  const image = getPlantStageImage(plant, stage);
  // const healthyImage = getPlantStageImage(plant, "healthy");

  console.log("PLANT DEBUG:", plant);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image || "" }} style={styles.image} />
        {/* {overlayColor !== "transparent" && (
          <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        )} */}
      </View>
      <Text style={styles.name}>{plant?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
    width: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Plants;
