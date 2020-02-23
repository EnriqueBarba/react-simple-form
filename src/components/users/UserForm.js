import React from 'react'

const validators = {
  name: val => val.length > 3,
  bio: val => true,
  age: val => val >= 18
}

class UserForm extends React.Component {
  state = {
    data: {
      name: '',
      bio: '',
      age: 1
    },
    errors: {
      name: true,
      age: true,
    },
    touch: {
    }
  }

  handleSubmit = (e) => {
    // call parent function
    e.preventDefault()
    this.props.onAddUser({...this.state.data})
  }

  handleBlur = (e) => {
    // means in and out
    const attr = e.target.name
    this.setState({
      touch:{
        ...this.state.touch,
        [attr]: true
      }
    })
  }

  handleChange = (e) => {
    // use event.target!!
    //const param = e.target.name
    const {name,value} = e.target
    const isValid = validators[name](value)
    
    this.setState({
      data:{
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !isValid
      }
    })
    // change state.data and state.error ;)
  }

  render() {
    const { errors, data, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return (
      <div className="UserForm">
        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              className={`form-control ${errors.name && touch.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              autoComplete="off"
              value={data.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Name" />

            {errors.name && touch.name &&(
              <div className="invalid-feedback">
                Must be > 3
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="bio">Bio</label>

            <input
              type="textarea"
              className={`form-control`}
              id="bio"
              name="bio"
              autoComplete="off"
              value={data.bio}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Bio" />

          </div>

          <div className="mb-4">
            <label htmlFor="age">Bio</label>

            <select
              className={`form-control ${errors.age && touch.age ? 'is-invalid' : ''}`}
              id="age"
              name="age"
              autoComplete="off"
              value={data.age}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Age">
                {new Array(100).fill().map((e,i) => (<option key={i} value={i+1}>{i+1}</option>))}
            </select>
            {errors.age && touch.age &&(
              <div className="invalid-feedback">
                Must be over-age
              </div>
            )}
          </div>

          <button disabled={anyError} type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <pre className="bg-light p-2">
          {JSON.stringify(this.state, null, "  ")}
        </pre>
      </div>
    )
  }
}

export default UserForm
