import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from '../../services/prismic';
import Posts, { getStaticProps }  from "../../pages/posts";

jest.mock("../../services/prismic")

const postsMocked = [
  {
    slug: 'my-new-post',
    title: 'My New Post',
    excerpt: 'Posts excerpt',
    updatedAt: '16 de fevereiro de 2022',
  }  
]


describe("Posts page", () => {
  it("renders correctly", () => {
    
    render(
      <Posts posts={postsMocked} />
    );

    expect(screen.getByText("My New Post" )).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const resultsPrismicMocked = {
      uid: 'my-new-post',
      data: {
        title: [{
          type: 'heading',
          text: 'My New Post'
        }],
        content: [{
          type: 'paragraph',
          text: 'Posts excerpt'
        }]
      },
      last_publication_date: '02-16-2022',
    }

    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [resultsPrismicMocked]
      })
    } as any)

    const response = await getStaticProps({})
    
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: postsMocked
        }
      })
    )

  });
});
