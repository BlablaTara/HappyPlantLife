import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const AddPlant = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="add" size={40} color="#ccc" style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
    );
};

 // kan også godt være 'screen', hvis det er bedre
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 50,
        left: (width -60) / 2,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,

    },

});

export default AddPlant;