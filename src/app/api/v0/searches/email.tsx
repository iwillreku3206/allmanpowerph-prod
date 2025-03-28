export interface SearchEmailProps {
  url: string,
  password: string
}

export default function NewSearchEmail(props: SearchEmailProps) {
  const { url, password } = props
  return (
    <>
      <h1>Thank you for using our service!</h1>
      <p>Please check this link in a few days for updates regarding your search: <a href={url}>{url}</a></p>
      <p>Your password is: <pre>{password}</pre></p>
    </>
  )
}
