import {gql, ApolloServer, UserInputError} from 'apollo-server';
import {v1 as uuid} from 'uuid'

let rndmNum = new Date;

const tareas = [
    {
        id: rndmNum,
        titulo: 'Tarea 1',
        descripcion: 'Descripcion tarea 1'
    },
    {
        id: rndmNum,
        titulo: 'Tarea 2',
        descripcion: 'Descripcion tarea 2'
    },
    {
        id: rndmNum,
        titulo: 'Tarea 3',
        descripcion: 'Descripcion tarea 3'
    },
    {
        id: rndmNum,
        titulo: 'Tarea 4',
        descripcion: 'Descripcion tarea 4'
    }
]

const tablones = [
    {
        id: rndmNum,
        titulo: 'Tablon 1',
        descripcion: 'Descripcion tablon 1',
        autor: 'Eric Fernandez'
    },
    {
        id: rndmNum,
        titulo: 'Tablon 2',
        descripcion: 'Descripcion tablon 2',
        autor: 'Eric Fernandez'
    },
    {
        id: rndmNum,
        titulo: 'Tablon 3',
        descripcion: 'Descripcion tablon 3',
        autor: 'Eric Fernandez'
    },
    {
        id: rndmNum,
        titulo: 'Tablon 4',
        descripcion: 'Descripcion tablon 4',
        autor: 'Eric Fernandez'
    }
]


const typeDefs = gql`
    type Tarea {
        id: ID!
        titulo: String!
        descripcion: String!
    }

    type Tablone {
        id: ID!
        titulo: String!
        descripcion: String!
        autor: String!
    }

    type Query{
       allTasks: [Tarea]!
       allTabs: [Tablone]!
       findTaskByTitle(titulo: String!): Tarea
       findTabByTitle(titulo: String!): Tablone
    }

    type Mutation {
        addTask(
            titulo: String!
            descripcion: String!
        ): Tarea

        addTab(
            titulo: String!
            descripcion: String!
            autor: String!
        ): Tablone
    }
`

const resolvers = {
    Query: {
        allTasks: () => tareas,
        allTabs: () => tablones,
        findTaskByTitle: (root, args) => {
            const {titulo} = args;
            return tareas.find(tareas => tareas.titulo === titulo);
        },
        findTabByTitle: (root, args) => {
            const {titulo} = args;
            return tablones.find(tablones => tablones.titulo === titulo);
        }
    },
    Mutation: {
        addTask: (root, args) => {
            if (tareas.find(t => t.titulo === args.titulo)) { // Gestion/Validacion de errores, el titulo debe ser único en cada tarea.
                throw new UserInputError('Ya existe una tarea con ese nombre...', { 
                    invalidArgs: args.titulo
                });
            }
        //  const tarea = {titulo, descripcion} = args; Es lo mismo que la linea de abajo con el Spread Operator (...)    
            const tarea = {...args, id: uuid()} //  EL ID ES PROVISIONAL HASTA CONECTAR CON LA BBDD (Necesario para poder provar los mutations)
           tareas.push(tarea); // Solucion provisional, CAMBIAR CUANDO TENGAMOS CONECTADA LA BBDD PARA ENVIAR CORRECTAMENTE LOS DATOS (y no guardarlos en cache).
        },

        addTab: (root, args) => {
            if (tablones.find(t => t.titulo === args.titulo)) { // Gestion/Validacion de errores, el titulo debe ser único en cada tablon.
                throw new UserInputError('Ya existe una tablon con ese nombre...', { 
                    invalidArgs: args.titulo
                });
            }
        //  const tablon = {titulo, descripcion, autor} = args; Es lo mismo que la linea de abajo con el Spread Operator (...)    
            const tablon = {...args, id: uuid()} //  EL ID ES PROVISIONAL HASTA CONECTAR CON LA BBDD (Necesario para poder provar los mutations)
           tablones.push(tablon); // Solucion provisional, CAMBIAR CUANDO TENGAMOS CONECTADA LA BBDD PARA ENVIAR CORRECTAMENTE LOS DATOS (y no guardarlos en cache).
        },

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url}) => {
    console.log(`Servidor Apollo activo en el siguiente enlace ${url}`)
})