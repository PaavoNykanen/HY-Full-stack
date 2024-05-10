const style={
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{ ...style, color: color }} className="notification">
      {message}
    </div>
  )
}

export default Notification