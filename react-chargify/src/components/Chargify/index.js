import React, { Component } from "react"
import PropTypes from "prop-types"


import ChargifyForm from "./chargify-form"

import './index.scss'

class Chargify extends Component {
  componentDidMount() {
    const script = document.createElement("script")

    script.src = "https://js.chargify.com/latest/chargify.js"
    script.async = true

    document.body.appendChild(script)
  }

  render() {

    return (
      <div className="chargify-wrapper">
        <div className="chargify-content">
          <ChargifyForm data={node}/>
        </div>
      </div>
    )
  }
}

Chargify.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
}

Chargify.defaultProps = {
  pageContext: {
    lang: DEFAULT_LANGUAGE,
  },
}

export default Chargify