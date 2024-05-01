export const ErrorNotification = ({ message }) => {
  if (message === '') return null
  return <div className={`notification error ${!message ? 'hidden' : ''}`}>{message}</div>
}
export const SuccessNotification = ({ message }) => {
  if (message === '') return null
  return <div className={`notification success ${!message ? 'hidden' : ''}`}>{message}</div>
}