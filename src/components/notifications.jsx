export const ErrorNotification = ({ message }) => {
  if (message === null) return null
  return <div className={`error ${!message ? 'hidden' : ''}`}>{message}</div>
}

export const SuccessNotification = ({ message }) => {
  if (message === null) return null
  return <div className={`success ${!message ? 'hidden' : ''}`}>{message}</div>
}

export const showMessages = (setSuccess, setError) => {
  const showSuccess = (message) => {
    setSuccess(message)
    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  const showError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  return { showSuccess, showError }

}

export default showMessages