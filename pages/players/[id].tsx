import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
type Props = { player: {} }

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()

  // // Get the paths we want to pre-render based on posts
  const paths = data?.products?.map((product) => ({
    params: { id: product.id.toString() },
  }))

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(`https://dummyjson.com/products/${params.id}`)
  const product = await data.json()
  console.log(product)

  return {
    // Passed to the page component as props

    props: product,
  }
}

const player = (props: Props) => {
  console.log(props)
  return <div>this is player </div>
}

export default player
