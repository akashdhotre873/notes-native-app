import { View } from "react-native";
import { ActionBar } from "../../components/ActionBar";
import { useRoute, useNavigation } from "@react-navigation/native";

export const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { header, content } = route?.params || {};
  return (
    <View>
      <ActionBar
        backButtonLink={() => navigation.goBack()}
        title={header ? "Editing note" : "Creating note"}
      />
    </View>
  );
};
