const SHOW_PROMPT = `[prompt] show prompt`;
const HIDE_PROMPT = `[prompt] hide prompt`;

export const showPrompt = ({ category, data }) => ({
  type: SHOW_PROMPT,
  payload: { category, data },
});

export const hidePrompt = () => ({
  type: HIDE_PROMPT,
});

const initialState = {
  showPrompt: false,
  category: "",
  data: {},
};

const promptReducer = (state = initialState, action) => {
  if (action.type === SHOW_PROMPT) {
    return {
      ...state,
      showPrompt: true,
      ...action.payload,
    };
  }
  if (action.type === HIDE_PROMPT) {
    return { ...initialState };
  }
  return state;
};

export default promptReducer;

// selectors
export const shouldShowPrompt = ({ prompt: { showPrompt } }) => showPrompt;

export const getPromptData = ({ prompt: { category, data } }) => ({
  category,
  data,
});
