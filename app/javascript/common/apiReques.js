const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj)
    if (!response.ok) {
      throw Error("Reload the app")
    }
  }
  catch (err) {
    errMsg = err.message
  }
}
export default apiRequest;

