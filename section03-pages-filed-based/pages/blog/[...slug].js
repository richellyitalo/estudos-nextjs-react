import { useRouter } from 'next/router';

function BlogPost() {
  const router = useRouter();

  console.log(router.query);

  return <h1>Lista de posts do blog</h1>;
}

export default BlogPost;
