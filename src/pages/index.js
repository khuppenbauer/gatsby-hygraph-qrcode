import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data: { pages }}) => {
  const { nodes } = pages;
  return (
    <Layout>
      <Seo title="Home" />
      <ul>
        {nodes.map(page => {
          const { id, slug, title } = page
          return (
            <li key={id}>
              <Link
                to={`/${slug}`}
                className="text-gray-400 hover:text-white"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    pages: allGraphCmsPage {
      nodes {
        id
        title
        slug
      }
    }
  }
`

export default IndexPage
