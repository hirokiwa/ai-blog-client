import BlogCard from './BlogCard';

const BlogContainer = ({ blogData }: { blogData: blog[]}) => (
  <>
    <p className='text-2xl font-bold mx-4 my-2'>最新の記事</p>
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