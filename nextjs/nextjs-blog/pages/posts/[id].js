/** Component */
import Layout from "../../components/layout";

/** Lib */
import { getAllPostsIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
  return (
    <Layout>
      <>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
      </>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // return a list of possible value for id
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  // Fetch necessary data for the blogs post using params.id
  const postData = getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

export default Post;
