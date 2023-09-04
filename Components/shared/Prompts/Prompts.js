import { useSelector } from "react-redux";
import { promptCategoryType } from "../../../helpers/constants";
import { getPromptData } from "../../../dux/prompt";
import { ConfirmPassword } from "../../Prompt/ConfirmPassword";
import { CreatePassword } from "../../Prompt/CreatePassword";
import { ErrorPrompt } from "../../Prompt/ErrorPrompt";
import { ExitWithoutSaving } from "../../Prompt/ExitWithoutSaving";
import { DeleteNotePrompt } from "../../Prompt/DeleteNotePrompt";
import { DeleteTodoPrompt } from "../../Prompt/DeleteTodoPrompt";
import { UpdateTaskStatus } from "../../Prompt/UpdateTaskStatus";
import { UpdateTodoStatus } from "../../Prompt/UpdateTodoStatus";
import { FirstAppLoadWarning } from "../../Prompt/FirstAppLoadWarning";

export const Promtps = () => {
  const { category, data } = useSelector(getPromptData);

  const {
    CONFIRM_PASSWORD_PROMPT,
    CREATE_PASSWORD_PROMPT,
    ERROR_PROMPT,
    EXIT_WITHOUT_SAVING_PROMPT,
    DELETE_NOTE_PROMPT,
    DELETE_TODO_PROMPT,
    UPDATE_TASK_STATUS_PROMPT,
    UPDATE_TODO_STATUS_PROMPT,
    FIRST_APP_LOAD_WARNING_PROMPT,
  } = promptCategoryType;

  return (
    <>
      {category === CREATE_PASSWORD_PROMPT && <CreatePassword data={data} />}
      {category === CONFIRM_PASSWORD_PROMPT && <ConfirmPassword data={data} />}
      {category === ERROR_PROMPT && <ErrorPrompt data={data} />}
      {category === EXIT_WITHOUT_SAVING_PROMPT && (
        <ExitWithoutSaving data={data} />
      )}
      {category === DELETE_NOTE_PROMPT && <DeleteNotePrompt data={data} />}
      {category === DELETE_TODO_PROMPT && <DeleteTodoPrompt data={data} />}
      {category === UPDATE_TASK_STATUS_PROMPT && (
        <UpdateTaskStatus data={data} />
      )}
      {category === UPDATE_TODO_STATUS_PROMPT && (
        <UpdateTodoStatus data={data} />
      )}
      {category === FIRST_APP_LOAD_WARNING_PROMPT && (
        <FirstAppLoadWarning data={data} />
      )}
    </>
  );
};
