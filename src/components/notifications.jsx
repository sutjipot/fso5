export const errorNotification = ({ message }) => {
    if (message === '') return null
    return <div>{message}</div>
}
export const successNotification = ({ message }) => {
    if (message === '') return null
    return <div>{message}</div>
}