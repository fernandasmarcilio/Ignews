import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from '../../services/prismic';
import Post, { getServerSideProps }  from "../../pages/posts/[slug]";
import { getSession } from "next-auth/react";

jest.mock("next-auth/react")
jest.mock("../../services/prismic")

const postMocked = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Posts excerpt</p>',
  updatedAt: '16 de fevereiro de 2022',
}  

describe("Post page", () => {
  it("renders correctly", () => {
    
    render(
      <Post post={postMocked} />
    );

    expect(screen.getByText("My New Post" )).toBeInTheDocument();
    expect(screen.getByText("Posts excerpt" )).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)
    
    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: `/posts/preview/my-new-post`,
        })
      })
    )

  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

    const resultsPrismicMocked = {
      data: {
        title: [{
          type: 'heading',
          text: 'My New Post'
        }],
        content: [{
          type: 'paragraph',
          text: 'Posts excerpt'
        }],
      },
      last_publication_date: '02-16-2022'
    }


    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce(resultsPrismicMocked)
    } as any)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: postMocked
        }
      })
    )

  });

});
