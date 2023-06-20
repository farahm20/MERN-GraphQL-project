import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { UPDATE_CLIENT } from './mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'

export default function EditClientModal({ client }) {
  console.log(client, client.id)
  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [phone, setPhone] = useState(client.phone)

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  })

  const onSubmit = (e) => {
    console.log(e, name, email, phone)
    e.preventDefault()
    console.log(name, email, phone)
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all the fields!')
    }
    updateClient(name, email, phone)
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#updateClientModal"
      >
        <div className="d-flex align-items-center">
          <FaEdit className="icon" />
        </div>
      </button>

      <div
        className="modal fade"
        id="updateClientModal"
        role="dialog"
        aria-labelledby="updateClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateClientModalLabel">
                Update Client
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
