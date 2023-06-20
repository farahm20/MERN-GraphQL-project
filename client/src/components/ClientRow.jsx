import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'

import { DELETE_CLIENT } from './mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import EditClientModal from '../components/EditClientModal'
export default function ClientRow({ client, id }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //approach 1: (might slow down the proj with too many queries.)after deleting a client refecting the clients to get an updated list
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    //approach 2. Updating cache (after this function we get a warning in console. to remover the worning add code in App.js)
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   })
    // },
  })

  return (
    <>
      <tr>
        <td>{client.name}</td>
        <td> {client.email}</td>
        <td> {client.phone}</td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={deleteClient}>
            <FaTrash />
          </button>
        </td>
        <td>
          <div className="d-flex gap-3 mb-4">
            <EditClientModal key={client.id} client={client} />
          </div>
        </td>
      </tr>
    </>
  )
}
