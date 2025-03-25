export interface SearchEmailProps {
  url: string,
  password: string
}

export default function NewSearchEmail(props: SearchEmailProps) {
  const { url, password } = props
  return (
    <>
      <h1>Testing</h1>
      <p>Please check this link in a few days: <a href={url}>{url}</a></p>
      <p>Your password is: <pre>{password}</pre></p>
    </>
  )
}
