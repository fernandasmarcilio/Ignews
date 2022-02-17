import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { getPrismicClient } from '../../services/prismic';
import Post, { getStaticPaths, getStaticProps }  from "../../pages/posts/preview/[slug]";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react")
jest.mock("next/router")
jest.mock("../../services/prismic")

const postMocked = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Posts excerpt</p>',
  updatedAt: '16 de fevereiro de 2022',
}  

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated'})

    render(
      <Post post={postMocked} />
    );

    expect(screen.getByText("My New Post" )).toBeInTheDocument();
    expect(screen.getByText("Posts excerpt" )).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?" )).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessioMocked = mocked(useSession)
    useSessioMocked.mockReturnValueOnce({ 
      data: { activeSubscription: 'fake-subscription' }, 
      status: 'authenticated' 
    } as any);

    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(
      <Post post={postMocked} />
    );
    
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')

  });

  it("loads initial data", async () => {
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

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: postMocked
        }
      })
    )

  });

});
