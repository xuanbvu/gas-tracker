type UserProps = {
  username: string
}

export default function User({ username }: UserProps) {
  return (
    <>
      <h1>Hello {username}</h1>
    </>
  )
}