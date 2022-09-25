import * as React from "react"

const Footer = ({ siteTitle }) => (
  <footer className="text-gray-400 bg-gray-900 body-font border-t-2 border-gray-800">
    <div className="bg-gray-800 bg-opacity-75">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-400 text-sm text-center sm:text-left">
          © {new Date().getFullYear()} {siteTitle}
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
