import { View } from "react-native";
import { useSelector } from "react-redux";
import { promptCategoryType } from "../../../dux/constants";
import { getPromptData } from "../../../dux/prompt";
import { CreatePassword } from "../../Prompt/CreatePassword";

export const Promtps = () => {
  const { category, data } = useSelector(getPromptData);

  const { CONFIRM_PASSWORD_PROMPT, CREATE_PASSWORD_PROMPT } =
    promptCategoryType;

  return (
    <>{category === CREATE_PASSWORD_PROMPT && <CreatePassword data={data} />}</>
  );
};
