import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.container}>
        <section className={styles.content}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //  Pegar info dos produtos
  // const price = await stripe.prices.retrieve('price_1KHXPlBr5eSeDVykMzC5ZdE5', {
  //   expand: ['product']
  // });
  const price = await stripe.prices.retrieve('price_1KHXPlBr5eSeDVykMzC5ZdE5');

  const product = { 
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }

  return { 
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}