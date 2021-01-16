import axios from 'axios'

async function getBlogs() {
    debugger
  try {
    const response = await axios.get(process.env.MEDIUM_ENDPOINT);
    debugger
  } catch (error) {
    debugger
    return error
  }
}


export default getBlogs;