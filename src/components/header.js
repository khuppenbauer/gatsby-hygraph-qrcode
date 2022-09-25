import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="text-gray-400 bg-gray-900 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link
        to="/"
        className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
      >
        <span className="ml-3 text-xl text-gray-400">{siteTitle}</span>
      </Link>
    </div>
  </header>
)

export default Header
