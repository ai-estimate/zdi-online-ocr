import axios from 'axios';
export const createChatCompletion = async (messages: any[]) => {
  const content = messages[1].content;
  var bodyFormData = new FormData();
  bodyFormData.append('data', content);
  try {
    const {data} = await axios({
      method: 'post',
      url: 'http://api.nextspell.com/api_law_chatbot',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return data.message;
  } catch (error) {
    console.log(error?.response);
  }
  return null;
};
