
export default function Post({ post }) {
  // eslint-disable-next-line camelcase
  const { id, author, title, body, created_at } = post
  return (
    <div>
      {id} - by:{author} - {title} - {body} - at:
      {new Date(created_at).toLocaleString()}
    </div>
  )
}
