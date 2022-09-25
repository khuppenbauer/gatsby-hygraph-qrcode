const { gql } = require('graphql-request');

module.exports = async () => {
  return gql`
    mutation CreateFormSubmission(
      $formName: String,
      $formData: Json,
      $formSubmissionDate: DateTime,
    ) {
      createFormSubmission(
        data: {
          formName: $formName
          formData: $formData
          formSubmissionDate: $formSubmissionDate
        }
      ) {
        id  
      }
    }  
  `;
};
