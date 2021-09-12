import React, { Component } from "react"
import PropTypes from "prop-types"

import { Button } from "gatsby-theme-poc-common"
import { CHARGIFY_FIELDS } from "../../constants/chargify"

class ChargifyForm extends Component {
  constructor(props) {
    super(props)

    this.chargifyForm = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this)
    this.state = {
      token: "",
      paymentType: "card",
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    this.chargify.token(
      this.chargifyForm.current,

      token => {
        console.log("{host} token SUCCESS - token: ", token)
        this.setState({ token })
      },

      error => {
        console.log("{host} token ERROR - err: ", error)
      }
    )
  }

  componentDidMount() {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        this.chargify = new window.Chargify()
        this.chargify.load({
          // (i.e. '1a2cdsdn3lkn54lnlkn')
          publicKey: process.env.GATSBY_CHARGIFY_PUBLIC_KEY,

          // form type (possible values: 'card' or 'bank')
          type: this.state.paymentType,

          // points to your Chargify site
          serverHost: process.env.GATSBY_CHARGIFY_SERVER_HOST,
          fields: CHARGIFY_FIELDS(this.props.data).card,
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.chargify.unload()
  }

  handlePaymentTypeChange = e => {
    const type = e.target.value

    if (this.state.paymentType !== type) {
      this.chargify.load({
        type,
        fields: CHARGIFY_FIELDS(this.props.data)[type],
      })
      this.setState({
        token: "",
        paymentType: type,
      })
    }
  }

  render() {
    const { submit_label = [], card_type_label = [], bank_type_label = [] } = this.props.data
    
    return (
      <form
        onSubmit={this.handleSubmit}
        ref={this.chargifyForm}
        className="form-container"
      >
        <select
          onChange={this.handlePaymentTypeChange}
          value={this.state.paymentType}
        >
          <option value="card">{card_type_label.length > 0 && card_type_label[0].text}</option>
          <option value="bank">{bank_type_label.length > 0 && bank_type_label[0].text}</option>
        </select>

        <div className="chargify-row">
          <div id="card-number" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="bank-name" className="chargify-field"></div>
          <div id="routing-number" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="account-number" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="account-type" className="chargify-field"></div>
          <div id="account-holder-type" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="month" className="chargify-field"></div>
          <div id="year" className="chargify-field"></div>
          <div id="cvv" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="first-name" className="chargify-field"></div>
          <div id="last-name" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="address" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="address2" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="city" className="chargify-field"></div>
          <div id="state" className="chargify-field"></div>
        </div>

        <div className="chargify-row">
          <div id="zip" className="chargify-field"></div>
          <div id="country" className="chargify-field"></div>
        </div>
        <Button type="submit">{submit_label.length > 0 && submit_label[0].text}</Button>
      </form>
    )
  }
}

ChargifyForm.propTypes = {
  data: PropTypes.object,
}

ChargifyForm.defaultProps = {
  data: {}
}


export default ChargifyForm
