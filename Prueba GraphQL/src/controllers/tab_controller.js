const getAllTabs = () => {
    const query = `
    query{
        allTabs {
          titulo,
          descripcion,
          autor,
          id
        }
      }`
};

export {getAllTabs};