const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

//mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client')

const { projects, clients } = require('../sampleData')

//define the Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        //sample data
        // return clients.find((client) => client.id === parent.clientId)
        //mongoose db
        return Client.findById(parent.clientId)
      },
    },
  }),
})

//Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

//rootquery is an entry point to out application.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      //resolves the query to return a response. Takes two values parent and arguments and returns data
      resolve(parent, args) {
        //sample data
        // return projects
        //mongoose db
        return Project.find()
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //sample data
        //return projects.find((project) => project.id === args.id)
        //mongoose db
        return Project.findById(args.id)
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        //sample data
        // return clients
        //mongoose db
        return Client.find()
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //sample data
        //return clients.find((client) => client.id === args.id)
        //mongoose db
        return Client.findById(args.id)
      },
    },
  },
})
// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        //creating a new client using mongoose model
        const client = new Client({
          name: args.name, //passing in values and args are going to come from graphql query whaich we will use to enter data in db
          email: args.email,
          phone: args.phone,
        })
        //save the client to the database
        return client.save()
      },
    },
    //delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne()
          })
        })
        return Client.findByIdAndRemove(args.id)
      },
    },
    //add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not started' },
              progress: { value: 'In progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        //creating a new project using mongoose model
        const project = new Project({
          name: args.name, //passing in values and args are going to come from graphql query whaich we will use to enter data in db
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        })
        //save the project to the database
        return project.save()
      },
    },
    //delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      },
    },
    //update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not started' },
              progress: { value: 'In progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true },
        )
      },
    },
  },
})
//module.exports to export the schema so that it will be available in the server.js.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
