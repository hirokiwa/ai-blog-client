import BlogCard from './BlogCard';

interface Props {
  blogData: blog[],
  label?: string,
}

const BlogContainer = ({ blogData, label }: Props) => (
  <>
    {label && <p className='text-2xl font-bold mx-4 my-2 opacity-90'>{label}</p>}
    <hr/>
    {
      blogData.map((b) => (
      <div key={b.id}>
        <BlogCard blogData={b} />
        <hr/>
      </div>
    ))}
  </>
)

export default BlogContainer;