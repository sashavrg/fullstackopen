const Notification = ({ message, notificationType }) => {
  const styles = {
    success: {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    error: {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }


  if (message === null) {
    return null
  }

  const notificationStyle = styles[notificationType]

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification