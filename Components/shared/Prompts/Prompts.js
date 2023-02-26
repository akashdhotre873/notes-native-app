import { useSelector } from "react-redux";
import { promptCategoryType } from "../../../dux/constants";
import { getPromptData } from "../../../dux/prompt";
import { ConfirmPassword } from "../../Prompt/ConfirmPassword";
import { CreatePassword } from "../../Prompt/CreatePassword";
import { ErrorPrompt } from "../../Prompt/ErrorPrompt";

export const Promtps = () => {
  const { category, data } = useSelector(getPromptData);

  const { CONFIRM_PASSWORD_PROMPT, CREATE_PASSWORD_PROMPT, ERROR_PROMPT } =
    promptCategoryType;

  return (
    <>
      {category === CREATE_PASSWORD_PROMPT && <CreatePassword data={data} />}
      {category === CONFIRM_PASSWORD_PROMPT && <ConfirmPassword data={data} />}
      {category === ERROR_PROMPT && <ErrorPrompt data={data} />}
    </>
  );
};
