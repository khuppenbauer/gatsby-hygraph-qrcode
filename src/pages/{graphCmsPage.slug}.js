import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Section from "../components/section"
import Form from "../components/form"

const Components = {
  Form,
};

const GraphCmsPage = ({ data: { page } }) => {
  console.log(page);
  const { title, blocks } = page
  return (
    <Layout>
      <Seo title={title} />
      <Section>
        {blocks.map((block) => {
          const { id, remoteTypeName } = block;
          if (typeof Components[remoteTypeName] !== "undefined") {
            return React.createElement(Components[remoteTypeName], {
              key: id,
              block: block
            });
          }
        })}
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PagePageQuery($slug: String!) {
    page: graphCmsPage(slug: { eq: $slug }) {
      id
      title
      slug
      blocks {
        ... on GraphCMS_Form {
          id
          remoteTypeName
          formFields {
            ... on GraphCMS_FormField {
              id
              formFieldLabel
              formFieldMandatory
              formFieldName
              formFieldPlaceholder
              formFieldType
            }
          }
          formName
          formSubmit
          formSuccess {
            markdown
          }
        }
      }
    }
  }
`

export default GraphCmsPage
