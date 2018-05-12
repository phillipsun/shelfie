import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.setState = {
      name: '',
      price: 0,
      imgurl: ''
    }
  }

  render() {
    return (
      <div>Form</div>
    )
  }
}

export default Form