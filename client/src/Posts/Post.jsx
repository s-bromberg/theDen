
export default function Post({ post }) {
  const { id, author, title, body, created_at: createdAt, profile_image: profilePic } = post
  return (
    <div>
      {profilePic && (
        <img
          src={`http://localhost:8080/${profilePic}`}
          alt="profile"
          style={{ width: '50px', height: '50px', borderRadius: '100%' }}
        />
      )}
      {id} - by:{author} - {title} - {body} - at:
      {new Date(createdAt).toLocaleString()}
    </div>
  )
}
