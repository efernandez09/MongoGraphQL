import {gql, ApolloServer} from 'apollo-server';
import './db.js'
import tareas from './server/models/modeloTareas.js'
import tablones from './server/models/modeloTablones.js'


let rndmNum = new Date;

const typeDefs = gql`
    type Tarea {
        id: ID!
        titulo: String!
        descripcion: String!
    }

    type Tablon {
        id: ID!
        titulo: String!
        descripcion: String!
        autor: String!
    }

    type Query{
       allTasks: [Tarea]!
       allTabs: [Tablon]!
       findTaskByTitle(titulo: String!): Tarea
       findTabByTitle(titulo: String!): Tablon
    }

    type Mutation {
        addTask(
            titulo: String!
            descripcion: String!
        ): Tarea

        editTask(
            titulo: String!
            descripcion: String!
            id: ID!
        ): Tarea

        deleteTaskById(
            id: ID!
        ): Tarea

        addTab(
            titulo: String!
            descripcion: String!
            autor: String!
        ): Tablon

        editTab(
            titulo: String!
            descripcion: String!
            autor: String!
            id: ID!
        ): Tablon

        deleteTabById(
            id: ID!
        ): Tablon

    }
`

const resolvers = {
    Query: {
        
        allTasks: async (root, args) => {
            return tareas.find({});
        },

        allTabs: async (root, args) => {
            return tablones.find({});
        },

        findTaskByTitle: (root, args) => {
            return tareas.findOne({ titulo: args.titulo });
        },

        findTabByTitle: (root, args) => {
            return tablones.findOne({ titulo: args.titulo });
        },
    },
    Mutation: {
        addTask: (root, args) => {
            const tarea = new tareas({...args});
            return tarea.save();
        },

        editTask: async (root, args) => {
            const tarea = await tareas.findOneAndUpdate({ id: args.id }, 
            {titulo: args.titulo,
            descripcion: args.descripcion,
            autor: args.autor},
            {new: true});

            tarea.save();
        },

        deleteTaskById: async (root, args) => {
            const tarea = await tareas.findOneAndDelete({id: args.id});
            tarea.save();
        },

        addTab: (root, args) => {
            const tablon = new tablones({...args});
            return tablon.save();
        },

        editTab: async (root, args) => {
            const tablon = await tablones.findOneAndUpdate({ id: args.id }, 
            {titulo: args.titulo,
            descripcion: args.descripcion,
            autor: args.autor},
            {new: true});
            
            tablon.save();
        },

        deleteTabById: async (root, args) => {
            const tablon = await tablones.findOneAndDelete({id: args.id});
            tablon.save();
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log(`Servidor Apollo activo en el siguiente enlace ${url}`)
})
